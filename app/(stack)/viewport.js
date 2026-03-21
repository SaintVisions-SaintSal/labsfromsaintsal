/* ═══════════════════════════════════════════════════
   VIEWPORT — Mobile · Desktop · Live Preview
   Toggle between renders · High fidelity
   US Patent #10,290,222 · HACP Protocol
═══════════════════════════════════════════════════ */
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, Animated, Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { KB, MONO } from '../../src/theme';
import { CornerBrackets, PulseDot } from '../../src/components';

const { width: SW } = Dimensions.get('window');

const VIEWPORTS = [
  { id: 'mobile',  label: 'MOBILE',  icon: '📱', w: 390,  h: 844  },
  { id: 'desktop', label: 'DESKTOP', icon: '🖥',  w: 1440, h: 900  },
];

/* ── Mock rendered preview frames ───────────────── */
function MobilePreview({ projectName }) {
  return (
    <View style={mp.phone}>
      <View style={mp.notch} />
      <View style={mp.screen}>
        {/* Mock app UI */}
        <View style={mp.appHeader}>
          <View style={mp.appHeaderDot} />
          <Text style={mp.appHeaderTxt}>{projectName || 'MY APP'}</Text>
        </View>
        <View style={mp.appHero}>
          <View style={[mp.shimmer, { height: 48, width: '80%', marginBottom: 10 }]} />
          <View style={[mp.shimmer, { height: 24, width: '60%', marginBottom: 18 }]} />
          <View style={mp.appCta} />
        </View>
        <View style={mp.appCards}>
          <View style={mp.appCard} />
          <View style={mp.appCard} />
        </View>
        <View style={mp.appNav}>
          {[0,1,2,3,4].map(i => <View key={i} style={[mp.navDot, i === 2 && mp.navDotActive]} />)}
        </View>
      </View>
      <View style={mp.homeBar} />
    </View>
  );
}

function DesktopPreview({ projectName }) {
  return (
    <View style={dp.mac}>
      <View style={dp.screen}>
        {/* Browser chrome */}
        <View style={dp.chrome}>
          <View style={dp.trafficLights}>
            {['#FF5F57','#FFBD2E','#28C840'].map(c => <View key={c} style={[dp.dot, { backgroundColor: c }]} />)}
          </View>
          <View style={dp.urlBar}><Text style={dp.urlTxt}>https://{(projectName || 'myapp').toLowerCase()}.vercel.app</Text></View>
        </View>
        {/* Site content */}
        <View style={dp.site}>
          <View style={dp.siteNav}>
            <View style={[dp.shimmer, { width: 80, height: 14 }]} />
            <View style={dp.navLinks}>
              {[0,1,2,3].map(i => <View key={i} style={[dp.shimmer, { width: 40, height: 10 }]} />)}
            </View>
            <View style={dp.siteCtaSmall} />
          </View>
          <View style={dp.siteHero}>
            <View style={[dp.shimmer, { height: 32, width: '70%', marginBottom: 12 }]} />
            <View style={[dp.shimmer, { height: 16, width: '50%', marginBottom: 20 }]} />
            <View style={dp.heroCta} />
          </View>
          <View style={dp.siteCards}>
            {[0,1,2].map(i => <View key={i} style={dp.siteCard} />)}
          </View>
        </View>
      </View>
      <View style={dp.stand} />
      <View style={dp.base} />
    </View>
  );
}

