import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client lazily / safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

const TAMIL_REGISTRATION_SYSTEM_INSTRUCTION = `
நீங்கள் தமிழ்நாடு அரசு பதிவு பெற்ற பத்திர எழுத்தாளர்கள் மற்றும் நில வருவாய்த்துறை ஆலோசனைகளுக்கான பிரத்யேக 100% தமிழ் AI உதவியாளர்.
உங்கள் பெயர்: "தமிழ் பத்திர & வருவாய் AI வழிகாட்டி".

உங்கள் முக்கிய சேவைகள் மற்றும் அறிவுக் களங்கள்:
1. தமிழ்நாடு பத்திரப் பதிவுத் துறை (TNREGINET) ஆன்லைன் சேவைகள்:
   - வில்லங்க சான்றிதழ் (Encumbrance Certificate - EC) விண்ணப்பம் மற்றும் சரிபார்ப்பு.
   - ஆன்லைன் பத்திரப் பதிவு முன்பதிவு (Token Booking).
   - நில வழிகாட்டி மதிப்பு (Guideline Value) கண்டறிதல்.
   - முத்திரைக் தாள் கட்டணம் & பதிவுக் கட்டணம் (Stamp Duty & Registration Fee):
     * கிரைய பத்திரம் (Sale Deed): 7% முத்திரைக் கட்டணம் + 2% பதிவுக் கட்டணம் (மொத்தம் 9%).
     * குடும்ப உறுப்பினர்கள் இடையிலான தான பத்திரம் / செட்டில்மென்ட் (Settlement within family): 4% முத்திரைக் கட்டணம் (அதிகபட்சம் ₹40,000) + 1% பதிவுக் கட்டணம் (அதிகபட்சம் ₹10,000).
     * பாகப்பிரிவினை (Partition Deed): 1% முத்திரைக் கட்டணம் + 1% பதிவுக் கட்டணம்.
     * அடமான பத்திரம் (Mortgage Deed), குத்தகை ஒப்பந்தம் (Lease Agreement), பொது அதிகாரம் (Power of Attorney).

2. நில வருவாய்த்துறை மற்றும் பட்டா சேவைகள் (Land Revenue & Patta):
   - பட்டா / சிட்டா பெயர் மாற்றம் (Patta Chitta Transfer).
   - தனி பட்டா (Individual Patta) & கூட்டு பட்டா (Joint Patta).
   - 'ஆ' பதிவேடு ('A' Register) விவரங்கள் & FMB வரைபடம் (Field Measurement Book).
   - நன்செய் (Wetland), புன்செய் (Dryland), நத்தம் / மனை (Plot Approval - DTCP / CMDA) விதிகள்.

3. சட்டங்கள், விதிகள் மற்றும் வழிகாட்டுதல்கள் (Laws & Acts):
   - 1908 இந்திய பத்திரப் பதிவுச் சட்டம் (The Registration Act, 1908).
   - 1899 இந்திய முத்திரைச் சட்டம் (Indian Stamp Act, 1899 & TN Amendments).
   - பிரிவு 77A (போலி பத்திரங்களை ரத்து செய்யும் அதிகாரங்கள்).
   - பிரிவு 22A & 22B (அரசு மற்றும் திருக்கோயில் நிலங்கள் பதிவு தடை).
   - மூலப் பத்திரங்கள் (Parent Documents) மற்றும் 13/30 ஆண்டு வில்லங்க சான்றிதழ் சரிபார்ப்பு.

4. நில அளவை மாற்றங்கள் (Land Measurement Conversions):
   - 1 ஏக்ரா = 100 சென்ட் = 43,560 சதுர அடி = 40.46 ஏர்ஸ்.
   - 1 சென்ட் = 435.6 சதுர அடி.
   - 1 மனை (Ground) = 2,400 சதுர அடி = 5.51 சென்ட்.
   - 1 ஹெக்டேர் = 2.47 ஏக்ரா = 247 சென்ட்.
   - 1 குழி = 144 சதுர அடி (பகுதியைப் பொருத்து மாறுபடும்).

பதிலளிக்கும் முறை:
- அனைத்து பதில்களையும் 100% தூய மற்றும் தெளிவான தமிழில் வழங்க வேண்டும்.
- சட்டபூர்வமான மற்றும் தமிழ்நாடு அரசின் தற்போதைய நடைமுறைகளின்படி துல்லியமான வழிகாட்டுதல்களை வழங்க வேண்டும்.
- தகவல்களை படிக்க எளிதாக புள்ளிகளாகவும் (bullet points) தெளிவான தலைப்புகளுடனும் வழங்க வேண்டும்.
- பயனர்களுக்கு தேவைப்பட்டால் எங்களது அங்கீகரிக்கப்பட்ட பத்திர எழுத்தாளர் அலுவலகத்தில் நேரடியாக ஆவணம் தயாரிக்க முன்பதிவு செய்யும் வழியையும் கூறவும்.
`;

// API Route for Tamil AI Assistant
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "செய்தி அவசியமானது." });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback response when GEMINI_API_KEY is not configured locally yet
      const fallbackReply = generateFallbackTamilReply(message);
      return res.json({ reply: fallbackReply });
    }

    const contents: any[] = [];
    
    if (Array.isArray(history)) {
      history.forEach((h: { role: string; text: string }) => {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        });
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction: TAMIL_REGISTRATION_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "மன்னிக்கவும், தற்சமயம் விடை உருவாக்க இயலவில்லை. மீண்டும் முயற்சிக்கவும்.";
    return res.json({ reply });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return res.status(500).json({
      error: "AI சேவையில் பிழை ஏற்பட்டது.",
      details: err.message,
    });
  }
});

