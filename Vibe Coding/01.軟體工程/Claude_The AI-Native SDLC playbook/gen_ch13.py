# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 13, "chapter_name": "第 13 章：Stage 5: Deploy — AI 驅動程式碼審查：PR Review Loop", "page_num": 1,
        "title": "雙向奔赴的審查革命：Claude 既受審，亦審人", "subtitle": "打破傳統單向審核局限：AI 在 Pull Request 討論串中的全景角色",
        "takeaway": "Claude 在審查循環中具備雙重身分：它既作為資深審查員主動檢驗 PR 代碼，又作為修復者在評論區中聽從反饋推動修復。",
        "details": [
            "<strong>審查人寫的代碼</strong>：對人類工程師提交的 PR 進行細緻排查，找出潛在併發死鎖、邊界未處理或安全漏洞。",
            "<strong>自我修正自己的 PR</strong>：當它自己發起 PR 或收到人類 Reviewer 的修改意見時，能精準理解上下文並推代碼修復。",
            "<strong>解放人類工程師的核心認知</strong>：將資深審查員從繁雜的排版、常規邏輯與語法除錯中抽身，專注於判斷『這項業務意圖是否符合當前戰略』與『系統架構風險評估』。"
        ],
        "metaphor": "就像一家老字號律師事務所裡的兩位搭檔：年輕的主力律師（Claude）負責審閱厚達數百頁的合同文本、標註違約風險條款並起草補充協議；而資深合夥人（人類負責人）只需點上一支雪茄，快速翻看摘要並在最後簽字蓋章確認大方向。",
        "layout": "雙向循環圖：左側展示 Claude Reviewer 給出審查意見，右側展示 Claude Fixer 收到反饋後自動提交代碼修復，人類居中把關。"
    },
    {
        "chapter_id": 13, "chapter_name": "第 13 章：Stage 5: Deploy — AI 驅動程式碼審查：PR Review Loop", "page_num": 2,
        "title": "託管服務 vs CI Actions：兩種主流實踐架構",
        "subtitle": "Anthropic Managed Code Review vs 自建 claude-code-action",
        "takeaway": "依據企業安全邊界與雲端策略，自由選擇『一鍵託管的 SaaS 服務』或『自託管在私有 CI/CD 的 GitHub Action』。",
        "details": [
            "<strong>託管 Code Review 服務（極速啟動）</strong>：管理員在後台點選倉庫即可啟用，由 Anthropic 基礎設施自動監聽 PR 並發布審查結果，維護成本為零。",
            "<strong>自建 claude-code-action（深度可控）</strong>：在組織自身的 GitHub Actions 流水線中執行，所有 API 調用經由企業私有的 AWS/GCP 專用合約路由，數據嚴格不離境。",
            "<strong>統一的體驗基線</strong>：兩種方式皆完整支援 `@claude` 標籤對話與自動修復循環，兼顧了便利性與合規嚴肅性。"
        ],
        "metaphor": "這就像企業差旅出行：你可以直接使用全託管的五星級酒店行政禮賓車隊服務（Managed Service，省心高質）；也可以在內部成立自己的特種專屬車隊並配備專職私家司機（自建 Action，絕對排他與自主掌控）。",
        "layout": "雙軌架構對照圖：左側展示 Anthropic 託管通道，右側展示企業內部 VPC 與自建 GitHub Runner 專用隧道。"
    },
    {
        "chapter_id": 13, "chapter_name": "第 13 章：Stage 5: Deploy — AI 驅動程式碼審查：PR Review Loop", "page_num": 3,
        "title": "REVIEW.md 審查憲章：為 AI 審查員劃定法規",
        "subtitle": "Anthropic 核心實務：根目錄下的 REVIEW.md 到底該寫什麼？",
        "takeaway": "REVIEW.md 是整個 PR 審查的最高法規，精確定義了三道審查通道、何謂重要問題 (Important)，以及瑣碎問題的容忍上限。",
        "details": [
            "<strong>劃分三大必審通道</strong>：Bugs（邏輯漏洞與邊界崩潰）、Security（注入攻擊、認證缺失與日誌洩密）、Compliance（對齊 spec.md 與 plan.md）。",
            "<strong>重新定義 Important（重要性）</strong>：嚴格規定只有會引發功能故障、資料外洩或違背政策的發現才算 Important；變數命名或括號換行純屬 Nit（瑣碎瑕疵）。",
            "<strong>禁止回報噪音路徑</strong>：明確列出排除清單（如 `src/gen/` 自動生成代碼，或編譯器 CI 已經強制檢驗的格式）。"
        ],
        "metaphor": "就像法庭上的『陪審團審判指引手冊』：法官嚴肅告誡陪審員，你們的職責是判定被告是否有意實施了重大違法行為（Bugs & Security），絕不能因為嫌棄被告衣服上有褶皺或領帶不對稱（Nits）而宣告他有罪。",
        "layout": "REVIEW.md 結構解析圖：三大檢查通道徽章、Important 判定標準、排除清單與評估權重分布。"
    },
    {
        "chapter_id": 13, "chapter_name": "第 13 章：Stage 5: Deploy — AI 驅動程式碼審查：PR Review Loop", "page_num": 4,
        "title": "官方實戰範例拆解：REVIEW.md 黃金模板",
        "subtitle": "Anthropic 原生指南：不到二十行的極致精煉審查政策",
        "takeaway": "這份官方範例徹底解決了傳統靜態掃描工具滿屏紅字報警、卻沒有人願意看的致命痛點。",
        "details": [
            "```markdown\n# Review instructions\n\n## Passes\nRun three passes and tag each finding with its pass:\n- Bugs: logic errors, broken edge cases, subtle regressions\n- Security: injection risks, authentication gaps, PII in logs\n- Compliance: the change matches spec.md, plan.md and our design principles\n\n## What Important means here\nReserve Important for findings that would break behavior, leak data\nor breach a policy. Style and naming are nits.\n\n## Cap the nits\nReport at most five nits per review; summarize the rest as a count.\n\n## Do not report\nGenerated files under src/gen/ and anything CI already enforces.\n```",
            "<strong>壓制瑣碎問題 (Cap the nits)</strong>：『每次審查最多只允許報告 5 個 Nits，其餘全數合併為一個統計數字』，徹底杜絕無效噪音！"
        ],
        "metaphor": "宛如一份外科專家的『重症巡房手冊』：巡房時只許把血壓異常、術後大出血或嚴重感染等致命指標當面大聲報告（Important）；病房床單微皺（Nits）一天最多提一次，絕不許喋喋不休打擾主刀救人。",
        "layout": "代碼區塊高亮展示 REVIEW.md 全文，重點註解『Cap the nits 規則』與『三道審查通道』。"
    },
    {
        "chapter_id": 13, "chapter_name": "第 13 章：Stage 5: Deploy — AI 驅動程式碼審查：PR Review Loop", "page_num": 5,
        "title": "審查結果不具備投票權：堅守 Code Owner 批准防線",
        "subtitle": "AI 可以吹哨，但絕對沒有按下 Merge 的最終權力",
        "takeaway": "AI 審查的發現（Findings）本身絕不能自動 Approve 或 Block PR，分支保護規則依然強制要求具名人類 Code Owner 批准。",
        "details": [
            "<strong>職責分離的鐵律</strong>：AI 審查員提供情報與客觀記分板，但法定的合併責任始終由具備實體身分的工程師承擔。",
            "<strong>機器可讀的嚴重等級統計</strong>：Check Run 會將 Critical、Warning、Nit 統計為機器可讀的結構化數據，平台工程師可設定門禁閾值（例如 Critical > 0 禁止點擊 Merge）。",
            "<strong>輔助而非替代</strong>：人類審核者打開 PR 時，首先看的是 AI 整理出的這份精華記分卡，帶著精確的情報直接切入問題核心。"
        ],
        "metaphor": "這就像足球場上的 VAR 影像輔助裁判系統：高科技攝影機與 AI 越位偵測線能清晰標記出球員是否越位，但在大螢幕前做出最後判罰手勢並吹響哨子的，永遠是奔跑在草皮上的主裁判本人。",
        "layout": "職責權限邊界圖：AI 負責『掃描排查、統計記分、提供建議』，人類 Code Owner 獨占『最終評定、責任擔當、點擊 Merge』。"
    },
    {
        "chapter_id": 13, "chapter_name": "第 13 章：Stage 5: Deploy — AI 驅動程式碼審查：PR Review Loop", "page_num": 6,
        "title": "@claude 交互修復循環：在評論串中直接推代碼",
        "subtitle": "告別手動切換分支、修改、commit、push 的繁瑣套路",
        "takeaway": "無論是審查者還是作者，只要在 PR 評論中 @claude，Claude 將自動解析上下文、在背景修改代碼並將 Fix 提交至該分支。",
        "details": [
            "<strong>自然語言驅動代碼修補</strong>：工程師在第 42 行代碼旁留下評論：`@claude 這裡缺少對負數輸入的邊界校驗，請幫我補充單元測試並防禦`。",
            "<strong>自動產生修復 Commit</strong>：Claude 讀取 PR 歷史與評論內容，在幾十秒內向該 Pull Request 推送一個乾淨的修復提交，並在討論串中回覆說明。",
            "<strong>雙向透明的審計歷史</strong>：每一次業務要求與對應的代碼修正，完整作為評論與 Commit 記錄在 PR 歷史中，條理清晰無懈可擊。"
        ],
        "metaphor": "就像主編在審稿時用紅筆在稿件旁畫了一個圈並寫上『第三段論證論據不足，請補充最新統計局數據』，幾分鐘後，特約助手立刻端來重新修訂裝訂完畢的最新稿件附在下方。",
        "layout": "PR 對話串截圖模擬：人類提出修復意見 → @claude 標籤觸發 Worker → 自動推送 Commit 0a4f3b → 評論串自動回報更新完畢。"
    },
    {
        "chapter_id": 13, "chapter_name": "第 13 章：Stage 5: Deploy — AI 驅動程式碼審查：PR Review Loop", "page_num": 7,
        "title": "PR 保姆式全自動托育 (PR Babysitting)",
        "subtitle": "團隊高階玩法：自訂斜線指令，讓 Claude 陪跑 PR 直到綠燈",
        "takeaway": "編寫自訂指令讓 Claude 掃蕩 PR 上所有未解決的評論與失敗的 Check，自動推代碼修復，直到萬事俱備只差人眼點擊！",
        "details": [
            "<strong>自動清道夫 (Sweep the PR)</strong>：當 PR 提交後，自動掃描所有靜態檢查紅燈、單元測試失敗與 Reviewer 的未解決反饋。",
            "<strong>連續自主修復推進</strong>：逐一攻克所有報錯，自動推代碼，直到所有 CI 測試再次亮起全綠燈號。",
            "<strong>等待人類最後一瞥</strong>：當所有機器阻礙全數掃除，PR 處於『完全綠燈、等待 Code Owner 最終簽收』的完美待命狀態，工程師只需花 30 秒確認。"
        ],
        "metaphor": "如同專業一級方程式賽車的進站維修保姆車隊：賽車一進站，十幾位技師在 2.5 秒內自主完成換胎、加油、前翼微調與散熱口清理，維修燈自動變綠，只等待車手掛檔起步衝刺。",
        "layout": "自適應修復流水線圖：掃描失敗 Checks → @claude 自動分析修補 → 再次觸發 CI → 全綠等待人眼 Approve。"
    },
    {
        "chapter_id": 13, "chapter_name": "第 13 章：Stage 5: Deploy — AI 驅動程式碼審查：PR Review Loop", "page_num": 8,
        "title": "審查反饋回寫 CLAUDE.md：組織集體記憶的飛輪",
        "subtitle": "審查發現的任何二次失誤，立刻轉化為全體 Agent 的免疫規則",
        "takeaway": "當 Review 過程中第二次指出某項常規錯誤時，該 PR 的修復代碼必須順手把這條規則寫入 CLAUDE.md，自此絕不再犯。",
        "details": [
            "<strong>杜絕同類問題反覆折磨人眼</strong>：例如 Reviewer 兩次指出『禁止在日誌中列印用戶手機號』，這項規約在當次 PR 就必須寫入根目錄知識庫。",
            "<strong>審查工具自動監督文檔過時</strong>：審查機器人還會反向檢查：『本次 PR 修改了資料庫架構，但未同步更新 CLAUDE.md 中的架構段落，請修正』。",
            "<strong>知識庫越用越厚實</strong>：經過三個月運轉，團隊常見的壞習慣全數被沉澱在規則中，新員工與 Agent 的代碼品質自然脫胎換骨。"
        ],
        "metaphor": "就像城市的道路交通管理局：一旦某個十字路口連續發生了兩起轉彎車輛刮蹭事故，交管局第二天立刻在該路口架設凸面反光鏡並在柏油路上刷上醒目的減速黃色斑馬線。",
        "layout": "飛輪效應循環圖：PR 審查抓出問題 → 寫入 CLAUDE.md → 下次編碼自動遵守 → PR 審查噪音歸零。"
    },
    {
        "chapter_id": 13, "chapter_name": "第 13 章：Stage 5: Deploy — AI 驅動程式碼審查：PR Review Loop", "page_num": 9,
        "title": "每月例行調優：動態評級與雜訊控制",
        "subtitle": "技術主管的定期功課：淘汰鈍化規則，維持審查員的極致銳度",
        "takeaway": "技術專家每個月花費半小時，對 AI 審查員的評審表現進行打分評級，並在 REVIEW.md 中動態調整條款。",
        "details": [
            "<strong>評級審查發現 (Rate the Findings)</strong>：將誤報率高、毫無意義的挑刺標記為 Unhelpful，指導模型調整未來的評判閾值。",
            "<strong>動態調整 Nits 配額</strong>：如果發現團隊依然被格式噪音打擾，在 REVIEW.md 中進一步嚴格限制 Nits 上限（如從 5 個縮減為 3 個）。",
            "<strong>更新排除路徑與新工具鏈</strong>：隨著團隊引入了新的代碼自動生成器，及時將新產生的路徑納入『Do not report』名單，防止誤傷。"
        ],
        "metaphor": "這就像頂級名廚每個月都要親自用磨刀石打磨自己的整套大馬士革鋼刀：剔除崩口的刀刃、重新研磨鋒芒，確保切片時肉質平整如鏡、絕不拖泥帶水。",
        "layout": "月度維護儀表板：展示審查準確率評分走勢、各類別 Finding 佔比餅圖，以及本月排除規則修訂歷史。"
    },
    {
        "chapter_id": 13, "chapter_name": "第 13 章：Stage 5: Deploy — AI 驅動程式碼審查：PR Review Loop", "page_num": 10,
        "title": "合規與審計完整留痕：PR 成為無可辯駁的法律憑證",
        "subtitle": "誰審核了代碼、修改了什麼、哪位負責人批准——永遠鎖定",
        "takeaway": "職責分離原則得到完美捍衛，編寫代碼的 Agent 永遠無法批准自己的 PR，整個 PR 討論串即是法定的審計記錄。",
        "details": [
            "<strong>職責分離 (Separation of Duties, SoD)</strong>：即使代碼是由 Claude Code 編寫、且由 Claude Reviewer 初審，它依然受到分支保護封鎖，絕不可能自批自合。",
            "<strong>不可篡改的證據鏈條</strong>：PR 包含原始 intent.md、對應的 spec.md、審查發現清單、@claude 修復日誌與人類簽核時間戳。",
            "<strong>從容應對外部審計官</strong>：面對監管機構的突擊審計，只需導出 PR 的完整 PDF 或 JSON 存證，所有決策軌跡清清楚楚、有據可查。"
        ],
        "metaphor": "這就像國際貿易中的『信用證與海關提單全套單據』：載貨清單、商檢合格證、船長簽署提單與銀行承兌匯票裝訂在一起，任何國際公證官都能在五分鐘內完成驗證合法性。",
        "layout": "審計檔案卷宗圖示：一個裝訂成冊的金色卷宗，封面印著 Pull Request #1428，內部整齊排列各類法規簽署憑證。"
    },
    {
        "chapter_id": 13, "chapter_name": "第 13 章：Stage 5: Deploy — AI 驅動程式碼審查：PR Review Loop", "page_num": 11,
        "title": "第十三章實戰總結：讓審查成為研發生產力的助推火箭",
        "subtitle": "Stage 5 Deploy 審查閉環核心總結與下章預告",
        "takeaway": "PR Review Loop 將代碼審查從痛苦的人肉挑刺泥潭，昇華為人機雙向對話、知識自動沉澱與法規完美合規的高效舞台！",
        "details": [
            "<strong>三大核心落腳點</strong>：編寫精簡的 REVIEW.md、開放 @claude 自動修復循環、堅守 Code Owner 人類最終批准。",
            "<strong>PR 已經批准，代碼能隨意發布到生產嗎？</strong>：絕對不行！我們需要一道不可逾越的部署門禁！",
            "<strong>前瞻第十四章</strong>：在代碼推入生產環境的關鍵時刻，如何使用 Hooks 作為審批門禁，杜絕任何未經授權的發布？第十四章『Hooks as approval gates』將震撼呈現！"
        ],
        "metaphor": "經過這座精密的多層智慧質檢過濾塔，每一滴即將流入生產環境的代碼都被過濾得純淨無暇；現在，它即將來到整個水庫最後的大壩閘門——生產審批門禁！",
        "layout": "三條核心實踐卡片，底部搭配通往第十四章 Release Gates 的鋼鐵閘門圖標。"
    }
]
print("Chapter 13 slides:", len(slides))
