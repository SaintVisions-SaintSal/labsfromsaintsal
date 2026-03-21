/* ═══════════════════════════════════════════════════
   SOCIAL TAB — X / Twitter + community feed
═══════════════════════════════════════════════════ */
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Linking } from 'react-native';
import { KB, MONO } from '../../src/theme';
import { CornerBrackets, PulseDot } from '../../src/components';

const FEED = [
  { id: '1', handle: '@SaintSalLabs', name: 'SaintSal™ Labs', body: 'HACP™ protocol just hit 4M tokens processed. The agentic pipeline is LIVE. Build anything. 🟢', time: '2m', likes: 48, replies: 12 },
  { id: '2', handle: '@saintvisionai', name: 'Saint Vision Tech', body: 'Patent #10,290,222 — filed in 2015, predating GPT-1. We built this infrastructure before the world knew AI was coming. Full spectrum.', time: '14m', likes: 91, replies: 23 },
  { id: '3', handle: '@cookin_io', name: 'Cookin.io', body: 'New agent drop: ARCHITECT agent now handles full-stack planning in 45 seconds. Desktop → Mobile renders live. This is the future.', time: '1h', likes: 204, replies: 61 },
  { id: '4', handle: '@SaintSalLabs', name: 'SaintSal™ Labs', body: 'PROTO_MOTORS shipped. 4.2M tokens. 12 files. 0 bugs. Mission: Complete. ✅', time: '3h', likes: 312, replies: 88 },
];

export default function SocialTab() {
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState('');

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.xLogo}>𝕏</Text>
        <Text style={s.title}>SAL SOCIAL</Text>
        <TouchableOpacity style={s.composeBtn} onPress={() => setComposing(c => !c)}>
          <Text style={s.composeTxt}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Compose */}
      {composing && (
        <View style={s.composeCard}>
          <CornerBrackets color={KB.neon} size={8} thickness={1.5} />
          <TextInput
            style={s.composeInput}
            value={draft}
            onChangeText={setDraft}
            placeholder="What's shipping today..."
            placeholderTextColor={KB.textDim}
            multiline
            autoFocus
          />
          <View style={s.composeRow}>
            <Text style={s.composeCount}>{280 - draft.length}</Text>
            <TouchableOpacity
              style={[s.postBtn, !draft.trim() && { opacity: 0.4 }]}
              disabled={!draft.trim()}
              onPress={() => { setDraft(''); setComposing(false); }}
            >
              <Text style={s.postTxt}>POST</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View style={s.feedTabs}>
          {['FOR YOU', 'SAINTSALÂ', 'BUILDERS'].map((t, i) => (
            <TouchableOpacity key={t} style={[s.feedTab, i === 0 && s.feedTabActive]}>
              <Text style={[s.feedTabTxt, i === 0 && { color: KB.neon }]}>{t}</Text>
              {i === 0 && <View style={s.feedTabLine} />}
            </TouchableOpacity>
          ))}
        </View>

        {FEED.map(post => (
          <View key={post.id} style={s.post}>
            <View style={s.postAvatar}>
              <Text style={s.postAvatarGlyph}>⬡</Text>
            </View>
            <View style={s.postRight}>
              <View style={s.postMeta}>
                <Text style={s.postName}>{post.name}</Text>
                <Text style={s.postHandle}>{post.handle} · {post.time}</Text>
              </View>
              <Text style={s.postBody}>{post.body}</Text>
              <View style={s.postActions}>
                <TouchableOpacity style={s.postAction}>
                  <Text style={s.postActionTxt}>💬 {post.replies}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.postAction}>
                  <Text style={s.postActionTxt}>♻️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.postAction}>
                  <Text style={[s.postActionTxt, { color: KB.neon }]}>♥ {post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.postAction}>
                  <Text style={s.postActionTxt}>↑</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Follow X CTA */}
        <TouchableOpacity style={s.followCard} onPress={() => Linking.openURL('https://x.com/saintvisionai')}>
          <CornerBrackets color={KB.borderNeon} size={7} thickness={1} />
          <Text style={s.followTitle}>Follow us on 𝕏</Text>
          <Text style={s.followSub}>@saintvisionai · @SaintSalLabs · @cookin_io</Text>
          <View style={s.followBtn}>
            <Text style={s.followBtnTxt}>FOLLOW →</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: KB.bg },
  header:        { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: KB.border, gap: 10 },
  xLogo:         { fontSize: 20, fontWeight: '900', color: KB.text },
  title:         { flex: 1, fontSize: 13, fontWeight: '900', color: KB.text, letterSpacing: 2 },
  composeBtn:    { width: 32, height: 32, borderRadius: 16, backgroundColor: KB.neon, alignItems: 'center', justifyContent: 'center' },
  composeTxt:    { fontSize: 20, fontWeight: '300', color: KB.bg, lineHeight: 24 },
  composeCard:   { marginHorizontal: 16, marginTop: 12, backgroundColor: KB.bgCard, borderRadius: 14, borderWidth: 1, borderColor: KB.borderNeon, padding: 14 },
  composeInput:  { fontSize: 15, color: KB.text, minHeight: 80, fontFamily: MONO },
  composeRow:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 12, marginTop: 8 },
  composeCount:  { fontSize: 12, color: KB.textDim },
  postBtn:       { backgroundColor: KB.neon, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  postTxt:       { fontSize: 11, fontWeight: '800', color: KB.bg },
  feedTabs:      { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: KB.border },
  feedTab:       { flex: 1, alignItems: 'center', paddingVertical: 12 },
  feedTabActive: {},
  feedTabTxt:    { fontSize: 10, fontWeight: '800', color: KB.textDim, letterSpacing: 1 },
  feedTabLine:   { position: 'absolute', bottom: 0, height: 2, width: '60%', backgroundColor: KB.neon, borderRadius: 1 },
  post:          { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: KB.border, gap: 12 },
  postAvatar:    { width: 40, height: 40, borderRadius: 20, backgroundColor: KB.goldDim, borderWidth: 1, borderColor: KB.gold, alignItems: 'center', justifyContent: 'center' },
  postAvatarGlyph: { fontSize: 16, color: KB.gold },
  postRight:     { flex: 1 },
  postMeta:      { marginBottom: 6 },
  postName:      { fontSize: 13, fontWeight: '800', color: KB.text },
  postHandle:    { fontSize: 11, color: KB.textDim, marginTop: 1 },
  postBody:      { fontSize: 14, color: KB.text, lineHeight: 21, marginBottom: 12 },
  postActions:   { flexDirection: 'row', gap: 24 },
  postAction:    {},
  postActionTxt: { fontSize: 12, color: KB.textDim },
  followCard:    { margin: 16, backgroundColor: KB.bgCard, borderRadius: 16, padding: 18, borderWidth: 1, borderColor: KB.border, alignItems: 'center', gap: 6 },
  followTitle:   { fontSize: 16, fontWeight: '900', color: KB.text },
  followSub:     { fontSize: 11, color: KB.textDim, textAlign: 'center' },
  followBtn:     { marginTop: 10, backgroundColor: KB.neon, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 },
  followBtnTxt:  { fontSize: 12, fontWeight: '800', color: KB.bg, letterSpacing: 1.5 },
});