// Helper for offline / fallback responses in Tamil if API Key isn't provided
function generateFallbackTamilReply(msg: string): string {
  const query = msg.toLowerCase();
  
  if (query.includes("வில்லங்கம்") || query.includes("ec")) {
    return `📜 **வில்லங்க சான்றிதழ் (Encumbrance Certificate - EC) பற்றிய தகவல்கள்:**

1. **பயன்:** ஒரு குறிப்பிட்ட சொத்தின் மீது முந்தைய 13 முதல் 30 ஆண்டுகளில் நடந்துள்ள கிரையம், அடமானம், குத்தகை, அல்லது நீதிமன்ற உத்தரவுகள் ஆகியவற்றை அறிய இது பயன்படுகிறது.
2. **தேவையான ஆவணங்கள்:**
   - சொத்தின் புல எண் (Survey No) மற்றும் உட்பிரிவு எண் (Sub-division No).
   - கிராமம் மற்றும் சார்பதிவாளர் அலுவலகத்தின் பெயர்.
   - சொத்து உரிமையாளர் பெயர் & கால அளவு (எ.கா: 1990 முதல் 2026 வரை).
3. **ஆன்லைன் சேவை:** எங்களது இ-சேவை மையத்தில் 5 நிமிடங்களில் ஆன்லைன் EC பெற்றுத் தரப்படும்!`;
  }

  if (query.includes("கட்டணம்") || query.includes("முத்திரை") || query.includes("கிரையம்")) {
    return `💰 **தமிழ்நாடு பத்திரப் பதிவு & முத்திரைக் கட்டண விவரங்கள்:**

- **கிரைய பத்திரம் (Sale Deed):** 7% முத்திரைக் கட்டணம் + 2% பதிவுக் கட்டணம் (மொத்தம் 9%).
- **குடும்ப உறுப்பினர் செட்டில்மென்ட் (Gift/Settlement):** 4% முத்திரைக் கட்டணம் (அதிகபட்சம் ₹40,000) + 1% பதிவுக் கட்டணம் (அதிகபட்சம் ₹10,000).
- **பாகப்பிரிவினை (Partition):** 1% முத்திரைக் கட்டணம் + 1% பதிவுக் கட்டணம்.
- **அடமான பத்திரம் (Mortgage):** 1% முத்திரைக் கட்டணம் + 1% பதிவுக் கட்டணம்.

துல்லியமான சொத்து வழிகாட்டி மதிப்பின்படி கட்டணம் கணக்கிட எங்களது **முத்திரைக் கட்டணக் கணிப்பான்** (Stamp Duty Calculator) பயன்படுத்தலாம்.`;
  }

  if (query.includes("பட்டா") || query.includes("சிட்டா")) {
    return `🌾 **பட்டா / சிட்டா பெயர் மாற்றம் வழிகாட்டி:**

1. **தேவையான ஆவணங்கள்:**
   - பதிவு செய்யப்பட்ட புதிய கிரைய/தான பத்திர நகல்.
   - முந்தைய பட்டா நகல்.
   - வில்லங்க சான்றிதழ்.
   - விண்ணப்பதாரரின் ஆதார் அட்டை & புகைப்படங்கள்.
2. **நடைமுறை:** 
   - ஆன்லைன் இ-சேவை மூலம் வட்டாட்சியர் (Tahsildar) அலுவலகத்திற்கு விண்ணப்பிக்கப்படும்.
   - கிராம நிர்வாக அலுவலர் (VAO) மற்றும் வருவாய் ஆய்வாளர் (RI) சரிபார்ப்பிற்கு பின் புதிய கணினி பட்டா வழங்கப்படும்.`;
  }

  if (query.includes("அளவு") || query.includes("சென்ட்") || query.includes("சதுர அடி") || query.includes("ஏக்ரா")) {
    return `📐 **நில அளவை அலகுகள் (Land Area Measurement Units):**

- **1 சென்ட்** = 435.6 சதுர அடி.
- **1 மனை (Ground)** = 2,400 சதுர அடி = 5.51 சென்ட்.
- **1 ஏக்ரா** = 100 சென்ட் = 43,560 சதுர அடி.
- **1 ஹெக்டேர்** = 2.47 ஏக்ரா = 247 சென்ட்.

எங்களது **நில அளவை மாற்றி** (Land Converter) கருவியைப் பயன்படுத்தி நொடியில் கணக்கிடுங்கள்!`;
  }

  return `வணக்கம்! **தமிழ்நாடு அரசு அங்கீகரிக்கப்பட்ட பத்திர எழுத்தாளர் & இ-சேவை மையத்திற்கு** உங்களை வரவேற்கிறோம். 

உங்களுக்கு நிலப் பத்திரப் பதிவு, வில்லங்க சான்றிதழ் (EC), பட்டா/சிட்டா மாற்றம், வழிகாட்டி மதிப்பு அல்லது சட்ட விதிகளில் ஏதேனும் சந்தேகம் இருந்தால் தயங்காமல் கேட்கலாம்.

📌 **முக்கிய சேவைகள்:**
1. பத்திரங்கள் எழுதுதல் (கிரையம், தானம், பாகப்பிரிவினை, அடமானம்)
2. ஆன்லைன் வில்லங்க சான்றிதழ் (EC) & கணினி பட்டா
3. சொத்து வழிகாட்டி மதிப்பு & பதிவுக் கட்டணம் கணக்கீடு
4. 1908 பதிவுச் சட்டம் & 1899 முத்திரைச் சட்ட ஆலோசனைகள்`;
}

// Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
