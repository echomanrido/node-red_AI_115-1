// AI知識 專區資料庫 (包含本質洞察、認知邊界、代理範式等核心專題)
window.INITIAL_AI_KNOWLEDGE_DATA = [
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
    "title": "AI 幻覺 (Hallucination) 的根源：為什麼大型語言模型會一本正經胡說八道？",
    "shortTitle": "AI 幻覺的本質與防守",
    "category": "認知邊界",
    "subCategory": "幻覺防禦 · 認知護欄",
    "date": "2026-10-16",
    "summary": "全面解密 AI 產生「幻覺」的數學與統計必然性。從自回歸模型 (Autoregressive) 的機率取樣、知識截止、意圖過度討好 (Sycophancy) 到注意力衰減。剖析在機電整合與工業物聯網中，如何透過 RAG 檢索增強、結構化 JSON Schema 約束、單元測試驗收與 Human-in-the-Loop 建立無懈可擊的防幻覺護欄。",
    "flowTitle": "LLM 幻覺產生機制與工業級多層防禦護欄架構",
    "resultTitle": "AI 幻覺根源分析與工程防禦互動工作台",
    "flowImage": "images_src/ai_knowledge_02_flow.svg",
    "resultImage": "AI知識/002AI幻覺根源與工程防禦.html",
    "slideUrl": "AI知識/002AI幻覺根源與工程防禦.html",
    "objective": "1. 理解自回歸大語言模型 (Autoregressive LLM) 幻覺的根本起因與數學原理。\n2. 掌握五大防禦工程心法：Temperature 參數調整、Grounding (RAG 錨定)、JSON Schema 結構化輸出、單元測試驗收與 Human-in-the-Loop 門禁。\n3. 在 Node-RED 工控實作中，杜絕盲目信任 AI 產生的暫存器定址與硬體通訊協議。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 幻覺成因一 —— 統計取樣的不確定性",
        "description": "LLM 透過 Softmax 機率分布挑選 Token。即使最正確答案機率達 90%，剩下的 10% 尾端機率仍可能被隨機取樣選中，導致連鎖性的幻覺滾雪球。"
      },
      {
        "step": "步驟 2: 幻覺成因二 —— 意圖討好與知識截止 (Sycophancy)",
        "description": "模型經過 RLHF (人類反饋強化學習) 微調後，傾向於給出「符合提問者期望」而非「客觀事實」的答案，甚至為迎合使用者提問中的錯誤前提而捏造藉口。"
      },
      {
        "step": "步驟 3: 工業防禦策略 —— 結構化與上下文注入 (Grounding)",
        "description": "不讓模型自由瞎掰。透過提供真實的 PLC 規格表、暫存器清單，並強制指定以 JSON Schema 輸出，限縮生成空間。"
      },
      {
        "step": "步驟 4: 終極門禁 —— 確定性程式碼驗收 (Deterministic Gates)",
        "description": "永遠不要用 LLM 去驗證另一個 LLM 的代碼是否正確。必須透過編譯器、Linter 與自動化單元測試進行確定性驗證。"
      }
    ],
    "promptTemplate": "你是一位工控系統安全性架構專家。請分析以下由 AI 產生的 Node-RED Modbus 通訊程式碼：\n1. 找出可能存在的「參數幻覺」（如未定義的暫存器地址、不存在的 Node 屬性）。\n2. 設計一套基於 JSON Schema 的輸出驗證護欄，防止 AI 生成超出 PLC 記憶體範圍 (D0-D1000) 的非法存取。",
    "codeSnippet": {
      "language": "json",
      "code": "{\n  \"$schema\": \"http://json-schema.org/draft-07/schema#\",\n  \"title\": \"IndustrialRegisterGuard\",\n  \"type\": \"object\",\n  \"properties\": {\n    \"address\": { \"type\": \"integer\", \"minimum\": 0, \"maximum\": 1000 },\n    \"operation\": { \"type\": \"string\", \"enum\": [\"READ_HOLDING\", \"WRITE_SINGLE\"] }\n  },\n  \"required\": [\"address\", \"operation\"]\n}"
    },
    "references": [
      {
        "title": "Anthropic 對抗幻覺研究報告：Reducing Hallucinations in LLMs",
        "url": "https://www.anthropic.com/research"
      },
      {
        "title": "OpenAI 結構化輸出 (Structured Outputs) 開發指南",
        "url": "https://platform.openai.com/docs/guides/structured-outputs"
      }
    ],
    "applications": [
      {
        "icon": "fa-solid fa-triangle-exclamation",
        "scenario": "工業設備指令安全護欄",
        "description": "在 AI 決策與現場硬體致動器 (Actuator) 之間增加確定性檢驗層，徹底杜絕幻覺造成的實體機械碰撞損毀。"
      }
    ]
  },
  {
    "id": "ai-kn-03",
    "itemNumber": "03",
    "title": "從聊天機器人到自主代理 (Agent)：Reasoning 推理鏈與工具行動閉環",
    "shortTitle": "從 Chatbot 到 Agent 代理",
    "category": "代理範式",
    "subCategory": "ReAct 架構 · 工具調度",
    "date": "2026-10-16",
    "summary": "為什麼 2026 年是 AI Agent 的爆發元年？深入解構從「文字問答」到「自主行動」的範式躍遷。剖析 ReAct (Reasoning + Acting) 核心架構、思維鏈 (Chain of Thought)、MCP (Model Context Protocol) 協議與多代理協同分工，理解為什麼 Agent 才是重塑人類生產力的終極引擎。",
    "flowTitle": "ReAct 自主代理思考、行動、觀測與自我修正全流程",
    "resultTitle": "Agentic Workflow 代理人工作流互動架構台",
    "flowImage": "images_src/ai_knowledge_03_flow.svg",
    "resultImage": "AI知識/003ReAct自主代理人架構.html",
    "slideUrl": "AI知識/003ReAct自主代理人架構.html",
    "objective": "1. 掌握 Autonomous Agent (自主代理) 與一般 Chatbot 的質變差異。\n2. 深入理解 ReAct 循環 (Thought -> Action -> Observation -> Reflection) 的運作機制。\n3. 理解 MCP (Model Context Protocol) 協議如何將 Agent 連結到資料庫、終端機與實體工控硬體。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 突破文字牢籠 —— 工具調用 (Tools)",
        "description": "Chatbot 只能輸出文字建議，而 Agent 具備「手和腳」，能透過 Function Calling 實際讀寫檔案、呼叫 RESTful API 與執行資料庫查詢。"
      },
      {
        "step": "步驟 2: ReAct 推理鏈 —— 謀定而後動",
        "description": "Agent 在執行行動前，先進行 Thought（推理與策略規劃），行動後透過 Observation（觀測執行回傳日誌），依據客觀事實校正下一步。"
      },
      {
        "step": "步驟 3: 自我自愈閉環 (Self-Healing Loops)",
        "description": "遇到語法錯誤或執行逾時，Agent 不需人類介入，能自動讀取報錯堆疊、理解錯誤根因並自主修正程式碼。"
      },
      {
        "step": "步驟 4: 人機協同邊界 (Human-in-the-Loop)",
        "description": "人類從繁瑣的搬磚敲碼中解放，成為 Agent 團隊的高階架構師與品質守門員，把關安全性極限與驗收門禁。"
      }
    ],
    "promptTemplate": "請以 ReAct 框架規劃一個自主排查 Node-RED Modbus 斷線的 Agent Workflow：\n1. 明確定義 Agent 在 Thought、Action、Observation 階段的具體步驟。\n2. 包含通訊逾時熔斷與自動重連機制的自主診斷策略。",
    "codeSnippet": {
      "language": "python",
      "code": "# ReAct 代理人核心狀態機架構範例\ndef react_loop(agent, environment, goal_spec):\n    state = environment.get_current_state()\n    while not goal_spec.is_satisfied(state):\n        thought = agent.think(goal_spec, state)\n        action = agent.decide_action(thought)\n        observation = environment.execute(action)\n        state = agent.reflect(thought, action, observation)\n    return 'Goal Achieved with Verified Artifacts'"
    },
    "references": [
      {
        "title": "Anthropic: Building effective agents (構建高可靠代理指南)",
        "url": "https://www.anthropic.com/research/building-effective-agents"
      },
      {
        "title": "Model Context Protocol (MCP) 官方規範",
        "url": "https://modelcontextprotocol.io/"
      }
    ],
    "applications": [
      {
        "icon": "fa-solid fa-robot",
        "scenario": "全自動化工業監控與故障排查 Agent",
        "description": "讓 Agent 具備讀取現場 SCADA 告警日誌與遠端重啟服務能力，大幅縮短工廠停線修復時間。"
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.INITIAL_AI_KNOWLEDGE_DATA = window.INITIAL_AI_KNOWLEDGE_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = window.INITIAL_AI_KNOWLEDGE_DATA;
}
