# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 2, "chapter_name": "第 2 章：什麼是 AI 原生 SDLC？閉環迴圈哲學", "page_num": 1,
        "title": "AI 原生 SDLC 的核心定義與精神實質", "subtitle": "結合舊有的嚴謹控制目標，與全新的自動化強制執行機制",
        "takeaway": "AI 原生 SDLC 不是單純在現有流程中加入 AI 聊天機器人，而是圍繞 Agentic AI 能力徹底重構的自驅動閉環。",
        "details": [
            "<strong>舊目標，新執行 (Old objectives, new enforcement)</strong>：合規、審計、安全性與架構穩健性目標維持不變，但落實手段從人工開會轉為確定性自動化門禁。",
            "<strong>以 Agentic AI 為核心的重構</strong>：認知到模型具備推理、規劃、編碼與自我驗證能力，消除人機間無謂的摩擦環節。",
            "<strong>名稱多樣，本質統一</strong>：業界無論稱之為 Agentic SDLC、AI SDLC 或 Agentic Software Development，指向的皆為同一場研發架構革命。"
        ],
        "metaphor": "就像銀行從傳統的手工紙本記帳與定期查帳員訪查，轉變為全自動化的分散式即時清算系統，安全目標絲毫不減，但運轉效率提升萬倍。",
        "layout": "核心概念對比圖：中央為『堅守控制目標』的金色盾牌，左右兩翼分別為傳統人工執行與 AI 原生自動執行的強烈對照。"
    },
    {
        "chapter_id": 2, "chapter_name": "第 2 章：什麼是 AI 原生 SDLC？閉環迴圈哲學", "page_num": 2,
        "title": "從「線性瀑布拋接」徹底轉向「事件驅動閉環」", "subtitle": "打破孤島與手動摩擦，邁向自動銜接與連續流轉",
        "takeaway": "AI-Native SDLC 將孤立的線性階段重構為循環迴圈，每個階段的完成自動觸發下一個環節。",
        "details": [
            "<strong>告別手動催促與交接</strong>：傳統流程中，文件撰寫完畢需要手動寄信通知、等待對方排期；AI-Native 模式下，事件一旦觸發即刻啟動下游 Agent。",
            "<strong>反向自愈迴圈</strong>：流程不再是一條走到底的單行道，生產環境的異常告警能夠直接反向重啟 Stage 1 規劃，形成自動修復自愈環。",
            "<strong>零手動損耗的高速流動</strong>：各階段的銜接由清晰的事件與介面驅動，徹底消除跨部門等待與資訊在會議中的失真。"
        ],
        "metaphor": "這就像從傳統的手工接力賽跑（隊員可能在交接區發呆或掉棒），轉變成一組運轉精準的高速齒輪箱，前一個齒輪的旋轉必然精準帶動下一個齒輪旋轉。",
        "layout": "雙環示意圖：左側展示傳統線性瀑布斷點，右側展示 AI-Native 的雙向有機閉環，箭頭首尾相連。"
    },
    {
        "chapter_id": 2, "chapter_name": "第 2 章：什麼是 AI 原生 SDLC？閉環迴圈哲學", "page_num": 3,
        "title": "核心基石：Committed Artifact 作為唯一的組織信任鏈", "subtitle": "版本控制產物如何貫穿全生命週期，消除資訊偏差？",
        "takeaway": "每個階段都以向 Git 提交一個確定性的 Artifact 為終點，下個階段以讀取該 Artifact 為起點。",
        "details": [
            "<strong>唯一信任源 (Single Source of Truth)</strong>：不再依賴個人口頭承諾或 Jira 隨意備註，所有決策、規格、代碼與日誌全數持久化於版本控制庫中。",
            "<strong>產物的承先啟後鏈條</strong>：intent.md 啟動 spec.md 設計，spec.md 啟動 plan.md，批准的 plan.md 產出 Diff 與 Tests，PR 合併觸發管線發布。",
            "<strong>客觀中立的協同媒介</strong>：Markdown 檔案是人與 Agent 都能毫無歧義精準理解的結構化數據，消除人機間的解讀鴻溝。"
        ],
        "metaphor": "如同古代建造長城或金字塔時，每塊巨石都刻有採石場名、石匠印章與驗收官印記，所有產物環環相扣，共同構成堅不可摧的信任城牆。",
        "layout": "鏈條式架構圖：一個個代表 Artifact 的 Git 提交節點緊密相扣，展示前後階段的輸入輸出相依性。"
    },
    {
        "chapter_id": 2, "chapter_name": "第 2 章：什麼是 AI 原生 SDLC？閉環迴圈哲學", "page_num": 4,
        "title": "為什麼 Markdown 是人機協同的最佳媒介？", "subtitle": "簡潔、純文字、結構化與版本控制原生相容的黃金格式",
        "takeaway": "在 SDLC 早期階段，.md 檔案之所以佔據統治地位，是因為產品負責人與 Agent 能共同讀寫同一個檔案。",
        "details": [
            "<strong>人類極致可讀性</strong>：業務人員、產品經理不需要懂得複雜的 JSON Schema 或 AST 語法樹，直接使用乾淨的標題、列表與段落表達思維。",
            "<strong>LLM 天生友好的結構</strong>：Markdown 的階層標題（#、##）與前置元數據（YAML frontmatter）是現代大語言模型理解度最高的組織格式。",
            "<strong>Git 差異比對的原生優勢</strong>：純文字格式讓每一次修改都能產生清晰乾淨的 Git Diff，審批者能一眼洞悉修改細節，完全契合審計訴求。"
        ],
        "metaphor": "Markdown 就像是聯合國會議上的『世界通用語 (Esperanto)』，人類外交官和 AI 同聲傳譯員都能講得極其流暢，絕不產生語言隔閡與歧義。",
        "layout": "雙向箭頭圖：左側為人類 PO 編輯 Markdown，右側為 Claude 解析與生成 Markdown，中央為 Git 歷史記錄徽章。"
    },
    {
        "chapter_id": 2, "chapter_name": "第 2 章：什麼是 AI 原生 SDLC？閉環迴圈哲學", "page_num": 5,
        "title": "六大階段產物全景：從 intent.md 到 incident record", "subtitle": "貫穿整個研發週期的法定 Artifact 清單",
        "takeaway": "從 Build 階段以前是 .md 文檔，從 Build 階段以後是 Code、Tests 與自動化日誌，鏈條不可斷裂。",
        "details": [
            "<strong>Stage 1 (Plan) & Stage 2 (Design)</strong>：`intent.md`（原始意圖與邊界 proto-spec）→ `spec.md`（技術規格與爭議點，結合 Claude Design 原型）。",
            "<strong>Stage 3 (Build) & Stage 4 (Test)</strong>：`plan.md`（執行檔案清單、先後序與驗證證明）+ 代碼 Diff → 回歸測試套件（Tests）+ CI Continuous Evals 結果報告。",
            "<strong>Stage 5 (Deploy) & Stage 6 (Maintain)</strong>：帶有 `REVIEW.md` 審核結果的 PR + 具名發布審批標籤 → `bands.yaml` 監控記錄 + 事件診斷與修復 `intent.md`。"
        ],
        "metaphor": "這就像一顆種子經歷發芽（intent）、長出枝葉（spec）、開出花苞（plan/code）、結成果實（deploy），最終落葉歸根滋養泥土（maintain）的完整生命循環。",
        "layout": "6 階段矩陣清單，每階段展示產物名稱、檔案類型、主要責任人與下游觸發動作。"
    },
    {
        "chapter_id": 2, "chapter_name": "第 2 章：什麼是 AI 原生 SDLC？閉環迴圈哲學", "page_num": 6,
        "title": "人類角色的深刻轉型：從操作員到仲裁者", "subtitle": "人的注意力從『打字產出』轉移至『門禁審批與價值判斷』",
        "takeaway": "工程師不再需要為每一行括號或語法勞神費力，而是將寶貴的智力資源投入到架構邊界與關鍵放行裁決上。",
        "details": [
            "<strong>人類對所有需要判斷力的決策負全責</strong>：Agent 負責生成與推演，但最終承擔商業後果與倫理責任的永遠是具名的人類工程師。",
            "<strong>集中專注於門禁 (Concentrate at the Gates)</strong>：審閱 Agent 標註出的矛盾爭議（Flagged concerns），而非從零起草每一份文檔或代碼。",
            "<strong>從代碼匠人晉升為系統指揮官</strong>：工程師的職責轉型為制定規格、編寫 Skills 規則、配置 Hooks 防線，並調度多個 Agent 並行作戰。"
        ],
        "metaphor": "這就像從前需要親自下地揮舞鐮刀收割麥子的農夫，升級為駕駛配備 GPS 定位與自動收割脫粒的一體化現代農業旗艦機的農場總指揮。",
        "layout": "角色轉型天平圖：左側展示『手工編碼 80% + 思考 20%』的舊常態，右側展示『架構裁決 80% + 門禁把關 20%』的 AI-Native 狀態。"
    },
    {
        "chapter_id": 2, "chapter_name": "第 2 章：什麼是 AI 原生 SDLC？閉環迴圈哲學", "page_num": 7,
        "title": "審計鏈條與 Git History 的完美共生", "subtitle": "誰提需求、Agent 產出什麼、誰批准上線——完全留痕",
        "takeaway": "將研發活動的所有 Artifact 納入版本控制，直接天然滿足了最嚴苛金融與國防級別的法規審計要求。",
        "details": [
            "<strong>不可篡改的法定紀錄</strong>：每一次文件的演進都有具名的 Git Commit，包含作者、時間戳與精確差異，徹底消除責任推諉空間。",
            "<strong>誰提出了什麼需求</strong>：intent.md 記錄了原始業務提議者與業務動機；spec.md 記錄了產品主管對規格的修改與簽核。",
            "<strong>誰批准了代碼與發布</strong>：PR Review 執行記錄了 Agent 審核結果與 Code Owner 的具名批准，部署門禁記錄了 Release Manager 的授權憑證。"
        ],
        "metaphor": "這就像法律契約公證制度：每一次交易、條款修訂與簽字畫押都被刻在花崗岩石碑上，任何公證人與審計員都能在數秒內調出完整歷史檔案。",
        "layout": "Git Commit 視覺化樹狀圖，節點旁標註對應的業務事件與簽署人權限標籤。"
    },
    {
        "chapter_id": 2, "chapter_name": "第 2 章：什麼是 AI 原生 SDLC？閉環迴圈哲學", "page_num": 8,
        "title": "模組化落地路徑：無需一次到位，分步穩健實踐", "subtitle": "組織可根據自身痛點，優先選擇收益最高的模組切入",
        "takeaway": "Playbook 中的每個 Play 都是模組化設計的，團隊可以根據自身的瓶頸狀況靈活排序導入順序。",
        "details": [
            "<strong>瓶頸在編碼品質？</strong>：優先引入 Stage 3 的 Plan Mode 與 CLAUDE.md，立即規範 Agent 的行為習慣。",
            "<strong>瓶頸在代碼審查塞車？</strong>：優先在 Stage 5 導入 REVIEW.md 與 @claude 自動修復循環，立刻分流 70% 的低級審查負擔。",
            "<strong>瓶頸在安全與合規恐慌？</strong>：優先在 Stage 3/5 部署確定性的 PreToolUse Hooks 與生產發布門禁腳本，建立堅定信心。"
        ],
        "metaphor": "就像搭建樂高積木城堡，你可以先搭建防禦城牆（Hooks），也可以先拼裝起重吊車（Claude Code），每個模組都能獨立運作並持續發揮局部價值。",
        "layout": "三條自選起步路徑圖：速度導向路線、品質導向路線與安全合規導向路線的推進對照。"
    },
    {
        "chapter_id": 2, "chapter_name": "第 2 章：什麼是 AI 原生 SDLC？閉環迴圈哲學", "page_num": 9,
        "title": "前置相依圖 (Prerequisites) 與推進順序解析", "subtitle": "理解技術機制之間的階梯關係，少走彎路",
        "takeaway": "某些高階自動化機制的運轉，依賴於前置基礎規範的成熟鋪墊。",
        "details": [
            "<strong>Auto Mode 依賴健全的防護網</strong>：唯有當 CLAUDE.md、Skills、Hooks 與高覆蓋率測試準備就緒，才能放手讓 Agent 自主套用修改。",
            "<strong>Closing the Loop 依賴預演過的回滾與 Evals</strong>：生產自愈不能冒險，唯有在 Stage 4/5 驗證了自動測試與一鍵 Rollback 後才能在 Stage 6 放權。",
            "<strong>循序漸進的自動化階梯</strong>：先手動 Prompt 每一階段，待格式穩定後寫成 Slash Command，最後串聯成 CI/CD 觸發的自動管線。"
        ],
        "metaphor": "這就像學開飛機：必須先在模擬器中掌握儀表板操作（CLAUDE.md/Plan Mode），通過地面考核後（Hooks/Tests），才能獲准開啟高空自動巡航（Auto Mode）。",
        "layout": "DAG 有向無環圖：展示各技術機制之間的嚴格相依性與解鎖條件。"
    },
    {
        "chapter_id": 2, "chapter_name": "第 2 章：什麼是 AI 原生 SDLC？閉環迴圈哲學", "page_num": 10,
        "title": "自主閉環自愈：當生產異常反向重啟生命週期", "subtitle": "從監控指標偏離到自動拉起 intent.md 的自適應進化",
        "takeaway": "當系統在生產環境監測到異常，確定性腳本將直接產出診斷報告並提交 intent.md，自動重啟下一輪優化流程。",
        "details": [
            "<strong>確定性監控觸發</strong>：由非模型的數學統計腳本（如 Western Electric 規則）監測 CI 失敗率或 API 錯誤率，排除 AI 主觀幻覺。",
            "<strong>診斷意圖自動化生成</strong>：指標突破控制帶時，Agent 被唯讀喚醒，分析日誌並自動撰寫包含證據與建議的 intent.md。",
            "<strong>無人值守但透明留痕</strong>：這份自動產生的修復意圖匯入 Stage 1 意圖庫，由值班負責人裁決放行，隨後自動流經 Design、Build 與 Test。"
        ],
        "metaphor": "就像人體的免疫系統：一旦白血球探測到外來細菌入侵（指標異常），立即自動合成抗體並調動防禦細胞（觸發 intent.md 自愈），無需大腦主動下達指令。",
        "layout": "閉環銜接圖：展示 Stage 6 Maintain 的異常信號跨越時空直接注入 Stage 1 Plan 的循環脈絡。"
    },
    {
        "chapter_id": 2, "chapter_name": "第 2 章：什麼是 AI 原生 SDLC？閉環迴圈哲學", "page_num": 11,
        "title": "第二章實戰總結：以產物為中心的自治研發流水線", "subtitle": "確立全團隊對 AI-Native SDLC 的底層共識",
        "takeaway": "當所有階段都以標準化 Artifact 交互，並由確定性門禁保護時，軟體工程將迎來十倍效能的真正釋放。",
        "details": [
            "<strong>核心公式</strong>：AI 原生 SDLC = 嚴格控制目標 + 自動化強制執行 + Committed Artifact 信任鏈 + 事件閉環。",
            "<strong>文化變革</strong>：從『防範 AI 犯錯而處處設卡』轉變為『用系統架構為 AI 劃定安全邊界，放手讓其全速奔馳』。",
            "<strong>即刻啟程</strong>：下一章我們將深入 Stage 1: Plan，探索如何將最模糊的想法打磨為堅實的 intent.md！"
        ],
        "metaphor": "我們不再是守在河邊用小網打撈游魚的漁夫，而是建立了一座包含智慧濾網、分流渠道與自動增氧的現代化生態漁業基地。",
        "layout": "架構核心公式卡片，搭配指向 Stage 1 Plan 的引導指示。"
    }
]
print("Chapter 2 slides:", len(slides))
