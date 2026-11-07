// AI知識 專區資料庫 (包含本質洞察、思維躍遷等核心專題)
var INITIAL_AI_KNOWLEDGE_DATA = [
  {
    "id": "ai-kn-01",
    "itemNumber": "01",
    "title": "ChatGPT 只是高級文字接龍？諾貝爾 AI 教父打臉：它真的聽得懂！",
    "shortTitle": "ChatGPT 只是高級文字接龍？",
    "category": "本質洞察",
    "subCategory": "世界模型 vs 文字接龍",
    "date": "2026-10-16",
    "summary": "深入剖析大語言模型 (LLM) 的認知本質：究竟是統計機率上的「高級文字接龍」，還是已建構對世界的「內在因果心智模型」？收錄泛科學院精華圖文解析、2024 諾貝爾物理學獎得主 Geoffrey Hinton 的權威洞察，以及 Rido 老師一針見血的名言：「預測下一個字要說什麼？如果是，那叫話術。」",
    "flowTitle": "人類認知（世界模型） vs LLM 機率接龍（話術本質） vs 諾貝爾得主觀點架構圖",
    "resultTitle": "世界模型 vs 話術接龍 深度圖文導覽",
    "flowImage": "images_src/ai_knowledge_01_flow.svg",
    "resultImage": "AI知識/001ChatGPT 只是高級文字接龍？.html",
    "slideUrl": "AI知識/001ChatGPT 只是高級文字接龍？.html",
    "objective": "1. 深入探討大型語言模型 (LLM) 的底層本質：從下一個詞預測 (Next-Token Prediction) 到深層世界模型 (World Model)。\n2. 理解人類大腦與 AI 認知世界的根本差異：人類依賴物理與因果規律，AI 依賴海量統計關聯。\n3. 理解 Rido 老師一針見血的名言「預測下一個字要說什麼？如果是，那叫話術」對工程師提示詞設計與防呆架構的啟示。\n4. 掌握 2024 諾貝爾物理學獎得主 Geoffrey Hinton 對於「神經網路是否真正理解語意」的權威論述。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 認知的根本差異 —— 物理因果 vs 統計機率",
        "description": "人類從小透過觸摸、觀察重力、體驗因果關係來建立對物理與真實世界的「心智模型」；而大語言模型的初始使命，僅是透過海量文字統計去猜測「下一個最可能出現的詞」。正因如此，它能以極高段的話術頭頭是道，卻會在最基本的常識邏輯中露出破綻。"
      },
      {
        "step": "步驟 2: Rido 老師核心名言解析 —— 「話術」的本質",
        "description": "「預測下一個字要說什麼？如果是，那叫話術。」話術追求的是聽起來圓滑流暢、符合聽者心理預期的精準詞彙排列；但真正理解世界，靠的是對重力、因果、邏輯與物理規律的心智架構。工程師必須意識到：AI 能寫出天花亂墜的代碼，不等於它保證物理上安全可用！"
      },
      {
        "step": "步驟 3: 諾貝爾 AI 教父 Geoffrey Hinton 的權威觀點",
        "description": "Hinton 舉例：以「黑白棋」神經網路為例，表面上只是預測下一手落子，但為了精準預測，模型內部必須自發建構出完整的 8x8 棋盤狀態與棋局推演！同樣地，大語言模型在海量文字接龍中，已壓縮並內化了人類知識的「深層世界模型」。"
      },
      {
        "step": "步驟 4: 對工控與生成式 AI 開發的關鍵啟發",
        "description": "不要把 AI 當成萬能的神，也不要把 AI 當成低能的鸚鵡。在機電工控與 Node-RED 開發中，工程師的職責是提供「規格鷹架 (Spec)」與「防呆護欄」，引導其世界模型精準落地，而非放任其靠話術通靈自由發揮。"
      }
    ],
    "promptTemplate": "你是一位專精於 AI 認知科學與大型語言模型 (LLM) 系統架構的主任研究員。\n請依據「世界模型 vs 文字接龍」與「話術本質」的深度理論：\n1. 針對工程師與初學者，說明為何 LLM 會出現『一本正經地胡說八道（幻覺）』？\n2. 深入解析 2024 諾貝爾獎 Geoffrey Hinton 提出『黑白棋局預測』如何證明神經網路內部存在世界模型。\n3. 在工控自動化與 Vibe Coding 實踐中，工程師該如何設計『因果驗證機制』避免被 AI 的話術蒙蔽？",
    "codeSnippet": {
      "language": "python",
      "code": "# 概念驗證：Next-Token Prediction 機率取樣 vs 因果世界模型推論\nimport torch\nimport torch.nn.functional as F\n\ndef sample_next_token(logits, temperature=0.7):\n    # 統計機率接龍：計算下一個最可能的 Token 分布\n    probs = F.softmax(logits / temperature, dim=-1)\n    return torch.multinomial(probs, num_samples=1)\n\n# 核心心法：工程師需外加物理約束與驗收防護（Guardrails），而非單信機率話術！"
    },
    "references": [
      {
        "title": "泛科學院 影音圖文精華：ChatGPT 只是文字接龍？諾貝爾 AI 教父打臉：它真的聽得懂！ (專屬導覽頁面)",
        "url": "AI知識/001ChatGPT 只是高級文字接龍？.html"
      },
      {
        "title": "泛科學院 YouTube 原片觀看 (S6JizkTVMQM)",
        "url": "https://youtu.be/S6JizkTVMQM"
      },
      {
        "title": "Geoffrey Hinton 諾貝爾物理學獎得主演講與世界模型研究論文",
        "url": "https://www.nobelprize.org/prizes/physics/2024/hinton/facts/"
      }
    ],
    "applications": [
      {
        "icon": "fa-solid fa-brain",
        "scenario": "AI 認知本質研習與提示詞工程底層思維",
        "description": "透過文字接龍與因果世界模型的對照，理解 AI 幻覺成因，建立高維度 Prompt 與上下文工程能力。"
      },
      {
        "icon": "fa-solid fa-shield-halved",
        "scenario": "工業機電防呆規範與因果守護",
        "description": "銘記「那叫話術」警惕，在 PLC 與 SCADA 開發中加入實體看門狗與訊號驗證，不輕信未驗證代碼。"
      }
    ]
  },
  {
    "id": "ai-kn-02",
    "itemNumber": "02",
    "title": "想把 AI 用得好，你得再瘋一點：Anthropic 4D 野心評估模型",
    "shortTitle": "想把 AI 用得好，你得再瘋一點",
    "category": "思維躍遷",
    "subCategory": "Anthropic 4D 野心模型",
    "date": "2026-11-07",
    "summary": "Anthropic 工程主管 Felix Rieseberg 震撼思維：限制你的從來不是模型智商，而是你的舊習慣與想像力！全面解析「速度、高度、深度、廣度」4D 野心評估模型。學會不做微觀管理，提升視角至「對最終結果負責」；透過「然後呢？」四層階梯推演重構工作流；向 AI 連問 4 個專家診斷問題並給定「極限高標」；撕掉標籤將名詞換成動詞進行跨界借法。並以決策期望值證明：在 AI 時代失敗成本趨近於零，提出突破性大問題的期望值永遠是正數！",
    "flowTitle": "Anthropic 4D 野心評估模型（速度 · 高度 · 深度 · 廣度）與決策期望值架構圖",
    "resultTitle": "想把 AI 用得好，你得再瘋一點 互動專題工作台",
    "flowImage": "images_src/ai_knowledge_02_flow.svg",
    "resultImage": "AI知識/002.想把 AI 用得好，你得再瘋一點.html",
    "slideUrl": "AI知識/002.想把 AI 用得好，你得再瘋一點.html",
    "objective": "1. 掌握 Anthropic 工程主管 Felix Rieseberg 提出的 4D 野心評估模型（速度、高度、深度、廣度）。\n2. 學會不做微觀管理，提升視角至「對最終結果負責」，透過「然後呢？」四層階梯推演重構日常工作流。\n3. 理解深度維度的提問心法：向 AI 提出 4 個專家診斷問題，並給定看似不合理的「極限高標」激發架構級重構。\n4. 掌握廣度維度的跨界技巧：將「名詞」換成「作用動詞」，破除行業刻板做法，跨界調用外部領域智慧。\n5. 理解決策期望值公式 E ≈ P_success * V_breakthrough > 0，打破心理天花板，敢向 AI 提出大問題。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 速度 (Speed) —— 效率提升的起點，而非終點",
        "description": "大部分人接觸 AI 的第一直覺就是「加速」，把原本耗費數小時的例行文書、資料抓取或模板代碼縮短至數分鐘。但這只是把 AI 當成快打字機，真正的競爭優勢在接下來三個層次。"
      },
      {
        "step": "步驟 2: 高度 (Height) —— 不做微觀管理，讓 AI 對「最終結果」負責",
        "description": "不要只讓 AI 修一行錯誤或潤飾句子。像主管與老闆一樣下達高階目標（如：讓 App 保持不當機，自主抓取 Crash Log 分析並修復）。透過持續追問「然後呢？」四層階梯（填寫資料 -> 原因洞察 -> 輔助決策 -> 流程重構），打造自動化異常監測流程。"
      },
      {
        "step": "步驟 3: 深度 (Depth) —— 拒絕平庸扮演，調用頂尖專家方法論與極限高標",
        "description": "單純說「請扮演專家」只會換來空泛套話。動手前連問四個問題：專家會做哪些常人想不到的事、看哪些第一手資料、運用哪些專業實證框架、如何客觀驗證。搭配 Locke & Latham 目標設定理論給予「極限高標」（如優化時間由 10 秒壓縮至 0.2 秒），迫使 AI 進行底層架構重構。"
      },
      {
        "step": "步驟 4: 廣度 (Breadth) —— 把名詞換成動詞，撕掉行業標籤跨領域借法",
        "description": "向 AI 提問時使用現成專有名詞，會把 AI 鎖在該行業的刻板做法中。試著將名詞轉化為背後的作用動詞（例如：不說「設計網站首頁」，改說「5秒內抓住陌生人注意力並引發強烈好奇心」），讓 AI 跨界調用電影預告片剪輯節奏、短影音黃金鉤子與精品櫥窗陳列法。"
      },
      {
        "step": "步驟 5: 期望值破局 —— 失敗成本趨近於零，敢交多大的問題！",
        "description": "依據期望值公式 E = P_success * V_breakthrough - (1 - P_success) * C_failure。在 AI 時代提問的失敗成本 C_failure 幾乎為 0，哪怕大膽提出的破局目標成功率只有 1%，數學期望值依然是巨大的正數！"
      }
    ],
    "promptTemplate": "你是一位兼具高維度系統架構與跨領域洞察的頂尖資深專家顧問。\n請針對我的目標，遵循 Anthropic 4D 野心評估模型進行深度推演：\n\n【高度推演（然後呢？）】：\n請不要只給我單一執行步驟。請以四層推演視角（Level 1 基礎執行 -> Level 2 根因洞察 -> Level 3 關鍵決策建議 -> Level 4 系統自動化重構），規劃具體落地路徑。\n\n【深度調用（專家盲區與極限高標）】：\n動手前請先回答：\n1. 該領域最頂尖的專家，會做哪些 99% 一般人想不到的關鍵細節？\n2. 專家會調閱哪些第一手真實原始數據？\n3. 若設定看似不合理的極限目標（例如將效能提升 10 倍以上），需要重構哪些底層架構？\n\n【廣度跨界（動詞作用導向）】：\n請撕掉本行業的傳統專有名詞標籤，轉化為背後的核心作用動詞，並借調其他異業領域（如短影音破題、電影節奏、航太安全冗餘）的最強方法論來完善解決方案。",
    "codeSnippet": {
      "language": "javascript",
      "code": "// 4D 野心評估模型自檢函式與決策期望值計算\nfunction evaluateAmbition({ speed, height, depth, breadth, pSuccess, vBreakthrough }) {\n  // 失敗成本在 AI 提問情境趨近於 0\n  const cFailure = 0;\n  const expectedValue = (pSuccess * vBreakthrough) - ((1 - pSuccess) * cFailure);\n  \n  return {\n    expectedValue: expectedValue,\n    verdict: expectedValue > 0 ? '數學期望值為正，大膽提出大問題！' : '請重新檢視目標',\n    checklist: {\n      speed: '是否已將日常流程自動化縮短時間？',\n      height: '是否跳出微觀管理，透過「然後呢？」四層階梯直擊最終結果？',\n      depth: '是否連問 4 個專家診斷問題並設定極限高標？',\n      breadth: '是否將名詞換成動詞作用，跨界借調最強解法？'\n    }\n  };\n}"
    },
    "references": [
      {
        "title": "Gary Chen 實戰教學：想把 AI 用得好，你得再瘋一點 (專屬互動導覽工作台)",
        "url": "AI知識/002.想把 AI 用得好，你得再瘋一點.html"
      },
      {
        "title": "Gary Chen YouTube 原片觀看 (MzklWMQ87Yw)",
        "url": "https://youtu.be/MzklWMQ87Yw"
      },
      {
        "title": "Anthropic 工程主管 Felix Rieseberg 核心觀點分享",
        "url": "https://x.com/felixrieseberg"
      }
    ],
    "applications": [
      {
        "icon": "fa-solid fa-rocket",
        "scenario": "Vibe Coding 軟體架構重構與自動化代理",
        "description": "要求 AI 不僅修復報錯，而是對整個 App 穩定性與自動化 Crash 排查全面負責，透過四層階梯推演打造自癒系統。"
      },
      {
        "icon": "fa-solid fa-lightbulb",
        "scenario": "機電工控與跨領域創新破局",
        "description": "將工控報警轉化為「第一時間感知異常並自主阻斷危害」，調用航太容錯設計與極限效能高標，實現智慧化產線監測。"
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.INITIAL_AI_KNOWLEDGE_DATA = window.INITIAL_AI_KNOWLEDGE_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = INITIAL_AI_KNOWLEDGE_DATA;
}
