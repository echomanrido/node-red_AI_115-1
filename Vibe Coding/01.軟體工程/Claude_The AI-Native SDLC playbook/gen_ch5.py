# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 5, "chapter_name": "第 5 章：Stage 3: Build — Plan Mode 默認啟動", "page_num": 1,
        "title": "為什麼 Plan Mode 必須是 Claude Code 的默認起點？", "subtitle": "拒絕盲目敲代碼：頂級工程師的第一動作永遠是架構思考",
        "takeaway": "未經縝密規劃的代碼生成無異於災難；Plan Mode 強迫 Agent 在敲下任何一行代碼前完成全局推演。",
        "details": [
            "<strong>生成式 AI 的致命誘惑</strong>：Agent 寫代碼太快，導致工程師容易沉溺於『直接讓它寫』的快感中，往往在寫了幾百行後才發現走入死胡同。",
            "<strong>思考先於編碼 (Think before you code)</strong>：真正的技術實力體現在架構分層、邊界判斷、潛在副作用評估與測試覆蓋方案。",
            "<strong>官方最佳實務起手式</strong>：在啟動 Claude Code 時，始終以 `plan mode` 開局，將 Stage 2 批准的 `spec.md` 餵入，展開深度推演。"
        ],
        "metaphor": "這就像專業的外科主刀大夫，在走進手術室拿起手術刀前，必須站在燈箱前仔細審查病人的 CT 斷層掃描片，規劃好進刀路徑與避開主動脈的備案。",
        "layout": "警告與正解對比圖：左側為直接編碼導致的混亂與重構死局，右側為 Plan Mode 引領下的清晰架構樹。"
    },
    {
        "chapter_id": 5, "chapter_name": "第 5 章：Stage 3: Build — Plan Mode 默認啟動", "page_num": 2,
        "title": "物理禁止修改檔案的強大安全防護", "subtitle": "Plan 模式下的沙盒鐵律：只能閱讀與思考，絕不改動硬碟",
        "takeaway": "Plan Mode 在機制底層剝奪了 Agent 編輯檔案的權限，工程師可毫無心理負擔地與其大膽探討最激進的方案。",
        "details": [
            "<strong>唯讀沙盒環境</strong>：在該模式下，Claude 具備文件讀取 (Read)、全庫搜尋 (Grep/Glob) 能力，但所有寫入操作 (Edit/Write) 全數被軟硬體鎖定。",
            "<strong>零污染試錯成本</strong>：你不用擔心 Agent 在探索過程中不小心覆蓋了關鍵配置、刪除了未提交的代碼或弄髒了本地 Git 工作區。",
            "<strong>構建工程師與 AI 的極致信任</strong>：工程師能完全放鬆警惕，專注於概念辯論與架構可行性評估，把注意力投向方案本質。"
        ],
        "metaphor": "如同走進核電站的『全真數位模擬控制台』，你可以嘗試把冷卻水閥門關閉或將反應爐功率推至極限，觀察儀表反應，而不會引發哪怕一微米的真實輻射洩漏。",
        "layout": "安全鎖定圖示：一把巨大的藍色鋼鎖鎖定在硬碟圖標上，上方顯示『唯讀推演中，實體檔案受 100% 絕對保護』。"
    },
    {
        "chapter_id": 5, "chapter_name": "第 5 章：Stage 3: Build — Plan Mode 默認啟動", "page_num": 3,
        "title": "互動式深度詰問：讓 Agent 面試工程師", "subtitle": "雙向質詢逼出潛在盲區與未考量的技術邊界",
        "takeaway": "優秀的 Plan Mode 不是單向輸出清單，而是主動針對架構模糊點對工程師進行嚴格詰問與反向面試。",
        "details": [
            "<strong>反向排查架構隱患</strong>：『如果後端 API 在高峰期返回 429 限流，前端 Panel 應該重試幾次？是否有備用快取機制？』",
            "<strong>挖掘未考量的依賴衝突</strong>：『升級此套件將導致舊版 Auth 模組棄用，我們是就地重構還是先做轉接器相容？』",
            "<strong>迭代打磨至水晶般透明</strong>：持續與 Claude 往返辯論，直到一個完全沒有參與過對話的新人工程師，僅看計畫就能獨立實作為止。"
        ],
        "metaphor": "就像一場頂級的博士論文答辯會，答辯委員會教授（Claude）用最刁鑽、最根本的技術問題反覆拷問答辯人（工程師），直到整個理論架構無懈可擊。",
        "layout": "雙向思維火花碰撞圖：工程師拋出初步想法，Claude 反問潛在漏洞，雙方共同迭代推導出最優方案。"
    },
    {
        "chapter_id": 5, "chapter_name": "第 5 章：Stage 3: Build — Plan Mode 默認啟動", "page_num": 4,
        "title": "破壞性推演：最壞情況可能破壞什麼？", "subtitle": "主動探討連鎖反應、高風險步驟與被放棄的備選方案",
        "takeaway": "主動向 Claude 提問：這項改動最可能搞垮什麼？哪個步驟最危險？你為什麼放棄了其他備選架構？",
        "details": [
            "<strong>連鎖破壞分析 (Blast Radius)</strong>：修改共用資料庫欄位或通用工具函式時，追蹤是否有其他十幾個無關微服務依賴它。",
            "<strong>高危步驟特別標註</strong>：標記出涉及資料庫 Migration、金流交易狀態改變或緩存一致性的高危險工序。",
            "<strong>記錄『放棄的替代方案』</strong>：記錄為什麼不採用 Redis 快取而選擇記憶體快取？這些被否決的思路是未來排查故障時最無價的背景知識。"
        ],
        "metaphor": "如同民航客機交付前進行的『極限風洞與斷翼測試』：工程師故意推演雙引擎同時失效、全機斷電的最慘烈狀態下，備用機械滑翔舵是否依然受控。",
        "layout": "破壞性排查清單：高危步驟紅燈標註、依賴受損範圍黃燈標註、被否決方案灰色歸檔對照。"
    },
    {
        "chapter_id": 5, "chapter_name": "第 5 章：Stage 3: Build — Plan Mode 默認啟動", "page_num": 5,
        "title": "plan.md 實戰標準骨架：四大支柱", "subtitle": "Anthropic 官方規範：變更檔案清單、先後順序、風險防範與驗證證明",
        "takeaway": "一份合格的 plan.md 必須清晰定義：變更檔案、施工順序、系統性風險，以及如何證明代碼正確（Proof）。",
        "details": [
            "<strong>Files that change（檔案清單）</strong>：列出所有即將新建、修改或刪除的具體檔案路徑，杜絕越權散彈式修改。",
            "<strong>Order of work（作業順序）</strong>：分步驟編排任務（例如：先加後端 API → 再寫前端 Panel → 最後掛接導航），層次分明。",
            "<strong>Risks（風險考量）</strong>：直擊效能瓶頸與外部依賴限制（如外部 API 限流 50 rps）。",
            "<strong>Proof（驗證證明）</strong>：明確定義何種測試通過、何種截圖匹配才能證明本計畫成功完成。"
        ],
        "metaphor": "這就是一張極其精確的『軍事作戰行動手冊』：作戰目標地圖（檔案）、推進波次序列表（步驟）、敵方雷區座標（風險）與插旗獲勝的判定標準（證明）。",
        "layout": "四大區塊結構展示圖，分別以藍、紫、黃、綠四色對應 Files、Order、Risks、Proof。"
    },
    {
        "chapter_id": 5, "chapter_name": "第 5 章：Stage 3: Build — Plan Mode 默認啟動", "page_num": 6,
        "title": "官方實戰範例分析：理賠查詢的完整 plan.md", "subtitle": "從 intent 2026-06-02 演進而來的實作架構規劃",
        "takeaway": "僅用不到 20 行的純文字，就將一個複雜跨端功能的實作步驟與防禦邏輯規範得清清楚楚。",
        "details": [
            "```markdown\n# Plan: claims status self-service (from intent.md 2026-06-02)\n\n## Files that change\nportal/src/claims/StatusPanel.tsx (new), claims-api/routes/status.py,\nclaims-api/tests/test_status.py\n\n## Order of work\n1. Add the status endpoint behind existing auth.\n2. Panel against the endpoint.\n3. Wire into the portal nav.\n\n## Risks\nThe claims-core API rate-limits at 50 rps; the panel must cache.\n\n## Proof\ntest_status.py covers the four claim states; screenshot matches the\napproved mock.\n```",
            "<strong>精確的邊界界定</strong>：明確限定在三個檔案內，任何其他檔案皆不可碰觸。",
            "<strong>驗證閉環定義</strong>：將『涵蓋四種理賠狀態的單元測試』與『截圖匹配 Stage 2 原型』作為驗收硬指標。"
        ],
        "metaphor": "宛如一張精簡無比的『阿波羅登月著陸清單』：每個動作只有一行，但每一步都經過了地面控制中心上萬次模擬驗算。",
        "layout": "代碼區塊完整呈現 plan.md 實例，旁邊附帶高亮圖章標註各段落的審查重點。"
    },
    {
        "chapter_id": 5, "chapter_name": "第 5 章：Stage 3: Build — Plan Mode 默認啟動", "page_num": 7,
        "title": "單次通過實作 (Single-pass Implementation) 的奇蹟", "subtitle": "為什麼磨刀不誤砍柴工？縝密計畫下的驚人編碼品質",
        "takeaway": "有了堅若磐石的 plan.md，當切換回執行模式放行 Claude 編碼時，通常能在『單次通行 (Single-pass)』下完美收官。",
        "details": [
            "<strong>告別反覆試錯修復的泥潭</strong>：傳統未經規劃的 AI 編碼往往陷入『寫了錯、錯了改、改了又引入新 Bug』的無限重試深淵，消耗大量 Token。",
            "<strong>順理成章的流水線組裝</strong>：因為檔案路徑、函式簽名、依賴關係與風險防護早已在 plan 中定義完畢，Agent 只需要專注將邏輯精確填入。",
            "<strong>工程師心智負擔最小化</strong>：代碼一氣呵成，終端編譯一次通過，單元測試全綠亮起，帶來前所未有的編程暢快感。"
        ],
        "metaphor": "如同世界上最頂級的精密手錶匠人：他在圖紙上已經將幾百個游絲與齒輪的咬合公差計算至微米級，實際組裝時，每一顆螺絲擰下去都分毫不差，發條一轉立刻精準走時。",
        "layout": "對比折線圖：展示無計畫模式下漫長震盪的修復循環 vs 有計畫模式下一條直線抵達 100% 綠燈的極速路徑。"
    },
    {
        "chapter_id": 5, "chapter_name": "第 5 章：Stage 3: Build — Plan Mode 默認啟動", "page_num": 8,
        "title": "計畫與實作脫節的應對：同步修正原則", "subtitle": "真實編碼遇到意外阻礙時，切記不可讓文檔淪為謊言",
        "takeaway": "當實際編碼被迫偏離原始計畫時，必須在同一個 Git Commit 中同步更新 plan.md，保持言行合一。",
        "details": [
            "<strong>現實工程的突發挑戰</strong>：寫代碼時可能突然發現某個內部庫缺少期待的匯出方法，被迫更換實現手段或額外修改第四個檔案。",
            "<strong>最可怕的技術債：文檔失真</strong>：如果代碼改了但 plan.md 依然保持原樣，後續審核者將無法判斷這究竟是深思熟慮的變更還是 Agent 暴走。",
            "<strong>同次提交原子性更新</strong>：將修改後的代碼與同步修訂的 plan.md 捆綁在同一個提交中，並註明偏離原因，維持審計鏈條的絕對真實。"
        ],
        "metaphor": "就像戰場指揮官根據突發暴雨臨時改變了部隊進軍路線，他必須立刻在作戰沙盤上記錄新的行軍路線，絕不能讓後方大本營繼續看著舊地圖瞎指揮。",
        "layout": "原子提交示意圖：一個 Git Commit 包裹著 code_diff + updated_plan.md，兩者不可分割。"
    },
    {
        "chapter_id": 5, "chapter_name": "第 5 章：Stage 3: Build — Plan Mode 默認啟動", "page_num": 9,
        "title": "使用 Hook 強制保持 plan.md 與 Diff 一致", "subtitle": "用代碼約束代碼：防止 Agent 偷摸修改未報備檔案",
        "takeaway": "透過本地 Git Hook 或 Claude Hook，在提交時自動比對修改檔案是否完全在 plan.md 申報清單之內。",
        "details": [
            "<strong>防範範圍蔓延 (Scope Creep)</strong>：AI Agent 有時會『過於熱心』，順手幫你重構旁邊的工具類或格式化無關檔案，引發潛在回歸風險。",
            "<strong>自動校驗腳本攔截</strong>：在 pre-commit 或 pre-push 階段運行檢查腳本，提取 git diff --name-only 與 plan.md 的清單交叉比對。",
            "<strong>越權即阻斷</strong>：一旦發現改動了 plan.md 未提及的檔案，腳本立即返回非零退出碼阻斷提交，強制要求更新計畫或回滾多餘改動。"
        ],
        "metaphor": "這就像機場行李托運處的雷射安全門：旅客申報托運了三件行李（plan.md），如果過檢時傳送帶上突然冒出了第四個未申報的包裹，警報立刻響起並停機排查。",
        "layout": "Hook 檢查邏輯流程圖：提取 Git Diff 檔案名 → 比對 plan.md 清單 → [吻合：放行 / 溢出：終止並提示更新計畫]。"
    },
    {
        "chapter_id": 5, "chapter_name": "第 5 章：Stage 3: Build — Plan Mode 默認啟動", "page_num": 10,
        "title": "治理考量：文檔階段架構審查的百倍效益", "subtitle": "在文字編輯器裡改航向，代價只是刪除幾行文字",
        "takeaway": "架構審查前移至 plan.md 批准前完成，例行變更由工程師簽核，重大風險由資深架構師把關。",
        "details": [
            "<strong>成本最小化的審查黃金期</strong>：修改一個方案在 plan 階段只需打字溝通 3 分鐘；一旦幾千行代碼成型，重構往往需要數天且伴隨牴觸情緒。",
            "<strong>合規與架構把關機制</strong>：plan.md 納入版本庫審計，清晰記錄是哪位工程師批准了這項實作方案。",
            "<strong>為 PR Review (Stage 5) 鋪路</strong>：後續的 AI 程式碼審查機器人，將直接讀取這份 plan.md，逐條核對最終的 Diff 是否誠實履約！"
        ],
        "metaphor": "就像在蓋摩天大樓時，發現地基設計不合理，在建築師的藍圖上用橡皮擦擦掉重畫只需兩秒鐘；但如果等鋼筋水泥已經澆灌到十層樓高才來改地基，損失將是天文數字。",
        "layout": "成本對比圖：Plan 階段修改成本 ($) vs 代碼階段修改成本 ($$$$) vs 生產環境修復成本 ($$$$$$$$) 的指數級對比。"
    },
    {
        "chapter_id": 5, "chapter_name": "第 5 章：Stage 3: Build — Plan Mode 默認啟動", "page_num": 11,
        "title": "第五章實戰總結：Plan Mode 賦予編碼戰略地圖", "subtitle": "Stage 3 Build 核心基石總結與前瞻",
        "takeaway": "始終以 Plan Mode 開局，透過破壞性詰問產出嚴謹的 plan.md，為後續的所有自動化建置鋪平道路。",
        "details": [
            "<strong>牢記三大金律</strong>：始終開局 Plan Mode、始終審問最壞風險、始終在同一 Commit 同步更新計畫。",
            "<strong>邁向更高階的自動化</strong>：有了堅固的 plan.md 和防護網，我們就能放心地在下一章解鎖『Auto Mode』與 Git Worktrees 多線並行！"
        ],
        "metaphor": "Plan Mode 就像是賦予了士兵一張高精度的衛星空照地圖與夜視鏡，讓原本在黑夜中盲目摸索前進的部隊，瞬間轉變為精確打擊的特種部隊。",
        "layout": "三條核心實踐卡片，底部搭配通往第六章 Auto Mode 的躍遷按鈕。"
    }
]
print("Chapter 5 slides:", len(slides))
