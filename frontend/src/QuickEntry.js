import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { globalStyles, theme } from './styles/globalStyles';

export default function QuickEntry({ productData, setProductData, onAdd }) {
    return (
        <View style={globalStyles.card}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', color: theme.textMuted, marginBottom: 10 }}>Quick Manual Adjustment</Text>
            <View style={globalStyles.row}>
                <TextInput
                    placeholder="Item Name"
                    style={[globalStyles.input, { flex: 2 }]}
                    value={productData.name}
                    onChangeText={(t) => setProductData({ ...productData, name: t })}
                />
                <TextInput
                    placeholder="Qty"
                    keyboardType="numeric"
                    style={[globalStyles.input, { flex: 1, marginLeft: 10 }]}
                    value={productData.qty}
                    onChangeText={(t) => setProductData({ ...productData, qty: t })}
                />
                <TouchableOpacity style={{ backgroundColor: theme.primary, padding: 12, borderRadius: 10, marginLeft: 10 }} onPress={onAdd}>
                    <Plus color="white" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
}