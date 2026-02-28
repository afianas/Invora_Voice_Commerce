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
    items: { milk: "Milk", sugar: "Sugar", oil: "Oil" }, empty: "No activity recorded"
  },
  हिं: {
    rev: "कुल कमाई", quick: "त्वरित प्रविष्टि", item: "वस्तु", qty: "मात्रा",
    inv: "मुख्य सूची", trans: "हाल के लेनदेन", unit: "इकाई मूल्य",
    conf: "AI प्रविष्टि की पुष्टि", stockIn: "स्टॉक आया", stockOut: "स्टॉक गया",
    cancel: "रद्द करें", ok: "पुष्टि करें", priceTitle: "कीमत बदलें?",
    priceMsg: "क्या आप वाकई कीमत बदलना चाहते हैं", sold: "10 किलो चीनी बेची",
    items: { milk: "दूध", sugar: "चीनी", oil: "तेल" }, empty: "कोई गतिविधि नहीं मिली"
  },
  ത: {
    rev: "ആകെ വരുമാനം", quick: "പെട്ടെന്നുള്ള മാറ്റങ്ങൾ", item: "സാധനം", qty: "എണ്ണം",
    inv: "സ്റ്റോക്ക് വിവരങ്ങൾ", trans: "സമീപകാല ഇടപാടുകൾ", unit: "വില",
    conf: "AI എൻട്രി സ്ഥിരീകരിക്കുക", stockIn: "സ്റ്റോക്ക് കയറ്റി", stockOut: "വിൽപന",
    cancel: "വേണ്ട", ok: "ശരി", priceTitle: "വില മാറ്റണോ?",
    priceMsg: "വില മാറ്റാൻ നിങ്ങൾക്ക് ഉറപ്പാണോ", sold: "10 കിലോ പഞ്ചസാര വിറ്റു",
    items: { milk: "പാൽ", sugar: "പഞ്ചസാര", oil: "എണ്ണ" }, empty: "വിവരങ്ങൾ ലഭ്യമല്ല"
  }
};

export default function App() {
  const [lang, setLang] = useState('EN');
  const [inventory, setInventory] = useState([
    { id: 'sugar', qty: 120, unit: 'kg', price: 42, category: 'A' }
  ]);
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ revenue: 0 });
  const [recording, setRecording] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiType, setAiType] = useState('IN'); // Tracks if AI meant IN or OUT
  const [productData, setProductData] = useState({
    name: '',
    qty: '',
    price: '',
    unit: 'pcs'
  });
  const [expandedItemId, setExpandedItemId] = useState(null);

  const t = translations[lang];

  // Logic to handle stock updates and revenue
  const updateStock = (itemName, qtyInput, priceInput = 0, unitInput = 'pcs', typeKey = 'IN') => {
    if (!itemName) return;
    const normalizedId = itemName.toLowerCase().trim();
    const rawQty = Math.abs(parseInt(qtyInput)) || 0;

    // 1. Determine Price and Revenue
    const existingItem = inventory.find(i => i.id === normalizedId);
    const unitPrice = existingItem ? existingItem.price : (parseInt(priceInput) || 0);

    if (typeKey === 'OUT') {
      const saleAmount = rawQty * unitPrice;
      setTotals(prev => ({ ...prev, revenue: prev.revenue + saleAmount }));
    }

    const change = typeKey === 'OUT' ? -rawQty : rawQty;

    // 2. Update Inventory
    setInventory(prev => {
      const itemIndex = prev.findIndex(item => item.id === normalizedId);
      if (itemIndex > -1) {
        const newInv = [...prev];
        newInv[itemIndex] = {
          ...newInv[itemIndex],
          qty: Math.max(0, newInv[itemIndex].qty + change),
          unit: unitInput
        };
        return newInv;
      } else {
        return [...prev, {
          id: normalizedId,
          qty: typeKey === 'IN' ? rawQty : 0,
          unit: unitInput,
          price: unitPrice,
          category: 'New'
        }];
      }
    });

    // 3. Log Transaction
    setTransactions(prev => [{
      id: `${normalizedId}-${Date.now()}`,
      itemId: normalizedId,
      typeKey: typeKey,
      qty: rawQty,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }, ...prev]);

    // Reset Form
    setProductData({ name: '', qty: '', price: '', id: '', unit: 'pcs' });
  };

  const changePrice = (itemId, newPrice) => {
    setInventory(prev => prev.map(item => item.id === itemId ? { ...item, price: newPrice } : item));
  };

  // --- Voice Functions ---
  async function startRecording() {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") return alert("Permission required!");
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await rec.startAsync();
      setRecording(rec);
    } catch (err) { console.error(err); }
  }

  async function stopRecording() {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      const formData = new FormData();
      formData.append("file", { uri, name: "audio.m4a", type: "audio/m4a" });
      const languageMap = { EN: "en", हिं: "hi", ത: "ml" };
      formData.append("language", languageMap[lang] || "en");

      const response = await fetch("https://isis-vigintillionth-genially.ngrok-free.dev/process-audio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      setTranscript(data.transcript || "No transcript");

      if (data?.parsed?.product && data?.parsed?.quantity) {
        setAiType(data.parsed.action === "REMOVE" ? 'OUT' : 'IN');
        setProductData({
          name: data.parsed.product,
          qty: String(data.parsed.quantity),
          price: "",
          unit: data.parsed.unit || 'pcs'
        });
        setModalVisible(true);
      } else {
        console.warn("AI Parsing failed or returned incomplete data.");
      }
    } catch (err) {
      console.error("Recording Error:", err);
    }
  }

  return (
    <View style={styles.container}>
      <Header t={t} revenue={totals.revenue} lang={lang} setLang={setLang} />

      {/* Increased paddingBottom to account for the new instruction box + footer */}
      <ScrollView contentContainerStyle={{ paddingBottom: 280 }}>
        <QuickEntry
          t={t}
          productData={productData}
          setProductData={setProductData}
          onAdd={(name, qty, price, unit, type) => updateStock(name, qty, price, unit, type)}
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
            onUpdate={(val) => updateStock(item.id, val, item.price, item.unit, val < 0 ? 'OUT' : 'IN')}
            onPriceChange={changePrice}
          />
        ))}

        <Text style={globalStyles.sectionTitle}>{t.trans}</Text>
        <TransactionLedger t={t} transactions={transactions} />
      </ScrollView>

      {/* Grouped Instructions and Voice Button at the bottom */}
      <View style={styles.footerOverlay}>
        <VoiceFooter
          recording={recording}
          transcript={transcript}
          onStart={startRecording}
          onStop={stopRecording}
        />
      </View>

      <VerificationModal
        t={t}
        visible={modalVisible}
        productData={productData}
        onCancel={() => setModalVisible(false)}
        onConfirm={() => {
          updateStock(productData.name, productData.qty, productData.price, productData.unit, aiType);
          setModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background
  },
  footerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 999,              // Force it to stay on top of everything else
    paddingBottom: 20,
  }
});