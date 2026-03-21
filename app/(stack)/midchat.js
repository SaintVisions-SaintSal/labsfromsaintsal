/* ═══════════════════════════════════════════════════
   MID-BUILD CHAT — Changes during rendering
   Queue adjustments · Continue planning
   US Patent #10,290,222 · HACP Protocol
═══════════════════════════════════════════════════ */
import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { KB, MONO } from '../../src/theme';
import { PulseDot } from '../../src/components';
import { streamChat } from '../../src/api';

const MID_SYSTEM = `You are SAL, mid-build assistant. The build is currently rendering. Help the user refine requirements, address feedback, and queue changes. Be concise and direct. Acknowledge what's being added to the build queue.`;

const INIT = [
  { role: 'assistant', content: `Build is rendering. I'm queuing any changes you want to make.\n\nWhat adjustments do you need?` },
];

const QUICK_CMDS = [
  'Change the color scheme to dark blue',
  'Add a pricing section',
  'Make the hero full-screen',
  'Add mobile navigation',
];

export default function MidChatScreen() {
  const router = useRouter();
  const { missionName } = useLocalSearchParams();
  const [messages, setMessages] = useState(INIT);
  const [input, setInput]       = useState('');
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef(null);
  const xhrRef    = useRef(null);

  const sendMsg = (text = input) => {
    if (!text.trim() || streaming) return;
    const userMsg = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setStreaming(true);
    let buf = '';
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    xhrRef.current = streamChat({
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      system: MID_SYSTEM,
      messages: updated.map(m => ({ role: m.role, content: m.content })),
      onChunk: (c) => {
        buf += c;
        setMessages(prev => {
          const u = [...prev];
          u[u.length - 1] = { role: 'assistant', content: buf };
          return u;
        });
        scrollRef.current?.scrollToEnd({ animated: true });
      },
      onDone: () => setStreaming(false),
      onError: () => setStreaming(false),
    });
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.back}>
          <Text style={s.backTxt}>‹</Text>
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.title}>IN-BUILD CHAT</Text>
          <View style={s.liveRow}>
            <PulseDot color={KB.amber} size={5} />
            <Text style={s.liveTxt}>BUILD IN PROGRESS</Text>
          </View>
        </View>
        <TouchableOpacity style={s.viewBtn} onPress={() => router.back()}>
          <Text style={s.viewBtnTxt}>VIEW</Text>
        </TouchableOpacity>
      </View>

      {/* Queue badge */}
      <View style={s.queueBadge}>
        <Text style={s.queueTxt}>⚡ Changes are queued and applied to the live build</Text>
      </View>

      <ScrollView ref={scrollRef} style={s.scroll} contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        {messages.map((msg, i) => (
          <View key={i} style={[s.bubble, msg.role === 'user' ? s.bubbleUser : s.bubbleAss]}>
            {msg.role === 'assistant' && <Text style={s.role}>SAL</Text>}
            <Text style={s.msgText}>
              {msg.content}
              {i === messages.length - 1 && streaming && <Text style={{ color: KB.amber }}>▌</Text>}
            </Text>
          </View>
        ))}

        {/* Quick commands */}
        {messages.length < 3 && (
          <View style={s.quickWrap}>
            <Text style={s.quickLabel}>QUICK ADJUSTMENTS</Text>
            {QUICK_CMDS.map(cmd => (
              <TouchableOpacity key={cmd} style={s.quickCmd} onPress={() => sendMsg(cmd)}>
                <Text style={s.quickCmdTxt}>{cmd}</Text>
                <Text style={s.quickArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={s.inputWrap}>
          <TextInput
            style={s.input}
            value={input}
            onChangeText={setInput}
            placeholder="Queue a change..."
            placeholderTextColor={KB.textDim}
            multiline
          />
          <TouchableOpacity style={[s.send, (!input.trim() || streaming) && { opacity: 0.3 }]} onPress={() => sendMsg()} disabled={!input.trim() || streaming}>
            <Text style={s.sendTxt}>↑</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: KB.bg },
  header:      { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: KB.borderNeon },
  back:        { padding: 6 },
  backTxt:     { fontSize: 28, color: KB.neon, fontWeight: '300' },
  headerCenter:{ flex: 1, marginLeft: 8 },
  title:       { fontSize: 13, fontWeight: '900', color: KB.text, letterSpacing: 2 },
  liveRow:     { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  liveTxt:     { fontSize: 8, fontWeight: '800', color: KB.amber, letterSpacing: 2 },
  viewBtn:     { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, borderWidth: 1, borderColor: KB.borderNeon },
  viewBtnTxt:  { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 1 },
  queueBadge:  { marginHorizontal: 14, marginTop: 10, backgroundColor: KB.amber + '15', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: KB.amber + '40' },
  queueTxt:    { fontSize: 11, color: KB.amber, textAlign: 'center' },
  scroll:      { flex: 1 },
  scrollContent:{ padding: 14, gap: 10 },
  bubble:      { borderRadius: 14, padding: 12, maxWidth: '88%' },
  bubbleAss:   { alignSelf: 'flex-start', backgroundColor: KB.bgCard, borderTopLeftRadius: 4, borderWidth: 1, borderColor: KB.border },
  bubbleUser:  { alignSelf: 'flex-end', backgroundColor: KB.neonDim, borderTopRightRadius: 4 },
  role:        { fontSize: 8, fontWeight: '900', color: KB.neon, letterSpacing: 2, marginBottom: 6 },
  msgText:     { fontSize: 14, color: KB.text, lineHeight: 22, fontFamily: MONO },
  quickWrap:   { gap: 8, marginTop: 8 },
  quickLabel:  { fontSize: 9, fontWeight: '800', color: KB.textDim, letterSpacing: 2 },
  quickCmd:    { backgroundColor: KB.bgCard, borderRadius: 10, padding: 12, borderWidth: 1, borderColor: KB.border, flexDirection: 'row', alignItems: 'center' },
  quickCmdTxt: { flex: 1, fontSize: 13, color: KB.textSub },
  quickArrow:  { fontSize: 14, color: KB.neon },
  inputWrap:   { flexDirection: 'row', alignItems: 'flex-end', margin: 14, backgroundColor: KB.bgCard, borderRadius: 16, borderWidth: 1, borderColor: KB.borderNeon, paddingHorizontal: 14, paddingVertical: 10, gap: 10 },
  input:       { flex: 1, fontSize: 14, color: KB.text, maxHeight: 100, fontFamily: MONO },
  send:        { width: 36, height: 36, borderRadius: 18, backgroundColor: KB.neon, alignItems: 'center', justifyContent: 'center' },
  sendTxt:     { fontSize: 18, color: KB.bg, fontWeight: '700' },
});
