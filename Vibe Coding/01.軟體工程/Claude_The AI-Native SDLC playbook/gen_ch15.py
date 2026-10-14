# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 15, "chapter_name": "第 15 章：Stage 5: Deploy — CI/CD 整合與 MCP 工具授權", "page_num": 1,
        "title": "無人值守流水線：在 CI/CD 中非互動式執行 Claude", "subtitle": "告別人工終端操作：讓 Agent 成為自動化流水線中標準的 Step",
        "takeaway": "透過 `claude -p` 命令，將 Claude Code 嵌入 GitHub Actions 或 GitLab CI，自動執行建置排查、文檔生成與自動修復。",
        "details": [
            "<strong>非互動式運行 (Non-interactive Mode)</strong>：在 CI 環境中沒有真人按鍵盤，`-p` 參數接收完整 Prompt，執行完畢輸出結構化結果後優雅退出。",
            "<strong>漸進式採納：從唯讀診斷起步</strong>：初期不賦予寫入權限，先讓 Agent 負責在建置失敗時排查日誌、分析不穩定測試 (Flaky Test) 或起草 Changelog。",
            "<strong>進階授權：受限的自動寫入</strong>：在嚴格門禁後方，允許 Agent 自動修復 Lint 報錯、更新 API 衍生文檔或處理 PR 上的 `@claude` 評論。"
        ],
        "metaphor": "這就像工業裝配線上的『自動光學螺絲檢驗機器人』：它不需要工人盯著按開關，傳送帶每送過來一個發動機缸體，它自動啟動掃描螺絲孔位、檢驗扭矩並在合格證上打印二維碼，一氣呵成。",
        "layout": "CI/CD 流水線展示圖：Checkout → Build → [Claude Triage Job] → Unit Test → Deploy 依序排開。"
    },
    {
        "chapter_id": 15, "chapter_name": "第 15 章：Stage 5: Deploy — CI/CD 整合與 MCP 工具授權", "page_num": 2,
        "title": "官方實戰範例：建置失敗自動排查 (Triage Step)",
        "subtitle": "Anthropic 原生指南：不到五行的 GitHub Action 神級步驟",
        "takeaway": "當 Build 步驟不幸紅燈時，自動喚醒 Claude 深度閱讀日誌，提煉出三行精華摘要直接貼入 PR 討論串。",
        "details": [
            "```yaml\n- name: Triage failed build\n  if: failure()\n  run: >\n    claude -p \"Read the build log at out/build.log. Identify the most\n    likely cause, say whether the failure looks flaky or real, and write a\n    three-line summary for the PR thread.\" >> triage.md\n```",
            "<strong>告別幾萬行晦澀日誌</strong>：工程師打開 PR 時，不再需要痛苦地在一萬行堆疊追蹤中尋找報錯，Claude 已經用三句話講清楚了根本原因。",
            "<strong>自動辨析真假故障</strong>：模型能精準識別這究竟是網路超時引起的偶然不穩定測試 (Flaky)，還是真正的空指標邏輯 Bug。"
        ],
        "metaphor": "宛如醫院急診室裡的『資深檢傷分類護士』：在救護車剛把傷患推下來的十秒鐘內，快速測量瞳孔與心率，在急救手環上精準寫下『疑似顱內出血、失血性休克早期』，主刀醫生一眼便知搶救重點。",
        "layout": "YAML 區塊高亮展示 Triage Step，右側展示其自動輸出在 PR 上的簡潔三行診斷摘要。"
    },
    {
        "chapter_id": 15, "chapter_name": "第 15 章：Stage 5: Deploy — CI/CD 整合與 MCP 工具授權", "page_num": 3,
        "title": "沙盒隔離與安全執行環境 (Execution Sandboxing)",
        "subtitle": "長時間運行的 Agent 如何在不受信任代碼庫中安全執行？",
        "takeaway": "無人值守的 Agent 必須嚴格運行於隔離的輕量級容器沙盒中，限制網路存取策略，且默認不持有任何生產憑證。",
        "details": [
            "<strong>容器與微虛擬機隔離</strong>：使用 Docker/Podman 或 Firecracker 微虛擬機，確保即使 Agent 執行了惡意腳本，影響範圍也被鎖死在容器內部。",
            "<strong>嚴格的網路出口策略 (Egress Network Policy)</strong>：限制 Agent 只能與特定的 API 閘道和內部 Git 倉庫通訊，禁止向不可信外網 IP 發送流量。",
            "<strong>生產金鑰絕對剝離</strong>：CI 運行環境中絕不注入任何生產 AWS/GCP 憑證，杜絕環境變數外洩風險。"
        ],
        "metaphor": "這就像在最高等級生物安全 P4 實驗室（沙盒容器）內研究烈性病毒：實驗員必須穿戴正壓防護服、實驗室保持負壓氣流、所有廢水廢氣經過三級高溫焚化消毒，哪怕試管破裂，病毒也絕無可能洩漏到城市大氣中。",
        "layout": "三層沙盒防護架構圖：外層為 VPC 網路防火牆，中層為 Docker 容器硬體限制，內層為受管無憑證環境。"
    },
    {
        "chapter_id": 15, "chapter_name": "第 15 章：Stage 5: Deploy — CI/CD 整合與 MCP 工具授權", "page_num": 4,
        "title": "短時效最小權限令牌 (Ephemeral Scoped Tokens)",
        "subtitle": "告別永久長效金鑰：讓每次 Agent 執行都持有自毀通行證",
        "takeaway": "透過 OIDC (OpenID Connect) 或臨時憑證機制，為每次 CI 執行動態頒發僅有 15 分鐘有效期的最小權限 Token。",
        "details": [
            "<strong>用完即作廢的臨時身分</strong>：Agent 執行的任務結束後，該 Token 自動在雲端身份中心失效，即使日誌外洩，黑客拿到也只是一張廢紙。",
            "<strong>嚴格限制操作範圍 (Scoped)</strong>：Token 僅允許讀取當前 PR 的變更、向當前分支推送 Commit，絕不具備訪問其他倉庫或後台管理員的權限。",
            "<strong>擺脫靜態 Secret 的管理噩夢</strong>：不再需要在 GitHub Secrets 中維護永不過期的私鑰，徹底根除金鑰輪替維護負擔。"
        ],
        "metaphor": "就像現代高級酒店的『一次性電子門禁密碼』：這組六位數密碼只在保潔阿姨打掃房間的特定 20 分鐘內有效，保潔結束關上門的一瞬間，密碼立刻在後台系統中自動作廢失效。",
        "layout": "OIDC 令牌交換時序圖：GitHub Actions → 憑證簽名向 AWS IAM 交換 STS 臨時 Token → 15 分鐘後自動過期自毀。"
    },
    {
        "chapter_id": 15, "chapter_name": "第 15 章：Stage 5: Deploy — CI/CD 整合與 MCP 工具授權", "page_num": 5,
        "title": "MCP 封裝部署權限：告別裸露的 Shell 腳本",
        "subtitle": "Model Context Protocol 如何將部署權力精準約束為白名單？",
        "takeaway": "不要給予 Agent 任意執行 bash deploy.sh 的無限 Shell 權力，而應將其封裝為受控的 MCP 工具：deploy, status, rollback。",
        "details": [
            "<strong>傳統 Shell 的巨大漏洞</strong>：如果給予 Agent 任意執行 Shell 指令並注入憑證，惡意提示詞可能誘騙其執行 `cat ~/.aws/credentials` 或 `curl attacker.com`。",
            "<strong>MCP 語意化抽象</strong>：透過 MCP 協議，Agent 只能調用經過嚴格型別定義的工具函式（如 `tools.deploy({ env: 'staging', tag: 'v1.2' })`）。",
            "<strong>白名單確定性防禦</strong>：MCP Server 在背後代為處理底層連線與憑證注入，Agent 從頭到尾看不見、摸不著任何底層真實憑證！"
        ],
        "metaphor": "這就像把原本直接交給實習生一把能打開全樓所有大門的萬能黃銅鑰匙（任意 Shell 權限），改為只給他一個安裝在牆壁上的智慧觸控面板，面板上只有三個被授權的按鈕：開燈、關燈、重啟排風扇（MCP 工具封裝）。",
        "layout": "MCP 隔離層示意圖：Agent 透過 JSON-RPC 調用 MCP Server 白名單工具，MCP Server 隔離掌控生產憑證並執行安全發布。"
    },
    {
        "chapter_id": 15, "chapter_name": "第 15 章：Stage 5: Deploy — CI/CD 整合與 MCP 工具授權", "page_num": 6,
        "title": "MCP 部署工具集標準規範：deploy / status / rollback",
        "subtitle": "為 Agent 量身打造的三大發布核心 API 介面",
        "takeaway": "標準 MCP 部署服務必須精確暴露三項核心工具：發布新版本、查詢運維狀態，以及緊急一鍵回滾。",
        "details": [
            "<strong>deploy({ environment, service, version })</strong>：觸發指定服務向指定環境的滾動更新，嚴格校驗入參格式。",
            "<strong>status({ environment, service })</strong>：查詢當前容器叢集的健康實例數、CPU/記憶體負載與最新錯誤率，供 Agent 自主評估。",
            "<strong>rollback({ environment, service, target_version })</strong>：秒級將流量切換回上一個健康版本，作為自愈迴圈的終極兜底武器！"
        ],
        "metaphor": "宛如現代高鐵駕駛室裡的三個核心手柄：加速牽引手柄（deploy）、全景狀態儀表顯示幕（status），以及大紅色的緊急電磁制動回滾手柄（rollback），簡單直接且威力無窮。",
        "layout": "三面板工具卡片：分別展示 deploy、status、rollback 的 JSON Schema 參數規格與返回值結構。"
    },
    {
        "chapter_id": 15, "chapter_name": "第 15 章：Stage 5: Deploy — CI/CD 整合與 MCP 工具授權", "page_num": 7,
        "title": "環境隔離的 MCP 實例：防止跨環境越權投毒",
        "subtitle": "開發工具與生產工具絕不混用同一條通道",
        "takeaway": "為不同的運行環境配置獨立的 MCP Server 實例，開發環境 Agent 甚至連通向生產 MCP 的網路路徑都不存在。",
        "details": [
            "<strong>實體隔離部署</strong>：`mcp-deploy-dev` 運行在開發網段，`mcp-deploy-prod` 隔離部署在核心生產網段。",
            "<strong>無效目標阻斷</strong>：即使 Agent 在開發會話中產生幻覺試圖調用 `deploy({ env: 'production' })`，開發端 MCP Server 直接拋出無效環境參數異常。",
            "<strong>符合最嚴格金融分級監管</strong>：從網路層面杜絕了任何因為設定混淆而將測試代碼誤推至生產伺服器的可能。"
        ],
        "metaphor": "就像軍事基地裡的兩條獨立通信線路：普通步兵手中只有短波戰術對講機（Dev MCP），而能夠呼叫戰略轟炸機實施精確打擊的絕密衛星加密通信終端（Prod MCP），只放在最高司令部的防爆地下掩體中。",
        "layout": "網路隔離架構圖：展示 Dev VPC 與 Prod VPC 中的 MCP Server 完全處於不同安全區域，透過 API Gateway 分級認證。"
    },
    {
        "chapter_id": 15, "chapter_name": "第 15 章：Stage 5: Deploy — CI/CD 整合與 MCP 工具授權", "page_num": 8,
        "title": "發布常態化預演 (Dress Rehearsal)：把發布做成肌肉記憶",
        "subtitle": "為什麼每一次 Staging 部署都必須伴隨一次一鍵回滾？",
        "takeaway": "在預發布環境中，讓 Agent 在部署成功的下一秒立刻執行一次 rollback 演練，確保回滾路徑隨時可用。",
        "details": [
            "<strong>打破對回滾的恐懼</strong>：很多傳統團隊一年都不敢執行一次回滾，導致真正故障時回滾腳本全報錯崩潰。",
            "<strong>常態化雙向檢驗</strong>：在每次合併到預發布環境時，管線自動執行：Deploy -> 驗證綠燈 -> Rollback -> 驗證原版本健康 -> 再 Deploy。",
            "<strong>給予 Stage 6 閉環百分百信心</strong>：只有在常規狀態下被反覆驗證過千百次的路徑，在深夜生產指標突發異常時，我們才敢放手讓 Agent 自主觸發回滾！"
        ],
        "metaphor": "這就像特技跳傘運動員的訓練：每次穿好主降落傘後，教練強制要求他在地面拉動備用副傘手柄十次，直到在閉眼狀態下也能在半秒鐘內盲操拉出副傘，將求生動作刻進肌肉記憶。",
        "layout": "雙向循環預演圖：Staging Deploy → 冒煙測試 → 立即演練 Rollback → 確認原狀 → 再次 Deploy 放行，雙向暢通無阻。"
    },
    {
        "chapter_id": 15, "chapter_name": "第 15 章：Stage 5: Deploy — CI/CD 整合與 MCP 工具授權", "page_num": 9,
        "title": "分支保護 (Branch Protection) 終極鐵律：main 永遠受保護",
        "subtitle": "Agent 哪怕智力再高，也沒有任何通道能直接 push 到 main 分支",
        "takeaway": "Agent 的任何寫入動作，終點只能是建立一個 Pull Request；main 分支的合併權限永遠受到分支保護鎖定。",
        "details": [
            "<strong>封死任何特權直推管道</strong>：在 GitHub/GitLab 倉庫設定中，main 分支開啟強制保護，禁止任何帳號（包括 Admin 與 Agent Service Account）直接 push。",
            "<strong>強制通過所有 Status Checks</strong>：必須等待單元測試、Continuous Evals、Code Review 記分卡全部綠燈，且獲得具名人類 Approve。",
            "<strong>審計鏈條的絕對閉環</strong>：這條鐵律保證了主幹上的每一個 Commit，背後必然對應著一份經過完整審查的 PR，沒有任何人可以走後門偷渡代碼！"
        ],
        "metaphor": "如同國家金庫的核心金庫重門：金庫大門沒有任何機械把手可以從外面推開，只能在防彈玻璃後方由兩位持槍守衛同時在電腦中確認全部十道安檢手續全部打勾後，大門的液壓栓才會緩緩收回。",
        "layout": "Git 分支防禦示意圖：Feature Branch 充滿靈活性，而 Main Branch 被厚重金屬邊框包裹，中間必須跨越 Pull Request 橋樑。"
    },
    {
        "chapter_id": 15, "chapter_name": "第 15 章：Stage 5: Deploy — CI/CD 整合與 MCP 工具授權", "page_num": 10,
        "title": "獨立 Agent 身分認證與管線日誌清晰歸因",
        "subtitle": "將機器人行為與觸發者行為嚴格分離，消除糊塗帳",
        "takeaway": "管線中的非互動式 Agent 必須在自身專屬的服務身分 (Service Principal) 下運行，日誌中清楚區分『機器做了什麼』與『誰觸發了流水線』。",
        "details": [
            "<strong>專屬 Bot 帳號標識</strong>：提交的 Commit 作者標記為 `claude-code-bot[bot]`，審批記錄中綁定點擊按鈕的人類工程師工號。",
            "<strong>審計日誌的乾淨清晰度</strong>：安全審計員能一目了然看清：『工程師張三發起了 PR，Claude Bot 執行了修復並由李四主管批准合併』。",
            "<strong>細粒度權限控制</strong>：可以隨時單獨吊銷或調整 Agent Bot 的權限，而完全不會波及任何真實人類開發者的日常帳號。"
        ],
        "metaphor": "這就像在大型現代化醫院裡，手術輔助機器人達文西（Agent）擁有自己專屬的設備序列號與操作日誌記錄，而主刀外科醫生（觸發者）手腕上戴著電子工牌，系統同時記錄機器臂在幾點幾分切除了組織、是由哪位醫生踩下踏板下達的指令。",
        "layout": "雙身分標籤日誌卡片：展示 GitHub PR 歷史中清晰並列的『Triggered by @alice』與『Executed by @claude-bot』。"
    },
    {
        "chapter_id": 15, "chapter_name": "第 15 章：Stage 5: Deploy — CI/CD 整合與 MCP 工具授權", "page_num": 11,
        "title": "第十五章實戰總結：築牢現代化交付的鋼鐵動脈",
        "subtitle": "Stage 5 Deploy 部署整合圓滿收官與下章預告",
        "takeaway": "透過容器沙盒、短時效 Token、MCP 工具封裝與分支保護，我們構建了一條既全自動、又絕對安全可審計的部署高速公路！",
        "details": [
            "<strong>四大基石回顧</strong>：非互動式流水線、沙盒隔離與最小權限、MCP 語意化部署封裝、常態化一鍵回滾預演。",
            "<strong>代碼已經上線，然後呢？</strong>：傳統 SDLC 在部署後就宣告結束，但 AI 原生 SDLC 才剛剛迎來最神奇的篇章！",
            "<strong>前瞻第十六章</strong>：當代碼在生產環境運行時，如何讓 Agent 全天候監控生產指標、在發生異常時自動閉環自愈？第十六章『Closing the loop』即將為您打開新世界大門！"
        ],
        "metaphor": "火箭已經成功點火發射升空，衛星已精準送入預定軌道；現在，我們將啟動衛星的自主姿態調整引擎與深空遙測天線，讓系統在廣袤的宇宙中實現永不停歇的自我守護與閉環進化！",
        "layout": "三條核心實踐卡片，底部搭配通往 Stage 6 Maintain 的綠色自愈閉環雷達圖標。"
    }
]
print("Chapter 15 slides:", len(slides))
