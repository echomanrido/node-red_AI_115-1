# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 14, "chapter_name": "第 14 章：Stage 5: Deploy — 部署把關：Hooks 作為審批門禁", "page_num": 1,
        "title": "從建置防護到發布門禁：Hooks 的雙重身分蛻變", "subtitle": "在 Build 階段它是無人值守的護欄；在 Deploy 階段它是嚴肅的審批官",
        "takeaway": "建置期的 Hook 追求全自動（Allow or Block）；而部署期的 Hook 則引入『詢問與暫停 (Ask/Pause)』，直到特定人類授權方能放行。",
        "details": [
            "<strong>發布門禁的不可逾越性</strong>：將代碼推送到生產環境、執行生產資料庫遷移或調用雲端發布 API，是影響業務連續性的最高危動作。",
            "<strong>從軟性規則升級為硬門禁</strong>：不再寄望於工程師在命令列裡自覺不去敲生產命令，而是讓 Hook 腳本在底層截斷未經核准的發布指令。",
            "<strong>通用的 Hook 機制，分級的策略表達</strong>：相同的 PreToolUse 框架，在不同生命週期階段承載著完全不同嚴肅等級的治理目標。"
        ],
        "metaphor": "這就像同一個安全檢查站：在平時內部園區巡邏時（Build 階段），雷達自動識別員工證件抬桿（全自動）；但當車輛即將駛出國境海關邊界時（Deploy 階段），路障升起、海關總督察親自核驗簽署的特許通行證，方可放行出境。",
        "layout": "雙重身分對比圖：左側展示 Build 階段的輕量級綠色自動抬桿，右側展示 Deploy 階段由紅燈守護的具名人工簽章門禁。"
    },
    {
        "chapter_id": 14, "chapter_name": "第 14 章：Stage 5: Deploy — 部署把關：Hooks 作為審批門禁", "page_num": 2,
        "title": "鎖定不可妥協的門禁清單 (Human Approval Gates)",
        "subtitle": "工程領導層、變更管理與合規團隊必須共同堅守的底線",
        "takeaway": "哪些權力必須永遠保留在人類手中？變更管理簽核、生產發布授權與高危資料庫結構修改。",
        "details": [
            "<strong>門禁一：變更管理委員會 (CAB) 簽核標籤</strong>：生產發布必須關聯已被核准的 Jira/ServiceNow 變更工單號。",
            "<strong>門禁二：具名發布主管授權 (Release Authorization)</strong>：必須檢驗發布經理專屬的環境變數授權碼或數位簽章。",
            "<strong>門禁三：受保護的基礎設施路徑</strong>：禁止任何無人值守 Agent 擅自修改 Terraform 核心網路拓撲或 KMS 金鑰策略。"
        ],
        "metaphor": "如同三峽大壩的防汛調度手冊：上游常規水庫排沙發電只需輪值工程師按電鈕，但如果遇到百年一遇特大洪峰需要開啟洩洪深孔閘門，必須由防汛抗旱指揮部總指揮親自簽署特級動員令。",
        "layout": "三重鋼鐵門禁示意圖：CAB Ticket、Named Release Authorization、Protected Infra 依序橫亙在發布管線前方。"
    },
    {
        "chapter_id": 14, "chapter_name": "第 14 章：Stage 5: Deploy — 部署把關：Hooks 作為審批門禁", "page_num": 3,
        "title": "官方實戰範例：.claude/settings.json 門禁配置",
        "subtitle": "Anthropic 原生指南：如何宣告生產發布拦截規則？",
        "takeaway": "用簡潔清晰的聲明式配置，將 Bash 工具與專門的生產門禁檢查腳本進行剛性綁定。",
        "details": [
            "```json\n{\n  \"hooks\": {\n    \"PreToolUse\": [\n      {\n        \"matcher\": \"Bash\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"${CLAUDE_PROJECT_DIR}/.claude/hooks/production-gate.sh\"\n          }\n        ]\n      }\n    ]\n  }\n}\n```",
            "<strong>全域無縫攔截</strong>：任何透過 Bash 工具發起的終端命令，在送交系統執行前，必先經過 `production-gate.sh` 進行政治審查！",
            "<strong>團隊共享與受管覆蓋</strong>：配置保存在代碼庫中由全隊共有，在受監管企業中更可由 IT 管理員部署為不可覆蓋的受管配置。"
        ],
        "metaphor": "這就像在整座大樓的總水閥旁安裝了一組聯鎖電磁閥：任何水管工轉動水龍頭時，感應電磁閥必須先確認大樓總控室是否傳輸了水壓解鎖密碼，否則閥門死死鎖定、分水不漏。",
        "layout": "代碼高亮卡片展示 settings.json，旁邊附帶箭頭指向 production-gate.sh 實體腳本。"
    },
    {
        "chapter_id": 14, "chapter_name": "第 14 章：Stage 5: Deploy — 部署把關：Hooks 作為審批門禁", "page_num": 4,
        "title": "官方門禁腳本深入拆解：production-gate.sh",
        "subtitle": "僅僅十行代碼，如何建構起價值連城的生產安全閘門？",
        "takeaway": "透過正則精準嗅探命令意圖，檢驗環境變數授權；一旦缺失，立刻以 Exit 2 阻斷並輸出明確審批指引。",
        "details": [
            "```bash\n#!/bin/bash\n# 生產環境發布必須具備具名的發布授權證明\ncmd=$(jq -r '.tool_input.command' < /dev/stdin)\nif [[ \"$cmd\" == *\"deploy\"* && \"$cmd\" == *\"production\"* ]]; then\n   if [ -z \"$RELEASE_APPROVAL\" ]; then\n     echo \"[Release Gate] 嚴重阻斷：生產環境部署需要具名發布授權碼！\" >&2\n     echo \"請先獲得發布經理核准，並注入 RELEASE_APPROVAL 變數。\" >&2\n     exit 2 # exit 2 阻斷動作；提示資訊將原樣呈報給 Claude\n   fi\nfi\nexit 0\n```",
            "<strong>退出碼 2 的精妙之處</strong>：不報廢整場會話，而是將阻斷理由傳遞給 Claude，Claude 能優雅地回覆用戶：『我已經備妥所有發布包，正在等待您的授權碼』。"
        ],
        "metaphor": "如同金庫大門的雙鑰匙防護鎖：第一把機械鑰匙已經插好（代碼就緒），但旋轉手柄時感測器提示『缺少二號電子鑰匙（RELEASE_APPROVAL）』，蜂鳴器響起並提示請主管前來刷卡認證。",
        "layout": "代碼區塊高亮 production-gate.sh 全文，重點以紅綠雙色標註『變量檢驗』與『Exit 2 阻斷出口』。"
    },
    {
        "chapter_id": 14, "chapter_name": "第 14 章：Stage 5: Deploy — 部署把關：Hooks 作為審批門禁", "page_num": 5,
        "title": "具名授權機制 (Named Release Authorization)",
        "subtitle": "告別含糊其辭的口頭批准：法定合規責任的數位烙印",
        "takeaway": "授權不是匿名點擊，而是將具體發布負責人的職工編號、時間戳或專屬簽章令牌注入環境，永久鎖定責任。",
        "details": [
            "<strong>明確責任人 (Accountability)</strong>：`RELEASE_APPROVAL=\"AUTH-2026-09-JSMITH\"`，一旦線上發生重大波及，能精準定位是哪位主管在何時做出的放行決策。",
            "<strong>防止授權令牌濫用</strong>：授權碼通常由內部變更管理系統動態發放，有效期僅限於發布窗口期的 30 分鐘，過期自動作廢。",
            "<strong>徹底杜絕 Agent 偽造授權</strong>：Agent 本身不具備向身份系統申請授權碼的權限，這個斷點牢牢掌握在人類管理者手中。"
        ],
        "metaphor": "就像核潛艇發射戰略導彈的通信指令：大總統下達的核密碼必須包含總統個人的特徵識別碼、經過國防部長雙重核驗確認，兩把密碼鑰匙嚴絲合縫，發射電路才會正式接通。",
        "layout": "授權憑證卡片圖：展示帶有時間戳、工號、數位簽名與 30 分鐘倒計時的 Named Release Authorization 徽章。"
    },
    {
        "chapter_id": 14, "chapter_name": "第 14 章：Stage 5: Deploy — 部署把關：Hooks 作為審批門禁", "page_num": 6,
        "title": "全鏈條審計存證：放行與阻斷日誌全量採集",
        "subtitle": "每一場嘗試、每一次成功、每一筆駁回，全數記錄在案",
        "takeaway": "門禁腳本的所有判決結果，自動附帶環境變數與調用參數，流式寫入不可篡改的集中式審計日誌中。",
        "details": [
            "<strong>合規追溯零死角</strong>：滿足金融與醫療機構對於『誰何時嘗試登錄生產機台、何時被阻斷』的法定監管存證訴求。",
            "<strong>及時發現異常入侵傾向</strong>：如果日誌顯示某個會話連續 5 次試圖強行調用生產部署命令，安全監控系統自動拉響警報並凍結權限。",
            "<strong>免受審計官質疑</strong>：審計季度到來時，一鍵導出門禁執行日誌報表，清晰展示每一次生產部署皆持有具名授權無一例外。"
        ],
        "metaphor": "這就像飛機駕駛艙的『語音記錄儀與飛控黑盒子』：機長每一次拉動操縱桿、副駕駛每一次應答通話、地面防撞系統每一次語音告警，毫秒不差地記錄在防高溫防衝擊的高強度鈦合金外殼內。",
        "layout": "審計日誌流動圖：門禁攔截事件 → 格式化為 CEF/Syslog → 傳輸至 Splunk/Datadog SIEM 集中存證。"
    },
    {
        "chapter_id": 14, "chapter_name": "第 14 章：Stage 5: Deploy — 部署把關：Hooks 作為審批門禁", "page_num": 7,
        "title": "環境自主權限分級 (Environment Tiers)",
        "subtitle": "Dev 自由奔馳、Staging 嚴格演練、Prod 門禁重重",
        "takeaway": "根據環境特質實施階梯式信任：開發環境全面放權，生產環境鐵板一塊，測試環境兼顧演練與安全。",
        "details": [
            "<strong>Development（開發環境）</strong>：Agent 擁有完全的自主部署權，隨意修改配置與重啟容器，最大化研發迭代敏捷度。",
            "<strong>Staging（預發布環境）</strong>：Agent 擁有部署權，但必須嚴格演練生產標準流水線，包括回滾腳本測試與性能壓測。",
            "<strong>Production（生產環境）</strong>：Agent 僅具備發布準備與演練權限，最終的發布執行必須由人類發布主管親自授權放行。"
        ],
        "metaphor": "就像航天基地的測試環境：在地面重力實驗室（Dev），宇航員可以穿著拖鞋隨意拆裝模擬艙開關；在上層離心機艙（Staging），必須嚴格穿著宇航服進行失重演習；而在真正踏入發射架（Prod）的最後一刻，必須聽從地面控制中心總指揮官的口令。",
        "layout": "三級階梯金字塔：底部為綠色 Dev (自由度 100%)、中部為黃色 Staging (受限演練)、頂部為紅色 Prod (嚴格門禁審批)。"
    },
    {
        "chapter_id": 14, "chapter_name": "第 14 章：Stage 5: Deploy — 部署把關：Hooks 作為審批門禁", "page_num": 8,
        "title": "回滾路徑 (Rollback) 的常態演練：最常被執行的安全路徑",
        "subtitle": "Anthropic 核心哲學：發布可能失敗，但回滾必須百發百中",
        "takeaway": "回滾路徑不能等出事了才臨時摸索，它必須是整個流水線中被最頻繁驗證、一鍵即可觸發的確定性指令。",
        "details": [
            "<strong>預演先於發布</strong>：在代碼踏入生產前，Staging 環境必須先執行一次自動發布並立刻執行一次一鍵回滾，證明逆向路徑完全暢通。",
            "<strong>封裝為單一極速指令</strong>：例如 `make rollback` 或 MCP 工具 `tools.rollback()`，不需要人工登入伺服器臨時手工找備份。",
            "<strong>Stage 6 閉環自愈的底層保障</strong>：下一章的閉環監控在發現生產指標崩潰時，呼叫的就是這條早已被反覆演練成肌肉記憶的一鍵回滾通道！"
        ],
        "metaphor": "這就像客機起飛前空乘人員向全體旅客示範的『緊急逃生滑梯與氧氣面罩』：地勤人員每週都要對充氣滑梯進行彈出測試，確保在黑夜濃煙的極端狀態下，一拉閥門 5 秒鐘內滑梯必能完全充氣展開。",
        "layout": "雙向流水線圖：上方藍色箭頭為 Deploy 發布路徑，下方亮橘色箭頭為極速 Rollback 逆向秒級回滾通道。"
    },
    {
        "chapter_id": 14, "chapter_name": "第 14 章：Stage 5: Deploy — 部署把關：Hooks 作為審批門禁", "page_num": 9,
        "title": "跨生命週期的 Hooks 聯動：處處有把關，處處皆通暢",
        "subtitle": "Hooks 不僅屬於 Deploy：它貫穿 SDLC 的每一個神經末梢",
        "takeaway": "雖然發布門禁最為典型，但 Hooks 活躍在所有階段：保護 Migration、鎖死測試檔案、杜絕機密洩漏。",
        "details": [
            "<strong>Stage 3 Build 聯動</strong>：阻斷無工單修改資料庫 Migration 檔案與 Terraform 代碼。",
            "<strong>Stage 4 Test 聯動</strong>：在 Bug 修復任務中，物理封死對單元測試檔案的寫入權限，防範作弊。",
            "<strong>Stage 5 Deploy 聯動</strong>：阻斷缺少 `$RELEASE_APPROVAL` 的生產發布指令。",
            "<strong>無處不在的守護</strong>：同一套 Hooks 機制在不同階段各司其職，共同編織出一張籠罩全生命週期的安全天網。"
        ],
        "metaphor": "就像現代智慧大樓的安防門禁系統：大門口檢驗訪客二維碼（Deploy），各樓層電梯需要刷員工卡（Build），核心財務室需要雙人指紋加虹膜認證（Migration/Secrets），層層設防、環環相扣。",
        "layout": "全生命週期網絡圖：展示 Hooks 如何在 Plan、Build、Test、Deploy 各環節精確布防，構築立體縱深防禦。"
    },
    {
        "chapter_id": 14, "chapter_name": "第 14 章：Stage 5: Deploy — 部署把關：Hooks 作為審批門禁", "page_num": 10,
        "title": "受管環境中的絕對防篡改：IT 管理員的終極權限",
        "subtitle": "如何防止個別員工在本地終端中偷偷 rm -rf .claude/hooks？",
        "takeaway": "在企業級部署中，核心門禁腳本存放於操作系統 root 權限保護目錄，即使本機開發者擁有 sudo 權限也無法篡改審查規則。",
        "details": [
            "<strong>只讀唯讀屬性鎖定</strong>：核心 Hook 檔案掛載為唯讀檔案系統 (Read-Only Mount)，或透過 MDM/Puppet 定時強制重置基線。",
            "<strong>雜湊值校驗 (Checksum Verification)</strong>：Claude Code 啟動時自動比對 Hooks 腳本的 SHA-256 數位簽名，一旦發現內容被篡改，立即拒絕開機。",
            "<strong>給予監管合規員最大底氣</strong>：無論工程師如何熱衷於折騰本地環境，這道由公司法規直接管轄的實體鋼鐵閘門永遠堅不可摧。"
        ],
        "metaphor": "如同特種防彈運鈔車的後艙鎖芯：鎖芯由銀行安全總部統一雷射雕刻編碼封裝，押運員手裡只有方向盤和油門踏板，就算把整輛車開進私人修理廠，也絕不可能在不觸發警報的情況下撬開後艙分毫。",
        "layout": "防護鎖死架構圖：操作系統底層唯讀保護層包裹著 production-gate.sh，雜湊校驗盾牌守衛在啟動入口。"
    },
    {
        "chapter_id": 14, "chapter_name": "第 14 章：Stage 5: Deploy — 部署把關：Hooks 作為審批門禁", "page_num": 11,
        "title": "第十四章實戰總結：讓 Agent 止步於生產門禁之前",
        "subtitle": "Stage 5 Deploy 審批門禁核心總結與下章預告",
        "takeaway": "核心治理鐵律：Agent 可以全自主行動直到生產門禁，但絕對不允許擅自跨過門禁！",
        "details": [
            "<strong>守護原則</strong>：分支保護強制 PR 合併、production-gate 攔截未授權發布、分級環境確保邊界分明、回滾常態化演練。",
            "<strong>門禁已經立起，如何將 Claude 真正接入 CI/CD 流水線？</strong>：第十五章將揭示如何在無人值守管線中安全運行 Claude！",
            "<strong>前瞻第十五章</strong>：容器沙盒隔離、短時效 Token、MCP 工具封裝部署權限，第十五章『CI/CD integration and deployment』即將登場！"
        ],
        "metaphor": "大壩已經落成，閘門威嚴屹立；現在，我們將引導水流精準穿過渦輪發電機組，將這股龐大的奔湧能量安全轉化為驅動全城運轉的強勁電力！",
        "layout": "三條核心實踐卡片，底部搭配通往第十五章 CI/CD Integration 的高速流水線箭頭。"
    }
]
print("Chapter 14 slides:", len(slides))
