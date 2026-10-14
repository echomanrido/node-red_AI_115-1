# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 10, "chapter_name": "第 10 章：Stage 3: Build — 多代理人協作：Subagents 專職分工", "page_num": 1,
        "title": "一人驅動多條戰線：並行會話 (Parallel Sessions) 的魅力", "subtitle": "打破單線程瓶頸：一名工程師如何同時推進多個複雜專案？",
        "takeaway": "並行會話是指在各自獨立的 Git Worktree 中啟動多個完整的 Claude Code 實例，各任務互不干擾、同時並進。",
        "details": [
            "<strong>單線程等待的巨大浪費</strong>：傳統模式下，工程師開著一個終端等待 Agent 思考或運行測試，這段時間人的智力被迫閒置。",
            "<strong>任務間的物理隔離</strong>：不同任務在檔案系統層面完全分離，各自擁有獨立的分支與工作目錄，消除衝突。",
            "<strong>工程師的總體指揮權</strong>：各並行會話彼此完全不知曉對方的存在，唯一的紐帶就是身處中央調度室、掌握全局的工程師本人。"
        ],
        "metaphor": "就像一家大型建築工程公司的總指揮，同時指揮著 A 區的體育館鋼結構吊裝、B 區的五星級酒店內部裝潢與 C 區的地下管網鋪設，各工區互不干擾，總進度神速推進。",
        "layout": "星狀拓撲圖：中央為人類工程師指揮官，向外輻射連接三個並行的 Claude Code 終端進程。"
    },
    {
        "chapter_id": 10, "chapter_name": "第 10 章：Stage 3: Build — 多代理人協作：Subagents 專職分工", "page_num": 2,
        "title": "什麼是 Subagent？會話內部的專職特戰隊",
        "subtitle": "獨立上下文與工具白名單：解決特定重複性專業任務的利器",
        "takeaway": "Subagent 是在單一會話內部運行的輕量特化助手，擁有獨立的上下文窗口與工具限制，避免污染主會話記憶體。",
        "details": [
            "<strong>上下文保護 (Context Protection)</strong>：如果讓主 Agent 去做耗費幾萬 Token 的全文搜索或代碼簡化，主會話的注意力將迅速被無關日誌沖垮。",
            "<strong>工具最小權限原則 (Least Privilege)</strong>：例如只給予 Researcher 讀取權限（Read/Grep），剝奪其寫入權限，確保安全探索。",
            "<strong>專業化聚焦 (Specialization)</strong>：專人專事，例如 Verifier 專職負責環境啟動與行為驗收，Simplifier 專職精簡重構冗餘邏輯。"
        ],
        "metaphor": "如同主治外科醫生在手術台上，身邊隨時跟隨專職的麻醉師、器械護士與巡迴護士（Subagents）；主刀醫生不需要親自去清洗消毒鑷子，只需發出指令，助手精準完成後報告結果。",
        "layout": "雙層架構對照圖：展示主會話（Main Agent）如何派遣並管理多個具備獨立 Context 視窗的專職 Subagents。"
    },
    {
        "chapter_id": 10, "chapter_name": "第 10 章：Stage 3: Build — 多代理人協作：Subagents 專職分工", "page_num": 3,
        "title": "Parallel Sessions vs Subagents：本質維度對比",
        "subtitle": "Anthropic 官方核心架構：水平擴展 vs 垂直深耕",
        "takeaway": "Parallel Sessions 提升了一名工程師同時處理的『任務數量』；Subagents 則確保了單個任務內部的『極致專注與上下文純淨』。",
        "details": [
            "<strong>Parallel Sessions（並行會話）</strong>：橫向擴充。完全獨立的進程、獨立的 Git Worktree、處理完全不同的業務功能，由人協調。",
            "<strong>Subagents（子代理人）</strong>：縱向專業化。附屬於某個主會話、共享工作目錄、處理任務內部的特定子階段，由主 Agent 調度。",
            "<strong>二者合力的化學反應</strong>：工程師開啟三個並行會話，每個會話內部又按需調用 Subagents，構成強大的蜂巢式研發軍團！"
        ],
        "metaphor": "Parallel Sessions 就像是同時派出三艘獨立的深海科考船前往太平洋、大西洋與印度洋（多任務並行）；而每艘船上又配備了專職的潛水員、聲納員與標本採集員（Subagents）。",
        "layout": "2x2 矩陣圖：從進程隔離度、上下文邊界、調度發起者與核心目的四個維度全面對照二者。"
    },
    {
        "chapter_id": 10, "chapter_name": "第 10 章：Stage 3: Build — 多代理人協作：Subagents 專職分工", "page_num": 4,
        "title": "任務拆解的藝術：依檔案相依性劃分無衝突邊界",
        "subtitle": "並行作業的先決條件：利用 plan.md 識別解耦模組",
        "takeaway": "凡是觸及相同檔案的任務，必須在單一會話中循序執行；凡是操作不同模組且檔案無交集的任務，大膽並行開工！",
        "details": [
            "<strong>依據 plan.md 判定邊界</strong>：回顧 Stage 3 初期的 plan.md，精確比對各任務的 `Files that change` 清單。",
            "<strong>零衝突保證</strong>：任務 A 修改 `portal/src/claims/`，任務 B 修改 `api/payment/`，兩者毫無交集，是完美的並行候選者。",
            "<strong>及早發現潛在死鎖</strong>：如果兩個任務都需要重構同一個共用工具函式庫 `utils/auth.ts`，強制排期為先後依序推進，避免 Git Merge 地獄。"
        ],
        "metaphor": "這就像交響樂團排練：管樂部在主音樂廳練習，弦樂部在隔音排練室練習（無衝突並行）；但如果要合奏同一首協奏曲的高潮段落（共用代碼），大家必須在同一個大廳聽從同一個拍子。",
        "layout": "依賴分析文氏圖：展示兩個無交集的集合（並行）與一個有重疊交集的集合（序列推進）。"
    },
    {
        "chapter_id": 10, "chapter_name": "第 10 章：Stage 3: Build — 多代理人協作：Subagents 專職分工", "page_num": 5,
        "title": "Git Worktrees 實戰指南：零成本創建隔離工作區",
        "subtitle": "徹底淘汰傳統笨拙的 git checkout 分支切換手法",
        "takeaway": "一行指令建立全新目錄與分支，讓多個終端同時對不同代碼空間進行讀寫，互不踩腳。",
        "details": [
            "```bash\n# 終端 1：開闢認證功能獨立工作區\nclaude --worktree feature-auth\n\n# 終端 2：開闢修復限流問題獨立工作區\nclaude --worktree fix-rate-limit\n```",
            "<strong>共享底層對象庫，極致節省空間</strong>：Git Worktree 不需要像完整 git clone 那樣重複複製全部歷史記錄，瞬間完成目錄掛載。",
            "<strong>徹底杜絕編譯暫存污染</strong>：前端的 `node_modules` 與構建產物在各自目錄內獨立生成，再也不會發生分支切換導致熱更新崩潰。"
        ],
        "metaphor": "這就像在同一個中心圖書館旁，為兩位研究員各自搭建了一間獨立的隔音研究室，兩間房間共用圖書館的藏書底庫，但各自桌面上攤開的筆記稿紙互不影響。",
        "layout": "代碼終端視窗對比：展示終端 1 與終端 2 在不同工作目錄下的命令調用與乾淨隔離狀態。"
    },
    {
        "chapter_id": 10, "chapter_name": "第 10 章：Stage 3: Build — 多代理人協作：Subagents 專職分工", "page_num": 6,
        "title": "控制並行會話的極限：人類專注力才是真正上限",
        "subtitle": "不要貪多嚼不爛：兩到三個會話是黃金平衡點",
        "takeaway": "技術上你可以同時啟動二十個 Claude Code，但實務上的天花板取決於你能高品質審查多少條產出流。",
        "details": [
            "<strong>審查超載與防禦崩潰</strong>：如果同時開啟 10 個任務，工程師將再次陷入認知癱瘓，無法仔細驗收任何一個產物，本末倒置。",
            "<strong>2~3 個會話的黃金律動</strong>：當 Session 1 在跑編譯與測試時，審查 Session 2 的計畫，並在 Session 3 與產品經理確認邊界，節奏行雲流水。",
            "<strong>只有當審查跟得上時才加任務</strong>：守住審查品質底線，絕不盲目追求終端機窗口的數量虛榮。"
        ],
        "metaphor": "如同特技雜耍雜技演員同時在空中拋接彩球：經驗豐富的演員接拋三個球可以維持一小時不落地且姿態優雅；但如果硬塞給他十個球，幾秒鐘後所有球都會劈啪掉在地上砸碎。",
        "layout": "專注力曲線圖：展示並行會話從 1 個提升至 3 個時產能直線飆升，超過 4 個後因審查疲勞導致品質急墜。"
    },
    {
        "chapter_id": 10, "chapter_name": "第 10 章：Stage 3: Build — 多代理人協作：Subagents 專職分工", "page_num": 7,
        "title": "Subagent 定義規範：以 .claude/agents/ 為家",
        "subtitle": "用聲明式 Markdown 定義專屬子特工的角色與工具白名單",
        "takeaway": "每個 Subagent 都是存放在 `.claude/agents/<name>.md` 的獨立文件，由全團隊透過 Git 共同分享與維護。",
        "details": [
            "<strong>標準存放目錄</strong>：倉庫根目錄的 `.claude/agents/`，團隊成員隨時可共享已驗證的特工設定。",
            "<strong>YAML 前置參數</strong>：定義特工名稱 (name)、適用時機描述 (description) 與允許調用的工具清單 (tools)。",
            "<strong>正文角色提示詞 (System Prompt)</strong>：給出清晰的行為準則、禁止動作與輸出格式規範。"
        ],
        "metaphor": "這就像特警部隊的『特種戰術崗位說明書』：明確定義狙擊手（狙擊槍、夜視鏡、禁止近戰衝鋒）與防暴手（防彈盾牌、催淚彈、禁止擅自開火）的裝備與作戰手則。",
        "layout": "檔案結構剖析圖：展示 `.claude/agents/` 目錄下的多個 `.md` 特工定義卡片。"
    },
    {
        "chapter_id": 10, "chapter_name": "第 10 章：Stage 3: Build — 多代理人協作：Subagents 專職分工", "page_num": 8,
        "title": "官方實戰特工拆解：verifier.md 驗證員",
        "subtitle": "Anthropic 原生定義：獨立於編碼上下文的客觀質檢官",
        "takeaway": "Verifier 擁有完全乾淨的上下文窗口，不受主 Agent 編碼時的主觀偏見影響，客觀啟動應用並檢驗行為。",
        "details": [
            "```markdown\n---\nname: verifier\ndescription: Runs the app and checks the change works before the session\n  reports done\ntools: Bash, Read\n---\nStart the app with make run. Exercise the changed behavior and the two\nnearest neighboring flows. Report what you ran, what you saw, and any\nbehavior that does not match plan.md. Do not fix anything; report only.\n```",
            "<strong>乾淨視野 (Fresh Context)</strong>：沒有任何編碼時的思維定勢與藉口，純粹以黑盒角度運行程式並對照 plan.md 驗收。",
            "<strong>職責隔離：只報告、不修復</strong>：『Do not fix anything; report only』防止質檢員自作主張越權修補，維持客觀中立。"
        ],
        "metaphor": "就像汽車製造廠裡專門的『出廠質檢員』：他沒有參與發動機的打磨與組裝，他拿著質檢單坐進駕駛座發動引擎、猛踩煞車、測試空調，任何不符合指標的瑕疵直接貼上紅標駁回。",
        "layout": "代碼高亮完整呈現 verifier.md 全文，重點註解『tools 白名單』與『只報告不修復』核心條款。"
    },
    {
        "chapter_id": 10, "chapter_name": "第 10 章：Stage 3: Build — 多代理人協作：Subagents 專職分工", "page_num": 9,
        "title": "經典特工軍團：Simplifier 與 Researcher",
        "subtitle": "專職化特工生態：為特定高頻工作流打造專屬助手",
        "takeaway": "除了 Verifier，團隊中最受歡迎的兩大專職特工分別為：代碼瘦身專家 (Simplifier) 與情報偵察兵 (Researcher)。",
        "details": [
            "<strong>Code Simplifier（代碼精簡員）</strong>：在主 Agent 完成功能後介入，專職掃除冗餘代碼、內聯無謂的單次抽象、去除過度設計，讓 Diff 極致優雅。",
            "<strong>Codebase Researcher（代碼庫偵察員）</strong>：配備 Read/Grep 工具，深入未知大型代碼庫搜集函式調用鏈與型別定義，輸出簡要報告而絕不污染主會話。",
            "<strong>特工組合拳</strong>：主 Agent 規劃編碼 → Simplifier 瘦身整理 → Verifier 啟動驗證，流水線一氣呵成。"
        ],
        "metaphor": "就像電影劇組裡的各司其職：導演（主 Agent）負責說戲指導拍攝，燈光攝影（Researcher）負責布光取景，剪輯師（Simplifier）負責咔嚓剪掉贅餘鏡頭，質檢放映員（Verifier）負責檢查拷貝色彩音軌。",
        "layout": "特工協同工作流卡片：展示 Researcher → Main Agent → Simplifier → Verifier 依序銜接的精確節奏。"
    },
    {
        "chapter_id": 10, "chapter_name": "第 10 章：Stage 3: Build — 多代理人協作：Subagents 專職分工", "page_num": 10,
        "title": "並行治理與合規：更多會話意味著更嚴格的倉庫配置",
        "subtitle": "多線推進下的權限歸屬與審計歸因",
        "takeaway": "會話數量增加導致代碼產出暴增，所有會話必須強制繼承倉庫根目錄的 Hooks 與 Managed Settings，所有行為歸因至啟動工程師。",
        "details": [
            "<strong>防禦配置的全局穿透</strong>：無論開啟多少個並行會話或派遣多少個子代理，根目錄的 PreToolUse Hooks 毫無例外地對所有終端生效。",
            "<strong>不可抵賴的身分歸因</strong>：每個會話產生的 Git Commit 與操作日誌，全數綁定啟動該終端的工程師帳號，確保權責清晰。",
            "<strong>資源與費用熔斷</strong>：企業可集中設定每位工程師的同時在線會話上限與 API 費用配額，防止背景無效空轉消耗資金。"
        ],
        "metaphor": "這就像軍隊指揮系統：無論派遣多少個獨立特戰小隊深入敵後作戰，每位隊員的無線電通訊都受到中央指揮部的加密監聽，每顆發射的子彈都登記在該分隊指揮官名下。",
        "layout": "中央控制台視圖：展示企業管理員統一監控多個並行會話的活躍狀態、資源佔用與安全合規日誌。"
    },
    {
        "chapter_id": 10, "chapter_name": "第 10 章：Stage 3: Build — 多代理人協作：Subagents 專職分工", "page_num": 11,
        "title": "第十章實戰總結：邁向集群協同的工程大格局",
        "subtitle": "Stage 3 Build 建置全階段圓滿收官與下章預告",
        "takeaway": "我們完成了從 Plan Mode、Auto Mode、CLAUDE.md、Skills、Hooks 到集群並行的全面佈局，正式敲開 Stage 4 Test 的大門！",
        "details": [
            "<strong>建置階段核心全景</strong>：思考先於編碼 (Plan) → 安全自主加速 (Auto) → 開機大腦智慧 (CLAUDE.md) → 機構規範 (Skills) → 確定性防禦 (Hooks) → 集群並行 (Subagents)。",
            "<strong>代碼已經寫好，如何證明它正確？</strong>：沒有經過嚴密自檢的代碼不能交付，第十一章我們將解鎖 Stage 4 的『Feedback Loops 驗證反饋循環』！"
        ],
        "metaphor": "我們已經建立了一支紀律嚴明、武裝到牙齒且配備高科技協同通訊的現代化工程兵團；現在，我們將把這支部隊開赴最殘酷的實戰檢驗場——自動化驗證與評測！",
        "layout": "Stage 3 全六大核心機制徽章總覽，正中央指向 Stage 4 Test 的明亮大門。"
    }
]
print("Chapter 10 slides:", len(slides))
