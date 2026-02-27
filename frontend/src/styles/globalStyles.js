import { StyleSheet } from 'react-native';

export const theme = {
    primary: '#2563EB',
    danger: '#EF4444',
    success: '#10B981',
    warning: '#EAB308',
    background: '#F8FAFC',
    card: '#FFFFFF',
    textMain: '#1E293B',
    textMuted: '#94A3B8',
};

export const globalStyles = StyleSheet.create({
    card: { backgroundColor: theme.card, margin: 15, padding: 15, borderRadius: 15, elevation: 1 },
    row: { flexDirection: 'row', alignItems: 'center' },
    sectionTitle: { marginLeft: 20, fontSize: 10, fontWeight: '800', color: theme.textMuted, letterSpacing: 1, marginTop: 10 },
    input: { backgroundColor: '#F8FAFC', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#E2E8F0', color: theme.textMain },
});