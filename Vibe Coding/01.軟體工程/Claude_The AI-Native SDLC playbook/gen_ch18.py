# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 18, "chapter_name": "第 18 章：Stage 6: Maintain — 線上值班與即時除錯：Claude on Call", "page_num": 1,
        "title": "線上事故與值班工程師的深夜困境：平均修復時間 (MTTR) 的瓶頸",
        "subtitle": "為什麼凌晨兩點的線上 P0 事故，總是讓工程師手忙腳亂、身心俱疲？",
        "takeaway": "線上排錯最耗時的不是改那行代碼，而是在上萬行日誌、雜亂監控圖表與無數 Git Commit 中定位根本原因的巨大認知摩擦！",
        "details": [
            "<strong>海量警報帶來的資訊過載 (Alert Fatigue)</strong>：當線上服務雪崩時，Slack 警報頻道瞬間被數百條告警洗版，值班人員極難抓出源頭特徵。",
            "<strong>上下文斷層與歷史盲區</strong>：凌晨被 PagerDuty 叫醒的工程師，往往對白天同事剛合併的邊界邏輯變更一無所知，缺乏全域感知。",
            "<strong>高壓之下的手忙腳亂</strong>：在客戶停擺、高層盯場的極限壓力下，手動執行日誌搜尋與資料庫排查極易引發人為二次失誤，拉長 MTTR。"
        ],
        "metaphor": "這就像凌晨發生的大樓火警：警報器響成一片，濃煙遮蔽了視線（海量日誌過載），剛剛被警鈴驚醒的消防隊員根本不知道哪個房間堆放了易燃物（上下文丟失），必須摸黑在一千個房間裡翻找火源起點。",
        "layout": "事故現場壓力對比圖：上方展示深夜警報狂轟與工程師焦慮尋找 Log 的高壓時鐘，下方展示傳統診斷流程在各環節造成的 MTTR 延誤。"
    },
    {
        "chapter_id": 18, "chapter_name": "第 18 章：Stage 6: Maintain — 線上值班與即時除錯：Claude on Call", "page_num": 2,
        "title": "什麼是 Claude Tag？在協同通訊中一鍵召喚 AI 應急專家",
        "subtitle": "將 Claude 深度接入 Slack、Discord 或 PagerDuty，如同呼叫常駐線上救火隊員",
        "takeaway": "工程師只需在事故頻道中 `@Claude`，Agent 即刻在通訊串中以專案全域上下文接管事故調查，秒級生成事故特徵與修復建言。",
        "details": [
            "<strong>零切換的通訊端原生調度</strong>：無需登入獨立管理後台，在團隊所有人共同關注的 Slack 應急頻道中直接對話，全體成員資訊同頻透明。",
            "<strong>全自動上下文匯流 (Context Aggregation)</strong>：收到呼叫時，Claude 自動讀取該討論串的所有前後對話、錯誤截圖與工程師先前的推測論述。",
            "<strong>以同僚身分加入作戰</strong>：不再是呆板的關鍵字 Bot，而是能夠理解自然語言提問、主動提出假設並進行驗證的多模態智能應急專家。"
        ],
        "metaphor": "就像在火警現場的對講機頻道裡，直接呼叫總部的金牌資深結構工程師：他雖然不在火場，但能同步調閱大樓三維管線圖與所有感應器數據，在對講機裡精準指引火源位置與安全撤離路線。",
        "layout": "Slack 聊天介面示意圖：展示值班工程師在 `@incident-checkout` 頻道標註 `@Claude`，Claude 立即在線回覆事故摘要與關聯日誌連結。"
    },
    {
        "chapter_id": 18, "chapter_name": "第 18 章：Stage 6: Maintain — 線上值班與即時除錯：Claude on Call", "page_num": 3,
        "title": "第一現場數據匯流：整合 Sentry、Datadog 與雲端日誌",
        "subtitle": "利用 MCP 連接器無縫拉取線上監控數據，打破觀測性孤島",
        "takeaway": "透過 MCP 賦能，Claude 能直接調用 Datadog API 抓取錯誤尖峰、從 Sentry 提取 Stacktrace，並檢索 CloudWatch/Loki 日誌！",
        "details": [
            "<strong>打破資料孤島 (Breaking Data Silos)</strong>：傳統排查要在 4 個不同的瀏覽器標籤頁來回切換複製查詢語法，Claude 一次調用即可並行整合所有指標。",
            "<strong>錯誤堆疊特徵深度解析</strong>：Claude 自動解析混淆（De-minify）後的崩潰堆疊，精確對齊至 Git 代碼庫的具體提交（Commit SHA）與程式碼行號。",
            "<strong>日誌時序交叉比對</strong>：將應用層日誌、資料庫慢查詢記錄與反向代理（Nginx/Envoy）的 HTTP 5xx 突增曲線進行時序關聯對齊。"
        ],
        "metaphor": "這就像急診室主任醫師手邊的智慧監控儀表：不必奔走於心電圖室、驗血科與放射科之間，病人的血氧飽和度、腦部斷層掃描與用藥歷史瞬間在一張整合儀表板上並列呈現。",
        "layout": "監控匯流架構圖：左側 Sentry/Datadog/CloudWatch 透過 MCP Tools 將遙測數據即時推送至中央 Claude 事故分析大腦，右側呈現多維診斷特徵。"
    },
    {
        "chapter_id": 18, "chapter_name": "第 18 章：Stage 6: Maintain — 線上值班與即時除錯：Claude on Call", "page_num": 4,
        "title": "智慧根本原因分析 (RCA)：關聯代碼變更與異常模式",
        "subtitle": "從海量雜訊中辨識訊號：為什麼這個 Bug 恰好在此時此刻爆發？",
        "takeaway": "事故發生前 2 小時合併的 PR 往往是罪魁禍首；Claude 主動關聯 Git 歷史與異常 Log，精準推導事故因果鏈！",
        "details": [
            "<strong>Git Blame 與變更時間軸比對</strong>：自動抓取最近發佈的版本差異（Git Diff），特別檢驗修改了共用配置、DB 索引或併發鎖機制的提交。",
            "<strong>邊界情境推理與因果鏈推導</strong>：推導事故場景：『當高並發請求湧入時，該 PR 引入的局部快取未設置 TTL，導致 Redis 連接池耗盡引發雪崩』。",
            "<strong>排除假警報與下游次生危害</strong>：過濾掉因為上游資料庫連線超時而引發的下游十幾個微服務的連鎖假報警，直搗真正的初級爆發源頭。"
        ],
        "metaphor": "如同名偵探柯南在命案現場勘查：他不僅僅盯著死者身上的傷口（報錯日誌），而是翻看訪客出入登記簿（Git 提交記錄），迅速推斷出半小時前進入宅邸的神秘維修工才是這起投毒案的真正兇手。",
        "layout": "因果推導流程鏈：從線上報錯異常尖峰 -> 檢索 2 小時內 Commit 歷史 -> 語義比對差異邏輯 -> 輸出精確的事故因果鏈分析報告。"
    },
    {
        "chapter_id": 18, "chapter_name": "第 18 章：Stage 6: Maintain — 線上值班與即時除錯：Claude on Call", "page_num": 5,
        "title": "自動生成緊急修復補丁 (Hotfix Patch)：從定位到代碼生成",
        "subtitle": "分秒必爭的線上救火：由 Agent 即刻提供最小侵入性（Minimal Invasive）的補丁方案",
        "takeaway": "緊急熱修復切忌大刀闊斧重構！Claude 專注於生成安全防禦護欄、降級開關或邊界防禦補丁，第一時間阻斷故障擴散。",
        "details": [
            "<strong>最小變更原則 (Principle of Minimal Changes)</strong>：在緊急補丁中僅修改 3~5 行關鍵代碼，避免在線上高壓情境中引入未知的次生 Bug。",
            "<strong>動態特徵防禦 (Circuit Breaker)</strong>：自動注入短路保護機制或條件過濾器，在不重啟整組服務的前提下先隔離惡意/畸形請求流量。",
            "<strong>生成配對的單元復現用例</strong>：自動編寫能直接復現線上崩潰情境的測試腳本，確保補丁應用後該特定邊界情況絕對能被覆蓋並通過驗證。",
        ],
        "metaphor": "這就像輪船船體在高海況下被暗礁撞出裂縫：損管隊員現在最需要的是快乾止水水泥與加固鋼板（最小緊急修復），而不是試圖在驚濤駭浪中重新改造整艘船的龍骨架構。",
        "layout": "代碼 Diff 對比圖：展示左側崩潰空指針問題代碼，與右側 Claude 生成的最小化防禦補丁（包含非空檢查與平滑降級預設值）。"
    },
    {
        "chapter_id": 18, "chapter_name": "第 18 章：Stage 6: Maintain — 線上值班與即時除錯：Claude on Call", "page_num": 6,
        "title": "隔離沙盒預演 (Isolated Staging Sandbox)：不碰生產環境驗證",
        "subtitle": "為什麼不能直接把 AI 產生的 Hotfix 盲目推上生產環境？",
        "takeaway": "將補丁自動注入臨時雲端容器（如 Modal/Docker 沙盒），重現真實故障流量進行壓測驗證，確認無誤後才允許進入發佈流程！",
        "details": [
            "<strong>嚴格禁止無驗證直推 (No Blind Push)</strong>：即使模型置信度高達 99%，也必須通過標準自動化編譯、單元測試與集成測試管線。",
            "<strong>短暫沙盒環境秒級拉起</strong>：調用雲端 API 即時啟動鏡像容器，將有問題的代碼打上 Hotfix Patch，回放線上崩潰時的畸形請求 Payload。",
            "<strong>驗證修復有效性與性能耗損</strong>：確認崩潰不再復現，且 CPU 與記憶體佔用保持平穩，完全消除『修復補丁引發更大災難』的恐懼。"
        ],
        "metaphor": "就像在給瀕危病人注射未經大規模試驗的特效解毒劑之前，醫生先在離體細胞樣本（隔離沙盒）中滴入藥液：親眼觀察到毒素被中和且細胞未發生破裂後，才放心推入病人的靜脈血管。",
        "layout": "沙盒驗證架構圖：Hotfix 代碼分支與線上脫敏 Payload 同步灌入獨立 Ephemeral Docker 沙盒，綠色 Checkmark 點亮後才解鎖 PR 合併按鈕。"
    },
    {
        "chapter_id": 18, "chapter_name": "第 18 章：Stage 6: Maintain — 線上值班與即時除錯：Claude on Call", "page_num": 7,
        "title": "人機協同決策模型：工程師始終掌控最後一公里授權 (Human Gatekeeper)",
        "subtitle": "在極端事故響應中，AI 是超級參謀，值班工程師是最高指揮官",
        "takeaway": "Claude 負責偵察、歸納、假設與提案；人類工程師負責業務權衡、風險評估與最後那一次點擊發佈的授權！",
        "details": [
            "<strong>明確劃分決策邊界</strong>：AI 永遠不擁有直接向生產環境執行 `git push --force` 或修改生產資料庫 schema 的權限。",
            "<strong>給出多重應對選項 (Option Matrix)</strong>：提供方案 A（立即回滾代碼，影響 5 分鐘可用性）與方案 B（應用熱補丁，需重啟特定 Pod）並標註風險權重。",
            "<strong>一鍵審批與審計日誌</strong>：工程師在 Slack 頻道點擊『批准發佈 Hotfix』按鈕，後台自動記錄操作授權者的電子簽名與時間戳記。"
        ],
        "metaphor": "這如同現代戰鬥機的雙座作戰配置：AI 是後座的武器雷達導航官，負責雷達掃描、威脅判定與鎖定目標；坐在前座的人類飛行員始終握有握把上的開火扳機，任何飛彈發射都必須由人類確認按下。",
        "layout": "決策矩陣圖：左側列出 Claude 提供的診斷日誌與補丁對比，右側為人類指揮官審核面板（包含回滾 vs 熱修復按鈕與一鍵審批授權）。"
    },
    {
        "chapter_id": 18, "chapter_name": "第 18 章：Stage 6: Maintain — 線上值班與即時除錯：Claude on Call", "page_num": 8,
        "title": "安全護欄與權限最小化：維護環境中的防越權防禦",
        "subtitle": "如何防止 Agent 在除錯時意外洩露敏感資料或誤刪生產資源？",
        "takeaway": "嚴格實施唯讀授權 (Read-Only)、日誌資料脫敏 (Data Masking) 以及對高危破壞性指令的硬性阻斷！",
        "details": [
            "<strong>嚴格的唯讀 API 連接</strong>：MCP 授予 Claude 的日誌與監控工具僅具備查詢權限，絕不開放寫入、刪除或資料庫 DROP/TRUNCATE 介面。",
            "<strong>PII 與密鑰自動脫敏過濾</strong>：在日誌文本傳入模型上下文之前，本機代理層先以正則自動遮蔽信用卡號、JWT Token 與密碼欄位。",
            "<strong>會話記憶體隔離防洩露</strong>：每次事故調查創建獨立的臨時上下文 Session，事故結案後自動銷毀，避免跨事故發生資料交叉污染。"
        ],
        "metaphor": "就像進入中央銀行地下金庫調查失竊案的外部私家偵探：他被允許佩戴特製的放大鏡翻看現場指紋與監控錄影（唯讀偵查），但他身上不准攜帶任何鑰匙、螺絲起子或火藥，且全程處於保全主管的視線之內。",
        "layout": "安全防禦四重護欄圖：唯讀閘道 (Read-Only Gateway) -> PII 脫敏過濾網 -> 指令語意防禦閥門 -> 審計日誌儲存庫。"
    },
    {
        "chapter_id": 18, "chapter_name": "第 18 章：Stage 6: Maintain — 線上值班與即時除錯：Claude on Call", "page_num": 9,
        "title": "事故後覆盤報告 (Postmortem) 自動生成：告別手寫報告的折磨",
        "subtitle": "事故解決後，讓 Claude 自動梳理精確到秒的時間線與事故剖析",
        "takeaway": "從警報響起、呼叫診斷、定位問題、應用補丁到服務恢復，所有動作精確轉化為符合 Google SRE 規範的覆盤文檔！",
        "details": [
            "<strong>精確到秒的時序線重建 (Timeline Reconstruction)</strong>：從 Slack 訊息與監控圖表中自動提取各階段重要時間戳，告別人工拼湊會議記錄的痛苦。",
            "<strong>五個為什麼 (5 Whys) 深層因果挖掘</strong>：自動撰寫從表層錯誤到架構缺陷的遞進分析：『為什麼拋出 NPE？因為快取為空。為什麼快取為空？因為...』。",
            "<strong>自動衍生長期改進行動項 (Action Items)</strong>：不僅總結事故，更自動向 Jira/GitHub 發起補全防禦測試、調整監控閾值與架構重構的具體 Issue。"
        ],
        "metaphor": "如同黑盒子空難調查組：在飛機迫降搶救成功後，自動黑盒子分析器直接將飛行軌跡、座艙通話錄音與儀表氣壓數據打印成一份圖文並茂的官方事故調查報告，並為航空公司開列出十條安全改進法規。",
        "layout": "SRE 覆盤報告範本結構：事故影響時長 -> 核心受影響服務指標 -> 精確時序記錄表 -> 根本原因分析 (5 Whys) -> 預防重現行動清單。"
    },
    {
        "chapter_id": 18, "chapter_name": "第 18 章：Stage 6: Maintain — 線上值班與即時除錯：Claude on Call", "page_num": 10,
        "title": "防禦閉環：將線上事故經驗固化為 CLAUDE.md 憲章規則",
        "subtitle": "絕不踩進同一個泥潭兩次：讓每一次線上故障都成為團隊知識庫的永恆養分",
        "takeaway": "事故修復完成並不意味著結束！將引發事故的反面模式寫入 CLAUDE.md，讓未來的代碼生成在源頭直接杜絕重犯！",
        "details": [
            "<strong>提煉架構防禦教訓 (Architectural Lesson)</strong>：將特定的邊界漏洞抽象為編程約束，例如：『所有跨微服務調用必須顯式宣告超時與斷路器』。",
            "<strong>更新專案級 CLAUDE.md</strong>：自動在專案的規範檔案中追加規則條目，下一次任何開發者讓 Claude 寫代碼時，Agent 自動嚴格遵守該約束。",
            "<strong>生成防回歸的合約測試</strong>：在全域測試套件中永久新增一組針對該事故特徵的端到端防衛測試案例，納入 CI/CD 強制把關。"
        ],
        "metaphor": "這就像航空安全管理條例的誕生歷史：民航歷史上的每一條嚴苛飛行安全手冊規章，背後都是一次慘痛的真實事故；而我們將每次事故化作代碼憲章中的一條金科玉律，讓未來的每架航班永遠避開那道風切變。",
        "layout": "閉環演化迴圈圖：線上事故 (Incident) -> 根本原因解析 -> 萃取防範規則 -> 注入 CLAUDE.md -> 全團隊未來代碼免疫此類缺陷。"
    },
    {
        "chapter_id": 18, "chapter_name": "第 18 章：Stage 6: Maintain — 線上值班與即時除錯：Claude on Call", "page_num": 11,
        "title": "團隊文化重塑：告別值班倦怠，擁抱智慧應急指揮",
        "subtitle": "從提心吊膽的『救火隊員』，轉身成為駕馭 AI 矩陣的『系統穩定性工程指揮官』",
        "takeaway": "當 AI 接管了日誌過濾與補丁初稿的繁重體力活，工程師終於能重獲優質睡眠與對系統架構穩定性的長遠信心！",
        "details": [
            "<strong>徹底告別警報恐慌症 (No More On-call PTSD)</strong>：輪值工程師不再害怕半夜的手機鈴聲，因為深知背後有隨叫隨到、知識完備的 AI 夥伴隨時待命。",
            "<strong>初級工程師的升維賦能</strong>：即使是剛入職的菜鳥工程師，在 Claude 智慧助手即時導引下，也能沉著應對並解決複雜的線上事故。",
            "<strong>將精力重新聚焦於高價值架構</strong>：大幅壓縮每次事故的處理週期（MTTR 從數小時縮短至數分鐘），讓團隊將 90% 的精力重新投回前瞻功能研發。"
        ],
        "metaphor": "從拿著水桶在黑夜中疲於奔命舀水滅火的村民，升級為坐在高科技水情防洪指揮中心裡的調度官：螢幕上清晰可見水閘各處壓力，輕輕撥動推桿，智能引流系統早已平穩化解洪峰。",
        "layout": "文化躍升前後對比：左側展現疲憊焦慮的傳統值班工程師（被日誌與警報淹沒），右側展現神態自若的現代 SRE 指揮官（在 AI 輔助下胸有成竹決策）。"
    }
]
