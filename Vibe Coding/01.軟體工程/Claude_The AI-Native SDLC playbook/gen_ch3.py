# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 3, "chapter_name": "第 3 章：Stage 1: Plan — 意圖捕獲與 intent.md", "page_num": 1,
        "title": "為什麼軟體起點不再是 PRD？傳統需求的低效痛點", "subtitle": "傳統產品需求文檔動輒數十頁，往往耗時數週且充滿資訊失真",
        "takeaway": "在代碼不再是瓶頸的世界裡，等待產品經理撰寫厚重 PRD 成為阻礙業務創新的最大堵點。",
        "details": [
            "<strong>撰寫門檻極高</strong>：業務線人員（如理賠員、客服主管）有了極佳改善點子，卻因不會寫技術 PRD，必須求助產品經理幫忙排期代筆。",
            "<strong>溝通鏈條層層損耗</strong>：業務講給 PM 聽，PM 轉述給架構師，架構師轉給工程師，原始業務痛點在漫長的會議拋接中嚴重失真。",
            "<strong>過時風險巨大</strong>：花了一個月寫完的 50 頁 PRD，常常在上線前市場環境早已改變，導致大量文件沉澱為無用垃圾。"
        ],
        "metaphor": "就像一位前線偵察兵發現了敵方碉堡（業務痛點），但他不能直接呼叫無人機打擊，必須徒步回營總部向參謀官口述，等待參謀官花三天畫成作戰圖紙。",
        "layout": "對比圖：傳統 PRD 耗時 2~4 週 vs AI 原生意圖捕獲耗時 15 分鐘的鮮明對照。"
    },
    {
        "chapter_id": 3, "chapter_name": "第 3 章：Stage 1: Plan — 意圖捕獲與 intent.md", "page_num": 2,
        "title": "意圖的多元入口：人腦靈光、工單與生產警報", "subtitle": "任何業務需求與技術故障，皆可標準化匯入同一意圖源頭",
        "takeaway": "intent.md 不僅源於人類產品規劃，也可源於客服工單甚至生產環境的監控告警，實現萬流歸宗。",
        "details": [
            "<strong>入口一：人類業務創意 (Human Idea)</strong>：第一線員工在日常工作中產生的功能想法或自動化建議。",
            "<strong>入口二：客服與工單反饋 (Tickets & Issues)</strong>：使用者在支援系統中積累的高頻投訴或故障回報。",
            "<strong>入口三：生產異常警報 (Incident Alerts)</strong>：由 Stage 6 監控系統偵測到指標偏離時，自動產生的修復診斷需求。"
        ],
        "metaphor": "這就像一座現代化智慧水庫的集水系統：無論是天降暴雨（人腦突發靈感）、山間溪流（使用者工單），還是地下湧泉（系統故障告警），全部匯入同一個蓄水池集中調度。",
        "layout": "三條匯流箭頭指向中央的 intent.md 核心圖標，標註多元入口統一標準化的特質。"
    },
    {
        "chapter_id": 3, "chapter_name": "第 3 章：Stage 1: Plan — 意圖捕獲與 intent.md", "page_num": 3,
        "title": "非技術人員的福音：用最樸素的自然語言對話", "subtitle": "無需具備技術背景，只要能把痛點講清楚，就能啟動研發",
        "takeaway": "發起者只需用日常語言向 Claude 描述今天無法做什麼、誰受到影響、更好的狀態是什麼。",
        "details": [
            "<strong>零格式壓力</strong>：不需要知道什麼是 REST API、資料庫表結構或微服務架構，用大白話描述現狀與痛點即可。",
            "<strong>隨心所欲的非結構化輸入</strong>：哪怕是一段語音轉文字、幾張雜亂的截圖或幾條聊天記錄，Claude 都能迅速理解並整理脈絡。",
            "<strong>消除跨職能溝通壁壘</strong>：業務專家能夠專注於業務實質問題本身，而不被技術黑話或文檔格式規範所綁架。"
        ],
        "metaphor": "就像走進一家頂級私人西服訂製店，你不需要懂得如何剪裁打版，只要告訴裁縫你打算穿去參加什麼場合、希望感覺如何舒適，大師便能為你量身繪製草圖。",
        "layout": "左側為非技術人員的口語表達對話框，右側為 Claude 整理出的結構化思考導圖。"
    },
    {
        "chapter_id": 3, "chapter_name": "第 3 章：Stage 1: Plan — 意圖捕獲與 intent.md", "page_num": 4,
        "title": "如頂級諮詢分析師般的詰問：釐清範疇與指標", "subtitle": "Claude 主動發問，逼出模糊隱含的業務邊界與成功定義",
        "takeaway": "Claude 不只是單純記錄，而是扮演經驗豐富的麥肯錫分析師，主動探討範疇、目標受眾、約束與成功衡量標準。",
        "details": [
            "<strong>深度邊界詰問</strong>：『這個功能是否需要支援第三方人員訪問？』『如果外部系統當機，最長容忍延遲是多久？』",
            "<strong>探討非功能性約束</strong>：主動確認機密敏感資料 (PII) 規範、現有身份認證機制與相容性限制。",
            "<strong>確立可量化成果</strong>：將原本抽象的『希望能快一點』具體化為『在門戶網站顯示即時狀態與預計完成日期』。"
        ],
        "metaphor": "就像蘇格拉底式的智慧詰問：導師不直接給答案，而是透過連續而犀利的反問，引導學生自己發現原本思維中的盲區與矛盾，將模糊直覺轉化為嚴謹定義。",
        "layout": "雙人對話剖析圖，展示 Claude 提出的四維度詰問矩陣：範疇 (Scope)、用戶 (Users)、約束 (Constraints)、指標 (Success)。"
    },
    {
        "chapter_id": 3, "chapter_name": "第 3 章：Stage 1: Plan — 意圖捕獲與 intent.md", "page_num": 5,
        "title": "提煉為標準 Proto-spec：intent.md 骨架拆解", "subtitle": "Anthropic 官方規範架構：精簡、標準且直接可被機器解析",
        "takeaway": "提煉後的 intent.md 包含五大核心段落：Problem、Proposed outcome、Affected users/systems、Constraints 與 Open questions。",
        "details": [
            "<strong>Problem（核心問題）</strong>：精確指出目前的痛點與量化損失（如：客服人員 1/3 時間耗費在查詢狀態）。",
            "<strong>Proposed outcome（預期產出）</strong>：清晰描述功能完成後的用戶體驗（如：門戶直觀呈現進度與預估日期）。",
            "<strong>Affected users and systems（影響範圍）</strong>：列出涉及的業務角色（理賠員）與技術系統（Portal、Claims-Core API）。",
            "<strong>Constraints（邊界約束）</strong>：嚴格限制如禁止引入新 PII、沿用現有驗證等。",
            "<strong>Open questions（開放問題）</strong>：標註尚待決策的爭議盲點，交由下階段仲裁。"
        ],
        "metaphor": "這就像醫院的『急診分診病歷卡』：無論病人進來時多麼混亂，護士必定迅速量化血壓、體溫、病徵、過敏史與待檢查項目，一張卡片讓全體醫生秒懂狀況。",
        "layout": "標準 intent.md 卡片結構解析圖，各段落以鮮明邊框標註作用與價值。"
    },
    {
        "chapter_id": 3, "chapter_name": "第 3 章：Stage 1: Plan — 意圖捕獲與 intent.md", "page_num": 6,
        "title": "官方實戰範例：理賠狀態自助查詢", "subtitle": "從一通電話到標準 intent.md 的真實落地蛻變",
        "takeaway": "幾句看似尋常的業務痛點，透過 Claude 整理後成為結構工整、無懈可擊的 Proto-spec。",
        "details": [
            "```markdown\n# Intent: claims status self-service\nAuthor: J. Ortiz (claims operations). Status: draft.\n\n## Problem\nCustomers phone the contact center to ask where their claim is.\nHandlers spend roughly a third of call time on status-only queries.\n\n## Proposed outcome\nCustomers see claim status, next step and expected date in the portal.\n\n## Affected users and systems\nClaims handlers, portal team, claims-core API.\n\n## Constraints\nNo new PII in the portal session. Existing authentication only.\n\n## Open questions\nDo third-party loss adjusters need access too?\n```",
            "<strong>高度精煉性</strong>：不寫廢話，全篇控制在 20 行內，任何人都能在一分鐘內徹底理解業務脈絡。",
            "<strong>作者與狀態明確標記</strong>：作者具名，初始狀態設為 draft，為後續 Git 審查奠定基礎。"
        ],
        "metaphor": "宛如一份精準的『外科手術意圖確認書』：主刀醫生看一眼便知病灶所在、手術目標、預期切除範圍與不可碰觸的神經血管約束。",
        "layout": "代碼高亮區塊展示 Anthropic 原文 intent.md 範例，並於右側附帶名詞解析註解。"
    },
    {
        "chapter_id": 3, "chapter_name": "第 3 章：Stage 1: Plan — 意圖捕獲與 intent.md", "page_num": 7,
        "title": "約束條件與開放問題 (Open Questions) 的價值", "subtitle": "及早暴露未知，遠勝於在最後一刻痛苦重構",
        "takeaway": "允許甚至鼓勵在 intent.md 中列出『未解問題』，避免了傳統團隊假裝一切明確、實則埋雷的壞習慣。",
        "details": [
            "<strong>誠實面對不確定性</strong>：例如『第三方公證人是否需要訪問權？』這個問題業務人員當下可能拿不準，直接列出能避免工程師做錯誤假設。",
            "<strong>引導 Stage 2 規格深化</strong>：在第二階段，架構師或產品負責人的首要任務就是協同法規與安全專家逐一攻克這些開放問題。",
            "<strong>明確約束降低試錯成本</strong>：事前鎖定『禁止引入新 PII』，直接在第一道防線阻止了可能引發 GDPR 違規的設計缺陷。"
        ],
        "metaphor": "這就像在施工圖紙上用醒目的黃色三角警示牌標註『此處地下可能有未標註的古老自來水管，挖掘前必須會同水務局探勘』，杜絕挖斷水管引發水淹工地的慘劇。",
        "layout": "黃色警示卡片突出 Open Questions，展示其如何被自動傳遞至 Stage 2 進行政策裁決。"
    },
    {
        "chapter_id": 3, "chapter_name": "第 3 章：Stage 1: Plan — 意圖捕獲與 intent.md", "page_num": 8,
        "title": "意圖中心倉庫 (Intent Home) 的建置與權限", "subtitle": "平台團隊的一次性工作：為全體員工打造思想孵化基座",
        "takeaway": "建立一個專門存放 intent.md 的中心代碼庫，讓全公司非技術人員都能安全、無阻地發起軟體意圖。",
        "details": [
            "<strong>一次性基礎設施搭建</strong>：工程或平台團隊建立集中式的 Git 倉庫（如 github.com/org/intents），配置目錄結構與權限組。",
            "<strong>廣泛的發起權限 (Broad Write Access)</strong>：讓各業務線、運維線的同仁都具備提交權限，釋放全員創新熱情。",
            "<strong>模組化範本注入</strong>：平台團隊將 intent 規範定義為組織級 Skill，任何人在啟動 Claude 時都會自動套用標準模板。"
        ],
        "metaphor": "就像在公司大廳設立一個『智慧市政建議箱與孵化器』，每位員工都能投遞規範化的建議卡片，後台系統自動為每張卡片建立數位流水號與追蹤系統。",
        "layout": "系統架構拓撲圖：展示來自不同業務部門的意圖流，如何被引流並彙整至唯一的 Intent Home 倉庫。"
    },
    {
        "chapter_id": 3, "chapter_name": "第 3 章：Stage 1: Plan — 意圖捕獲與 intent.md", "page_num": 9,
        "title": "免 Git 體驗：VCS 連接器代為提交", "subtitle": "讓不熟悉 Git 的業務人員，也能透過 Claude.ai 寫入版本控制",
        "takeaway": "利用 GitHub/GitLab 連接器，非技術人員在聊天視窗中確認無誤後，Claude 自動代其在背景完成 Git Commit。",
        "details": [
            "<strong>消除 Git 命令列認知負擔</strong>：業務人員不需要安裝 git、配置 ssh-key、學習 branch、add、commit 與 push 等技術細節。",
            "<strong>網頁端與 Cowork 無縫整合</strong>：直接在 Claude.ai 網頁端或 Cowork 介面點擊確認，底層連接器自動建立分支並發起 PR 或提交。",
            "<strong>保留完整的身分憑證</strong>：即使由 Agent 代提，提交中依然明確記錄原始人類發起者的作者資訊與時間戳，保證審計鏈條不可篡改。"
        ],
        "metaphor": "就像你寄掛號信不需要親自走進郵政分揀中心去操作傳送帶與蓋戳機，你只要在櫃台把信交給專員，系統自動為你貼上條碼、蓋上郵戳並送上貨運班機。",
        "layout": "雙層架構圖：上層為友善的 Claude 網頁對話介面，下層為底層 VCS Connector 自動執行的 Git Commit 流水線。"
    },
    {
        "chapter_id": 3, "chapter_name": "第 3 章：Stage 1: Plan — 意圖捕獲與 intent.md", "page_num": 10,
        "title": "治理與審計落實：產品負責人的審批門禁", "subtitle": "intent.md 提交非終點，PO 的審查與合併才是真正通行證",
        "takeaway": "意圖的接受或拒絕決定，由產品負責人在審查合併中具名記錄，這正是邁向 Stage 2 的觸發器。",
        "details": [
            "<strong>客觀嚴格的意圖過濾</strong>：產品負責人 (PO) 評估該意圖是否符合當前季度的商業優先級與技術路線圖。",
            "<strong>及時修正與補充</strong>：如果發起者的描述存在偏誤，PO 可以在 PR 討論串中直接給予反饋，或讓 Claude 重新調整內容。",
            "<strong>自動觸發下一階段</strong>：一旦 PO 批准並合併 intent.md，Webhook 自動觸發後續的 Stage 2 規格工程作業，無需人工催促。"
        ],
        "metaphor": "如同專利審查局的專利審查官：發明人提交了專利草案（intent.md），審查官認真覆核其創新性與合規性後，鄭重蓋上『准予立案』的鋼印，正式啟動後續流程。",
        "layout": "審核門禁流程圖：展示 Draft intent.md → PO 審查 → [駁回/修改/批准] → Merge 觸發 Stage 2 的完整生命週期。"
    },
    {
        "chapter_id": 3, "chapter_name": "第 3 章：Stage 1: Plan — 意圖捕獲與 intent.md", "page_num": 11,
        "title": "第三章實戰總結：讓任何有價值想法零阻力立案", "subtitle": "Stage 1 Plan 核心收穫與最佳實務清單",
        "takeaway": "建立清晰、規範、低摩擦的意圖捕獲體系，是徹底解放企業被壓抑創新潛力的第一步。",
        "details": [
            "<strong>實踐清單一</strong>：立刻為團隊建立一個共享的 intent 倉庫，並發布標準 template skill。",
            "<strong>實踐清單二</strong>：鼓勵第一線業務同仁透過對話形式梳理痛點，善用分析師詰問逼出邊界約束。",
            "<strong>實踐清單三</strong>：在第四章中，我們將見證這些被批准的 intent.md，如何結合企業 Skills，自動昇華為具備深層架構規範的 spec.md！"
        ],
        "metaphor": "每一項偉大的工程都始於一張小小的素描草圖；Stage 1 賦予了組織內每個人親手繪製這張草圖的能力，並用現代化工裝體系將其精確送入生產線。",
        "layout": "三條核心守則總結卡片，底部搭配通往 Stage 2 Design 的高亮箭頭。"
    }
]
print("Chapter 3 slides:", len(slides))
