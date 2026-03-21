/* ═══════════════════════════════════════════════════
   SEARCH TAB — AI-powered search
═══════════════════════════════════════════════════ */
import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, ActivityIndicator,
} from 'react-native';
import { KB, MONO } from '../../src/theme';
import { CornerBrackets, PulseDot } from '../../src/components';
import { streamChat } from '../../src/api';

const SUGGESTED = [
  'How do I add Supabase auth to my app?',
  'Best practices for React Native performance',
  'How to deploy a Vercel edge function',
  'Stripe subscriptions with webhooks',
  'Expo EAS build configuration',
];

export default function SearchTab() {
  const [query, setQuery]     = useState('');
  const [result, setResult]   = useState('');
  const [loading, setLoading] = useState(false);
  const xhrRef = useRef(null);

  const handleSearch = (q = query) => {
    if (!q.trim()) return;
    setLoading(true);
    setResult('');
    let buf = '';
    xhrRef.current = streamChat({
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      system: 'You are SaintSal Search — an elite technical AI. Give concise, accurate, developer-focused answers with code examples when relevant. Format nicely.',
      messages: [{ role: 'user', content: q }],
      onChunk: (c) => { buf += c; setResult(buf); },
      onDone: () => setLoading(false),
      onError: () => setLoading(false),
    });
  };

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.title}>SAINTSALÂ SEARCH</Text>
        <PulseDot color={KB.neon} />
      </View>

      {/* Search Input */}
      <View style={s.inputWrap}>
        <CornerBrackets color={KB.neon} size={10} thickness={1.5} />
        <Text style={s.inputIcon}>⌕</Text>
        <TextInput
          style={s.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Ask anything..."
          placeholderTextColor={KB.textDim}
          onSubmitEditing={() => handleSearch()}
          returnKeyType="search"
        />
        {loading
          ? <ActivityIndicator size="small" color={KB.neon} />
          : <TouchableOpacity onPress={() => handleSearch()} style={s.searchBtn}>
              <Text style={s.searchBtnTxt}>GO</Text>
            </TouchableOpacity>
        }
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={s.scroll} keyboardShouldPersistTaps="handled">
        {/* Result */}
        {result ? (
          <View style={s.resultCard}>
            <CornerBrackets color={KB.borderNeon} size={8} thickness={1} />
            <View style={s.resultHeader}>
              <PulseDot color={KB.neon} size={5} />
              <Text style={s.resultLabel}>SAL RESPONSE</Text>
            </View>
            <Text style={s.resultText}>{result}</Text>
          </View>
        ) : (
          <>
            <Text style={s.suggestLabel}>SUGGESTED SEARCHES</Text>
            {SUGGESTED.map((q2, i) => (
              <TouchableOpacity key={i} style={s.suggestCard} onPress={() => { setQuery(q2); handleSearch(q2); }}>
                <Text style={s.suggestQ}>{q2}</Text>
                <Text style={s.suggestArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: KB.bg },
  header:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  title:        { fontSize: 13, fontWeight: '900', color: KB.text, letterSpacing: 2 },
  inputWrap:    { marginHorizontal: 16, marginBottom: 16, backgroundColor: KB.bgCard, borderRadius: 14, borderWidth: 1, borderColor: KB.borderNeon, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
  inputIcon:    { fontSize: 18, color: KB.neon },
  input:        { flex: 1, fontSize: 15, color: KB.text, fontFamily: MONO },
  searchBtn:    { backgroundColor: KB.neon, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  searchBtnTxt: { fontSize: 10, fontWeight: '800', color: KB.bg, letterSpacing: 1 },
  scroll:       { flex: 1 },
  resultCard:   { marginHorizontal: 16, backgroundColor: KB.bgCard, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: KB.borderNeon, marginBottom: 16 },
  resultHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  resultLabel:  { fontSize: 9, fontWeight: '800', color: KB.neon, letterSpacing: 2 },
  resultText:   { fontSize: 13, color: KB.text, lineHeight: 21, fontFamily: MONO },
  suggestLabel: { fontSize: 9, fontWeight: '800', color: KB.textDim, letterSpacing: 2.5, marginHorizontal: 16, marginBottom: 12 },
  suggestCard:  { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 10, backgroundColor: KB.bgCard, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: KB.border },
  suggestQ:     { flex: 1, fontSize: 13, color: KB.textSub },
  suggestArrow: { fontSize: 16, color: KB.neon },
});
