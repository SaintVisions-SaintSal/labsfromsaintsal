/* ═══════════════════════════════════════════════════
   PROFILE — User account · Usage · Tier · Connectors
   US Patent #10,290,222 · HACP Protocol
═══════════════════════════════════════════════════ */
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, TextInput, Switch, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { KB, MONO } from '../../src/theme';
import { CornerBrackets, PulseDot } from '../../src/components';

const USAGE_STATS = [
  { label: 'TOKENS USED',    value: '4.2M',  max: '∞',    color: KB.neon    },
  { label: 'BUILDS',         value: '3',     max: '∞',    color: KB.agentStitch },
  { label: 'FILES GENERATED',value: '28',    max: '∞',    color: KB.agentGrok },
  { label: 'API CALLS',      value: '1.2K',  max: '∞',    color: KB.amber   },
];

const PLAN_FEATURES = [
  '⚡ Unlimited HACP™ builds',
  '🧠 All 7 AI providers',
  '▲ Vercel auto-deploy',
  '🌊 Render Pro backend',
  '🗄️ Supabase included',
  '💳 Stripe billing wired',
  '🎙 ElevenLabs voice',
  '📱 iOS + Android builds',
  '⬇ Unlimited downloads',
  '🔌 All connectors',
];

export default function ProfileScreen() {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName]   = useState('Ryan Capatosto');
  const [email, setEmail] = useState('ryan@saintvisiongroup.com');
  const [notifications, setNotifications] = useState(true);
  const [betaAccess, setBetaAccess] = useState(true);

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backTxt}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>PROFILE</Text>
        <TouchableOpacity onPress={() => setEditing(e => !e)} style={s.editBtn}>
          <Text style={s.editBtnTxt}>{editing ? 'SAVE' : 'EDIT'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Avatar + Identity */}
        <View style={s.identity}>
          <View style={s.avatarWrap}>
            <View style={s.avatar}>
              <Text style={s.avatarGlyph}>⬡</Text>
            </View>
            <View style={s.avatarBadge}>
              <Text style={s.avatarBadgeTxt}>PRO</Text>
            </View>
          </View>

          {editing ? (
            <View style={s.editFields}>
              <TextInput style={s.editInput} value={name} onChangeText={setName} placeholder="Name" placeholderTextColor={KB.textDim} />
              <TextInput style={s.editInput} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={KB.textDim} autoCapitalize="none" keyboardType="email-address" />
            </View>
          ) : (
            <View style={s.identityInfo}>
              <Text style={s.identityName}>{name}</Text>
              <Text style={s.identityEmail}>{email}</Text>
              <View style={s.identityBadgeRow}>
                <View style={s.identityBadge}>
                  <PulseDot color={KB.neon} size={5} />
                  <Text style={s.identityBadgeTxt}>SAINTSALÂ LABS PRO</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Plan Card */}
        <View style={s.planCard}>
          <CornerBrackets color={KB.gold} size={10} thickness={1.5} />
          <View style={s.planHeader}>
            <Text style={s.planGlyph}>⬡</Text>
            <View>
              <Text style={s.planName}>HYPER-AGENTIC PRO</Text>
              <Text style={s.planSub}>Full Spectrum · No Limits · All Providers</Text>
            </View>
            <Text style={s.planPrice}>$99<Text style={{ fontSize: 11 }}>/mo</Text></Text>
          </View>
          <View style={s.planFeatures}>
            {PLAN_FEATURES.map(f => (
              <Text key={f} style={s.planFeature}>{f}</Text>
            ))}
          </View>
          <TouchableOpacity style={s.planBtn} onPress={() => Alert.alert('Billing', 'Opening Stripe billing portal...')}>
            <Text style={s.planBtnTxt}>MANAGE BILLING →</Text>
          </TouchableOpacity>
        </View>

        {/* Usage */}
        <Text style={s.sectionLabel}>USAGE THIS CYCLE</Text>
        <View style={s.usageGrid}>
          {USAGE_STATS.map(stat => (
            <View key={stat.label} style={s.usageStat}>
              <Text style={[s.usageVal, { color: stat.color }]}>{stat.value}</Text>
              <Text style={s.usageMax}>/ {stat.max}</Text>
              <Text style={s.usageLbl}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick links */}
        <Text style={s.sectionLabel}>ACCOUNT</Text>
        <View style={s.linksCard}>
          {[
            { label: 'API Settings',     icon: '🔌', route: '/(stack)/settings' },
            { label: 'Connectors Hub',   icon: '⚙️', route: '/(stack)/settings' },
            { label: 'Downloads',        icon: '↓',  route: '/(stack)/settings' },
            { label: 'Deploy Settings',  icon: '▲',  route: '/(stack)/settings' },
          ].map(link => (
            <TouchableOpacity key={link.label} style={s.linkRow} onPress={() => router.push(link.route)}>
              <Text style={s.linkIcon}>{link.icon}</Text>
              <Text style={s.linkLabel}>{link.label}</Text>
              <Text style={s.linkArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Preferences */}
        <Text style={s.sectionLabel}>PREFERENCES</Text>
        <View style={s.prefCard}>
          <View style={s.prefRow}>
            <View>
              <Text style={s.prefLabel}>Push Notifications</Text>
              <Text style={s.prefSub}>Build completions + alerts</Text>
            </View>
            <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: KB.neon }} thumbColor="#FFF" />
          </View>
          <View style={s.prefRow}>
            <View>
              <Text style={s.prefLabel}>Beta Features</Text>
              <Text style={s.prefSub}>Early access to new agents</Text>
            </View>
            <Switch value={betaAccess} onValueChange={setBetaAccess} trackColor={{ true: KB.neon }} thumbColor="#FFF" />
          </View>
        </View>

        {/* Company info */}
        <View style={s.companyCard}>
          <CornerBrackets color={KB.borderGold} size={7} thickness={1} />
          <Text style={s.companyTitle}>SAINT VISION TECHNOLOGIES LLC</Text>
          <Text style={s.companyLine}>EIN: 39-4183220</Text>
          <Text style={s.companyLine}>Huntington Beach, CA 92648</Text>
          <Text style={s.companyLine}>Patent #10,290,222 · HACP™ Protocol</Text>
        </View>

        {/* Danger zone */}
        <View style={s.dangerZone}>
          <TouchableOpacity
            style={s.dangerBtn}
            onPress={() => Alert.alert('Sign Out', 'Are you sure?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Sign Out', style: 'destructive', onPress: () => router.replace('/') },
            ])}
          >
            <Text style={s.dangerBtnTxt}>SIGN OUT</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: KB.bg },
  header:           { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: KB.borderNeon },
  backBtn:          { padding: 6 },
  backTxt:          { fontSize: 28, color: KB.neon, fontWeight: '300' },
  headerTitle:      { fontSize: 15, fontWeight: '900', color: KB.text, letterSpacing: 2 },
  editBtn:          { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, backgroundColor: KB.neon + '20', borderWidth: 1, borderColor: KB.borderNeon },
  editBtnTxt:       { fontSize: 10, fontWeight: '800', color: KB.neon, letterSpacing: 1 },
  identity:         { flexDirection: 'row', alignItems: 'center', margin: 16, gap: 16 },
  avatarWrap:       { position: 'relative' },
  avatar:           { width: 72, height: 72, borderRadius: 36, backgroundColor: KB.goldDim, borderWidth: 2, borderColor: KB.gold, alignItems: 'center', justifyContent: 'center', shadowColor: KB.gold, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 12 },
  avatarGlyph:      { fontSize: 30, color: KB.gold },
  avatarBadge:      { position: 'absolute', bottom: -4, right: -4, backgroundColor: KB.neon, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  avatarBadgeTxt:   { fontSize: 7, fontWeight: '900', color: KB.bg, letterSpacing: 1 },
  identityInfo:     { flex: 1 },
  identityName:     { fontSize: 20, fontWeight: '900', color: KB.text },
  identityEmail:    { fontSize: 12, color: KB.textDim, fontFamily: MONO, marginTop: 4 },
  identityBadgeRow: { flexDirection: 'row', marginTop: 8 },
  identityBadge:    { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: KB.neonGlow, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: KB.borderNeon },
  identityBadgeTxt: { fontSize: 8, fontWeight: '900', color: KB.neon, letterSpacing: 1.5 },
  editFields:       { flex: 1, gap: 10 },
  editInput:        { backgroundColor: KB.bgCard, borderRadius: 10, padding: 12, fontSize: 14, color: KB.text, borderWidth: 1, borderColor: KB.borderNeon, fontFamily: MONO },
  planCard:         { marginHorizontal: 16, backgroundColor: KB.bgCard, borderRadius: 18, padding: 18, borderWidth: 1.5, borderColor: KB.borderGold, marginBottom: 20 },
  planHeader:       { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  planGlyph:        { fontSize: 28, color: KB.gold },
  planName:         { fontSize: 13, fontWeight: '900', color: KB.gold, letterSpacing: 1 },
  planSub:          { fontSize: 9, color: KB.textDim, marginTop: 2 },
  planPrice:        { marginLeft: 'auto', fontSize: 22, fontWeight: '900', color: KB.gold },
  planFeatures:     { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 },
  planFeature:      { fontSize: 11, color: KB.text, width: '48%' },
  planBtn:          { backgroundColor: KB.goldDim, borderRadius: 10, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: KB.borderGold },
  planBtnTxt:       { fontSize: 11, fontWeight: '800', color: KB.gold, letterSpacing: 1.5 },
  sectionLabel:     { fontSize: 9, fontWeight: '800', color: KB.textDim, letterSpacing: 2.5, marginHorizontal: 16, marginBottom: 10, marginTop: 4 },
  usageGrid:        { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 16, gap: 8, marginBottom: 20 },
  usageStat:        { width: '47%', backgroundColor: KB.bgCard, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: KB.border, alignItems: 'center' },
  usageVal:         { fontSize: 24, fontWeight: '900' },
  usageMax:         { fontSize: 10, color: KB.textDim, marginTop: 2 },
  usageLbl:         { fontSize: 8, fontWeight: '800', color: KB.textDim, letterSpacing: 1.5, marginTop: 4, textAlign: 'center' },
  linksCard:        { marginHorizontal: 16, backgroundColor: KB.bgCard, borderRadius: 16, borderWidth: 1, borderColor: KB.border, marginBottom: 20, overflow: 'hidden' },
  linkRow:          { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: KB.border, gap: 12 },
  linkIcon:         { fontSize: 18, width: 24, textAlign: 'center' },
  linkLabel:        { flex: 1, fontSize: 14, color: KB.text, fontWeight: '600' },
  linkArrow:        { fontSize: 20, color: KB.neon },
  prefCard:         { marginHorizontal: 16, backgroundColor: KB.bgCard, borderRadius: 16, borderWidth: 1, borderColor: KB.border, marginBottom: 20, overflow: 'hidden' },
  prefRow:          { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderBottomWidth: 1, borderBottomColor: KB.border },
  prefLabel:        { fontSize: 14, color: KB.text, fontWeight: '600' },
  prefSub:          { fontSize: 10, color: KB.textDim, marginTop: 2 },
  companyCard:      { marginHorizontal: 16, backgroundColor: KB.bgCard, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: KB.borderGold, marginBottom: 20, alignItems: 'center', gap: 4 },
  companyTitle:     { fontSize: 11, fontWeight: '900', color: KB.gold, letterSpacing: 1, textAlign: 'center' },
  companyLine:      { fontSize: 10, color: KB.textDim, textAlign: 'center' },
  dangerZone:       { marginHorizontal: 16, marginBottom: 10 },
  dangerBtn:        { borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: KB.error + '40', backgroundColor: KB.error + '10' },
  dangerBtnTxt:     { fontSize: 12, fontWeight: '800', color: KB.error, letterSpacing: 2 },
});
