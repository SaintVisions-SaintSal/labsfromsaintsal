/* ═══════════════════════════════════════════════════
   CHAT WITH SAL — Initial intelligence screen
   HACP™ Protocol · Mission brief → Ready to Build
   US Patent #10,290,222
═══════════════════════════════════════════════════ */
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform,
  Animated,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { KB, MONO } from '../../src/theme';
import { CornerBrackets, PulseDot } from '../../src/components';
import { streamChat } from '../../src/api';

const SAL_SYSTEM = `You are SAL — the hyper-intelligent AI of SaintSal™ Labs. You operate on HACP™ (Human AI Connection Protocol), Patent #10,290,222.

When a user describes what they want to build, engage intelligently: ask clarifying questions, understand their vision, confirm tech stack preferences, then when you have enough context declare you're READY TO BUILD.

Format your ready state as: "MISSION CONFIRMED: [project name]. Ready to architect." followed by a brief summary.

Be direct, intelligent, and high-energy. You are not just an assistant — you are the infrastructure.`;

const INIT_MSG = {
  role: 'assistant',
  content: `SAL ONLINE. HACP™ PROTOCOL ACTIVE.\n\nI'm ready to build anything you can imagine — full apps, APIs, landing pages, dashboards, mobile apps. No limits.\n\nWhat are we building?`,
};

