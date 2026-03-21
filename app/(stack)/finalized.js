/* ═══════════════════════════════════════════════════
   PROJECT FINALIZED — Mission Complete
   Scale Without Limits · Launch · Download · Deploy
   US Patent #10,290,222 · HACP Protocol
═══════════════════════════════════════════════════ */
import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, Animated, Alert, Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { KB, MONO } from '../../src/theme';
import { CornerBrackets, PulseDot } from '../../src/components';

const { width: SW } = Dimensions.get('window');

const GENERATED_FILES = [
  { name: 'index.html',       size: '12.4 KB', lang: 'HTML', status: 'done' },
  { name: 'style.css',        size: '8.1 KB',  lang: 'CSS',  status: 'done' },
  { name: 'app.js',           size: '24.7 KB', lang: 'JS',   status: 'done' },
  { name: 'components/Nav.js',size: '3.2 KB',  lang: 'JS',   status: 'done' },
  { name: 'components/Hero.js',size:'4.8 KB',  lang: 'JS',   status: 'done' },
  { name: 'api/index.js',     size: '6.3 KB',  lang: 'JS',   status: 'done' },
  { name: 'package.json',     size: '1.1 KB',  lang: 'JSON', status: 'done' },
  { name: 'README.md',        size: '2.4 KB',  lang: 'MD',   status: 'done' },
];

const CONNECTIONS = [
  { name: 'Supabase DB',   icon: '🗄️', status: 'WIRED',   color: KB.neon },
  { name: 'Stripe',        icon: '💳', status: 'WIRED',   color: KB.neon },
  { name: 'Vercel Deploy', icon: '▲',  status: 'READY',   color: KB.neon },
  { name: 'GitHub Repo',   icon: '🐙', status: 'SYNCED',  color: KB.neon },
  { name: 'Render API',    icon: '🌊', status: 'LIVE',    color: KB.neon },
];

const LANG_COLOR = { HTML: '#E34F26', CSS: '#1572B6', JS: '#F7DF1E', JSON: '#6B7280', MD: '#9CA3AF' };

