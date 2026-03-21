/* ═══════════════════════════════════════════════════
   AGENTIC PLANNING PHASE
   Architect Plan · File tree building · Dock execution
   US Patent #10,290,222 · HACP Protocol
═══════════════════════════════════════════════════ */
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, Animated, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { KB, MONO } from '../../src/theme';
import { CornerBrackets, PulseDot } from '../../src/components';
import { streamChat } from '../../src/api';

const AGENT_PLAN_SYSTEM = `You are the ARCHITECT agent — SAL's strategic planner. Using HACP™ Protocol (Patent #10,290,222), generate a detailed implementation plan.

Output format:
ARCHITECT PLAN: [Project Name]
COMPLEXITY: [Low/Medium/High]
ESTIMATED TOKENS: [amount]

PHASE 1: FOUNDATION
⬜ [Task 1]
⬜ [Task 2]

PHASE 2: CORE BUILD
⬜ [Task 1]
...

FILES TO GENERATE:
- [filename.ext] — [purpose]
...

Then end with: PLAN LOCKED. INITIATING BUILD SEQUENCE.`;

const MOCK_FILES = [
  { name: 'index.html',   status: 'done',    lang: 'HTML' },
  { name: 'style.css',    status: 'done',    lang: 'CSS' },
  { name: 'app.js',       status: 'active',  lang: 'JS' },
  { name: 'components/',  status: 'pending', lang: 'DIR' },
  { name: 'api/index.js', status: 'pending', lang: 'JS' },
  { name: 'package.json', status: 'pending', lang: 'JSON' },
];

const TERMINAL_LINES = [
  { txt: '> HACP™ Protocol initialized',         type: 'system' },
  { txt: '> Connecting to Architect agent...',    type: 'system' },
  { txt: '> Agent ARCHITECT online',              type: 'success' },
  { txt: '> Parsing project requirements...',     type: 'agent' },
  { txt: '> Generating implementation plan...',   type: 'agent' },
];

const STATUS_COLOR = { done: KB.neon, active: KB.amber, pending: KB.textDim };
const LANG_COLOR   = { HTML: '#E34F26', CSS: '#1572B6', JS: '#F7DF1E', JSON: '#6B7280', DIR: KB.agentStitch };

