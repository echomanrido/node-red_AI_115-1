from data_mindmap_svg import mindmap_svg
# -*- coding: utf-8 -*-
"""
大綱模式投影片資料定義 (Overview Slides)
包含麥肯錫金字塔 SCQA 故事框架、全域視野，以及第 2 頁的高解析度 SVG 互動心智圖
"""

overview_slides = [
    {
        "meta": "簡報導讀：全球軟體研發範式的根本轉折",
        "chapter_id": 1,
        "title": "The AI-Native SDLC Playbook 全球視野",
        "subtitle": "Anthropic 官方指導手冊：軟體工程全生命週期的 AI 原生化重構",
        "takeaway": "當寫程式碼的邊際成本趨近於零，企業必須重構圍繞代碼的六大階段流程，否則生產力將窒息於傳統官僚閘門中。",
        "details": [
            "<strong>生成式 AI 的真實代價</strong>：Claude Code 讓編碼速度提升數倍，但傳統 PRD 評估、會議排審與手工測試依然以『人類速度』運轉，導致嚴重塞車。",
            "<strong>六大階段完整重塑</strong>：涵蓋 Plan（意圖捕獲）、Design（規格工程）、Build（自動化建置）、Test（評測閉環）、Deploy（審批門禁）至 Maintain（自愈維運）。",
            "<strong>全自動閉環哲學</strong>：不再依賴跨部門的人工文件拋接，而是以版本控制中的 Committed Artifact 作為唯一的自動流轉與審計基石。"
        ],
        "metaphor": "這就像為一輛馬車換上了噴射引擎（Claude 代碼生成），但車輪（傳統審核會議）和煞車（手動部署門禁）依然是木製結構，整輛車勢必在高轉速下解體。",
        "layout": "麥肯錫經典三欄排版，左側展示 AI 提速現狀，中間凸顯兩端瓶頸衝突，右側揭櫫 AI-Native SDLC 閉環全景圖。"
    },
    {
        "meta": "全篇架構關係心智圖",
        "chapter_id": 1,
        "title": "全書 6 大階段與 18 核心機制網狀心智圖",
        "subtitle": "可拖曳與滾輪縮放的網狀心智圖 (懸停高亮連結線，點擊跳轉詳細說明)",
        "takeaway": "掌握 AI-Native SDLC 從意圖捕獲、規格約束、雙模構建、連續評測到生產監控的有機互聯網狀結構。",
        "details": [
            "本頁展示可任意縮放與平移的 SVG 網狀心智圖。滑鼠懸停於各節點可即時點亮上下游關聯技術線路。",
            "心智圖清晰呈現跨階段連鎖反應：例如 `bands.yaml` 監控異常自動觸發 Stage 1 的 `intent.md`，或 `Continuous Evals` 聯動 `CLAUDE.md` 規則更新。",
            "點擊任何模組節點，系統將自動為您切換至「詳細說明 (Step-by-Step)」分頁，並無縫定位至該技術章節！"
        ],
        "metaphor": "這就像一張「現代化全自動高鐵網絡圖」，每個站點（階段）有智慧號誌與道岔（Hooks/Evals），車輛（Artifacts）能根據路況自主調度行駛。",
        "layout": "全螢幕心智圖 SVG（白底高畫質），附帶左上角 Pan & Zoom 導航工具列與右下角節點說明面板。",
        "isMindmap": True, "is_mindmap": True, "svg_content": mindmap_svg
    },
    {
        "meta": "痛點剖析：代碼生成時代的「新瓶頸轉移」",
        "chapter_id": 1,
        "title": "Code is no longer the bottleneck",
        "subtitle": "為什麼程式碼寫得越快，軟體交付週期反而沒有等比例縮短？",
        "takeaway": "研發流程的瓶頸已經從『實現代碼』轉移到『左右兩端』：需求對齊 (Plan)、人工審查 (Review) 與發布測試 (Deploy)。",
        "details": [
            "<strong>左側與右側的新阻礙</strong>：當 Agent 能在幾分鐘內產出數千行高品質 Diff 時，人類主管每週一次的架構審查會議瞬間成為最嚴重的限流閥。",
            "<strong>傳統控制手段失靈</strong>：逐行人工 Code Review 是假設每一行都是人類編寫的；當產出量暴增 10 倍，審查隊列只會無上限堆積，迫使團隊在『拖延』或『放行未檢代碼』間危險抉擇。",
            "<strong>治理成本呈指數級攀升</strong>：合規例外情況依舊仰賴定期委員會討論，安全團隊規模無法按 AI 產出倍數擴編，組織流程徹底與技術現實脫節。"
        ],
        "metaphor": "就像一家餐廳引進了全自動機器人廚師，每分鐘能炒出 50 道菜（代碼生成），但點菜服務生（需求定義）和端菜服務生（審核部署）依然只有兩個人，餐廳大廳立刻被盤子堆爆癱瘓。",
        "layout": "漏斗對比圖：左側展示傳統 SDLC 編碼狹窄漏斗，右側展示 AI-Native 漏斗中 Build 擴大而前後端嚴重堵塞的對照。"
    },
    {
        "meta": "麥肯錫 SCQA 故事框架：傳統研發的衝突與救贖",
        "chapter_id": 2,
        "title": "情境 (S) - 衝突 (C) - 疑問 (Q) - 回答 (A)",
        "subtitle": "以諮詢教練視角，建立組織全員共識的變革故事敘事弧線",
        "takeaway": "唯有將線性人工交接徹底轉化為以 Committed Artifact 為核心的自主反饋迴圈，才能釋放十倍工程效能。",
        "details": [
            "<strong>情境 (Situation)</strong>：組織已廣泛引入 Claude 等先進 AI 工具，工程師個人編碼效率實現跨越式成長，寫代碼不再是一件苦差事。",
            "<strong>衝突 (Conflict)</strong>：團隊組織規範、合規稽核流程與審查門禁依然停留在瀑布式思維，流程摩擦抵消了工具紅利，甚至引發更嚴峻的安全焦慮。",
            "<strong>疑問 (Question)</strong>：如何建立一套既能享受 Agentic AI 極致速度，又能滿足受監管企業嚴苛安全、合規與可審計要求的全新研發體系？",
            "<strong>回答 (Answer)</strong>：構建 AI-Native SDLC：將控制目標編碼為軟約束 (Skills) 與硬門禁 (Hooks)，讓 Artifact 驅動階段流轉，並在生產環境實現自愈閉環。"
        ],
        "metaphor": "就像近代航海從依賴帆船水手手工拉繩（傳統 SDLC），升級為配置自動平衡舵與防禦雷達的現代化智慧貨輪（AI-Native SDLC）。",
        "layout": "麥肯錫經典四象限矩陣，按 S-C-Q-A 依序排列，疑問部分以亮紅色邊框加粗警示，解方部分以翠綠色標註落地成果。"
    },
    {
        "meta": "六大階段轉變矩陣：傳統 vs AI-Native",
        "chapter_id": 2,
        "title": "軟體生命週期六大階段的範式光譜",
        "subtitle": "Anthropic 官方核心對照：全面從『人工承擔』轉化為『人機協同閉環』",
        "takeaway": "人的專注力從『逐行操作』釋放，全面轉移至『門禁審批、邊界裁決與意圖定調』。",
        "details": [
            "<strong>Plan & Design</strong>：從漫長的 PRD 撰寫與會議吵架，轉向非技術口語詰問提煉 `intent.md`，並由 Skills 約束自動生成 `spec.md`。",
            "<strong>Build & Test</strong>：從逐行手寫代碼與事後 QA 追捕 Bug，轉為 Plan Mode 前置詰問推演、Auto Mode 自主執行，以及 Agent 自動自我修復迴圈。",
            "<strong>Deploy & Maintain</strong>：從深夜人工值班部署與被動接客訴，轉化為 `REVIEW.md` 多層 AI 審查、Hooks 具名審批門禁，以及 `bands.yaml` 指標異常自愈。"
        ],
        "metaphor": "就像從『傳統手工作坊工匠逐刀雕刻零件』，升級為『現代化工業 4.0 數位工廠』：工程師只需輸入設計圖與安全參數，產線自動切削組裝並即時質檢。",
        "layout": "6x2 對比矩陣表格，左側淺灰為傳統人工模式，右側藍綠高亮為 Claude 原生模式，底部標註跨階段核心 Artifact。"
    },
    {
        "meta": "唯一信任鏈：The Committed Artifact Chain",
        "chapter_id": 2,
        "title": "以版本控制產物作為組織的唯一記憶與審計鏈",
        "subtitle": "為什麼 .md 文件是人與 AI 溝通的最佳橋樑？",
        "takeaway": "每個階段都以寫入 Git 的 Artifact 為終點，並作為下個階段的觸發信號，形成不可篡改的法定合規憑據。",
        "details": [
            "<strong>共通語言媒介</strong>：Markdown 檔案（`intent.md`, `spec.md`, `plan.md`）既是人類非技術主管能夠輕鬆閱讀與審批的文本，也是 LLM 最擅長精確解析的語境。",
            "<strong>審計鏈即 Git History</strong>：誰在何時提出了什麼意圖、Agent 依據哪版規格規劃了哪些步驟、哪位工程師簽署放行，全數永久留存於 Git 提交鏈中。",
            "<strong>事件驅動的流水線觸發</strong>：合併 `intent.md` 自動觸發規格 pass；批准 `spec.md` 自動喚醒 Claude Code 生成計畫，杜絕無謂的手動催促與交接會議。"
        ],
        "metaphor": "這就像在精密製造業中的『隨車履歷卡』：零件每經過一個加工工位，機器和工長就蓋章簽收一次，任何瑕疵都能精準溯源至特定的參數與工序。",
        "layout": "箭頭式時間線：intent.md → spec.md → plan.md → diff & tests → review findings → incident bands，節點下方展示對應的簽核角色。"
    },
    {
        "meta": "雙層防禦體系：軟約束 (Skills) 與硬門禁 (Hooks)",
        "chapter_id": 8,
        "title": "企業落地的安全護城河：諮詢式引導與確定性攔截",
        "subtitle": "如何既給予 Agent 充分創造力，又確保 100% 不越雷池一步？",
        "takeaway": "用 Skills 提供最佳實務與業務情境引導（軟約束），用 Hooks 在本地底層提供不可逾越的確定性攔截（硬門禁）。",
        "details": [
            "<strong>軟約束 (Skills)</strong>：將企業安全手冊、API 標準與品牌原則寫為 `SKILL.md`。Agent 在遇到特定任務時主動載入，大幅降低犯錯與偏離常軌的機率。",
            "<strong>硬門禁 (Hooks)</strong>：屬於確定性的 Shell/Python 腳本。在 Agent 執行工具動作前（`PreToolUse`）毫秒級觸發，一旦碰觸未授權檔案或生產指令，立即以 exit 2 物理阻斷。",
            "<strong>合力效果</strong>：Skill 讓違規極其罕見，Hook 讓違規完全不可能。兩者結合構成了受監管金融與醫療企業敢於大規模擁抱 Agent 的核心基石。"
        ],
        "metaphor": "Skill 就像是高速公路上的『導航語音提示與交通規則告示牌』，而 Hook 則是道路兩側的『鋼製防撞護欄與收費站升降桿』，兩者缺一不可。",
        "layout": "雙層盾牌示意圖：外層為綠色半透明的 Skill 智慧濾網，內層為厚實深藍的 Hook 確定性鋼板，中間穿梭著 Agent 的操作指令。"
    },
    {
        "meta": "企業落地路線圖：從手動提示走向完全自主研發閉環",
        "chapter_id": 19,
        "title": "AI 原生化轉型的四階成熟度模型",
        "subtitle": "循序漸進解鎖價值飛輪，安全穩健邁向自動化軟體工廠",
        "takeaway": "先在個人端導入 Plan Mode 與 CLAUDE.md，逐步鋪設企業級 Hooks 與 Evals，最終實現生產監控閉環自愈。",
        "details": [
            "<strong>L1 輔助生成 (Prompt Assisted)</strong>：工程師在 IDE 中手動對話提問，依賴個人自律維護品質，收益局限於個人打字加速。",
            "<strong>L2 規格引領 (Spec-Driven)</strong>：引入 `intent.md` 與 `spec.md`，推動 Plan Mode 與 Auto Mode，建置期實現單次高質交付。",
            "<strong>L3 門禁防禦 (Gated Pipeline)</strong>：全面部署 `CLAUDE.md`, Skills, Hooks, Continuous Evals 與 PR Review Loop，建立堅固安全護欄。",
            "<strong>L4 自主閉環 (Autonomous Loop)</strong>：生產環境透過 `bands.yaml` 自動捕獲異常，自動回流至 Plan 階段提修復 PR，實現軟體自我進化。"
        ],
        "metaphor": "這就像人類自動駕駛的演進歷程：從 L1 定速巡航、L2 車道保持、L3 有條件自動駕駛，最終進化至真正無人值守的 L4 智慧調度計程車隊。",
        "layout": "四階階梯圖（從左下至右上），每階標註關鍵機制、所需工具與組織預期收穫的 ROI 倍率。"
    }
]

print("data_overview.py verified! Total overview slides:", len(overview_slides))