export default function FinalizedScreen() {
  const router = useRouter();
  const { missionName } = useLocalSearchParams();
  const project = missionName || 'PROTO_MOTORS';

  const [activeSection, setActiveSection] = useState('overview'); // overview | files | connections | preview
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
    ]).start();
    setTimeout(() => {
      Animated.spring(checkAnim, { toValue: 1, tension: 120, friction: 6, useNativeDriver: true }).start();
    }, 300);
  }, []);

  const handleDeploy = () => Alert.alert('Deploy to Vercel', 'This will deploy your project to Vercel production.\n\nProceed?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Deploy', style: 'default', onPress: () => Alert.alert('Deployed! 🚀', 'Your project is live on Vercel.') },
  ]);

  const handleDownload = () => Alert.alert('Download Project', 'Your complete project files will be packaged and downloaded as a .zip archive.', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Download', onPress: () => Alert.alert('Downloading...', 'project-files.zip') },
  ]);

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backTxt}>‹</Text>
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerTitle}>PROJECT FINALIZED</Text>
          <View style={s.liveRow}>
            <PulseDot color={KB.neon} size={5} />
            <Text style={s.liveTxt}>MISSION COMPLETE</Text>
          </View>
        </View>
        <TouchableOpacity
          style={s.chatBtn}
          onPress={() => router.push({ pathname: '/(stack)/chat', params: { initialPrompt: `I need to make some changes to ${project}` } })}
        >
          <Text style={s.chatBtnTxt}>EDIT</Text>
        </TouchableOpacity>
      </View>

      {/* Hero completion card */}
      <Animated.View style={[s.heroCard, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <CornerBrackets color={KB.neon} size={12} thickness={2} />
        <View style={s.heroGlowWrap}>
          <Animated.View style={[s.checkCircle, { transform: [{ scale: checkAnim }] }]}>
            <Text style={s.checkIcon}>✓</Text>
          </Animated.View>
        </View>
        <Text style={s.missionLabel}>MISSION COMPLETE</Text>
        <Text style={s.projectTitle}>{project}</Text>
        <Text style={s.heroSub}>Scale Without Limits.</Text>

        {/* Metrics */}
        <View style={s.metricsRow}>
          <View style={s.metric}>
            <Text style={s.metricVal}>4.2M</Text>
            <Text style={s.metricLbl}>TOKENS</Text>
          </View>
          <View style={s.metricDivider} />
          <View style={s.metric}>
            <Text style={s.metricVal}>{GENERATED_FILES.length}</Text>
            <Text style={s.metricLbl}>FILES</Text>
          </View>
          <View style={s.metricDivider} />
          <View style={s.metric}>
            <Text style={s.metricVal}>100%</Text>
            <Text style={s.metricLbl}>COMPLETE</Text>
          </View>
          <View style={s.metricDivider} />
          <View style={s.metric}>
            <Text style={s.metricVal}>0</Text>
            <Text style={s.metricLbl}>ERRORS</Text>
          </View>
        </View>
      </Animated.View>

      {/* Quick actions */}
      <View style={s.quickActions}>
        <TouchableOpacity style={s.qaBtn} onPress={handleDeploy}>
          <Text style={s.qaIcon}>▲</Text>
          <Text style={s.qaTxt}>DEPLOY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.qaBtn} onPress={handleDownload}>
          <Text style={s.qaIcon}>↓</Text>
          <Text style={s.qaTxt}>DOWNLOAD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.qaBtn} onPress={() => router.push('/(stack)/viewport')}>
          <Text style={s.qaIcon}>👁</Text>
          <Text style={s.qaTxt}>PREVIEW</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.qaBtn} onPress={() => Alert.alert('Share', 'Project link copied to clipboard.')}>
          <Text style={s.qaIcon}>⬆</Text>
          <Text style={s.qaTxt}>SHARE</Text>
        </TouchableOpacity>
      </View>

      {/* Section tabs */}
      <View style={s.sections}>
        {['overview', 'files', 'connections', 'preview'].map(sec => (
          <TouchableOpacity
            key={sec}
            style={[s.secTab, activeSection === sec && s.secTabActive]}
            onPress={() => setActiveSection(sec)}
          >
            <Text style={[s.secTabTxt, activeSection === sec && { color: KB.bg }]}>{sec.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        {/* OVERVIEW */}
        {activeSection === 'overview' && (
          <View style={s.pad}>
            <View style={s.overviewCard}>
              <CornerBrackets color={KB.borderNeon} size={8} thickness={1} />
              <Text style={s.overviewTitle}>BUILD SUMMARY</Text>
              <View style={s.overviewRow}><Text style={s.overviewKey}>Project</Text><Text style={s.overviewVal}>{project}</Text></View>
              <View style={s.overviewRow}><Text style={s.overviewKey}>Type</Text><Text style={s.overviewVal}>Full-Stack Web App</Text></View>
              <View style={s.overviewRow}><Text style={s.overviewKey}>Framework</Text><Text style={s.overviewVal}>React + Node.js</Text></View>
              <View style={s.overviewRow}><Text style={s.overviewKey}>Database</Text><Text style={s.overviewVal}>Supabase PostgreSQL</Text></View>
              <View style={s.overviewRow}><Text style={s.overviewKey}>Auth</Text><Text style={s.overviewVal}>Supabase Auth + JWT</Text></View>
              <View style={s.overviewRow}><Text style={s.overviewKey}>Payments</Text><Text style={s.overviewVal}>Stripe Subscriptions</Text></View>
              <View style={s.overviewRow}><Text style={s.overviewKey}>Deploy</Text><Text style={[s.overviewVal, { color: KB.neon }]}>Vercel (Ready)</Text></View>
              <View style={s.overviewRow}><Text style={s.overviewKey}>Status</Text><Text style={[s.overviewVal, { color: KB.neon }]}>✓ COMPLETE</Text></View>
            </View>

            {/* Deploy CTA */}
            <TouchableOpacity style={s.deployBtn} onPress={handleDeploy}>
              <Text style={s.deployBtnTxt}>▲  DEPLOY TO VERCEL NOW</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.downloadBtn} onPress={handleDownload}>
              <Text style={s.downloadBtnTxt}>↓  DOWNLOAD ALL FILES (.zip)</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* FILES */}
        {activeSection === 'files' && (
          <View style={s.pad}>
            <View style={s.filesCard}>
              <Text style={s.sectionTitle}>GENERATED FILES — {GENERATED_FILES.length} TOTAL</Text>
              {GENERATED_FILES.map((file, i) => (
                <TouchableOpacity key={i} style={s.fileRow} onPress={() => Alert.alert(file.name, `Language: ${file.lang}\nSize: ${file.size}`)}>
                  <View style={[s.langDot, { backgroundColor: (LANG_COLOR[file.lang] || KB.textDim) }]} />
                  <View style={s.fileInfo}>
                    <Text style={s.fileName}>{file.name}</Text>
                    <Text style={s.fileSize}>{file.size}</Text>
                  </View>
                  <View style={[s.langTag, { backgroundColor: (LANG_COLOR[file.lang] || KB.textDim) + '20' }]}>
                    <Text style={[s.langTagTxt, { color: LANG_COLOR[file.lang] || KB.textDim }]}>{file.lang}</Text>
                  </View>
                  <Text style={s.fileDone}>✓</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={s.downloadBtn} onPress={handleDownload}>
              <Text style={s.downloadBtnTxt}>↓  DOWNLOAD ALL FILES</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* CONNECTIONS */}
        {activeSection === 'connections' && (
          <View style={s.pad}>
            <View style={s.connCard}>
              <Text style={s.sectionTitle}>WIRED CONNECTIONS</Text>
              {CONNECTIONS.map((conn, i) => (
                <View key={i} style={s.connRow}>
                  <Text style={s.connIcon}>{conn.icon}</Text>
                  <Text style={s.connName}>{conn.name}</Text>
                  <View style={[s.connBadge, { borderColor: conn.color + '50', backgroundColor: conn.color + '15' }]}>
                    <Text style={[s.connStatus, { color: conn.color }]}>● {conn.status}</Text>
                  </View>
                </View>
              ))}
            </View>
            <TouchableOpacity style={s.settingsBtn} onPress={() => router.push('/(stack)/settings')}>
              <Text style={s.settingsBtnTxt}>⚙️  MANAGE CONNECTIONS →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* PREVIEW */}
        {activeSection === 'preview' && (
          <View style={s.pad}>
            <Text style={s.sectionTitle}>LIVE PREVIEW</Text>
            <TouchableOpacity
              style={s.previewCard}
              onPress={() => router.push({ pathname: '/(stack)/viewport', params: { missionName: project } })}
            >
              <CornerBrackets color={KB.neon} size={10} thickness={1.5} />
              <View style={s.previewMockScreen}>
                {/* Mock preview */}
                <View style={s.mockNav} />
                <View style={s.mockHero} />
                <View style={s.mockCards}>
                  <View style={s.mockCard} />
                  <View style={s.mockCard} />
                  <View style={s.mockCard} />
                </View>
              </View>
              <Text style={s.previewCta}>TAP TO OPEN VIEWPORT →</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: KB.bg },
  header:         { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: KB.borderNeon },
  backBtn:        { padding: 6 },
  backTxt:        { fontSize: 28, color: KB.neon, fontWeight: '300' },
  headerCenter:   { flex: 1, marginLeft: 8 },
  headerTitle:    { fontSize: 14, fontWeight: '900', color: KB.text, letterSpacing: 2 },
  liveRow:        { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  liveTxt:        { fontSize: 8, fontWeight: '800', color: KB.neon, letterSpacing: 2 },
  chatBtn:        { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, borderWidth: 1, borderColor: KB.borderNeon },
  chatBtnTxt:     { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 1 },
  heroCard:       { marginHorizontal: 14, marginTop: 12, backgroundColor: KB.bgCard, borderRadius: 20, padding: 22, borderWidth: 1.5, borderColor: KB.neon, alignItems: 'center' },
  heroGlowWrap:   { marginBottom: 14 },
  checkCircle:    { width: 64, height: 64, borderRadius: 32, backgroundColor: KB.neon, alignItems: 'center', justifyContent: 'center', shadowColor: KB.neon, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 20 },
  checkIcon:      { fontSize: 28, color: KB.bg, fontWeight: '900' },
  missionLabel:   { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 3, marginBottom: 8 },
  projectTitle:   { fontSize: 26, fontWeight: '900', color: KB.text, letterSpacing: 2, fontFamily: MONO, marginBottom: 4 },
  heroSub:        { fontSize: 14, color: KB.textSub, letterSpacing: 1, marginBottom: 18 },
  metricsRow:     { flexDirection: 'row', alignItems: 'center', gap: 0 },
  metric:         { flex: 1, alignItems: 'center' },
  metricVal:      { fontSize: 18, fontWeight: '900', color: KB.neon },
  metricLbl:      { fontSize: 7, fontWeight: '800', color: KB.textDim, letterSpacing: 1.5, marginTop: 2 },
  metricDivider:  { width: 1, height: 30, backgroundColor: KB.border },
  quickActions:   { flexDirection: 'row', marginHorizontal: 14, marginTop: 12, gap: 8 },
  qaBtn:          { flex: 1, backgroundColor: KB.bgCard, borderRadius: 12, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: KB.border, gap: 4 },
  qaIcon:         { fontSize: 16 },
  qaTxt:          { fontSize: 8, fontWeight: '800', color: KB.textSub, letterSpacing: 1 },
  sections:       { flexDirection: 'row', marginHorizontal: 14, marginTop: 12, gap: 6 },
  secTab:         { flex: 1, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: KB.border, alignItems: 'center' },
  secTabActive:   { backgroundColor: KB.neon, borderColor: KB.neon },
  secTabTxt:      { fontSize: 8, fontWeight: '800', color: KB.textDim, letterSpacing: 0.5 },
  scroll:         { flex: 1 },
  pad:            { padding: 14 },
  overviewCard:   { backgroundColor: KB.bgCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: KB.border, marginBottom: 14 },
  overviewTitle:  { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 2, marginBottom: 14 },
  overviewRow:    { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: KB.border },
  overviewKey:    { fontSize: 12, color: KB.textDim },
  overviewVal:    { fontSize: 12, color: KB.text, fontWeight: '700', fontFamily: MONO },
  deployBtn:      { backgroundColor: '#000000', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 10, borderWidth: 1.5, borderColor: KB.neon, shadowColor: KB.neon, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10 },
  deployBtnTxt:   { fontSize: 13, fontWeight: '900', color: KB.neon, letterSpacing: 2 },
  downloadBtn:    { backgroundColor: KB.bgCard, borderRadius: 14, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: KB.border },
  downloadBtnTxt: { fontSize: 12, fontWeight: '800', color: KB.textSub, letterSpacing: 1.5 },
  sectionTitle:   { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 2, marginBottom: 14 },
  filesCard:      { backgroundColor: KB.bgCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: KB.border, marginBottom: 14 },
  fileRow:        { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: KB.border, gap: 10 },
  langDot:        { width: 8, height: 8, borderRadius: 4 },
  fileInfo:       { flex: 1 },
  fileName:       { fontSize: 13, color: KB.text, fontFamily: MONO },
  fileSize:       { fontSize: 10, color: KB.textDim, marginTop: 2 },
  langTag:        { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5 },
  langTagTxt:     { fontSize: 9, fontWeight: '800' },
  fileDone:       { fontSize: 12, color: KB.neon, fontWeight: '800' },
  connCard:       { backgroundColor: KB.bgCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: KB.border, marginBottom: 14 },
  connRow:        { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: KB.border, gap: 12 },
  connIcon:       { fontSize: 20, width: 28, textAlign: 'center' },
  connName:       { flex: 1, fontSize: 13, color: KB.text, fontWeight: '600' },
  connBadge:      { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1 },
  connStatus:     { fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  settingsBtn:    { backgroundColor: KB.bgCard, borderRadius: 14, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: KB.border },
  settingsBtnTxt: { fontSize: 12, fontWeight: '800', color: KB.textSub, letterSpacing: 1 },
  previewCard:    { backgroundColor: KB.bgCard, borderRadius: 16, borderWidth: 1, borderColor: KB.borderNeon, overflow: 'hidden', marginBottom: 14 },
  previewMockScreen:{ height: 180, backgroundColor: KB.bgTerminal, padding: 12, gap: 8 },
  mockNav:        { height: 28, backgroundColor: KB.bgElevated, borderRadius: 6 },
  mockHero:       { flex: 1, backgroundColor: KB.bgCard, borderRadius: 8, borderWidth: 1, borderColor: KB.borderNeon },
  mockCards:      { flexDirection: 'row', gap: 6 },
  mockCard:       { flex: 1, height: 36, backgroundColor: KB.bgElevated, borderRadius: 6 },
  previewCta:     { padding: 14, textAlign: 'center', fontSize: 11, fontWeight: '800', color: KB.neon, letterSpacing: 1.5 },
});