export default function PlanningScreen() {
  const router = useRouter();
  const { missionName, prompt } = useLocalSearchParams();

  const [planText, setPlanText]   = useState('');
  const [streaming, setStreaming] = useState(false);
  const [planLocked, setPlanLocked] = useState(false);
  const [termLines, setTermLines] = useState(TERMINAL_LINES);
  const [files, setFiles]         = useState(MOCK_FILES);
  const [activeTab, setActiveTab] = useState('plan'); // plan | terminal | files
  const [chatInput, setChatInput] = useState('');
  const [chatMsgs, setChatMsgs]   = useState([]);

  const scrollRef = useRef(null);
  const xhrRef    = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fileAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.2, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
    // Auto-start planning
    setTimeout(() => startPlanning(), 600);
    // Animate files in
    setTimeout(() => {
      Animated.timing(fileAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
    }, 1200);
  }, []);

  const startPlanning = () => {
    setStreaming(true);
    setPlanText('');
    const buildPrompt = prompt || missionName || 'Build a full-stack web application';
    let buf = '';
    let fileIdx = 0;

    xhrRef.current = streamChat({
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      system: AGENT_PLAN_SYSTEM,
      messages: [{ role: 'user', content: `Project: ${buildPrompt}\n\nGenerate full architect plan.` }],
      onChunk: (chunk) => {
        buf += chunk;
        setPlanText(buf);
        // Advance file statuses as plan streams
        if (buf.length > 200 && fileIdx === 0) {
          fileIdx = 1;
          setFiles(prev => prev.map((f, i) => i === 1 ? { ...f, status: 'done' } : i === 2 ? { ...f, status: 'active' } : f));
        }
        if (buf.length > 600 && fileIdx === 1) {
          fileIdx = 2;
          setFiles(prev => prev.map((f, i) => i === 2 ? { ...f, status: 'done' } : i === 3 ? { ...f, status: 'active' } : f));
        }
        if (buf.includes('PLAN LOCKED') && !planLocked) setPlanLocked(true);
        scrollRef.current?.scrollToEnd({ animated: true });
      },
      onDone: () => {
        setStreaming(false);
        setPlanLocked(true);
        setFiles(prev => prev.map(f => ({ ...f, status: 'done' })));
        setTermLines(prev => [...prev,
          { txt: '> Plan analysis complete', type: 'success' },
          { txt: '> All files mapped', type: 'success' },
          { txt: '> READY FOR BUILD SEQUENCE', type: 'complete' },
        ]);
      },
      onError: () => setStreaming(false),
    });
  };

  const sendChatMsg = () => {
    if (!chatInput.trim()) return;
    setChatMsgs(prev => [...prev, { role: 'user', content: chatInput }]);
    setChatInput('');
    // Add SAL response
    setTimeout(() => {
      setChatMsgs(prev => [...prev, { role: 'assistant', content: `Understood. Incorporating "${chatInput}" into the build plan. The architect is updating the implementation sequence.` }]);
    }, 1200);
  };

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backTxt}>‹</Text>
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerTitle}>AGENTIC PLANNING PHASE</Text>
          <View style={s.liveRow}>
            <Animated.View style={{ opacity: streaming ? pulseAnim : 1 }}>
              <PulseDot color={streaming ? KB.amber : KB.neon} size={5} />
            </Animated.View>
            <Text style={[s.liveTxt, { color: streaming ? KB.amber : KB.neon }]}>
              {streaming ? 'ARCHITECT THINKING...' : planLocked ? 'PLAN LOCKED ✓' : 'STANDBY'}
            </Text>
          </View>
        </View>
        {/* Agent badge */}
        <View style={[s.agentBadge, { backgroundColor: KB.agentGrok + '20', borderColor: KB.agentGrok + '50' }]}>
          <Text style={[s.agentBadgeTxt, { color: KB.agentGrok }]}>ARCH</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={s.tabs}>
        {['plan', 'terminal', 'files', 'chat'].map(t => (
          <TouchableOpacity key={t} style={[s.tab, activeTab === t && s.tabActive]} onPress={() => setActiveTab(t)}>
            <Text style={[s.tabTxt, activeTab === t && { color: KB.bg }]}>{t.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {activeTab === 'plan' && (
        <ScrollView ref={scrollRef} style={s.scroll} showsVerticalScrollIndicator={false}>
          <View style={s.planCard}>
            <CornerBrackets color={KB.agentGrok + '60'} size={10} thickness={1.5} />
            <View style={s.planHeader}>
              <Text style={s.planTitle}>⚡ ARCHITECT PLAN</Text>
              {streaming && <Animated.View style={{ opacity: pulseAnim }}><PulseDot color={KB.amber} /></Animated.View>}
            </View>
            <Text style={s.planText}>
              {planText || 'Initializing architect agent...'}
              {streaming && <Text style={{ color: KB.amber }}>▌</Text>}
            </Text>
          </View>

          {planLocked && (
            <TouchableOpacity
              style={s.proceedBtn}
              onPress={() => router.push({ pathname: '/(stack)/viewport', params: { missionName, planText } })}
              activeOpacity={0.85}
            >
              <CornerBrackets color={KB.neon} size={8} thickness={1.5} />
              <Text style={s.proceedTxt}>⚡ PLAN LOCKED — LAUNCH BUILD →</Text>
            </TouchableOpacity>
          )}
          <View style={{ height: 32 }} />
        </ScrollView>
      )}

      {activeTab === 'terminal' && (
        <ScrollView style={s.scroll}>
          <View style={s.terminal}>
            {termLines.map((line, i) => (
              <Text key={i} style={[s.termLine, {
                color: line.type === 'success' ? KB.neon
                     : line.type === 'complete' ? KB.neon
                     : line.type === 'agent' ? KB.amber
                     : KB.textDim,
              }]}>
                {line.txt}
              </Text>
            ))}
            {streaming && (
              <Text style={[s.termLine, { color: KB.amber }]}>
                {'> '}processing<Text style={{ opacity: 0.5 }}>...</Text>
              </Text>
            )}
          </View>
        </ScrollView>
      )}

      {activeTab === 'files' && (
        <Animated.ScrollView style={[s.scroll, { opacity: fileAnim }]}>
          <View style={s.filesCard}>
            <Text style={s.filesTitle}>FILES BEING RENDERED</Text>
            {files.map((file, i) => (
              <View key={i} style={s.fileRow}>
                <View style={[s.fileDot, { backgroundColor: STATUS_COLOR[file.status] }]} />
                <Text style={[s.fileName, { color: file.status === 'pending' ? KB.textDim : KB.text }]}>
                  {file.name}
                </Text>
                <View style={[s.langBadge, { backgroundColor: (LANG_COLOR[file.lang] || KB.textDim) + '20' }]}>
                  <Text style={[s.langTxt, { color: LANG_COLOR[file.lang] || KB.textDim }]}>{file.lang}</Text>
                </View>
                {file.status === 'active' && (
                  <View style={s.renderingTag}>
                    <Text style={s.renderingTxt}>RENDERING</Text>
                  </View>
                )}
                {file.status === 'done' && (
                  <Text style={s.checkmark}>✓</Text>
                )}
              </View>
            ))}
          </View>
        </Animated.ScrollView>
      )}

      {activeTab === 'chat' && (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView style={s.scroll} contentContainerStyle={{ padding: 14, gap: 10 }}>
            <View style={s.chatNotice}>
              <Text style={s.chatNoticeTxt}>Continue planning while the architect works. Changes go into the build queue.</Text>
            </View>
            {chatMsgs.map((msg, i) => (
              <View key={i} style={[s.chatBubble, msg.role === 'user' ? s.chatUser : s.chatAssistant]}>
                {msg.role === 'assistant' && <Text style={s.chatRole}>ARCHITECT</Text>}
                <Text style={s.chatText}>{msg.content}</Text>
              </View>
            ))}
            <View style={{ height: 20 }} />
          </ScrollView>
          <View style={s.chatInput}>
            <TextInput
              style={s.chatField}
              value={chatInput}
              onChangeText={setChatInput}
              placeholder="Add to the plan..."
              placeholderTextColor={KB.textDim}
              onSubmitEditing={sendChatMsg}
              returnKeyType="send"
            />
            <TouchableOpacity style={s.chatSend} onPress={sendChatMsg} disabled={!chatInput.trim()}>
              <Text style={s.chatSendTxt}>↑</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}

      {/* Bottom: proceed button always visible when plan locked */}
      {planLocked && activeTab !== 'plan' && (
        <TouchableOpacity
          style={s.floatBtn}
          onPress={() => router.push({ pathname: '/(stack)/viewport', params: { missionName } })}
        >
          <Text style={s.floatBtnTxt}>⚡ LAUNCH BUILD →</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: KB.bg },
  header:        { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: KB.borderNeon },
  backBtn:       { padding: 6 },
  backTxt:       { fontSize: 28, color: KB.neon, fontWeight: '300' },
  headerCenter:  { flex: 1, marginLeft: 8 },
  headerTitle:   { fontSize: 13, fontWeight: '900', color: KB.text, letterSpacing: 1.5 },
  liveRow:       { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  liveTxt:       { fontSize: 8, fontWeight: '800', letterSpacing: 2 },
  agentBadge:    { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderWidth: 1 },
  agentBadgeTxt: { fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  tabs:          { flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 8, gap: 6 },
  tab:           { flex: 1, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: KB.borderNeon, alignItems: 'center' },
  tabActive:     { backgroundColor: KB.neon, borderColor: KB.neon },
  tabTxt:        { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 1 },
  scroll:        { flex: 1 },
  planCard:      { margin: 14, backgroundColor: KB.bgCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: KB.border },
  planHeader:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  planTitle:     { fontSize: 11, fontWeight: '900', color: KB.agentGrok, letterSpacing: 2 },
  planText:      { fontSize: 13, color: KB.text, lineHeight: 21, fontFamily: MONO },
  proceedBtn:    { margin: 14, backgroundColor: KB.bgCard, borderRadius: 14, padding: 18, borderWidth: 1.5, borderColor: KB.neon, alignItems: 'center' },
  proceedTxt:    { fontSize: 13, fontWeight: '900', color: KB.neon, letterSpacing: 1.5 },
  terminal:      { margin: 14, backgroundColor: KB.bgTerminal, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: KB.border },
  termLine:      { fontSize: 12, fontFamily: MONO, lineHeight: 22 },
  filesCard:     { margin: 14, backgroundColor: KB.bgCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: KB.border },
  filesTitle:    { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 2, marginBottom: 14 },
  fileRow:       { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: KB.border },
  fileDot:       { width: 7, height: 7, borderRadius: 3.5 },
  fileName:      { flex: 1, fontSize: 13, fontFamily: MONO },
  langBadge:     { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  langTxt:       { fontSize: 8, fontWeight: '800' },
  renderingTag:  { backgroundColor: KB.amber + '20', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1, borderColor: KB.amber + '40' },
  renderingTxt:  { fontSize: 8, fontWeight: '800', color: KB.amber },
  checkmark:     { fontSize: 12, color: KB.neon, fontWeight: '800' },
  chatNotice:    { backgroundColor: KB.neonGlow, borderRadius: 10, padding: 12, borderWidth: 1, borderColor: KB.borderNeon },
  chatNoticeTxt: { fontSize: 12, color: KB.neon, textAlign: 'center' },
  chatBubble:    { borderRadius: 14, padding: 12, maxWidth: '88%' },
  chatUser:      { alignSelf: 'flex-end', backgroundColor: KB.neonDim, borderTopRightRadius: 4 },
  chatAssistant: { alignSelf: 'flex-start', backgroundColor: KB.bgCard, borderTopLeftRadius: 4, borderWidth: 1, borderColor: KB.border },
  chatRole:      { fontSize: 8, fontWeight: '900', color: KB.agentGrok, letterSpacing: 2, marginBottom: 6 },
  chatText:      { fontSize: 13, color: KB.text, lineHeight: 20, fontFamily: MONO },
  chatInput:     { flexDirection: 'row', alignItems: 'center', margin: 14, backgroundColor: KB.bgCard, borderRadius: 14, borderWidth: 1, borderColor: KB.borderNeon, paddingHorizontal: 14, paddingVertical: 10, gap: 10 },
  chatField:     { flex: 1, fontSize: 14, color: KB.text, fontFamily: MONO },
  chatSend:      { width: 34, height: 34, borderRadius: 17, backgroundColor: KB.neon, alignItems: 'center', justifyContent: 'center' },
  chatSendTxt:   { fontSize: 16, color: KB.bg, fontWeight: '800' },
  floatBtn:      { margin: 14, backgroundColor: KB.neon, borderRadius: 14, paddingVertical: 14, alignItems: 'center', shadowColor: KB.neon, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10 },
  floatBtnTxt:   { fontSize: 13, fontWeight: '900', color: KB.bg, letterSpacing: 1.5 },
});
