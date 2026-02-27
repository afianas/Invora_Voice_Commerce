import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Audio } from 'expo-av';

// Import Components
import Header from './src/Header';
import QuickEntry from './src/QuickEntry';
import InventoryItem from './src/InventoryItem';
import TransactionLedger from './src/TransactionLedger';
import VoiceFooter from './src/VoiceFooter';
import VerificationModal from './src/VerificationModal';
import { globalStyles, theme } from './src/styles/globalStyles';

const translations = {
  EN: {
    rev: "Revenue", quick: "Quick Manual Entry", item: "Item", qty: "Qty",
    inv: "MASTER INVENTORY", trans: "RECENT TRANSACTIONS LOG", unit: "Unit Price",
    conf: "Confirm AI Entry", stockIn: "STOCK IN", stockOut: "STOCK OUT",
    cancel: "Cancel", ok: "Confirm", priceTitle: "Change Price?",
    priceMsg: "Are you sure you want to change the price of", sold: "Sold 10 kg Sugar",
    items: { coconut: "Coconut Oil", sugar: "Sugar" }, empty: "No activity recorded"
  },
  हिं: {
    rev: "कुल कमाई", quick: "त्वरित प्रविष्टि", item: "वस्तु", qty: "मात्रा",
    inv: "मुख्य सूची", trans: "हाल के लेनदेन", unit: "इकाई मूल्य",
    conf: "AI प्रविष्टि की पुष्टि", stockIn: "स्टॉक आया", stockOut: "स्टॉक गया",
    cancel: "रद्द करें", ok: "पुष्टि करें", priceTitle: "कीमत बदलें?",
    priceMsg: "क्या आप वाकई कीमत बदलना चाहते हैं", sold: "10 किलो चीनी बेची",
    items: { coconut: "नारियल तेल", sugar: "चीनी" }, empty: "कोई गतिविधि नहीं मिली"
  },
  ത: {
    rev: "ആകെ വരുമാനം", quick: "പെട്ടെന്നുള്ള മാറ്റങ്ങൾ", item: "സാധനം", qty: "എണ്ണം",
    inv: "സ്റ്റോക്ക് വിവരങ്ങൾ", trans: "സമീപകാല ഇടപാടുകൾ", unit: "വില",
    conf: "AI എൻട്രി സ്ഥിരീകരിക്കുക", stockIn: "സ്റ്റോക്ക് കയറ്റി", stockOut: "വിൽപന",
    cancel: "വേണ്ട", ok: "ശരി", priceTitle: "വില മാറ്റണോ?",
    priceMsg: "വില മാറ്റാൻ നിങ്ങൾക്ക് ഉറപ്പാണോ", sold: "10 കിലോ പഞ്ചസാര വിറ്റു",
    items: { coconut: "വെളിച്ചെണ്ണ", sugar: "പഞ്ചസാര" }, empty: "വിവരങ്ങൾ ലഭ്യമല്ല"
  }
};

export default function App() {
  const [lang, setLang] = useState('EN');
  const [inventory, setInventory] = useState([
    { id: 'coconut', qty: 50, unit: 'ltr', price: 180, category: 'B' },
    { id: 'sugar', qty: 120, unit: 'kg', price: 42, category: 'A' }
  ]);
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ revenue: 0 });
  const [recording, setRecording] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [productData, setProductData] = useState({ name: '', qty: '', price: '', id: '' });
  const [expandedItemId, setExpandedItemId] = useState(null);

  const t = translations[lang];

  const updateStock = (itemId, qtyChange, priceInput = 0) => {
    const change = parseInt(qtyChange) || 0;
    const price = parseInt(priceInput) || 0;

    setInventory(prev => prev.map(item =>
      item.id === itemId ? { ...item, qty: Math.max(0, item.qty + change) } : item
    ));

    // Transaction logic: Store typeKey instead of string for reactive translation
    setTransactions(prev => [{
      id: Date.now(),
      itemId: itemId,
      typeKey: change >= 0 ? 'IN' : 'OUT',
      qty: Math.abs(change),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }, ...prev]);

    if (change < 0) setTotals(p => ({ revenue: p.revenue + (Math.abs(change) * price) }));
  };

  const changePrice = (itemId, newPrice) => {
    setInventory(prev => prev.map(item => item.id === itemId ? { ...item, price: newPrice } : item));
  };

  async function startRecording() {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') return;
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
    } catch (err) { console.error(err); }
  }

  async function stopRecording() {
    if (!recording) return;
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    setTimeout(() => {
      setTranscript(t.sold);
      setProductData({ name: t.items.sugar, qty: '-10', price: '42', id: 'sugar' });
      setModalVisible(true);
    }, 800);
  }

  return (
    <View style={styles.container}>
      <Header t={t} revenue={totals.revenue} lang={lang} setLang={setLang} />

      <ScrollView contentContainerStyle={{ paddingBottom: 220 }}>
        <QuickEntry
          t={t}
          productData={productData}
          setProductData={setProductData}
          onAdd={() => updateStock(productData.id, productData.qty)}
        />

        <Text style={globalStyles.sectionTitle}>{t.inv}</Text>
        {inventory.map(item => (
          <InventoryItem
            key={item.id}
            t={t}
            item={item}
            itemName={t.items[item.id] || item.id}
            isExpanded={expandedItemId === item.id}
            onToggle={() => setExpandedItemId(expandedItemId === item.id ? null : item.id)}
            onUpdate={(val) => updateStock(item.id, val, item.price)}
            onPriceChange={changePrice}
          />
        ))}

        <Text style={globalStyles.sectionTitle}>{t.trans}</Text>
        <TransactionLedger t={t} transactions={transactions} itemMap={t.items} />
      </ScrollView>

      <VoiceFooter recording={recording} transcript={transcript} onStart={startRecording} onStop={stopRecording} />

      <VerificationModal
        t={t}
        visible={modalVisible}
        productData={productData}
        onCancel={() => setModalVisible(false)}
        onConfirm={() => {
          updateStock(productData.id, productData.qty, productData.price);
          setModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: theme.background } });