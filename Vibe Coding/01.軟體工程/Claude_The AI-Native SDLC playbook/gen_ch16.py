# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 16, "chapter_name": "第 16 章：Stage 6: Maintain — 自主閉環監控：Closing the Loop", "page_num": 1,
        "title": "終結單向瀑布：SDLC 的自主自愈閉環", "subtitle": "從人工提報 Bug 到生產環境自感應重啟研發生命週期",
        "takeaway": "前五個階段解決了人如何調用 Claude；Stage 6 則標誌著核心質變：系統完全自主運轉，自行閉合研發迴圈。",
        "details": [
            "<strong>從人類敲門到環境自驅動</strong>：前述階段都需要工程師在第一步敲入指令或發起需求；Stage 6 則由生產指標的客觀數據自主喚醒 Agent。",
            "<strong>反向重啟 Stage 1 (Plan)</strong>：當線上指標發生漂移，監控腳本不是發送無人理睬的報警郵件，而是直接產出一份標準的 `intent.md` 注入意圖庫。",
            "<strong>流水線全自動流轉</strong>：這份自動產生的修復意圖，經過獨立置信度門禁裁決後，自動流經 Design 規格設計、Build 程式碼建置與 PR Review 審查！"
        ],
        "metaphor": "這就像從傳統的人工掃地（必須有人拿著掃把走過去打掃），進化到現代的智慧掃地機器人：當雷達感測到客廳地板有灰塵積聚時，機器人自動從充電樁出發清掃、自動避障倒垃圾，並在完成後返回充電，全過程主人無需說一句話。",
        "layout": "全生命週期莫比烏斯環圖：展示生產環境的運維信號如何跨越維度直接注入第一階段 Plan，形成一個首尾無縫相扣的永動閉環。"
    },
    {
        "chapter_id": 16, "chapter_name": "第 16 章：Stage 6: Maintain — 自主閉環監控：Closing the Loop", "page_num": 2,
        "title": "確定性監控腳本：排除模型主觀雜音的統計基石",
        "subtitle": "Anthropic 關鍵架構原則：異常探測絕不能交由 LLM 自由心證",
        "takeaway": "負責盯盤的探測腳本必須是純粹確定性、經過單元測試且版本控制的數學統計程式，不引入任何 AI 模型。",
        "details": [
            "<strong>防範警報幻覺與漏報</strong>：大語言模型不適合 7x24 小時盯著海量數字日誌看曲線，容易產生疲勞或主觀誤判。",
            "<strong>純數學統計指標</strong>：採用滾動 30 天移動平均線 (Rolling 30-day Baseline) 與標準差，利用經典的 Western Electric 統計過程控制規則。",
            "<strong>探測慢速漂移 (Slow Drift)</strong>：不僅能捕獲突發斷崖式暴跌，更能敏銳識別出過去三天連續偏離均值的微小退化趨勢。"
        ],
        "metaphor": "就像重症監護室 (ICU) 的心電監護儀：監測心跳停止的傳感器必須是純粹的電生理脈衝電路（確定性數學腳本），絕不能裝一個只會聊天的人形機器人在旁邊盯著病人臉色猜測心跳。",
        "layout": "控制圖 (Control Chart) 示意圖：展示滾動均值線、1σ、2σ、3σ 控制帶邊界，以及真實指標點在控制帶內外的分佈。"
    },
    {
        "chapter_id": 16, "chapter_name": "第 16 章：Stage 6: Maintain — 自主閉環監控：Closing the Loop", "page_num": 3,
        "title": "配置化階梯響應：bands.yaml 的三級防禦體系",
        "subtitle": "Anthropic 官方規範：1σ 記錄、2σ 唯讀診斷、3σ 採取行動",
        "takeaway": "將應變策略寫入版本控制的 bands.yaml，依據偏離標準差程度分級授予 Agent 診斷與處置權力。",
        "details": [
            "<strong>1-Sigma（輕微波動）</strong>：僅記錄日誌 (log)，作為長期統計背景數據，不浪費任何 Token 或告警通道。",
            "<strong>2-Sigma（異常漂移）</strong>：唯讀喚醒 Claude 進行診斷 (diagnose)，授權調用 Read、Grep 與 `gh run view` 深入排查日誌。",
            "<strong>3-Sigma（嚴重事故）</strong>：正式採取行動 (propose)，授權發起修復 PR，或直接觸發預先批准的一鍵回滾 Runbook！"
        ],
        "metaphor": "這就像防空警報體系：探測到遠處有未識別雷達信號亮黃燈僅作日誌記錄（1σ）；信號進入近海防空識別區拉響防空警報並起飛戰機查證（2σ）；敵機一旦越過海岸線防空導彈立刻鎖定發射攔截（3σ）。",
        "layout": "三級階梯儀表板：綠色 1σ (Log) → 黃色 2σ (Diagnose) → 紅色 3σ (Propose Action / Rollback) 的清晰權限矩陣。"
    },
    {
        "chapter_id": 16, "chapter_name": "第 16 章：Stage 6: Maintain — 自主閉環監控：Closing the Loop", "page_num": 4,
        "title": "官方實戰範例剖析：bands.yaml 監控 CI 失敗率",
        "subtitle": "Anthropic 原生指南：十行配置如何守護流水線健康？",
        "takeaway": "以監控 CI 測試失敗率為例，優雅展示如何將統計規則、工具限制與處置路徑結構化封裝。",
        "details": [
            "```yaml\nmetric: ci_test_failure_rate\nbaseline: rolling_30d\nrules: western_electric\ntiers:\n  1sigma: { action: log }\n  2sigma: { action: diagnose,\n            tools: \"Read,Grep,Bash(gh run view *)\" }\n  3sigma: { action: propose,\n            routes: [pull_request, runbook:rollback-deploy] }\n```",
            "<strong>工具精確授權</strong>：在 2σ 階段嚴格限制只能執行讀取與 `gh run view`，防止 Agent 在探測階段亂改系統。",
            "<strong>受控的行動路徑</strong>：在 3σ 階段，Agent 的處置動作被嚴格限定在預先批准的兩個管道：提 PR 或調用已演練過的回滾命令。"
        ],
        "metaphor": "宛如民防應急救援預案卡片：上面印著當水位達到警戒水位時只加強巡堤（1σ）；達到保證水位時各級官兵進駐堤防沙袋待命（2σ）；一旦大水漫堤立刻炸開分洪閘分流（3σ），分毫不亂。",
        "layout": "代碼區塊完整呈現 bands.yaml 配置，右側標註『西點規則、工具白名單、行動路由』三大要素。"
    },
    {
        "chapter_id": 16, "chapter_name": "第 16 章：Stage 6: Maintain — 自主閉環監控：Closing the Loop", "page_num": 5,
        "title": "無狀態非互動觸發：Stateless & Non-interactive",
        "subtitle": "一個閉環如何不需要任何人敲鍵盤，就能自主開始並優雅結束？",
        "takeaway": "觸發層透過 GitHub 定時排程、監控 Webhook 或 Cron Job 喚醒，以完全無狀態方式在沙盒容器中運行。",
        "details": [
            "<strong>無狀態執行 (Stateless Execution)</strong>：Agent 每次被喚醒都是一個全新的容器進程，不依賴任何本地殘留記憶，排查完畢即刻銷毀容器。",
            "<strong>零人類等待點</strong>：從探測到 3σ 異常、喚醒 Claude、讀取錯誤日誌、生成診斷意圖到提交 PR，整個過程在 90 秒內無人值守全自動完成。",
            "<strong>自動產出符合 Stage 1 格式的 intent.md</strong>：包含異常證據、受影響系統與建議修復方案，完美融入常規研發流。"
        ],
        "metaphor": "就像太空探測器上的『自主重啟看門狗電路』：當主處理器因宇宙射線輻射死機時，獨立的硬體計時器瞬間重置 CPU、清空緩存、重新加載安全韌體並向地球發送一條自檢報告，一切全自動完成在百毫秒之內。",
        "layout": "非同步時序圖：Cron Trigger → 喚醒 Stateless Runner → 抓取 Metric → Claude 生成 intent.md → 自動 Push Git 分支發起 PR。"
    },
    {
        "chapter_id": 16, "chapter_name": "第 16 章：Stage 6: Maintain — 自主閉環監控：Closing the Loop", "page_num": 6,
        "title": "三大經典自愈場景：CI 失敗率、5xx 錯誤率與 PR 週期",
        "subtitle": "從生產運行指標到研發流程效能指標的全面覆蓋",
        "takeaway": "Closing the loop 不僅能自愈生產伺服器故障，更能主動診斷團隊組織流程本身的瓶頸漂移！",
        "details": [
            "<strong>場景一：CI 測試失敗率突破 3σ</strong>：Agent 自動分析最新合併的提交，定位引發失敗的 Flaky 測試，自動開 PR 將該測試隔離 (Quarantine) 或提交 Revert PR。",
            "<strong>場景二：發布後 5xx 錯誤率突破 3σ</strong>：若在發布窗口期內錯誤率激增，Agent 自動觸發預先批准的一鍵回滾管線，秒級止血。",
            "<strong>場景三：PR 審查週期時間突破漂移規則</strong>：若發現團隊 PR 平均等待時間從 4 小時漂移至 48 小時，Agent 自動為研發主管產出一份流程瓶頸歸因診斷報告！"
        ],
        "metaphor": "這就像一個既懂得自我止血的智慧士兵（自愈代碼故障），同時還具備自我心理疏導能力的健康手環（診斷組織流程堵塞），身心雙重自愈進化。",
        "layout": "三場景卡片圖：分別展示 CI 測試隔離、生產秒級回滾、流程漂移診斷的觸發圖表與處置結果。"
    },
    {
        "chapter_id": 16, "chapter_name": "第 16 章：Stage 6: Maintain — 自主閉環監控：Closing the Loop", "page_num": 7,
        "title": "值班負責人 (On-call) 的審批分流佇列",
        "subtitle": "人依然是守門員：修復、排期或忽略的三岔路口",
        "takeaway": "自動生成的修復意圖並非直接上線，而是匯入值班工程師的排查隊列，由人類做出最高決策裁定。",
        "details": [
            "<strong>路徑一：立即修復 (Fix Now)</strong>：確認是重大生產缺陷，一鍵批准將該 intent.md 推入後續的自動化實作與發布管線。",
            "<strong>路徑二：排入待辦 (Schedule)</strong>：非緊急的輕微效能優化，自動轉發給產品經理納入下個 Sprint 的正常迭代待辦池。",
            "<strong>路徑三：駁回忽略 (Dismiss with Reason)</strong>：判定為偶發雜訊，填寫駁回理由；這些駁回記錄將作為反饋數據，用於反向調優控制帶敏感度！"
        ],
        "metaphor": "如同機場行李分揀台的安檢主管：自動光譜儀標記出可疑包裹後送上分揀轉盤，主管看一眼儀表：立即開箱檢查（Fix now）、貼上普通慢運標籤（Schedule），或是確認是無害液體揮手放行（Dismiss）。",
        "layout": "分流決策樹：自動生成的 intent.md → On-call Engineer 面板 → [Fix Now / Schedule / Dismiss] 分流處理。"
    },
    {
        "chapter_id": 16, "chapter_name": "第 16 章：Stage 6: Maintain — 自主閉環監控：Closing the Loop", "page_num": 8,
        "title": "駁回反饋調優控制帶：降低告警雜訊的演進機制",
        "subtitle": "用人類的拒絕，教會監控系統什麼才是真正的異常",
        "takeaway": "每一次駁回都不是無效浪費，而是調優 bands.yaml 閾值、消除虛假告警的最珍貴標註數據。",
        "details": [
            "<strong>告別狼來了的警報疲勞</strong>：傳統運維中最怕雜訊過多導致工程師麻木忽視真正事故；自愈系統必須具備抗噪學習能力。",
            "<strong>動態校準統計窗口</strong>：如果某個指標在每週一上午業務高峰期都會自然上浮，系統自動將基線調整為區分工作日的季節性模型。",
            "<strong>持續精煉 trigger 規則</strong>：讓告警數量下降 80%，但真實事故的捕獲精準度維持在 100% 的極致水平。"
        ],
        "metaphor": "這就像訓練一隻忠誠的看門獵犬：當郵差送信過來時它狂吠被主人輕輕拍拍頭安撫（Dismiss），幾次之後，獵犬學會了郵差腳步聲是無害的不再亂吠，但一聞到翻牆小偷的氣味立刻猛烈撲咬！",
        "layout": "反饋調優時序圖：駁回記錄 → 統計誤報頻次 → 自動微調 bands.yaml 的西點規則敏感度係數 → 雜訊下降。"
    },
    {
        "chapter_id": 16, "chapter_name": "第 16 章：Stage 6: Maintain — 自主閉環監控：Closing the Loop", "page_num": 9,
        "title": "修復上線後的終身免疫：自動沉澱 Continuous Evals",
        "subtitle": "閉環的真正閉合：修好了 Bug，必須保證其永不復發",
        "takeaway": "當生產自愈 PR 成功發布後，最後一項強制動作就是將當次事故轉化為 Stage 4 的 Continuous Eval 測試用例。",
        "details": [
            "<strong>閉環的雙重閉合點</strong>：第一層閉合是線上指標恢復正常；第二層閉合是將事故機理寫入測試套件，形成永久免疫資產。",
            "<strong>自動化生成測試用例</strong>：Agent 在提修復 PR 的同時，順便在 `evals/` 目錄提交對應的邊界重現 JSON 文件。",
            "<strong>整個研發大腦的集體進化</strong>：下一次 CI 執行 Evals 時，該用例正式成為全局守門標準之一，任何未來的變更都不可能讓同一隻漏洞再度溜進生產！"
        ],
        "metaphor": "這就像森林大火撲滅之後：林業局不僅把明火澆滅（修復上線），更在焦土邊界挖出一條寬達五十米的永久防火隔離帶並裝上紅外火災監測雷達（沉澱為永久 Evals），確保百年內此處絕無山火蔓延可能。",
        "layout": "終極閉環鏈條圖：生產異常 → intent.md → spec/plan → Code Fix → Deploy → 沉澱為 Eval → 系統免疫力永久提升。"
    },
    {
        "chapter_id": 16, "chapter_name": "第 16 章：Stage 6: Maintain — 自主閉環監控：Closing the Loop", "page_num": 10,
        "title": "閉環治理與合規：邊界受限於預先批准的配置",
        "subtitle": "為什麼無人值守不會引發失去控制的惡性後果？",
        "takeaway": "Agent 的所有自愈動作被嚴密約束在版本控制的邊界之內，權限由受管設定封死，任何越權指令皆被無情阻斷。",
        "details": [
            "<strong>嚴禁給予生產資料庫任意寫入權</strong>：Agent 只能透過開 PR 走標準審查流程，或者觸發預先被架構師審批過的特定 Runbook（如調用標準回滾腳本）。",
            "<strong>所有決策具名存證</strong>：自愈進程的每一次診斷文本、生成的 intent.md 與人類主管的批准時間戳，全數存入審計鏈條。",
            "<strong>滿足最嚴苛合規要求</strong>：即使在無人值守運轉下，系統依然完美滿足職責分離 (SoD) 與不可篡改審計日誌的法律底線。"
        ],
        "metaphor": "這就像在精密水族箱裡安裝的全自動恆溫加熱棒：加熱棒可以在水溫低於 24 度時自動通電升溫，但它的內部機械雙金屬片將最高加熱極限死死鎖定在 28 度，無論控制芯片如何死機，都絕對不可能把魚缸煮成開水。",
        "layout": "安全圍欄矩陣：展示 Agent 自主行動被嚴格限制在預先批准的 Runbook 跑道內，外圍有受管安全策略緊密鎖定。"
    },
    {
        "chapter_id": 16, "chapter_name": "第 16 章：Stage 6: Maintain — 自主閉環監控：Closing the Loop", "page_num": 11,
        "title": "第十六章實戰總結：讓軟體工程擁抱自我進化的生命力",
        "subtitle": "Stage 6 Maintain 自主閉環核心總結與下章預告",
        "takeaway": "Closing the loop 讓軟體系統第一次擁有了像生物有機體般的自我感知、自我診斷與自我修復能力！",
        "details": [
            "<strong>核心三步法</strong>：確定性數學腳本探測異常、bands.yaml 分級處置、異常自動轉化為 intent.md 重新啟動 SDLC 迴圈。",
            "<strong>指標監控只是運維的一個維度</strong>：代碼庫本身的深層安全隱患與陳舊漏洞，該如何持續掃蕩？",
            "<strong>前瞻第十七章</strong>：除了指標異常，底層代碼隨時可能面臨新型漏洞威脅；第十七章『Recurring codebase scans』將帶您領略每週自動巡檢代碼庫的硬核打法！"
        ],
        "metaphor": "當一艘航行在深海的核潛艇學會了在艦體鋼板產生微小裂紋的瞬間，自動調動奈米修復機器人前往焊接修補並記錄應力數據；這艘潛艇便不再只是一堆冰冷的鋼鐵，而是一個具備永恆生命力的深海巨獸！",
        "layout": "三條核心實踐卡片，底部搭配通往第十七章代碼庫定期弱點掃描的紫光雷達圖標。"
    }
]
print("Chapter 16 slides:", len(slides))
