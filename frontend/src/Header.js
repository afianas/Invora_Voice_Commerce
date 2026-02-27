import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from './styles/globalStyles';

export default function Header({ t, revenue, lang, setLang }) {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerTitle}>Bhashini</Text>
                <Text style={styles.revenueText}>{t.rev}: ₹{revenue}</Text>
            </View>
            <View style={styles.langContainer}>
                {['हिं', 'ത', 'EN'].map((l) => (
                    <TouchableOpacity
                        key={l}
                        onPress={() => setLang(l)}
                        style={[styles.langPill, lang === l && styles.activePill]}
                    >
                        <Text style={[styles.pillText, lang === l && styles.activePillText]}>{l}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: theme.textMain },
    revenueText: { fontSize: 13, color: theme.success, fontWeight: 'bold' },
    langContainer: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 20, padding: 4 },
    langPill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 },
    activePill: { backgroundColor: theme.warning },
    pillText: { fontSize: 11, fontWeight: 'bold', color: theme.textMuted },
    activePillText: { color: 'white' },
});