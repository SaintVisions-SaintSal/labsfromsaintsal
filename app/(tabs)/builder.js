/* ═══════════════════════════════════════════════════
   BUILDER TAB — Hub to launch builds
═══════════════════════════════════════════════════ */
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { KB, MONO } from '../../src/theme';
import { CornerBrackets, PulseDot } from '../../src/components';

const BUILD_TYPES = [
  { id: 'fullapp',  label: 'FULL APP',     icon: '📱', desc: 'End-to-end native or web app' },
  { id: 'saas',     label: 'SAAS',         icon: '☁️',  desc: 'SaaS with auth + billing' },
  { id: 'api',      label: 'API',          icon: '🔌', desc: 'REST or GraphQL API' },
  { id: 'landing',  label: 'LANDING',      icon: '🚀', desc: 'High-converting landing page' },
  { id: 'dashboard',label: 'DASHBOARD',    icon: '📊', desc: 'Data dashboard + analytics' },
  { id: 'mobile',   label: 'MOBILE',       icon: '⚡', desc: 'React Native mobile app' },
];

const TEMPLATES = [
  { name: 'SaaS Starter',     tags: ['Auth', 'Stripe', 'DB'],      color: KB.neon },
  { name: 'Portfolio Pro',    tags: ['Animations', 'Dark'],         color: KB.agentStitch },
  { name: 'API Gateway',      tags: ['REST', 'Auth', 'Rate Limit'], color: KB.agentGrok },
  { name: 'E-Commerce Kit',   tags: ['Cart', 'Stripe', 'CMS'],     color: KB.amber },
];

