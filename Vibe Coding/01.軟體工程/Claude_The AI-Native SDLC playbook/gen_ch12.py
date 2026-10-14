# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 12, "chapter_name": "第 12 章：Stage 4: Test — CI 持續評測系統：Continuous Evals", "page_num": 1,
        "title": "AI 時代的 Stage-Gate QA：什麼是 Continuous Evals？", "subtitle": "當傳統 QA 速度跟不上 Agent 產出，評測體系必須走向持續自動化",
        "takeaway": "Evals 是 AI 原生時代等同於傳統階段門禁 QA 的核心機制；它是一套客觀的黃金測試任務庫，用於衡量 Agent 表現是否達標。",
        "details": [
            "<strong>傳統手動 QA 的崩潰</strong>：面對每天數十個由 Agent 生成的 PR，傳統測試團隊按照用例手動點擊已完全無以為繼。",
            "<strong>配置與模型的即時回歸測試</strong>：當團隊更換底層模型、重寫 System Prompt 或修改 Skill 時，Evals 系統能客觀給出通過率指標，回答『能力是否倒退？』",
            "<strong>活生生的演進套件</strong>：Evals 不是死板的考卷，隨著模型能力提升與線上新事故的湧現，用例套件處於持續動態擴充之中。"
        ],
        "metaphor": "這就像國家公務員考試或民航機師的『常態化飛行模擬器複訓考評』：每隔半年，所有機師都必須在模擬器中應對一次雙發失效與強側風降落，分數不達標立刻停飛受訓。",
        "layout": "門禁審核架構圖：中央為 Agent Configuration 變更，右側為必須通過的 Evals Gate 評測防線，綠燈才允許合併。"
    },
    {
        "chapter_id": 12, "chapter_name": "第 12 章：Stage 4: Test — CI 持續評測系統：Continuous Evals", "page_num": 2,
        "title": "提煉真實任務庫：從 20 到 50 個歷史生產任務起步",
        "subtitle": "不要編造玩具用例：黃金評測集必須深植於真實業務泥土",
        "takeaway": "平台工程師挑選 20 到 50 個團隊近期真實完成、且驗收標準清晰的代表性任務，作為基準評測集。",
        "details": [
            "<strong>拒絕脫離實際的合成數據</strong>：從歷史 Git Commit 中挖掘真實的 Bug 修復、功能開發與重構工單，包含真實的代碼上下文與依賴。",
            "<strong>評測用例的標準結構</strong>：每個 Eval 包含兩個核心部分：當時發給 Agent 的原始 Prompt，以及一套客觀可判定的驗證檢查腳本。",
            "<strong>多樣性覆蓋</strong>：涵蓋簡單語法修復、跨檔案重構、API 接口實現、資料庫 Migration 與前端元件開發等各類真實場景。"
        ],
        "metaphor": "如同特種部隊特訓基地：基地內的障礙設施不是憑空捏造的遊樂園道具，而是 1:1 等比例複製了過往最凶險、最慘烈的巷戰街區與反劫機客艙真實場景。",
        "layout": "金字塔架構圖：底部為海量歷史生產任務，中層為篩選出的 50 個精選高頻案例，頂部為標準 JSON 格式的 Eval 用例庫。"
    },
    {
        "chapter_id": 12, "chapter_name": "第 12 章：Stage 4: Test — CI 持續評測系統：Continuous Evals", "page_num": 3,
        "title": "定義嚴格的客觀驗收標準：何謂『Acceptable』？",
        "subtitle": "四維硬性標準：測試通過、Lint 清潔、行為不變、策略遵守",
        "takeaway": "每個 Eval 用例都配備一套多維度的自動檢查腳本，絕不依賴評估員的主觀感受判定。",
        "details": [
            "<strong>維度一：Tests Pass（單元測試全綠）</strong>：生成的代碼必須能編譯並通過該任務對應的單元與整合測試。",
            "<strong>維度二：Lint Clean（語法無警告）</strong>：嚴格遵守專案代碼風格與規範，零 ESLint/Pylint 報警。",
            "<strong>維度三：Behavior Unchanged（未破壞現有行為）</strong>：系統全量回歸測試無衰退，邊界行為完全吻合預期。",
            "<strong>維度四：Policy Followed（恪守組織策略）</strong>：嚴格遵循了相關的 Security Skill，無明文金鑰、無匿名路徑、無日誌 PII。"
        ],
        "metaphor": "如同奧運體操比賽的打分：難度分有嚴格的動作代碼對照表，完成分則對落地晃動、腳尖是否繃直有毫米級的硬性扣分細則，容不得裁判主觀徇私。",
        "layout": "四象限質檢清單：Tests Green、Zero Lint、No Regression、Policy Met，四項全綠方可判定為 PASS。"
    },
    {
        "chapter_id": 12, "chapter_name": "第 12 章：Stage 4: Test — CI 持續評測系統：Continuous Evals", "page_num": 4,
        "title": "CI 自動化觸發時機：定時排程與設定檔變更聯動",
        "subtitle": "為什麼對 CLAUDE.md 的修改必須像代碼一樣接受回歸測試？",
        "takeaway": "評測套件在 CI 中非互動式執行，觸發點為：夜間排程，以及任何對 CLAUDE.md、Skills 或 Hooks 的 PR 修改！",
        "details": [
            "<strong>配置即代碼 (Config as Code)</strong>：`CLAUDE.md`、Skills 與 Hooks 是引導 Agent 大腦行為的指揮棒，對它們的修改同樣具有破壞全局的威力！",
            "<strong>防範提示詞暗中劣化</strong>：有人試圖在 CLAUDE.md 中加了一句看似無害的『請使用簡短變數名』，結果導致變數可讀性暴跌、Evals 通過率急降 20%。",
            "<strong>夜間定時跑批 (Cron Schedule)</strong>：每晚凌晨 2 點全量執行，及時捕獲底層基礎模型（如 Anthropic 雲端模型平滑更新）可能帶來的行為微小漂移。"
        ],
        "metaphor": "這就像給自動化工廠的中央控制程式軟體編寫自動化測試：每當工程師微調了機械手臂的控制算法參數（修改 CLAUDE.md），系統在正式下發到車間前，必須在虛擬沙盒中把 50 種零件全部模擬裝配一遍，確認合格才允許保存。",
        "layout": "GitHub Actions 觸發流程圖：paths: ['CLAUDE.md', '.claude/**'] + schedule: cron: '0 2 * * *' 雙軌觸發時序。"
    },
    {
        "chapter_id": 12, "chapter_name": "第 12 章：Stage 4: Test — CI 持續評測系統：Continuous Evals", "page_num": 5,
        "title": "官方 GitHub Actions 流水線實戰剖析",
        "subtitle": "Anthropic 官方 agent-evals.yml 腳本深度逐行拆解",
        "takeaway": "透過無人值守的非互動模式調用 `claude -p`，結合工具白名單限制，安全高效跑完評測集。",
        "details": [
            "```yaml\nname: Agent evals\non:\n  pull_request:\n    paths: ['CLAUDE.md', '.claude/**']\n  schedule:\n    - cron: '0 2 * * *'\njobs:\n  evals:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm install -g @anthropic-ai/claude-code\n      - name: Run eval suite\n        env:\n          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}\n        run: |\n          for eval in evals/*.json; do\n            claude -p \"$(jq -r '.prompt' $eval)\" \\\n              --allowedTools \"Read,Edit,Bash(make test)\" \\\n              --output-format json > result.json\n            ./evals/check.sh \"$eval\" result.json\n          done\n```",
            "<strong>無人值守核心參數</strong>：`-p` 非互動式執行、`--allowedTools` 嚴格限制只能執行 make test、`--output-format json` 方便機器解析驗證。"
        ],
        "metaphor": "宛如一條全自動軍犬敏捷度巡檢流水線：每一隻特種工作犬被自動引導至 50 道不同難度的跨欄、鑽圈與排雷障礙道，計時器與雷射感測器全程精確記錄每隻犬的通關秒數與犯規次數。",
        "layout": "YAML 代碼區塊完整高亮，旁邊附帶終端日誌循環解析圖標。"
    },
    {
        "chapter_id": 12, "chapter_name": "第 12 章：Stage 4: Test — CI 持續評測系統：Continuous Evals", "page_num": 6,
        "title": "通過率閾值卡點 (Pass-Rate Threshold)：合併的生死線",
        "subtitle": "評測結果如何作為 GitHub PR 的硬性 Status Check？",
        "takeaway": "設定基準通過率門檻（如 90%）；任何導致通過率下跌的配置變更，直接在 PR 阻斷合併，直到作者查明並修復退化。",
        "details": [
            "<strong>數據說話，杜絕主觀臆斷</strong>：不再爭吵『我覺得這個新提示詞更好』，直接看 Evals 分數是上升了 3% 還是下降了 5%。",
            "<strong>機器人自動發佈對比評論</strong>：CI 完成後，自動在 PR 評論區發佈對比表格：列出本次變更修復了哪些歷史用例、又打破了哪些用例。",
            "<strong>團隊領導最終裁決</strong>：如果為了引入重大架構升級而暫時放棄某個過時用例，必須由配置負責人具名批准並同步廢棄舊 Eval。"
        ],
        "metaphor": "這就像汽車出廠的安全防撞星級評定：如果工程師為了追求省油而擅自削薄了車門防撞鋼樑，導致在假人碰撞測試中的保護評分從五星跌落至三星，廠長直接下令整條生產線停產整頓，絕不允許出廠！",
        "layout": "PR 狀態指示卡片：展示紅色的『Evals failed: Pass rate dropped from 94% to 88% (Blocked)』與對比明細清單。"
    },
    {
        "chapter_id": 12, "chapter_name": "第 12 章：Stage 4: Test — CI 持續評測系統：Continuous Evals", "page_num": 7,
        "title": "事故轉測試 (Incidents as Evals)：線上缺陷的終身免疫",
        "subtitle": "每一次生產事故，都必須在當周沉澱為一個全新的 Eval 用例",
        "takeaway": "由發生事故的負責團隊，將該事故提煉為一個標準 Eval，永久收錄至評測集，確保 Agent 永遠不會重蹈覆轍。",
        "details": [
            "<strong>事故調查的閉環終點</strong>：傳統事後覆盤會議 (Post-mortem) 往往寫完報告就束之高閣；AI-Native 模式下，必須以提交一個 PR 新增 Eval 為結案標誌。",
            "<strong>重現環境與邊界條件</strong>：將觸發線上當機的特定邊界輸入、網路重試風暴或資料庫競爭條件，提煉為單一測試 JSON。",
            "<strong>防禦性資產的滾雪球效應</strong>：經過三年運轉，你的 Evals 套件將累積數百個高價值的實戰防禦用例，構成企業最寬廣的技術護城河！"
        ],
        "metaphor": "這就像現代疫苗的研發歷程：每次世界上出現了一種新型突變病毒（線上故障），生物學家在治癒病人的同時，立刻提取病毒樣本滅活製成標準抗原，並加入到全體新生兒的必打疫苗接種清單中，實現全種族的終身群體免疫！",
        "layout": "事故轉化循環箭頭：生產事故 (Incident) → 根因分析 (RCA) → 提煉為 eval.json → 納入 CI 全局套件 → 永不復發。"
    },
    {
        "chapter_id": 12, "chapter_name": "第 12 章：Stage 4: Test — CI 持續評測系統：Continuous Evals", "page_num": 8,
        "title": "動態演進與汰換機制：避免測試用例飽和鈍化",
        "subtitle": "隨著底層大模型智力提升，如何維持評測集的區分度 (Discrimination)？",
        "takeaway": "當新一代模型讓舊用例輕鬆達到 100% 全綠時，這些用例將失去區分能力，必須引入更高難度的真實任務。",
        "details": [
            "<strong>天花板飽和效應 (Ceiling Effect)</strong>：一年前對 Claude 3 Sonnet 極其困難的並發鎖定問題，Claude 3.5 可能一秒解出；若只依賴舊用例，將無法衡量高階邊界。",
            "<strong>分級保留歷史資產</strong>：將已輕鬆通過的舊用例降級為『回歸底線套件（耗時短、每 PR 必跑）』，將精力聚焦於最新編寫的『挑戰者套件』。",
            "<strong>淘汰過時與錯誤假設</strong>：業務重構後已經不適用的業務邏輯用例，必須有秩序地被淘汰，避免無效紅燈阻礙創新。"
        ],
        "metaphor": "就像中學數學奧林匹克競賽題庫：十年前被列為決賽壓軸題的難題，現在隨著教學水準提升已經變成初中課後思考題；國家隊選拔必須持續引進由數學家新設計的高階前沿競賽題目。",
        "layout": "梯隊演進圖：第一梯隊『前沿挑戰集 (新模型區分)』、第二梯隊『核心生產集 (日常 PR 門禁)』、第三梯隊『歷史基線集 (夜間跑批)』。"
    },
    {
        "chapter_id": 12, "chapter_name": "第 12 章：Stage 4: Test — CI 持續評測系統：Continuous Evals", "page_num": 9,
        "title": "離線與在線的節奏權衡：成本與反饋的平衡點",
        "subtitle": "不是所有團隊都需要在每一次 Git Push 都跑全量 Evals",
        "takeaway": "根據團隊規模與預算，靈活選擇『輕量級 PR 即時門禁』或『夜間/每週離線定時跑批』的混合策略。",
        "details": [
            "<strong>全量評測的成本考量</strong>：跑完 50 個複雜任務可能消耗數百萬 Token 與 15 分鐘的 CI 資源，每次普通代碼 Push 都跑成本過高。",
            "<strong>精準路徑過濾 (Path Filtering)</strong>：只有在 PR 觸及了 `CLAUDE.md` 或 `.claude/**` 時才觸發 Evals；普通業務代碼變更只跑傳統單元測試。",
            "<strong>階梯式執行頻次</strong>：精選 5 個核心金絲雀用例在 PR 實時跑（<3分鐘），全量 50 個用例留給夜間 Cron 執行，完美平衡成本與防禦。"
        ],
        "metaphor": "這就像銀行金庫的安全檢查：營業期間每筆大額存取款只進行指紋與密碼驗證（輕量即時檢查）；而在每天營業結束、大門關閉後的深夜，安保部隊會帶著防暴犬進行全館拉網式紅外線徹底大排查（離線全量檢查）。",
        "layout": "成本效益天平矩陣：橫軸為執行頻率，縱軸為 Token 預算與時間耗時，清晰標註出最優混合實踐點。"
    },
    {
        "chapter_id": 12, "chapter_name": "第 12 章：Stage 4: Test — CI 持續評測系統：Continuous Evals", "page_num": 10,
        "title": "評測大數據與歷史趨勢洞察：組織級效能儀表板",
        "subtitle": "用長期數據證明 AI-Native SDLC 對組織工程效能的真正貢獻",
        "takeaway": "記錄每一次 Evals 的詳細指標，將其視覺化為歷史趨勢圖，讓管理層清晰洞悉團隊工程智力的演進歷程。",
        "details": [
            "<strong>量化指標體系</strong>：追蹤 Pass Rate（通過率走勢）、Token Efficiency（平均解決問題耗費的 Token 數量）、Task Duration（自主解決時長）。",
            "<strong>評估模型升級收益</strong>：當 Anthropic 發布新版模型時，在同一套 Evals 上運行基準測試，用客觀數據向領導層展示『升級後研發提速 30%、錯誤率下降 15%』的量化依據。",
            "<strong>識別系統性架構短板</strong>：如果發現涉及資料庫事務的用例經常不及格，精準指導架構團隊在該領域加強專屬 Skill 或重構 SDK。"
        ],
        "metaphor": "這就像專業運動員的『生理機能大數據監控雷達圖』：長期記錄心率、最大攝氧量與肌肉耐力變化曲線，教練團隊能精準發現運動員是在體能儲備期還是在競技巔峰期，並制定科學的訓練計畫。",
        "layout": "效能儀表板視覺化展示：包含通過率隨時間推移的平滑攀升曲線、不同模組的能力雷達圖與 Token 消耗散佈圖。"
    },
    {
        "chapter_id": 12, "chapter_name": "第 12 章：Stage 4: Test — CI 持續評測系統：Continuous Evals", "page_num": 11,
        "title": "第十二章實戰總結：為 Agent 智力打造永不磨損的度量衡",
        "subtitle": "Stage 4 Test 評測體系圓滿收官與下章預告",
        "takeaway": "Continuous Evals 讓 AI 原生研發擺脫了玄學與主觀臆斷，賦予了團隊客觀、科學、可度量的工業級品質保證！",
        "details": [
            "<strong>四大核心心法</strong>：收集 20~50 個真實案例、四維客觀驗收標準、配置變更嚴格卡點、事故第一時間轉化為用例。",
            "<strong>代碼與大腦雙重合格</strong>：至此，代碼本身已經通過了本地 Feedback Loop，引導 Agent 的配置也通過了 Continuous Evals 的淬煉！",
            "<strong>前瞻第十三章</strong>：這批高品質代碼即將被推送到 GitHub 建立 Pull Request，如何讓 AI 深度融入 PR 審查？第十三章『AI in the PR review loop』將為您揭示全新玩法！"
        ],
        "metaphor": "巴黎國際度量衡局深處保存著由鉑銥合金製成的『國際千克原器』，世界因精確的標準而建立信任；Continuous Evals 就是我們為整個軟體研發工廠鑄造的那枚永不磨損的品質原器！",
        "layout": "三條核心實踐卡片，底部搭配通往 Stage 5 Deploy 的發布火箭箭頭。"
    }
]
print("Chapter 12 slides:", len(slides))
