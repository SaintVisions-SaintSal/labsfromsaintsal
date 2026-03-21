/* ═══════════════════════════════════════════════════
   SPLASH → redirect to tabs
═══════════════════════════════════════════════════ */
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { KB } from '../src/theme';

export default function Splash() {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => router.replace('/(tabs)'), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={s.root}>
      <View style={s.helmet}>
        <Text style={s.helmetGlyph}>⬡</Text>
      </View>
      <Text style={s.brand}>LABS</Text>
      <Text style={s.sub}>from SaintSal™</Text>
      <View style={s.line} />
      <Text style={s.tag}>HACP™ · Patent #10,290,222</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root:       { flex: 1, backgroundColor: KB.bg, alignItems: 'center', justifyContent: 'center' },
  helmet:     { width: 72, height: 72, borderRadius: 36, backgroundColor: KB.goldDim, borderWidth: 1.5, borderColor: KB.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 20, shadowColor: KB.gold, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 20 },
  helmetGlyph:{ fontSize: 32, color: KB.gold },
  brand:      { fontSize: 36, fontWeight: '900', color: KB.text, letterSpacing: 6 },
  sub:        { fontSize: 13, color: KB.gold, fontWeight: '600', letterSpacing: 2, marginTop: 4 },
  line:       { width: 60, height: 1, backgroundColor: KB.neon, marginTop: 24, marginBottom: 12, opacity: 0.6 },
  tag:        { fontSize: 9, color: KB.textDim, letterSpacing: 2, fontWeight: '700' },
});
