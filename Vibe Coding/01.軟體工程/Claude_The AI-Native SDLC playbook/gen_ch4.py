# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 4, "chapter_name": "第 4 章：Stage 2: Design — 規格工程與 spec.md", "page_num": 1,
        "title": "從 intent.md 到 spec.md：架構設計的自動化跨越", "subtitle": "將粗糙的商業意圖，轉化為工程團隊可直接施工的嚴謹藍圖",
        "takeaway": "產品負責人不再需要一行行痛苦地編寫規格書，而是讓 Claude 讀取已批准的 intent.md 並自動產出 spec.md。",
        "details": [
            "<strong>意圖與規格的本質鴻溝</strong>：intent.md 講述『為什麼要解決、目標是什麼』；spec.md 必須闡明『如何與現有代碼整合、架構邊界在哪』。",
            "<strong>自動化跨越的推動力</strong>：Claude 深入分析代碼庫現狀，結合業務約束，自動生成涵蓋 API 定義、狀態流轉與資料流的完整規格。",
            "<strong>徹底釋放產品經理精力</strong>：PO 的核心任務從『鍵盤打字撰寫者』轉型為『高階規格審核員與衝突協調者』。"
        ],
        "metaphor": "這就像從業主的『室內裝潢願望清單』（想要寬敞客廳與現代極簡風），自動轉化為包含承重牆標註、水電走線路徑與消防規格的『施工級工程建築圖』。",
        "layout": "轉化圖示：左側為 20 行簡約的 intent.md，穿過中央的 Claude 轉化引擎，右側噴湧出長達數頁的專業架構 spec.md。"
    },
    {
        "chapter_id": 4, "chapter_name": "第 4 章：Stage 2: Design — 規格工程與 spec.md", "page_num": 2,
        "title": "拒絕白紙一張：讓企業 Skills 全程引領規格生成", "subtitle": "如果沒有約束，AI 生成的規格只是一紙無法落地的空中樓閣",
        "takeaway": "規格生成絕非盲目提問，必須在 Prompt 中明確掛載組織的各項 Skills，確保設計與企業標準天然契合。",
        "details": [
            "<strong>無約束生成的災難</strong>：未加約束的 LLM 可能會隨意設計出不符合公司技術棧的協定（例如公司用 gRPC，AI 卻設計出 GraphQL）。",
            "<strong>Skills 作為規格護欄</strong>：將企業的技術標準、API 規範、登入授權機制封裝為 Skills，在生成階段直接對 Claude 進行嚴格約束。",
            "<strong>事前合規 (Compliance-by-Design)</strong>：規範不再是上線前安全評審時的絆腳石，而是在繪製規格草圖的第一天就內化於骨髓之中。"
        ],
        "metaphor": "就像在電腦輔助設計軟體 (CAD) 中預先載入了國家建築防震法規與標準型鋼零件庫，工程師畫出的每一根樑柱，系統都自動校驗其承重與合規性。",
        "layout": "約束注入圖：中央為正在生成的 spec.md，上方注入 Brand/Security/UX 等多個 Skill 模組，下方展示產出的高合規規格。"
    },
    {
        "chapter_id": 4, "chapter_name": "第 4 章：Stage 2: Design — 規格工程與 spec.md", "page_num": 3,
        "title": "注入四大支柱：品牌、資安、合規與 UX 標竿", "subtitle": "多維度企業制度資產在設計階段的全面融合",
        "takeaway": "一份合格的 spec.md 必須同時經受品牌準則、資安條例、法規合規與用戶體驗四重標準的嚴格淬煉。",
        "details": [
            "<strong>品牌準則 (Brand Guidelines)</strong>：元件色彩體系、字體排版層次、按鈕交互動效與企業專屬語調風格。",
            "<strong>資安條例 (Security Policies)</strong>：無匿名訪問、API 必須經過 Gateway JWT 驗證、敏感資訊嚴格脫敏。",
            "<strong>合規要求 (Compliance & Governance)</strong>：審計日誌全量採集、符合 GDPR/HIPAA 等資料主權規範。",
            "<strong>UX 標竿 (UX Standards)</strong>：響應式介面支援、無障礙訪問標準 (a11y) 與高頻異常提示友好度。"
        ],
        "metaphor": "如同製造一輛現代化汽車，底盤設計（架構）必須同時滿足歐盟五星防撞標準（安全）、歐盟六期排放（合規）、品牌家族水箱罩外觀（品牌）與人體工學座椅舒適度（UX）。",
        "layout": "四象限盾牌圖：中央為 spec.md 核心，四角分別排列 Brand、Security、Compliance、UX 四大標誌徽章。"
    },
    {
        "chapter_id": 4, "chapter_name": "第 4 章：Stage 2: Design — 規格工程與 spec.md", "page_num": 4,
        "title": "標註爭議點 (Flagged Concerns)：及早暴露政策衝突", "subtitle": "不可調和的矛盾絕不暗箱掩蓋，主動向上呈報給主管裁決",
        "takeaway": "Claude 在編寫 spec.md 時，必須主動列出所有相互抵觸的政策要求，這正是傳統分析師最寶貴的升級職能。",
        "details": [
            "<strong>政策衝突的真實存在</strong>：例如『業務希望在入口頁面展示理賠進度詳情』 vs 『安全政策禁止在未經二次身分驗證下暴露個人醫療敏感資訊』。",
            "<strong>拒絕 AI 自作主張的妥協</strong>：如果 Agent 暗中隨意偏向某一方，上線後必將引發重大爭端；正確作法是明確標註為 Flagged Concerns。",
            "<strong>呈交負責人仲裁</strong>：PO 在工程團隊看到文檔前，優先專注於調解這些標註的矛盾點，與法規及資安主管達成權衡共識。"
        ],
        "metaphor": "這就像在法庭上，助手律師主動向首席大律師遞交紅筆標註的條款：『這兩條法律判例存在司法解釋衝突，我們必須在庭審前確定優先順序！』",
        "layout": "衝突標註卡片：以顯眼的紅色引號展示矛盾政策，下方標註箭頭指向政策主管仲裁按鈕。"
    },
    {
        "chapter_id": 4, "chapter_name": "第 4 章：Stage 2: Design — 規格工程與 spec.md", "page_num": 5,
        "title": "產品負責人的全新職責：從撰寫者轉型為協調者", "subtitle": "專注於價值判斷與人際跨部門共識達成",
        "takeaway": "PO 的注意力從逐字排版中解放出來，全面聚焦於回答開放問題與推動爭議點的最終決策。",
        "details": [
            "<strong>逐條檢視業務意圖落實</strong>：spec.md 是否真正解決了 intent.md 中指出的理賠員話務負擔？預期收益是否清晰？",
            "<strong>閉合意圖中的 Open Questions</strong>：帶領團隊落實『第三方公證人是否需要訪問』，確認權限矩陣與資料隔離方案。",
            "<strong>跨部門利益對齊</strong>：與風控主管、合規主管在會議室中拍板安全爭議點，將裁決結論白紙黑字寫入 spec.md 的簽核歷史中。"
        ],
        "metaphor": "就像交響樂團指揮家：他自己不需要同時演奏小提琴、長笛與大提琴，他的價值在於調整各樂器部的平衡，化解刺耳的節奏衝突，引領全曲和諧高潮。",
        "layout": "職責轉型環狀圖：展示 PO 將 80% 時間投入在『爭議調解、跨部門溝通、業務指標審批』的高價值活動上。"
    },
    {
        "chapter_id": 4, "chapter_name": "第 4 章：Stage 2: Design — 規格工程與 spec.md", "page_num": 6,
        "title": "視覺與前端實戰：Claude Design 快速原型迭代", "subtitle": "從 intent.md 到像素級可互動介面設計的無縫演進",
        "takeaway": "前端工作是 AI-Native SDLC 最直觀的突破點：PO 可藉由 Claude Design 直接從 intent.md 生成互動原型並持續迭代。",
        "details": [
            "<strong>直觀視覺化回饋</strong>：將『展示理賠狀態與預估日期』一鍵轉化為完整的 Web/Mobile UI 原型畫面，包含顏色、字體與間距。",
            "<strong>口語化即時微調</strong>：『把進度條改成四階段時間軸』『加一個聯絡理賠員的折疊抽屜』，介面在數秒內實時響應刷新。",
            "<strong>消除設計與代碼的鴻溝</strong>：原型不再是 Figma 裡冷冰冰的靜態畫布，而是具備真實 DOM 結構、可直接導出工程代碼的動態原型。"
        ],
        "metaphor": "就像走進好萊塢特效攝影棚，導演對著虛擬攝影機說：『把背景燈光調暗一點，主角左側加一扇落地窗』，畫面立刻在螢幕上即時渲染成型。",
        "layout": "雙聯預覽圖：左側展示自然語言對話框，右側展示 Claude Design 即時生成的理賠狀態查詢前端介面。"
    },
    {
        "chapter_id": 4, "chapter_name": "第 4 章：Stage 2: Design — 規格工程與 spec.md", "page_num": 7,
        "title": "原型導出至 Claude Code：從像素草圖到工程規格", "subtitle": "打通設計與實作的最後一哩路，終結切圖時代",
        "takeaway": "在 Claude Design 中驗收完成的原型，可無損導出至 Claude Code，作為 Stage 3 編碼的直接依據與測試基準。",
        "details": [
            "<strong>自動萃取前端元件結構</strong>：導出乾淨的 React/Vue 元件樹、Tailwind CSS 樣式與 TypeScript 介面定義。",
            "<strong>雙重佐證規格 (Visual Proof)</strong>：將原型截圖與佈局規格納入 spec.md，工程師和 Agent 都不會對界面長相產生任何誤讀。",
            "<strong>後續自動化比對基石</strong>：該導出原型將在 Stage 4 (Test) 中作為視覺迴圈的基準圖（Baseline Mock），驅動截圖差異自動比對。"
        ],
        "metaphor": "這就像從 3D 虛擬黏土模型，一鍵轉換成可以直接輸入五軸 CNC 數控車床的精密切削代碼，完全不需要中間繪圖員重新手工描圖製版。",
        "layout": "數據流動箭頭：Claude Design 原型 → 導出組件代碼與 Mock 截圖 → 注入 spec.md 交付 Claude Code。"
    },
    {
        "chapter_id": 4, "chapter_name": "第 4 章：Stage 2: Design — 規格工程與 spec.md", "page_num": 8,
        "title": "官方標準 Prompt 深度拆解與 Slash Command", "subtitle": "Anthropic 團隊沉澱的黃金提示詞範式",
        "takeaway": "掌握觸發規格生成的標準 Prompt 結構，並將其封裝為組織級斜線指令，實現全團隊的一致性調用。",
        "details": [
            "```\nRead the attached intent.md and produce a requirements and design spec\nfor integrating it into our existing codebase. Apply the skills available\nto you so the plan conforms to our brand guidelines, security policies and UX standards.\nDocument the spec fully as spec.md, ready to hand to the engineering team.\nDescribe clearly any areas of concern, especially where you cannot satisfy\ncontradicting policies.\n```",
            "<strong>四個核心指令要素</strong>：指定輸入目標 (intent.md)、指明整合代碼庫語境、強制套用 Skills 約束、明確要求標註爭議點。",
            "<strong>自訂斜線指令 (Slash Command)</strong>：在團隊中固化為 `/spec` 指令，任何成員只需鍵入 `/spec` 即可自動發起規格 Pass。"
        ],
        "metaphor": "這就像工業標準化作業程序 (SOP) 中的『特級點火口令』，語法經過無數次實戰測試與壓力校驗，能穩定激發出模型最卓越的工程分析力。",
        "layout": "Prompt 結構拆解卡片：以高亮顏色標註『輸入源、語境邊界、約束引用、爭議回報』四大模組。"
    },
    {
        "chapter_id": 4, "chapter_name": "第 4 章：Stage 2: Design — 規格工程與 spec.md", "page_num": 9,
        "title": "自動化觸發流水線：intent.md 合併觸發規格 Pass", "subtitle": "告別手動開會催促進度，邁向事件驅動的流水線作業",
        "takeaway": "當 intent.md 在主幹被 PO 批准合併時，CI/CD 自動啟動非互動式作業，載入組織 Skills 並自動提交 spec.md PR。",
        "details": [
            "<strong>無人值守自動銜接</strong>：利用 Webhook 監聽 intents/ 目錄的 PR 合併事件，一旦合併立即在背景喚醒 Claude 進行分析。",
            "<strong>全自動提交規格 PR</strong>：Claude 產出 spec.md 後自動建立新分支並發起 PR，同時在 PR 描述中清晰標列出所有待決策的爭議點。",
            "<strong>PO 的第一時間介入</strong>：產品主管不再需要手動點擊任何工具，其介入的第一個時間節點就是打開這個已經備妥的規格 PR 進行覆核！"
        ],
        "metaphor": "如同工廠傳送帶：工長剛在上一工位蓋下合格章（Merge intent.md），機械手臂立刻將半成品自動抓取傳送至下一個精密加工機台，無縫開工。",
        "layout": "CI/CD 事件時序圖：Git Merge intent.md → Webhook 喚醒 Worker → 執行 Claude Pass → 提交 spec.md PR。"
    },
    {
        "chapter_id": 4, "chapter_name": "第 4 章：Stage 2: Design — 規格工程與 spec.md", "page_num": 10,
        "title": "規格治理與風險簽核：技術專家的裁決防線", "subtitle": "針對高風險變更的雙人簽章制 (Four-Eyes Principle)",
        "takeaway": "一般例行規格由 PO 簽核即可；但涉及高風險核心系統時，必須強制引入架構師或安全專家進行聯合簽章。",
        "details": [
            "<strong>風險分級判定</strong>：若變更觸及核心金流 (Payment)、身分認證 (Auth) 或重大架構變革，系統自動標記為 Higher Risk。",
            "<strong>明確記錄審查證據</strong>：生成的 spec.md、使用的 Prompt、引用的 Skills 版本全數與 PR 歷史一同鎖定，形成完整審計軌跡。",
            "<strong>啟動 Stage 3 的法定開關</strong>：只有當 spec.md 獲得具名授權並合併入版本庫時，Stage 3 的 Plan Mode 才能被獲准啟動。"
        ],
        "metaphor": "如同火箭發射程序：常規感測器檢測只需一位工程師打勾，但最後注入低溫推進劑與點火發射，必須由兩位指揮官同時插入並旋轉鑰匙。",
        "layout": "雙軌審批流程圖：低風險單人批准路線 vs 高風險雙人聯簽路線的清晰決策樹。"
    },
    {
        "chapter_id": 4, "chapter_name": "第 4 章：Stage 2: Design — 規格工程與 spec.md", "page_num": 11,
        "title": "第四章實戰總結：在動筆編碼前將架構衝突清零", "subtitle": "Stage 2 Design 核心價值與落地心得",
        "takeaway": "規格階段的嚴謹程度，直接決定了後續代碼實作的成敗與重構成本。",
        "details": [
            "<strong>核心心法</strong>：在純文字 Markdown 階段修改設計，成本是 1；在代碼階段修改是 10；在生產環境修復是 100！",
            "<strong>制度保障</strong>：Skills 將死板的 Wiki 制度轉化為活生生的 Agent 約束，爭議點的主動暴露避免了上線後的致命扯皮。",
            "<strong>邁向建置</strong>：下一章我們將進入最激動人心的 Stage 3: Build，探索 Claude Code 如何在 Plan Mode 下啟動縝密的實作推演！"
        ],
        "metaphor": "在沙盤上多推演三小時，就能在戰場上少流三萬人的鮮血；Stage 2 就是軟體工程的終極數位沙盤推演。",
        "layout": "三條核心守則總結卡片，底部搭配通往 Stage 3 Build 的躍遷箭頭。"
    }
]
print("Chapter 4 slides:", len(slides))
