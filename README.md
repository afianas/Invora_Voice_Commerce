
# 📦 Invora

### Voice-Powered Multilingual Inventory Intelligence for MSMEs

---

## 🚀 Project Description

**Invora** is a multilingual, voice-first mobile inventory management system built for small suppliers, shopkeepers, and warehouse operators.

Traditional inventory apps assume:

* English literacy
* Keyboard input
* Desk-based usage

Invora is different.

It enables suppliers to manage stock using **natural voice commands in Malayalam, Hindi, or English**, powered by AI-driven speech recognition and smart NLP parsing.

> “Inventory management built for the warehouse floor — not the office desk.”

---

# 🧠 Problem Statement

Small and rural businesses struggle with:

* Language barriers
* Complex ERP software
* Slow manual entry
* No revenue visibility

Invora solves this by combining:

* 🎙 Voice input
* 🌍 Multilingual support
* 📊 ABC revenue analysis
* 🤖 AI-powered smart parsing

---

# 🛠 Tech Stack

### 📱 Frontend (Mobile App)

* React Native (Expo)
* Expo Audio
* Fetch API
* State management (React Hooks)

### 🧠 Backend

* FastAPI
* Whisper ASR (Speech-to-Text)
* Smart Rule-Based NLP
* Python

### ☁ Deployment

APK Rendering

---

# ✨ Features

## 1️⃣ The “Bolo” Interface (Voice-First Entry)

🎙 Large microphone button
User speaks in Malayalam / Hindi / English
No typing required

Technology:

* Speech-to-text via ASR
* Language-controlled transcription

User Value:

* Faster than manual entry
* Works for semi-literate suppliers
* Hands-free usage

---

## 2️⃣ Smart NLP Layer (Entity Extraction)

Invora extracts:

* Product
* Quantity
* Unit
* Action (Add / Remove)

Example:

> “50 kilo panchasara cherkuka”

Automatically becomes:

```json
{
  "action": "ADD",
  "product": "Sugar",
  "quantity": 50,
  "unit": "kg"
}
```



---

## 3️⃣ Verification & Transparency

To prevent AI mistakes:

* Raw transcript is shown
* Editable fields
* Manual override option

This builds trust.

---

## 4️⃣ Core Inventory Management

Tracks:

* Product Name
* Stock Level
* Unit
* Selling Price (SP)

Single-warehouse optimized
Flat structure for speed

---

## 5️⃣ ABC Analysis (Revenue Intelligence)

Automatically classifies:

| Category      | Meaning                        |
| ------------- | ------------------------------ |
| 🥇 A (Gold)   | Top 20% generating 80% revenue |
| 🥈 B (Silver) | Moderate value                 |
| 🥉 C (Bronze) | Low value                      |

Category A, B, C items are highlighted in dashboard.

---

## 6️⃣ Financial & AI Insights

* Real-time revenue tracking

---

# 🌍 Multilingual Usage Instructions

## 🇬🇧 English Commands

### ➕ Add Stock

* “Add 5 kg sugar”
* “Add 10 litres milk”


### ➖ Remove / Sell Stock

* “Remove 3 kg rice”

---

## 🇮🇳 Hindi Commands

### ➕ Add

* “5 kilo chini jodo”

### ➖ Remove

* “5 kilo chawal nikaal do”
* “2 packet namak hatao”

---

## 🇮🇳 Malayalam Commands

### ➕ Add

* “5 kilo panchasara cherkuka”
* “10 litre paal cherku”
* “20 packet biscuit cherkuka”

### ➖ Remove

* “5 kilo ari vittu”
* “3 litre enna neekkuka”
* “2 packet uppu eduthu kalayu”

---

# 📲 Installation & Build Guide

## 🔧 Clone Repository

```bash
git clone <https://github.com/afianas/Invora_Voice_Commerce.git>
cd invora
```

---

## 🐍 Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```


## 📱 Frontend Setup

```bash
cd frontend
npm install
npx expo start
```

Scan QR using Expo Go.

---

# 📦 Build APK (Production)

Install EAS CLI:

```bash
npm install -g eas-cli
eas login
```

Configure build:

```bash
eas build:configure
```

Build APK:

```bash
eas build -p android --profile preview
```

Download APK from Expo dashboard.

---

# 📥 Install APK on Android

1. Download APK
2. Enable “Install from Unknown Sources”
3. Install
4. Open Invora

---

# 🗂 Folder Structure

```
ibhashini_voice_commerce/
│
├── backend/
│   ├── src/
│   │   ├── _init_.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── nlp_engine.py
│   │   ├── whisper_service.py
│   │   └── inspect_ffmpeg.py
│   │
│   ├── requirements.txt
│   └── static/          (if backend serves static files)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── header.js
│   │   │   ├── inventory_item.js
│   │   │   ├── quick_entry.js
│   │   │   ├── transaction_ledger.js
│   │   │   ├── verification_modal.js
│   │   │   ├── voice_footer.js
│   │   │   └── voice_instruction.js
│   │   │
│   │   ├── styles/
│   │   ├── utils/
│   │   └── app.js
│   │
│   ├── public/
│   │   └── logo.png
│   │
│   ├── package.json
│   └── package-lock.json
│
├── docs/
│   ├── architecture_diagram.png
│   ├── api_flow.png
│   └── deployment_notes.md
│
└── README.md
```

---
# 🧭 App Flow Diagram

<div align="center">
  <img width="400" alt="App Flow Diagram" src="https://github.com/user-attachments/assets/269840ac-90e8-46ea-8a68-0f74a86e19fe" />
</div>

---
# 🏗 Architecture Diagram

<div align="center">
  <img width="600" alt="Architecture Diagram" src="https://github.com/user-attachments/assets/3913e15c-8071-448d-afcb-7812fb684275" />
</div>

# 🎥 Demo Video
https://drive.google.com/file/d/19N4Rm2TWIm_VSkBs0wgSCTwNRzbMutI1/view?usp=drivesdk
---

# 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img width="220" alt="Screenshot 1" src="https://github.com/user-attachments/assets/db9c6485-5897-465a-85dd-a28cd1fcd68a" />
      </td>
      <td align="center">
        <img width="220" alt="Screenshot 2" src="https://github.com/user-attachments/assets/645cab12-9533-414c-ae22-7fbdfa938cb3" />
      </td>
      <td align="center">
        <img width="220" alt="Screenshot 3" src="https://github.com/user-attachments/assets/6dc23811-cf96-4be1-939d-ccbe75b8cd3a" />
      </td>
    </tr>
  </table>
</div>

# 👥 Team Members

* Afia Nasumudeen – Backend, Frontend-Backend Integration
* Akshara C A - Frontend 

---

# 🤖 AI Tools Used

* Whisper (Speech Recognition)

---

# 📜 License

MIT License



# ❤️ Built For

Small businesses.
Warehouse floors.
Regional language users.

Made with ❤️ for inclusive commerce.


