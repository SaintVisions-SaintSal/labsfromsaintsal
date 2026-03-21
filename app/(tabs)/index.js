/* ═══════════════════════════════════════════════════
   SAL HOME — "ENGINEER THE FUTURE"
   Hero screen · Builder CTA · Recent projects
═══════════════════════════════════════════════════ */
import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, Animated, Dimensions, TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { KB, MONO } from '../../src/theme';
import { CornerBrackets, PulseDot } from '../../src/components';

const { width: SW } = Dimensions.get('window');

const RECENT = [
  { id: '1', name: 'PROTO_MOTORS',  type: 'Full App',    status: 'complete', tokens: '4.2M', files: 12 },
  { id: '2', name: 'NEXUS_LANDING', type: 'Landing Page', status: 'building', tokens: '1.8M', files: 7  },
  { id: '3', name: 'VAULT_API',     type: 'REST API',     status: 'complete', tokens: '2.1M', files: 9  },
];

const STATUS_COLOR = { complete: KB.neon, building: KB.amber, error: KB.error };

export default function SALHome() {
  const router = useRouter();
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const glowOpacity = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.15, 0.4] });

  const handleLaunch = () => {
    router.push({ pathname: '/(stack)/chat', params: { initialPrompt: prompt } });
  };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* ── Header ── */}
        <View style={s.header}>
          <View style={s.headerLeft}>
            <PulseDot color={KB.neon} size={6} />
            <Text style={s.headerLabel}>HACP™ ACTIVE</Text>
          </View>
          <TouchableOpacity style={s.avatarBtn} onPress={() => router.push('/(stack)/profile')}>
            <Text style={s.avatarGlyph}>⬡</Text>
          </TouchableOpacity>
        </View>

        {/* ── Hero ── */}
        <Animated.View style={[s.hero, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Animated.View style={[s.heroGlow, { opacity: glowOpacity }]} />
          <Text style={s.heroEyebrow}>SAINTSALÂ LABS</Text>
          <Text style={s.heroTitle}>ENGINEER{'\n'}THE FUTURE</Text>
          <Text style={s.heroSub}>
            Hyper-agentic AI builder. Describe anything.{'\n'}We architect, build, and ship it.
          </Text>

          {/* Prompt Input */}
          <View style={s.promptWrap}>
            <CornerBrackets color={KB.neon} size={12} thickness={1.5} />
            <TextInput
              style={s.promptInput}
              value={prompt}
              onChangeText={setPrompt}
              placeholder="Describe what you want to build..."
              placeholderTextColor={KB.textDim}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              returnKeyType="done"
            />
          </View>

          <TouchableOpacity style={s.ctaBtn} onPress={handleLaunch} activeOpacity={0.85}>
            <View style={s.ctaBtnInner}>
              <Text style={s.ctaTxt}>CHAT WITH SAL</Text>
              <Text style={s.ctaArrow}>→</Text>
            </View>
          </TouchableOpacity>

          {/* Quick starters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.startersRow}>
            {['SaaS landing page', 'Mobile app', 'REST API', 'E-commerce', 'Dashboard'].map(s2 => (
              <TouchableOpacity key={s2} style={s.starterChip} onPress={() => setPrompt(`Build a ${s2}`)}>
                <Text style={s.starterTxt}>{s2}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* ── Stats Row ── */}
        <View style={s.statsRow}>
          {[['4.2M', 'TOKENS USED'], ['12', 'FILES BUILT'], ['3', 'PROJECTS'], ['100%', 'UPTIME']].map(([v, l]) => (
            <View key={l} style={s.statCard}>
              <CornerBrackets color={KB.neonDim} size={6} thickness={1} />
              <Text style={s.statVal}>{v}</Text>
              <Text style={s.statLbl}>{l}</Text>
            </View>
          ))}
        </View>

        {/* ── Recent Projects ── */}
        <View style={s.sectionHead}>
          <Text style={s.sectionTitle}>RECENT PROJECTS</Text>
          <TouchableOpacity><Text style={s.sectionMore}>VIEW ALL →</Text></TouchableOpacity>
        </View>

        {RECENT.map(proj => (
          <TouchableOpacity
            key={proj.id}
            style={s.projCard}
            onPress={() => router.push({ pathname: '/(stack)/finalized', params: { projectName: proj.name } })}
            activeOpacity={0.8}
          >
            <CornerBrackets color={KB.borderNeon} size={8} thickness={1} />
            <View style={s.projLeft}>
              <View style={[s.projDot, { backgroundColor: STATUS_COLOR[proj.status] }]} />
              <View>
                <Text style={s.projName}>{proj.name}</Text>
                <Text style={s.projMeta}>{proj.type} · {proj.files} files · {proj.tokens} tokens</Text>
              </View>
            </View>
            <View style={[s.projBadge, { borderColor: STATUS_COLOR[proj.status] + '60' }]}>
              <Text style={[s.projStatus, { color: STATUS_COLOR[proj.status] }]}>{proj.status.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* ── Agent Cards ── */}
        <Text style={[s.sectionTitle, { marginHorizontal: 16, marginTop: 24, marginBottom: 12 }]}>ACTIVE AGENTS</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.agentsRow}>
          {[
            { name: 'ARCHITECT', role: 'Planning & Strategy', color: KB.agentGrok,   icon: '🧠', status: 'READY' },
            { name: 'STITCH',    role: 'Design & UI',         color: KB.agentStitch, icon: '🎨', status: 'READY' },
            { name: 'HACP™',     role: 'Code & Logic',        color: KB.neon,        icon: '⚡', status: 'ACTIVE' },
          ].map(agent => (
            <View key={agent.name} style={[s.agentCard, { borderColor: agent.color + '40' }]}>
              <CornerBrackets color={agent.color + '50'} size={8} thickness={1} />
              <Text style={s.agentIcon}>{agent.icon}</Text>
              <Text style={[s.agentName, { color: agent.color }]}>{agent.name}</Text>
              <Text style={s.agentRole}>{agent.role}</Text>
              <View style={[s.agentStatus, { backgroundColor: agent.color + '20', borderColor: agent.color + '50' }]}>
                <Text style={[s.agentStatusTxt, { color: agent.color }]}>{agent.status}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: KB.bg },
  scroll:        { paddingBottom: 24 },
  header:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  headerLeft:    { flexDirection: 'row', alignItems: 'center', gap: 6 },
  headerLabel:   { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 2 },
  avatarBtn:     { width: 34, height: 34, borderRadius: 17, backgroundColor: KB.goldDim, borderWidth: 1, borderColor: KB.gold, alignItems: 'center', justifyContent: 'center' },
  avatarGlyph:   { fontSize: 14, color: KB.gold },
  hero:          { marginHorizontal: 16, marginTop: 16, marginBottom: 24, backgroundColor: KB.bgCard, borderRadius: 20, padding: 22, borderWidth: 1, borderColor: KB.border, overflow: 'hidden' },
  heroGlow:      { position: 'absolute', top: -60, left: -40, width: 220, height: 220, borderRadius: 110, backgroundColor: KB.neon },
  heroEyebrow:   { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 3, marginBottom: 10 },
  heroTitle:     { fontSize: 38, fontWeight: '900', color: KB.text, lineHeight: 42, marginBottom: 12, letterSpacing: -1 },
  heroSub:       { fontSize: 13, color: KB.textSub, lineHeight: 20, marginBottom: 20 },
  promptWrap:    { backgroundColor: KB.bgTerminal, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: KB.borderNeon, marginBottom: 14 },
  promptInput:   { fontSize: 14, color: KB.text, minHeight: 72, fontFamily: MONO },
  ctaBtn:        { backgroundColor: KB.neon, borderRadius: 12, marginBottom: 14, shadowColor: KB.neon, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 14 },
  ctaBtnInner:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16 },
  ctaTxt:        { fontSize: 14, fontWeight: '900', color: KB.bg, letterSpacing: 2 },
  ctaArrow:      { fontSize: 18, color: KB.bg, fontWeight: '700' },
  startersRow:   { gap: 8, paddingTop: 4 },
  starterChip:   { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: KB.borderNeon, backgroundColor: KB.bgElevated },
  starterTxt:    { fontSize: 11, color: KB.neon, fontWeight: '700' },
  statsRow:      { flexDirection: 'row', marginHorizontal: 16, gap: 8, marginBottom: 24 },
  statCard:      { flex: 1, backgroundColor: KB.bgCard, borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: KB.border },
  statVal:       { fontSize: 18, fontWeight: '900', color: KB.neon, marginBottom: 2 },
  statLbl:       { fontSize: 7, fontWeight: '800', color: KB.textDim, letterSpacing: 1.5 },
  sectionHead:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16, marginBottom: 12 },
  sectionTitle:  { fontSize: 9, fontWeight: '800', color: KB.textSub, letterSpacing: 2.5 },
  sectionMore:   { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 1 },
  projCard:      { marginHorizontal: 16, marginBottom: 10, backgroundColor: KB.bgCard, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: KB.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  projLeft:      { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  projDot:       { width: 8, height: 8, borderRadius: 4 },
  projName:      { fontSize: 14, fontWeight: '800', color: KB.text, fontFamily: MONO, marginBottom: 3 },
  projMeta:      { fontSize: 10, color: KB.textDim },
  projBadge:     { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1 },
  projStatus:    { fontSize: 8, fontWeight: '800', letterSpacing: 1 },
  agentsRow:     { paddingHorizontal: 16, gap: 10, paddingBottom: 4 },
  agentCard:     { width: 130, backgroundColor: KB.bgCard, borderRadius: 14, padding: 14, borderWidth: 1, gap: 4 },
  agentIcon:     { fontSize: 20, marginBottom: 4 },
  agentName:     { fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  agentRole:     { fontSize: 10, color: KB.textDim, lineHeight: 14 },
  agentStatus:   { marginTop: 6, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 3, borderWidth: 1, alignSelf: 'flex-start' },
  agentStatusTxt:{ fontSize: 8, fontWeight: '800', letterSpacing: 1 },
});
