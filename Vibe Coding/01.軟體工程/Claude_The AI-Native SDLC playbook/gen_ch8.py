# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 8, "chapter_name": "第 8 章：Stage 3: Build — 制度化知識：Skills 深度應用", "page_num": 1,
        "title": "什麼是 Agent Skills？將機構知識轉化為可執行操作",
        "subtitle": "超越提示詞的模組化外掛：讓特定領域的專業規章成為活生生的能力",
        "takeaway": "Skills 是組織將制度化隱性知識轉化為標準化、版本控制、可廣泛分發且按需加載的模組化能力。",
        "details": [
            "<strong>解決知識膨脹與混亂</strong>：如果把所有 API 規範、資安準則全部塞進 CLAUDE.md，檔案將迅速突破數萬字導致模型癱瘓；Skills 完美實現了按需解耦。",
            "<strong>明確的觸發邊界</strong>：每個 Skill 都有前置的 YAML 元數據宣告『何時應該被觸發』，Agent 只有在處理相關任務時才會精準加載。",
            "<strong>中央集中更新與即時生效</strong>：安全團隊更新了 API 安全標準，全公司所有工程師在下次啟動相關任務時，全自動繼承最新版防禦策略。"
        ],
        "metaphor": "就像急診室醫生隨身攜帶的『專業急救操作指南插卡』：平時不佔用大腦記憶體，但一遇到『心跳驟停』或『劇毒蛇咬傷』，醫生立刻抽取出對應卡片精準施救。",
        "layout": "插卡式模組拓撲圖：Agent 主機作為底座，上方插滿了 API Security、Brand Guideline、DB Migration 等各類專業 Skill 插卡。"
    },
    {
        "chapter_id": 8, "chapter_name": "第 8 章：Stage 3: Build — 制度化知識：Skills 深度應用", "page_num": 2,
        "title": "Skills vs CLAUDE.md vs Prompts：黃金劃分界線",
        "subtitle": "Anthropic 官方經驗法則 (Rule of Thumb)：什麼內容該放在哪裡？",
        "takeaway": "凡是全域必須知曉的一頁內放 CLAUDE.md；凡是單次自定義想法放 Prompt；凡是跨團隊必須一致執行的機構制度放 Skill！",
        "details": [
            "<strong>CLAUDE.md 的職責</strong>：全倉庫開機必讀、建置測試指令、核心架構邊界、全域避坑禁忌（少於 1 頁）。",
            "<strong>Prompts 的職責</strong>：特定具體任務的臨時要求（如：『幫我把這個圖標換成綠色』），一次性消費即丟。",
            "<strong>Skills 的職責</strong>：在組織內執行參差不齊的制度化知識（如 API 安全標準、微服務通訊契約、合規審計埋點），需要被反覆嚴格落實。"
        ],
        "metaphor": "CLAUDE.md 就像公司的『員工守則手冊』；Prompt 就像主管今天交辦的一張『即時便利貼』；而 Skill 則是厚重且權威的『特種設備操作執照認證手冊』。",
        "layout": "三欄矩陣對照表：清晰比較 CLAUDE.md、Prompts 與 Skills 在觸發頻率、生命週期、擁有者與適用場景的本質差異。"
    },
    {
        "chapter_id": 8, "chapter_name": "第 8 章：Stage 3: Build — 制度化知識：Skills 深度應用", "page_num": 3,
        "title": "SKILL.md 檔案剖析：YAML Frontmatter 與指令主體",
        "subtitle": "標準化目錄結構與語法規範：以 .claude/skills/<name>/SKILL.md 為家",
        "takeaway": "一個標準的 Skill 包含兩個關鍵部分：描述觸發條件的 YAML 前置元數據，以及描述具體行動步驟的 Markdown 正文。",
        "details": [
            "<strong>標準路徑約定</strong>：存放在倉庫根目錄的 `.claude/skills/<skill-name>/SKILL.md`，隨著代碼一起納入 Git 版本控制。",
            "<strong>YAML Frontmatter</strong>：定義 `name` 與 `description`。描述必須極其精確地說明『何時觸發（Trigger condition）』，引導 Agent 自動判斷調用時機。",
            "<strong>Markdown 內容主體</strong>：分步驟列出合規清單、參數格式、範例代碼與驗證腳本路徑，讓 Agent 照方抓藥。"
        ],
        "metaphor": "就像藥品包裝盒：正面標註適應症與用藥時機（YAML 元數據：咳嗽發燒時使用），盒子裡面附帶詳細的藥物化學結構與按體重計算的服用劑量說明書（Markdown 正文）。",
        "layout": "雙層結構卡片展示：上半部為藍色背景的 YAML 元數據，下半部為白色背景的具體實施細則。"
    },
    {
        "chapter_id": 8, "chapter_name": "第 8 章：Stage 3: Build — 制度化知識：Skills 深度應用", "page_num": 4,
        "title": "官方實戰範例拆解：secure-api-review 安全審查",
        "subtitle": "Anthropic 原文剖析：對外 API 端點的四大必殺防線",
        "takeaway": "這個官方範例展示了如何用清晰、條理化的規則，在編碼當下徹底杜絕匿名訪問與 PII 外洩。",
        "details": [
            "```markdown\n---\nname: secure-api-review\ndescription: Apply the API security standard. Use whenever creating or\n  modifying an external-facing endpoint, reviewing API code, or\n  generating an OpenAPI spec.\n---\n# Secure API review\n\nWhen you create or change an API endpoint:\n1. Authentication: every endpoint requires the gateway JWT;\n   no anonymous routes outside /health.\n2. Input validation: validate request bodies against the OpenAPI\n   schema and reject unknown fields.\n3. Audit: every state-changing endpoint emits an audit event with\n   actor, action, entity and timestamp.\n4. Data classification: fields tagged pii in the schema must never\n   appear in logs or error messages.\n\nRun scripts/check-endpoints.sh and include its output in your summary.\n```",
            "<strong>強制四項鐵律</strong>：JWT 驗證、嚴格輸入白名單過濾、狀態變更審計事件發射、PII 欄位日誌絕對脫敏。"
        ],
        "metaphor": "宛如民航客機起飛前的『防空識別與地空通信檢查單』：飛行員逐項勾選應答機編碼、高度表氣壓設定與二次雷達校準，漏勾一項禁止推入跑道。",
        "layout": "代碼區塊完整高亮 secure-api-review 全文，四項條例配有醒目的安全盾牌圖示。"
    },
    {
        "chapter_id": 8, "chapter_name": "第 8 章：Stage 3: Build — 制度化知識：Skills 深度應用", "page_num": 5,
        "title": "落地執行四步法：如何將一項團隊規範提煉為 Skill？",
        "subtitle": "從發掘痛點到組織分發的完整工業化落地閉環",
        "takeaway": "執行步驟：挑選一項執行不一致的痛點、協同負責人編寫 SKILL.md、測試觸發靈敏度、透過 Plugin 全局分發。",
        "details": [
            "<strong>步驟一：鎖定一項痛點</strong>：挑選當前團隊中經常被違反的規範（如 API 設計風格、日誌脫敏、品牌前端元件）。",
            "<strong>步驟二：編寫 SKILL.md</strong>：工程師利用 Claude 協助，將資深政策主管的 Word/Wiki 文件轉化為精確的 Markdown 步驟與 YAML 觸發詞。",
            "<strong>步驟三：測試觸發邊界</strong>：用多種不同的用戶提示詞測試，確保 Agent 在該觸發時 100% 喚醒，不相關任務時絕不誤加載。",
            "<strong>步驟四：政策變更與簽核</strong>：政策更新時修改 Skill 並由政策主管審批，全團隊在下次對話中自動無縫繼承新標準。"
        ],
        "metaphor": "就像工業流水線製造模具：先找出手工打磨容易出次品的零件，將標準圖紙雕刻成高強度鋼製模具，試模衝壓確認無瑕疵後，分發給各車間直接衝壓生產。",
        "layout": "四步流程進度條：痛點診斷 → 編寫封裝 → 靈敏度測試 → 組織分發發布。"
    },
    {
        "chapter_id": 8, "chapter_name": "第 8 章：Stage 3: Build — 制度化知識：Skills 深度應用", "page_num": 6,
        "title": "Skills 作為軟約束 (Advisory Control) 的本質局限",
        "subtitle": "清醒認知：Skill 能極大降低犯錯機率，但不能保證 100% 零違規",
        "takeaway": "Skill 屬於諮詢式引導，是基於提示詞層面的『軟約束』；沒有任何物理力量能強制一個對話絕對不會偏離。",
        "details": [
            "<strong>提示詞遵循度的客觀邊界</strong>：即使加載了 Skill，大語言模型在極端複雜或上下文衝擊下，依然存在微小概率遺漏某些條例。",
            "<strong>非確定性本質</strong>：Skill 讓 Agent 傾向於主動遵守規範，在代碼被敲下的當下盡量做對，大幅減少後續審查摩擦。",
            "<strong>硬約束兜底的絕對必要性</strong>：對於必須零容忍、絕不允許有任何例外的底線政策，後端必須配備確定性腳本（Hooks）作為防線！"
        ],
        "metaphor": "Skill 就像是交通警察發放的『安全駕駛宣傳手冊』與路口豎立的『請減速慢行』告示牌：絕大多數司機會自覺遵章守紀，但要防止酒駕衝撞，路口依然必須安裝防撞石墩與阻車釘。",
        "layout": "軟硬約束對比圖：左側展示 Skill 的智力引導與柔性防禦，右側展示確定性防禦的必要性與邊界。"
    },
    {
        "chapter_id": 8, "chapter_name": "第 8 章：Stage 3: Build — 制度化知識：Skills 深度應用", "page_num": 7,
        "title": "軟硬兼施的組合拳架構：Skill 鋪路，Hook 把關",
        "subtitle": "Anthropic 官方推薦的最佳防禦陣型",
        "takeaway": "Skill 負責讓違規行為變得極其罕見 (Rare)，而 Hook 則負責讓違規行為變得完全不可能 (Impossible)！",
        "details": [
            "<strong>前置智力賦能</strong>：Skill 引導 Agent 理解代碼為什麼要這樣寫、給出合規代碼骨架與最佳實務，避免盲人摸象。",
            "<strong>後置確定性截殺</strong>：Hook 在底層監控工具調用，一旦 Agent 偏離規範碰觸受保護路徑或遺漏 JWT，毫秒級截斷執行。",
            "<strong>絕佳的研發體驗</strong>：如果只有 Hook 沒有 Skill，Agent 將像個瞎子一樣不斷撞牆被拒；有了 Skill 引導，Agent 幾乎一次就能走通綠燈路徑。"
        ],
        "metaphor": "這就像一場高等級高爾夫球賽：Skill 是經驗豐富的球童，在耳邊輕聲指點風向、草紋與推桿力道（智力引導）；而球洞周圍的平整果嶺與邊界圍繩（Hook）則保證球絕不會滾落懸崖。",
        "layout": "雙層防禦時序圖：Skill 提示在思考期生效 → Agent 生成合規代碼 → Tool 執行期由 Hook 進行確定性驗收放行。"
    },
    {
        "chapter_id": 8, "chapter_name": "第 8 章：Stage 3: Build — 制度化知識：Skills 深度應用", "page_num": 8,
        "title": "企業級分發管道：透過組織 Plugins 統一管理",
        "subtitle": "告別手動複製貼上，實現全公司幾千個代碼庫的秒級策略同步",
        "takeaway": "利用 Antigravity / Claude Code 的 Plugin 機制，中心平台團隊可將通用 Skills 統一套件化，一鍵下發給全體團隊。",
        "details": [
            "<strong>單一真相源</strong>：所有公共 Skills（如資安規範、日誌庫標準）存放在中心治理倉庫中，由各領域專家集中維護與發行版本。",
            "<strong>自動化依賴訂閱</strong>：各業務專案透過配置文件引入插件，每次 Agent 啟動時自動拉取最新通過測試的穩定 Skill 版本。",
            "<strong>避免標準碎片化</strong>：徹底杜絕『A 團隊還在用三年前的舊 API 規範，B 團隊用自己的土方法』的混亂局面。"
        ],
        "metaphor": "就像手機應用商店的自動靜默更新機制：當國家頒布了新的隱私條例，銀行 App 團隊在後台發布安全更新套件，全球用戶的手機在夜間充電時自動更新完畢，無需用戶手動重新下載安裝。",
        "layout": "分發拓撲圖：中央 Plugin Registry 向幾十個微服務代碼庫輻射推送最新 Skills 套件。"
    },
    {
        "chapter_id": 8, "chapter_name": "第 8 章：Stage 3: Build — 制度化知識：Skills 深度應用", "page_num": 9,
        "title": "驗證與測試 Skill：確保觸發的精準度",
        "subtitle": "如何避免 Skill 成為僵死無效的沉睡文件？",
        "takeaway": "必須為 Skill 建立專屬的觸發測試用例，用多種不同提問方式確認 Agent 確實能被激活動態加載。",
        "details": [
            "<strong>測試正面觸發 (Positive Test)</strong>：嘗試多種表達方式（如『幫我開一個給外部調用的用戶查詢接口』），驗證 `secure-api-review` 確實每次都能被自動載入。",
            "<strong>測試負面排除 (Negative Test)</strong>：提出不相干問題（如『幫我寫一個字串反轉工具函式』），驗證該 Skill 不會被無謂加載污染上下文。",
            "<strong>評估建議落實度</strong>：檢查 Agent 生成的最終代碼，是否確實呼叫了指定的驗證腳本（如 `scripts/check-endpoints.sh`）。"
        ],
        "metaphor": "就像在火災報警系統安裝完成後，安全員手持煙霧噴罐對著每個探測器進行噴煙測試，確保探測器既能在起火時第一秒刺耳報警，又不會因為有人噴香水而頻繁誤報。",
        "layout": "測試驗證矩陣：展示正面觸發測試（綠色勾選）與負面排除測試（灰色排除）的自動化驗收結果。"
    },
    {
        "chapter_id": 8, "chapter_name": "第 8 章：Stage 3: Build — 制度化知識：Skills 深度應用", "page_num": 10,
        "title": "合規與審計：Skill 調用記錄在 Session Trace 中的留痕",
        "subtitle": "證明你在寫代碼時確實遵守了政策的法定證據",
        "takeaway": "Agent 在對話中加載了哪些 Skills，全數被如實記錄在 Session 日誌中，成為日後安全審計的無可辯駁之證。",
        "details": [
            "<strong>追溯代碼合規起因</strong>：當審計員詢問『為什麼這個介面強制使用了特定的 JWT 結構？』工程師能直接調出該 Session 載入該 Skill 的歷史留痕。",
            "<strong>量化制度遵從率</strong>：企業安全主管可透過審查 Session Trace 大數據，統計全公司 API 任務中安全 Skill 的加載率是否達到 100%。",
            "<strong>持續改進依據</strong>：如果發現某些項目雖然觸發了 Skill 但依然需要人工修正，代表 Skill 描述不夠具體，指導安全團隊持續打磨文檔。"
        ],
        "metaphor": "這就像民航客機的『飛行資料記錄器（黑盒子）』：飛機起飛過程中有沒有依照標準作業程序開啟襟翼、有沒有放下起落架，感測器每一秒都有數位訊號留存備查。",
        "layout": "審計日誌 JSON 截圖：展示 Session Trace 中記錄的 Skill 觸發時間戳、版本號與對應代碼生成歷史。"
    },
    {
        "chapter_id": 8, "chapter_name": "第 8 章：Stage 3: Build — 制度化知識：Skills 深度應用", "page_num": 11,
        "title": "第八章實戰總結：讓資深專家的智慧全天候賦能",
        "subtitle": "Stage 3 Build 制度化沉澱核心總結與下章預告",
        "takeaway": "Skills 讓個人智慧昇華為組織集體智慧，但要築起絕對不可攻破的鋼鐵長城，我們必須在下一章請出真正的硬門禁——Hooks！",
        "details": [
            "<strong>核心心法</strong>：將不言自明的潛規則挑出來、封裝為標準 SKILL.md、設定精確 YAML 觸發詞、用 Plugin 全局分發。",
            "<strong>銘記本質</strong>：Skill 是柔性智力引導，它讓違規變稀少；但要讓違規徹底不可能，必須依賴下一章的確定性防衛！",
            "<strong>前瞻第九章</strong>：如何寫一個毫秒級的本地腳本，在 Agent 意圖碰觸受保護目錄時瞬間將其阻斷？第九章 Hooks 將為您揭密！"
        ],
        "metaphor": "每一位資深架構師都無法分身坐在每一位工程師旁邊指導，但透過 Skills，他的智慧與原則宛如分身億萬，安靜地守護在每一次人機協同的鍵盤敲擊旁。",
        "layout": "三條核心實踐卡片，底部搭配通往第九章 Hooks 的鋼鐵防禦箭頭。"
    }
]
print("Chapter 8 slides:", len(slides))
