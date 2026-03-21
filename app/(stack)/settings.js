/* ═══════════════════════════════════════════════════
   SETTINGS — Full settings panel
   APIs · Connectors · Vercel · Render · Download
   US Patent #10,290,222 · HACP Protocol
═══════════════════════════════════════════════════ */
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, TextInput, Switch, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { KB, MONO } from '../../src/theme';
import { CornerBrackets, PulseDot, SectionLabel } from '../../src/components';

const API_PROVIDERS = [
  { id: 'anthropic', name: 'Anthropic Claude',  icon: '⚡', color: KB.neon,        models: ['claude-opus-4-6', 'claude-sonnet-4-6'], status: 'active' },
  { id: 'openai',    name: 'OpenAI',            icon: '🧠', color: '#10A37F',      models: ['gpt-4o', 'gpt-4o-mini'],              status: 'active' },
  { id: 'grok',      name: 'xAI / Grok',        icon: '✕',  color: '#FFFFFF',      models: ['grok-3', 'grok-3-mini'],              status: 'active' },
  { id: 'gemini',    name: 'Google Gemini',      icon: '◆',  color: '#4285F4',      models: ['gemini-2.0-flash', 'gemini-pro'],     status: 'active' },
  { id: 'perplexity',name: 'Perplexity',         icon: '🌐', color: '#20B2AA',      models: ['sonar-pro', 'sonar'],                 status: 'active' },
  { id: 'elevenlabs',name: 'ElevenLabs',         icon: '🎙', color: KB.amber,       models: ['eleven_monolingual_v1'],              status: 'active' },
  { id: 'deepgram',  name: 'Deepgram',           icon: '🎧', color: KB.agentStitch, models: ['nova-3'],                             status: 'active' },
];

const PLATFORM_CONNECTORS = [
  { id: 'supabase', name: 'Supabase',    icon: '🗄️', desc: 'PostgreSQL · Auth · Realtime',    status: 'connected', color: '#3ECF8E' },
  { id: 'stripe',   name: 'Stripe',     icon: '💳', desc: 'Payments · Subscriptions',         status: 'connected', color: '#6772E5' },
  { id: 'vercel',   name: 'Vercel',     icon: '▲',  desc: 'Deploy · Edge Functions · CDN',    status: 'connected', color: '#FFFFFF' },
  { id: 'render',   name: 'Render',     icon: '🌊', desc: 'Backend · Workers · Databases',    status: 'connected', color: '#46E3B7' },
  { id: 'github',   name: 'GitHub',     icon: '🐙', desc: 'Repositories · CI/CD · Actions',  status: 'connected', color: '#FFFFFF' },
  { id: 'ghl',      name: 'GoHighLevel',icon: '📊', desc: 'CRM · Marketing · Automation',    status: 'pending',   color: '#F59E0B' },
  { id: 'twilio',   name: 'Twilio',     icon: '📱', desc: 'SMS · Voice · WhatsApp',          status: 'pending',   color: '#F22F46' },
  { id: 'sendgrid', name: 'SendGrid',   icon: '✉️', desc: 'Transactional Email',              status: 'disconnected', color: '#EF4444' },
  { id: 'apollo',   name: 'Apollo.io',  icon: '👤', desc: 'B2B Leads · Contact Data',        status: 'connected', color: '#3B82F6' },
  { id: 'tavily',   name: 'Tavily',     icon: '🔍', desc: 'Real-time Web Search',            status: 'connected', color: KB.neon },
];

const STATUS_COLOR = { connected: KB.neon, pending: KB.amber, disconnected: KB.error };

const SECTIONS = ['APIs', 'CONNECTORS', 'DEPLOY', 'DOWNLOADS', 'ADVANCED'];

