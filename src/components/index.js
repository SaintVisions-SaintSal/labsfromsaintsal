/* ═══════════════════════════════════════════════════
   LABS FROM SAINTSALÂ — SHARED COMPONENTS
═══════════════════════════════════════════════════ */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { KB } from '../theme';

/* ── Corner Brackets — card accent decorator ───── */
export function CornerBrackets({ color = KB.neon, size = 10, thickness = 1.5, style }) {
  const c = color;
  const s = size;
  const t = thickness;
  const cornerStyle = { position: 'absolute', width: s, height: s };
  const line = { backgroundColor: c, position: 'absolute' };
  return (
    <View style={[StyleSheet.absoluteFill, style]} pointerEvents="none">
      {/* Top-left */}
      <View style={[cornerStyle, { top: 0, left: 0 }]}>
        <View style={[line, { top: 0, left: 0, width: s, height: t }]} />
        <View style={[line, { top: 0, left: 0, width: t, height: s }]} />
      </View>
      {/* Top-right */}
      <View style={[cornerStyle, { top: 0, right: 0 }]}>
        <View style={[line, { top: 0, right: 0, width: s, height: t }]} />
        <View style={[line, { top: 0, right: 0, width: t, height: s }]} />
      </View>
      {/* Bottom-left */}
      <View style={[cornerStyle, { bottom: 0, left: 0 }]}>
        <View style={[line, { bottom: 0, left: 0, width: s, height: t }]} />
        <View style={[line, { bottom: 0, left: 0, width: t, height: s }]} />
      </View>
      {/* Bottom-right */}
      <View style={[cornerStyle, { bottom: 0, right: 0 }]}>
        <View style={[line, { bottom: 0, right: 0, width: s, height: t }]} />
        <View style={[line, { bottom: 0, right: 0, width: t, height: s }]} />
      </View>
    </View>
  );
}

/* ── Neon Pulse Dot ─────────────────────────────── */
export function PulseDot({ color = KB.neon, size = 6 }) {
  const [opacity, setOpacity] = React.useState(1);
  React.useEffect(() => {
    const interval = setInterval(() => setOpacity(o => o === 1 ? 0.2 : 1), 800);
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color, opacity }} />
  );
}

/* ── Section Label ──────────────────────────────── */
export function SectionLabel({ children, color = KB.neon }) {
  const { Text } = require('react-native');
  return (
    <Text style={{ fontSize: 9, fontWeight: '800', color, letterSpacing: 2, marginBottom: 8, marginTop: 16 }}>
      {children}
    </Text>
  );
}
