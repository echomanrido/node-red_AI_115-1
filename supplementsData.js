window.INITIAL_SUPPLEMENTS_DATA = [
  {
    "id": "sup-01",
    "supNumber": "01",
    "title": "電腦硬體規格需求與採購指南",
    "date": "2026-08-28",
    "category": "硬體規劃",
    "summary": "針對 Node-RED 開發、C# 程式開發與落地型大語言模型 (Local LLM) 三種應用場景，深入剖析其硬體瓶頸與資源消耗差異，並提供不同場景的推薦電腦規格配置、預算估算與採購參考連結。",
    "image": "images_src/ok/20260828_pc_specs_comparison.png",
    "objective": "1. 掌握 Node-RED、C# 程式開發與落地型大語言模型 (Local LLM) 在電腦硬體資源消耗上的根本差異。\n2. 學習如何依據自身開發需求選擇合適的 CPU 核心數、RAM 容量與 SSD 讀寫規格。\n3. 了解獨立顯卡 (GPU) 與顯示記憶體 (VRAM) 對於運行落地 LLM 的決定性影響與採購標準。",
    "tutorialSteps": [
      {
        "step": "1. 三種開發場景規格對比與瓶頸分析",
        "description": "【核心規格指標對比】\n\n• 運算負載類型：\n  - Node-RED：輕量 I/O、事件驅動\n  - C# 開發：多執行緒編譯、容器/資料庫模擬\n  - 落地 LLM：矩陣平行運算、記憶體頻寬吞吐\n\n• CPU 建議：\n  - Node-RED：4 ~ 6 核心（如 Core i3 / R5 / 樹莓派）\n  - C# 開發：8 ~ 16 核心（Core i5 / i7、Ryzen 7）\n  - 落地 LLM：8 ~ 16 核心（單純推論以顯卡為主，量化模型 CPU-offload 需多核心）\n\n• 系統記憶體 (RAM)：\n  - Node-RED：8GB ~ 16GB\n  - C# 開發：32GB ~ 64GB（開 IDE + Docker + DB）\n  - 落地 LLM：32GB ~ 64GB DDR5（Apple 體系需 48GB~128GB 統一記憶體）\n\n• 獨立顯卡 (GPU)：\n  - Node-RED：無需獨立顯卡（內顯即可）\n  - C# 開發：內顯或入門顯卡（遊戲/3D 開發除外）\n  - 落地 LLM：極度依賴顯卡與 VRAM（8B 需 16GB VRAM；70B 需 24GB~48GB+）\n\n• 硬碟容量：\n  - Node-RED：256GB ~ 512GB SSD\n  - C# 開發：1TB NVMe PCIe 4.0 SSD\n  - 落地 LLM：2TB+ 高速 NVMe SSD（模型權重檔極大）"
      },
      {
        "step": "2. Node-RED 流程開發機（輕量/邊緣物聯網）",
        "description": "• 硬體重點：Node.js 執行環境開銷極小，著重在低功耗、穩定聯網與基本記憶體。\n• 推薦配置：迷你主機（Mini PC）或入門文書機（Intel N100 / Ryzen 5 + 16GB RAM + 512GB SSD）。\n• 預估預算：約 NT$ 6,000 ~ 12,000"
      },
      {
        "step": "3. C# / .NET 專業開發機（中高效能編譯）",
        "description": "• 硬體重點：Visual Studio 2022、SQL Server 本地實例、Docker 容器與快速增量編譯，需要充足的 CPU 多核效能與 32GB 以上記憶體。\n• 推薦配置：Intel Core i7-14700 / AMD Ryzen 7 7700X + 32GB~64GB DDR5 + 1TB~2TB Gen4 SSD + RTX 4060（非必要，依專案而定）。\n• 預估預算：約 NT$ 28,000 ~ 45,000"
      },
      {
        "step": "4. 落地型大語言模型運算工作站（高效能 AI 推論）",
        "description": "• 硬體重點：\n  - 7B ~ 14B 模型（如 Llama 3 8B, Qwen 14B 量化版）：需 16GB VRAM 顯卡（如 RTX 4060 Ti 16GB 或 RTX 4070 Ti Super 16GB）。\n  - 32B ~ 70B 模型（量化版 / 高並發）：需 24GB VRAM 以上（RTX 3090 / 4090 或雙卡並行），或採用 Apple Silicon 高頻寬統一記憶體方案（Mac mini / Studio 64GB+）。\n• 推薦配置：\n  - Windows/Linux PC 方案：Ryzen 7 / i7 + 64GB RAM + NVIDIA RTX 4060 Ti 16GB / RTX 4090 24GB + 1000W 電源。\n  - Mac 方案：Mac mini / Mac Studio (M4 Pro / M2 Ultra, 48GB~64GB+ 統一記憶體)。\n• 預估預算：\n  - 入門 AI 機（16GB VRAM）：約 NT$ 38,000 ~ 55,000\n  - 中高階 AI 工作站（24GB VRAM / Mac 高規）：約 NT$ 75,000 ~ 120,000+\n"
      }
    ],
    "references": [
      {
        "title": "PChome 24h - 專業開發兼 AI 筆電 (ASUS TUF R7/32G/RTX5060)",
        "url": "https://24h.pchome.com.tw/prod/DHABFO-A900IYQLL-000"
      },
      {
        "title": "PChome 24h - 2TB 高速 PCIe Gen4 M.2 SSD (Lexar 雷克沙)",
        "url": "https://24h.pchome.com.tw/prod/DRAHIS-A900J94T3-000"
      },
      {
        "title": "欣亞數位 - DIY 電腦估價與零組件",
        "url": "https://www.sinya.com.tw/"
      },
      {
        "title": "原價屋 線上估價系統",
        "url": "https://coolpc.tw/evaluate.php"
      },
      {
        "title": "Apple 台灣官方商店 - Mac mini / Mac Studio 配置",
        "url": "https://www.apple.com/tw/shop/buy-mac/mac-mini"
      }
    ]
  },
  {
    "id": "sup-02",
    "supNumber": "02",
    "title": "Node.js 與 npm 安裝狀態確認",
    "date": "2026-07-09",
    "category": "環境建置",
    "summary": "介紹如何在 Windows 系統下利用命令提示字元 (cmd) 檢查 Node.js 與 npm 是否已成功安裝，並讀取當前的執行版本，為 Node-RED 架設打好基礎。",
    "image": "images_src/ok/20260709_check_version_supplement.jpg",
    "objective": "1. 掌握命令提示字元 (Terminal) 的基本開啟方式與基本命令行操作。\n2. 理解版本檢測指令 `-v` 或 `--version` 的參數用途。\n3. 確認開發環境是否完全就緒，為本地端架設 Node-RED 作為物聯網中樞進行準備。",
    "tutorialSteps": [
      {
        "step": "1. 開啟 Windows 命令提示字元 (cmd)",
        "description": "在 Windows 系統中，按下鍵盤的 `Win + R` 鍵開啟「執行」對話框，輸入 `cmd` 後按下 Enter 鍵；或者在 Windows 開始功能表搜尋「命令提示字元」並點擊開啟。"
      },
      {
        "step": "2. 執行 Node.js 版本查詢指令",
        "description": "在開啟的命令列視窗中輸入指令 `node -v`（注意 node 與參數之間有一個空格）並按下 Enter。若先前 Node.js 安裝順利且環境變數設定正確，命令列將回傳如 `v18.17.0` 等版本號。"
      },
      {
        "step": "3. 執行 npm 套件管理器版本查詢指令",
        "description": "接著在視窗中輸入指令 `npm -v` 並按下 Enter。系統將回傳如 `9.6.7` 的套件管理器版本號。npm 是 Node.js 內建的套件管理器，隨 Node.js 一併安裝，是用於在終端安裝及管理 Node-RED 等開源工具的關鍵程式。"
      },
      {
        "step": "4. 排除常見安裝錯誤",
        "description": "若執行指令時回傳「'node' 不是內部或外部命令、可執行的程式或批次檔」，通常代表 Node.js 安裝失敗或 PATH 環境變數遺漏，請重新執行 Node.js 官方安裝檔並勾選『Add to PATH』選項。"
      }
    ],
    "references": [
      {
        "title": "Node.js 官方下載頁面",
        "url": "https://nodejs.org/zh-tw/download/"
      },
      {
        "title": "npm 官方繁體中文指南",
        "url": "https://docs.npmjs.com/about-npm"
      },
      {
        "title": "Node-RED 官方本地安裝教學指南",
        "url": "https://nodered.org/docs/getting-started/local"
      }
    ]
  },
  {
    "id": "sup-03",
    "supNumber": "03",
    "title": "JavaScript 資料型態與 Node-RED 節點對應",
    "date": "2026-07-14",
    "category": "JavaScript 基礎",
    "summary": "剖析 JavaScript 核心資料型態（String, Number, Boolean, JSON, timestamp）的定義，並介紹如何在 Node-RED 的 Inject (輸入) 節點屬性面板中進行切換與配置。",
    "image": "images_src/ok/20260714_javascript_format_supplement.jpg",
    "objective": "1. 掌握 JavaScript 核心變數型態（字串、數字、布林值、時間戳記、JSON 物件）的基本概念。\n2. 理解 Node-RED 的核心變數流向封包格式 `msg.payload`。\n3. 學習如何在 Inject 節點的屬性編輯面板中，手動切換並設定不同型態 of 資料發送源。",
    "tutorialSteps": [
      {
        "step": "1. 認識字串 (String) 與數字 (Number) 型態",
        "description": "字串（String）用於表示純文字，必須使用雙引號 `\"\"` 或單引號 `''` 包裹，例如 `\"hello world\"`；數字（Number）則代表數值，可用於數學計算或 PLC 暫存器定址，不用加任何引號，例如 `42`。"
      },
      {
        "step": "2. 認識布林值 (Boolean) 邏輯型態",
        "description": "布林值（Boolean）僅有 `true` (真 / On / 1) 與 `false` (假 / Off / 0) 兩個邏輯值，在工業通訊中通常與 PLC 的數位 I/O（如 X0, Y0, M0）完全對應，用於觸發按鈕或開關邏輯。"
      },
      {
        "step": "3. 理解時間戳記 (Timestamp) 的含意與 Node-RED 應用",
        "description": "時間戳記代表自 1970 年 1 月 1 日午夜起累計至今的毫秒數。在 Node-RED 雙擊 Inject 節點，將 Payload 改為「時間戳記」並開啟「重複」發送，常被做為輪詢 PLC 狀態的心跳包 (Heartbeat) 或定時驅動訊號。"
      },
      {
        "step": "4. 認識 JSON 物件型態",
        "description": "JSON (JavaScript Object Notation) 是輕量級的資料結構，以花括號 `{}` 表示。在 Node-RED 的屬性面板中選取 JSON，可以使用結構化的 Key-Value pairs 對接複雜的多參數感測器數據。"
      }
    ],
    "references": [
      {
        "title": "MDN Web Docs - JavaScript 的基本型態與資料結構說明",
        "url": "https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Data_structures"
      },
      {
        "title": "Node-RED 官方 Docs - 認識變數通訊對象 msg.payload",
        "url": "https://nodered.org/docs/user-guide/messages"
      }
    ]
  },
  {
    "id": "sup-04",
    "supNumber": "04",
    "title": "JSON 語法結構與 key-value pairs 對應",
    "date": "2026-07-14",
    "category": "JSON 語法",
    "summary": "深入理解 JSON (JavaScript Object Notation) 資料交換格式 of 語法規則，並透過課程描述範例了解「鍵-值」對 (key-value pairs) 的結構設計與工業物聯網應用情境。",
    "image": "images_src/ok/20260714_json_supplement.jpg",
    "objective": "1. 學習並熟練 JSON 格式的標準語法規範（如雙引號強制要求、逗號分隔原則等）。\n2. 掌握鍵-值對 (key-value pairs) 的對稱關係，並具備手寫標準 JSON 的能力。\n3. 理解 JSON 作為工業物聯網（SCADA / MQTT）主流資料通訊架構的技術優勢。",
    "tutorialSteps": [
      {
        "step": "1. 理解 JSON 的定義與物件邊界",
        "description": "JSON 是基於 JavaScript 物件語法的純文字資料交換格式。它使用大括號 `{}` 來包裹一個物件（Object），大括號內包含了一組或多組以逗號分隔的鍵-值對。"
      },
      {
        "step": "2. 剖析「鍵-值對」 (key-value pairs) 的結構",
        "description": "每個鍵-值對是由「鍵 (Key)」與「值 (Value)」所組成，中間以英文冒號 `:` 分隔。例如 `\"地點\": \"OMRON\"`。鍵（Key）必須為雙引號包裹的字串；值（Value）可以是字串、數字、布林值、JSON 物件或陣列。"
      },
      {
        "step": "3. 學習逗號分隔語法與最常犯的格式錯誤",
        "description": "多組鍵值對之間必須使用英文半形逗號 `,` 進行分隔。在 JSON 物件的最後一組鍵值對結尾，**絕對不可以**加上任何逗號，否則會導致語法解析失敗 (Syntax Error)！"
      },
      {
        "step": "4. 以 JSON 描述實際工控課程範例",
        "description": "如簡報範例所示：`{ \"時間\": \"1/26\", \"地點\": \"OMRON\", \"課程\": \"工廠自動化網路架構應用\", \"內容\": \"Node-Red\" }`，這是一個标准的 JSON 物件，生動地將課程資訊以四組屬性呈現，格式清晰易讀。"
      }
    ],
    "references": [
      {
        "title": "JSON 官方規格繁體中文說明書",
        "url": "https://www.json.org/json-zh.html"
      },
      {
        "title": "w3schools - JSON 快速學習引導教程",
        "url": "https://www.w3schools.com/js/js_json_intro.asp"
      },
      {
        "title": "JSON 格式線上語法檢驗與美化工具 (JSONLint)",
        "url": "https://jsonlint.com/"
      }
    ]
  },
  {
    "id": "sup-05",
    "supNumber": "05",
    "title": "ISO 流程對應 Node-RED 概念",
    "date": "2026-08-09",
    "category": "ISO 流程與控制",
    "summary": "介紹 ISO 9001 與 ISO 45001 的過程方法與 I/O 流程概念，並透過 SMT 設備品質檢測與局限空間安全防護，詳細剖析其在 Node-RED 實體組件中的虛實整合對應。",
    "images": [
      "images_src/ok/ISO 流程對應 Node-RED 概念.png",
      "images_src/ok/ISO 流程對應 Node-RED 概念_02.png"
    ],
    "objective": "1. 理解 ISO 9001 (品質) 與 ISO 45001 (安全) 的過程方法 (Process Approach) 原理。\n2. 掌握 ISO 條款與 Node-RED 各類型節點 (I/O, Switch, Change, Function) 的映射對應關係。\n3. 學習在 Node-RED 中建立品質與安全雙軌整合的自動化控制與緊急應變流程。",
    "tutorialSteps": [
      {
        "step": "1. 認識 ISO 過程方法與 I/O 原理",
        "description": "理解品質/安衛系統的核心為輸入（Inputs，如客戶或現場感測數據）、過程活動與處置（Processes，如控制規則或SOP）、以及輸出（Outputs，如合格品或安全措施），並對應 Node-RED 節點流向。"
      },
      {
        "step": "2. 解析 ISO 9001 與 45001 在 8.1 的控制階層對照",
        "description": "ISO 9001 著重產品良率公差與首件檢查，而 ISO 45001 著重控制危害階層（工程/管理/PPE），在智慧工廠實務中，可將感測PLC訊號分流處理，品質異常歸檔，安衛超標則啟動緊急中斷。"
      },
      {
        "step": "3. 匯入與部署品質與安全範例 Flow",
        "description": "使用 Node-RED 選單 ☰ ➔ Import 功能，分別貼入講義中的 SMT 設備溫度檢測與局限空間氧氣安全監測之範例 JSON。匯入後，點擊右上角 Deploy (部署) 按鈕讓流程上線。"
      },
      {
        "step": "4. 模擬觸發並驗證自動化控制結果",
        "description": "點擊 Inject 輸入節點左側的按鈕發送模擬數據，觀察右側 Debug 面板の輸出。驗證當偵測值異常時（如 O2 濃度低於 19.5%），Change 節點能自動封裝緊急應變控制措施（如啟動風機與撤離通報）。"
      }
    ],
    "references": [
      {
        "title": "ISO 流程對應 Node-RED 概念講義手冊 (HTML 網頁)",
        "url": "補充/ISO 流程對應 Node-RED 概念/index.html"
      },
      {
        "title": "Node-RED 官方 Docs - 使用 Switch 進行流程判斷分流",
        "url": "https://nodered.org/docs/user-guide/nodes"
      }
    ]
  },
  {
    "id": "sup-06",
    "supNumber": "06",
    "title": "ISO 14064-1 與 ISO 14067 流程對應 Node-RED 概念",
    "date": "2026-08-11",
    "category": "ESG 碳盤查",
    "summary": "將 ISO 14064-1（組織級溫室氣體盤查）與 ISO 14067（產品碳足跡）的過程方法導入 Node-RED，利用工業物聯網技術將傳統靜態的碳盤查轉化為自動化、實時運算的動態碳數據流。",
    "image": "images_src/ok/iso14064_iso14067_flow_nodered.png",
    "objective": "1. 理解 ISO 14064-1（組織級溫室氣體）與 ISO 14067（產品碳足跡）的核心管理架構與 PDCA 循環。\n2. 掌握溫室氣體排放量計算公式：E = AD * EF * GWP（活動數據 * 排放係數 * 全球暖化潛勢）。\n3. 學習如何將 ISO 標準中的「輸入、處理、輸出」過程方法與 Node-RED 內實體節點的「採集、計算、控制」進行完美映射。",
    "tutorialSteps": [
      {
        "step": "1. 規劃階段 (Plan / 邊界與係數設定)",
        "description": "在進行碳盤查前，須先設定組織邊界與營運邊界，並鑑別排放範疇（Scope 1 直接排放、Scope 2 間接排放、Scope 3 其他間接排放），最後載入最新的排碳係數。在 Node-RED 中，這對應為全域變數 (Global Context) 的組態設定，將電力排碳係數與 GWP 值跨流程共享。"
      },
      {
        "step": "2. 實施階段 (Do / 數據採集 - 輸入層)",
        "description": "即時擷取能源與活動數據。在 Node-RED 中對應為「輸入層」，使用 Modbus TCP / OPC UA 讀取現場智慧電表與蒸汽流量計；或使用 HTTP Request / SQL 節點定期拉取 ERP 進貨紀錄，作為範疇三供應鏈原物料的活動數據 (Activity Data, AD)。"
      },
      {
        "step": "3. 實施階段 (Do / 碳排演算 - 處理層)",
        "description": "進行數據清淤、分類與碳排計算。在 Node-RED 中對應為「處理層」，使用 Filter 節點過濾電表讀值異常的跳點與空值，再透過 Switch 節點依據範疇分類分流數據，最後以 Function 節點撰寫運算邏輯，即時套用公式：E = AD * EF * GWP，將能耗與原料轉換為 CO2 排放當量。"
      },
      {
        "step": "4. 檢查與改善階段 (Check & Act / 數據驗證與卸載控制 - 輸出層)",
        "description": "進行碳排放監控與超標抑低。對比基準年數據檢驗碳強度，在 Node-RED 內設定碳排閾值；當即時碳排超標時，觸發「輸出層」發送 Line / Email 警報，並由 Webhook 將數據寫入 ESG / ECMS 碳管理平台；同時發送控制命令給 PLC，抑低用電或對高耗能設備進行調控卸載，實現 PDCA 改善閉環。"
      }
    ],
    "references": [
      {
        "title": "ISO 14064-1:2018 組織級溫室氣體排放國際標準規章",
        "url": "https://www.iso.org/standard/66453.html"
      },
      {
        "title": "ISO 14067:2018 產品碳足跡國際標準規章",
        "url": "https://www.iso.org/standard/71206.html"
      },
      {
        "title": "環境部國家溫室氣體登錄平台 - 排放係數庫查詢",
        "url": "https://ghgregistry.moenv.gov.tw/"
      }
    ]
  },
  {
    "id": "sup-07",
    "supNumber": "07",
    "title": "HTTP 通訊協定與 Node-RED 網頁爬蟲實作",
    "date": "2026-08-14",
    "category": "網路協定",
    "summary": "理解 HTTP (Hypertext Transfer Protocol) 通訊協定中的「請求 (Request)」與「回應 (Response)」機制，並學習如何在 Node-RED 中利用 HTTP Request 與 HTML 節點實作自動化網頁資料爬蟲。",
    "image": "images_src/ok/20260814_http_protocol_supplement.jpg",
    "objective": "1. 理解 HTTP 協定的運作邏輯（Client-Server 模型與 Request-Response 週期）。\n2. 掌握 HTTP GET 方法的用途與網址 URL 的構成。\n3. 學習在 Node-RED 中使用 http request 節點擷取網頁 HTML，並利用 html 節點（CSS Selector 選擇器）精確解析目標網頁的文字內容。",
    "tutorialSteps": [
      {
        "step": "1. 理解 HTTP Request & Response 運作機制",
        "description": "網頁瀏覽器或 Node-RED 作為客戶端 (Client)，發送包含目標 URL 的 HTTP GET Request 給網頁伺服器 (Web Server)；伺服器處理後，回傳包含 HTML 原始碼的 HTTP Response，完成單次的網頁存取週期。"
      },
      {
        "step": "2. 在 Node-RED 中建立 HTTP 請求流程",
        "description": "拖入一個 Inject (觸發) 節點作為起點，後方連接 http request 節點。雙擊 http request 節點，將 Method 設定為 GET，並在 URL 欄位輸入目標網址（例如：https://fchart.github.io/fchart.html），以讀取目標網頁資源。"
      },
      {
        "step": "3. 使用 HTML 節點與 CSS 選擇器解析資料",
        "description": "為了解析並擷取回傳的 HTML 內容，在 http request 後方串接一個 html 節點。在 html 節點的 Selector 欄位輸入目標網頁元素的 CSS 選擇器，例如 `span.cd__headline-text`，過濾出特定標籤的文字。"
      },
      {
        "step": "4. 部署並驗證網頁爬蟲執行結果",
        "description": "在 html 節點後方連接 debug 節點，點擊右上角的 Deploy (部署) 按鈕讓流程上線。點擊 Inject 節點左側按鈕觸發流程，在右側 Debug 面板中即可看到精確擷取到的 msg.payload 網頁文字資料。"
      }
    ],
    "references": [
      {
        "title": "MDN Web Docs - HTTP 通訊協定概念與運作原理",
        "url": "https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Overview"
      },
      {
        "title": "Node-RED 官方 Docs - 使用 HTTP Request 擷取外部 API 與網頁",
        "url": "https://nodered.org/docs/user-guide/writing-functions#interacting-with-apis"
      },
      {
        "title": "w3schools - CSS Selectors 選擇器語法說明",
        "url": "https://www.w3schools.com/cssref/css_selectors.php"
      }
    ]
  },
  {
    "id": "sup-08",
    "supNumber": "08",
    "title": "利用三口二位電磁閥比喻 if-else 關係",
    "date": "2026-08-28",
    "category": "機電整合與程式思維",
    "summary": "探討程式控制與氣動硬體的跨界對照。以三口二位常閉型電磁閥為例，對照 C# / JavaScript 中的 if-else 二元決策，用硬體閥芯吸合與彈簧復位的物理行為，生動解說代碼控制的本質。",
    "image": "images_src/ok/20260828_ifelse_flowchart.png",
    "objective": "1. 掌握三口二位常閉型電磁閥 (3/2-Way NC Valve) 的氣流管口與換向物理特性。\n2. 建立硬體吸合與彈簧復位，與程式 if 與 else 分支的邏輯映射對照。\n3. 培養跨領域思維，學會以硬體的物理防護與安全 default 特性來設計強健的軟體防錯。",
    "tutorialSteps": [
      {
        "step": "1. 開啟模擬器網頁",
        "description": "點選右下角延伸參考連結的「互動模擬網頁：三口二位電磁閥 if-else 宇宙」連結以開啟獨立的 HTML 動態模擬教學網頁。"
      },
      {
        "step": "2. 進行線圈開關控制",
        "description": "手動點選模擬器頂端的開關切換「線圈通電/斷電」狀態。觀察左側 SVG 氣壓缸伸出/縮回、P-A-R 氣流方向的改變，以及右側 C 語言程式碼 high-light 行的同步切換。"
      },
      {
        "step": "3. 深入理解工程映射",
        "description": "對照網頁底部的對照表，深入理解電磁閥的「二位性（兩個位置）」如何等價於代碼 if-else 的「互斥邏輯」；「機械彈簧」如何等價於程式防錯的「Default 兜底防護」；以及「弱電訊號控制強大做功」的物理映射。"
      }
    ],
    "references": [
      {
        "title": "互動模擬網頁：三口二位電磁閥 if-else 宇宙",
        "url": "valve_ifelse_metaphor.html"
      },
      {
        "title": "SMC 台灣官方網站 (氣動元件與作動原理)",
        "url": "https://www.smcworld.com/zh-tw/"
      }
    ]
  },
  {
    "id": "sup-09",
    "supNumber": "09",
    "title": "利用梭動閥與雙壓閥比喻 OR 和 AND 邏輯",
    "date": "2026-08-28",
    "category": "機電整合與程式思維",
    "summary": "以工業氣動控制中的梭動閥（Shuttle Valve）與雙壓閥（Dual-Pressure Valve）為例，生動對照程式設計中的 OR（或）與 AND（及）邏輯，配合物理壓差、氣流粒子與聲音特效，解說軟硬體邏輯的互通本質。",
    "image": "images_src/ok/20260828_logic_valves_title.png",
    "objective": "1. 掌握梭動閥 (OR 邏輯閥) 與雙壓閥 (AND 邏輯閥) 的 ISO 符號與物理作動原理。\n2. 建立雙手操作安全氣路 (AND) 與自動/手動切換氣路 (OR) 的硬體邏輯思維。\n3. 理解壓差控制下（PX > PY），梭動閥與雙壓閥在輸出壓力上的不同物理特徵（OR 取高壓，AND 取低壓）。",
    "tutorialSteps": [
      {
        "step": "1. 開啟模擬器網頁",
        "description": "點選右下角延伸參考連結的「互動模擬網頁：氣壓邏輯閥 (OR/AND) 模擬器」以開啟獨立的 HTML 動態模擬教學網頁。"
      },
      {
        "step": "2. 切換邏輯模式",
        "description": "在頂部切換「梭動閥 (OR)」與「雙壓閥 (AND)」模式。可手動點選開關切換 X 與 Y 的通氣狀態，或拖曳拉條設定不同的氣壓值 (bar)。"
      },
      {
        "step": "3. 驗證壓差與真值表",
        "description": "觀察左下角綠色高亮的「邏輯真值表」動態列。在雙側壓差不均等 (PX > PY) 時，驗證梭動閥 A 輸出高壓 (PX)、雙壓閥 A 輸出低壓 (PY) 的物理特徵，並點選右側「應用情境」按鈕快速載入典型工況。"
      }
    ],
    "references": [
      {
        "title": "互動模擬網頁：氣壓邏輯閥 (OR/AND) 模擬器",
        "url": "logic_valves_metaphor.html"
      },
      {
        "title": "SMC 台灣官方網站 (氣動元件與作動原理)",
        "url": "https://www.smcworld.com/zh-tw/"
      }
    ]
  },
  {
    "id": "sup-10",
    "supNumber": "10",
    "title": "利用 PLC 階梯圖模擬 if-else 關係",
    "date": "2026-08-28",
    "category": "機電整合與程式思維",
    "summary": "將高階程式語言中的 if-else 語法對照至工業自動化核心——PLC 階梯圖（Ladder Diagram）。以「偵測物料 ➔ 氣壓缸推出 ➔ 觸發端點 a1 ➔ 夾爪夾緊」為例，剖析常開（NO）與常閉（NC）接點與分支邏輯的互斥等價轉換。",
    "image": "images_src/ok/20260828_ladder_ifelse_title.png",
    "objective": "1. 掌握 PLC 階梯圖常開接點 (NO Contact) 與常閉接點 (NC Contact) 的邏輯運作特徵。\n2. 建立「物料偵測 ➔ 氣缸推出 ➔ 夾爪夾緊」的順序控制邏輯鏈條與軟硬體映射。\n3. 理解 PLC 掃描週期中同一變數不同接點的互斥性，如何實現 if-else 分支的等價轉換。",
    "tutorialSteps": [
      {
        "step": "1. 開啟模擬器網頁",
        "description": "點選右下角延伸參考連結的「互動模擬網頁：PLC 階梯圖 if-else 宇宙」以開啟獨立的 HTML 動態模擬教學網頁。"
      },
      {
        "step": "2. 進行行程控制",
        "description": "拖曳頂部的滑桿調節氣壓缸的伸出長度，或是點擊「啟動自動循環示範」按鈕，觀測撞塊壓下 a1 極限開關時，夾爪的手指自動夾緊或張開。"
      },
      {
        "step": "3. 觀測階梯圖與程式碼",
        "description": "當 a1 開關 ON 時，觀測 SVG 階梯圖上的 Rung1 (True 分支) 變為脈衝綠線導通，Rung2 (False 分支) 斷路；同時核對右下角 C 語言代碼對應的 if (a1 == 1) 區塊高亮反白。"
      }
    ],
    "references": [
      {
        "title": "互動模擬網頁：PLC 階梯圖 if-else 宇宙",
        "url": "ladder_ifelse_metaphor.html"
      },
      {
        "title": "SMC 台灣官方網站 (氣動元件與作動原理)",
        "url": "https://www.smcworld.com/zh-tw/"
      }
    ]
  }
];