export default function BuilderTab() {
  const router = useRouter();
  const [buildType, setBuildType] = useState('fullapp');
  const [prompt, setPrompt] = useState('');

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.title}>BUILDER</Text>
            <Text style={s.sub}>Architect · Build · Ship</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(stack)/planning')} style={s.histBtn}>
            <Text style={s.histBtnTxt}>HISTORY</Text>
          </TouchableOpacity>
        </View>

        {/* Type selector */}
        <Text style={s.sectionLabel}>BUILD TYPE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.typeRow}>
          {BUILD_TYPES.map(t => (
            <TouchableOpacity
              key={t.id}
              style={[s.typeCard, buildType === t.id && s.typeCardActive]}
              onPress={() => setBuildType(t.id)}
            >
              <Text style={s.typeIcon}>{t.icon}</Text>
              <Text style={[s.typeLabel, buildType === t.id && { color: KB.bg }]}>{t.label}</Text>
              <Text style={[s.typeDesc, buildType === t.id && { color: KB.bg + 'CC' }]}>{t.desc}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Prompt */}
        <Text style={s.sectionLabel}>DESCRIBE YOUR BUILD</Text>
        <View style={s.promptCard}>
          <CornerBrackets color={KB.neon} size={10} thickness={1.5} />
          <TextInput
            style={s.promptInput}
            value={prompt}
            onChangeText={setPrompt}
            placeholder="Build a SaaS platform with Supabase auth, Stripe billing, and a real-time dashboard..."
            placeholderTextColor={KB.textDim}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        {/* Launch CTA */}
        <TouchableOpacity
          style={s.launchBtn}
          onPress={() => router.push({ pathname: '/(stack)/chat', params: { buildType, initialPrompt: prompt } })}
          activeOpacity={0.85}
        >
          <Text style={s.launchTxt}>⚡ START BUILD WITH SAL</Text>
        </TouchableOpacity>

        {/* Or plan first */}
        <TouchableOpacity
          style={s.planBtn}
          onPress={() => router.push({ pathname: '/(stack)/planning', params: { prompt } })}
        >
          <Text style={s.planTxt}>→ PLAN FIRST WITH ARCHITECT</Text>
        </TouchableOpacity>

        {/* Templates */}
        <Text style={s.sectionLabel}>TEMPLATES</Text>
        {TEMPLATES.map(tmpl => (
          <TouchableOpacity
            key={tmpl.name}
            style={s.tmplCard}
            onPress={() => router.push({ pathname: '/(stack)/chat', params: { initialPrompt: `Build a ${tmpl.name}` } })}
          >
            <CornerBrackets color={tmpl.color + '40'} size={7} thickness={1} />
            <View style={s.tmplLeft}>
              <Text style={[s.tmplName, { color: tmpl.color }]}>{tmpl.name}</Text>
              <View style={s.tagsRow}>
                {tmpl.tags.map(tag => (
                  <View key={tag} style={[s.tag, { borderColor: tmpl.color + '40', backgroundColor: tmpl.color + '15' }]}>
                    <Text style={[s.tagTxt, { color: tmpl.color }]}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
            <Text style={[s.tmplArrow, { color: tmpl.color }]}>→</Text>
          </TouchableOpacity>
        ))}

        {/* Stats */}
        <View style={s.statsRow}>
          <View style={s.statBox}>
            <PulseDot color={KB.neon} />
            <Text style={s.statVal}>3</Text>
            <Text style={s.statLbl}>BUILDS</Text>
          </View>
          <View style={s.statBox}>
            <PulseDot color={KB.amber} />
            <Text style={s.statVal}>28</Text>
            <Text style={s.statLbl}>FILES</Text>
          </View>
          <View style={s.statBox}>
            <PulseDot color={KB.agentStitch} />
            <Text style={s.statVal}>8.1M</Text>
            <Text style={s.statLbl}>TOKENS</Text>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: KB.bg },
  header:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  title:         { fontSize: 22, fontWeight: '900', color: KB.text, letterSpacing: 2 },
  sub:           { fontSize: 10, color: KB.textDim, letterSpacing: 1.5, marginTop: 2 },
  histBtn:       { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: KB.borderNeon },
  histBtnTxt:    { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 1 },
  sectionLabel:  { fontSize: 9, fontWeight: '800', color: KB.textDim, letterSpacing: 2.5, marginHorizontal: 16, marginTop: 20, marginBottom: 10 },
  typeRow:       { paddingHorizontal: 16, gap: 10, paddingBottom: 4 },
  typeCard:      { width: 110, backgroundColor: KB.bgCard, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: KB.border, gap: 4 },
  typeCardActive:{ backgroundColor: KB.neon, borderColor: KB.neon },
  typeIcon:      { fontSize: 18, marginBottom: 4 },
  typeLabel:     { fontSize: 10, fontWeight: '800', color: KB.neon, letterSpacing: 1 },
  typeDesc:      { fontSize: 9, color: KB.textDim, lineHeight: 13 },
  promptCard:    { marginHorizontal: 16, backgroundColor: KB.bgTerminal, borderRadius: 14, borderWidth: 1, borderColor: KB.borderNeon, padding: 14 },
  promptInput:   { fontSize: 14, color: KB.text, minHeight: 100, fontFamily: MONO },
  launchBtn:     { marginHorizontal: 16, marginTop: 16, backgroundColor: KB.neon, borderRadius: 14, paddingVertical: 17, alignItems: 'center', shadowColor: KB.neon, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 14 },
  launchTxt:     { fontSize: 14, fontWeight: '900', color: KB.bg, letterSpacing: 2 },
  planBtn:       { marginHorizontal: 16, marginTop: 10, paddingVertical: 13, borderRadius: 14, borderWidth: 1, borderColor: KB.borderNeon, alignItems: 'center' },
  planTxt:       { fontSize: 11, fontWeight: '800', color: KB.neon, letterSpacing: 1.5 },
  tmplCard:      { marginHorizontal: 16, marginBottom: 10, backgroundColor: KB.bgCard, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: KB.border, flexDirection: 'row', alignItems: 'center' },
  tmplLeft:      { flex: 1 },
  tmplName:      { fontSize: 14, fontWeight: '800', marginBottom: 8 },
  tagsRow:       { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  tag:           { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1 },
  tagTxt:        { fontSize: 9, fontWeight: '700' },
  tmplArrow:     { fontSize: 20, fontWeight: '700' },
  statsRow:      { flexDirection: 'row', marginHorizontal: 16, marginTop: 24, gap: 10 },
  statBox:       { flex: 1, backgroundColor: KB.bgCard, borderRadius: 12, padding: 14, alignItems: 'center', gap: 6, borderWidth: 1, borderColor: KB.border },
  statVal:       { fontSize: 20, fontWeight: '900', color: KB.text },
  statLbl:       { fontSize: 8, fontWeight: '800', color: KB.textDim, letterSpacing: 1.5 },
});
