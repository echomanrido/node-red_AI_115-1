# -*- coding: utf-8 -*-
slides = [
    {
        "chapter_id": 6, "chapter_name": "第 6 章：Stage 3: Build — Auto Mode 與自主執行", "page_num": 1,
        "title": "告別逐行回車確認：Auto Mode 的誕生背景", "subtitle": "當計畫足夠堅固，逐次按『y』批准已成為最大的時間小偷",
        "takeaway": "Auto Mode 允許工程師在審批完 plan.md 後，授權 Claude Code 自主套用多步改動，無須每處編輯按次回車。",
        "details": [
            "<strong>手動確認的心理摩擦</strong>：看著終端一處處彈出『Do you want to edit foo.ts? (y/n)』，工程師被迫像人肉打樁機一樣機械式敲回車。",
            "<strong>從『微觀監工』邁向『宏觀驗收』</strong>：當邊界清晰且有測試保護時，逐行確認並不能增加安全性，反而嚴重破壞思考心流。",
            "<strong>自動應答的底氣所在</strong>：Auto Mode 不是盲目冒險，它的前提是 Stage 2 的緊湊 spec 與 Stage 3 的周密 plan.md。"
        ],
        "metaphor": "就像在工廠裡，你已經向技術熟練的工匠交代了精準的裝配圖紙，你不需要站在他身後，每當他拿起一把螺絲刀都得向你敬禮請示：『報告長官，我現在可以擰這顆螺絲了嗎？』",
        "layout": "心理耗損對比圖：左側展示被 50 次 (y/n) 打斷的破碎心流，右側展示 Auto Mode 一氣呵成的順暢生產力曲線。"
    },
    {
        "chapter_id": 6, "chapter_name": "第 6 章：Stage 3: Build — Auto Mode 與自主執行", "page_num": 2,
        "title": "Auto-accept 成為默認狀態的成熟度條件", "subtitle": "四重防護網就緒後的安全放權",
        "takeaway": "唯有當 CLAUDE.md、Skills、Hooks 與本機測試四大護欄成熟時，Auto-accept 才能安全成為日常默認。",
        "details": [
            "<strong>條件一：微調好的 CLAUDE.md</strong>：為 Agent 提供清晰的架構約束與避坑指南，避免低級錯誤。",
            "<strong>條件二：制度化的 Skills</strong>：自動套用組織級的編碼標準與安全規範。",
            "<strong>條件三：確定性的 Hooks 攔截</strong>：在本地物理阻斷對保護路徑的意外竄改。",
            "<strong>條件四：完備的自動化測試套件</strong>：Agent 寫完代碼能夠立即自主運行測試驗證綠燈。"
        ],
        "metaphor": "這就像汽車的『主動防撞與車道偏離輔助系統』：唯有當雷達、攝影鏡頭、ABS 煞車與行車電腦全部通過自檢時，儀表板上的全自動定速巡航燈號才會亮起綠燈。",
        "layout": "四重護城河雷達圖：展示 CLAUDE.md、Skills、Hooks、Tests 四大支柱如何共同支撐起 Auto Mode 的安全基座。"
    },
    {
        "chapter_id": 6, "chapter_name": "第 6 章：Stage 3: Build — Auto Mode 與自主執行", "page_num": 3,
        "title": "小爆炸半徑原則 (Small Blast Radius)", "subtitle": "什麼樣的任務適合全自動？劃定放權邊界",
        "takeaway": "緊湊的 spec、狹小的破壞半徑、且代碼已被現有測試充分覆蓋的任務，是 Auto Mode 的最佳戰場。",
        "details": [
            "<strong>高契合度任務特徵</strong>：修復邊界 Bug、新增純展示型 UI 元件、為現有 API 新增過濾欄位、更新文檔與單元測試。",
            "<strong>低契合度高危任務</strong>：核心資料庫遷移、跨十個微服務的底層協定變更、涉及千萬級用戶權限體系重構。",
            "<strong>階梯式授權策略</strong>：依據爆炸半徑動態調整監督等級，常規工作全速奔馳，高危工作收緊至半自動步進。"
        ],
        "metaphor": "就像在化學實驗室裡：混合兩瓶溫和的食鹽水（小半徑任務），你可以放心交給自動攪拌機運轉；但如果涉及硝酸甘油調配（高危任務），教授必須親自穿上防爆服近距離操作。",
        "layout": "2x2 決策象限圖：橫軸為爆炸半徑大小，縱軸為測試覆蓋率，右上角標註『Auto Mode 甜點區』。"
    },
    {
        "chapter_id": 6, "chapter_name": "第 6 章：Stage 3: Build — Auto Mode 與自主執行", "page_num": 4,
        "title": "人機互動重心的歷史性轉移：事後產物審查",
        "subtitle": "從盯著終端螢幕看字符跳動，轉向審視長時間自主工作後的完整 Artifact",
        "takeaway": "工程師的角色從『在線即時監工』徹底升級為『離線交付審查官』，釋放寶貴的即時等待時間。",
        "details": [
            "<strong>擺脫終端機凝視</strong>：過去工程師不敢離開螢幕，生怕 Agent 走火入魔；在 Auto Mode 下，你可以放心泡一杯咖啡或切換處理另一項任務。",
            "<strong>長時間自主對話 (Long Autonomous Sessions)</strong>：Agent 在背景自主進行 20 分鐘的探索、代碼修改、除錯與測試運行。",
            "<strong>專注於最終產物的綜合驗收</strong>：回來時直接檢視 Git Diff、生成的測試報告與架構一致性證明，評估整體完成度。"
        ],
        "metaphor": "如同委託資深裝潢師傅粉刷房間，你不需要搬張椅子坐在油漆桶旁邊盯著他每一刷的動作，你只要在下班回來後檢查整面牆是否平整、顏色是否均勻、邊角是否有污漬。",
        "layout": "時間分配轉移圖：將『盯梢等待時間 70%』成功替換為『非同步專注自身業務 + 10% 集中審閱』的高效模式。"
    },
    {
        "chapter_id": 6, "chapter_name": "第 6 章：Stage 3: Build — Auto Mode 與自主執行", "page_num": 5,
        "title": "結合 Git Worktrees 實現個人產能的並行倍增",
        "subtitle": "一人驅動三條獨立產線：告別多分支頻繁切換的痛苦",
        "takeaway": "Auto Mode 與 Git Worktrees 是天作之合，允許一個工程師在本地同時掛起多個相互隔離的 Agent 自主任務。",
        "details": [
            "<strong>Worktrees 物理目錄隔離</strong>：每個獨立任務擁有自己專屬的實體檔案夾與 Git 分支，徹底解決單一倉庫切換分支編譯鎖定衝突。",
            "<strong>並行終端窗口驅動</strong>：終端 1 在 `worktree-auth` 開啟 Auto Mode 實作身分模組；終端 2 在 `worktree-cache` 開啟 Auto Mode 修復 Redis 限流。",
            "<strong>人成為調度樞紐</strong>：工程師在多個工作區之間巡檢，哪邊完成自主實作就驗收哪邊，個人生產力實現非線性幾何暴增。"
        ],
        "metaphor": "這就像五星級大廚同時管理四個灶台：一號灶慢燉高湯（Worktree A），二號灶烤箱低溫烘烤牛排（Worktree B），三號灶大火翻炒時蔬（Worktree C），大廚只需穿梭調味擺盤。",
        "layout": "多終端並行拓撲圖：一個工程師大腦同時連接三個獨立的 Git Worktrees，下方標註無衝突的目錄結構。"
    },
    {
        "chapter_id": 6, "chapter_name": "第 6 章：Stage 3: Build — Auto Mode 與自主執行", "page_num": 6,
        "title": "Auto Mode 下的安全防禦防護網：無聲守護者",
        "subtitle": "當放手讓 Agent 奔馳時，底層防線如何確保不脫軌？",
        "takeaway": "在 Auto Mode 下，Hooks 的確定性防護地位更加凸顯，成為 Agent 無法逾越的物理安全底線。",
        "details": [
            "<strong>PreToolUse 實時動態攔截</strong>：即使開啟了 Auto Mode，底層 Hook 依然對每一次 Tool 調用進行微秒級過濾，越權動作即刻彈出紅牌。",
            "<strong>自適應中斷機制</strong>：如果連續多次測試失敗或進入邏輯死循環，系統自動退出 Auto Mode 並發送通知喚醒人類介入。",
            "<strong>變更透明可回溯</strong>：所有自動套用的變更在本地都有完整的 Stash 或 commit log，一鍵即可完全還原至乾淨初始態。"
        ],
        "metaphor": "宛如現代高鐵的 ATP (Automatic Train Protection) 自動列車防護系統：司機可以將列車設定為自動巡航，但一旦經過紅燈區間或超速，ATP 會瞬間強制介入制動停車。",
        "layout": "安全防禦架構圖：Auto Mode 引擎高速運轉，外圍包裹著 PreToolUse Hooks 實時雷達掃描網與緊急制動閥。"
    },
    {
        "chapter_id": 6, "chapter_name": "第 6 章：Stage 3: Build — Auto Mode 與自主執行", "page_num": 7,
        "title": "Stage 6 閉環維運的基石：自主研發工廠的核心動力",
        "subtitle": "沒有 Auto Mode，完全無人值守的自主修復閉環將無從談起",
        "takeaway": "Auto-accept 不僅造福個人工程師，更是 Stage 6 實現生產環境監控警報自動修復閉環的底層引擎。",
        "details": [
            "<strong>無人值守閉環要求</strong>：當生產環境指標異常觸發自愈管線時，系統無法停下來等待工程師在深夜 3 點按回車批准。",
            "<strong>全自動端到端推動</strong>：Stage 6 的 Headless Worker 依賴 Auto Mode，在沙盒環境中自動讀取 intent、生成計畫、編寫代碼並提交 PR。",
            "<strong>門禁轉移至 PR 階段</strong>：所有的自主操作最終匯流至 Stage 5 的 PR 審查門禁，由隔天早晨的值班工程師集中驗收審批。"
        ],
        "metaphor": "就像全自動化工廠的夜間無人值守生產模式：夜間車間關燈後，機器人依然根據訂單排程自動切削裝配，只將最後的質檢合格品推送到出貨碼頭等待晨檢。",
        "layout": "夜間閉環流水線示意圖：展示生產異常如何無人值守調用 Auto Mode 實作，並安全抵達審查門禁。"
    },
    {
        "chapter_id": 6, "chapter_name": "第 6 章：Stage 3: Build — Auto Mode 與自主執行", "page_num": 8,
        "title": "實戰避坑指南：Auto Mode 的常見陷阱與對策",
        "subtitle": "Anthropic 實戰工程團隊踩過的坑與黃金教訓",
        "takeaway": "防範過度依賴、盲目放權與代碼庫悄然膨脹，建立健康平衡的使用文化。",
        "details": [
            "<strong>陷阱一：對模糊計畫開啟 Auto Mode</strong>：plan.md 還沒想清楚就放手讓它跑，結果產出大量方向偏離的無效垃圾代碼。",
            "<strong>陷阱二：測試覆蓋不足下的盲目自信</strong>：本地缺少自動化測試，Agent 自我感覺良好地改了 20 個檔案，實際上一跑全是 Runtime Error。",
            "<strong>黃金定則</strong>：嚴格遵循『先 Plan 明確、再 Auto 執行、後 Test 驗證』的三部曲，絕不在混沌狀態下啟動全自動。"
        ],
        "metaphor": "不要把一輛自動駕駛汽車開進沒有地圖資料、沒有道路標線且沒有行車感測器的原始森林裡去開啟最高車速巡航。",
        "layout": "三組警示看板：展示『模糊計畫、零測試覆蓋、範圍過大』三大危險禁區及對應的安全處方。"
    },
    {
        "chapter_id": 6, "chapter_name": "第 6 章：Stage 3: Build — Auto Mode 與自主執行", "page_num": 9,
        "title": "團隊級配置管理：透過受管設定統一行為",
        "subtitle": "避免個別工程師隨意關閉防護，確保全組織安全基線",
        "takeaway": "在企業環境中，Auto Mode 的放權權限應與組織受管設定 (Managed Settings) 連動，落實分級管控。",
        "details": [
            "<strong>敏感分支禁用全自動直推</strong>：配置規則鎖定保護分支（如 main/prod），Auto Mode 產生的任何變更強制只能存在於 feature 分支中。",
            "<strong>設定集中式白名單</strong>：IT 管理員可設定哪些指令允許在 Auto 模式下執行，哪些高危指令（如 rm -rf、drop table）必須強制彈出確認。",
            "<strong>合規審計全量存證</strong>：Auto Mode 期間調用的所有工具動作與參數，全數在背後打上時間戳並流式寫入企業審計日誌。"
        ],
        "metaphor": "如同特種車輛限速器：雖然賽車手技術高超，但市政救護車在市區行駛依然受到車載黑盒子限速與 GPS 全程軌跡記錄的法定硬性約束。",
        "layout": "中央受管設定控制台示意圖：展示組織策略如何向下推送到每位工程師的本地終端環境。"
    },
    {
        "chapter_id": 6, "chapter_name": "第 6 章：Stage 3: Build — Auto Mode 與自主執行", "page_num": 10,
        "title": "工程師心理學變革：重塑產出成就感與控制感",
        "subtitle": "從『逐行敲代碼的工匠心態』走向『掌控千軍萬馬的元帥心態』",
        "takeaway": "克服『不親手敲每一行代碼就心慌』的心理障礙，體會架構設計與結果驗證帶來的更高層次成就感。",
        "details": [
            "<strong>破除代碼虛榮心</strong>：敲代碼行數從來不等於商業價值，架構優雅性、系統穩定性與業務創新交付速度才是工程師的最高榮譽。",
            "<strong>建立高品質驗收眼光</strong>：學會如何從成百上千行的 Diff 中迅速敏銳地捕捉架構缺陷、極限邊界漏洞與潛在效能瓶頸。",
            "<strong>專注力的極致釋放</strong>：將省下來的寶貴精力，投入到新技術預研、業務架構深度溝通與底層演算法突破上。"
        ],
        "metaphor": "這就像從一位每天在沙灘上手工挑揀貝殼的潛水員，晉升為指揮一整支深海探測潛水艇艦隊的海洋科學考察首席科學家。",
        "layout": "思維模型演進圖：從『細節工匠』躍遷至『系統架構師』的心理認知與價值天花板躍遷。"
    },
    {
        "chapter_id": 6, "chapter_name": "第 6 章：Stage 3: Build — Auto Mode 與自主執行", "page_num": 11,
        "title": "第六章實戰總結：安全釋放十倍工程效能",
        "subtitle": "Stage 3 Build 自主執行核心精髓與下章預告",
        "takeaway": "Auto Mode 讓工程師徹底擺脫機械重複勞動，配合 Worktrees 實現一人成軍；下章我們將深入守護這一切的知識基石——CLAUDE.md！",
        "details": [
            "<strong>核心公式</strong>：嚴謹 plan.md + 健全護欄 + 小爆炸半徑 + Auto Mode = 極速高質交付。",
            "<strong>行動建議</strong>：今天就為你的日常開發分支嘗試開啟一次 Auto Mode，體驗非同步審查帶來的極致專注心流。",
            "<strong>前瞻下一章</strong>：Agent 每次啟動究竟該如何精準繼承團隊的所有潛規則與架構智慧？第七章將為您徹底揭密 CLAUDE.md 的架構心法！"
        ],
        "metaphor": "當發動機的齒輪已經嚴絲合縫，請勇敢踩下油門，在安全護欄的護航下，享受飛馳在軟體工程全新高速公路上的極致快感。",
        "layout": "三條核心守則總結卡片，底部搭配通往第七章 CLAUDE.md 的高亮引導箭頭。"
    }
]
print("Chapter 6 slides:", len(slides))
