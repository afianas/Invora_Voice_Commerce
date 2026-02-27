import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles, theme } from '../src/styles/globalStyles';

export default function TransactionLedger({ t, transactions, itemMap }) {
    return (
        <View style={globalStyles.card}>
            {transactions.length === 0 ? (
                <Text style={styles.emptyText}>{t.empty}</Text>
            ) : (
                transactions.map(tLog => {
                    // Identify the type dynamically based on the stored key
                    const isStockIn = tLog.typeKey === 'IN';
                    const translatedLabel = isStockIn ? t.stockIn : t.stockOut;

                    return (
                        <View key={tLog.id} style={styles.transRow}>
                            {/* Color dot updates based on type */}
                            <View style={[styles.dot, { backgroundColor: isStockIn ? theme.success : theme.danger }]} />

                            <View style={{ flex: 1 }}>
                                <Text style={styles.transName}>
                                    {itemMap[tLog.itemId] || tLog.itemId}
                                </Text>
                                {/* This text now reacts to lang change! */}
                                <Text style={styles.transType}>{translatedLabel}</Text>
                            </View>

                            <Text style={[styles.transQty, { color: isStockIn ? theme.success : theme.danger }]}>
                                {isStockIn ? '+' : '-'}{tLog.qty}
                            </Text>

                            <Text style={styles.transTime}>{tLog.time}</Text>
                        </View>
                    );
                })
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    transRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9'
    },
    dot: { width: 6, height: 6, borderRadius: 3, marginRight: 12 },
    transName: { fontSize: 14, fontWeight: 'bold', color: '#334155' },
    transType: { fontSize: 10, color: theme.textMuted, textTransform: 'uppercase' },
    transQty: { fontWeight: 'bold', marginRight: 15 },
    transTime: { fontSize: 10, color: theme.textMuted },
    emptyText: { textAlign: 'center', color: '#CBD5E1', padding: 20, fontSize: 12 },
});