export default function ViewportScreen() {
  const router = useRouter();
  const { missionName } = useLocalSearchParams();
  const [viewport, setViewport] = useState('mobile');
  const [buildReady, setBuildReady] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const buildAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.3, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
    // Simulate render completing
    setTimeout(() => {
      setBuildReady(true);
      Animated.timing(buildAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backTxt}>‹</Text>
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerTitle}>LIVE PREVIEW</Text>
          <View style={s.liveRow}>
            <Animated.View style={{ opacity: buildReady ? 1 : pulseAnim }}>
              <PulseDot color={buildReady ? KB.neon : KB.amber} size={5} />
            </Animated.View>
            <Text style={[s.liveTxt, { color: buildReady ? KB.neon : KB.amber }]}>
              {buildReady ? 'RENDER COMPLETE' : 'RENDERING...'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={s.chatBtn}
          onPress={() => router.push({ pathname: '/(stack)/midchat', params: { missionName } })}
        >
          <Text style={s.chatBtnTxt}>CHAT</Text>
        </TouchableOpacity>
      </View>

      {/* Viewport Toggle */}
      <View style={s.vpToggle}>
        {VIEWPORTS.map(vp => (
          <TouchableOpacity
            key={vp.id}
            style={[s.vpBtn, viewport === vp.id && s.vpBtnActive]}
            onPress={() => setViewport(vp.id)}
          >
            <Text style={s.vpIcon}>{vp.icon}</Text>
            <Text style={[s.vpLabel, viewport === vp.id && { color: KB.bg }]}>{vp.label}</Text>
            <Text style={[s.vpSize, viewport === vp.id && { color: KB.bg + 'AA' }]}>{vp.w}×{vp.h}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats */}
      <View style={s.statsRow}>
        {[['4.2M', 'TOKENS', KB.neon], ['12', 'FILES', KB.agentStitch], ['45k', 'LINES', KB.agentGrok], ['0', 'ERRORS', KB.neon]].map(([v, l, c]) => (
          <View key={l} style={s.statBox}>
            <Text style={[s.statVal, { color: c }]}>{v}</Text>
            <Text style={s.statLbl}>{l}</Text>
          </View>
        ))}
      </View>

      {/* Preview */}
      <ScrollView style={s.scroll} contentContainerStyle={s.previewArea} showsVerticalScrollIndicator={false}>
        {!buildReady && (
          <View style={s.renderingOverlay}>
            <Animated.View style={{ opacity: pulseAnim }}>
              <Text style={s.renderingGlyph}>⬡</Text>
            </Animated.View>
            <Text style={s.renderingLabel}>RENDERING {viewport.toUpperCase()}...</Text>
            <Text style={s.renderingSub}>Architect agent is assembling your project</Text>
          </View>
        )}

        {buildReady && viewport === 'mobile' && (
          <Animated.View style={{ opacity: buildAnim }}>
            <MobilePreview projectName={missionName} />
          </Animated.View>
        )}

        {buildReady && viewport === 'desktop' && (
          <Animated.View style={{ opacity: buildAnim }}>
            <DesktopPreview projectName={missionName} />
          </Animated.View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom actions */}
      <View style={s.actions}>
        <TouchableOpacity
          style={s.actionSecondary}
          onPress={() => router.push({ pathname: '/(stack)/midchat', params: { missionName } })}
        >
          <Text style={s.actionSecondaryTxt}>💬 CHANGES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.actionPrimary, !buildReady && { opacity: 0.4 }]}
          disabled={!buildReady}
          onPress={() => router.push({ pathname: '/(stack)/finalized', params: { missionName } })}
        >
          <Text style={s.actionPrimaryTxt}>✅ FINALIZE PROJECT →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ── Mobile Preview Styles ───────────────────────── */
const mp = StyleSheet.create({
  phone:       { alignSelf: 'center', width: SW * 0.55, backgroundColor: '#111', borderRadius: 36, borderWidth: 2, borderColor: '#2A2A2A', padding: 8, shadowColor: KB.neon, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 20 },
  notch:       { width: 70, height: 8, borderRadius: 4, backgroundColor: '#1A1A1A', alignSelf: 'center', marginBottom: 6 },
  screen:      { backgroundColor: '#0A0A0F', borderRadius: 24, overflow: 'hidden', minHeight: 340 },
  appHeader:   { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, borderBottomWidth: 1, borderBottomColor: KB.border },
  appHeaderDot:{ width: 6, height: 6, borderRadius: 3, backgroundColor: KB.neon },
  appHeaderTxt:{ fontSize: 9, fontWeight: '800', color: KB.text, letterSpacing: 1 },
  appHero:     { padding: 14, alignItems: 'flex-start' },
  shimmer:     { backgroundColor: KB.bgElevated, borderRadius: 6 },
  appCta:      { width: '50%', height: 28, borderRadius: 14, backgroundColor: KB.neon + '80' },
  appCards:    { flexDirection: 'row', gap: 8, paddingHorizontal: 14, marginBottom: 10 },
  appCard:     { flex: 1, height: 60, borderRadius: 10, backgroundColor: KB.bgElevated },
  appNav:      { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderTopColor: KB.border },
  navDot:      { width: 5, height: 5, borderRadius: 2.5, backgroundColor: KB.textDim },
  navDotActive:{ backgroundColor: KB.neon, width: 16, borderRadius: 8 },
  homeBar:     { width: 50, height: 4, borderRadius: 2, backgroundColor: '#333', alignSelf: 'center', marginTop: 6 },
});

/* ── Desktop Preview Styles ──────────────────────── */
const dp = StyleSheet.create({
  mac:          { alignSelf: 'center', width: SW * 0.88, alignItems: 'center' },
  screen:       { width: '100%', backgroundColor: '#0A0A0F', borderRadius: 12, borderWidth: 1, borderColor: '#333', overflow: 'hidden', shadowColor: KB.neon, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.15, shadowRadius: 20 },
  chrome:       { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#111', paddingHorizontal: 10, paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: '#222' },
  trafficLights:{ flexDirection: 'row', gap: 4 },
  dot:          { width: 8, height: 8, borderRadius: 4 },
  urlBar:       { flex: 1, backgroundColor: '#1A1A1A', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  urlTxt:       { fontSize: 8, color: KB.textDim, fontFamily: MONO },
  site:         { padding: 12 },
  siteNav:      { flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 10 },
  navLinks:     { flex: 1, flexDirection: 'row', gap: 10 },
  siteCtaSmall: { width: 40, height: 16, borderRadius: 8, backgroundColor: KB.neon + '80' },
  siteHero:     { alignItems: 'flex-start', marginBottom: 14 },
  heroCta:      { width: 80, height: 22, borderRadius: 11, backgroundColor: KB.neon + '80' },
  siteCards:    { flexDirection: 'row', gap: 8 },
  siteCard:     { flex: 1, height: 50, borderRadius: 8, backgroundColor: KB.bgElevated },
  shimmer:      { backgroundColor: KB.bgElevated, borderRadius: 4 },
  stand:        { width: 30, height: 16, backgroundColor: '#222' },
  base:         { width: 80, height: 6, backgroundColor: '#1A1A1A', borderRadius: 3 },
});

/* ── Main Styles ─────────────────────────────────── */
const s = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: KB.bg },
  header:         { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: KB.borderNeon },
  backBtn:        { padding: 6 },
  backTxt:        { fontSize: 28, color: KB.neon, fontWeight: '300' },
  headerCenter:   { flex: 1, marginLeft: 8 },
  headerTitle:    { fontSize: 14, fontWeight: '900', color: KB.text, letterSpacing: 2 },
  liveRow:        { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  liveTxt:        { fontSize: 8, fontWeight: '800', letterSpacing: 2 },
  chatBtn:        { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, borderWidth: 1, borderColor: KB.borderNeon },
  chatBtnTxt:     { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 1 },
  vpToggle:       { flexDirection: 'row', marginHorizontal: 14, marginTop: 12, gap: 10 },
  vpBtn:          { flex: 1, backgroundColor: KB.bgCard, borderRadius: 12, borderWidth: 1, borderColor: KB.border, alignItems: 'center', paddingVertical: 10 },
  vpBtnActive:    { backgroundColor: KB.neon, borderColor: KB.neon },
  vpIcon:         { fontSize: 18, marginBottom: 2 },
  vpLabel:        { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 1 },
  vpSize:         { fontSize: 8, color: KB.textDim, marginTop: 1 },
  statsRow:       { flexDirection: 'row', marginHorizontal: 14, marginTop: 12, gap: 8 },
  statBox:        { flex: 1, backgroundColor: KB.bgCard, borderRadius: 10, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: KB.border },
  statVal:        { fontSize: 16, fontWeight: '900' },
  statLbl:        { fontSize: 7, fontWeight: '800', color: KB.textDim, letterSpacing: 1, marginTop: 2 },
  scroll:         { flex: 1 },
  previewArea:    { paddingVertical: 20, alignItems: 'center' },
  renderingOverlay:{ alignItems: 'center', gap: 14, paddingVertical: 40 },
  renderingGlyph: { fontSize: 48, color: KB.neon },
  renderingLabel: { fontSize: 14, fontWeight: '800', color: KB.neon, letterSpacing: 3 },
  renderingSub:   { fontSize: 12, color: KB.textDim, textAlign: 'center' },
  actions:        { flexDirection: 'row', margin: 14, gap: 10 },
  actionSecondary:{ flex: 1, borderWidth: 1, borderColor: KB.borderNeon, borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  actionSecondaryTxt:{ fontSize: 11, fontWeight: '800', color: KB.neon, letterSpacing: 1 },
  actionPrimary:  { flex: 2, backgroundColor: KB.neon, borderRadius: 14, paddingVertical: 14, alignItems: 'center', shadowColor: KB.neon, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10 },
  actionPrimaryTxt:{ fontSize: 12, fontWeight: '900', color: KB.bg, letterSpacing: 1 },
});
