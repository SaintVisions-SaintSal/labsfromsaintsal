/* ═══════════════════════════════════════════════════
   MORE TAB — Nav Hub · All routes
═══════════════════════════════════════════════════ */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { KB } from '../../src/theme';
import { CornerBrackets, PulseDot } from '../../src/components';

const NAV_SECTIONS = [
  {
    label: 'BUILD',
    items: [
      { icon: '⚡', label: 'Builder',          sub: 'Full agentic builder',       route: '/(stack)/chat' },
      { icon: '🧠', label: 'Architect Plan',    sub: 'AI planning agent',          route: '/(stack)/planning' },
      { icon: '📱', label: 'Viewport Preview',  sub: 'Mobile + Desktop preview',   route: '/(stack)/viewport' },
      { icon: '✅', label: 'Project Finalized', sub: 'Launch & publish',           route: '/(stack)/finalized' },
    ],
  },
  {
    label: 'INTELLIGENCE',
    items: [
      { icon: '🔍', label: 'SAL Search',     sub: 'Perplexity-powered search',   route: '/(tabs)/search' },
      { icon: '💬', label: 'Chat with SAL',  sub: 'HACP™ conversational AI',     route: '/(stack)/chat' },
      { icon: '🌐', label: 'Global Intel',   sub: 'Full-spectrum intelligence',   route: '/(stack)/chat' },
    ],
  },
  {
    label: 'CONNECTORS',
    items: [
      { icon: '🔌', label: 'API Settings',  sub: 'All provider keys',    route: '/(stack)/settings' },
      { icon: '🗄️', label: 'Supabase',      sub: 'Database + Auth',      route: '/(stack)/settings' },
      { icon: '💳', label: 'Stripe',        sub: 'Payments + billing',   route: '/(stack)/settings' },
      { icon: '▲',  label: 'Vercel',        sub: 'Deploy + edge',        route: '/(stack)/settings' },
      { icon: '🌊', label: 'Render',        sub: 'Backend services',     route: '/(stack)/settings' },
      { icon: '🐙', label: 'GitHub',        sub: 'Version control',      route: '/(stack)/settings' },
    ],
  },
  {
    label: 'ACCOUNT',
    items: [
      { icon: '👤', label: 'Profile',       sub: 'Account + usage',       route: '/(stack)/profile' },
      { icon: '⚙️', label: 'Settings',      sub: 'Full settings panel',   route: '/(stack)/settings' },
      { icon: '📥', label: 'Downloads',     sub: 'Export your builds',    route: '/(stack)/finalized' },
    ],
  },
];

export default function MoreTab() {
  const router = useRouter();

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.title}>/// MORE</Text>
            <Text style={s.sub}>Navigation Hub</Text>
          </View>
          <View style={s.liveRow}>
            <PulseDot color={KB.neon} size={6} />
            <Text style={s.liveLabel}>ALL SYSTEMS LIVE</Text>
          </View>
        </View>

        {/* Tier badge */}
        <View style={s.tierCard}>
          <CornerBrackets color={KB.gold} size={10} thickness={1.5} />
          <View style={s.tierLeft}>
            <Text style={s.tierGlyph}>⬡</Text>
            <View>
              <Text style={s.tierName}>SaintSal™ LABS PRO</Text>
              <Text style={s.tierSub}>Hyper-Agentic · Full Spectrum · Unlimited</Text>
            </View>
          </View>
          <TouchableOpacity style={s.tierBtn} onPress={() => router.push('/(stack)/profile')}>
            <Text style={s.tierBtnTxt}>MANAGE</Text>
          </TouchableOpacity>
        </View>

        {/* Nav sections */}
        {NAV_SECTIONS.map(section => (
          <View key={section.label}>
            <Text style={s.sectionLabel}>{section.label}</Text>
            {section.items.map(item => (
              <TouchableOpacity
                key={item.label}
                style={s.navItem}
                onPress={() => router.push(item.route)}
                activeOpacity={0.75}
              >
                <View style={s.navIcon}>
                  <Text style={s.navIconTxt}>{item.icon}</Text>
                </View>
                <View style={s.navInfo}>
                  <Text style={s.navLabel}>{item.label}</Text>
                  <Text style={s.navSub}>{item.sub}</Text>
                </View>
                <Text style={s.navArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Patent footer */}
        <View style={s.footer}>
          <Text style={s.footerTxt}>US Patent #10,290,222 · HACP™ Protocol</Text>
          <Text style={s.footerTxt}>Saint Vision Technologies LLC · All rights reserved</Text>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: KB.bg },
  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  title:       { fontSize: 22, fontWeight: '900', color: KB.text, letterSpacing: 1 },
  sub:         { fontSize: 10, color: KB.textDim, letterSpacing: 1.5, marginTop: 2 },
  liveRow:     { flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveLabel:   { fontSize: 8, fontWeight: '800', color: KB.neon, letterSpacing: 2 },
  tierCard:    { marginHorizontal: 16, marginBottom: 20, backgroundColor: KB.bgCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: KB.borderGold, flexDirection: 'row', alignItems: 'center' },
  tierLeft:    { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  tierGlyph:   { fontSize: 28, color: KB.gold },
  tierName:    { fontSize: 13, fontWeight: '900', color: KB.gold, letterSpacing: 1 },
  tierSub:     { fontSize: 9, color: KB.textDim, marginTop: 2 },
  tierBtn:     { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, borderWidth: 1, borderColor: KB.goldDim },
  tierBtnTxt:  { fontSize: 9, fontWeight: '800', color: KB.gold, letterSpacing: 1 },
  sectionLabel:{ fontSize: 9, fontWeight: '800', color: KB.textDim, letterSpacing: 2.5, marginHorizontal: 16, marginTop: 20, marginBottom: 8 },
  navItem:     { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 2, backgroundColor: KB.bgCard, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: KB.border, gap: 12 },
  navIcon:     { width: 36, height: 36, borderRadius: 10, backgroundColor: KB.bgElevated, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: KB.border },
  navIconTxt:  { fontSize: 16 },
  navInfo:     { flex: 1 },
  navLabel:    { fontSize: 14, fontWeight: '700', color: KB.text },
  navSub:      { fontSize: 10, color: KB.textDim, marginTop: 2 },
  navArrow:    { fontSize: 20, color: KB.neon, fontWeight: '300' },
  footer:      { marginTop: 32, marginHorizontal: 16, alignItems: 'center', gap: 4 },
  footerTxt:   { fontSize: 9, color: KB.textGhost, letterSpacing: 1 },
});
