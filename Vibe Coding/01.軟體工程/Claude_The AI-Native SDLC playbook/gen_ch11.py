# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 11, "chapter_name": "第 11 章：Stage 4: Test — 自我驗證循環：Feedback Loops", "page_num": 1,
        "title": "賦予 Claude 自我除錯的鏡子：Feedback Loop 的核心價值", "subtitle": "不要替 Agent 擦屁股：讓它自己發現錯誤、自己修復",
        "takeaway": "永遠給予 Claude 一個驗證自身工作的閉環機制，無論是單元測試、建置編譯還是前端截圖比對。",
        "details": [
            "<strong>把低級錯誤消滅在出生地</strong>：未配備反饋迴圈的 Agent 會把包含語法錯誤或空指標的代碼交給工程師，浪費寶貴的人力審查精力。",
            "<strong>自主修復的驚人韌性</strong>：當擁有反饋通道時，Agent 在遇到測試報錯後能自動分析 Stack Trace，修改代碼並重新運行，直到全綠。",
            "<strong>工程師驗收時的從容</strong>：當你回到終端時，看到的是已經自主循環嘗試了三次、最終全部綠燈通過的高品質交付成果。"
        ],
        "metaphor": "這就像給一位正在練習射箭的盲人射手配備了一名報靶語音機器人：每射出一箭，耳機立刻提示『偏左三公分、偏高兩公分』，射手能自主微調姿勢，直到連續命中十環。",
        "layout": "自適應迴圈圖：編碼 → 執行測試 → 捕獲錯誤輸出 → 分析反思 → 自動調整代碼 → 再次執行，直到完全綠燈。"
    },
    {
        "chapter_id": 11, "chapter_name": "第 11 章：Stage 4: Test — 自我驗證循環：Feedback Loops", "page_num": 2,
        "title": "Feedback Loop vs Verifier Subagent：維度辨析",
        "subtitle": "Anthropic 官方澄清：貫穿始終的實時反饋 vs 最終的獨立大檢",
        "takeaway": "反饋迴圈是貫穿整個編碼任務的『心跳循環』；而驗證員特工 (Verifier) 則是全部完工後在乾淨視窗進行的『最終驗收審計』。",
        "details": [
            "<strong>Feedback Loop（常態化反饋）</strong>：每改動幾行或一個函數就運行一次快速檢查，陪伴整個實作過程，及時糾偏。",
            "<strong>Verifier Subagent（獨立質檢特工）</strong>：實作全部宣告結束後啟動，具備乾淨未被污染的 Context，從用戶黑盒角度啟動應用端到端驗收。",
            "<strong>內外兼修的品質保障</strong>：內部靠 Feedback Loop 確保邏輯零件無瑕疵，外部靠 Verifier 確保組裝後的整車運轉流暢。"
        ],
        "metaphor": "Feedback Loop 就像砌牆泥瓦匠手中的『水平尺與鉛垂線』，每砌一塊磚就看一眼氣泡是否居中；而 Verifier 則是樓房封頂後的『第三方國家房屋安全檢測工程師』帶著專用儀器上門驗收。",
        "layout": "2x2 維度對照矩陣：從執行頻次、上下文純淨度、修復權限與核心目的四個維度嚴密區分二者。"
    },
    {
        "chapter_id": 11, "chapter_name": "第 11 章：Stage 4: Test — 自我驗證循環：Feedback Loops", "page_num": 3,
        "title": "封裝單一簡潔的退出指令：Non-zero Exit Code 的魔力",
        "subtitle": "消除環境複雜性：將繁瑣的驗證流程打包為 make test 或 npm test",
        "takeaway": "如果檢查工作需要一系列複雜命令，必須將其封裝為一個單一 target，且在失敗時精確返回非零退出碼。",
        "details": [
            "<strong>Agent 最擅長二元判定</strong>：Exit 0 代表通過，Non-zero（非零）代表失敗；簡潔的退出碼是激發 LLM 反省的最強信號。",
            "<strong>消滅多步驟交互摩擦</strong>：不要讓 Agent 分別手動執行編譯、啟動容器、執行 curl、過濾 grep，打包成一鍵式 `make test`。",
            "<strong>在 CLAUDE.md 中給出健康範例</strong>：在文檔中明確列出健康時的輸出日誌，讓 Agent 能精準比對終端反饋是否符合預期。"
        ],
        "metaphor": "這就像汽車儀表板上的『故障警報紅燈』：司機不需要懂得複雜的曲軸轉速感測器電壓脈衝，只要紅燈亮起（Non-zero），就知道出問題了必須檢查；紅燈熄滅（Exit 0），放心上路。",
        "layout": "封裝示意圖：複雜的 Docker 啟動、資料庫 Migration、單元測試被包裹進一個簡潔的 `make test` 黑色魔術箱中。"
    },
    {
        "chapter_id": 11, "chapter_name": "第 11 章：Stage 4: Test — 自我驗證循環：Feedback Loops", "page_num": 4,
        "title": "設定可量化的清晰目標：讓 Agent 懂得何謂『成功』",
        "subtitle": "拒絕模糊的指令：提供非黑即白的機器可判定斷言",
        "takeaway": "不要只說『幫我測試一下』，而要給出可量化的確定性指標，例如：『test_status.py 全部通過』或『接口返回 200 且包含新欄位』。",
        "details": [
            "<strong>模糊指令引發幻覺妥協</strong>：如果目標不明確，Agent 看到幾行無關的輸出就可能自作主張判定為『測試看起來已經差不多了』。",
            "<strong>精確的量化驗收目標</strong>：指定具體的測試檔案名稱、預期的 HTTP 狀態碼、預期產出的 JSON Schema 結構或覆蓋率百分比。",
            "<strong>賦予無人值守的自主評判權</strong>：當目標高度量化時，Claude 完全不需要中途停下來詢問人類『這樣算不算成功』，自主直奔終點。"
        ],
        "metaphor": "就像跳高比賽的『橫竿標尺』：橫竿精確架在 2 米 10 的高度，運動員跳過去了就是成功，碰落了就是失敗，絕對沒有裁判主觀給『印象分』的模糊空間。",
        "layout": "指標看板對照：左側為模糊指令（紅色叉號：隨便測測），右側為量化斷言（綠色勾選：12 tests passed, 0 failures, 100% assertions met）。"
    },
    {
        "chapter_id": 11, "chapter_name": "第 11 章：Stage 4: Test — 自我驗證循環：Feedback Loops", "page_num": 5,
        "title": "Bug 修復的 TDD 鐵律：必須先寫失敗測試 (Failing Test First)",
        "subtitle": "Anthropic 官方核心實戰原則：未重現的 Bug 絕不能直接修",
        "takeaway": "遇到 Bug 時，要求 Claude 先編寫一個能精準重現該 Bug 的失敗測試，提交該測試，然後才能著手修復業務代碼。",
        "details": [
            "<strong>第一步：用測試重現問題</strong>：要求 Claude 將使用者報告的故障現象編寫為單元測試，執行並親眼確認失敗原因與預期一致。",
            "<strong>第二步：鎖定並提交失敗測試</strong>：將這個紅燈測試單獨 Commit，作為該 Bug 存在過的鐵證，並在後續修復中被 Hook 保護。",
            "<strong>第三步：只修代碼，使測試翻綠</strong>：在不允許碰觸測試檔案的前提下，讓 Claude 專注修改業務代碼，直到測試全綠。",
            "<strong>終生免疫的防回歸資產</strong>：這個由故障轉化而來的測試用例，將永久留存在代碼庫中，未來任何重構都無法再度引發同類歷史悲劇！"
        ],
        "metaphor": "就像刑警破案：在抓捕嫌疑人之前，必須先在犯罪現場用石灰線精準圈出受害人倒地位置、提取指紋彈殼（編寫失敗測試並固定物證），絕不能憑空想像隨意抓人交差。",
        "layout": "TDD 三步法箭頭圖：1. 編寫重現測試 (紅燈) → 2. Git Commit 固化防篡改 → 3. 修改代碼 (綠燈通過)。"
    },
    {
        "chapter_id": 11, "chapter_name": "第 11 章：Stage 4: Test — 自我驗證循環：Feedback Loops", "page_num": 6,
        "title": "保護測試防篡改：禁止修改考卷的防禦 Hook",
        "subtitle": "斬斷投機取巧：防止 Agent 在遇到挫折時偷改測試斷言",
        "takeaway": "必須配合使用 PreToolUse Hook，在 Bug 修復任務中徹底封鎖對測試檔案的寫入權限，或者在 PR Review 中將其一票否決。",
        "details": [
            "<strong>模型的逃避心理機制</strong>：當經過幾次迭代依然無法讓複雜演算法通過測試時，模型可能為了『滿足全綠要求』而調低測試標準。",
            "<strong>確定性腳本守護</strong>：在任務啟動時標記上下文，Hook 攔截一切針對 `tests/**` 目錄的編輯意圖，退出碼為 2，強制把精力鎖死在業務邏輯上。",
            "<strong>最純粹的真理檢驗</strong>：在修復任務之前就已存在、且在修復過程中完全不可被 Agent 改動的測試，是證明 Bug 徹底消失的唯一權威真理！"
        ],
        "metaphor": "這就像防作弊監考員：考生的鉛筆盒只能放在桌角，草稿紙由考場統一發放且蓋有鋼印，考卷標準答案鎖在保險箱中，考生休想用修正帶塗改評分規則。",
        "layout": "防禦攔截時序圖：Claude 意圖調用 Edit(test_status.py) → Hook 觸發正則攔截 → 回傳 Exit 2 阻斷 → Claude 轉而修改業務檔案。"
    },
    {
        "chapter_id": 11, "chapter_name": "第 11 章：Stage 4: Test — 自我驗證循環：Feedback Loops", "page_num": 7,
        "title": "前端視覺驗證閉環：自動截圖與 Pixel Diff",
        "subtitle": "讓 Agent 睜開眼睛：告別純代碼盲打，邁向所見即所得的視覺自愈",
        "takeaway": "對於 UI 與前端工作，給予 Claude 瀏覽器控制或截圖工具，將 Stage 2 批准的原型作為基準，進行多輪自動對比修復。",
        "details": [
            "<strong>視覺感知工具賦能</strong>：透過 Playwright 或 Chrome DevTools 協議，Agent 在本機啟動無頭瀏覽器，自動導航至頁面並擷取全高解析度截圖。",
            "<strong>閉環迭代三部曲</strong>：實作組件 (Implement) → 拍攝截圖 (Screenshot) → 比對差異 (Compare) → 微調 CSS 樣式 (Adjust)。",
            "<strong>兩到三輪的常態收斂</strong>：通常經過 2~3 輪的微調，按鈕邊距 (Padding)、字體層次、色彩對比度將迅速與設計圖完美契合。"
        ],
        "metaphor": "就像一位繪製古典寫實肖像的油畫家：他一邊看著眼前的模特兒（設計 Mock），一邊在畫布上塗抹油彩，每畫幾筆就退後三步瞇起眼睛比對光影（截圖 Diff），反覆修飾直到神形兼備。",
        "layout": "視覺反饋閉環示意圖：左側為基準 Mock 圖，中間為當前截圖與 Diff 熱力圖，右側為 Claude 正在微調的 Tailwind CSS 類名。"
    },
    {
        "chapter_id": 11, "chapter_name": "第 11 章：Stage 4: Test — 自我驗證循環：Feedback Loops", "page_num": 8,
        "title": "CLAUDE.md 中的 Verification Block 實戰模組",
        "subtitle": "Anthropic 官方支付服務實例深度解構",
        "takeaway": "將驗證段落寫入 CLAUDE.md，是一套低成本卻能立竿見影提升全團隊交付品質的神級習慣。",
        "details": [
            "```markdown\n## Verifying your work\n\n- Build: make build (must finish with \"Build succeeded\")\n- Test: make test (all green; never skip or delete a failing test)\n- Lint: make lint (zero warnings)\n\nRun all three before reporting any task complete, and paste the output.\nIf a test fails, fix the code, not the test.\n```",
            "<strong>三大紀律八項注意</strong>：明確列出 Build、Test、Lint 的終點線標準與禁止跳過指令。",
            "<strong>黏貼證據 (Proof of Work)</strong>：要求 Agent 在回報任務完成的同時，必須將真實終端機的綠燈日誌貼在回覆末尾，供人類一目了然驗收。"
        ],
        "metaphor": "這就像快遞簽收制度：派送員不僅要按門鈴，還必須請收件人簽署大名並拍攝收件人親手接過包裹的照片上傳至系統，才算完成交付任務。",
        "layout": "代碼高亮展示 Verification Block，右側附帶『強制綠燈日誌證明』的金色檢查標籤。"
    },
    {
        "chapter_id": 11, "chapter_name": "第 11 章：Stage 4: Test — 自我驗證循環：Feedback Loops", "page_num": 9,
        "title": "極限邊界與自適應容錯：防止陷入死循環",
        "subtitle": "當修復嘗試超過五次依然失敗時，如何優雅止損？",
        "takeaway": "設定最大迭代次數閾值，一旦自我修復陷入僵局，立即終止循環並主動向工程師呈報詳細診斷報告。",
        "details": [
            "<strong>死循環的風險</strong>：如果錯誤根源在於底層架構缺陷或第三方庫 Bug，Agent 可能在錯誤的代碼周圍反覆打轉無效修補。",
            "<strong>計數器與超時保護</strong>：配置單一任務最大修復嘗試輪次（如 5 輪），超過閾值自動中斷執行並保存當前上下文。",
            "<strong>結構化故障報告輸出</strong>：向工程師清晰列出：『我嘗試了方案 A（失敗於 X）、方案 B（失敗於 Y），推測可能是資料庫連線池耗盡，請人工介入裁決』。"
        ],
        "metaphor": "就像潛水艇上的『自動逃生浮標』：在深度故障無法自愈時，系統不再做無謂的動力掙扎，而是及時向海面釋放高亮信號浮標與位置黑盒子，等待外部救援力量精準介入。",
        "layout": "容錯流動圖：修復計數器 N<5 → 繼續自我修復；N>=5 → 觸發緊急制動並產出結構化診斷摘要交由人類接管。"
    },
    {
        "chapter_id": 11, "chapter_name": "第 11 章：Stage 4: Test — 自我驗證循環：Feedback Loops", "page_num": 10,
        "title": "單機自檢與持續集成的銜接：為 Continuous Evals 鋪路",
        "subtitle": "本地小閉環是雲端大評測的堅實基礎",
        "takeaway": "本地的 Feedback Loop 解決的是『當前特定功能有沒有寫對』；而下一章的 Continuous Evals 將在雲端解決『系統全局大腦有沒有退化』。",
        "details": [
            "<strong>微觀與宏觀的互補</strong>：本地測試是針對單一 PR 變更的微觀防線，運行快速、反饋敏捷。",
            "<strong>將修復任務沉澱為資產</strong>：每次本地透過 TDD 捕獲並修復的重大缺陷，都是未來收錄進入全庫持續評測套件 (Evals Suite) 的黃金原材料！",
            "<strong>無縫對接 CI/CD</strong>：本地能全綠通過的代碼，推送到 GitHub Actions 後幾乎能保證 100% 一次通過，徹底消滅 CI 紅燈堵塞現象。"
        ],
        "metaphor": "這就像航天飛機發射前的兩級點火測試：本地 Feedback Loop 是在裝配廠對單個火箭推進噴管進行氣密性自檢；而雲端 Continuous Evals 則是整個航天飛機垂直豎立在發射台上的全系統聯合熱試車。",
        "layout": "雙層階梯遞進圖：展示底層本地 Feedback Loops 與頂層雲端 CI Evals 的流暢交接脈絡。"
    },
    {
        "chapter_id": 11, "chapter_name": "第 11 章：Stage 4: Test — 自我驗證循環：Feedback Loops", "page_num": 11,
        "title": "第十一章實戰總結：讓代碼帶著『綠燈保證書』出廠",
        "subtitle": "Stage 4 Test 本地自我驗證心法與下章預告",
        "takeaway": "永遠不要把包含低級錯誤的代碼交給真人審查；讓 Agent 帶著自我驗證的綠燈日誌出廠，是對人類時間的最大尊重！",
        "details": [
            "<strong>三大心法</strong>：始終包裹單一 non-zero 命令、Bug 修復必須 TDD 失敗測試先決、用 Hook 保護測試防篡改。",
            "<strong>品質躍遷</strong>：當本地驗證閉環就緒，代碼品質已經達到前所未有的高度。",
            "<strong>前瞻第十二章</strong>：如果我們更新了模型、重寫了 Prompt 或微調了 Skill，如何確保 Agent 的大腦整體能力沒有悄悄倒退？第十二章『Continuous Evals in CI』將震撼登場！"
        ],
        "metaphor": "一家只出售經過 100% 通電自檢合格產品的電器工廠，其品牌聲譽與客戶信任將堅如磐石；Feedback Loop 就是每位工程師手中那張蓋有『質檢合格』鋼印的出廠通行證！",
        "layout": "三條核心實踐卡片，底部搭配通往第十二章 Continuous Evals 的躍遷箭頭。"
    }
]
print("Chapter 11 slides:", len(slides))