export default function ChatScreen() {
  const router = useRouter();
  const { initialPrompt, buildType } = useLocalSearchParams();
  const [messages, setMessages] = useState([INIT_MSG]);
  const [input, setInput]       = useState(initialPrompt || '');
  const [streaming, setStreaming] = useState(false);
  const [missionReady, setMissionReady] = useState(false);
  const [missionName, setMissionName] = useState('');
  const scrollRef = useRef(null);
  const xhrRef    = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.2, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
    // Auto-send initial prompt if passed
    if (initialPrompt?.trim()) {
      setTimeout(() => sendMessage(initialPrompt), 400);
    }
  }, []);

  const sendMessage = (text = input) => {
    if (!text.trim() || streaming) return;
    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setStreaming(true);

    let buf = '';
    const assistantMsg = { role: 'assistant', content: '' };
    setMessages(prev => [...prev, assistantMsg]);

    xhrRef.current = streamChat({
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      system: SAL_SYSTEM,
      messages: newMessages.map(m => ({ role: m.role, content: m.content })),
      onChunk: (chunk) => {
        buf += chunk;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: buf };
          return updated;
        });
        // Detect mission ready
        if (buf.includes('MISSION CONFIRMED') && !missionReady) {
          const match = buf.match(/MISSION CONFIRMED:\s*([^.]+)/);
          if (match) { setMissionName(match[1].trim()); setMissionReady(true); }
        }
        scrollRef.current?.scrollToEnd({ animated: true });
      },
      onDone: () => setStreaming(false),
      onError: () => setStreaming(false),
    });
  };

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backTxt}>‹</Text>
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerTitle}>CHAT WITH SAL</Text>
          <View style={s.liveRow}>
            <Animated.View style={{ opacity: pulseAnim }}>
              <PulseDot color={streaming ? KB.amber : KB.neon} size={5} />
            </Animated.View>
            <Text style={s.liveTxt}>{streaming ? 'SAL THINKING...' : 'HACP™ ACTIVE'}</Text>
          </View>
        </View>
        <View style={s.salBadge}>
          <Text style={s.salBadgeTxt}>⬡</Text>
        </View>
      </View>

      {/* Mission Ready Banner */}
      {missionReady && (
        <TouchableOpacity
          style={s.missionBanner}
          onPress={() => router.push({ pathname: '/(stack)/planning', params: { missionName } })}
          activeOpacity={0.85}
        >
          <CornerBrackets color={KB.neon} size={8} thickness={1.5} />
          <View style={s.missionLeft}>
            <PulseDot color={KB.neon} size={7} />
            <View>
              <Text style={s.missionLabel}>MISSION CONFIRMED</Text>
              <Text style={s.missionName}>{missionName}</Text>
            </View>
          </View>
          <Text style={s.missionCta}>START BUILD →</Text>
        </TouchableOpacity>
      )}

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={s.messages}
        contentContainerStyle={s.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg, i) => (
          <View key={i} style={[s.bubble, msg.role === 'user' ? s.bubbleUser : s.bubbleAssistant]}>
            {msg.role === 'assistant' && (
              <View style={s.bubbleHeader}>
                <Text style={s.bubbleRole}>SAL</Text>
                <View style={s.roleLine} />
              </View>
            )}
            <Text style={[s.bubbleText, msg.role === 'user' && s.bubbleTextUser]}>
              {msg.content}
              {i === messages.length - 1 && streaming && <Text style={{ color: KB.neon }}>▌</Text>}
            </Text>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Input */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={s.inputWrap}>
          <CornerBrackets color={KB.borderNeon} size={8} thickness={1} />
          <TextInput
            style={s.input}
            value={input}
            onChangeText={setInput}
            placeholder="Message SAL..."
            placeholderTextColor={KB.textDim}
            multiline
            maxLength={2000}
          />
          <TouchableOpacity
            style={[s.sendBtn, (!input.trim() || streaming) && { opacity: 0.3 }]}
            onPress={() => sendMessage()}
            disabled={!input.trim() || streaming}
          >
            <Text style={s.sendTxt}>↑</Text>
          </TouchableOpacity>
        </View>
        {missionReady && (
          <TouchableOpacity
            style={s.buildFloatBtn}
            onPress={() => router.push({ pathname: '/(stack)/planning', params: { missionName } })}
          >
            <Text style={s.buildFloatTxt}>⚡ READY TO BUILD — LAUNCH ARCHITECT →</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: KB.bg },
  header:          { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: KB.borderNeon },
  backBtn:         { padding: 6 },
  backTxt:         { fontSize: 28, color: KB.neon, fontWeight: '300' },
  headerCenter:    { flex: 1, marginLeft: 8 },
  headerTitle:     { fontSize: 14, fontWeight: '900', color: KB.text, letterSpacing: 2 },
  liveRow:         { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  liveTxt:         { fontSize: 8, fontWeight: '800', color: KB.neon, letterSpacing: 2 },
  salBadge:        { width: 36, height: 36, borderRadius: 18, backgroundColor: KB.goldDim, borderWidth: 1.5, borderColor: KB.gold, alignItems: 'center', justifyContent: 'center' },
  salBadgeTxt:     { fontSize: 16, color: KB.gold },
  missionBanner:   { marginHorizontal: 14, marginTop: 10, backgroundColor: KB.bgCard, borderRadius: 12, padding: 14, borderWidth: 1.5, borderColor: KB.neon, flexDirection: 'row', alignItems: 'center' },
  missionLeft:     { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  missionLabel:    { fontSize: 8, fontWeight: '900', color: KB.neon, letterSpacing: 2 },
  missionName:     { fontSize: 14, fontWeight: '800', color: KB.text, marginTop: 2, fontFamily: MONO },
  missionCta:      { fontSize: 11, fontWeight: '800', color: KB.neon, letterSpacing: 1 },
  messages:        { flex: 1 },
  messagesContent: { padding: 14, gap: 12 },
  bubble:          { maxWidth: '90%' },
  bubbleAssistant: { alignSelf: 'flex-start', backgroundColor: KB.bgCard, borderRadius: 16, borderTopLeftRadius: 4, padding: 14, borderWidth: 1, borderColor: KB.border },
  bubbleUser:      { alignSelf: 'flex-end', backgroundColor: KB.neon + '22', borderRadius: 16, borderTopRightRadius: 4, padding: 14, borderWidth: 1, borderColor: KB.borderNeon },
  bubbleHeader:    { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  bubbleRole:      { fontSize: 8, fontWeight: '900', color: KB.neon, letterSpacing: 2 },
  roleLine:        { flex: 1, height: 1, backgroundColor: KB.borderNeon },
  bubbleText:      { fontSize: 14, color: KB.text, lineHeight: 22, fontFamily: MONO },
  bubbleTextUser:  { color: KB.text },
  inputWrap:       { flexDirection: 'row', alignItems: 'flex-end', margin: 14, backgroundColor: KB.bgCard, borderRadius: 16, borderWidth: 1, borderColor: KB.borderNeon, paddingHorizontal: 14, paddingVertical: 10, gap: 10 },
  input:           { flex: 1, fontSize: 14, color: KB.text, maxHeight: 120, fontFamily: MONO },
  sendBtn:         { width: 36, height: 36, borderRadius: 18, backgroundColor: KB.neon, alignItems: 'center', justifyContent: 'center' },
  sendTxt:         { fontSize: 18, color: KB.bg, fontWeight: '700' },
  buildFloatBtn:   { marginHorizontal: 14, marginBottom: 8, backgroundColor: KB.neon, borderRadius: 12, paddingVertical: 13, alignItems: 'center', shadowColor: KB.neon, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 12 },
  buildFloatTxt:   { fontSize: 12, fontWeight: '900', color: KB.bg, letterSpacing: 1.5 },
});