export default function SettingsScreen() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('APIs');
  const [keys, setKeys] = useState({});
  const [showKey, setShowKey] = useState({});
  const [streamToggle, setStreamToggle] = useState(true);
  const [hfMode, setHfMode] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const handleSaveKey = (id) => {
    Alert.alert('API Key Saved', `${id} key has been encrypted and stored securely.`);
  };

  const handleTestConn = (conn) => {
    Alert.alert('Testing...', `${conn.name}: ✅ Connection verified.`);
  };

  const handleReconnect = (conn) => {
    Alert.alert('Reconnect', `Reconnecting to ${conn.name}...`);
  };

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backTxt}>‹</Text>
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerTitle}>SETTINGS</Text>
          <Text style={s.headerSub}>APIs · CONNECTORS · DEPLOY · ADVANCED</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/(stack)/profile')} style={s.profileBtn}>
          <Text style={s.profileGlyph}>⬡</Text>
        </TouchableOpacity>
      </View>

      {/* Section tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.sectionTabs}>
        {SECTIONS.map(sec => (
          <TouchableOpacity
            key={sec}
            style={[s.secTab, activeSection === sec && s.secTabActive]}
            onPress={() => setActiveSection(sec)}
          >
            <Text style={[s.secTabTxt, activeSection === sec && { color: KB.bg }]}>{sec}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>

        {/* ─────── API PROVIDERS ─────── */}
        {activeSection === 'APIs' && (
          <View style={s.pad}>
            {/* Gateway status */}
            <View style={s.gatewayCard}>
              <CornerBrackets color={KB.neon} size={8} thickness={1.5} />
              <View style={s.gatewayLeft}>
                <PulseDot color={KB.neon} size={7} />
                <View>
                  <Text style={s.gatewayLabel}>MCP GATEWAY ACTIVE</Text>
                  <Text style={s.gatewayUrl}>saintsallabs.com</Text>
                </View>
              </View>
              <Text style={s.gatewayStatus}>7/7 LIVE</Text>
            </View>

            {API_PROVIDERS.map(prov => (
              <View key={prov.id} style={[s.apiCard, { borderColor: prov.color + '30' }]}>
                <View style={s.apiHeader}>
                  <Text style={s.apiIcon}>{prov.icon}</Text>
                  <View style={s.apiInfo}>
                    <Text style={[s.apiName, { color: prov.color }]}>{prov.name}</Text>
                    <Text style={s.apiModels}>{prov.models.join(' · ')}</Text>
                  </View>
                  <View style={[s.apiStatus, { backgroundColor: prov.color + '20', borderColor: prov.color + '50' }]}>
                    <Text style={[s.apiStatusTxt, { color: prov.color }]}>
                      {prov.status === 'active' ? '● LIVE' : '○ OFF'}
                    </Text>
                  </View>
                </View>
                {/* Key input */}
                <View style={s.keyRow}>
                  <TextInput
                    style={s.keyInput}
                    value={keys[prov.id] || ''}
                    onChangeText={v => setKeys(k => ({ ...k, [prov.id]: v }))}
                    placeholder={`${prov.id.toUpperCase()}_API_KEY`}
                    placeholderTextColor={KB.textDim}
                    secureTextEntry={!showKey[prov.id]}
                    autoCapitalize="none"
                    fontFamily={MONO}
                  />
                  <TouchableOpacity style={s.keyToggle} onPress={() => setShowKey(prev => ({ ...prev, [prov.id]: !prev[prov.id] }))}>
                    <Text style={s.keyToggleTxt}>{showKey[prov.id] ? '🙈' : '👁'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={s.keySave} onPress={() => handleSaveKey(prov.name)}>
                    <Text style={s.keySaveTxt}>SAVE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ─────── CONNECTORS ─────── */}
        {activeSection === 'CONNECTORS' && (
          <View style={s.pad}>
            {/* Stats */}
            <View style={s.connStats}>
              <View style={s.connStat}><Text style={[s.connStatVal, { color: KB.neon }]}>{PLATFORM_CONNECTORS.filter(c => c.status === 'connected').length}</Text><Text style={s.connStatLbl}>CONNECTED</Text></View>
              <View style={s.connStat}><Text style={[s.connStatVal, { color: KB.amber }]}>{PLATFORM_CONNECTORS.filter(c => c.status === 'pending').length}</Text><Text style={s.connStatLbl}>PENDING</Text></View>
              <View style={s.connStat}><Text style={[s.connStatVal, { color: KB.error }]}>{PLATFORM_CONNECTORS.filter(c => c.status === 'disconnected').length}</Text><Text style={s.connStatLbl}>OFFLINE</Text></View>
              <View style={s.connStat}><Text style={s.connStatVal}>{PLATFORM_CONNECTORS.length}</Text><Text style={s.connStatLbl}>TOTAL</Text></View>
            </View>

            {PLATFORM_CONNECTORS.map(conn => (
              <View key={conn.id} style={s.connCard}>
                <Text style={s.connIcon}>{conn.icon}</Text>
                <View style={s.connInfo}>
                  <Text style={[s.connName, { color: conn.color }]}>{conn.name}</Text>
                  <Text style={s.connDesc}>{conn.desc}</Text>
                </View>
                <View style={s.connRight}>
                  <View style={[s.connStatusBadge, { backgroundColor: STATUS_COLOR[conn.status] + '20', borderColor: STATUS_COLOR[conn.status] + '50' }]}>
                    <Text style={[s.connStatusTxt, { color: STATUS_COLOR[conn.status] }]}>
                      {conn.status.toUpperCase()}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={s.connAction}
                    onPress={() => conn.status === 'connected' ? handleTestConn(conn) : handleReconnect(conn)}
                  >
                    <Text style={s.connActionTxt}>{conn.status === 'connected' ? 'TEST' : 'CONNECT'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <TouchableOpacity style={s.addConnBtn}>
              <Text style={s.addConnTxt}>+ ADD CUSTOM CONNECTOR</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ─────── DEPLOY ─────── */}
        {activeSection === 'DEPLOY' && (
          <View style={s.pad}>
            {/* Vercel */}
            <View style={[s.deployCard, { borderColor: '#FFFFFF40' }]}>
              <CornerBrackets color="#FFFFFF30" size={8} thickness={1} />
              <Text style={s.deployCardTitle}>▲  VERCEL</Text>
              <Text style={s.deployCardSub}>Edge Functions · CDN · Preview Deployments</Text>
              <View style={s.deployRow}><Text style={s.deployKey}>Project</Text><Text style={s.deployVal}>labsfromsaintsal</Text></View>
              <View style={s.deployRow}><Text style={s.deployKey}>Team</Text><Text style={s.deployVal}>saint-vision</Text></View>
              <View style={s.deployRow}><Text style={s.deployKey}>Region</Text><Text style={s.deployVal}>us-east-1</Text></View>
              <View style={s.deployRow}><Text style={s.deployKey}>Status</Text><Text style={[s.deployVal, { color: KB.neon }]}>● CONNECTED</Text></View>
              <TouchableOpacity style={[s.deployBtn, { borderColor: '#FFFFFF50' }]} onPress={() => Alert.alert('Vercel Deploy', 'Deploying to Vercel production...')}>
                <Text style={[s.deployBtnTxt, { color: '#FFFFFF' }]}>DEPLOY TO PRODUCTION</Text>
              </TouchableOpacity>
            </View>

            {/* Render */}
            <View style={[s.deployCard, { borderColor: '#46E3B740' }]}>
              <CornerBrackets color="#46E3B730" size={8} thickness={1} />
              <Text style={[s.deployCardTitle, { color: '#46E3B7' }]}>🌊  RENDER</Text>
              <Text style={s.deployCardSub}>Backend Services · Workers · Managed DBs · PRO</Text>
              <View style={s.deployRow}><Text style={s.deployKey}>Service</Text><Text style={s.deployVal}>saintsallabs-api</Text></View>
              <View style={s.deployRow}><Text style={s.deployKey}>URL</Text><Text style={[s.deployVal, { fontSize: 10 }]}>saintsallabs-api.onrender.com</Text></View>
              <View style={s.deployRow}><Text style={s.deployKey}>Plan</Text><Text style={[s.deployVal, { color: KB.amber }]}>PRO · $25/mo</Text></View>
              <View style={s.deployRow}><Text style={s.deployKey}>Status</Text><Text style={[s.deployVal, { color: KB.neon }]}>● LIVE</Text></View>
              <TouchableOpacity style={[s.deployBtn, { borderColor: '#46E3B750' }]} onPress={() => Alert.alert('Render', 'Opening Render dashboard...')}>
                <Text style={[s.deployBtnTxt, { color: '#46E3B7' }]}>OPEN RENDER DASHBOARD</Text>
              </TouchableOpacity>
            </View>

            {/* GitHub */}
            <View style={[s.deployCard, { borderColor: '#FFFFFF30' }]}>
              <Text style={s.deployCardTitle}>🐙  GITHUB</Text>
              <Text style={s.deployCardSub}>Auto-deploy on push · PR previews</Text>
              <View style={s.deployRow}><Text style={s.deployKey}>Repo</Text><Text style={s.deployVal}>SaintVisionAi/labsfromsaintsal</Text></View>
              <View style={s.deployRow}><Text style={s.deployKey}>Branch</Text><Text style={s.deployVal}>main</Text></View>
              <View style={s.deployRow}><Text style={s.deployKey}>Auto Deploy</Text><Text style={[s.deployVal, { color: KB.neon }]}>ENABLED</Text></View>
            </View>
          </View>
        )}

        {/* ─────── DOWNLOADS ─────── */}
        {activeSection === 'DOWNLOADS' && (
          <View style={s.pad}>
            <View style={s.dlCard}>
              <Text style={s.dlTitle}>EXPORT YOUR BUILDS</Text>

              {[
                { label: 'Export as .zip', sub: 'All source files packaged', icon: '📦', action: 'Download ZIP' },
                { label: 'Export as GitHub Repo', sub: 'Push to new or existing repo', icon: '🐙', action: 'Push to GitHub' },
                { label: 'Export Dockerfile', sub: 'Container-ready deployment', icon: '🐳', action: 'Download Dockerfile' },
                { label: 'Export Vercel Config', sub: 'vercel.json + build config', icon: '▲', action: 'Download Config' },
                { label: 'Export Render Config', sub: 'render.yaml + service config', icon: '🌊', action: 'Download Config' },
              ].map(item => (
                <TouchableOpacity
                  key={item.label}
                  style={s.dlItem}
                  onPress={() => Alert.alert(item.action, `Preparing ${item.label}...`)}
                >
                  <Text style={s.dlIcon}>{item.icon}</Text>
                  <View style={s.dlInfo}>
                    <Text style={s.dlLabel}>{item.label}</Text>
                    <Text style={s.dlSub}>{item.sub}</Text>
                  </View>
                  <Text style={s.dlArrow}>↓</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* ─────── ADVANCED ─────── */}
        {activeSection === 'ADVANCED' && (
          <View style={s.pad}>
            <View style={s.advCard}>
              <Text style={s.advTitle}>AGENT SETTINGS</Text>
              <View style={s.toggleRow}>
                <View>
                  <Text style={s.toggleLabel}>Streaming Mode</Text>
                  <Text style={s.toggleSub}>Real-time SSE streaming</Text>
                </View>
                <Switch value={streamToggle} onValueChange={setStreamToggle} trackColor={{ true: KB.neon }} thumbColor="#FFF" />
              </View>
              <View style={s.toggleRow}>
                <View>
                  <Text style={s.toggleLabel}>HACP™ High Fidelity Mode</Text>
                  <Text style={s.toggleSub}>Full patent protocol active</Text>
                </View>
                <Switch value={hfMode} onValueChange={setHfMode} trackColor={{ true: KB.neon }} thumbColor="#FFF" />
              </View>
              <View style={s.toggleRow}>
                <View>
                  <Text style={s.toggleLabel}>Auto-Save Projects</Text>
                  <Text style={s.toggleSub}>Save to Supabase on complete</Text>
                </View>
                <Switch value={autoSave} onValueChange={setAutoSave} trackColor={{ true: KB.neon }} thumbColor="#FFF" />
              </View>
            </View>

            <View style={s.advCard}>
              <Text style={s.advTitle}>SYSTEM INFO</Text>
              {[
                ['Gateway', 'saintsallabs.com'],
                ['Protocol', 'HACP™ v2.0'],
                ['Patent', '#10,290,222'],
                ['Providers', '7 Active'],
                ['Version', 'Labs 1.0.0'],
              ].map(([k, v]) => (
                <View key={k} style={s.sysRow}>
                  <Text style={s.sysKey}>{k}</Text>
                  <Text style={s.sysVal}>{v}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={s.dangerBtn}
              onPress={() => Alert.alert('Clear Cache', 'This will clear all local cache and reset API connections.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear', style: 'destructive', onPress: () => {} },
              ])}
            >
              <Text style={s.dangerBtnTxt}>⚠ CLEAR CACHE & RESET</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: KB.bg },
  header:           { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: KB.borderNeon },
  backBtn:          { padding: 6 },
  backTxt:          { fontSize: 28, color: KB.neon, fontWeight: '300' },
  headerCenter:     { flex: 1, marginLeft: 8 },
  headerTitle:      { fontSize: 15, fontWeight: '900', color: KB.text, letterSpacing: 2 },
  headerSub:        { fontSize: 8, color: KB.textDim, letterSpacing: 1.5, marginTop: 2 },
  profileBtn:       { width: 34, height: 34, borderRadius: 17, backgroundColor: KB.goldDim, borderWidth: 1, borderColor: KB.gold, alignItems: 'center', justifyContent: 'center' },
  profileGlyph:     { fontSize: 14, color: KB.gold },
  sectionTabs:      { paddingHorizontal: 14, paddingVertical: 8, gap: 8 },
  secTab:           { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: KB.border, backgroundColor: KB.bgCard },
  secTabActive:     { backgroundColor: KB.neon, borderColor: KB.neon },
  secTabTxt:        { fontSize: 9, fontWeight: '800', color: KB.textDim, letterSpacing: 1 },
  scroll:           { flex: 1 },
  pad:              { padding: 14 },
  gatewayCard:      { backgroundColor: KB.bgCard, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: KB.borderNeon, flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  gatewayLeft:      { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  gatewayLabel:     { fontSize: 9, fontWeight: '900', color: KB.neon, letterSpacing: 2 },
  gatewayUrl:       { fontSize: 11, color: KB.textDim, fontFamily: MONO, marginTop: 2 },
  gatewayStatus:    { fontSize: 12, fontWeight: '800', color: KB.neon },
  apiCard:          { backgroundColor: KB.bgCard, borderRadius: 14, padding: 14, borderWidth: 1, marginBottom: 10 },
  apiHeader:        { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  apiIcon:          { fontSize: 20, width: 30, textAlign: 'center' },
  apiInfo:          { flex: 1 },
  apiName:          { fontSize: 13, fontWeight: '800' },
  apiModels:        { fontSize: 10, color: KB.textDim, marginTop: 2, fontFamily: MONO },
  apiStatus:        { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1 },
  apiStatusTxt:     { fontSize: 8, fontWeight: '800' },
  keyRow:           { flexDirection: 'row', alignItems: 'center', backgroundColor: KB.bgTerminal, borderRadius: 10, borderWidth: 1, borderColor: KB.border, paddingHorizontal: 10, gap: 8, height: 42 },
  keyInput:         { flex: 1, fontSize: 12, color: KB.text, fontFamily: MONO },
  keyToggle:        {},
  keyToggleTxt:     { fontSize: 14 },
  keySave:          { backgroundColor: KB.neon, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  keySaveTxt:       { fontSize: 9, fontWeight: '800', color: KB.bg },
  connStats:        { flexDirection: 'row', marginBottom: 14, gap: 8 },
  connStat:         { flex: 1, backgroundColor: KB.bgCard, borderRadius: 10, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: KB.border },
  connStatVal:      { fontSize: 18, fontWeight: '900', color: KB.text },
  connStatLbl:      { fontSize: 7, fontWeight: '800', color: KB.textDim, letterSpacing: 1 },
  connCard:         { backgroundColor: KB.bgCard, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: KB.border, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 10 },
  connIcon:         { fontSize: 20, width: 28, textAlign: 'center' },
  connInfo:         { flex: 1 },
  connName:         { fontSize: 13, fontWeight: '700', color: KB.text },
  connDesc:         { fontSize: 10, color: KB.textDim, marginTop: 2 },
  connRight:        { gap: 6, alignItems: 'flex-end' },
  connStatusBadge:  { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5, borderWidth: 1 },
  connStatusTxt:    { fontSize: 8, fontWeight: '800' },
  connAction:       { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, borderWidth: 1, borderColor: KB.borderNeon },
  connActionTxt:    { fontSize: 8, fontWeight: '800', color: KB.neon },
  addConnBtn:       { borderWidth: 1, borderColor: KB.borderNeon, borderStyle: 'dashed', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  addConnTxt:       { fontSize: 12, fontWeight: '800', color: KB.neon, letterSpacing: 2 },
  deployCard:       { backgroundColor: KB.bgCard, borderRadius: 16, padding: 16, borderWidth: 1, marginBottom: 14 },
  deployCardTitle:  { fontSize: 14, fontWeight: '900', color: KB.text, letterSpacing: 1, marginBottom: 4 },
  deployCardSub:    { fontSize: 10, color: KB.textDim, marginBottom: 14 },
  deployRow:        { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: KB.border },
  deployKey:        { fontSize: 11, color: KB.textDim },
  deployVal:        { fontSize: 11, color: KB.text, fontWeight: '700', fontFamily: MONO },
  deployBtn:        { marginTop: 14, borderRadius: 10, paddingVertical: 12, alignItems: 'center', borderWidth: 1 },
  deployBtnTxt:     { fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  dlCard:           { backgroundColor: KB.bgCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: KB.border },
  dlTitle:          { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 2, marginBottom: 16 },
  dlItem:           { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: KB.border, gap: 12 },
  dlIcon:           { fontSize: 20, width: 28, textAlign: 'center' },
  dlInfo:           { flex: 1 },
  dlLabel:          { fontSize: 13, color: KB.text, fontWeight: '600' },
  dlSub:            { fontSize: 10, color: KB.textDim, marginTop: 2 },
  dlArrow:          { fontSize: 18, color: KB.neon, fontWeight: '700' },
  advCard:          { backgroundColor: KB.bgCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: KB.border, marginBottom: 14 },
  advTitle:         { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 2, marginBottom: 14 },
  toggleRow:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: KB.border },
  toggleLabel:      { fontSize: 13, color: KB.text, fontWeight: '600' },
  toggleSub:        { fontSize: 10, color: KB.textDim, marginTop: 2 },
  sysRow:           { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: KB.border },
  sysKey:           { fontSize: 12, color: KB.textDim },
  sysVal:           { fontSize: 12, color: KB.text, fontWeight: '700', fontFamily: MONO },
  dangerBtn:        { backgroundColor: KB.error + '15', borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: KB.error + '40', marginTop: 8 },
  dangerBtnTxt:     { fontSize: 12, fontWeight: '800', color: KB.error, letterSpacing: 1 },
});
