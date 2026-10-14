# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 7, "chapter_name": "第 7 章：Stage 3: Build — 團隊智慧庫：CLAUDE.md", "page_num": 1,
        "title": "大腦的開機配置：為什麼每個倉庫都需要 CLAUDE.md？", "subtitle": "將沉澱在大腦與 Wiki 中的潛規則，化為 Agent 每次啟動必讀的上下文",
        "takeaway": "CLAUDE.md 是新加入工程師第一天上班所需的一切核心上下文，覆蓋常用命令、架構慣例與高頻踩坑禁忌。",
        "details": [
            "<strong>拯救散落的隱性知識</strong>：公司內部無數不言自明的約定（如『貨幣只能用 BigDecimal』）過去只存在資深員工口中，新人和 Agent 極易踩雷。",
            "<strong>開箱即用的冷啟動</strong>：Agent 進入陌生代碼庫的第一時間，透過根目錄的 CLAUDE.md 瞬間熟悉全局架構與日常規範，宛如資深員工附身。",
            "<strong>集中維護與代碼同壽</strong>：不再將架構手冊放任在發霉的 Confluence 頁面上，而是與代碼放置在同一 Git 倉庫中同步審查演進。"
        ],
        "metaphor": "這就像新員工入職第一天，師傅遞給他的一張塑膠護貝的『終極通關小抄』：上面寫著伺服器密碼重置規則、各模組負責人是誰、以及微波爐絕對不能加熱金屬便當盒等保命常識。",
        "layout": "雙向轉換圖：左側展示雜亂無章的 Wiki、Slack 聊天記錄，透過中央過濾漏斗，右側凝聚成簡潔強悍的 CLAUDE.md。"
    },
    {
        "chapter_id": 7, "chapter_name": "第 7 章：Stage 3: Build — 團隊智慧庫：CLAUDE.md", "page_num": 2,
        "title": "執行 /init 自動生成：萃取專案技術基因", "subtitle": "從零起步的最佳途徑：讓 Claude 深入掃描代碼庫結構",
        "takeaway": "在專案根目錄鍵入 /init，Claude 將主動分析專案檔案、建置腳本與目錄結構，自動提煉出一份高質量的初版 CLAUDE.md。",
        "details": [
            "<strong>自動探測建置與測試指令</strong>：掃描 package.json、Makefile、pom.xml 或 Cargo.toml，精準識別常用 build/test 指令。",
            "<strong>識別核心架構分層</strong>：辨識前後端目錄結構、資料庫遷移腳本存放路徑與 API 定義規範。",
            "<strong>人類工程師的精簡裁切</strong>：/init 生成的文件只是原材料，工程師必須大刀闊斧剪除冗餘，只保留第一天必須知曉的關鍵命脈。"
        ],
        "metaphor": "就像地質學家帶著探地雷達在未知島嶼上掃描一圈（/init），立刻標註出淡水源、金屬礦脈與斷層帶，繪製出第一張基礎拓荒軍用地圖。",
        "layout": "終端互動示意圖：鍵入 /init 命令，展示 Claude 掃描各專案目錄並輸出結構化草案的動態過程。"
    },
    {
        "chapter_id": 7, "chapter_name": "第 7 章：Stage 3: Build — 團隊智慧庫：CLAUDE.md", "page_num": 3,
        "title": "四大核心板塊設計：Commands, Conventions, Architecture, Mistakes", "subtitle": "Anthropic 官方規範的黃金四段式架構",
        "takeaway": "一份結構優秀的 CLAUDE.md 必須嚴格包含：常用命令、編碼慣例、系統架構概覽與高頻避坑清單。",
        "details": [
            "<strong>Commands（建置與測試指令）</strong>：提供標準執行腳本，並清晰標註健康輸出範例，讓 Agent 能自主運行。",
            "<strong>Conventions（團隊約定）</strong>：語言版本標準、禁用的舊庫、特定資料型別強制規範（如禁 double、強制 BigDecimal）。",
            "<strong>Architecture（架構導航）</strong>：REST 控制器在 api/、領域邏輯在 core/、外部介面在 adapters/，模組邊界一清二楚。",
            "<strong>Things Claude gets wrong（高頻踩坑清單）</strong>：明確警示 Agent 過去最容易犯錯的盲區（如禁自作主張升級依賴）。"
        ],
        "metaphor": "這就像古代軍營的『治軍四訓』：一訓軍號口令（Commands）、二訓操練陣式（Architecture）、三訓軍規軍紀（Conventions）、四訓斬立決重罪（Things not to do）。",
        "layout": "四宮格卡片版面：分別展示 Commands、Conventions、Architecture、Things Claude gets wrong 的標準排版。"
    },
    {
        "chapter_id": 7, "chapter_name": "第 7 章：Stage 3: Build — 團隊智慧庫：CLAUDE.md", "page_num": 4,
        "title": "官方實戰範例拆解：支付微服務的真實設定",
        "subtitle": "僅僅一頁紙，如何精準約束一個複雜的 Spring Boot 專案？",
        "takeaway": "Anthropic 原文範例向我們展示了極致精簡與高度權威性的完美結合。",
        "details": [
            "```markdown\n# Payments service\n\n## Commands\n- Build: make build\n- Test: make test (unit), make itest (integration, needs docker)\n- Lint: make lint (runs in CI; fix before pushing)\n\n## Conventions\n- Java 21, Spring Boot 3. No new Lombok.\n- Money is always BigDecimal, never double.\n- Every endpoint needs an integration test in src/itest.\n\n## Architecture\n- api/ holds REST controllers, core/ holds domain logic,\n  adapters/ talks to external systems.\n- Kafka events are defined in schemas/; never edit generated classes.\n\n## Things Claude gets wrong\n- Do not bump dependency versions; the platform team owns them.\n- The legacy v1/ package is frozen; changes go in v2/.\n```",
            "<strong>金錢精度鐵律</strong>：『Money is always BigDecimal, never double』徹底消滅浮點數舍入財務事故。",
            "<strong>凍結舊包保護</strong>：『The legacy v1/ package is frozen』直接在第一時間斷絕了 Agent 篡改舊遺留系統的可能。"
        ],
        "metaphor": "宛如十誡石碑：文字極其精練，沒有一句廢話，但每一條誡命都精準命中了歷史上無數血淋淋的慘痛教訓。",
        "layout": "代碼高亮展示官方 Payments service CLAUDE.md 全文，重點行次以亮藍色標註解說。"
    },
    {
        "chapter_id": 7, "chapter_name": "第 7 章：Stage 3: Build — 團隊智慧庫：CLAUDE.md", "page_num": 5,
        "title": "犯錯兩次法則 (The Mistake Rule)：動態演進的智慧庫",
        "subtitle": "不要指責 Agent，要將錯誤化為不可磨滅的制度防禦",
        "takeaway": "當 Claude 在開發或審查中第二次犯下同樣的錯誤時，修正必須立即作為一條新規則寫入 CLAUDE.md。",
        "details": [
            "<strong>從抱怨 AI 轉向制度修復</strong>：遇到 Agent 寫錯代碼，僅僅在聊天視窗斥責毫無意義；關閉視窗後，下個對話依然會重蹈覆轍。",
            "<strong>一處受傷，全員免疫</strong>：工程師在 PR 審查時把教訓寫入根目錄的 CLAUDE.md，自此全公司所有的工程師與 Agent 在下次啟動時瞬間獲得免疫力。",
            "<strong>動態生長的知識有機體</strong>：代碼庫經歷一年的實戰打磨，CLAUDE.md 將沉澱為該領域最權威、最珍貴的專屬工程百科全書。"
        ],
        "metaphor": "這就像現代航空安全事故調查機制：每次黑盒子破譯出事故原因後，波音與空巴立刻將修正後的標準檢查程序 (Checklist) 發送到全球所有飛行員的駕駛手冊中，終身杜絕同類空難再度發生。",
        "layout": "閉環演進迴圈圖：Agent 犯錯 → 人類指出修正 → 寫入 CLAUDE.md → 全域對話即刻免疫的進化閉環。"
    },
    {
        "chapter_id": 7, "chapter_name": "第 7 章：Stage 3: Build — 團隊智慧庫：CLAUDE.md", "page_num": 6,
        "title": "上下文長度控制：為什麼必須嚴格控制在一頁紙以內？",
        "subtitle": "少即是多：避免注意力稀釋 (Context Dilution) 與 Token 浪費",
        "takeaway": "因為 Claude 在每次開啟新會話時都會全量閱讀 CLAUDE.md，過時、冗長或過細的內容只會擠佔寶貴的思考窗口。",
        "details": [
            "<strong>上下文稀釋效應</strong>：當文件超過千行，大語言模型對個別關鍵誡命的注意力權重將不可避免地下滑，反而容易遺忘核心約束。",
            "<strong>過時資訊是隱形毒藥</strong>：三個月前寫死在裡面的臨時依賴版本，很可能在系統升級後誤導 Agent 做出荒謬的逆向降級。",
            "<strong>嚴格劃定邊界</strong>：只保留全域性的黃金規則；凡是針對特定領域的深度規範（如複雜的 API 安全審查條例），應移出並封裝為獨立的 Skill！"
        ],
        "metaphor": "如同特種部隊突擊隊員的隨身戰術腰帶：只能放置求生刀、急救止血帶與彈匣；如果你把整部大英百科全書綁在腰帶上，隊員只會被壓得寸步難行、喪失戰鬥力。",
        "layout": "長度對比標尺圖：展示一頁紙 (30~50行) 的黃金甜點區，以及過度膨脹導致模型注意力衰減的警告紅區。"
    },
    {
        "chapter_id": 7, "chapter_name": "第 7 章：Stage 3: Build — 團隊智慧庫：CLAUDE.md", "page_num": 7,
        "title": "驗證段落規範：將 Verification 內化為完成標準",
        "subtitle": "明確定義何謂『Done』：不跑綠燈測試禁止回報完成",
        "takeaway": "在 CLAUDE.md 中明確寫入 Verifying your work 區塊，命令 Agent 必須在回報任務完成前自主運行所有測試並貼出輸出。",
        "details": [
            "<strong>拒絕假象完成</strong>：杜絕 Agent 寫完代碼後隨口回報『我已經幫你實現好了』，實則編譯根本跑不通的尷尬境地。",
            "<strong>明確退出指標</strong>：包含 Build、Test、Lint 三大強制檢驗項，要求 Lint 必須零警告，測試全綠且絕不允許跳過或刪除失敗測試。",
            "<strong>修復代碼而非修復測試</strong>：白紙黑字規定『If a test fails, fix the code, not the test』，從根本上斬斷 Agent 為了投機取巧偷改測試斷言的劣習。"
        ],
        "metaphor": "就像外科手術室的『手術器械計數清單』：護士長必須在主刀醫生縫合傷口前，逐件清點紗布與止血鉗數量完全吻合並大聲報讀，才能宣告手術結束。",
        "layout": "代碼區塊展示標準 Verifying your work 配置，右側標註『強制輸出證明、禁止竄改測試』雙重圖章。"
    },
    {
        "chapter_id": 7, "chapter_name": "第 7 章：Stage 3: Build — 團隊智慧庫：CLAUDE.md", "page_num": 8,
        "title": "版本控制與 Code Review：像對待代碼一樣對待指令",
        "subtitle": "CLAUDE.md 享有與核心業務邏輯完全相同的代碼地位",
        "takeaway": "CLAUDE.md 必須被納入 Git 根目錄，全團隊共享一份真相，任何修改都必須經過 Pull Request 與 Code Owner 嚴格審批。",
        "details": [
            "<strong>嚴禁本地私藏</strong>：禁止工程師將關鍵配置只放在本地環境，全團隊必須步調一致，共享同一個 Agent 大腦設定。",
            "<strong>審計透明化</strong>：每次規則修訂都有具名的 Git 提交記錄，誰在何時、因何事故調整了架構約束，歷歷在目。",
            "<strong>Code Owner 強制把關</strong>：只有資深架構師或平台工程師擁有批准 CLAUDE.md 變更的權限，防止不成熟的個人偏好污染全局環境。"
        ],
        "metaphor": "這就像國家的『憲法修正案』：憲法條文公開印製發行給所有公民，任何人不能在私底下偷改法條，任何條文修訂都必須經過國會全體辯論與三分之二多數表決通過。",
        "layout": "PR 流程圖：展示修改 CLAUDE.md 建立分支 → CI Evals 自動跑回歸 → 架構師 Code Review 簽署 → 合併生效的全流程。"
    },
    {
        "chapter_id": 7, "chapter_name": "第 7 章：Stage 3: Build — 團隊智慧庫：CLAUDE.md", "page_num": 9,
        "title": "PR Review 反饋機制：讓審查持續滋養知識庫",
        "subtitle": "當 PR Review 發現二次失誤時，自動發起 CLAUDE.md 更新",
        "takeaway": "在 Stage 5 的 PR Review 中，一旦審查機器人或人工評審第二次抓出同類命名或邏輯偏誤，直接在該 PR 中提議更新 CLAUDE.md。",
        "details": [
            "<strong>審查與知識庫的雙向互哺</strong>：PR Review 既是代碼的把關者，也是 CLAUDE.md 規則是否有效的即時檢驗場。",
            "<strong>及時識別過時規則</strong>：當專案完成 Spring Boot 3 升級後，Review 流程會主動警示『CLAUDE.md 中舊版的 Java 17 規範已過期，請同步修正』。",
            "<strong>全自動健康巡檢</strong>：每月定期評估 CLAUDE.md 中每條規則的命中率與攔截效果，淘汰無效噪音，保持精幹強健。"
        ],
        "metaphor": "就像在現代軍事演習中，前線假想敵部隊（PR Review）一旦發現防禦陣地存在重複的防禦盲區，立刻將該漏洞情報反饋給軍校教研室，當晚改寫作戰訓練教材。",
        "layout": "雙向箭頭閉環：PR Review 發現重複問題 ⇆ 自動建議更新 CLAUDE.md ⇆ 下次對話 Agent 預防犯錯。"
    },
    {
        "chapter_id": 7, "chapter_name": "第 7 章：Stage 3: Build — 團隊智慧庫：CLAUDE.md", "page_num": 10,
        "title": "多專案組織分層治理：全局配置與模組覆蓋",
        "subtitle": "在大型 Mono-repo 或多微服務巨型企業架構中的落地策略",
        "takeaway": "採用『根目錄全局共享 + 子目錄按需覆蓋』的層次結構，兼顧全組織統一標準與子服務專屬特質。",
        "details": [
            "<strong>全局基線 (Root CLAUDE.md)</strong>：定義全公司統一的 Git Commit 規範、安全底線與通訊協議。",
            "<strong>子模組特化 (Sub-module CLAUDE.md)</strong>：在 `frontend/` 或 `payment-service/` 等子目錄下放置專屬說明，覆蓋特定框架指令與測試命令。",
            "<strong>動態繼承與優先權判定</strong>：Claude Code 在進入特定目錄時，優先就近讀取子配置，並無縫繼承父級安全原則，兼顧靈活性與嚴肅性。"
        ],
        "metaphor": "如同聯邦法律與州法律的關係：聯邦憲法（Root CLAUDE.md）確立了不可侵犯的公民基本權利與國家安全底線；各州政府（子模組）可根據本地農業或商業特點頒布更具體的交通法規。",
        "layout": "樹狀目錄分層架構圖：展示 Root CLAUDE.md 與各 Sub-package CLAUDE.md 之間的繼承與覆蓋關係。"
    },
    {
        "chapter_id": 7, "chapter_name": "第 7 章：Stage 3: Build — 團隊智慧庫：CLAUDE.md", "page_num": 11,
        "title": "第七章實戰總結：讓每一次犯錯都成為永恆的資產",
        "subtitle": "Stage 3 Build 團隊智慧核心心法與下章預告",
        "takeaway": "CLAUDE.md 是人機協同的大腦中樞，但若要承載深度、專業化的企業制度，我們需要更模組化的利器——Skills！",
        "details": [
            "<strong>三大黃金法則</strong>：保持在 1 頁以內、恪守犯錯兩次法則、將完成標準 (Verification) 白紙黑字固化。",
            "<strong>立即行動</strong>：在終端機對你的核心倉庫運行一次 `/init`，提煉出屬於你們團隊的第一份 CLAUDE.md！",
            "<strong>前瞻第八章</strong>：當某些安全與 API 規範過於龐大、無法塞進一頁紙時該怎麼辦？第八章將為您呈現『Skills 機構知識模組化』的卓越架構！"
        ],
        "metaphor": "不貳過，是古代賢人的最高修養；而 CLAUDE.md 則是將這種最高修養，以一行行代碼與規範的形式，賦予了整個團隊的每一次 AI 工作階段。",
        "layout": "三條核心實踐卡片，底部搭配通往第八章 Skills 的高亮躍遷箭頭。"
    }
]
print("Chapter 7 slides:", len(slides))
