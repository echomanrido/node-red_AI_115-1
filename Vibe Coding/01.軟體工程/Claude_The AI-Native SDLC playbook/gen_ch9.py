# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 9, "chapter_name": "第 9 章：Stage 3: Build — 確定性防禦：Build-time Hooks", "page_num": 1,
        "title": "確定性防線的不可替代性：為什麼需要 Hooks？", "subtitle": "當柔性提示詞面臨嚴苛合規時，必須有一道實體物理防線",
        "takeaway": "Hooks 是底層的確定性腳本層，在 Agent 執行文件修改或終端命令的微秒瞬間進行強制攔截。",
        "details": [
            "<strong>Prompt 不是防彈衣</strong>：提示詞存在微小機率被繞過或忽視，在受監管行業中，『99% 遵守』等同於『0% 合規』。",
            "<strong>建置階段是最高頻戰場</strong>：在實作期間，Agent 絕大部分動作都是調用 File Edit 與 Shell Bash，這正是 Hooks 大顯身手的最佳卡點。",
            "<strong>毫秒級本地攔截</strong>：不依賴昂貴的雲端 API 往返，純本地 Shell/Python 腳本瞬間完成正則與路徑檢驗，零延遲守護環境。"
        ],
        "metaphor": "如果說 Skill 是航海圖上的暗礁標註，那麼 Hook 就是船頭配備的高靈敏度聲納自動防撞制動器，一旦探測到距離礁石只有十米，自動切斷主機動力，絕不由人機爭辯。",
        "layout": "雙層防禦架構圖：外層為 Skill 智慧導引，內層為厚實的 Hook 鋼鐵閘門，精準卡位在 Agent 與作業系統核心之間。"
    },
    {
        "chapter_id": 9, "chapter_name": "第 9 章：Stage 3: Build — 確定性防禦：Build-time Hooks", "page_num": 2,
        "title": "三大典型守護場景：保護路徑、格式化與憑證防洩",
        "subtitle": "Anthropic 官方推薦的建置期三大必備 Hook 策略",
        "takeaway": "Build-time Hooks 的核心任務：阻斷受保護路徑修改、自動執行 Formatter 防止漂移、杜絕金鑰憑證外洩。",
        "details": [
            "<strong>場景一：阻斷保護路徑編輯</strong>：禁止 Agent 篡改自動生成的程式碼類（如 `src/gen/`）、資料庫遷移歷史或已凍結的舊版本包（`v1/`）。",
            "<strong>場景二：即時自動格式化與 Lint</strong>：在檔案編輯後自動調用 prettier/eslint，將代碼風格差異消滅在萌芽狀態，保持 Git 歷史乾淨。",
            "<strong>場景三：憑證與金鑰硬攔截</strong>：即時掃描即將寫入的文本，一旦發現匹配 AWS Key、JWT Token 或私鑰正則，立刻暴力中斷！"
        ],
        "metaphor": "這就像在精密晶圓廠車間門口安裝的三道感應閘門：第一道攔截未授權人員進入核心光刻區（保護路徑），第二道強制吹風除塵（格式化），第三道金屬探測器攔截未報備電子設備（憑證防洩）。",
        "layout": "三防衛盾牌卡片：分別展示 Protected Paths、Auto-formatters、Secret Detection 的實體過濾邏輯。"
    },
    {
        "chapter_id": 9, "chapter_name": "第 9 章：Stage 3: Build — 確定性防禦：Build-time Hooks", "page_num": 3,
        "title": "輕量快速原則 (Fast and Scoped)：避免拖垮心流",
        "subtitle": "為什麼全量單元測試絕對不能放在 Build Hook 裡？",
        "takeaway": "Build 階段的 Hook 必須極速運行（<100ms），且嚴格限制在當前修改的單一檔案範圍內。",
        "details": [
            "<strong>微秒級響應要求</strong>：Agent 在寫代碼時可能一分鐘內進行十幾次微調，如果每次保存都要等待 2 分鐘跑完整個測試套件，心流將被徹底摧毀。",
            "<strong>分層把關哲學</strong>：輕量檢查（路徑白名單、語法 Lint、格式化）放在每次動作的 Hook；重量級全量測試與安全掃描留到 Commit 或 PR 階段。",
            "<strong>單檔案聚焦 (Scoped)</strong>：只針對 `$TOOL_INPUT` 中正在改動的單一檔案進行檢驗，絕不引發跨模組的連鎖編譯負擔。"
        ],
        "metaphor": "如同高速公路上的收費閘口：ETC 電子感應器必須在 0.1 秒內完成扣款抬桿（輕量 Hook），你絕不能在收費口強迫司機把整輛車拆開進行全面的年度汽車大修檢驗（全量測試）。",
        "layout": "時間軸對比圖：展示 <50ms 的輕量級 Hook 順暢流動，與耗時 >30s 的臃腫 Hook 導致終端徹底凍結的災難對比。"
    },
    {
        "chapter_id": 9, "chapter_name": "第 9 章：Stage 3: Build — 確定性防禦：Build-time Hooks", "page_num": 4,
        "title": "PreToolUse 攔截機制：在動作生效前奪回控制權",
        "subtitle": "Anthropic 架構深度揭秘：Tool 調用前的最後審判",
        "takeaway": "PreToolUse Hook 賦予系統在 Agent 的意圖轉化為真實系統調用之前，進行檢查與裁決的絕對權力。",
        "details": [
            "<strong>標準 JSON 輸入通道</strong>：Claude 在決定調用工具時，底層將工具名稱與入參打包為標準 JSON，透過 stdin 管道輸入給 Hook 腳本。",
            "<strong>透明深入的參數檢查</strong>：腳本利用 `jq` 輕鬆解析 Agent 意圖編輯的檔案名、寫入的內容片段或打算執行的終端 Shell 命令。",
            "<strong>三大裁決走向</strong>：允許執行 (Allow, exit 0)、攔截阻斷 (Block, exit 2)，或在發布階段轉交人類審批 (Ask)。"
        ],
        "metaphor": "就像最高法院法官在行政命令正式加蓋國璽、頒布生效的前一秒，擁有憲法賦予的緊急禁制令簽發權，一票否決任何違憲指令。",
        "layout": "資料管道時序圖：Agent Tool Use Intent → stdin 注入 Hook 腳本 → jq 解析入參 → 輸出 Exit Code 裁決結果。"
    },
    {
        "chapter_id": 9, "chapter_name": "第 9 章：Stage 3: Build — 確定性防禦：Build-time Hooks", "page_num": 5,
        "title": "阻斷與自省：退出碼 2 (Exit 2) 與友善引導",
        "subtitle": "好的 Hook 不僅要能殺人，更要能教人：引導 Agent 自我修正",
        "takeaway": "當 Hook 決定阻斷時，必須退出碼為 2，並將清晰的阻斷原因與合規路徑寫入 stderr，讓 Agent 能立刻調整策略。",
        "details": [
            "<strong>標準退出碼語意</strong>：Exit 0 表示完全合規、批准執行；Exit 2 表示確定性阻斷，且 stderr 中的文字將直接作為環境反饋回傳給 Claude。",
            "<strong>提供清晰的導航指南</strong>：不要只冷冰冰地印出『Permission Denied』，而應輸出：『禁止修改 v1/legacy 目錄；所有新功能必須實現在 v2/ 目錄下』。",
            "<strong>激發 Agent 的自我調整</strong>：Claude 讀到這條錯誤提示後，會立即向工程師致歉，並在 plan.md 中調整路徑，重新在合規目錄下建立檔案！"
        ],
        "metaphor": "就像迷宮裡的智慧防撞牆：當老鼠撞上牆壁時，牆壁不是放電把它電死，而是亮起一個語音箭頭指示：『此路不通，請向右轉進入第二號通道』。",
        "layout": "雙向終端反饋圖：展示 Hook 輸出 Exit 2 包含詳細提示，Claude 收到提示後自動改變實作路徑的智能適應過程。"
    },
    {
        "chapter_id": 9, "chapter_name": "第 9 章：Stage 3: Build — 確定性防禦：Build-time Hooks", "page_num": 6,
        "title": "保護測試防篡改：捍衛驗證真偽性的防護罩",
        "subtitle": "杜絕 Agent 投機取巧：任何修復任務禁止改動現有測試",
        "takeaway": "在 Bug 修復任務中，必須透過 Hook 物理封死對測試目錄的寫入權限，確保紅燈變綠燈是真正修復了業務代碼。",
        "details": [
            "<strong>Agent 的偷懶本能 (Short-circuiting)</strong>：有時為了讓測試通過，模型可能會投機取巧地把斷言改小（例如將 `assert result == 100` 改為 `assert result >= 0`）。",
            "<strong>測試檔案防竄改 Hook</strong>：當當前任務為 Bug Fix 時，Hook 匹配 `test/**` 或 `*_test.go` 檔案路徑，一旦有寫入意圖直接 exit 2 阻斷。",
            "<strong>確保綠燈含金量 100%</strong>：被保護的測試套件是系統唯一的尺規；唯有尺規不可動搖，測量出來的品質才是真金白銀。"
        ],
        "metaphor": "這就像在高考考場上，考生絕不可能被允許拿著紅筆去修改試卷評分標準答案；你只能竭盡全力把題目算對，絕不能把答案卷的標準改成你算錯的數字。",
        "layout": "天平圖示：左側為受保護的不可篡改測試檔案（標註防護罩），右側為被嚴格檢驗的業務代碼。"
    },
    {
        "chapter_id": 9, "chapter_name": "第 9 章：Stage 3: Build — 確定性防禦：Build-time Hooks", "page_num": 7,
        "title": "為什麼不能在 Build 階段放入真人審批彈窗？",
        "subtitle": "避免人肉塞車：把需要人批准的關卡留給 Stage 5 Deploy",
        "takeaway": "建置期的 Hook 必須是『全自動允許或阻斷』，絕不能彈窗等待真人確認，否則將徹底摧毀並行多線作業。",
        "details": [
            "<strong>並行架構的致命毒藥</strong>：當一位工程師在背景掛著三個 Worktrees 同時跑任務時，任何一個終端彈出人肉確認，都會直接凍結該任務的心流。",
            "<strong>非黑即白的建置邏輯</strong>：建置期間要麼合規放行、要麼違規阻斷；凡是需要人類判斷『是否放行發布』的權力，統一收攏至 Stage 5 的 Release Gate。",
            "<strong>維持極致吞吐量</strong>：讓 Agent 在安全沙盒內全速前進，人的注意力只在起點（Plan）和終點（PR Review/Deploy）進行高品質裁決。"
        ],
        "metaphor": "就像在半導體無人全自動無塵室晶圓傳送流水線上，你絕不能在兩台精密光刻機之間安排一個人工收費亭，每送一片晶圓就得人工蓋一次章，整個千億產線將瞬間癱瘓。",
        "layout": "架構警示對比圖：展示 Build 階段插入人工審批導致的所有線程卡死紅燈，與統一收口至 Deploy 階段的順暢綠燈。"
    },
    {
        "chapter_id": 9, "chapter_name": "第 9 章：Stage 3: Build — 確定性防禦：Build-time Hooks", "page_num": 8,
        "title": "設定檔配置範例：.claude/settings.json 語法拆解",
        "subtitle": "如何用幾行簡潔的 JSON 聲明一個全局匹配的 PreToolUse Hook？",
        "takeaway": "標準配置直觀優雅，支援按工具類型（Bash、FileEdit）進行正則匹配並掛載執行腳本。",
        "details": [
            "```json\n{\n  \"hooks\": {\n    \"PreToolUse\": [\n      {\n        \"matcher\": \"Bash\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"${CLAUDE_PROJECT_DIR}/.claude/hooks/protect-secrets.sh\"\n          }\n        ]\n      }\n    ]\n  }\n}\n```",
            "<strong>變數精準尋址</strong>：`${CLAUDE_PROJECT_DIR}` 自動解析當前工程根目錄，保證跨平台與團隊成員路徑一致性。",
            "<strong>多工具疊加防護</strong>：可同時為 `Bash`、`FileEdit`、`FileWrite` 等多個核心工具掛載專屬的校驗鏈條。"
        ],
        "metaphor": "宛如現代智能家居的自動化觸發器設定：『當感測器偵測到窗戶被打開時（Matcher），立刻執行拉響警報器腳本（Command）』，簡明扼要且嚴密可靠。",
        "layout": "JSON 語法高亮卡片，各欄位旁附帶浮動標籤解釋其作用與匹配邏輯。"
    },
    {
        "chapter_id": 9, "chapter_name": "第 9 章：Stage 3: Build — 確定性防禦：Build-time Hooks", "page_num": 9,
        "title": "保護機密實戰腳本：protect-secrets.sh 實作剖析",
        "subtitle": "短短十行 Shell，如何在終端底層築起防洩密天羅地網？",
        "takeaway": "透過讀取 stdin 中的命令文本，用 grep 正則瞬間甄別潛在私鑰與機密外洩風險。",
        "details": [
            "```bash\n#!/bin/bash\n# 讀取 Claude 即將執行的命令文本\ncmd=$(jq -r '.tool_input.command // empty' < /dev/stdin)\nif [ -z \"$cmd\" ]; then exit 0; fi\n\n# 檢驗是否包含關鍵機密檔或特權指令\nif echo \"$cmd\" | grep -E -q '(id_rsa|\\.env|AWS_SECRET|credentials)'; then\n  echo \"[Security Hook] 嚴重阻斷：檢測到指令觸及敏感憑證路徑！\" >&2\n  echo \"請改用環境變數注入或聯絡安全團隊授權。\" >&2\n  exit 2\nfi\nexit 0\n```",
            "<strong>攔截即銷毀</strong>：命令在尚未送達作業系統內核前就被徹底掐死，日誌中絕不留下任何洩密痕跡。"
        ],
        "metaphor": "這就是防毒軟體中的『實時啟發式文件防火牆』，在病毒即將被雙擊運行的千分之一秒前，內核驅動瞬間將其隔離封裝。",
        "layout": "代碼區塊完整展示 protect-secrets.sh，並標註 stdin 讀取、正則判定與 Exit 2 阻斷三大環節。"
    },
    {
        "chapter_id": 9, "chapter_name": "第 9 章：Stage 3: Build — 確定性防禦：Build-time Hooks", "page_num": 10,
        "title": "受管設定 (Managed Settings) 的不可覆蓋性",
        "subtitle": "防止個別員工擅自關閉防禦：全組織維度的強制策略繼承",
        "takeaway": "企業非妥協性 (Non-negotiable) 的底線 Hooks 存放於受管系統目錄，個別工程師在本地配置中無法停用或覆蓋。",
        "details": [
            "<strong>個人設定與組織設定的層次劃分</strong>：工程師可在 `.claude/settings.json` 中添加輔助個人習慣的友善 Hook。",
            "<strong>管理員策略強制覆蓋</strong>：由 IT/Platform 部署於系統級目錄（如 `/etc/claude/` 或 Windows 註冊表策略）的受管配置擁有最高優先權。",
            "<strong>合規合法的基石</strong>：即使工程師本地誤刪了 `.claude/` 目錄，核心安全攔截網依然在全局生效，徹底滿足 SOC2/ISO27001 審計標準。"
        ],
        "metaphor": "如同公司發配的商務筆記本電腦：員工可以自由更換桌面壁紙和滑鼠游標（個人設定），但硬碟全盤加密 BitLocker 與企業防毒軟體，員工哪怕擁有管理員權限也絕對無法解除卸載（受管設定）。",
        "layout": "雙層配置覆蓋圖：上層個人配置遇到下層組織受管配置時，衝突條款強制以受管策略為準。"
    },
    {
        "chapter_id": 9, "chapter_name": "第 9 章：Stage 3: Build — 確定性防禦：Build-time Hooks", "page_num": 11,
        "title": "第九章實戰總結：將安全性深植於每一次工具調用",
        "subtitle": "Stage 3 Build 確定性防禦核心總結與下章預告",
        "takeaway": "Hooks 與 Skills 構成了軟硬一體的絕妙防禦組合拳，讓團隊既能放手奔馳，又永遠高枕無憂！",
        "details": [
            "<strong>核心公式</strong>：輕量化腳本 + 嚴格範圍限定 + PreToolUse 毫秒截殺 + Exit 2 智能自省引導。",
            "<strong>安全基線已立</strong>：至此，我們已經為建置期打造了完整的智慧大腦（CLAUDE.md）、專業外掛（Skills）與防禦裝甲（Hooks）。",
            "<strong>前瞻第十章</strong>：單兵作戰已經無懈可擊，如何進一步組織大規模 Agent 兵團並行推進？第十章『Parallel Sessions & Subagents』將帶您進入集群協同的新紀元！"
        ],
        "metaphor": "當鋼鐵裝甲已經武裝到牙齒，每一發子彈都有智慧制導與自爆保險，現在正是吹響衝鋒號角、調集千軍萬馬協同作戰的黃金時刻！",
        "layout": "三條核心實踐卡片，底部搭配通往第十章並行協同的高亮躍遷箭頭。"
    }
]
print("Chapter 9 slides:", len(slides))
