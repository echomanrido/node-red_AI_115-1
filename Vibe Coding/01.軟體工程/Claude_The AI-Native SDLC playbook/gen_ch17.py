# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 17, "chapter_name": "第 17 章：Stage 6: Maintain — 定期弱點掃描：Recurring Codebase Scans", "page_num": 1,
        "title": "靜態代碼安全的兩大時效性危機：雙向過期 (Both Halves Go Stale)",
        "subtitle": "為什麼半年前通過安全審查的代碼，今天可能漏洞百出？",
        "takeaway": "安全掃描只是特定時間點在特定模型下的快照；代碼每週都在變，且新一代模型每隔半年就能發現舊模型完全看不見的深層漏洞！",
        "details": [
            "<strong>代碼本身每週都在漂移</strong>：工程師與 Agent 持續合併新的 PR，依賴關係每週都在更新，攻擊面不斷演變。",
            "<strong>檢測模型智力代際躍遷</strong>：一年前模型看不出的複雜跨函數記憶體洩漏或邏輯提權，新一代模型（如 Claude Mythos 5）能一眼洞穿。",
            "<strong>靜態一次性審查的破產</strong>：傳統在專案驗收時做一次滲透測試的作法徹底過時，代碼庫必須接受全天候、週期性的常態化自動巡檢。"
        ],
        "metaphor": "這就像防範新型傳染病：一年前醫學界甚至不知道這種病毒的基因序列（舊模型盲區），而人類每天都在出入公共場所接觸新人群（代碼變更）；你不能憑著一年前拿到的一張健康體檢表，就宣稱自己今天絕對百毒不侵。",
        "layout": "雙向過期天平圖：左側展示代碼每週快速演變的時鐘，右側展示安全檢測模型能力代際躍遷的階梯，兩者共同促成常態巡檢的必然性。"
    },
    {
        "chapter_id": 17, "chapter_name": "第 17 章：Stage 6: Maintain — 定期弱點掃描：Recurring Codebase Scans", "page_num": 2,
        "title": "什麼是 Claude Security？託管式代碼巡檢服務",
        "subtitle": "Anthropic 官方託管安全架構：在雲端強大算力下進行深度語境掃描",
        "takeaway": "掛接 GitHub 倉庫，由 Anthropic 基礎設施中的前沿旗艦模型定時非同步跑批，自動驗證並附帶置信度評分。",
        "details": [
            "<strong>無需本地維護龐大模型算力</strong>：企業組織直接連接代碼庫，後台自動排程在雲端專有安全沙盒中執行全量代碼審查。",
            "<strong>自動驗證發現真偽 (Validated Findings)</strong>：模型在提報漏洞前，在背後沙盒中嘗試構建 PoC 進行自我實證，大幅過濾虛假誤報。",
            "<strong>一鍵輸出可審計修復補丁</strong>：不僅僅指出哪一行有問題，更直接在 Web 介面生成可一鍵 review 並發起 PR 的修復 Patch！"
        ],
        "metaphor": "就像企業聘請了一支由世界頂級白帽黑客組成的常駐安全巡防艦隊：他們每週末在獲得授權的代碼城堡外圍進行真實的模擬滲透攻防演練，週一早晨直接向城堡領主遞交一份包含修補水泥配方與修復藍圖的精華防禦戰報。",
        "layout": "雲端架構圖：GitHub 倉庫透過專用安全 API 與 Anthropic 託管掃描基礎設施連通，右側輸出高置信度漏洞清單與修復補丁。"
    },
    {
        "chapter_id": 17, "chapter_name": "第 17 章：Stage 6: Maintain — 定期弱點掃描：Recurring Codebase Scans", "page_num": 3,
        "title": "突破傳統 SAST/DAST 的盲區：語境感知型漏洞挖掘",
        "subtitle": "傳統靜態分析工具只懂匹配規則，大語言模型真正理解業務邏輯",
        "takeaway": "傳統工具對跨模組的商業邏輯缺陷束手無策，而 Claude 能精準識別隱蔽的業務提權與非預期狀態機跳轉。",
        "details": [
            "<strong>傳統正則規則庫的死板</strong>：傳統靜態工具只會尋找 `strcpy` 或未過濾的 SQL 拼接字串，對深層業務邏輯漏洞盲目無知，且誤報成災。",
            "<strong>理解真實業務上下文 (Context-Aware)</strong>：Claude 能理解：『為什麼調用這條結算 API 前沒有檢查使用者的賬戶凍結狀態？』這種深層業務規則。",
            "<strong>互補共生陣型</strong>：確定性規則（如 SonarQube）留在 CI 中負責快速排查常規格式；模型掃描（Claude Security）每週負責排查複雜深層語境缺陷。"
        ],
        "metaphor": "傳統 SAST 就像機場安檢門的感應蜂鳴器，只要身上有金屬皮帶扣就尖叫（死板且誤報多）；而 Claude Security 則是經驗極其老道的情資便衣特工，他透過觀察可疑人員的微表情、購票時間線與隨身攜帶的多重假證件，精準揪出真正的跨國間諜。",
        "layout": "對比雷達圖：展示傳統 SAST 在語法級別的優勢，與 Claude Security 在架構級、業務邏輯級與複合攻擊鏈上的壓倒性優勢。"
    },
    {
        "chapter_id": 17, "chapter_name": "第 17 章：Stage 6: Maintain — 定期弱點掃描：Recurring Codebase Scans", "page_num": 4,
        "title": "落地實踐四部曲：從基準掃描到排程巡檢",
        "subtitle": "安全主管如何有條不紊地在組織內鋪開定期掃描？",
        "takeaway": "步驟：掛接關鍵倉庫建立基準、設定每週排程、帶有置信度進行分類審查、修復走常規 PR 門禁。",
        "details": [
            "<strong>步驟一：初次全量掃描 (Baseline Scan)</strong>：即使是被認為代碼極度乾淨的核心老服務，第一次掃描也極大概率會揪出歷史盲點，以此確立安全基準線。",
            "<strong>步驟二：設定專案排程 (Weekly Cadence)</strong>：活躍開發的服務每週定期巡檢一次；超大型代碼庫可細分目錄與分支分批掃描。",
            "<strong>步驟三：置信度分級分流</strong>：優先處理 High Confidence 的漏洞；對不適用的發現標記理由駁回 (Dismiss)，防止下次重複出現。",
            "<strong>步驟四：走標準 PR 門禁進生產</strong>：修復補丁絕不允許走特權直推，全數作為 PR 匯入 Stage 5 的 Review 流程！"
        ],
        "metaphor": "這就像工廠引進高精度探傷雷達檢驗鋼樑：第一步對全廠現有結構做一次地毯式初檢摸底；第二步設定每週五下班後自動探傷巡檢；第三步工程師戴著護目鏡對可疑裂紋打標記；第四步按照標準焊接工藝修補復原。",
        "layout": "四步走流程示意圖：建立基準 → 週排程配置 → 置信度分流 → PR 門禁放行。"
    },
    {
        "chapter_id": 17, "chapter_name": "第 17 章：Stage 6: Maintain — 定期弱點掃描：Recurring Codebase Scans", "page_num": 5,
        "title": "邊界明確的孤立漏洞：Web 端一鍵補丁與審查",
        "subtitle": "小修補極速閉環：從漏洞報告到修復 PR 的一鍵式操作",
        "takeaway": "對於影響範圍僅限於少數幾行或單一函數的邊界漏洞，直接在 Claude Code 網頁端預覽補丁並一鍵發起審查。",
        "details": [
            "<strong>直觀的 Diff 預覽</strong>：在安全儀表板中，漏洞直接配備了推薦的修復代碼，清晰展示修改前後的語義變化。",
            "<strong>在 Web 終端中直接除錯驗收</strong>：點擊『Open in Claude Code』，在瀏覽器中啟動沙盒會話，與 Agent 對話微調補丁細節。",
            "<strong>自動掛載至 PR 討論串</strong>：一鍵點擊『Create PR』，修復代碼自動建立分支並關聯原安全報告，進入團隊的正常評審隊列。"
        ],
        "metaphor": "就像輪胎被釘子扎了一個小孔（孤立漏洞）：維修師傅不需要把整輛車的發動機和底盤拆開，直接拿出一枚專用補胎膠條塞入孔洞，充氣驗證不漏氣後立刻簽字交車。",
        "layout": "網頁端介面原型模擬圖：展示左側漏洞描述與嚴重性評級，右側直接呈現綠色的修復代碼 Diff 與『Create PR』按鈕。"
    },
    {
        "chapter_id": 17, "chapter_name": "第 17 章：Stage 6: Maintain — 定期弱點掃描：Recurring Codebase Scans", "page_num": 6,
        "title": "廣泛性架構弱點的演進：回流 Stage 1 重塑 intent.md",
        "subtitle": "如果漏洞不是單一補丁能解決的，而是跨多個服務的系統性架構缺陷？",
        "takeaway": "凡是涉及跨多個模組的共性安全漏洞或架構缺陷，嚴禁打補丁應付，必須寫成 intent.md 回到 Stage 1 重新正規立案！",
        "details": [
            "<strong>防範治標不治本的補丁地獄</strong>：如果十個微服務都存在身分驗證權限繞過，逐個打補丁只會讓系統更加脆弱且難以維護。",
            "<strong>提煉為架構重構意圖</strong>：將共性缺陷提煉為一份架構級的 `intent.md`（例如：『統一將內部服務改為零信任 mTLS 服務網格互通』）。",
            "<strong>走完完整的 AI-Native SDLC 流程</strong>：由 Stage 2 重新設計規範 `spec.md`，Stage 3 由 Agent 軍團並行重構，以系統工程徹底剷除病根！"
        ],
        "metaphor": "就像房屋地基下沉導致全樓十幾個房間的牆壁都出現了裂縫：如果你只是拿石膏逐個房間把裂縫抹平（打單點補丁），大樓遲早坍塌；你必須請建築工程隊重新打鋼管注漿加固地基（回流 Stage 1 架構重構）。",
        "layout": "雙軌處置分流圖：單點小漏洞 → 一鍵發起 PR；系統性架構缺陷 → 回流 Stage 1 寫成 intent.md 啟動全局重構。"
    },
    {
        "chapter_id": 17, "chapter_name": "第 17 章：Stage 6: Maintain — 定期弱點掃描：Recurring Codebase Scans", "page_num": 7,
        "title": "駁回理由的價值 (Dismissal with Reason)：消滅死灰復燃",
        "subtitle": "為什麼每一次判定為誤報時，都必須認真寫下駁回理由？",
        "takeaway": "駁回理由被永久寫入系統審計記錄，模型在下週巡檢時自動讀取該上下文，保證同一個被證實無害的點絕不反覆報警！",
        "details": [
            "<strong>杜絕週期性無效打擾</strong>：傳統掃描器最讓人痛恨的是，每週一掃出來的 100 個漏洞中有 90 個是工程師早就知道無害的歷史遺留。",
            "<strong>上下文增強記憶</strong>：當工程師駁回並標註：『此處未檢查 Token 是因為該接口僅在私有內網由健康檢查腳本調用』，模型下週自動記住此特例。",
            "<strong>審計員的法規存證庫</strong>：面對合規稽核時，駁回歷史清晰證明：團隊並不是忽視了漏洞，而是經過資深專家嚴格論證確認安全後受控放行。"
        ],
        "metaphor": "這就像小區物業安保系統的白名單備註：業主家養了一隻受過專業訓練的大型導盲犬，保安在系統中備註『經街道與殘聯備案，免除禁養犬管制』，自此巡邏保安再也不會天天上門敲門盤問。",
        "layout": "審批彈窗示意圖：Dismiss 按鈕旁邊配備必填的『駁回原因下拉選單與備註文字方塊』，下方顯示歷史駁回記錄。"
    },
    {
        "chapter_id": 17, "chapter_name": "第 17 章：Stage 6: Maintain — 定期弱點掃描：Recurring Codebase Scans", "page_num": 8,
        "title": "修復後的閉環防禦：自動收錄至 Continuous Evals 套件",
        "subtitle": "將修復的漏洞類別，轉化為檢驗全體 Agent 的防禦靶標",
        "takeaway": "當一項重大漏洞被修復並上線後，立刻為該漏洞類別新增一個 Eval，確保引導 Agent 的配置從此對該漏洞具備永久免疫力！",
        "details": [
            "<strong>防範未來編碼再犯</strong>：修復了當前代碼只完成了 50%，如果未來的 Agent 寫新功能時又寫出同樣的漏洞，等於前功盡棄。",
            "<strong>將漏洞寫入回歸套件</strong>：在 `evals/` 中新增該漏洞的攻擊測試題，任何對 `CLAUDE.md` 或 Skills 的修改，都必須能成功防禦該題目。",
            "<strong>推動組織免疫系統的指數級進化</strong>：每一次外界威脅的入侵與排除，都轉化為增強自身抗體密度的黃金養料！"
        ],
        "metaphor": "就像海關查獲了一起利用偽裝空心油桶走私黃金的新手法（發現新漏洞）：海關不僅沒收了這批黃金（修復代碼），更立刻將這種空心油桶的 X 光透視特徵圖譜輸入到全國海關智慧安檢機的自動報警資料庫中（新增 Eval），今後任何口岸遇到類似包裝一秒識別報警！",
        "layout": "漏洞進化閉環圖：安全掃描捕獲漏洞 → 發布修復 PR → 自動提煉為安全 Eval → 守門未來所有研發分支。"
    },
    {
        "chapter_id": 17, "chapter_name": "第 17 章：Stage 6: Maintain — 定期弱點掃描：Recurring Codebase Scans", "page_num": 9,
        "title": "與現有安全工單體系整合：CSV、Markdown 與 Webhooks",
        "subtitle": "不創造資訊孤島：讓審計員在他們習慣的 Jira/ServiceNow 中看到一切",
        "takeaway": "支援將掃描發現無縫導出為 CSV、Markdown，或透過 Webhook 自動同步至企業現有的 Jira / ServiceNow 追蹤系統中。",
        "details": [
            "<strong>單一真相源與合規傳承</strong>：企業安全運營中心 (SOC) 不需要適應新介面，漏洞自動轉化為符合企業 SLA 的安全工單。",
            "<strong>可自動化關閉工單</strong>：當後續每週掃描確認修復 PR 已經合併且漏洞徹底消失時，Webhook 自動將對應的 Jira 工單流轉為 Closed。",
            "<strong>法規審計報表一鍵導出</strong>：一鍵生成符合 PCI-DSS、HIPAA 或金融審管要求的全年度代碼弱點修復與閉環趨勢報表。"
        ],
        "metaphor": "這就像全球各地的氣象觀測站：觀測站採用了最先進的量子雷達掃描大氣，但在發布數據時，依然按照世界氣象組織 (WMO) 的標準格式打包發送，全球各國的氣象預報台與機場調度中心能直接無縫接收讀取。",
        "layout": "數據打通架構圖：Claude Security 發現 → Webhook 轉發 → 企業現有 Jira/ServiceNow 工單池 → 自動雙向狀態同步。"
    },
    {
        "chapter_id": 17, "chapter_name": "第 17 章：Stage 6: Maintain — 定期弱點掃描：Recurring Codebase Scans", "page_num": 10,
        "title": "集中式安全管理：配額、席位與審計治理",
        "subtitle": "安全主管在管理員控制台中的全面掌控力",
        "takeaway": "企業中央管理控制台統一掌控哪些倉庫允許連接、誰持有掃描席位、算力預算限額，以及所有審查歷史的法定留痕。",
        "details": [
            "<strong>倉庫接入白名單控制</strong>：只有經過資安委員會批准的核心專案倉庫才允許掛接掃描管線，防止外洩私有專案邊界。",
            "<strong>統一的預算與調度策略</strong>：平台管理員設定每週掃描的 Token 預算上限與並發任務數，防止費用失控。",
            "<strong>無可辯駁的合規問責制</strong>：審計日誌完整記錄：何時發現了漏洞、置信度評分是多少、誰在幾點幾分簽核駁回、誰在幾點幾分批准補丁上線。"
        ],
        "metaphor": "如同國家外匯管理局的中央監控機房：每一筆跨國外匯交易的額度、授權銀行代碼與兌換時間戳全數在中央伺服器大螢幕上即時滾動，任何超額或異常調度在千分之一秒內被中央鎖定。",
        "layout": "管理控制台視圖：展示連接的倉庫清單、席位授權矩陣、月度掃描算力消耗儀表與合規日誌審計出口。"
    },
    {
        "chapter_id": 17, "chapter_name": "第 17 章：Stage 6: Maintain — 定期弱點掃描：Recurring Codebase Scans", "page_num": 11,
        "title": "第十七章實戰總結：讓代碼庫隨著時代進化而愈發堅固",
        "subtitle": "Stage 6 Maintain 安全巡檢核心總結與下章預告",
        "takeaway": "定期代碼庫弱點掃描消滅了『靜態代碼雙向過期』的威脅，讓系統代碼庫在模型能力的演進洪流中永遠立於不敗之地！",
        "details": [
            "<strong>四大核心落腳點</strong>：每週全量掃描、置信度過濾、小漏洞一鍵提 PR、大架構缺陷回流 Stage 1 重做 intent.md。",
            "<strong>常態巡檢已佈防，但突發深夜事故怎麼辦？</strong>：警報常常在半夜十點突襲，工程師不在電腦前該如何應對？",
            "<strong>前瞻第十八章</strong>：如果事故直接降臨在 Slack/Teams 通訊群組中，如何讓 Claude 成為全天候輪值待命的第一響應者？第十八章『Claude on call with Claude Tag』將震撼為您揭曉！"
        ],
        "metaphor": "定期掃描就像一位永不疲倦的深海潛水巡檢員，每週末安靜地巡視著大壩的每一條水下接縫與基樁；而下一章，我們將為整個工程指揮部配備一名 24 小時值班待命、一聲召喚瞬間抵達戰場的終極救火特工！",
        "layout": "三條核心實踐卡片，底部搭配通往第十八章 Claude Tag 突發事件響應的高亮通訊標誌。"
    }
]
print("Chapter 17 slides:", len(slides))
