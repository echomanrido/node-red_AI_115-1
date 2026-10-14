# -*- coding: utf-8 -*-
"""
20 個章節專屬的 SVG 邏輯流程圖定義模組
提供乾淨、響應式的向量流程圖，支援滑鼠拖曳、滾輪縮放與置中縮放
"""

def make_svg_flowchart(ch_id, steps, loop_text=None):
    width = 680
    height = 125
    arrow_id = f"arr_{ch_id}"
    svg = [
        f'<svg viewBox="0 0 {width} {height}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">',
        f'  <defs>',
        f'    <marker id="{arrow_id}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">',
        f'      <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b"/>',
        f'    </marker>',
        f'  </defs>'
    ]
    
    n = len(steps)
    box_w = 125
    box_h = 56
    gap = 20
    total_w = n * box_w + (n - 1) * gap
    start_x = max(10, (width - total_w) // 2)
    y = 30
    
    for i, (title, sub, note, bg, border, text_c) in enumerate(steps):
        x = start_x + i * (box_w + gap)
        svg.append(f'  <rect x="{x}" y="{y}" width="{box_w}" height="{box_h}" rx="8" fill="{bg}" stroke="{border}" stroke-width="1.5"/>')
        svg.append(f'  <text x="{x + box_w//2}" y="{y + 22}" font-size="11" font-weight="bold" fill="{text_c}" text-anchor="middle">{title}</text>')
        svg.append(f'  <text x="{x + box_w//2}" y="{y + 38}" font-size="9" fill="{text_c}" text-anchor="middle">{sub}</text>')
        if note:
            svg.append(f'  <text x="{x + box_w//2}" y="{y + 50}" font-size="8" fill="#64748b" text-anchor="middle">{note}</text>')
        if i < n - 1:
            ax1 = x + box_w
            ax2 = ax1 + gap
            ay = y + box_h // 2
            svg.append(f'  <path d="M {ax1} {ay} L {ax2} {ay}" stroke="#64748b" stroke-width="1.5" marker-end="url(#{arrow_id})"/>')
            
    if loop_text:
        x_first = start_x + box_w // 2
        x_last = start_x + (n - 1) * (box_w + gap) + box_w // 2
        svg.append(f'  <path d="M {x_last} 88 C {x_last} 118, {x_first} 118, {x_first} 88" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4,4" fill="none" marker-end="url(#{arrow_id})"/>')
        svg.append(f'  <text x="{(x_first + x_last)//2}" y="116" font-size="8.5" fill="#64748b" text-anchor="middle">{loop_text}</text>')
        
    svg.append('</svg>')
    return '\n'.join(svg)

chapter_flowcharts = {
    1: make_svg_flowchart(1, [
        ("傳統手工編碼", "工程師逐行撰寫", "產出受限於人手", "#f1f5f9", "#cbd5e1", "#334155"),
        ("Claude Code 介入", "代碼生成提速 10x", "邊際成本大幅降低", "#eff6ff", "#3b82f6", "#1d4ed8"),
        ("兩端新瓶頸爆發", "審查與部屬塞車", "會議與治理成本高", "#fef2f2", "#ef4444", "#b91c1c"),
        ("重塑 SDLC 流程", "全面升級控制目標", "消除手工交接摩擦", "#f0fdf4", "#22c55e", "#15803d")
    ], "瓶頸轉移：從『寫代碼』轉移至『需求規劃、評測審批與部屬運維』"),

    2: make_svg_flowchart(2, [
        ("意圖捕獲", "intent.md 提交", "產品負責人審批", "#e0e7ff", "#6366f1", "#3730a3"),
        ("規格工程", "spec.md 產出", "載入企業 Skills", "#ede9fe", "#8b5cf6", "#4c1d95"),
        ("計畫與建置", "plan.md 與 Diff", "Plan/Auto Mode", "#fef3c7", "#d97706", "#78350f"),
        ("評測與發布", "PR 審查與門禁", "連續 Evals 驗證", "#dcfce7", "#16a34a", "#14532d")
    ], "閉環迴圈：以 Committed Artifact 作為唯一信任鏈，異常自動重啟 intent.md"),

    3: make_svg_flowchart(3, [
        ("原始構想/事件", "業務人員自然語言", "無需繁瑣格式", "#f0f9ff", "#0284c7", "#0369a1"),
        ("Claude 深度詰問", "探討範疇與約束", "如分析師般提問", "#e0f2fe", "#0369a1", "#0c4a6e"),
        ("提煉 intent.md", "標準化 Proto-spec", "涵蓋問題/影響/邊界", "#e0e7ff", "#4f46e5", "#3730a3"),
        ("Git 意圖庫提交", "審查批准或駁回", "觸發後續規格設計", "#dcfce7", "#16a34a", "#14532d")
    ], "意圖轉化：將零散想法在第一時間錨定為受版本控制的 Markdown 文件"),

    4: make_svg_flowchart(4, [
        ("載入 intent.md", "讀取批准之意圖", "確認業務範疇", "#f5f3ff", "#7c3aed", "#5b21b6"),
        ("套用組織 Skills", "載入品牌/安全/UX", "動態注入規約約束", "#ede9fe", "#6d28d9", "#4c1d95"),
        ("標註爭議 Concerns", "列出政策衝突點", "協調負責人裁決", "#fae8ff", "#c026d3", "#701a75"),
        ("簽核 spec.md", "產出完整設計規格", "導向 Stage 3 建置", "#dcfce7", "#16a34a", "#14532d")
    ], "規格演進：將商業意圖融合架構規範，產出可執行的技術藍圖"),

    5: make_svg_flowchart(5, [
        ("啟用 Plan Mode", "啟動 Claude Code", "禁止直接改寫檔案", "#ecfdf5", "#059669", "#065f46"),
        ("反向質詢架構", "推演最壞連鎖破壞", "評估替代方案", "#d1fae5", "#047857", "#064e3b"),
        ("審批 plan.md", "檔案順序與驗證證明", "工程師或架構師確認", "#fef3c7", "#d97706", "#78350f"),
        ("單次高質實作", "按計畫落實編碼", "計畫與代碼同步提交", "#dcfce7", "#16a34a", "#14532d")
    ], "思考先於編碼：在編輯文檔階段修正錯誤，成本遠低於重構程式碼"),

    6: make_svg_flowchart(6, [
        ("確立審批計畫", "完成 plan.md 審閱", "劃定爆炸半徑", "#eff6ff", "#2563eb", "#1e40af"),
        ("開啟 Auto Mode", "多步自主套用修改", "擺脫逐行回車確認", "#dbeafe", "#1d4ed8", "#1e3a8a"),
        ("自動防護欄監管", "Hooks 阻斷越權指令", "及時終止異常路徑", "#fee2e2", "#dc2626", "#991b1b"),
        ("集中審查交付", "檢視完整工作成果", "測試套件全綠交付", "#dcfce7", "#16a34a", "#14532d")
    ], "自主飛輪：成熟防護網下，工程師從『逐行監工』轉向『驗收成品』"),

    7: make_svg_flowchart(7, [
        ("/init 自動提取", "掃描專案技術棧", "生成初始背景設定", "#fffbeb", "#d97706", "#78350f"),
        ("精煉入職指南", "常用指令/架構約束", "嚴格壓縮至 1 頁內", "#fef3c7", "#b45309", "#78350f"),
        ("犯錯兩次法則", "Agent 踩坑即納入", "不可在同坑跌兩次", "#ffedd5", "#ea580c", "#7c2d12"),
        ("團隊協同審計", "納入 Git 根目錄", "PR 審查共同維護", "#dcfce7", "#16a34a", "#14532d")
    ], "動態記憶庫：將分散在各處的隱性經驗，具象化為 Agent 每次啟動的預加載記憶"),

    8: make_svg_flowchart(8, [
        ("提取機構標準", "安全/API/品牌規範", "避免重複人工複查", "#ecfeff", "#0891b2", "#164e63"),
        ("封裝 SKILL.md", "YAML 觸發條件定義", "明確具體操作細則", "#cffafe", "#0891b2", "#155e75"),
        ("動態智能加載", "依任務範疇自動載入", "Plugin 全局分發", "#e0e7ff", "#4f46e5", "#3730a3"),
        ("軟約束定位", "引導 Agent 最佳實務", "後端需 Hook 兜底", "#fef2f2", "#ef4444", "#991b1b")
    ], "制度化賦能：讓資深專家的規範在所有 Agent 工作階段均被精確執行"),

    9: make_svg_flowchart(9, [
        ("意圖執行動作", "File Edit / Shell Cmd", "觸發 PreToolUse", "#fef2f2", "#dc2626", "#991b1b"),
        ("本地腳本攔截", "毫秒級身分與路徑檢查", "檢驗機密與受保護檔", "#fee2e2", "#b91c1c", "#7f1d1d"),
        ("放行或阻斷", "exit 0 執行 / 2 阻斷", "回傳明確引導理由", "#fef3c7", "#d97706", "#78350f"),
        ("確定性硬防禦", "零機率漏洞外洩", "受管設定無法被覆蓋", "#dcfce7", "#16a34a", "#14532d")
    ], "軟硬兼施：Skill 降低違規機率，Hook 將違規降至完全不可能"),

    10: make_svg_flowchart(10, [
        ("任務依相依拆解", "獨立檔案與功能群", "確立無衝突邊界", "#e0e7ff", "#4f46e5", "#3730a3"),
        ("Git Worktrees 隔離", "多終端並行啟動", "獨立分支與目錄空間", "#eff6ff", "#2563eb", "#1e40af"),
        ("專職 Subagents", "Verifier / Researcher", "獨立上下文專注執行", "#fdf4ff", "#c026d3", "#701a75"),
        ("一人指揮多線", "工程師集中審查驗收", "生產力倍數躍升", "#dcfce7", "#16a34a", "#14532d")
    ], "並行擴充：一人身兼數職，引領多個專職 Agent 兵團同時推進不同模組"),

    11: make_svg_flowchart(11, [
        ("確立量化目標", "定義綠燈退出標準", "寫入 CLAUDE.md", "#ccfbf1", "#0d9488", "#115e59"),
        ("自我驗證反饋", "執行測試 -> 捕獲錯誤", "自主修復程式碼", "#f0fdfa", "#0f766e", "#134e4a"),
        ("視覺對比循環", "瀏覽器截圖自動 Diff", "迭代修正至完全匹配", "#ecfeff", "#0891b2", "#164e63"),
        ("鎖定測試防篡改", "Hooks 禁止修改測試檔", "確保測試真偽性", "#dcfce7", "#16a34a", "#14532d")
    ], "自我修復閉環：Agent 必須在回報完成前，自主修復所有低級錯誤與測試破綻"),

    12: make_svg_flowchart(12, [
        ("匯總生產任務庫", "收錄 20~50 個真實案例", "涵蓋基準產出與邊界", "#e0e7ff", "#6366f1", "#3730a3"),
        ("CI 無人值守運行", "排程或設定變更觸發", "驗證 Prompt/Skills", "#eef2ff", "#4f46e5", "#312e81"),
        ("通過率閾值阻斷", "檢驗 Pass Rate 表現", "指標下滑拒絕合併", "#fef3c7", "#d97706", "#78350f"),
        ("事故自動化轉測試", "線上缺陷即刻收錄", "杜絕同類歷史退化", "#dcfce7", "#16a34a", "#14532d")
    ], "AI 時代 QA：針對 Agent 大腦配置進行嚴格回歸測試，防範暗中劣化"),

    13: make_svg_flowchart(13, [
        ("PR 觸發審查", "讀取 REVIEW.md 規範", "劃分三道檢查網", "#fdf2f8", "#ec4899", "#831843"),
        ("AI 雙向過濾", "抓出邏輯缺陷與資安漏洞", "壓制瑣碎 Nits (<5)", "#fce7f3", "#db2777", "#700b33"),
        ("@claude 修復循環", "在評論中精確互動修復", "自動推代碼至綠燈", "#fdf4ff", "#a21caf", "#701a75"),
        ("Code Owner 批准", "真人聚焦架構意圖與風險", "完成最終合併把關", "#dcfce7", "#16a34a", "#14532d")
    ], "審查分層：將語法與常規缺陷交由 AI 消化，真人審核員聚焦商業意圖與高維風險"),

    14: make_svg_flowchart(14, [
        ("嘗試生產操作", "匹配 deploy production", "觸發審查防線", "#fef2f2", "#b91c1c", "#7f1d1d"),
        ("門禁腳本檢驗", "驗證 $RELEASE_APPROVAL", "受管設定嚴格鎖定", "#fee2e2", "#991b1b", "#7f1d1d"),
        ("未授權阻斷中斷", "退出碼 2，給予指引", "杜絕未經核准直推", "#fef3c7", "#d97706", "#78350f"),
        ("具名簽章放行", "發布主管專屬授權碼", "留存完整審計時間戳", "#dcfce7", "#16a34a", "#14532d")
    ], "責任邊界：Agent 具備準備與演練能力，但最終點火權限永遠屬於指定負責人"),

    15: make_svg_flowchart(15, [
        ("流水線非互動執行", "容器沙盒隔離環境", "短時效最小權限 Token", "#e0f2fe", "#0284c7", "#0369a1"),
        ("MCP 封裝部屬指令", "deploy / status / rollback", "嚴禁暴露明文憑證", "#bae6fd", "#0369a1", "#0c4a6e"),
        ("分級環境自主權限", "Dev 自由 | Prod 審批門禁", "漸進式授予信任度", "#fef3c7", "#d97706", "#78350f"),
        ("回滾路徑常態演練", "最常被驗證的安全指令", "確保異常時一鍵復原", "#dcfce7", "#16a34a", "#14532d")
    ], "安全部署骨幹：透過沙盒與 MCP 協議，構築堅不可摧的自動化交付管線"),

    16: make_svg_flowchart(16, [
        ("確定性指標監控", "滾動 30 天統計基準", "排除模型的主觀雜音", "#dcfce7", "#16a34a", "#14532d"),
        ("bands.yaml 階梯處置", "1σ 記錄 | 2σ 唯讀診斷", "3σ 提 PR or 觸發回滾", "#bbf7d0", "#15803d", "#14532d"),
        ("生成 intent.md 自愈", "異常自動回流至 Stage 1", "開啟無人值守修復循環", "#fef3c7", "#d97706", "#78350f"),
        ("閉環自我進化", "事故轉為 Eval 測試案例", "系統免疫力持續增強", "#e0e7ff", "#4f46e5", "#3730a3")
    ], "完全閉環：生產環境指標偏離自動重啟軟體研發生命週期，實現自我修復"),

    17: make_svg_flowchart(17, [
        ("代碼庫常態掛接", "定期每週自動全量掃描", "覆蓋各專案與服務", "#faf5ff", "#9333ea", "#581c87"),
        ("Claude Mythos 5", "深層語境分析與漏洞探測", "突破傳統 SAST 盲區", "#f3e8ff", "#7e22ce", "#581c87"),
        ("自動驗證與置信分級", "高信心直接產出一鍵補丁", "駁回記錄理由避免重複", "#e0e7ff", "#4f46e5", "#3730a3"),
        ("匯流 PR 正常門禁", "修復程序走標準審批鏈條", "無任何特權後門", "#dcfce7", "#16a34a", "#14532d")
    ], "動態免疫：代碼庫隨著模型能力進化而每週自動接受更深層的安全洗禮"),

    18: make_svg_flowchart(18, [
        ("通訊頻道警報抵達", "Slack/Teams @claude", "深夜突發事件介入", "#fff7ed", "#ea580c", "#7c2d12"),
        ("第一響應者介入", "透過 MCP 查詢日誌與指標", "在 Thread 實時公開調查", "#ffedd5", "#c2410c", "#7c2d12"),
        ("快速分級應變", "小修復提 PR | 大問題立案", "監控指標恢復基準線", "#ecfeff", "#0891b2", "#164e63"),
        ("沉澱 Lessons.md", "事故總結回寫知識庫", "下次事故直接借鑑", "#dcfce7", "#16a34a", "#14532d")
    ], "全天候協同：在人與人溝通的通訊主戰場，第一時間提供具備環境感知力的工程支援"),

    19: make_svg_flowchart(19, [
        ("重塑職責分離 (SoD)", "代碼編寫者永無批准權", "受管設定全組織統一", "#e0e7ff", "#4338ca", "#312e81"),
        ("不可篡改審計鏈", "Git 提交關聯全套 Artifacts", "滿足最高合規審計", "#eef2ff", "#3730a3", "#312e81"),
        ("階梯式推進路徑", "從個人提效走向組織自治", "分階段穩步釋放潛能", "#f0fdf4", "#16a34a", "#14532d"),
        ("ROI 效益量化衡量", "追蹤週期時間與缺陷逃逸率", "證明數位轉型價值", "#ecfdf5", "#059669", "#064e3b")
    ], "企業治理：在不放鬆任何安全與法規底線的前提下，最大化釋放 Agentic 生產力"),

    20: make_svg_flowchart(20, [
        ("角色昇華：架構總舵手", "從手工碼農轉向系統設計師", "定義意圖、標準與邊界", "#ecfdf5", "#047857", "#064e3b"),
        ("多 Agent 自治軟體工廠", "規劃、建置、驗證、部署閉環", "不間斷自我迭代演進", "#d1fae5", "#065f46", "#064e3b"),
        ("人類智慧的不可替代性", "價值評判、道德把關與重大決策", "在審批門禁發揮最高決策", "#fef3c7", "#d97706", "#78350f"),
        ("AI-Native 新研發紀元", "邁向全自主軟體工程時代", "引領產業生產力顛覆", "#eff6ff", "#2563eb", "#1e3a8a")
    ], "終極願景：當軟體工程不再受限於手工敲擊代碼，人類思想將以前所未有的速度化為現實")
}

print("data_flowcharts.py verified! Total chapter flowcharts:", len(chapter_flowcharts))
