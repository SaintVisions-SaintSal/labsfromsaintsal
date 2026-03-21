/* ═══════════════════════════════════════════════════
   LABS FROM SAINTSALÂ — CUSTOM 5-TAB NAVIGATOR
   Search · Builder · SAL (helmet center) · Social · More
   Kinetic Blueprint Design System
   US Patent #10,290,222 · HACP Protocol
═══════════════════════════════════════════════════ */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KB } from '../../src/theme';

const { width: SW } = Dimensions.get('window');
const TAB_W = SW / 5;

/* ── Icons ──────────────────────────────────────── */
function SearchIcon({ active }) {
  return (
    <View style={[ii.wrap]}>
      <View style={[ii.searchOuter, active && { borderColor: KB.neon }]}>
        <View style={[ii.searchInner, active && { backgroundColor: KB.neonDim }]} />
      </View>
      <View style={[ii.searchHandle, active && { backgroundColor: KB.neon }]} />
    </View>
  );
}

function BuilderIcon({ active }) {
  return (
    <View style={ii.wrap}>
      <View style={[ii.bolt, active && { borderColor: KB.neon }]}>
        <Text style={[ii.boltTxt, active && { color: KB.neon }]}>⚡</Text>
      </View>
    </View>
  );
}

function SocialIcon({ active }) {
  return (
    <View style={ii.wrap}>
      <Text style={[ii.xIcon, active && { color: KB.neon }]}>𝕏</Text>
    </View>
  );
}

function MoreIcon({ active }) {
  return (
    <View style={ii.wrap}>
      <View style={ii.moreLines}>
        <View style={[ii.moreLine, { opacity: active ? 1 : 0.4, backgroundColor: active ? KB.neon : KB.textSub }]} />
        <View style={[ii.moreLine, { width: 14, opacity: active ? 1 : 0.4, backgroundColor: active ? KB.neon : KB.textSub }]} />
        <View style={[ii.moreLine, { width: 10, opacity: active ? 1 : 0.4, backgroundColor: active ? KB.neon : KB.textSub }]} />
      </View>
    </View>
  );
}

/* ── SAL Center Helmet Button ───────────────────── */
function SALHelmet({ active }) {
  return (
    <View style={helm.container}>
      <View style={[helm.outer, active && { borderColor: KB.gold, shadowColor: KB.gold, shadowOpacity: 0.6 }]}>
        <View style={helm.inner}>
          <Text style={helm.glyph}>⬡</Text>
        </View>
        {active && <View style={helm.glow} />}
      </View>
    </View>
  );
}

/* ── Tab Item ───────────────────────────────────── */
function TabItem({ label, icon: Icon, active, onPress }) {
  return (
    <TouchableOpacity style={tab.wrap} onPress={onPress} activeOpacity={0.75}>
      <Icon active={active} />
      <Text style={[tab.label, active && { color: KB.neon }]}>{label}</Text>
      {active && <View style={tab.dot} />}
    </TouchableOpacity>
  );
}

/* ── Custom Tab Bar ─────────────────────────────── */
function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const tabs = [
    { name: 'search',  label: 'Search',  Icon: SearchIcon },
    { name: 'builder', label: 'Builder', Icon: BuilderIcon },
    { name: 'index',   label: '',        Icon: null },   // SAL center — handled separately
    { name: 'social',  label: 'Social',  Icon: SocialIcon },
    { name: 'more',    label: 'More',    Icon: MoreIcon },
  ];

  return (
    <View style={[bar.root, { paddingBottom: insets.bottom || 16 }]}>
      {/* Neon top border */}
      <View style={bar.topLine} />

      <View style={bar.row}>
        {tabs.map((t, i) => {
          const routeIndex = state.routes.findIndex(r => r.name === t.name);
          const isActive = state.index === routeIndex;
          const isSAL = t.name === 'index';

          if (isSAL) {
            return (
              <TouchableOpacity
                key="sal"
                style={bar.salWrap}
                onPress={() => {
                  const route = state.routes.find(r => r.name === 'index');
                  if (route) navigation.navigate('index');
                }}
                activeOpacity={0.85}
              >
                <SALHelmet active={state.routes[state.index]?.name === 'index'} />
              </TouchableOpacity>
            );
          }

          return (
            <TabItem
              key={t.name}
              label={t.label}
              icon={t.Icon}
              active={isActive}
              onPress={() => {
                const route = state.routes.find(r => r.name === t.name);
                if (route) {
                  const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                  if (!event.defaultPrevented) navigation.navigate(t.name);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

/* ── Export ─────────────────────────────────────── */
export default function TabsLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="search"  options={{ title: 'Search' }} />
      <Tabs.Screen name="builder" options={{ title: 'Builder' }} />
      <Tabs.Screen name="index"   options={{ title: 'SAL' }} />
      <Tabs.Screen name="social"  options={{ title: 'Social' }} />
      <Tabs.Screen name="more"    options={{ title: 'More' }} />
    </Tabs>
  );
}

/* ── Icon Styles ─────────────────────────────────── */
const ii = StyleSheet.create({
  wrap:         { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  searchOuter:  { width: 14, height: 14, borderRadius: 7, borderWidth: 1.5, borderColor: KB.textSub, position: 'absolute', top: 0, left: 3 },
  searchInner:  { width: 6, height: 6, borderRadius: 3, backgroundColor: 'transparent', margin: 3 },
  searchHandle: { position: 'absolute', bottom: 1, right: 2, width: 5, height: 1.5, backgroundColor: KB.textSub, borderRadius: 1, transform: [{ rotate: '45deg' }] },
  bolt:         { width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  boltTxt:      { fontSize: 16, color: KB.textSub },
  xIcon:        { fontSize: 15, color: KB.textSub, fontWeight: '900' },
  moreLines:    { gap: 3, alignItems: 'flex-start' },
  moreLine:     { height: 1.5, width: 18, borderRadius: 1 },
});

/* ── Helmet Styles ───────────────────────────────── */
const helm = StyleSheet.create({
  container:  { alignItems: 'center', justifyContent: 'center' },
  outer:      { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: KB.goldDim, backgroundColor: KB.bgCard, alignItems: 'center', justifyContent: 'center', shadowColor: KB.gold, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8 },
  inner:      { width: 38, height: 38, borderRadius: 19, backgroundColor: KB.bgElevated, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: KB.borderGold },
  glyph:      { fontSize: 20, color: KB.gold },
  glow:       { position: 'absolute', top: -2, left: -2, right: -2, bottom: -2, borderRadius: 28, borderWidth: 1, borderColor: KB.gold + '40' },
});

/* ── Tab Bar Styles ──────────────────────────────── */
const bar = StyleSheet.create({
  root:    { backgroundColor: KB.bg, borderTopWidth: 0 },
  topLine: { height: 1, backgroundColor: KB.borderNeon },
  row:     { flexDirection: 'row', alignItems: 'flex-end', paddingTop: 8 },
  salWrap: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 2 },
});

const tab = StyleSheet.create({
  wrap:  { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 4 },
  label: { fontSize: 9, fontWeight: '700', color: KB.textDim, letterSpacing: 0.5, marginTop: 4 },
  dot:   { position: 'absolute', bottom: -4, width: 3, height: 3, borderRadius: 1.5, backgroundColor: KB.neon },
});
