# -*- coding: utf-8 -*-
import json
import os
import base64
import html

def esc(text):
    return html.escape(str(text)) if text else ""

def make_svg_diagram(title, subtitle, nodes, loop_label=None, accent="#0ea5e9"):
    """產生精美工控暗黑風格的 SVG 流程架構圖 (Data URL)"""
    w = 720
    h = 320
    n = len(nodes)
    card_w = min(150, (w - 60 - (n - 1) * 20) // n) if n > 0 else 120
    card_h = 100
    gap = 18
    total_cards_w = n * card_w + (n - 1) * gap
    start_x = (w - total_cards_w) // 2
    y = 110

    svg = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" style="background: linear-gradient(135deg, #0b1522 0%, #0d2229 100%); font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Noto Sans TC, sans-serif;">',
        '  <defs>',
        f'    <linearGradient id="gradBar" x1="0%" y1="0%" x2="100%" y2="0%">',
        f'      <stop offset="0%" stop-color="{accent}" stop-opacity="0.8"/>',
        f'      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.8"/>',
        '    </linearGradient>',
        '    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">',
        f'      <path d="M 0 1 L 10 5 L 0 9 z" fill="{accent}"/>',
        '    </marker>',
        '    <filter id="cardGlow" x="-10%" y="-10%" width="120%" height="120%">',
        '      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.4"/>',
        '    </filter>',
        '  </defs>',
        '  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">',
        '    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>',
        '  </pattern>',
        f'  <rect width="{w}" height="{h}" fill="url(#grid)" />',
        f'  <rect x="25" y="24" width="4" height="28" rx="2" fill="url(#gradBar)"/>',
        f'  <text x="38" y="42" fill="#ffffff" font-size="16" font-weight="bold" letter-spacing="0.5">{esc(title)}</text>',
        f'  <text x="38" y="60" fill="#94a3b8" font-size="11">{esc(subtitle)}</text>',
        f'  <rect x="25" y="80" width="{w-50}" height="1" fill="rgba(255,255,255,0.08)"/>'
    ]

    for i, node in enumerate(nodes):
        x = start_x + i * (card_w + gap)
        step_num = node.get("num", f"0{i+1}")
        step_title = node.get("title", f"Step {i+1}")
        step_sub = node.get("sub", "")
        step_tag = node.get("tag", "")

        svg.append(f'  <g filter="url(#cardGlow)">')
        svg.append(f'    <rect x="{x}" y="{y}" width="{card_w}" height="{card_h}" rx="10" fill="#132730" stroke="rgba(56, 189, 248, 0.25)" stroke-width="1.2"/>')
        svg.append(f'    <rect x="{x}" y="{y}" width="{card_w}" height="4" rx="2" fill="{accent}"/>')
        svg.append(f'    <circle cx="{x + 22}" cy="{y + 26}" r="12" fill="rgba(56, 189, 248, 0.15)" stroke="{accent}" stroke-width="1"/>')
        svg.append(f'    <text x="{x + 22}" y="{y + 30}" fill="{accent}" font-size="10" font-weight="bold" text-anchor="middle">{esc(step_num)}</text>')
        if step_tag:
            svg.append(f'    <rect x="{x + card_w - 48}" y="{y + 16}" width="42" height="16" rx="4" fill="rgba(255,255,255,0.06)"/>')
            svg.append(f'    <text x="{x + card_w - 27}" y="{y + 28}" fill="#38bdf8" font-size="8.5" text-anchor="middle">{esc(step_tag)}</text>')
        svg.append(f'    <text x="{x + 12}" y="{y + 58}" fill="#ffffff" font-size="12" font-weight="bold">{esc(step_title)}</text>')
        sub_p1 = step_sub[:14]
        sub_p2 = step_sub[14:28] if len(step_sub) > 14 else ""
        svg.append(f'    <text x="{x + 12}" y="{y + 76}" fill="#94a3b8" font-size="9.5">{esc(sub_p1)}</text>')
        if sub_p2:
            svg.append(f'    <text x="{x + 12}" y="{y + 90}" fill="#64748b" font-size="8.5">{esc(sub_p2)}</text>')
        svg.append('  </g>')

        if i < n - 1:
            ax1 = x + card_w + 3
            ax2 = ax1 + gap - 6
            ay = y + card_h // 2
            svg.append(f'  <path d="M {ax1} {ay} L {ax2} {ay}" stroke="{accent}" stroke-width="1.8" marker-end="url(#arrow)"/>')

    if loop_label:
        x_first = start_x + card_w // 2
        x_last = start_x + (n - 1) * (card_w + gap) + card_w // 2
        svg.append(f'  <path d="M {x_last} {y + card_h + 8} C {x_last} {y + card_h + 55}, {x_first} {y + card_h + 55}, {x_first} {y + card_h + 8}" stroke="{accent}" stroke-width="1.2" stroke-dasharray="5,4" fill="none" marker-end="url(#arrow)"/>')
        svg.append(f'  <text x="{(x_first + x_last)//2}" y="{y + card_h + 50}" fill="#38bdf8" font-size="10" text-anchor="middle" font-weight="500">{esc(loop_label)}</text>')

    svg.append('</svg>')
    svg_str = '\n'.join(svg)
    encoded = base64.b64encode(svg_str.encode('utf-8')).decode('utf-8')
    return f"data:image/svg+xml;base64,{encoded}"

# 01：Vibe Coding × Grill Me Skill：Windows & Google Antigravity 實戰指南
# 01：機長級 5 階段學習法！(給新手)
unit_01_captain_dev = {
    "id": "vibe-captain-dev",
    "labNumber": "01",
    "title": "「機長級」5 階段學習法：AI 時代新手自學指南 (從碼農到掌控系統全局的軟體機長)",
    "shortTitle": "「機長級」5 階段學習法",
    "category": "軟體工程",
    "date": "2026-11-08",
    "summary": "AI 一秒能寫百行代碼，人類真的不用學寫程式了嗎？精選轉譯自 YouTube 知名教學頻道「P & H」。現代客機 99% 航程由自動駕駛完成，但航空公司仍重金聘請機長，正是因為當暴風雨與警報響起時，只有機長懂得底層儀表並能接管全局！本單元為新手剖析從「初探語法玩具」到「掌控多服務高併發架構」的 5 大進階階段，搭配 Array vs Hash Table 記憶體尋址模擬器、CI/CD 自動化護欄與實戰專題指南，引導你在 AI 時代昇華為不可替代的軟體工程機長。",
    "flowTitle": "「機長級」5 階段軟體工程師修煉航道與品質防線",
    "resultTitle": "機長級 5 階段學習法、資料結構視覺化模擬器與 CI/CD 護欄工作台",
    "flowImage": make_svg_diagram(
        "機長級 5 階段學習演進航道與護欄",
        "Syntax Toys -> Fundamentals -> Core Internals -> CI/CD Guardrails -> Multi-Services",
        [
            {"num": "CAP-1", "title": "初探語法", "sub": "玩具專案激發直覺興趣", "tag": "Toys"},
            {"num": "CAP-2", "title": "基礎打底", "sub": "紮實掌握主流語言與工具", "tag": "Basics"},
            {"num": "CAP-3", "title": "核心底層", "sub": "資料結構與記憶體尋址", "tag": "Internals"},
            {"num": "CAP-4", "title": "CI/CD 護欄", "sub": "自動化測試與防禦管線", "tag": "Guardrails"},
            {"num": "CAP-5", "title": "多服務架構", "sub": "分散式系統與容錯接管", "tag": "Captain"}
        ],
        loop_label="自動駕駛（AI 輔助）與人工接管（底層除錯）雙軌並行，鍛造無法被取代的機長級工程師",
        accent="#06b6d4"
    ),
    "resultImage": "Vibe Coding/01.軟體工程/「機長級」5 階段學習法！(給新手).html",
    "slideUrl": "Vibe Coding/01.軟體工程/「機長級」5 階段學習法！(給新手).html",
    "objective": "1. 深刻理解「機長哲學」：AI 就像客機的自動駕駛，工程師必須掌握底層架構以在關鍵故障時刻手動接管。\n2. 掌握 5 大階段修煉路徑：初探語法玩具 ➔ 基礎打底 ➔ 核心底層 (資料結構/記憶體) ➔ CI/CD 護欄 ➔ 多服務高併發架構。\n3. 操作 Array vs Hash Table 記憶體尋址視覺化模擬器，並建立以解決真實痛點為導向的代表作開發思維。",
    "tutorialSteps": [
        {
            "step": "步驟 1: 建立機長心態 (The Captain Mindset)",
            "description": "認清 AI 時代的角色蛻變：從機械式敲代碼的碼農，轉型為設計規格、審閱 Diff、監控指標與故障接管的機長。"
        },
        {
            "step": "步驟 2: 穿越 5 大進階修煉階段",
            "description": "從階梯式路徑成長：玩具專案啟蒙 ➔ 單一語言深化 ➔ 深入作業系統與資料結構底層 ➔ 架設 CI/CD 測試護欄 ➔ 駕馭微服務分散式架構。"
        },
        {
            "step": "步驟 3: 探索資料結構與底層尋址模擬器",
            "description": "實際操作 Array 循序掃描 (O(n)) 與 Hash Table 雜湊尋址 (O(1)) 的記憶體互動視覺化，理解為何 AI 無法替你思考底層效能瓶頸。"
        },
        {
            "step": "步驟 4: 打造真實痛點作品與 CI/CD 防線",
            "description": "拒絕平庸的 Todo App！選定自身或社群真實痛點開發系統，並在 GitHub Actions 配置 Linting、測試覆蓋率與自動化部屬護欄。"
        }
    ],
    "promptTemplate": "你是一位具備 15 年大型分散式系統架構經驗的資深主任工程師兼工程教練。\n請依據「機長級 5 階段學習法」理論，針對一位剛學會基礎 Python/JavaScript、經常依賴 AI 生成代碼的工程新人：\n1. 請設計一套為期 8 週的「核心底層與資料結構 (Stage 3)」專題強化訓練計畫。\n2. 請說明如何引導他將一個常見的陽春 Todo List，升級為具備「真實痛點驅動、CI/CD 自動化測試護欄 (Stage 4) 與邊緣容錯機制」的代表作品。\n3. 請給出三個「當 AI 提供的代碼出現幽靈記憶體洩漏或競態條件時，工程師應如何手動接管排查」的實戰心法。",
    "codeSnippet": {
        "language": "yaml",
        "code": "# 機長級 CI/CD 品質護欄範例 (.github/workflows/captain-guardrails.yml)\nname: Captain Quality Guardrails\non: [push, pull_request]\n\njobs:\n  flight-check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Setup Runtime\n        uses: actions/setup-node@v4\n        with:\n          node-version: '20'\n      - name: Static Security Scan (SonarQube/Trivy)\n        run: npm run security-audit\n      - name: Run Unit & Mutation Tests\n        run: npm test -- --coverage --threshold=85\n      - name: Build & Smoke Test\n        run: npm run build && npm run smoke-test"
    },
    "references": [
        {
            "title": "「機長級」5 階段學習法：AI 時代新手自學指南 (專屬互動全解析頁面)",
            "url": "Vibe Coding/01.軟體工程/「機長級」5 階段學習法！(給新手).html",
            "bgColor": "rgba(6, 182, 212, 0.15)",
            "borderColor": "rgba(6, 182, 212, 0.6)",
            "color": "#22d3ee",
            "icon": "fa-solid fa-plane-up",
            "badge": "本單元專題"
        },
        {
            "title": "YouTube 官方原片：P & H 教學頻道",
            "url": "http://www.youtube.com/watch?v=ARydCv7rr0o"
        },
        {
            "title": "Vibe Coding × Grill Me Skill：Windows & Google Antigravity 實戰指南 (單元 02)",
            "url": "Vibe Coding/02.Skills(技能)/vibe_coding_grill_me.html"
        },
        {
            "title": "軟體工程演進全景圖：從混沌、瀑布、敏捷到 Vibe Coding (單元 04)",
            "url": "Vibe Coding/01.軟體工程/00_軟體工程演進全景圖.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-plane-departure",
            "scenario": "新手自學技術路徑定錨與避坑",
            "description": "避免落入「只會抄 AI 代碼卻對底層一無所知」的浮沙陷阱，建立清晰分層的自學地圖與底層基本功。"
        },
        {
            "icon": "fa-solid fa-shield-halved",
            "scenario": "求職作品集升級與工程素養面試",
            "description": "將無鑑別度的玩具項目重構為具備 CI/CD 護欄、單元測試、高可用架構與真實痛點落地的殺手級專案。"
        }
    ]
}

unit_01_grill_me = {
    "id": "vibe-grill-me",
    "labNumber": "02",
    "title": "Vibe Coding × Grill Me Skill：Windows & Google Antigravity 實戰指南",
    "shortTitle": "Grill Me 技能實戰指南",
    "category": "Skills(技能)",
    "date": "2026-11-06",
    "summary": "用 Vibe Coding 釋放直覺，用 Grill Me 守護品質！深度解構 Google Antigravity 2.0 與 Windows 環境下官方開源的 /grill-me 技能。Vibe Coding 是踩滿油門的直覺開發，而 Grill Me 則是主動將提問權交給 AI，以資深架構師與資安專家視角多輪嚴苛面試（Grill），逼出架構盲點、邊界漏洞與資安死角。涵蓋 Windows PowerShell 安裝除錯、運作流程圖、模擬對練室與防雷檢核清單。",
    "flowTitle": "Grill Me 控制反轉 (IoC) 審問式架構演繹五步流水線",
    "resultTitle": "Grill Me 技能實戰指南互動專題",
    "flowImage": make_svg_diagram(
        "Grill Me 控制反轉 (IoC) 審問流水線",
        "Vibe Intent -> Grill Interview -> Stress Test -> Spec & ADR -> Safe Coding",
        [
            {"num": "GM-1", "title": "直覺發起", "sub": "拋出模糊構想與邊界", "tag": "Intent"},
            {"num": "GM-2", "title": "審問反轉", "sub": "AI 主動發起技術面試", "tag": "Grill Loop"},
            {"num": "GM-3", "title": "盲點擊破", "sub": "逼出併發、斷線與死角", "tag": "Stress Test"},
            {"num": "GM-4", "title": "規格固化", "sub": "生成 SPEC.md 與 ADR", "tag": "Spec Contract"},
            {"num": "GM-5", "title": "安全產碼", "sub": "綠燈放行與嚴格實現", "tag": "Safe Coding"}
        ],
        loop_label="控制反轉心法：停止迎合我！像最嚴格的主架構師一樣拷問我，在寫代碼前剷除 90% 隱患",
        accent="#f43f5e"
    ),
    "resultImage": "Vibe Coding/02.Skills(技能)/vibe_coding_grill_me.html",
    "slideUrl": "Vibe Coding/02.Skills(技能)/vibe_coding_grill_me.html",
    "objective": "1. 掌握 Grill Me 的「控制反轉 (IoC)」核心心法：讓 AI 扮演嚴苛審問官主動提出質疑，破除過度樂觀的架構盲點。\n2. 熟練 Windows 10/11 PowerShell 環境下 Google Antigravity 全域 (Global) 與專案級 (Workspace) 的 Skill 安裝與路徑配置。\n3. 學會將 Grill Me 面試結果沉澱為高價值專案工件（SPEC.md 規格合約、ADR 架構決策紀錄），建立高韌性 AI 原生工作流。",
    "tutorialSteps": [
        {
            "step": "第一節：核心哲學 — Vibe Coding（油門）遇上 Grill Me（煞車與方向盤）",
            "description": "剖析直覺創作心流與工程品質護欄的辯證統一，理解為何把提問權交給 AI 才能在開工前消除 90% 隱患。"
        },
        {
            "step": "第二節：Windows & Google Antigravity 安裝與指令指南",
            "description": "詳述在 Windows PowerShell 環境下配置全域 (%USERPROFILE%\\.agents\\skills) 與專案級 (Workspace) 的 SKILL.md 規格與權限。"
        },
        {
            "step": "第三節：運作流程圖與控制反轉推演",
            "description": "解構 5 步審問流水線（Intent -> Grill -> Stress -> Spec -> Code），掌握 AI 追問邊界條件與併發競態的具體模式。"
        },
        {
            "step": "第四節：互動模擬對練室與 Prompt 模組工坊",
            "description": "提供即時模擬體驗與可直接複製之結構化 Prompt 樣板，在 Antigravity、Claude Code 或 Cursor 中一鍵啟動嚴格面試。"
        }
    ],
    "promptTemplate": "請扮演一位最挑剔、經驗最豐富的 Google Antigravity 首席系統架構師與資安長。\n我即將開發一個「[專案/功能名稱]」。\n在允許我寫下一行代碼之前，請對我進行嚴格的 /grill-me 拷問：\n1. 每次只問我 1 到 2 個最關鍵的問題，不要一次拋出一大堆問題。\n2. 重點拷問：系統邊界、併發競態、離線重連、硬體故障與資安驗證機制。\n3. 根據我的回答持續追問，直到所有架構模糊點完全釐清為止。\n4. 最終幫我產出結構化的 SPEC.md 規格檔案與 ADR 架構決策記錄。",
    "codeSnippet": {
        "language": "powershell",
        "code": "# Windows PowerShell 全域安裝 Grill Me Skill\n$p = Join-Path $env:USERPROFILE '.agents\\skills\\grill-me'\nNew-Item -ItemType Directory -Force -Path $p\nInvoke-WebRequest -Uri 'https://raw.githubusercontent.com/mattpocock/skills/main/skills/grill-me/SKILL.md' -OutFile (Join-Path $p 'SKILL.md')\n\n# 啟動 Google Antigravity 終端對話\n# 輸入：/grill-me 規劃 Industrial IoT 邊緣網關離線緩存架構"
    },
    "references": [
        {
            "title": "Grill Me 技能實戰指南 (專屬專題互動工作台)",
            "url": "Vibe Coding/02.Skills(技能)/vibe_coding_grill_me.html",
            "bgColor": "rgba(244, 63, 94, 0.15)",
            "borderColor": "rgba(244, 63, 94, 0.6)",
            "color": "#fb7185",
            "icon": "fa-solid fa-fire-burner",
            "badge": "本單元專題"
        },
        {
            "title": "Matt Pocock / skills 官方開源庫 (GitHub)",
            "url": "https://github.com/mattpocock/skills/blob/main/docs/productivity/grill-me.md"
        },
        {
            "title": "RobMitt / grill-me-skill 技能庫 (GitHub)",
            "url": "https://github.com/robmitt/grill-me-skill"
        },
        {
            "title": "當 Vibe Coding 遇上嚴謹工程學：SDD vs BDD vs TDD (單元 03)",
            "url": "Vibe Coding/02.Skills(技能)/vibe_coding_sdd_vs_bdd_vs_tdd.html"
        },
        {
            "title": "OpenSpec 規格驅動開發：完整指南與實踐 (單元 11)",
            "url": "Vibe Coding/02.Skills(技能)/01.openspec.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-fire",
            "scenario": "關鍵系統架構壓力測試與盲點排查",
            "description": "在動手產碼前由 AI 發起深度審問，快速逼出併發衝突、異常重試與安全邊界漏洞，節省數週重構成本。"
        },
        {
            "icon": "fa-solid fa-file-contract",
            "scenario": "SPEC.md 規格合約與 ADR 架構決策自動固化",
            "description": "將殘酷面試問答過程自動沉澱為結構化架構文件與任務清單，使後續 AI Agent 能完全依照規範穩健實作。"
        }
    ]
}

# 02：當 Vibe Coding 遇上嚴謹工程學：SDD vs BDD vs TDD（架構矩陣與 AI Skills 生態）
unit_02_sdd_bdd_tdd = {
    "id": "vibe-sdd-bdd-tdd",
    "labNumber": "03",
    "title": "當 Vibe Coding 遇上嚴謹工程學：SDD vs BDD vs TDD（架構矩陣與 AI Skills 生態）",
    "shortTitle": "SDD vs BDD vs TDD 現代開發架構",
    "category": "Skills(技能)",
    "date": "2026-11-06",
    "summary": "「只要跟 AI 對話就能寫出軟體？」——僅憑直覺與氛圍 (Vibe) 的開發容易引發代碼失控與技術債。本單元深入剖析現代 AI 原生開發三大防護網：規格驅動 (SDD / Spec-Driven)、行為驅動 (BDD / Behavior-Driven) 與測試驅動 (TDD / Test-Driven)。結合當前社群熱門開源 AI Agent Skills 生態庫（OpenSpec、Superpowers、自建 BDD Skill 規範），透過高解析度向量架構圖鑑、維度比較矩陣、互動流程模擬器與實戰 Prompt 模組，助您將自然語言意圖淬煉為商業級穩固代碼。",
    "flowTitle": "Vibe Coding 結合三重工程防護網（SDD / BDD / TDD）閉環架構",
    "resultTitle": "SDD vs BDD vs TDD 現代開發架構互動專題",
    "flowImage": make_svg_diagram(
        "Vibe Coding 三重工程防護網架構",
        "Tri-Guardrails: Vibe Intent -> SDD Spec -> BDD Behavior -> TDD Test -> Production",
        [
            {"num": "V-01", "title": "Vibe 直覺發想", "sub": "Prompt 意圖驅動", "tag": "Intent"},
            {"num": "V-02", "title": "SDD 規格約束", "sub": "OpenSpec 契約第一", "tag": "Spec-Driven"},
            {"num": "V-03", "title": "BDD 行為對齊", "sub": "Gherkin 場景驗收", "tag": "Behavior"},
            {"num": "V-04", "title": "TDD 測試守門", "sub": "紅綠燈重構閉環", "tag": "Test-Driven"},
            {"num": "V-05", "title": "商業級交付", "sub": "穩固代碼持續集成", "tag": "Production"}
        ],
        loop_label="AI 原生工程閉環：以直覺發起，以規格合約約束，以業務場景對齊，以自動化測試捍衛品質",
        accent="#d946ef"
    ),
    "resultImage": "Vibe Coding/02.Skills(技能)/vibe_coding_sdd_vs_bdd_vs_tdd.html",
    "slideUrl": "Vibe Coding/02.Skills(技能)/vibe_coding_sdd_vs_bdd_vs_tdd.html",
    "objective": "1. 掌握 Vibe Coding「直覺發想 (Vibe) 與工程防護 (Guardrails)」的互補本質，破除純靠自然語言產碼的幻覺與技術債陷阱。\n2. 深刻理解現代軟體工程三大模式（SDD 規格驅動、BDD 行為驅動、TDD 測試驅動）之核心定義、生命週期循環與技術選型。\n3. 熟練運用熱門 AI Agent Skills 生態庫（OpenSpec 規格合約、自建 BDD 規範、Superpowers 測試門禁），構建高可靠性的工業級代碼流程。",
    "tutorialSteps": [
        {
            "step": "第一節：Vibe Coding 的迷思與工程學防護網",
            "description": "剖析 Karpathy 式直覺編程的高效與隱患，解析為何單靠 Prompt 容易產生幽靈代碼與架構發散，確立導入工程防護網的必要性。"
        },
        {
            "step": "第二節：三大現代開發模式深度剖析",
            "description": "深入對比 SDD（架構規格第一，合約不可退縮）、BDD（以 Gherkin 語法 Given-When-Then 對齊業務場景）與 TDD（Red-Green-Refactor 嚴格紅綠燈測試閉環）。"
        },
        {
            "step": "第三節：開源 AI Agent Skills 工具庫實戰",
            "description": "實測主流 AI Coding Agent 技能庫：GitHub 70k+ 星的 OpenSpec 規格驅動框架、自建 BDD Gherkin Skill 規範，以及 Superpowers 系統化測試工作流。"
        },
        {
            "step": "第四節：流程模擬器體驗與實戰 Prompt 模組",
            "description": "透過內建流程模擬器視覺化推演全流程，並直接套用即插即用的結構化 Prompt 樣板，在 Cursor、Claude Code 或 Antigravity 中立即實踐。"
        }
    ],
    "promptTemplate": "你是一位精通 AI 原生軟體工程與現代架構治理的資深首席架構師。\n請為我們的系統開發任務建立完整的「SDD + BDD + TDD 三重防護工程規格」：\n1. 【SDD 規格合約】：定義系統邊界、公開 API 介面、資料 Schema 與不可違背的架構不變量 (Invariants)。在規格獲確認前禁止產生實作代碼。\n2. 【BDD 業務行為】：撰寫標準 Gherkin 語法場景 (Feature / Scenario / Given-When-Then)，覆蓋正常流程、極端邊界與錯誤處理機制。\n3. 【TDD 測試守門】：制定測試先行規格清單（單元測試、整合測試），要求在測試紅燈驗證前不得編寫實作代碼，並在綠燈後執行乾淨重構。",
    "codeSnippet": {
        "language": "markdown",
        "code": "# Vibe Coding 三重工程防護協定 (Tri-Guardrail Protocol)\n## 1. SDD (Spec-Driven Development)\n- 執行 /opsx:propose 生成 proposal.md 與 specs/ 規格檔案\n- 凍結 API 介面與資料模型，未經架構審查前嚴禁產出實作代碼\n\n## 2. BDD (Behavior-Driven Development)\n- 採用標準 Gherkin (Given/When/Then) 描述業務行為場景\n- 確保 AI 生成之實作邏輯與領域專家 (Domain Expert) 意圖精確對齊\n\n## 3. TDD (Test-Driven Development)\n- 遵守 Red-Green-Refactor 嚴格循環\n- 先行編寫單元與整合測試案例，確證測試紅燈後再提示 AI 實現代碼"
    },
    "references": [
        {
            "title": "SDD vs BDD vs TDD 現代開發架構 (專屬專題互動工作台)",
            "url": "Vibe Coding/02.Skills(技能)/vibe_coding_sdd_vs_bdd_vs_tdd.html",
            "bgColor": "rgba(217, 70, 239, 0.15)",
            "borderColor": "rgba(217, 70, 239, 0.6)",
            "color": "#e879f9",
            "icon": "fa-solid fa-wand-magic-sparkles",
            "badge": "本單元專題"
        },
        {
            "title": "OpenSpec 官方規格驅動開發核心框架",
            "url": "https://openspec.dev/"
        },
        {
            "title": "Superpowers 軟體工程 Agent 工作流規範 (GitHub)",
            "url": "https://github.com/obra/superpowers"
        },
        {
            "title": "軟體工程演進全景圖 (單元 04)",
            "url": "Vibe Coding/01.軟體工程/vibe_coding_軟體工程.html"
        },
        {
            "title": "OpenSpec 規格驅動開發：完整指南與實踐 (單元 11)",
            "url": "Vibe Coding/02.Skills(技能)/01.openspec.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-shield-halved",
            "scenario": "AI 原生團隊工程護欄與防禦式規範",
            "description": "在團隊導入 AI Coding 工具時，建立 SDD/BDD/TDD 三重約束，杜絕 AI 自由發揮導致的代碼幻覺與架構失控。"
        },
        {
            "icon": "fa-solid fa-vial-circle-check",
            "scenario": "規格契約先行與自動化回歸驗收",
            "description": "將自然語言直覺快速固化為機器可讀的 Spec 與測試套件，實現高覆蓋率、零發散的敏捷 CI/CD 自動化交付。"
        }
    ]
}

# 03：軟體工程演進全景圖
unit_03_evolution = {
    "id": "vibe-01",
    "labNumber": "04",
    "title": "軟體工程演進全景圖：從混沌、瀑布、敏捷到 Vibe Coding",
    "category": "軟體工程",
    "date": "2026-09-18",
    "summary": "系統回顧從 1960 年代第一代「混沌無序 (Code & Fix)」、第二代「瀑布模型 (嚴格分工與文件驅動)」、第三代「敏捷開發與 DevOps (雙週衝刺與持續交付)」，一路邁向第四代「AI-Native Vibe Coding (意圖驅動、AI 產碼、人類把關架構)」的演進歷史與範式轉移。剖析為何『代碼不再是瓶頸』，而架構審查與意圖定義成為核心競爭力。",
    "flowTitle": "軟體工程四代典範大躍遷演進光譜",
    "resultTitle": "軟體工程演進史互動專題網頁",
    "flowImage": make_svg_diagram(
        "軟體工程四代演進範式轉移", 
        "Software Engineering Evolution: From Code & Fix to Vibe Coding",
        [
            {"num": "1st", "title": "混沌無序", "sub": "Code & Fix 摸索嘗試", "tag": "1960s"},
            {"num": "2nd", "title": "瀑布模型", "sub": "嚴格分工文件凍結", "tag": "1970s"},
            {"num": "3rd", "title": "敏捷開發", "sub": "Sprint 與 CI/CD 流水線", "tag": "2000s"},
            {"num": "4th", "title": "Vibe Coding", "sub": "意圖驅動人機交響共創", "tag": "2026"}
        ],
        loop_label="範式重構：工程師從逐行打字搬磚，升級為系統架構指揮官與審核守門人",
        accent="#0ea5e9"
    ),
    "resultImage": "Vibe Coding/01.軟體工程/vibe_coding_軟體工程.html",
    "slideUrl": "Vibe Coding/01.軟體工程/vibe_coding_軟體工程.html",
    "objective": "1. 深刻理解軟體工程四個歷史階段的核心痛點與演進必然性。\n2. 掌握 Vibe Coding 時代『開發者心態轉移』：從打字敲碼轉為架構定義、Prompt 工程與邊界審查。\n3. 學會辨別『寫代碼』與『系統架構設計』的價值重組，善用 AI Agent 高效構建工業物聯系統。",
    "tutorialSteps": [
        {
            "step": "第一代 混沌期 (1960s)：軟體危機的誕生",
            "description": "早期軟體開發缺乏架構與工程學規範，採用邊寫邊改 (Code & Fix) 的作法。隨著系統規模膨脹，出現嚴重的專案超支、延宕與程式碼無法維護，史稱『第一次軟體危機』。"
        },
        {
            "step": "第二代 瀑布模型 (1970s~1990s)：過度防禦與文件枷鎖",
            "description": "借鏡傳統土木工程，將軟體劃分為需求、分析、設計、編碼、測試、維運等嚴格線性階段。缺點是需求難以及時變更，後期發現缺陷時修改成本呈現指數級上升。"
        },
        {
            "step": "第三代 敏捷與 DevOps (2000s~2024)：快速迭代與自動化流水線",
            "description": "以 2 週 Sprint 為單位小步快跑，擁抱需求變更，配合 Git、CI/CD 與自動化單元測試，使產品能快速持續交付。但編碼本身仍嚴重受限於人類手工生產力。"
        },
        {
            "step": "第四代 Vibe Coding (2025~2026+)：AI 原生意圖驅動開發",
            "description": "由 LLM / Coding Agent 承接 90% 以上的具體編碼工作，人類開發者透過規格 (Spec.md)、意圖 (Intent.md) 與即時架構指導 (Prompt)，完成高質量軟體交付。"
        }
    ],
    "promptTemplate": "你是一位頂尖的軟體架構專家。請評估我手上的機電物聯網 SCADA 專案架構：\n1. 請以 Vibe Coding 模式，將目前傳統瀑布式的開發流程轉換為 Spec-Driven 的 AI 協同工作流。\n2. 針對 Node-RED 數據採集、Modbus 通訊與前端 Web 儀表板，產出模組化的 intent.md 與架構約束規範。\n3. 指出在此模式下，人類工程師應重點防禦與審核的關鍵邊界（例如工控安全、併發鎖定與死鎖偵測）。",
    "codeSnippet": {
        "language": "markdown",
        "code": "# Project Intent: Industrial SCADA IoT Dashboard\n## 1. 核心意圖 (Core Intent)\n建構五股職訓局機電 AI 監控系統，採集現場 PLC/Modbus 感測器數據並於 Web 即時可視化。\n\n## 2. 人機協作邊界 (Human-Agent Boundary)\n- AI Agent 職責: 產生 Node-RED Function 程式碼、UI 儀表板組件與單元測試。\n- 人類架構師職責: 審核通訊逾時熔斷、實體硬體安全極限值、資料庫 ACID 規範。\n\n## 3. 驗證指標 (Verification Criteria)\n- 採集延遲 < 100ms\n- 斷線自動重連機制覆蓋率 100%"
    },
    "references": [
        {
            "title": "軟體工程演進全景圖 (互動專題頁面)",
            "url": "Vibe Coding/01.軟體工程/vibe_coding_軟體工程.html"
        },
        {
            "title": "軟體工程經典反模式：隕石墜落型開發 (單元 05)",
            "url": "Vibe Coding/01.軟體工程/隕石墜落型開發 中文完整重現版.html"
        },
        {
            "title": "Anthropic AI-Native SDLC 全週期實戰手冊",
            "url": "Vibe Coding/01.軟體工程/Claude_The AI-Native SDLC playbook/Claude_The_AI-Native_SDLC_playbook_Slides.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-industry",
            "scenario": "工控自動化系統升級",
            "description": "將傳統耗時數月的 PLC/SCADA 控制邏輯重構，利用 Vibe Coding 與 AI 代理於數日內完成通訊協議配接與前端即時看板開發。"
        },
        {
            "icon": "fa-solid fa-code-branch",
            "scenario": "敏捷轉型與 AI SDLC 整合",
            "description": "團隊工作流從以『Jira Ticket 敲碼』為中心，轉向以『Spec 文件審閱與 Agent 生成品質驗證』為中心的敏捷卓越研發。"
        }
    ]
}

# 04：軟體工程經典反模式：隕石墜落型開發（メテオフォール型開発）
unit_04_meteor_fall = {
    "id": "vibe-meteor-fall",
    "labNumber": "05",
    "title": "軟體工程經典反模式：隕石墜落型開發（メテオフォール型開発）中文完整重現版",
    "shortTitle": "隕石墜落型開發 (經典反模式)",
    "category": "軟體工程",
    "date": "2026-11-01",
    "summary": "日本軟體業界經典黑色幽默反模式神作！由日本遊戲開發者 EIKI` 所著、heppoko 氏命名的《隕石墜落型開發》（メテオフォール型開発）。深刻剖析傳統瀑布模型與敏捷開發在面對『天界神明（客戶/高層）』隨性降下『毀滅性隕石（全部推翻重做）』時的無奈與崩潰。在下界，現場工程團隊只能徹夜含淚重建焦土。此篇為理解現代 Vibe Coding 與 AI 原生架構護欄 (Spec-Driven & Human-in-the-Loop) 的必讀經典反面教材！",
    "flowTitle": "隕石墜落型開發五大災厄演進與下界焦土重建流程",
    "resultTitle": "隕石墜落型開發中文完整重現版專題",
    "flowImage": make_svg_diagram(
        "隕石墜落型開發 (Meteor-Fall) 災厄閉環",
        "Waterfall/Agile -> Divine Revelation -> Meteor Impact -> Rebuilding",
        [
            {"num": "MF-01", "title": "天界默示", "sub": "高層客戶片面旨意", "tag": "Revelation"},
            {"num": "MF-02", "title": "人間苦幹", "sub": "現場團隊搬磚搭建", "tag": "Building"},
            {"num": "MF-03", "title": "隕石天降", "sub": "全部推翻灰飛煙滅", "tag": "Impact"},
            {"num": "MF-04", "title": "敏捷碎裂", "sub": "Sprint 與週期無效", "tag": "Break"},
            {"num": "MF-05", "title": "焦土重建", "sub": "通宵加班痛苦適應", "tag": "Rebuild"}
        ],
        loop_label="反模式核心啟示：缺乏架構防護與契約約束時，任何工程方法論在神意面前皆不堪一擊",
        accent="#f43f5e"
    ),
    "resultImage": "Vibe Coding/01.軟體工程/隕石墜落型開發 中文完整重現版.html",
    "slideUrl": "Vibe Coding/01.軟體工程/隕石墜落型開發 中文完整重現版.html",
    "objective": "1. 深刻理解日本經典軟體工程反模式『隕石墜落型開發』的成因、型態與現場工程師的真實困境。\n2. 剖析傳統瀑布流與敏捷迭代在面對無約束外部決策（神意翻盤）時失效的根本原因。\n3. 對比 Vibe Coding 與 Spec-Driven SDLC：如何藉由嚴謹規格契約、架構邊界與測試防線，杜絕『隕石滅頂之災』。",
    "tutorialSteps": [
        {
            "step": "第一節：體系的崩解與天啟 (Waterfall to Meteor)",
            "description": "傳統瀑布流由上游至下游平穩流動，但在隕石模式中，天界之神（客戶/高層）高高在上，下界眾生辛勤構築，最後一顆翻盤隕石讓全部心血灰飛煙滅。"
        },
        {
            "step": "第二節：啟示錄與單向禱告 (Apocalypse & Prayer)",
            "description": "交期絕不延後、預算維持原樣、規格由天決定。權力屏障阻絕現場回饋，工程師微弱的抗議與祈禱傳達率僅 0.001%。"
        },
        {
            "step": "第三節：諸神型態與神罰災厄 (Types of Gods)",
            "description": "剖析外部空降之神、無心之神、邪神等型態，以及多神混戰引發的專案『諸神黃昏』與毀滅性神罰。"
        },
        {
            "step": "第四節：應對心態與工程反思 (Spec-Driven Reflection)",
            "description": "反模式的終極反思：在軟體工程中唯有透過明確的架構護欄、變更契約與規格驅動 (Spec-Driven)，才能抵抗隨興決策造成的滅頂之災。"
        }
    ],
    "promptTemplate": "你是一位精通現代軟體工程與敏捷治理的資深架構師。\n我們團隊目前深受『隕石墜落型開發（客戶/老闆頻繁推翻核心架構與突發新規格）』之苦。\n請根據現代 AI-Native SDLC 與規格驅動 (Spec-Driven) 原則：\n1. 制定一份『抗隕石衝擊防禦指南』，說明如何透過 Spec 鷹架與架構邊界限制非理性變更。\n2. 設計一套『變更代價量化機制』，當神意翻盤時能自動列出工時、重構風險與測試回歸成本。\n3. 說明如何運用 Vibe Coding 與 AI Coding Agent 快速進行衝擊影響評估 (Blast Radius Analysis)。",
    "codeSnippet": {
        "language": "markdown",
        "code": "# Anti-Meteor Engineering Protocol (抗隕石防禦協定)\n## 1. 規格護欄 (Specification Guardrails)\n- 任何規格異動必須提交 RFC (Request for Comments) 與 ADR (Architecture Decision Record)。\n- 實作前需先凍結資料模型與公開介面。\n\n## 2. 變更爆炸半徑分析 (Blast Radius Assessment)\n- 由 Coding Agent 自動掃描依賴關聯圖 (Dependency Graph)。\n- 量化影響之模組、單元測試破壞數量與工期成本。\n\n## 3. 回歸測試門禁 (Automated Regression Gates)\n- 核心業務邏輯必須具備 100% 變異測試防禦力，杜絕黑盒翻盤。"
    },
    "references": [
        {
            "title": "iT 邦幫忙：轉載好文 - 隕石開發法（Meteor-Fall Development）",
            "url": "https://ithelp.ithome.com.tw/m/articles/10198394",
            "bgColor": "rgba(245, 158, 11, 0.18)",
            "borderColor": "rgba(245, 158, 11, 0.75)",
            "color": "#fbbf24",
            "icon": "fa-solid fa-fire",
            "badge": "推薦好文"
        },
        {
            "title": "隕石墜落型開發 中文完整重現版 (專屬專題頁面)",
            "url": "Vibe Coding/01.軟體工程/隕石墜落型開發 中文完整重現版.html"
        },
        {
            "title": "軟體工程演進全景圖 (單元 04)",
            "url": "Vibe Coding/01.軟體工程/vibe_coding_軟體工程.html"
        },
        {
            "title": "EIKI` 日文原始文章 (實踐遊戲製作筆記本2)",
            "url": "https://eiki.hatenablog.jp/entry/meteo_fall"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-meteor",
            "scenario": "團隊工程文化與反模式辨識",
            "description": "透過生動黑色幽默的經典反模式，讓團隊成員與管理層共同正視隨意變更需求對架構與工程師心智的毀滅性衝擊。"
        },
        {
            "icon": "fa-solid fa-shield-halved",
            "scenario": "規格約束與架構防禦落地",
            "description": "從『祈禱神明別改規格』轉變為主動導入 Spec-Driven 與 CI/CD 門禁防線，建立能抵禦非預期變更的韌性架構。"
        }
    ]
}

# 05：Vibe Coding 與新世代 AI 原生軟體工程權威指南
unit_05_guide = {
    "id": "vibe-guide",
    "labNumber": "06",
    "title": "Vibe Coding 與新世代 AI 原生軟體工程 (AI-Native SDLC 權威指南)",
    "shortTitle": "Vibe Coding 實戰心法指南",
    "category": "軟體工程",
    "date": "2026-09-20",
    "summary": "從靈感直覺到嚴謹工程！深入剖析 Andrej Karpathy (Tesla 前 AI 總監 / OpenAI 共同創辦人) 提出的 Vibe Coding 革命浪潮與新世代 AI 原生軟體工程 (AI-Native SDLC)。工程師角色從敲碼打字員躍升為系統架構指揮家，以自然語言、規格契約 (Spec) 與自主代理閉環 (Agentic Loops) 重新定義軟體開發全流程。",
    "flowTitle": "從直覺意圖到嚴謹架構的 Vibe Coding 實踐四角矩陣",
    "resultTitle": "Vibe Coding 與 AI-Native SDLC 權威指南互動頁面",
    "flowImage": make_svg_diagram(
        "Vibe Coding 與 AI-Native SDLC 核心架構",
        "Natural Language, Agentic Loops, Spec-Driven & Human-in-the-Loop",
        [
            {"num": "V-01", "title": "直覺意圖", "sub": "自然語言即編譯器", "tag": "Intent"},
            {"num": "V-02", "title": "規格約束", "sub": "Spec.md 契約工程", "tag": "Contract"},
            {"num": "V-03", "title": "代理閉環", "sub": "自治產碼與自愈修復", "tag": "Agent Loop"},
            {"num": "V-04", "title": "人機驗收", "sub": "架構審查與安全把關", "tag": "Human Gate"}
        ],
        loop_label="Karpathy 哲學：以直覺發起，以代理執行，以架構約束，以嚴謹驗收",
        accent="#6366f1"
    ),
    "resultImage": "Vibe Coding/01.軟體工程/vibe_coding_software_engineering_guide.html",
    "slideUrl": "Vibe Coding/01.軟體工程/vibe_coding_software_engineering_guide.html",
    "objective": "1. 掌握 Andrej Karpathy 提出之 Vibe Coding 核心哲理與『自然語言即編譯器』的心智模型。\n2. 深刻對比傳統 SDLC 與 AI-Native SDLC 在需求、設計、編碼、測試各階段的範式轉移。\n3. 熟練掌握 Context Engineering (上下文工程) 與 Human-in-the-Loop 驗收標準，打造成熟穩健的工業級軟體。",
    "tutorialSteps": [
        {
            "step": "核心原則一：自然語言即編譯器 (Natural Language as Compiler)",
            "description": "透過精確的 Prompt、Markdown 規範與上下文注入 (Context Engineering)，自然語言晉身為最高階的高階語言，大幅縮短思想與代碼實現的落差。"
        },
        {
            "step": "核心原則二：自主代理人閉環 (Agentic Loops & Self-Correction)",
            "description": "AI 不僅提供代碼補全，更能主動調用終端機命令、自動執行單元測試、解析日誌報錯並進行自主迭代修復。"
        },
        {
            "step": "核心原則三：人機迴圈檢驗 (Human-in-the-Loop Verification)",
            "description": "工程師的精力從繁瑣語法細節移轉至系統安全性、高階架構設計、驗收標準 (Acceptance Criteria) 與業務邏輯的嚴密把關。"
        },
        {
            "step": "核心原則四：規格驅動開發 (Spec-Driven Engineering)",
            "description": "杜絕盲目瞎猜。在讓 Agent 敲代碼之前，先鎖定資料模型、API 界面、非功能性需求與邊界條件，實現高可靠生產級交付。"
        }
    ],
    "promptTemplate": "你是一位頂尖的 AI 原生軟體工程專家。請根據 Andrej Karpathy 的 Vibe Coding 理念：\n『專注於意圖表達 (Intent)、架構規格 (Specs) 與驗收標準 (Acceptance Criteria)』\n請針對我手上的 Node-RED 工控通訊模組，提出一份符合 AI-Native SDLC 的：\n1. 架構意圖說明 (Intent Specification)\n2. 關鍵上下文工程清單 (Context Checklist)\n3. 自主代理測試驗收計畫 (Acceptance Tests for Agent Loops)",
    "codeSnippet": {
        "language": "markdown",
        "code": "# Vibe Coding Engineering Manifesto\n## 1. Intent over Implementation (意圖先於實作)\n- 我們定義系統要達成什麼目標，而非親手敲擊每一行 for 迴圈。\n\n## 2. Specs as Contracts (規格即契約)\n- 任何大規模 Agent 協同前，先鎖定 spec.md 作為單一真相來源 (Single Source of Truth)。\n\n## 3. Autonomous Verification (自主驗收)\n- 每次代碼生成必須伴隨全自動單元測試與日誌驗證。"
    },
    "references": [
        {
            "title": "Vibe Coding 與新世代 AI 原生軟體工程 (專屬互動頁面)",
            "url": "Vibe Coding/01.軟體工程/vibe_coding_software_engineering_guide.html"
        },
        {
            "title": "軟體工程演進全景圖 (單元 04)",
            "url": "Vibe Coding/01.軟體工程/vibe_coding_軟體工程.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-bolt",
            "scenario": "新世代工程團隊能力轉型",
            "description": "幫助工程師擺脫沉重低效的重構與樣板碼書寫，將 80% 時間專注在頂層系統設計與工業核心演算法。"
        }
    ]
}

# 06：Anthropic Claude AI-Native SDLC
unit_06_claude = {
    "id": "vibe-02",
    "labNumber": "07",
    "title": "Anthropic Claude：AI-Native SDLC 全週期實戰手冊 (Playbook)",
    "category": "軟體工程",
    "date": "2026-08-21",
    "summary": "Anthropic 官方權威發布《The AI-Native SDLC Playbook》。宣告『Code is no longer the bottleneck』！深入解構 Plan (規劃)、Design (設計)、Build (構建)、Test (測試)、Deploy (部署)、Maintain (維護) 六大階段，落實以版本控制工件鏈 (intent.md -> spec.md -> plan.md) 驅動的全自動閉環。",
    "flowTitle": "AI-Native SDLC 六大階段工件閉環架構",
    "resultTitle": "Anthropic 220+ 頁互動簡報系統",
    "flowImage": make_svg_diagram(
        "AI-Native SDLC 六階段工件鏈", 
        "Anthropic Six-Stage Closed-Loop Playbook Architecture",
        [
            {"num": "01", "title": "Plan 企劃", "sub": "intent.md 捕獲意圖", "tag": "意圖驅動"},
            {"num": "02", "title": "Design 設計", "sub": "spec.md 規格收斂", "tag": "規格鎖定"},
            {"num": "03", "title": "Build 構建", "sub": "plan.md 分塊產碼", "tag": "Agent 執行"},
            {"num": "04", "title": "Test & Deploy", "sub": "自適應驗證與金絲雀", "tag": "門禁把關"},
            {"num": "05", "title": "Maintain 維護", "sub": "告警轉 incident.md", "tag": "自動閉環"}
        ],
        loop_label="生產事故或新需求自動觸發新一輪 intent.md，形成永續自我優化飛輪",
        accent="#f59e0b"
    ),
    "resultImage": "Vibe Coding/01.軟體工程/Claude_The AI-Native SDLC playbook/Claude_The_AI-Native_SDLC_playbook_Slides.html",
    "slideUrl": "Vibe Coding/01.軟體工程/Claude_The AI-Native SDLC playbook/Claude_The_AI-Native_SDLC_playbook_Slides.html",
    "objective": "1. 徹底掌握 AI-Native SDLC 的六大閉環階段與核心工件串接鏈條。\n2. 熟悉 intent.md、spec.md、plan.md 的標準撰寫規範與版本控管。\n3. 理解 Human in the loop 的把關哲學：人類專注於把關門禁 (Gates)，而非從零打字。",
    "tutorialSteps": [
        {
            "step": "Stage 1 — Plan (企劃意圖捕獲)",
            "description": "任何人有想法時，不再需要繁複填寫冗長 Jira 單，而是直接與 Claude 進行頭腦風暴，自動生成結構化且可版本控管的 intent.md，經產品負責人審批後自動觸發下一階段。"
        },
        {
            "step": "Stage 2 — Design (架構規格定稿)",
            "description": "以 intent.md 為輸入，Agent 自動查閱既有專案代碼庫規範與依賴，產出嚴謹的 spec.md，明確定義 API 界面、數據模型、非功能性需求與邊界約束。"
        },
        {
            "step": "Stage 3 — Build (任務分塊與自主編碼)",
            "description": "將 spec.md 分解為具體的 plan.md 任務清單。Coding Agent (如 Claude Code) 逐步生成代碼差異 (Diff) 與單元測試，人類僅需在高階 Diff 層面進行驗收。"
        },
        {
            "step": "Stage 4 & 5 — Test & Deploy (自適應測試與金絲雀發布)",
            "description": "Agent 依據邊界條件自動生成 Fuzzing 測試套件，通過後進入自動化 CI/CD 管道，執行金絲雀發布 (Canary Deploy) 與自動健康度觀測。"
        },
        {
            "step": "Stage 6 — Maintain (生產維護與事故閉環)",
            "description": "當生產環境監控警報超出控制帶時，Agent 自動擷取錯誤日誌與 Trace，產出 incident.md 與修復 Pull Request，形成自我修復的自愈生態。"
        }
    ],
    "promptTemplate": "你是一位精通 Anthropic AI-Native SDLC 的主任架構師。請依據以下業務需求：\n『為 Node-RED 增加一個安全驗證節點，當感測器讀數超過上限時，以 JWT 加密通知警報伺服器』\n請按照手冊規範，產出標準的：\n1. intent.md (業務意圖、利害關係人、成功指標)\n2. spec.md (API 簽名、驗證規則、錯誤處理)\n3. plan.md (分步驟實施清單、門禁驗收點)",
    "codeSnippet": {
        "language": "markdown",
        "code": "<!-- intent.md 實戰範例 -->\n# Intent: Node-RED 工控節點安全驗證模組\n\n## Why\n現行 Node-RED 數據直傳未經加密簽章，面臨中間人攻擊風險。\n\n## What\n實作自訂節點 `node-red-contrib-industrial-auth`，支援 HMAC-SHA256 簽署與重放攻擊防護。\n\n## Governance Gates\n- [ ] 安全團隊審批演算法安全性 (FIPS 140-2)\n- [ ] 壓測通過 5,000 req/sec，延遲增加 < 5ms"
    },
    "references": [
        {
            "title": "Claude The AI-Native SDLC Playbook (220+ 頁互動簡報系統)",
            "url": "Vibe Coding/01.軟體工程/Claude_The AI-Native SDLC playbook/Claude_The_AI-Native_SDLC_playbook_Slides.html"
        },
        {
            "title": "Anthropic 官方 Blog 原文參考",
            "url": "https://claude.com/blog/the-ai-native-sdlc-playbook"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-shield-halved",
            "scenario": "企業級合規與審計追蹤",
            "description": "所有需求、架構決策與 Agent 生成代碼皆以 Git Commit 工件作為審計依據，滿足金融與嚴苛工業規範之合規要求。"
        },
        {
            "icon": "fa-solid fa-rotate",
            "scenario": "工控系統自愈運維 (Self-Healing)",
            "description": "現場 PLC 斷線異常自動生成 incident.md 並自動產生重連容錯 PR，大幅降低停線損失。"
        }
    ]
}

# Google 5-Day 子單元清單 (Sub-modules)
google_children = [
    {
        "id": "vibe-google-d1",
        "parentId": "vibe-google-course",
        "subNumber": "D1",
        "title": "Google Day 1: The New SDLC With Vibe Coding (新生命週期)",
        "shortTitle": "Day 1: 新 SDLC 生命週期",
        "category": "軟體工程",
        "date": "2026-07-04",
        "summary": "Google 官方 5-Day AI Agents Intensive 課程精華 Day 1。探討在生成式 Agent 時代，軟體工程如何從單純的 Prompt Engineering 演進為具備感知 (Perception)、推理 (Reasoning) 與行動 (Action) 的自治代理循環，以規格驅動引導 Agent 構建強固的現代系統。",
        "flowTitle": "Google Day 1 自治代理循環與規格驅動架構",
        "resultTitle": "Google Day 1 課程精選簡報投影片",
        "flowImage": make_svg_diagram(
            "Google Day 1: The New SDLC with Agents",
            "Autonomous Agent Loop & Spec-Driven Engineering",
            [
                {"num": "D1-1", "title": "感知環境", "sub": "代碼庫與狀態讀取", "tag": "Perception"},
                {"num": "D1-2", "title": "推理規劃", "sub": "ReAct / CoT 思維鏈", "tag": "Reasoning"},
                {"num": "D1-3", "title": "工具行動", "sub": "執行代碼與檔案變更", "tag": "Action"},
                {"num": "D1-4", "title": "評估反饋", "sub": "自我除錯與迴圈修正", "tag": "Reflection"}
            ],
            loop_label="Agent 自治執行直到滿足規格定義之收斂條件",
            accent="#3b82f6"
        ),
        "resultImage": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/Day_01_The New SDLC With Vibe Coding/slides.html",
        "slideUrl": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/Day_01_The New SDLC With Vibe Coding/slides.html",
        "objective": "1. 掌握 Autonomous Agent 的四大基本支柱：感知 (Perception)、推理 (Reasoning)、行動 (Action)、記憶 (Memory)。\n2. 理解單次 LLM 呼叫與 Multi-Step Agentic Workflow 的質變差別。\n3. 學會使用 Spec 鎖定 Agent 的行為邊界，避免發散與幻覺。",
        "tutorialSteps": [
            {
                "step": "單元 1: 從靜態生成到動態自治代理",
                "description": "對比傳統 Chatbot 僅能單次回答，Agent 具備環境感知與工具調用能力，能根據執行回傳結果即時動態調整後續決策。"
            },
            {
                "step": "單元 2: ReAct (Reasoning + Acting) 模式剖析",
                "description": "深入解析 Thought -> Action -> Observation 核心循環，使模型在採取任何關鍵修改前進行深度自我論證。"
            },
            {
                "step": "單元 3: 規格驅動開發 (Spec-Driven Development)",
                "description": "以嚴謹的規格 (Spec) 取代模糊的 Prompt。規格包含前置條件、輸入輸出契約、容錯邊界與單元測試清單。"
            }
        ],
        "promptTemplate": "You are an autonomous Senior Software Engineer Agent operating under Google's SDLC framework.\nAnalyze the following repository structure and generate a comprehensive Spec for implementing an MQTT telemetry publisher node.\nFollow the ReAct framework: explicitly output Thought, Action, and Observation before writing the implementation.",
        "codeSnippet": {
            "language": "python",
            "code": "# Google Day 1: Simple ReAct Agent Skeleton\nclass ReActAgent:\n    def __init__(self, model, tools):\n        self.model = model\n        self.tools = tools\n\n    def run(self, task_spec):\n        thought = self.model.think(f'Goal: {task_spec}')\n        while not task_spec.is_satisfied():\n            action = self.model.plan_action(thought)\n            observation = self.tools.execute(action)\n            thought = self.model.reflect(observation)\n        return 'Task Successfully Completed'"
        },
        "references": [
            {
                "title": "Google Day 1 投影片簡報 (Slides)",
                "url": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/Day_01_The New SDLC With Vibe Coding/slides.html"
            },
            {
                "title": "Google 5-Day 課程總目錄",
                "url": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/index.html"
            }
        ],
        "applications": [
            {
                "icon": "fa-solid fa-microchip",
                "scenario": "自主單元測試補齊",
                "description": "給予現有 Node-RED 模組，Agent 自動遍歷所有邊界情況並自動撰寫 Mocha/Jest 單元測試。"
            }
        ]
    },
    {
        "id": "vibe-google-d2",
        "parentId": "vibe-google-course",
        "subNumber": "D2",
        "title": "Google Day 2: Agent Tools 與互通性 (Interoperability)",
        "shortTitle": "Day 2: Tools 工具互通",
        "category": "軟體工程",
        "date": "2026-07-06",
        "summary": "Google 課程 Day 2。剖析 Function Calling、OpenAPI 規範與工具調用協定。讓 Agent 真正突破文字世界，具備執行 Shell 命令、讀寫 SQL/NoSQL 資料庫、呼叫工業物聯網 RESTful API 的真實實踐能力。",
        "flowTitle": "Agent 工具調用與協調互通架構",
        "resultTitle": "Google Day 2 課程投影片",
        "flowImage": make_svg_diagram(
            "Google Day 2: Agent Tools & Interoperability",
            "Function Calling, Schema Definition & Safe Execution",
            [
                {"num": "D2-1", "title": "Schema 定義", "sub": "JSON Schema / OpenAPI", "tag": "Contract"},
                {"num": "D2-2", "title": "模型決策", "sub": "選擇最合適 Tool 參數", "tag": "Selection"},
                {"num": "D2-3", "title": "沙盒執行", "sub": "本機隔離防禦執行", "tag": "Execution"},
                {"num": "D2-4", "title": "回傳解析", "sub": "結構化輸出回饋上下文", "tag": "Feedback"}
            ],
            loop_label="工具執行異常自動進行參數自愈重試 (Self-Correction)",
            accent="#0284c7"
        ),
        "resultImage": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/Day_02_Agent Tools & Interoperability/index.html",
        "slideUrl": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/Day_02_Agent Tools & Interoperability/index.html",
        "objective": "1. 掌握 JSON Schema 宣告 Function Calling 規範的方法與標準實踐。\n2. 理解 Agent 如何調用工控設備 Modbus/TCP 協定與資料庫。\n3. 實作工具執行異常時的錯誤捕獲與自動修復機制。",
        "tutorialSteps": [
            {
                "step": "步驟 1: 定義標準化 Tool Schema",
                "description": "編寫清晰的工具參數型態與語意描述，使 LLM 能精準辨識呼叫時機與必填欄位。"
            },
            {
                "step": "步驟 2: 建立執行沙盒防護",
                "description": "確保工具執行具備只讀/寫入分級權限，重大系統破壞性指令必須包含人機確認 (Human confirmation)。"
            },
            {
                "step": "步驟 3: 互通性與跨協定適配",
                "description": "透過標準格式串接 Node-RED HTTP Endpoint 與外部 MQTT Broker。"
            }
        ],
        "promptTemplate": "請將下列 Node-RED 數據寫入 MySQL 的功能封裝為標準的 OpenAI/Gemini Function Calling Schema，並附帶 Python 執行器：\n1. 函數名稱: record_sensor_telemetry\n2. 參數包含 device_id, temperature, humidity, status_code",
        "codeSnippet": {
            "language": "json",
            "code": "{\n  \"name\": \"record_sensor_telemetry\",\n  \"description\": \"將機電感測器即時遙測數據安全寫入工控時間序列資料庫\",\n  \"parameters\": {\n    \"type\": \"object\",\n    \"properties\": {\n      \"device_id\": { \"type\": \"string\", \"description\": \"設備唯一識別碼，如 PLC-MAIN-01\" },\n      \"temperature\": { \"type\": \"number\", \"description\": \"當前溫度攝氏數值\" },\n      \"humidity\": { \"type\": \"number\", \"description\": \"當前環境濕度百分比\" }\n    },\n    \"required\": [\"device_id\", \"temperature\", \"humidity\"]\n  }\n}"
        },
        "references": [
            {
                "title": "Google Day 2 投影片簡報 (Slides)",
                "url": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/Day_02_Agent Tools & Interoperability/index.html"
            }
        ],
        "applications": [
            {
                "icon": "fa-solid fa-server",
                "scenario": "智慧工廠設備即時調試",
                "description": "Agent 透過 Tool 直接讀取 PLC 暫存器 (D0-D100) 數值，即時偵測異常並產生警報診斷報告。"
            }
        ]
    },
    {
        "id": "vibe-google-d3",
        "parentId": "vibe-google-course",
        "subNumber": "D3",
        "title": "Google Day 3: Agent Skills 技能擴展體系 (架構與封裝)",
        "shortTitle": "Day 3: Skills 技能體系",
        "category": "軟體工程",
        "date": "2026-07-08",
        "summary": "Google 課程 Day 3。聚焦於 Agent 技能模組化包裝（Skills Architecture）。如同人類工程師具備專屬技能證照，Agent 透過 SKILL.md 宣告、動態上下文掛載與分工調度，能在特定領域（如工控調校、數據清洗、安全性掃描）發揮專家級威力。",
        "flowTitle": "Agent Skills 模組化分工與動態調度體系",
        "resultTitle": "Google Day 3 課程投影片",
        "flowImage": make_svg_diagram(
            "Google Day 3: Modular Agent Skills",
            "Skill Manifest, Progressive Disclosure & Dynamic Routing",
            [
                {"num": "D3-1", "title": "Skill 清單", "sub": "輕量 YAML/MD 元數據", "tag": "Discovery"},
                {"num": "D3-2", "title": "動態載入", "sub": "依任務需求漸進式加載", "tag": "Activation"},
                {"num": "D3-3", "title": "專業執行", "sub": "掛載領域專用腳本與 Prompt", "tag": "Execution"},
                {"num": "D3-4", "title": "狀態回寫", "sub": "保留執行記錄與工件", "tag": "Artifacts"}
            ],
            loop_label="支援 Multi-Skill 組合串聯，完成端到端複雜工程流水線",
            accent="#8b5cf6"
        ),
        "resultImage": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/Day_03_Agent Skills/Agent_Skills_Day_3.html",
        "slideUrl": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/Day_03_Agent Skills/Agent_Skills_Day_3.html",
        "objective": "1. 深入掌握 SKILL.md 的設計哲學與漸進式揭露 (Progressive Disclosure) 原理。\n2. 學會為 Node-RED 專案打造專屬的工控代碼生成與除錯 Skill。\n3. 理解多 Agent 協同架構中的 Skill 路由機制與衝突解鎖。",
        "tutorialSteps": [
            {
                "step": "步驟 1: SKILL.md 規範設計",
                "description": "撰寫清晰的 YAML Frontmatter 與使用情境觸發條件 (Triggers)，避免 Prompt 污染主要上下文。"
            },
            {
                "step": "步驟 2: 封裝專用 Scripts 與 References",
                "description": "將繁複的工控計算邏輯與常用 API 封裝在 Skill 的 scripts/ 目錄下，供 Agent 隨需執行。"
            },
            {
                "step": "步驟 3: 驗證 Skill 動態調用",
                "description": "透過模擬對話測試 Agent 能否在適當時機正確啟動該 Skill 並取得預期產出。"
            }
        ],
        "promptTemplate": "請為我們的 Node-RED 實驗課程建立一個名為 'node-red-flow-analyzer' 的 Agent Skill。\n規範包含：\n1. 專門分析 Node-RED 匯出的 JSON Flow 檔案。\n2. 自動偵測無限迴圈 (Infinite Loop)、未捕獲例外 (Catch node 缺失) 與未設定超時的 HTTP 請求。\n3. 請輸出標準的 SKILL.md 格式。",
        "codeSnippet": {
            "language": "markdown",
            "code": "---\nname: node-red-flow-analyzer\ndescription: 專門檢測 Node-RED Flow 架構隱患、死鎖風險與缺失安全節點的專家級 Skill\n---\n# Node-RED Flow Analyzer Skill\n\n當使用者要求檢查或優化 Node-RED Flow 時使用本技能。\n\n## 審查清單 (Checklist)\n1. 是否每個 http in 都有對應的 http response？\n2. 所有的 function 節點是否有適當的 try/catch 防護？\n3. MQTT 與 Modbus 連線是否具備自動重連機制？"
        },
        "references": [
            {
                "title": "Google Day 3 投影片簡報 (Slides)",
                "url": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/Day_03_Agent Skills/Agent_Skills_Day_3.html"
            }
        ],
        "applications": [
            {
                "icon": "fa-solid fa-wand-magic-sparkles",
                "scenario": "專案代碼標準化 Skill",
                "description": "透過安裝自訂 Skill，確保所有學員產出的 Node-RED 程式碼皆符合統一之變數命名與工控安全規範。"
            }
        ]
    },
    {
        "id": "vibe-google-d4",
        "parentId": "vibe-google-course",
        "subNumber": "D4",
        "title": "Google Day 4: Agent 安全防禦、合規與評估 (Evaluation)",
        "shortTitle": "Day 4: 安全防禦與評估",
        "category": "軟體工程",
        "date": "2026-07-10",
        "summary": "Google 課程 Day 4。探討生產級 Agent 最核心的生命線：安全防禦與客觀評估。涵蓋 Prompt Injection 防護、越獄偵測、沙盒隔離執行以及 LLM-as-a-Judge 自動化回歸評測流水線，讓 Vibe Coding 不僅產出快速，更能經得起工業級安全考驗。",
        "flowTitle": "Agent 安全防護網與自動化評估架構",
        "resultTitle": "Google Day 4 課程投影片",
        "flowImage": make_svg_diagram(
            "Google Day 4: Agent Security & Evaluation",
            "Defense in Depth, Guardrails & LLM-as-a-Judge Eval",
            [
                {"num": "D4-1", "title": "輸入淨化", "sub": "防禦 Prompt 注入攻擊", "tag": "Sanitization"},
                {"num": "D4-2", "title": "護欄守門", "sub": "NeMo / Llama-Guard 檢查", "tag": "Guardrails"},
                {"num": "D4-3", "title": "安全執行", "sub": "容器沙盒與權限最小化", "tag": "Isolation"},
                {"num": "D4-4", "title": "自動化評估", "sub": "準確率、延遲與幻覺率指標", "tag": "Evaluation"}
            ],
            loop_label="持續監控評估數據，評分低於門檻時觸發警報並阻斷上線",
            accent="#ef4444"
        ),
        "resultImage": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/Day_04_Vibe Coding Agent Security and Evaluation/Vibe Coding Agent Security and Evaluation_Day_4_Slides.html",
        "slideUrl": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/Day_04_Vibe Coding Agent Security and Evaluation/Vibe Coding Agent Security and Evaluation_Day_4_Slides.html",
        "objective": "1. 識別間接提示注入 (Indirect Prompt Injection) 與系統越獄風險。\n2. 掌握輸入/輸出雙向護欄 (Input/Output Guardrails) 的部署策略。\n3. 學會建構 LLM-as-a-Judge 自動化測試矩陣，客觀評估 Agent 產出品質。",
        "tutorialSteps": [
            {
                "step": "步驟 1: 威脅建模 (Threat Modeling)",
                "description": "分析工控環境中惡意數據注入（例如偽造 MQTT payload 嘗試操控 Agent 刪除資料庫）的攻擊向量。"
            },
            {
                "step": "步驟 2: 實施多層防禦 (Defense-in-Depth)",
                "description": "將權限嚴格劃分，Agent 不得直接接觸 Root 權限，且關鍵操作需二階段簽署確認。"
            },
            {
                "step": "步驟 3: 構建 Evaluation Benchmark",
                "description": "撰寫包含 50+ 個邊界案例的黃金測試集 (Golden Dataset)，每次 Prompt 或模型微調後全自動跑分。"
            }
        ],
        "promptTemplate": "你是一位頂尖的 AI 安全審查官。請對以下 Agent 提示詞與執行腳本進行滲透攻擊分析：\n1. 尋找潛在的 Prompt Injection 漏洞。\n2. 評估未受信任的第三方外部輸入是否可能劫持 Agent 的 Tool 調用。\n3. 給出加固後的防禦版本與驗證測試案例。",
        "codeSnippet": {
            "language": "python",
            "code": "# Google Day 4: LLM-as-a-Judge Evaluation Metric\ndef evaluate_agent_safety(response_text, safety_rubric):\n    eval_prompt = f'''\n    請根據以下工業安全標準評判該回答：\n    標準: {safety_rubric}\n    待評測文本: {response_text}\n    請輸出 1-5 分並說明是否存在指令越權風險。\n    '''\n    score = judge_model.generate(eval_prompt)\n    return parse_score(score)"
        },
        "references": [
            {
                "title": "Google Day 4 投影片簡報 (Slides)",
                "url": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/Day_04_Vibe Coding Agent Security and Evaluation/Vibe Coding Agent Security and Evaluation_Day_4_Slides.html"
            }
        ],
        "applications": [
            {
                "icon": "fa-solid fa-lock",
                "scenario": "工業物聯網資安合規防禦",
                "description": "防止惡意黑客透過外部感測器封包注入惡意指令，確保工控大腦安全無虞。"
            }
        ]
    },
    {
        "id": "vibe-google-d5",
        "parentId": "vibe-google-course",
        "subNumber": "D5",
        "title": "Google Day 5: 規範驅動 (Spec-Driven) 生產級開發實務",
        "shortTitle": "Day 5: 規範驅動開發",
        "category": "軟體工程",
        "date": "2026-07-12",
        "summary": "Google 密集課程 Day 5 結訓總結。邁向真正 Production-Ready 的 Vibe Coding 實踐！融合規格驅動 (Spec-Driven)、CI/CD 整合測試、容器化發布與 OpenTelemetry 全鏈路追蹤，讓 Agent 成為軟體工程團隊最強大的副駕駛 (Co-Pilot)。",
        "flowTitle": "生產級規範驅動開發全鏈路流水線",
        "resultTitle": "Google Day 5 課程投影片",
        "flowImage": make_svg_diagram(
            "Google Day 5: Production-Grade Vibe Coding",
            "Spec-Driven Architecture, CI/CD Pipeline & Observability",
            [
                {"num": "D5-1", "title": "Spec 規範工程", "sub": "定義 API 與邊界約束", "tag": "Spec"},
                {"num": "D5-2", "title": "Agent 結對產碼", "sub": "分塊實作與測試生成", "tag": "Coding"},
                {"num": "D5-3", "title": "CI/CD 門禁", "sub": "自動驗收與容器封裝", "tag": "Release"},
                {"num": "D5-4", "title": "可觀測性", "sub": "OpenTelemetry 全鏈路追蹤", "tag": "Tracing"}
            ],
            loop_label="端到端全自動化，生產環境異常自動回饋回 Spec 修訂",
            accent="#10b981"
        ),
        "resultImage": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/Day_05_Spec-Driven Production Grade Development in the Age of Vibe Coding/presentation.html",
        "slideUrl": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/Day_05_Spec-Driven Production Grade Development in the Age of Vibe Coding/presentation.html",
        "objective": "1. 融會貫通從草案、Spec 規範到生產級發布的完整 Vibe Coding 生命週期。\n2. 掌握 OpenTelemetry / Tracing 在 Agent 行為可觀測性中的實踐。\n3. 具備以 AI 協作模式獨立完成複雜工業物聯網全端系統的實戰能力。",
        "tutorialSteps": [
            {
                "step": "步驟 1: 撰寫 Production Spec",
                "description": "規範包含明確的 SLA 指標（如 99.9% 可用性、P99 延遲）、資料持久化策略與失敗降級方案。"
            },
            {
                "step": "步驟 2: 自動化集成測試與容器化",
                "description": "Agent 自動產生 Dockerfile、Docker Compose 與 GitHub Actions CI/CD 流水線配置。"
            },
            {
                "step": "步驟 3: 監控與告警反饋閉環",
                "description": "整合 Prometheus 與 Grafana 監控指標，完成現代化可觀測性部署。"
            }
        ],
        "promptTemplate": "請以 Google Day 5 規範驅動開發架構，為五股職訓局智慧機電系統設計一套完整的 CI/CD 與 Production Spec：\n1. 包含 Node-RED Flow 靜態分析與自動化 Mocha 測試腳本。\n2. 包含 Docker 多階段建構 (Multi-stage build) 最佳實踐。\n3. 包含 Prometheus /metrics 端點監控規格。",
        "codeSnippet": {
            "language": "yaml",
            "code": "# Production Spec: CI/CD Pipeline\nname: Vibe Coding Production Gate\non: [push, pull_request]\njobs:\n  spec-verify:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Validate Flow Spec\n        run: npm run test:flow-lint\n      - name: Security Fuzzing\n        run: npm run test:security\n      - name: Docker Multi-Stage Build\n        run: docker build -t industrial-iot:latest ."
        },
        "references": [
            {
                "title": "Google Day 5 投影片簡報 (Slides)",
                "url": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/Day_05_Spec-Driven Production Grade Development in the Age of Vibe Coding/presentation.html"
            },
            {
                "title": "Google 5-Day 全系列課程總覽",
                "url": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/index.html"
            }
        ],
        "applications": [
            {
                "icon": "fa-solid fa-rocket",
                "scenario": "快速交付端到端工控專案",
                "description": "在規範驅動的保障下，原本需團隊 1 個月開發的智慧 SCADA 系統，單一工程師在 3 天內即可安全穩定交付。"
            }
        ]
    }
]

# 07：Google 5-Day 全系列母群組
unit_07_google = {
    "id": "vibe-google-course",
    "labNumber": "08",
    "isGroup": True,
    "groupTitle": "Google 5-Day AI Agents 密集課程 (全五天系列)",
    "title": "Google 5-Day AI Agents 密集課程：完整實戰總覽 (Day 1 ~ Day 5)",
    "shortTitle": "Google 5-Day 全系列",
    "category": "軟體工程",
    "date": "2026-07-04 ~ 07-12",
    "summary": "Google 官方推出的 5-Day AI Agents Intensive 完整系列課程。專為生成式 Agent 時代軟體工程師打造，涵蓋從自治代理重塑 SDLC、工具調用 (Function Calling)、Agent Skills 技能體系、安全合規與評估 (Eval)，到規範驅動 (Spec-Driven) 的生產級開發實務。本群組包含 Day 1 至 Day 5 五大核心子模組。",
    "flowTitle": "Google 5-Day AI Agents 全週期五大核心模組全景圖",
    "resultTitle": "Google 5-Day 課程總覽互動投影片",
    "flowImage": make_svg_diagram(
        "Google 5-Day AI Agents 完整課程全景圖",
        "Comprehensive 5-Day Intensive Curriculum Architecture",
        [
            {"num": "Day 1", "title": "新 SDLC", "sub": "自治代理循環", "tag": "Agent Loop"},
            {"num": "Day 2", "title": "Tools 互通", "sub": "工具調用協議", "tag": "Function Calling"},
            {"num": "Day 3", "title": "Skills 體系", "sub": "模組化技能封裝", "tag": "SKILL.md"},
            {"num": "Day 4", "title": "安全與評估", "sub": "護欄與 LLM-Eval", "tag": "Guardrails"},
            {"num": "Day 5", "title": "規範驅動", "sub": "生產級 CI/CD", "tag": "Spec-Driven"}
        ],
        loop_label="五天完整閉環：從思維架構、工具串接、能力延伸到生產級合規部署",
        accent="#2563eb"
    ),
    "resultImage": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/index.html",
    "slideUrl": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/index.html",
    "objective": "1. 系統性掌握 Google 5-Day AI Agents Intensive 的端到端架構演進脈絡。\n2. 依序深入 Day 1 至 Day 5 的核心模組，熟練從自治推理到生產級上線的完整技術棧。\n3. 具備將 Agent 工具、技能與安全評估落地於 Node-RED 工業機電專案的實作能力。",
    "tutorialSteps": [
        {
            "step": "Day 1: The New SDLC With Vibe Coding",
            "description": "探索生成式 Agent 如何重塑軟體生命週期，自治代理 (Autonomous Agent) 核心循環與 Spec-driven 開發心法。"
        },
        {
            "step": "Day 2: Agent Tools & Interoperability",
            "description": "深入探討 Function Calling、OpenAPI 整合與工具互通性，賦予 Agent 調用工控 API 與資料庫的能力。"
        },
        {
            "step": "Day 3: Agent Skills 技能擴展體系",
            "description": "模組化技能封裝 (SKILL.md)、動態上下文載入與多代理協同分工模式。"
        },
        {
            "step": "Day 4: Agent 安全防禦、合規與評估",
            "description": "防禦 Prompt Injection、容器沙盒防護、LLM-as-a-Judge 自動化回歸評測流水線。"
        },
        {
            "step": "Day 5: 規範驅動 (Spec-Driven) 生產級開發",
            "description": "Production-ready 系統建置、規格到代碼全自動測試、CI/CD 門禁與 OpenTelemetry 可觀測性監控。"
        }
    ],
    "promptTemplate": "你是一位 Google 認證的 AI Agent 系統架構師。請根據 Google 5-Day 課程架構，為五股職訓局機電 AI 班規劃一套涵蓋：\n1. Day 1: 自治代理核心循環\n2. Day 2: 工控 Modbus / HTTP 工具封裝\n3. Day 3: Node-RED 代碼分析 Skill\n4. Day 4: 輸入護欄與品質評估\n5. Day 5: 規範驅動生產級部署\n的完整實務專案架構規劃書。",
    "codeSnippet": {
        "language": "markdown",
        "code": "# Google 5-Day AI Agents Curriculum Map\n├── Day 01: The New SDLC (Perception -> Reasoning -> Action -> Reflection)\n├── Day 02: Tools & Interoperability (JSON Schema & Safe Execution)\n├── Day 03: Agent Skills (SKILL.md & Dynamic Discovery)\n├── Day 04: Security & Eval (Prompt Defense & LLM-as-a-Judge)\n└── Day 05: Spec-Driven Production (CI/CD Pipeline & Observability)"
    },
    "references": [
        {
            "title": "Google 5-Day 全系列課程互動簡報系統 (總覽入口)",
            "url": "Vibe Coding/01.軟體工程/5-Day AI Agents Intensive Vibe Coding Course With Google/index.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-brands fa-google",
            "scenario": "跨領域 AI 代理架構全貌整合",
            "description": "適合工程團隊全面升級為 AI-Native 架構，循序漸進建立企業級 Agentic 工作流。"
        }
    ],
    "children": google_children
}

# 08：Vibe Coding × UML (一)：以 UML 藍圖鎖定架構
unit_08_uml_blueprint = {
    "id": "vibe-uml-blueprint",
    "labNumber": "09",
    "title": "軟體工程：Vibe Coding × UML (一)：以 UML 藍圖鎖定架構，釋放 AI 創意",
    "shortTitle": "Vibe Coding × UML (一)：藍圖架構",
    "category": "軟體工程",
    "subCategory": "UML",
    "date": "2026-10-15",
    "summary": "擺脫「邊想邊改、越改越亂」的泥淖！結合 Vibe Coding 的天馬行空直覺與 UML (Unified Modeling Language) 藍圖的精準邊界控制。透過四步心法工作流（Vibe 狂想 ➔ AI 轉譯 ➔ 人類審查 ➔ 鎖定產碼）與四大核心藍圖（循序圖 Sequence、類別圖 Class、狀態圖 State、活動圖 Activity），在極速開發的同時築起嚴格的架構防火牆。",
    "flowTitle": "Vibe Coding × UML 藍圖四步演化與架構約束閉環",
    "resultTitle": "UML 藍圖鎖定架構互動專題頁面",
    "flowImage": make_svg_diagram(
        "Vibe Coding × UML 藍圖四步架構約束工作流",
        "Vibe Dump -> AI to UML -> Vibe Check -> Lock & Code 嚴密閉環",
        [
            {"num": "UML-1", "title": "Vibe 狂想", "sub": "拋出模糊需求與直覺", "tag": "Vibe Dump"},
            {"num": "UML-2", "title": "AI 轉譯", "sub": "生成標準 Mermaid 藍圖", "tag": "AI to UML"},
            {"num": "UML-3", "title": "直覺審查", "sub": "肉眼速覽時序與依賴", "tag": "Vibe Check"},
            {"num": "UML-4", "title": "鎖定產碼", "sub": "以架構圖嚴格約束產碼", "tag": "Lock & Code"}
        ],
        loop_label="架構圖即防護網：在寫下第一行代碼前，先以視覺化藍圖鎖定模組邊界",
        accent="#8b5cf6"
    ),
    "resultImage": "Vibe Coding/01.軟體工程/01.UML_用 Vibe Coding 釋放創意 以 UML 藍圖 鎖定架構.html",
    "slideUrl": "Vibe Coding/01.軟體工程/01.UML_用 Vibe Coding 釋放創意 以 UML 藍圖 鎖定架構.html",
    "objective": "1. 掌握 Vibe Coding 搭配 UML 藍圖的四步核心心法工作流（Vibe Dump -> AI to UML -> Vibe Check -> Lock & Code）。\n2. 熟練運用四大核心藍圖（循序圖、類別圖、狀態機圖、活動圖）解決工控非同步、狀態切換與邊界依賴問題。\n3. 理解「圖表即約束 (Diagram as Constraint)」概念，徹底杜絕 AI 在無架構約束下的發散幻覺。",
    "tutorialSteps": [
        {
            "step": "心法 1: Vibe Dump (狂放傾倒直覺)",
            "description": "用自然語言、語音或草稿把天馬行空的系統靈感一股腦拋給 AI，不糾結語法細節，聚焦於核心價值與業務痛點。"
        },
        {
            "step": "心法 2: AI to UML (將直覺具象為藍圖)",
            "description": "命令 AI 將自然語言意圖轉化為標準 Mermaid UML 圖表（循序圖、狀態圖、類別圖），將抽象概念視覺化。"
        },
        {
            "step": "心法 3: Vibe Check (視覺化快速審查)",
            "description": "用肉眼審查圖表邏輯：非同步時序對不對？狀態轉換有沒有死節點 (Deadlock)？職責邊界是否過度耦合？"
        },
        {
            "step": "心法 4: Lock & Code (鎖定架構後精準產碼)",
            "description": "將確認後的 UML 藍圖作為 Prompt 硬約束，命令 Agent 嚴格按圖實作，禁止擅自修改對外介面與資料流。"
        }
    ],
    "promptTemplate": "你是一位精通軟體架構與工控系統的資深架構師。\n我想實作一個【Node-RED 邊緣感測器 MQTT 離線緩存與重傳系統】。\n請不要直接寫代碼，請先執行：\n1. 繪製標準 Mermaid 循序圖 (Sequence Diagram)，標明感測器、緩存隊列、MQTT Broker 與雲端的時序互動。\n2. 繪製狀態機圖 (State Diagram)，涵蓋 Online、OfflineBuffering、Flushing、Error 四大狀態轉換。\n3. 標註各節點的超時 (Timeout) 與重試邊界條件。\n待我審閱並確認架構圖後，再請你逐步產出程式碼。",
    "codeSnippet": {
        "language": "mermaid",
        "code": "sequenceDiagram\n    autonumber\n    actor Sensor as 溫濕度感測器\n    participant NodeRED as Node-RED 邊緣節點\n    participant Queue as 本地 SQLite 隊列\n    participant Broker as MQTT Broker (雲端)\n\n    Sensor->>NodeRED: 上報遙測數據 payload\n    NodeRED->>Broker: 發布 MQTT 主題 telemetry\n    alt 連線正常 (ACK 成功)\n        Broker-->>NodeRED: 發布成功回執\n    else 網路斷線或超時\n        NodeRED->>Queue: 寫入本機緩存隊列\n        Note over NodeRED,Queue: 啟動退避重試計時器\n    end"
    },
    "references": [
        {
            "title": "Vibe Coding × UML (一)：以 UML 藍圖鎖定架構 (互動專題頁面)",
            "url": "Vibe Coding/01.軟體工程/01.UML_用 Vibe Coding 釋放創意 以 UML 藍圖 鎖定架構.html"
        },
        {
            "title": "Mermaid 官方圖表語法文檔",
            "url": "https://mermaid.js.org/"
        },
        {
            "title": "軟體工程演進全景圖",
            "url": "Vibe Coding/01.軟體工程/vibe_coding_軟體工程.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-compass-drafting",
            "scenario": "工控複雜非同步通訊與狀態機建模",
            "description": "在設計 PLC 與邊緣節點的多步驟握手協議前，先以循序圖與狀態圖確定超時容錯機制，避免現場運行時出現死結。"
        },
        {
            "icon": "fa-solid fa-shield-cat",
            "scenario": "杜絕 AI 自由發揮導致的專案架構崩壞",
            "description": "透過鎖定類別圖介面契約與資料流向，讓 AI Agent 僅能在給定邊界內填寫核心邏輯，確保模組具備高內聚低耦合。"
        }
    ]
}

# 09：Vibe Coding × UML (二)：14 種圖表全覽與規範 AI 的程式靈魂
unit_09_uml_advanced = {
    "id": "vibe-uml-14-types",
    "labNumber": "10",
    "title": "軟體工程：Vibe Coding × UML (二)：14 種圖表全覽與規範 AI 的程式靈魂",
    "shortTitle": "Vibe Coding × UML (二)：14種圖表全覽",
    "category": "軟體工程",
    "subCategory": "UML",
    "date": "2026-10-15",
    "summary": "進入 UML 2.x 完整的 14 種圖表知識庫！分為結構型圖表 (7種) 與行為型圖表 (7種)，並深入探討類別圖的 6 大核心關聯（泛化、實現、組合、聚合、關聯、依賴）及其程式碼映射。搭配內建的 Vibe Prompt Generator (提示詞生成器)，讓你能根據直覺想法一鍵生成精準的架構圖需求提示詞，將人類直覺與嚴格工程標準完美融合。",
    "flowTitle": "UML 2.x 結構與行為雙維度 14 大圖表全景圖",
    "resultTitle": "UML 14種圖表全覽與提示詞生成器專題頁面",
    "flowImage": make_svg_diagram(
        "UML 2.x 十四種圖表全景矩陣",
        "7 Structural Diagrams (結構靜態) + 7 Behavioral Diagrams (行為動態)",
        [
            {"num": "STR", "title": "結構靜態 (7種)", "sub": "Class, Component, Deployment...", "tag": "Structure"},
            {"num": "REL", "title": "六大類別關聯", "sub": "泛化、實現、組合、聚合、關聯、依賴", "tag": "Relations"},
            {"num": "BEH", "title": "行為動態 (7種)", "sub": "Sequence, State, Activity, UseCase...", "tag": "Behavior"},
            {"num": "GEN", "title": "提示詞生成器", "sub": "直覺選型一鍵產出 UML 規範 Prompt", "tag": "Prompt Gen"}
        ],
        loop_label="雙維度全面掌控：以結構圖定靜態邊界，以行為圖定動態時序，規範 AI 的程式靈魂",
        accent="#ec4899"
    ),
    "resultImage": "Vibe Coding/01.軟體工程/02.UML_用 Vibe 思考直覺，用 UML 規範 AI 的程式靈魂.html",
    "slideUrl": "Vibe Coding/01.軟體工程/02.UML_用 Vibe 思考直覺，用 UML 規範 AI 的程式靈魂.html",
    "objective": "1. 全面掌握 UML 2.x 標準體系的 14 種圖表（7 種結構靜態圖表 + 7 種行為動態圖表）的分類與適用場景。\n2. 徹底搞懂類別圖的 6 大關聯（Generalization、Realization、Composition、Aggregation、Association、Dependency）與現代語言程式碼映射。\n3. 學會使用 Vibe Prompt Generator 快速組合架構提示詞，引導 AI 代理輸出標準 Mermaid/PlantUML 設計圖。",
    "tutorialSteps": [
        {
            "step": "維度 1: 結構型圖表 (Structural) 7 兄弟",
            "description": "掌握類別圖 (Class)、元件圖 (Component)、部署圖 (Deployment)、物件圖 (Object)、套件圖 (Package)、組合結構圖 (Composite Structure) 與剖面圖 (Profile) 的靜態邊界約束。"
        },
        {
            "step": "維度 2: 行為型圖表 (Behavioral) 7 姐妹",
            "description": "掌握循序圖 (Sequence)、活動圖 (Activity)、狀態機圖 (State Machine)、使用案例圖 (Use Case)、通訊圖 (Communication)、互動概觀圖 (Interaction Overview) 與時間圖 (Timing) 的動態時序。"
        },
        {
            "step": "核心解析: 類別圖 6 大核心關聯與強度梯隊",
            "description": "深入理解依賴關係由弱到強：依賴 (Dependency -..>) ➔ 關聯 (Association -->) ➔ 聚合 (Aggregation o--) ➔ 組合 (Composition *--) ➔ 實現 (Realization ..|>) ➔ 泛化繼承 (Generalization --|>)。"
        },
        {
            "step": "實戰工具: Vibe Prompt Generator 實戰",
            "description": "利用頁面內建生成器，選定系統類型、關注維度與目標圖表，一鍵產出高精度 Prompt，要求 AI 輸出嚴謹的 Mermaid 規格。"
        }
    ],
    "promptTemplate": "你是一位嚴謹的系統架構專家。請為一套【工控邊緣微服務閘道器】設計軟體架構：\n1. 請產出元件圖 (Component Diagram) 與部署圖 (Deployment Diagram)，標記 Docker 容器劃分與硬體介面 (RS485/Ethernet)。\n2. 針對核心數據處理層，產出標準類別圖 (Class Diagram)，嚴格區分「組合 (Composition - 生命週期同生共死)」與「聚合 (Aggregation - 生命週期獨立)」。\n3. 以 Mermaid 語法輸出，並在每個類別標註屬性型別、可見性符號 (+, -, #) 與依賴關係。",
    "codeSnippet": {
        "language": "mermaid",
        "code": "classDiagram\n    class EdgeGateway {\n        -String gatewayId\n        -String firmwareVer\n        +startService() void\n        +stopService() void\n    }\n    class WatchdogService {\n        -int intervalSec\n        +kick() void\n    }\n    class SensorInterface {\n        <<interface>>\n        +readTelemetry() TelemetryData\n    }\n    class ModbusSensor {\n        -int slaveId\n        +readTelemetry() TelemetryData\n    }\n\n    EdgeGateway *-- WatchdogService : 組合 (生命週期同生共死)\n    EdgeGateway o-- SensorInterface : 聚合 (可動態抽換感測器)\n    SensorInterface <|.. ModbusSensor : 實現介面"
    },
    "references": [
        {
            "title": "Vibe Coding × UML (二)：14 種圖表全覽與規範 AI (互動專題頁面)",
            "url": "Vibe Coding/01.軟體工程/02.UML_用 Vibe 思考直覺，用 UML 規範 AI 的程式靈魂.html"
        },
        {
            "title": "Vibe Coding × UML (一)：以 UML 藍圖鎖定架構",
            "url": "Vibe Coding/01.軟體工程/01.UML_用 Vibe Coding 釋放創意 以 UML 藍圖 鎖定架構.html"
        },
        {
            "title": "OMG UML 2.5.1 官方規範標準",
            "url": "https://www.omg.org/spec/UML/"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-sitemap",
            "scenario": "複雜工控系統全域架構選型與邊界劃分",
            "description": "根據不同的業務痛點（時序衝突選 Sequence、生命週期管理選 Class/Composition、狀態遷移選 State），精準選用最適 UML 圖表。"
        },
        {
            "icon": "fa-solid fa-wand-magic-sparkles",
            "scenario": "快速生成標準化 AI 架構提示詞 (Prompt)",
            "description": "透過結構化的 UML 選型提示詞生成器，讓團隊初級工程師也能秒級產出媲美架構師級別的精準設計藍圖。"
        }
    ]
}

# 10：OpenSpec (opsx) 指南：AI 規格驅動開發
unit_10_openspec = {
    "id": "vibe-openspec",
    "labNumber": "11",
    "title": "OpenSpec (opsx)：AI 規格驅動開發 (Spec-Driven Development) 指南",
    "shortTitle": "OpenSpec 規格驅動開發",
    "category": "Skills(技能)",
    "date": "2026-10-14",
    "summary": "OpenSpec (@opsx) 是一套專為 AI 輔助編程設計的規格工作流框架。透過標準化的五個階段指令（explore 盤點、propose 規格提案、apply 任務實作、verify 對照驗收、archive 交付封存），把模糊需求轉化為結構化規格與可追蹤任務，從此終結 AI 幻覺與程式碼失控。",
    "flowTitle": "OpenSpec 五階段生命週期閉環工作流",
    "resultTitle": "OpenSpec 指南互動式教學頁面",
    "flowImage": make_svg_diagram(
        "OpenSpec 五階段規格驅動開發架構",
        "Explore -> Propose -> Apply -> Verify -> Archive 閉環工程",
        [
            {"num": "01", "title": "探索盤點", "sub": "/opsx:explore 理解既有架構", "tag": "Explore"},
            {"num": "02", "title": "規格提案", "sub": "/opsx:propose 撰寫 spec 與 tasks", "tag": "Propose"},
            {"num": "03", "title": "循序實作", "sub": "/opsx:apply 依照任務安全產碼", "tag": "Apply"},
            {"num": "04", "title": "對照驗收", "sub": "/opsx:verify 嚴格比對規格標準", "tag": "Verify"},
            {"num": "05", "title": "版本封存", "sub": "/opsx:archive 變更歸檔完成交付", "tag": "Archive"}
        ],
        loop_label="規格即契約 (Spec as Contract)：透過結構化 Markdown 任務鏈約束 AI Agent 行為",
        accent="#0ea5e9"
    ),
    "resultImage": "Vibe Coding/02.Skills(技能)/01.openspec.html",
    "slideUrl": "Vibe Coding/02.Skills(技能)/01.openspec.html",
    "objective": "1. 掌握 OpenSpec (@opsx) 的五大核心指令流程與規格驅動開發 (Spec-Driven Development) 心法。\n2. 理解 .openspec/ 工件結構 (proposal.md, spec.md, tasks.md) 如何作為 AI Agent 的單一真相來源。\n3. 學會在 Node-RED 與工控 AI 開發中運用 OpenSpec 進行需求收斂與零幻覺精準實作。",
    "tutorialSteps": [
        {
            "step": "步驟 1: 快速安裝與初始化 (CLI Setup)",
            "description": "透過 npm 全域安裝 @fission-ai/openspec@latest，並在專案根目錄執行 openspec init，建立標準化 .openspec/ 規格目錄結構與 AI Agent 協調規則。"
        },
        {
            "step": "步驟 2: 第一階段 /opsx:explore (盤點問題與理解代碼庫)",
            "description": "在動手修改代碼前，引導 AI 深入探索現有程式碼結構、相依性與既有約束，避免空中樓閣式的猜測改動。"
        },
        {
            "step": "步驟 3: 第二階段 /opsx:propose (產出規格與任務拆解)",
            "description": "明確規劃 proposal.md (業務背景)、spec.md (技術契約與驗收條件) 與 tasks.md (具體待辦清單)，將目標拆解為可驗收的獨立原子步驟。"
        },
        {
            "step": "步驟 4: 第三階段 /opsx:apply (依照規格實作任務)",
            "description": "督促 AI 專注逐一完成 tasks.md 待辦事項，每次僅改動必要模組並進行自動測試，杜絕大規模一次性代碼覆寫導致系統崩潰。"
        },
        {
            "step": "步驟 5: 第四與五階段 /opsx:verify & /opsx:archive (對照驗收與封存)",
            "description": "依據 spec.md 的 Acceptance Criteria 逐條檢查成果，確認無誤後將規格歸檔至歷史庫完成生產交付。"
        }
    ],
    "promptTemplate": "你是一位專精於 Spec-Driven Development 的 OpenSpec 架構師。\n請針對我手上的 Node-RED 工控通訊與儀表板專案，啟動 /opsx:propose 流程：\n1. 深度掃描當前 Flow 架構與 Modbus/MQTT 數據流。\n2. 產出包含明確 Acceptance Criteria (驗收標準) 的 spec.md。\n3. 產出 3 至 5 個可獨立驗證的 tasks.md 實施步驟清單。\n在我們完成規格確認前，請勿直接生成大篇幅代碼。",
    "codeSnippet": {
        "language": "markdown",
        "code": "# .openspec/proposals/modbus-telemetry/spec.md\n# Feature Spec: Modbus 異常自動告警節點\n\n## 1. 意圖與目標 (Intent)\n當機電 PLC Modbus 保持暫存器 (Hold Register) 數據超過上限閾值時，即時發布告警並寫入日誌。\n\n## 2. 契約規範 (Interface & Contract)\n- 輸入 msg.payload: `{ \"deviceId\": string, \"address\": number, \"value\": number }`\n- 輸出 msg.payload: `{ \"alert\": boolean, \"severity\": \"HIGH\" | \"LOW\", \"timestamp\": number }`\n\n## 3. 驗收標準 (Acceptance Criteria)\n- [ ] 當數值 > 85.0 時，觸發 HIGH 級別告警，延遲 < 50ms\n- [ ] 模擬斷線時能自愈重試 3 次，失敗後記錄 error 日誌"
    },
    "references": [
        {
            "title": "OpenSpec (opsx) 指南 (專屬互動頁面)",
            "url": "Vibe Coding/02.Skills(技能)/01.openspec.html"
        },
        {
            "title": "OpenSpec 官方網站 (openspec.dev)",
            "url": "https://openspec.dev/"
        },
        {
            "title": "OpenSpec GitHub 開源倉庫",
            "url": "https://github.com/Fission-AI/OpenSpec"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-list-check",
            "scenario": "杜絕 AI 幻覺與破壞式改動",
            "description": "在讓 Agent 編寫關鍵工控與通訊邏輯前，先透過規格契約 (Spec) 鎖定邊界，防止代碼被無故洗掉或架構失控。"
        },
        {
            "icon": "fa-solid fa-code-pull-request",
            "scenario": "團隊非同步協同與 Pull Request 審查",
            "description": "利用結構化 Markdown 規格作為 PR 審核基礎，讓工程同仁與管理層能秒速理解 Agent 的變更意圖與驗收結果。"
        }
    ]
}

# 11：OpenSpec SDD 軟體開發生命週期指南：5大核心指令與檔案生成全解析
unit_11_opsx_guide = {
    "id": "vibe-opsx-lifecycle",
    "labNumber": "12",
    "title": "OpenSpec SDD 軟體開發生命週期指南：5大核心指令與檔案生成全解析",
    "shortTitle": "OpenSpec 生命週期與檔案全解析",
    "category": "Skills(技能)",
    "date": "2026-10-14",
    "summary": "從「盤點問題」到「封存交付」，深度解構 OpenSpec 規格驅動開發 (Spec-Driven Development, SDD) 的五大核心指令（explore, propose, apply, verify, archive）執行過程。全方位剖析從臨時 scratchpad.md、變更包 4 大工件 (proposal, design, delta specs, tasks)，到代碼落地、walkthrough 驗證，最終晉升主規格庫 (openspec/specs/) 與歷史封存的檔案生命週期演化狀態機。",
    "flowTitle": "OpenSpec 檔案演化狀態機與五階段生命週期工件流向",
    "resultTitle": "OpenSpec 生命週期指南互動解析頁面",
    "flowImage": make_svg_diagram(
        "OpenSpec SDD 檔案生成生命週期狀態機",
        "Artifact Evolution: scratchpad -> change proposal -> source code -> main specs & archive",
        [
            {"num": "F-01", "title": "探索備忘", "sub": "scratchpad.md 釐清邊界", "tag": "Explore"},
            {"num": "F-02", "title": "變更包工件", "sub": "proposal, design, tasks", "tag": "Propose"},
            {"num": "F-03", "title": "代碼與進度", "sub": "源碼落地 & tasks 打勾", "tag": "Apply"},
            {"num": "F-04", "title": "驗證合規", "sub": "validate & walkthrough", "tag": "Verify"},
            {"num": "F-05", "title": "主幹與封存", "sub": "openspec/specs/ 合流", "tag": "Archive"}
        ],
        loop_label="單一真相來源 (Single Source of Truth)：增量規範安全合流至全域主規格庫",
        accent="#6366f1"
    ),
    "resultImage": "Vibe Coding/02.Skills(技能)/02.opsx-guide.html",
    "slideUrl": "Vibe Coding/02.Skills(技能)/02.opsx-guide.html",
    "objective": "1. 深入掌握 OpenSpec 在 5 大階段中各檔案（.openspec.yaml, proposal.md, design.md, specs/*.md, tasks.md, walkthrough.md）的生成時機與演變歷程。\n2. 理解 Delta Specs 增量規範與 openspec/specs/ 主規格目錄的合併同步機制。\n3. 學會透過 openspec validate 與 openspec status 實現生產級自動化驗收與交付封存。",
    "tutorialSteps": [
        {
            "step": "步驟 1: 階段 1 (/opsx:explore) 探索模式與臨時備忘",
            "description": "在動手寫代碼或規格前先徹底想清楚，釐清 Why、變更範圍 Scope 與潛在架構盲點，產出探索記錄 scratchpad.md 作為後續提案的直接輸入原料。"
        },
        {
            "step": "步驟 2: 階段 2 (/opsx:propose) 規格先行與 4 大標準工件產出",
            "description": "執行 openspec new change <name>，自動建立 proposal.md (計畫書)、design.md (技術設計)、specs/*.md (模組增量規格) 與 tasks.md (原子化任務清單)。"
        },
        {
            "step": "步驟 3: 階段 3 (/opsx:apply) 按圖施工與源碼落地",
            "description": "以 tasks.md 為導航，依序編寫 HTML、CSS、JS 與後端代碼。每完成一項原子任務即時在 tasks.md 標記為完成 (- [x])，進度透明且支援隨時中斷重啟。"
        },
        {
            "step": "步驟 4: 階段 4 (/opsx:verify) 規格符合度驗證與品質把關",
            "description": "執行 openspec validate <name> 確保 OpenSpec 格式合法，確認 tasks.md 達到 100% 完工 (state: all_done)，執行語法測試並產出 walkthrough.md 驗收報告。"
        },
        {
            "step": "步驟 5: 階段 5 (/opsx:archive) 主幹合流與歷史封存",
            "description": "執行 openspec archive --yes <name>，自動將提案中的 Delta Specs 萃取並合併至全域主規格目錄 openspec/specs/，並將提案搬遷至 archive/ 封存歸檔。"
        }
    ],
    "promptTemplate": "你是一位精通 OpenSpec SDD 規範的主任架構師。\n請針對手上的 Node-RED 工控邊緣採集模組，執行完整 OpenSpec 生命週期演繹：\n1. 請模擬 /opsx:propose 階段，輸出標準變更包目錄結構與 proposal.md 關鍵要素。\n2. 請示範 tasks.md 如何以原子化編號 (如 1.1, 1.2, 2.1) 定義可驗證任務。\n3. 解釋在 /opsx:archive 執行後，Delta Specs 如何安全合流進 openspec/specs/。",
    "codeSnippet": {
        "language": "yaml",
        "code": "# openspec/changes/nodered-telemetry/.openspec.yaml\nschema: spec-driven-development/v1\nchange: nodered-telemetry\nstatus: ready_for_apply\nartifacts:\n  proposal: proposal.md\n  design: design.md\n  specs:\n    - specs/mqtt/spec.md\n    - specs/modbus/spec.md\n  tasks: tasks.md"
    },
    "references": [
        {
            "title": "OpenSpec 生命週期指南 (專屬互動全解析頁面)",
            "url": "Vibe Coding/02.Skills(技能)/02.opsx-guide.html"
        },
        {
            "title": "OpenSpec (opsx) 指南與快速起手教學",
            "url": "Vibe Coding/02.Skills(技能)/01.openspec.html"
        },
        {
            "title": "OpenSpec 官方文檔 (openspec.dev)",
            "url": "https://openspec.dev/"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-code-compare",
            "scenario": "大型專案變更全生命週期稽核",
            "description": "所有代碼改動皆具備完整的 proposal -> specs -> tasks -> walkthrough -> archive 鏈條，完全符合嚴苛工業軟體審計標準。"
        },
        {
            "icon": "fa-solid fa-folder-tree",
            "scenario": "長期演進專案的單一事實來源",
            "description": "透過主規格庫 openspec/specs/ 的持續合流累積，專案永久具備最新、最精確的系統全貌架構規格。"
        }
    ]
}

# 12：Superpowers 軟體工程 Agent 工作流規範
unit_12_superpowers = {
    "id": "vibe-superpowers",
    "labNumber": "13",
    "title": "Superpowers 軟體工程 Agent 工作流規範：14 大核心 Skills 與 TDD 實戰指南",
    "shortTitle": "Superpowers Agent 工作流規範",
    "category": "Skills(技能)",
    "date": "2026-10-15",
    "summary": "將混亂的 Vibe Coding 昇華為可預測、可驗證的現代軟體工程！Superpowers (中文版) 是專為 AI 程式代理 (如 Claude Code、Cursor、Windsurf) 打造的技能方法論。以四大必備指令 (brainstorming, writing-plans, executing-plans, test-driven-development)、14 大核心技能索引、五階段管線與 Antigravity 重力約束理念，徹底杜絕 AI 幻覺與假綠燈。",
    "flowTitle": "Superpowers 軟體工程五階段閉環管線與 TDD 隔離架構",
    "resultTitle": "Superpowers 繁中互動教學手冊",
    "flowImage": make_svg_diagram(
        "Superpowers 軟體工程 Agent 五階段標準管線",
        "Brainstorming -> Micro Plans -> TDD Worktree -> Subagent Review -> PR Release",
        [
            {"num": "SP-01", "title": "頭腦風暴", "sub": "specs/*.spec.md 規格收斂", "tag": "Brainstorm"},
            {"num": "SP-02", "title": "微步計畫", "sub": "plans/*.plan.md <=15m 拆解", "tag": "Plan"},
            {"num": "SP-03", "title": "TDD 隔離", "sub": "Red-Green-Refactor 循環", "tag": "TDD"},
            {"num": "SP-04", "title": "獨立審查", "sub": ".review/ 專屬 Reviewer 代理", "tag": "Review"},
            {"num": "SP-05", "title": "實證收尾", "sub": "終端無報錯驗收合流", "tag": "Release"}
        ],
        loop_label="Antigravity 約束哲學：以 TDD、Git 隔離與證據先行杜絕 AI 樂觀跳步與假綠燈",
        accent="#3b82f6"
    ),
    "resultImage": "Vibe Coding/02.Skills(技能)/03.superpowers.html",
    "slideUrl": "Vibe Coding/02.Skills(技能)/03.superpowers.html",
    "objective": "1. 掌握 Superpowers 四大核心指令（brainstorming, writing-plans, executing-plans, test-driven-development）的操作規範。\n2. 熟練運用 14 大核心 Skills 索引庫進行需求拆解、Git Worktree 隔離、子代理審查與除錯。\n3. 理解 Antigravity 核心理念：以嚴格測試證據與架構重力約束替代盲目放任的 Vibe Coding。",
    "tutorialSteps": [
        {
            "step": "步驟 1: 快速安裝與載入 (Quickstart)",
            "description": "使用 npx superpowers-zh 快速安裝，或在 Claude Code 中以 /superpowers using-superpowers 載入元技能規範。"
        },
        {
            "step": "步驟 2: 第一階段需求風暴 (brainstorming)",
            "description": "一次只聚焦一個關鍵決策，深入探討架構取捨與邊界條件，產出結構化規格書 specs/*.spec.md。"
        },
        {
            "step": "步驟 3: 第二階段微步拆解 (writing-plans)",
            "description": "將規格分解為小於 15 分鐘的微任務清單，標註確切驗證命令與勾選單，產出 plans/*.plan.md。"
        },
        {
            "step": "步驟 4: 第三階段 TDD 隔離實作 (test-driven-development)",
            "description": "在獨立 Git Worktree 中嚴格執行 Red ➔ Green ➔ Refactor 循環，代碼未跑過真實測試前不得提交代碼。"
        },
        {
            "step": "步驟 5: 第四與五階段獨立審查與合流 (Review & Release)",
            "description": "派遣獨立 Reviewer Agent 審查架構與反饋，終端實測無報錯後合併分支並清理暫存 Worktree 完成發布。"
        }
    ],
    "promptTemplate": "你是一位具備 Superpowers 嚴謹工程紀律的資深軟體工程師。\n請針對當前 Node-RED 工控邊緣採集與 Modbus 通訊功能，啟動四大必備指令流程：\n1. 執行 brainstorming：一次只問一個關鍵問題，釐清通訊逾時與錯誤重連機制。\n2. 撰寫 specs/*.spec.md 與拆解至 <=15 分鐘微任務的 plans/*.plan.md。\n3. 依據 test-driven-development 原則，先寫失敗測試再寫實作。\n未經明確測試驗證通過前，請勿直接宣稱完成。",
    "codeSnippet": {
        "language": "bash",
        "code": "# 快速安裝並啟動 Superpowers 中文技能庫\n$ npx superpowers-zh\n\n# 於 Agent (如 Claude Code) 中啟動四大核心工作流\n/superpowers brainstorming\n/superpowers writing-plans\n/superpowers executing-plans\n/superpowers test-driven-development"
    },
    "references": [
        {
            "title": "Superpowers 中文教學指南 (專屬互動全手冊)",
            "url": "Vibe Coding/02.Skills(技能)/03.superpowers.html"
        },
        {
            "title": "Superpowers-zh GitHub 開源倉庫",
            "url": "https://github.com/jnMetaCode/superpowers-zh"
        },
        {
            "title": "OpenSpec SDD 生命週期全解析",
            "url": "Vibe Coding/02.Skills(技能)/02.opsx-guide.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-flask-vial",
            "scenario": "關鍵工控模組 TDD 防禦式開發",
            "description": "在 Modbus/MQTT 與硬體交互邏輯中，先撰寫模擬測試案例，杜絕生成代碼在現場產線運作時引發硬體停機損壞。"
        },
        {
            "icon": "fa-solid fa-code-fork",
            "scenario": "多代理安全並行與 Git 隔離作業",
            "description": "利用 Git Worktree 與獨立審查代理，讓多個 Coding Agent 互不干擾並行開發，保證主幹隨時處於可發布狀態。"
        }
    ]
}

# 13：傳統逆向工程與核心工具解析
unit_13_reverse_engineering = {
    "id": "vibe-reverse-engineering-traditional",
    "labNumber": "14",
    "title": "傳統逆向工程與核心工具解析：Detect It Easy、IDA Pro 與 Ghidra 實戰指南",
    "shortTitle": "傳統逆向工具 (DIE/IDA/Ghidra)",
    "category": "其他",
    "subCategory": "逆向工程",
    "date": "2026-10-15",
    "summary": "在無原始碼的前提下，如何從十六進位位元組流（Hex Dump）與組合語言中，精準重構資料結構、程式邏輯與演算法？全方位剖析 Native 原生代碼 (C/C++/Go/PE/ELF) 逆向範式、靜態與動態分析雙支柱，以及資安與韌體工程必備三大神器：DIE (預檢偵察與熵值分析)、IDA Pro (Hex-Rays 反編譯之巔) 與 Ghidra (NSA 開源協同逆向框架)。",
    "flowTitle": "傳統二進位逆向工程四步流水線與分析管線",
    "resultTitle": "傳統逆向工程互動知識庫頁面",
    "flowImage": make_svg_diagram(
        "傳統二進位逆向工程標準四步流水線",
        "Detect It Easy -> IDA/Ghidra Loading -> Type & Logic Recovery -> Dynamic Debug",
        [
            {"num": "RE-1", "title": "預檢情報", "sub": "DIE 判定編譯鏈與加殼", "tag": "Triage"},
            {"num": "RE-2", "title": "靜態載入", "sub": "定位 EntryPoint 與字串", "tag": "Static"},
            {"num": "RE-3", "title": "邏輯重構", "sub": "F5 虛擬碼與型別還原", "tag": "Decompile"},
            {"num": "RE-4", "title": "動態驗證", "sub": "x64dbg / 記憶體脫殼", "tag": "Dynamic"}
        ],
        loop_label="靜態與動態雙向驗證：從混亂二進位機器碼精確還原高階軟體架構",
        accent="#06b6d4"
    ),
    "resultImage": "Vibe Coding/03.其他/逆向工程/01.傳統逆向工程.html",
    "slideUrl": "Vibe Coding/03.其他/逆向工程/01.傳統逆向工程.html",
    "objective": "1. 深刻理解 Native Code (原生機器碼) 與 Managed Code (受管位元組碼) 的逆向本質差異。\n2. 熟練掌握 Detect It Easy (DIE) 的編譯器識別、加殼檢測與熵值 (Entropy) 掃描技術。\n3. 熟悉 IDA Pro 與 Ghidra 的反編譯原理、控制流圖 (CFG)、交叉引用 (Xrefs) 與動態除錯流水線。",
    "tutorialSteps": [
        {
            "step": "步驟 1: 預檢情報 (Triage with DIE)",
            "description": "使用 Detect It Easy 快速掃描未知檔案，判定檔案架構 (PE/ELF/Mach-O)、編譯器鏈 (MSVC/GCC/Go) 與區段熵值，識別是否加殼 (UPX/VMProtect)。"
        },
        {
            "step": "步驟 2: 靜態載入與關鍵定位 (Static Analysis)",
            "description": "載入 IDA Pro 或 Ghidra，利用 FLIRT 庫過濾標準函數，藉由交叉引用 (Xrefs) 與字串常數 (Strings) 鎖定關鍵業務邏輯入口。"
        },
        {
            "step": "步驟 3: 邏輯與型別還原 (Decompilation & Type Propagation)",
            "description": "透過 Hex-Rays / Ghidra 反編譯引擎生成結構化虛擬 C 代碼，重塑結構體 (Struct)、指針型別與呼叫慣例。"
        },
        {
            "step": "步驟 4: 動態除錯與記憶體脫殼 (Dynamic Debugging)",
            "description": "配合 x64dbg 或 GDB 設定硬體斷點，即時監控暫存器與呼叫堆疊，繞過反除錯保護並抓取運行時解密金鑰。"
        }
    ],
    "promptTemplate": "你是一位具備頂尖逆向工程與漏洞挖掘能力的二進位資安專家。\n請針對一個由 C/C++ 編寫的工控通訊 DLL 模組（無除錯符號、已 Stripped）：\n1. 請規劃使用 Detect It Easy (DIE) 進行預檢的重點項目（包含熵值與加殼判斷）。\n2. 請說明在 Ghidra / IDA Pro 中如何運用交叉引用 (Xrefs) 與型別推斷重構 Modbus 封包解析函數。\n3. 若發現疑似反除錯 (Anti-Debugging) 機制，請給出動態除錯 (x64dbg) 繞過方案。",
    "codeSnippet": {
        "language": "c",
        "code": "// 反編譯 C 虛擬碼對照範例 (IDA / Ghidra Decompiler View)\n__int64 __fastcall check_serial_key(const char *license_input)\n{\n  int len; // [rsp+4h] [rbp-1Ch]\n  int i;   // [rsp+8h] [rbp-18h]\n\n  len = strlen(license_input);\n  if ( len != 16 )\n    return 0LL; // 授權金鑰長度不符\n  for ( i = 0; i < len; ++i )\n  {\n    if ( (license_input[i] ^ 0x5A) != expected_bytes[i] )\n      return 0LL; // 混淆校驗失敗\n  }\n  return 1LL; // 通過硬體驗證\n}"
    },
    "references": [
        {
            "title": "傳統逆向工程與核心工具解析 (專屬互動全解析頁面)",
            "url": "Vibe Coding/03.其他/逆向工程/01.傳統逆向工程.html"
        },
        {
            "title": "IDA Pro 官方技術文檔 (Hex-Rays)",
            "url": "https://hex-rays.com/ida-pro/"
        },
        {
            "title": "Ghidra 官方網站 (NSA Open Source)",
            "url": "https://ghidra-sre.org/"
        },
        {
            "title": "Detect It Easy (DIE) GitHub 倉庫",
            "url": "https://github.com/horsicq/Detect-It-Easy"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-shield-virus",
            "scenario": "工控固件惡意程式分析與韌體安全審計",
            "description": "在缺少源碼的情況下，深入分析 PLC 與邊緣閘道器中運行的二進位檔案，揪出未授權後門與緩衝區溢位漏洞。"
        },
        {
            "icon": "fa-solid fa-microchip",
            "scenario": "遺留閉源驅動與通訊協定逆向還原",
            "description": "針對停產或無技術支援之工控儀表通訊模組，透過逆向二進位 DLL/SO 精準還原私人 Modbus/CAN 封包通訊協議。"
        }
    ]
}

# 14：REA (Reverse Engineer Anything)
unit_14_rea = {
    "id": "vibe-reverse-engineering-rea",
    "labNumber": "15",
    "title": "REA (Reverse Engineer Anything)：AI 智能體逆向工程協議與實戰指南",
    "shortTitle": "REA AI 智能體逆向工程",
    "category": "其他",
    "subCategory": "逆向工程",
    "date": "2026-10-15",
    "summary": "讓 AI Agent 具備資深安全分析師的二進位取證與 Clean-room 乾淨重構能力！深度剖析 REA (Reverse Engineer Anything) 框架與 Model Context Protocol (MCP) 架構。串聯 Claude Code、Cursor、Gemini CLI 等大模型，支援 Electron/ASAR 解包、Windows PE / Linux ELF 原生代碼反編譯、Android APK、iOS Mach-O 與韌體提取，以客觀證據鏈終結猜測，完成高品質架構復原。",
    "flowTitle": "REA AI 代理逆向調查與 Clean-Room 乾淨重構流水線",
    "resultTitle": "REA 實戰教學指南與指令庫互動頁面",
    "flowImage": make_svg_diagram(
        "REA (Reverse Engineer Anything) 智能體逆向工作流",
        "Intent -> MCP Dispatch -> Artifact Evidence -> Clean-Room Reconstruction",
        [
            {"num": "REA-1", "title": "自然語言意圖", "sub": "Agent 接收逆向目標", "tag": "Intent"},
            {"num": "REA-2", "title": "MCP 協議調度", "sub": "分派 REA 本機分析器", "tag": "MCP Dispatch"},
            {"num": "REA-3", "title": "結構化取證", "sub": "CFG / AST / 符號提取", "tag": "Evidence"},
            {"num": "REA-4", "title": "乾淨重構", "sub": "Clean-room 代碼與單元測試", "tag": "Reconstruct"}
        ],
        loop_label="證據導向 (Evidence-Led)：以確鑿符號鏈與虛擬碼約束 AI 重構，杜絕幻覺捏造",
        accent="#14b8a6"
    ),
    "resultImage": "Vibe Coding/03.其他/逆向工程/02.REA Reverse Engineer Anything.html",
    "slideUrl": "Vibe Coding/03.其他/逆向工程/02.REA Reverse Engineer Anything.html",
    "objective": "1. 掌握 REA (Reverse Engineer Anything) 框架與 Model Context Protocol (MCP) 的整合配置與運行機制。\n2. 熟悉 REA 針對 JavaScript/Electron、原生二進位 (PE/ELF/Mach-O)、Android APK 與韌體的取證覆蓋矩陣。\n3. 學會透過提示詞生成器驅動 AI Agent 進行 Clean-room 乾淨重構並建立自動化驗收測試。",
    "tutorialSteps": [
        {
            "step": "步驟 1: 快速安裝與 MCP 智能體註冊 (Quickstart)",
            "description": "執行 npx rea-agents setup 自動識別本機 Claude Code、Cursor 或 Gemini CLI 並掛載 REA MCP Server。"
        },
        {
            "step": "步驟 2: 自然語言引導與意圖發起 (Intent Definition)",
            "description": "向 Agent 明確下達逆向目標（如提取通訊協議、分析 Electron IPC 通道或定位加解密邏輯）。"
        },
        {
            "step": "步驟 3: 後端引擎自動調用與結構化取證 (Evidence Collection)",
            "description": "Agent 透過 MCP 自動調用 Ghidra、Hopper 或內建 AST 分析器，擷取偽代碼、字串與交叉引用 (Xrefs)。"
        },
        {
            "step": "步驟 4: Clean-Room 乾淨重構與對比測試 (Reconstruction & Verification)",
            "description": "依據回傳的客觀證據鏈，在目標專案中撰寫具備完整單元測試的原創代碼，完成安全落地。"
        }
    ],
    "promptTemplate": "你是一位具備 REA 工具協議授權的二進位逆向架構師。\n請針對本機路徑下的工控通訊模組（包含 Windows DLL 與 Node.js 原生外掛）：\n1. 調用 REA MCP 工具檢查導出符號表與 Modbus 通訊處理函數入口。\n2. 提取關鍵狀態機變數與暫存器定址計算邏輯，列出確鑿代碼證據。\n3. 依據 Clean-Room 原則，在 Node-RED 專案中乾淨重構一份純 TypeScript 實現並附帶單元測試。",
    "codeSnippet": {
        "language": "json",
        "code": "{\n  \"mcpServers\": {\n    \"rea\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"rea-agents@latest\", \"serve\"],\n      \"env\": {\n        \"REA_ANALYSIS_WORKSPACE\": \"./.rea_cache\"\n      }\n    }\n  }\n}"
    },
    "references": [
        {
            "title": "REA 實戰教學指南與指令庫 (專屬互動手冊)",
            "url": "Vibe Coding/03.其他/逆向工程/02.REA Reverse Engineer Anything.html"
        },
        {
            "title": "REA GitHub 開源倉庫",
            "url": "https://github.com/morluto/rea"
        },
        {
            "title": "傳統逆向工程與核心工具解析 (DIE / IDA / Ghidra)",
            "url": "Vibe Coding/03.其他/逆向工程/01.傳統逆向工程.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-atom",
            "scenario": "閉源工控通訊協定 Clean-Room 乾淨重構",
            "description": "在完全沒有原始碼的情況下，透過 REA 自動取證與重構協議封包格式，產出完全相容且無版權爭議之開源 Node-RED 驅動。"
        },
        {
            "icon": "fa-solid fa-network-wired",
            "scenario": "跨平台 Electron / 原生混編架構漏洞排查",
            "description": "AI 代理直接經由 REA 穿透 ASAR 打包與原生 C++ Node-API，秒級定位 IPC 通道越權與記憶體洩漏隱患。"
        }
    ]
}

# 15：AI Coding 新時代的團隊開發：實戰教學指南
unit_15_team_dev_guide = {
    "id": "vibe-team-dev-guide",
    "labNumber": "16",
    "title": "AI Coding 新時代的團隊開發：從個人用 AI 到 AI-Native 組織 (實戰教學指南)",
    "shortTitle": "AI Coding 團隊開發實戰教學指南",
    "category": "其他",
    "subCategory": "AI Coding 新時代的團隊開發",
    "date": "2026-10-15",
    "summary": "改編自陳宜昌 (YC / Nova AI 創辦人) 於 HWDC 2026 的演講精粹。深入解構 AI Coding 三大進階層次：Level 1 個人 AI 賦能、Level 2 Agentic Workflow 協同、Level 3 AI-Native 組織重構。深入探討組織三大黃金法則：徹底劃分「人組成決策團隊、Agent 組成執行團隊」、原型期「三大關卡」防線，以及為什麼「Spec 是鷹架不是藍圖」！內建互動式架構模擬器。",
    "flowTitle": "AI Coding 三大進階維度與決策/執行團隊切分流水線",
    "resultTitle": "AI Coding 團隊開發實戰教學與架構模擬器",
    "flowImage": make_svg_diagram(
        "AI Coding 團隊開發三層次演進架構",
        "Level 1 個人賦能 -> Level 2 代理協同 -> Level 3 AI-Native 組織重構",
        [
            {"num": "L-1", "title": "個人賦能", "sub": "Copilot 輔助代碼生成", "tag": "Level 1"},
            {"num": "L-2", "title": "代理協同", "sub": "Agent 執行實作與測試", "tag": "Level 2"},
            {"num": "L-3", "title": "AI-Native", "sub": "人做決策、Agent 執行", "tag": "Level 3"},
            {"num": "SPEC", "title": "鷹架理論", "sub": "Spec 是鷹架而非死藍圖", "tag": "Scaffold"},
            {"num": "GATES", "title": "三大關卡", "sub": "架構守衛、測試驗證、品質把關", "tag": "Gates"}
        ],
        loop_label="決策與執行徹底解耦：人類專注架構選型與探索，AI Agent 負責實作、測試與除錯閉環",
        accent="#6366f1"
    ),
    "resultImage": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發.html",
    "slideUrl": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發.html",
    "objective": "1. 理解從「個人使用 AI」躍升至「AI-Native 組織」的三大進階層次（Level 1 ➔ Level 2 ➔ Level 3）。\n2. 掌握組織核心分工：人類專注於決策、理解工程與探索工程；Agent 團隊專注於實作、測試與第一輪 Review。\n3. 理解「Spec 是鷹架而不是藍圖」的核心心法，學會用動態演進的規格引導 AI 高效交付。",
    "tutorialSteps": [
        {
            "step": "層次 1: 從工具輔助到 Agentic Workflow (Level 1 & 2)",
            "description": "從單純敲代碼時用 Copilot 自動補全，升級到由 Agent 接收明確目標後自主規劃、執行代碼變更與單元測試。"
        },
        {
            "step": "層次 2: 組織架構徹底解耦：決策團隊 vs 執行團隊 (Slide 31)",
            "description": "實作交給 Agent 團隊（實作、測試、除錯、初審）；人類組成決策團隊，專注於架構決策、理解工程與探索更佳可能。"
        },
        {
            "step": "層次 3: 破除迷思：Spec 是鷹架，不是藍圖",
            "description": "藍圖不可動，而鷹架隨建築生長。Spec 應當作為動態演進的認知護欄，隨著 Agent 探索與反饋持續調整迭代。"
        },
        {
            "step": "層次 4: 原型期的三大關卡 (Slide 32-34)",
            "description": "設立架構邊界關卡、自動化回歸測試關卡與終端整合門禁，確保 AI 生成的速度不以犧牲架構穩定性為代價。"
        }
    ],
    "promptTemplate": "你是一位 AI-Native 研發團隊的主任架構師。\n請依據陳宜昌 YC 在 HWDC 2026 的演講架構，為我們團隊規劃一套 AI 團隊協同工作流：\n1. 明確劃分【決策團隊 (人類工程師)】與【執行團隊 (Coding Agents)】的職責清單。\n2. 說明如何將 Spec 定義為「動態鷹架」而非僵化藍圖。\n3. 針對原型開發期，設計三道具備阻擋效果的品質門禁關卡 (Gates)。",
    "codeSnippet": {
        "language": "markdown",
        "code": "# AI-Native 團隊分工模型 (People Team vs Agent Team)\n\n## 決策團隊 (People Team)\n- 架構選型與邊界約束 (Architecture Boundary)\n- 理解工程：審閱高風險 Diff 與技術取捨\n- 探索工程：引領 Agent 發掘架構新可能\n\n## 執行團隊 (Agent Team)\n- 依據 Spec 鷹架逐步實作代碼 (Implementation)\n- 自動生成單元測試與端到端測試 (Testing)\n- 自我反射除錯 (Self-Healing Debug)\n- 提交第一輪 Code Review 意見"
    },
    "references": [
        {
            "title": "AI Coding 新時代的團隊開發：實戰教學指南 (專屬互動頁面)",
            "url": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發.html"
        },
        {
            "title": "陳宜昌 YC 演講時間軸與完整逐字稿 (單元 17)",
            "url": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發_逐字稿.html"
        },
        {
            "title": "HWDC 2026 演講完整精校逐字稿與互動解析 (單元 18)",
            "url": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發_逐字稿_01.html"
        },
        {
            "title": "HWDC 2026 YouTube 演講原片",
            "url": "https://youtu.be/-B9WLMJAiZM"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-users-gear",
            "scenario": "研發團隊 AI-Native 轉型",
            "description": "協助企業或新創工程團隊重組研發工作流，從「堆人力敲代碼」轉變為「少數高階決策者引導多 Agent 團隊」的高效組織。"
        },
        {
            "icon": "fa-solid fa-building-shield",
            "scenario": "規格驅動與防禦式門禁落地",
            "description": "建立明確的 Spec 鷹架規範與三大驗收關卡，在加速交付的同時確保核心系統架構不發散。"
        }
    ]
}

# 16：AI Coding 新時代的團隊開發：演講時間軸與完整逐字稿
unit_16_team_dev_transcript = {
    "id": "vibe-team-dev-transcript",
    "labNumber": "17",
    "title": "AI Coding 新時代的團隊開發：陳宜昌 YC 演講時間軸與完整逐字稿",
    "shortTitle": "團隊開發演講逐字稿時間軸",
    "category": "其他",
    "subCategory": "AI Coding 新時代的團隊開發",
    "date": "2026-10-15",
    "summary": "陳宜昌 YC 於 HWDC 演講的完整逐字紀要與互動時間軸索引。提供即時關鍵字過濾搜尋、演講投影片節點對齊、各章節重點摘要，並支援點擊時間戳精確同步跳轉至 YouTube 官方演講對應秒數。適合深度研讀演講中的每個關鍵問答、技術權衡與現場精華觀點。",
    "flowTitle": "HWDC 演講完整時間軸節點與金句知識索引流",
    "resultTitle": "演講逐字稿檢索與時間戳聯動系統",
    "flowImage": make_svg_diagram(
        "HWDC 演講時間軸與逐字稿索引架構",
        "Timeline Navigation -> Full-text Search -> Slide Mapping -> YouTube Sync",
        [
            {"num": "T-01", "title": "開場破題", "sub": "從個人賦能到組織重構", "tag": "00:00"},
            {"num": "T-02", "title": "三大層次", "sub": "Level 1 ~ 3 演進路徑", "tag": "08:15"},
            {"num": "T-03", "title": "團隊分工", "sub": "決策團隊 vs 執行團隊", "tag": "22:40"},
            {"num": "T-04", "title": "鷹架理論", "sub": "Spec 動態演進與守衛門禁", "tag": "35:10"},
            {"num": "T-05", "title": "問答精粹", "sub": "現場 Q&A 與實戰落地問答", "tag": "48:00"}
        ],
        loop_label="逐字稿與 YouTube 時間戳毫秒級聯動，支援全文搜尋與簡報節點精準對照",
        accent="#a855f7"
    ),
    "resultImage": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發_逐字稿.html",
    "slideUrl": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發_逐字稿.html",
    "objective": "1. 透過時間軸快速定位陳宜昌 YC 演講中關於 Agentic 工作流、團隊分工與 Spec 實戰的核心片段。\n2. 利用全文檢索功能秒查演講中的關鍵術語、案例與實戰踩坑經驗。\n3. 結合實戰教學指南 (單元 13) 進行深度複習，掌握從理論到落地的完整方法論。",
    "tutorialSteps": [
        {
            "step": "功能 1: 演講時間軸導航",
            "description": "依照演講進程分為五大區塊，點擊時間標籤即可查看該階段的核心議題與關鍵論點。"
        },
        {
            "step": "功能 2: 全文即時檢索與關鍵字高亮",
            "description": "輸入「Spec」、「鷹架」、「決策」、「Agent」，即時過濾演講逐字內容並標記重點。"
        },
        {
            "step": "功能 3: YouTube 時間戳聯動跳轉",
            "description": "點擊各段落的時間戳記，自動開啟或跳轉至 YouTube 原片對應播放秒數。"
        }
    ],
    "promptTemplate": "請幫我檢索陳宜昌 YC 在 HWDC 2026 演講逐字稿中：\n1. 關於「工程師為什麼會淪為 Agent 的外送員/打雜工」的詳細論述與痛點分析。\n2. 關於「原型期三大關卡」的現場觀眾提問與回答內容。\n請列出時間戳記與關鍵逐字內容摘要。",
    "codeSnippet": {
        "language": "json",
        "code": "{\n  \"timeline\": [\n    { \"time\": \"00:00\", \"title\": \"開場：AI Coding 帶來的工程危機與契機\" },\n    { \"time\": \"08:15\", \"title\": \"Level 1 到 Level 3 演進路線圖\" },\n    { \"time\": \"22:40\", \"title\": \"人組成決策團隊，Agent 組成執行團隊 (Slide 31)\" },\n    { \"time\": \"35:10\", \"title\": \"Spec 是鷹架不是藍圖，原型期三大關卡 (Slide 32-34)\" },\n    { \"time\": \"48:00\", \"title\": \"現場 Q&A 互動與總結\" }\n  ]\n}"
    },
    "references": [
        {
            "title": "陳宜昌 YC 演講時間軸與完整逐字稿 (專屬互動頁面)",
            "url": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發_逐字稿.html"
        },
        {
            "title": "AI Coding 新時代的團隊開發：實戰教學指南 (單元 16)",
            "url": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發.html"
        },
        {
            "title": "HWDC 2026 演講完整精校逐字稿與互動解析 (單元 18)",
            "url": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發_逐字稿_01.html"
        },
        {
            "title": "HWDC 2026 YouTube 演講原片",
            "url": "https://youtu.be/-B9WLMJAiZM"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-file-lines",
            "scenario": "技術分享與讀書會研讀",
            "description": "團隊內部針對 AI Coding 轉型進行專題研討，搭配逐字稿快速查證與引述演講論點。"
        },
        {
            "icon": "fa-solid fa-clock-rotate-left",
            "scenario": "關鍵決策實例查閱",
            "description": "在團隊討論技術選型與 Spec 制定時，快速調閱演講現場針對邊界守衛與關卡設計的具體問答回答。"
        }
    ]
}

# 17：AI Coding 新時代的團隊開發：HWDC 2026 Keynote 完整精校逐字稿與互動解析
unit_17_team_dev_transcript_interactive = {
    "id": "vibe-team-dev-transcript-01",
    "labNumber": "18",
    "title": "AI Coding 新時代的團隊開發：陳宜昌 YC 演講完整精校逐字稿與互動解析",
    "shortTitle": "演講精校逐字稿與互動解析",
    "category": "其他",
    "subCategory": "AI Coding 新時代的團隊開發",
    "date": "2026-10-16",
    "summary": "陳宜昌 YC 於 HWDC 2026 演講的 100% 完整精校逐字稿（含 558 行時間軸與專有名詞勘誤對照）。深度整合演講三張關鍵簡報（Slide 31 決策/執行團隊切分、Slide 33 鷹架理論、Slide 34 原型期三大關卡）原圖與互動燈箱、三大層次架構圖解、海外頂尖大神論戰（Kent Beck、Martin Fowler 等）路線決策器，以及開源專案 oat-agents TUI 終端機互動模擬器。支援內嵌 YouTube 播放秒數跳轉與完整 Markdown/TXT 格式下載。",
    "flowTitle": "演講完整精校逐字稿、關鍵簡報、決策權衡與 TUI 終端機模擬工作台",
    "resultTitle": "演講完整精校逐字稿與多維互動解析工作台",
    "flowImage": make_svg_diagram(
        "AI Coding 團隊開發逐字稿與多維解析管線",
        "Full-text Transcript -> Key Slides Lightbox -> 3-Layer Architecture -> TUI Simulator",
        [
            {"num": "T-01", "title": "精校逐字", "sub": "558行時間軸精校對照", "tag": "Full Text"},
            {"num": "T-02", "title": "簡報燈箱", "sub": "Slide 31/33/34 原圖", "tag": "Key Slides"},
            {"num": "T-03", "title": "架構圖解", "sub": "Level 1~3 進階三層次", "tag": "Hierarchy"},
            {"num": "T-04", "title": "路線決策", "sub": "海外大神論戰矩陣", "tag": "Debates"},
            {"num": "T-05", "title": "TUI 模擬", "sub": "oat-agents 多代理終端", "tag": "Simulator"}
        ],
        loop_label="完整逐字稿、關鍵簡報、決策權衡與 TUI 終端機模擬之端到端學習工作台",
        accent="#06b6d4"
    ),
    "resultImage": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發_逐字稿_01.html",
    "slideUrl": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發_逐字稿_01.html",
    "objective": "1. 研讀陳宜昌 YC 於 HWDC 2026 的 44 分鐘完整精校演講逐字稿與 558 行原始時間軸。\n2. 深入理解 Slide 31 人類決策團隊與 AI 執行團隊切分、Slide 33 鷹架 vs 藍圖、Slide 34 原型期三大關卡。\n3. 操作 oat-agents TUI 終端機模擬器，體驗 Meta + Member 雙層多代理架構與獨立 Git Worktree 隔離開發。",
    "tutorialSteps": [
        {
            "step": "步驟 1: 完整逐字稿工作台與 YouTube 毫秒跳轉",
            "description": "瀏覽 558 行完整校驗逐字稿，支援即時關鍵字高亮過濾、章節跳轉，點擊時間戳即可聯動內嵌 YouTube 播放器至對應秒數。"
        },
        {
            "step": "步驟 2: 演講核心簡報精華與互動燈箱 (Slides 31, 33, 34)",
            "description": "原汁原味展示 YC 演講中最關鍵的三頁簡報：實作交給執行團隊/人組成決策團隊、Spec 是鷹架不是藍圖、原型期三大關卡，點擊可放大燈箱檢視。"
        },
        {
            "step": "步驟 3: 三層次核心架構圖解與海外大神論戰決策器",
            "description": "深入解析 Level 1 個人賦能、Level 2 代理協同、Level 3 組織重構；對照 Kent Beck、Martin Fowler 等國際先驅觀點，依團隊現況計算推薦落地方案。"
        },
        {
            "step": "步驟 4: oat-agents TUI 終端機多代理模擬器實戰",
            "description": "模擬 tmux + TUI 環境下的 Meta Agent 指揮官與 Member Agents 分工、Git Worktree 隔離、變異測試 (Mutation Testing) 及助理匯報機制。"
        }
    ],
    "promptTemplate": "你是一位專精於 AI-Native 研發團隊轉型的主任架構師。\n請依據陳宜昌 YC 在 HWDC 2026 Keynote 演講精校逐字稿（單元 15）與 Slide 31/33/34 的核心理論：\n1. 針對我們既有 10 人的工控與物聯網軟體團隊，設計一套 Meta + Member 雙層代理人架構。\n2. 制定一份以「鷹架理論」為核心的 GitHub Issue Spec 範本，說明驗證通過後如何拆除鷹架。\n3. 規劃原型期的「三大關卡 (Gates)」，特別是自動化回歸測試與變異測試 (Mutation Testing) 的門禁防線。",
    "codeSnippet": {
        "language": "bash",
        "code": "# oat-agents CLI Skill 與多代理環境啟動範例\n$ npx @noopher/oat-agents-cli init\n\n# 啟動 Meta Agent 與獨立 Git Worktree 隔離工作流\n$ oat session start --meta --worktree feature/mqtt-offline-buffer\n\n# 注入 DDD 統一詞彙表與架構決策紀錄\n$ /grill-with-docs context.md ADR-001.md"
    },
    "references": [
        {
            "title": "AI Coding 新時代的團隊開發：完整精校逐字稿與互動解析 (專屬互動工作台)",
            "url": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發_逐字稿_01.html"
        },
        {
            "title": "AI Coding 新時代的團隊開發：實戰教學指南 (單元 16)",
            "url": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發.html"
        },
        {
            "title": "陳宜昌 YC 演講時間軸與精要逐字稿 (單元 17)",
            "url": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發_逐字稿.html"
        },
        {
            "title": "HWDC 2026 YouTube 演講原片",
            "url": "https://youtu.be/-B9WLMJAiZM"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-graduation-cap",
            "scenario": "團隊全員 AI 轉型研習與讀書會",
            "description": "運用 100% 精校逐字稿與原版關鍵簡報，讓團隊成員深入掌握 AI-Native 研發範式轉移的核心脈絡。"
        },
        {
            "icon": "fa-solid fa-terminal",
            "scenario": "多代理隔離開發架構評估與落地",
            "description": "透過 oat-agents 終端模擬器理解 Meta/Member 分工與 Worktree 隔離，評估導入多代理協同開發工具。"
        }
    ]
}

# 18：OST (Opportunity Solution Tree) × Vibe Coding
unit_18_ost_vibe_coding = {
    "id": "vibe-ost-canvas",
    "labNumber": "19",
    "title": "不再迷航於 AI 代碼海：用 OST (機會解決方案樹) 定舵，以 Vibe Coding 揚帆",
    "shortTitle": "OST 定舵 × Vibe Coding 揚帆",
    "category": "其他",
    "subCategory": "機會解決方案樹 (OST)",
    "date": "2026-10-18",
    "summary": "終結 AI 輔助開發中「寫得越快、錯得越多」的致命痛點！深度結合 Teresa Torres 的機會解決方案樹 (Opportunity Solution Tree, OST) 與 Vibe Coding 開發範式。以「成果 (Outcome) -> 機會 (Opportunity) -> 解法 (Solution) -> 實驗 (Experiment)」四層架構為 AI 提示詞精準定舵，搭配雙環工作流與 PLC 工控實戰圖譜，兼顧「建造正確之物 (Build the Right Thing)」與「極速建造 (Build Thing Fast)」。",
    "flowTitle": "OST 機會解決方案樹架構定舵 × Vibe Coding 雙環閉環實踐工作流",
    "resultTitle": "OST 互動式決策樹畫布、提示詞產生器與 PLC 工控實戰案例",
    "flowImage": make_svg_diagram(
        "OST 架構定舵 × Vibe Coding 極速迭代雙環工作流",
        "Outcome Focus -> Opportunity Discovery -> Solution Brainstorm -> Vibe Coding Experiment",
        [
            {"num": "OST-1", "title": "鎖定成果", "sub": "定義產品量化商業指標", "tag": "Outcome"},
            {"num": "OST-2", "title": "探勘機會", "sub": "挖掘客戶未被滿足的痛點", "tag": "Discovery"},
            {"num": "OST-3", "title": "發散解法", "sub": "對比多種技術路徑與權衡", "tag": "Solution"},
            {"num": "OST-4", "title": "極速建造", "sub": "Vibe Coding 敏捷原型實作", "tag": "Build"},
            {"num": "OST-5", "title": "假設檢驗", "sub": "快速回饋驗證商業假說", "tag": "Verify"}
        ],
        loop_label="雙環閉環：外環探索『建造正確之物』，內環 Vibe Coding『極速建造正確之物』",
        accent="#8b5cf6"
    ),
    "resultImage": "Vibe Coding/03.其他/不再迷航於 AI 代碼海：用 OST 定舵，以 Vibe Coding 揚帆.html",
    "slideUrl": "Vibe Coding/03.其他/不再迷航於 AI 代碼海：用 OST 定舵，以 Vibe Coding 揚帆.html",
    "objective": "1. 理解 Vibe Coding 與機會解決方案樹 (OST) 的互補價值：用 OST 避免「極速建造垃圾」，用 Vibe Coding 降低「實驗驗證成本」。\n2. 掌握四層 OST 架構：期望成果 (Outcome)、痛點機會 (Opportunity)、解法候選 (Solution) 與假設實驗 (Experiment)。\n3. 實作雙環閉環工作流與專屬提示詞範本，並參考 PLC 工控異常排查實戰案例，打造高成效的 AI 敏捷開發流程。",
    "tutorialSteps": [
        {
            "step": "步驟 1: 從「功能甘特圖」切換為「成效決策樹」",
            "description": "跳脫以產出 (Output) 為導向的傳統思維，轉為以商業與使用者成效 (Outcome) 為錨點，建立多路徑展開的動態決策樹。"
        },
        {
            "step": "步驟 2: 探索工控 PLC 異常診斷實例圖譜",
            "description": "以工控領域「產線停機診斷」為真實案例，對比傳統 Modbus 輪詢與邊緣 AI 異常檢測方案，觀察 OST 如何引導技術選型。"
        },
        {
            "step": "步驟 3: 操作互動式 OST 畫布與決策生成",
            "description": "在可互動畫布中動態切換痛點分支，直觀視覺化評估多種解決方案的影響力、技術可行性與假設風險。"
        },
        {
            "step": "步驟 4: 注入專為 OST 定制之 Vibe Coding 提示詞",
            "description": "運用「角色 + OST 背景 + 實驗邊界 + 嚴禁自嗨」架構向 AI 下達指令，一鍵生成聚焦核心假說的原型代碼。"
        }
    ],
    "promptTemplate": "你是一位頂尖的 AI-Native 產品架構師與全棧工程師。\n我們目前正在運用「機會解決方案樹 (OST)」指導 Vibe Coding 開發：\n\n【OST 錨定背景】\n- 期望成效 (Outcome)：工控邊緣網關數據採集延遲由 250ms 降至 50ms 以內\n- 鎖定機會 (Opportunity)：現場維護工程師反映傳統循序 Modbus 輪詢造成高頻告警遺失\n- 候選解法 (Solution)：實作以 RxJS / 異步事件驅動為核心的並行輪詢緩衝佇列模組\n\n【Vibe Coding 任務目標】\n請依據此解法，撰寫一份專注於「最小可行假說驗證 (MVP Experiment)」的 Node.js 原型：\n1. 實作並行隊列與背壓 (Backpressure) 控制機制。\n2. 加入模擬 100 個暫存器高頻壓測腳本。\n3. 請勿過度設計無關的 UI 或資料庫儲存，優先驗證延遲指標是否達標。",
    "codeSnippet": {
        "language": "javascript",
        "code": "// OST 實驗原型：RxJS 異步並行 Modbus 採集隊列 (最小可行假說驗證)\nimport { from, mergeMap, bufferTime, filter } from 'rxjs';\n\nconst registers = Array.from({ length: 100 }, (_, i) => ({ address: 40001 + i }));\n\n// 模擬並行採集與微批次聚合緩衝\nfrom(registers).pipe(\n  mergeMap(async (reg) => {\n    const start = performance.now();\n    const val = await readModbusAsync(reg.address);\n    return { addr: reg.address, val, latency: performance.now() - start };\n  }, 10), // 並行度限制 10\n  bufferTime(50), // 50ms 聚合推播\n  filter(batch => batch.length > 0)\n).subscribe(batch => {\n  console.log(`[OST 驗證] 批次推送 ${batch.length} 筆暫存器資料，平均延遲: ${calcAvgLatency(batch)}ms`);\n});"
    },
    "references": [
        {
            "title": "不再迷航於 AI 代碼海：用 OST 定舵，以 Vibe Coding 揚帆 (專屬互動全景頁面)",
            "url": "Vibe Coding/03.其他/不再迷航於 AI 代碼海：用 OST 定舵，以 Vibe Coding 揚帆.html"
        },
        {
            "title": "Continuous Discovery Habits (Teresa Torres OST 官方理論著作)",
            "url": "https://www.producttalk.org/opportunity-solution-tree/"
        },
        {
            "title": "AI Coding 新時代的團隊開發：實戰教學指南 (單元 16)",
            "url": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發.html"
        },
        {
            "title": "HWDC 2026 演講完整精校逐字稿與互動解析 (單元 18)",
            "url": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發_逐字稿_01.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-compass",
            "scenario": "新產品敏捷探索與 MVP 原型決策",
            "description": "避免團隊陷入「AI 產碼很快但做出來沒人用」的產出陷阱，先以 OST 鎖定商業價值再啟動 Vibe Coding。"
        },
        {
            "icon": "fa-solid fa-industry",
            "scenario": "智慧製造與工控邊緣系統架構演進",
            "description": "在傳統 PLC/SCADA 改造升級時，依痛點分枝快速驗證邊緣計算、通訊協定轉換與預測維護之技術可行性。"
        }
    ]
}



# 20：AI 寫的網頁過得了幾項檢查？Google 實測Modern Web Guidance 1.0，通過率從 53% 到 92%
unit_modern_web_guidance = {
    "id": "vibe-modern-web-guidance",
    "labNumber": "20",
    "title": "AI 寫的網頁過得了幾項檢查？Google 實測Modern Web Guidance 1.0，通過率從 53% 到 92%",
    "shortTitle": "Google 實測 Modern Web Guidance 1.0",
    "category": "其他",
    "subCategory": "Modern Web Guidance",
    "date": "2026-11-24",
    "summary": "AI 寫網頁雖然飛快，但訓練資料往往停留在好幾年前，面對現代瀏覽器原生早已支援的新功能，常盲目引進肥大套件或重造輪子，導致實測通過率僅 53%！由 Chrome 聯合 Edge、Firefox 與 MDN 共同維護的開源專家指南 Modern Web Guidance 1.0，收錄超過 200 篇瀏覽器規範與 Baseline 相容性清單。在 AI 生成代碼前先查閱規範，實測檢查通過率大幅飆升至 92%！本單元包含運作架構圖、手機側邊欄性能對比模擬器、四大核心檢查指標與 CLI 安裝指引，助你打造高水準現代 Web 應用。",
    "flowTitle": "Modern Web Guidance 1.0 現代網頁檢核與 AI 賦能流水線",
    "resultTitle": "Modern Web 實測儀表板、架構圖、側邊欄模擬器與逐字稿工作台",
    "flowImage": make_svg_diagram(
        "Modern Web Guidance 1.0 現代網頁規範流水線",
        "AI 提示詞 -> 專家指南 (200+篇) -> Baseline 標準檢索 -> 原生優先實作 -> 降級 Fallback 驗證 (92%通過率)",
        [
            {"num": "MW-1", "title": "需求痛點", "sub": "AI 舊資料寫過時語法 53%", "tag": "Legacy Issue"},
            {"num": "MW-2", "title": "規範查詢", "sub": "200+ 專家指南與 Baseline", "tag": "Guidelines"},
            {"num": "MW-3", "title": "原生優先", "sub": "善用瀏覽器原生 Dialog/Popover", "tag": "Native-First"},
            {"num": "MW-4", "title": "降級備案", "sub": "針對舊瀏覽器提供 Fallback", "tag": "Fallback"},
            {"num": "MW-5", "title": "實測驗收", "sub": "檢查通過率大幅躍升至 92%", "tag": "92% Pass"}
        ],
        loop_label="Chrome / Edge / Firefox / MDN 現代 Web 共通規範：AI 生成前先檢索 Baseline，拒絕盲目重造輪子",
        accent="#0ea5e9"
    ),
    "resultImage": "Vibe Coding/03.其他/modern-web-guidance.html",
    "slideUrl": "Vibe Coding/03.其他/modern-web-guidance.html",
    "objective": "1. 理解 AI 輔助前端開發時常見的「訓練數據過時、重造輪子、過度引進第三方套件」等核心痛點。\n2. 掌握 Modern Web Guidance 1.0 的三大核心支柱：專家指南、Baseline 跨瀏覽器標準對照、以及舊版瀏覽器 Fallback 替代策略。\n3. 學習如何將 Modern Web Guidance 整合進 Claude Code 與 Cursor 等 AI 工具中，將代碼通過率從 53% 提升至 92%。",
    "tutorialSteps": [
        {
            "step": "步驟 1: 拆解問題根源 — 為何 AI 寫的網頁實測通過率僅有 53%？",
            "description": "深入分析 AI 大模型訓練語料存在的時間延遲，剖析其常常忽略瀏覽器原生內建新 API 的技術死穴。"
        },
        {
            "step": "步驟 2: 深入 Modern Web Guidance 架構 — 專家指南、Baseline 與 Fallback",
            "description": "掌握由四大瀏覽器核心巨頭共同維護的 200+ 篇專家指南架構，學習以 Baseline 作為相容性基準判斷。"
        },
        {
            "step": "步驟 3: 實作對比驗證 — 手機側邊欄原生 CSS vs 舊式 JS 卡頓動態模擬",
            "description": "在互動模擬器中親身體會原生 CSS 巢狀與平滑過渡帶來的絲滑 60fps 體驗，對比舊式多層 JS 的掉幀卡頓。"
        },
        {
            "step": "步驟 4: 工具鏈整合實戰 — 一鍵在 Claude Code / Cursor 中掛載現代網頁指引規範",
            "description": "掌握 npx modern-web-guidance init 初始指令與 Agent 系統提示詞掛載，在僅增加微量 Token 成本下取得 92% 成果。"
        }
    ],
    "promptTemplate": "你是一位精通現代 Web 前端標準與瀏覽器原生特性的架構顧問。\n請依據 Google、Edge、Firefox 與 MDN 共同制定的「Modern Web Guidance 1.0」標準：\n1. 請檢視我目前提供的 HTML/CSS/JS 代碼，指出哪些地方在「重造輪子」或引進了不必要的外部龐大套件（例如模態框、彈出選單、側邊抽屜等）。\n2. 請以瀏覽器原生支援的最新特性（如 <dialog>、Popover API、CSS :has()、原生 CSS 巢狀等）進行現代化重構，並說明其在 Baseline 跨瀏覽器中的支援度。\n3. 為不支援最新特性的舊版瀏覽器提供優雅降級（Fallback）的處理策略。",
    "codeSnippet": {
        "language": "bash",
        "code": "# 在 Claude Code / Cursor 中快速安裝 Modern Web Guidance\n$ npx modern-web-guidance init\n\n# 讓 AI 遵循現代網頁基準規範寫代碼範例：原生 Popover 與 Dialog\n# 不再需要引用 jQuery 或 50KB 的外部 Modal 函式庫！\n<button popovertarget='my-popover'>開啟現代浮層</button>\n<div id='my-popover' popover>\n  <p>這是現代瀏覽器原生支援的零依賴浮層！</p>\n</div>"
    },
    "references": [
        {
            "title": "AI 寫的網頁過得了幾項檢查？Google 實測 Modern Web Guidance 1.0 (專屬互動教學頁面)",
            "url": "Vibe Coding/03.其他/modern-web-guidance.html",
            "bgColor": "rgba(14, 165, 233, 0.15)",
            "borderColor": "rgba(14, 165, 233, 0.6)",
            "color": "#38bdf8",
            "icon": "fa-solid fa-compass-drafting",
            "badge": "本單元專題"
        },
        {
            "title": "YouTube 官方原片：Google Chrome Developers (vi4QLSU2oT4)",
            "url": "https://www.youtube.com/watch?v=vi4QLSU2oT4"
        },
        {
            "title": "Web.dev 官方 Baseline 跨瀏覽器標準清單",
            "url": "https://web.dev/baseline"
        },
        {
            "title": "MDN Web Docs：Modern Web Guidance 與瀏覽器原生 API",
            "url": "https://developer.mozilla.org/"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-mobile-screen-button",
            "scenario": "行動端與工控 HMI 輕量化前端介面",
            "description": "利用瀏覽器原生 CSS 與 HTML 標籤替代笨重函式庫，消除滾動與抽屜動畫的掉幀卡頓，極致降低記憶體與 CPU 佔用。"
        },
        {
            "icon": "fa-solid fa-code-compare",
            "scenario": "AI Coding Agent 前端代碼自動審查與防退化",
            "description": "在 Cursor / Claude Code 自動生成介面代碼時，自動比對 Baseline 標準規範，阻斷過時語法與高風險相容性漏洞。"
        }
    ]
}


# 軟體工程新單元 1：Vibe Coding 時代的價值轉移：為什麼懂需求、規格、流程、架構、驗證才值錢？
unit_value_shift_spec_arch_verify = {
    "id": "vibe-value-shift-spec-arch-verify",
    "labNumber": "11",
    "title": "Vibe Coding 時代，程式碼本身已經不值錢。真正值錢的是：需求、規格、流程、架構、驗證",
    "shortTitle": "價值轉移：需求、規格、流程、架構、驗證",
    "category": "軟體工程",
    "date": "2026-11-27",
    "summary": "進入 Vibe Coding 時代，純粹的 Coding 產能已被 AI 壓至近乎零邊際成本，程式碼本身已不再值錢！真正決定專案成敗的五大核心支柱是：需求（痛點定位與商業價值）、規格（邊界與契約）、流程（狀態機與時序）、架構（職責劃分與鬆耦合）、驗證（自動化測試與回歸防護）。本單元以單一「咖啡廳點餐系統」實戰案例貫穿，並提供 Vibe Coding 成熟度互動診斷工具，助你精準重塑工程核心競爭力。",
    "flowTitle": "Vibe Coding 五大核心價值支柱與能力躍遷架構",
    "resultTitle": "價值轉移互動解析、咖啡廳實戰貫穿與成熟度診斷工作台",
    "flowImage": make_svg_diagram(
        "Vibe Coding 五大核心價值支柱躍遷流",
        "需求 (Why) -> 規格 (What) -> 流程 (When/How) -> 架構 (Where) -> 驗證 (Gate)",
        [
            {"num": "VS-1", "title": "需求探索", "sub": "痛點價值定位 (Why)", "tag": "Requirement"},
            {"num": "VS-2", "title": "精確規格", "sub": "契約邊界定義 (What)", "tag": "Specification"},
            {"num": "VS-3", "title": "流程時序", "sub": "狀態機與流轉 (When)", "tag": "Workflow"},
            {"num": "VS-4", "title": "架構解耦", "sub": "職責劃分防擴散 (Where)", "tag": "Architecture"},
            {"num": "VS-5", "title": "守門驗證", "sub": "自動測試防回歸 (Gate)", "tag": "Verification"}
        ],
        loop_label="程式碼邊際成本趨近於零：掌握五大支柱，讓 AI 成為頂級執行手，人做真正的工程決策",
        accent="#3b82f6"
    ),
    "resultImage": "Vibe Coding/01.軟體工程/Vibe Coding 時代，程式碼本身已經不值錢。真正值錢的是：需求、規格、流程、架構、驗證.html",
    "slideUrl": "Vibe Coding/01.軟體工程/Vibe Coding 時代，程式碼本身已經不值錢。真正值錢的是：需求、規格、流程、架構、驗證.html",
    "objective": "1. 徹底理解 AI 時代的「代碼邊際成本崩跌」效應，破除盲目追求 Coding 速度的盲區。\n2. 掌握重構工程師護城河的五大支柱：需求定位、規格邊界、業務流程、解耦架構與自動化驗證。\n3. 透過咖啡廳點餐系統全流程貫穿，體會從混亂 Vibe 走向規格驅動（Spec-Driven）的工程實踐。\n4. 利用成熟度互動診斷工具，評估個人與團隊從 Level 1 (盲投) 到 Level 5 (全自控) 的能力等級。",
    "tutorialSteps": [
        {
            "step": "步驟 1: 認知重構 — 為什麼在 Vibe Coding 時代「寫程式碼」本身不再值錢？",
            "description": "深入剖析 AI 工具讓產碼邊際成本暴降後的軟體工程全新價值格局。"
        },
        {
            "step": "步驟 2: 解構五大價值支柱 — 需求、規格、流程、架構、驗證",
            "description": "逐一拆解五大支柱的具體內涵，建立高抗幻覺的工程思考框架。"
        },
        {
            "step": "步驟 3: 案例穿透演練 — 咖啡廳點餐系統在五個維度的實踐與反思",
            "description": "以單一實例貫穿折扣計算、訂單狀態機、分層架構與自動化單元測試防線。"
        },
        {
            "step": "步驟 4: 成熟度自我檢測 — 評估你的 Vibe Coding 是否具備工程防爆能力",
            "description": "透過互動診斷器評估團隊技術成熟度，取得針對性的轉型落地方案。"
        }
    ],
    "promptTemplate": "你是一位精通現代軟體架構與規格驅動開發（SDD）的資深技術顧問。\n請依據「需求、規格、流程、架構、驗證」五大核心支柱，協助我將以下模糊的業務想法梳理為可交給 AI Coding Agent 精確執行的工程工件：\n【業務需求描述】：（請填寫你的專案構想，例如：產線設備即時溫濕度告警系統）\n請依序輸出：\n1. 需求邊界（In-scope / Out-of-scope）與關鍵指標\n2. 核心規格（資料結構定義、輸入驗證、邊界條件與錯誤碼契約）\n3. 業務流轉狀態機（State Diagram 狀態移轉條件）\n4. 架構分層（核心邏輯與外部 I/O 隔離原則）\n5. 驗收標準與 Given-When-Then 自動化測試案例",
    "codeSnippet": {
        "language": "yaml",
        "code": "# 規格驅動核心契約範例 (OpenSpec / SDD 精神)\nfeature: 咖啡廳訂單狀態機與折扣驗證\nin_scope:\n  - 支援會員自動套用 9 折優惠\n  - 滿 500 元可疊加滿額折抵 50 元\nout_of_scope:\n  - 第三方外送平台 API 串接\nvalidation_rules:\n  - rule: single_coupon_per_type\n    description: 同類型優惠券不可重複疊加\n  - rule: minimum_payable_zero\n    description: 折扣後最終應付金額不得小於 0\nstate_transitions:\n  CREATED -> PAID -> PREPARING -> COMPLETED\n  PAID -> REFUNDED (僅限製作前)"
    },
    "references": [
        {
            "title": "Vibe Coding 時代的價值轉移：為什麼懂需求、規格、流程、架構、驗證才值錢？(專屬互動頁面)",
            "url": "Vibe Coding/01.軟體工程/Vibe Coding 時代，程式碼本身已經不值錢。真正值錢的是：需求、規格、流程、架構、驗證.html",
            "bgColor": "rgba(59, 130, 246, 0.15)",
            "borderColor": "rgba(59, 130, 246, 0.6)",
            "color": "#60a5fa",
            "icon": "fa-solid fa-layer-group",
            "badge": "本單元專題"
        },
        {
            "title": "AI 時代工程師還要會什麼？規格、驗收標準與 SDD、TDD、BDD、DDD 實戰問答",
            "url": "Vibe Coding/01.軟體工程/AI 時代工程師還要會什麼？規格、驗收標準與 SDD、TDD、BDD、DDD 實戰問答.html"
        },
        {
            "title": "軟體工程演進全景圖：從混沌到 Vibe Coding",
            "url": "Vibe Coding/01.軟體工程/vibe_coding_軟體工程.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-store",
            "scenario": "新零售與智慧餐飲業務系統架構規劃",
            "description": "在業務需求頻繁變更時，以規格邊界與狀態機鎖定核心業務，避免 AI 產出折扣邏輯混亂或負數金額漏洞。"
        },
        {
            "icon": "fa-solid fa-microchip",
            "scenario": "工控邊緣通訊與狀態轉換防禦",
            "description": "在 PLC / SCADA 邊緣採集與控制情境中，以嚴格狀態機和驗收契約阻斷異常連線重試風暴與未授權寫入。"
        }
    ]
}


# 軟體工程新單元 2：AI 時代工程師還要會什麼？規格、驗收標準與 SDD、TDD、BDD、DDD 實戰問答
unit_engineer_skills_sdd_tdd_bdd_ddd = {
    "id": "vibe-engineer-skills-sdd-tdd-bdd-ddd",
    "labNumber": "12",
    "title": "AI 時代工程師還要會什麼？規格、驗收標準與 SDD、TDD、BDD、DDD 實戰問答",
    "shortTitle": "AI 時代工程師必備：規格、驗收標準與 SDD/TDD/BDD/DDD",
    "category": "軟體工程",
    "date": "2026-11-27",
    "summary": "水球潘（服務 20+ 企業之軟工顧問）與外商前端主管 JW 深度對談：在 AI 狂潮下，代碼生成已被自動化，工程師的護城河正式轉移至「最上游的複雜技術決策與規格定義」！本單元徹底解密 SDD、TDD、BDD、DDD 的核心本質皆為「拆解 LLM 注意力」，搭配產品生命週期與 Kano Model 技術選型矩陣、Evaluator Skill 雙模型架構審查、以及打破穀倉效應的 DDD 統一語言與 Shared Context 認知超前，助你打造不可替代的高階工程思維。",
    "flowTitle": "AI 時代軟工上下游價值鏈與 LLM 注意力拆解流水線",
    "resultTitle": "水球潘 × JW 實戰問答解析、決策矩陣模擬器與時間軸逐字稿",
    "flowImage": make_svg_diagram(
        "AI 時代工程師價值鏈與注意力拆解架構",
        "複雜決策 (最上游·極高稀缺) -> 規格定義 (SDD/DDD) -> 注意力拆解 (TDD/BDD) -> AI 產碼 (下游) -> 雙模型 Review (Evaluator)",
        [
            {"num": "ENG-1", "title": "複雜決策", "sub": "最上游技術與架構權衡", "tag": "Upstream"},
            {"num": "ENG-2", "title": "規格契約", "sub": "SDD 規格與 DDD 統一語言", "tag": "Spec/DDD"},
            {"num": "ENG-3", "title": "注意力拆解", "sub": "TDD/BDD 單一職責化邊界", "tag": "Decompose"},
            {"num": "ENG-4", "title": "AI 執行產碼", "sub": "LLM 落地高品質代碼", "tag": "AI Coding"},
            {"num": "ENG-5", "title": "雙模型審查", "sub": "Evaluator 切除架構腫瘤", "tag": "Evaluator"}
        ],
        loop_label="打破穀倉效應：用 Shared Context 認知超前，以 SDD/TDD/BDD 成為 LLM 的頂級領航員",
        accent="#0ea5e9"
    ),
    "resultImage": "Vibe Coding/01.軟體工程/AI 時代工程師還要會什麼？規格、驗收標準與 SDD、TDD、BDD、DDD 實戰問答.html",
    "slideUrl": "Vibe Coding/01.軟體工程/AI 時代工程師還要會什麼？規格、驗收標準與 SDD、TDD、BDD、DDD 實戰問答.html",
    "objective": "1. 掌握 AI 海嘯下的「上下游思維」：分清下游易替代的產碼勞務與最上游極高稀缺的架構決策。\n2. 深入理解 SDD、TDD、BDD、DDD 的共同本質：透過邊界約束化解 LLM 幻覺並「拆解大模型注意力」。\n3. 熟悉 Kano Model 與產品生命週期選型矩陣：學會在 MVP 敏捷摸索期（Vibe Coding）與核心成熟期（AI-BDD）之間切換。\n4. 掌握 Evaluator Skill 雙模型 Code Review 策略與 Shared Context 企業落地指引。",
    "tutorialSteps": [
        {
            "step": "步驟 1: 建立上下游思維 — 認識軟體工程價值鏈中的稀缺技術決策",
            "description": "剖析工程師核心資產如何從編寫程式碼轉移為規格邊界劃分與非功能性決策。"
        },
        {
            "step": "步驟 2: 破解四大 D 的本質 — SDD、TDD、BDD、DDD 如何拆解 LLM 注意力",
            "description": "掌握透過規格驅動、測試驅動與領域驅動，將龐大需求拆解為精準上下文的精髓。"
        },
        {
            "step": "步驟 3: 操作互動決策器 — 需求一直改，到底該 Vibe Coding 還是 AI-BDD？",
            "description": "運用 Kano Model 與產品生命週期矩陣，評估專案應採取的最佳工程規範等級。"
        },
        {
            "step": "步驟 4: 落地 Evaluator Skill — 建立雙模型架構審查與 Shared Context 認知超前",
            "description": "運用 Evaluator Agent 實施架構體檢，建立全團隊統一語言跨越溝通鴻溝。"
        }
    ],
    "promptTemplate": "你是一位頂級軟體工程架構師兼 AI 輔助開發教練（具備水球潘顧問實戰體系）。\n請針對我即將交付給 AI Coding Agent 實作的功能模組：\n1. 【注意力拆解】：依據單一職責原則，將本功能拆解為不超過 300 行代碼的獨立驗證小任務。\n2. 【SDD 規格定義】：列出清晰的輸入/輸出邊界、型別宣告、Pre-conditions 與 Post-conditions。\n3. 【BDD 驗收案例】：以 Gherkin 語法撰寫至少 3 組 Given-When-Then 驗收測試。\n4. 【Evaluator 審查清單】：列出在 AI 產碼完成後，用來切除「架構腫瘤」的 5 個核心檢查點（如職責蔓延、過度工程、隱式耦合等）。",
    "codeSnippet": {
        "language": "gherkin",
        "code": "# AI-BDD 驗收規格範例 (拆解 LLM 注意力)\nFeature: 智慧電表即時負載異常監控\n\n  Scenario: 用電功率超出安全閥值觸發警報\n    Given 產線智慧電表目前取樣週期為 1 秒\n    And 額定安全功率上限為 50.0 kW\n    When 傳感器連續 3 秒回傳功率讀數為 52.3 kW, 53.1 kW, 52.8 kW\n    Then 系統應判定為「過載警報」狀態\n    And 應發送警報推播並於 500ms 內觸發 PLC 卸載接點"
    },
    "references": [
        {
            "title": "AI 時代工程師還要會什麼？規格、驗收標準與 SDD、TDD、BDD、DDD 實戰問答 (專屬互動頁面)",
            "url": "Vibe Coding/01.軟體工程/AI 時代工程師還要會什麼？規格、驗收標準與 SDD、TDD、BDD、DDD 實戰問答.html",
            "bgColor": "rgba(14, 165, 233, 0.15)",
            "borderColor": "rgba(14, 165, 233, 0.6)",
            "color": "#38bdf8",
            "icon": "fa-solid fa-code-compare",
            "badge": "本單元專題"
        },
        {
            "title": "YouTube 官方原片：水球潘 × 外商前端主管 JW",
            "url": "https://www.youtube.com/watch?v=mNQNKLhQp6E"
        },
        {
            "title": "當 Vibe Coding 遇上嚴謹工程學：SDD vs BDD vs TDD 深入解析",
            "url": "Vibe Coding/02.Skills(技能)/vibe_coding_sdd_vs_bdd_vs_tdd.html"
        },
        {
            "title": "Vibe Coding 時代，程式碼本身已經不值錢。真正值錢的是：需求、規格、流程、架構、驗證",
            "url": "Vibe Coding/01.軟體工程/Vibe Coding 時代，程式碼本身已經不值錢。真正值錢的是：需求、規格、流程、架構、驗證.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-brain",
            "scenario": "複雜工業物聯網 (IIoT) 數據中台架構審查",
            "description": "在龐大時序資料流與多通訊協定整合時，以 Evaluator 審查機制切除代碼膨脹與高耦合架構腫瘤。"
        },
        {
            "icon": "fa-solid fa-diagram-project",
            "scenario": "領域驅動設計 (DDD) 統一語言與跨部門協同",
            "description": "利用 DDD 限界上下文與 Shared Context，使產線工程師、IT 開發者與業務決策者精準同頻。"
        }
    ]
}


# 其他新單元 3：5 位當代軟體開發傳奇人物，怎麼看 AI 寫程式？
unit_legendary_engineers_ai = {
    "id": "vibe-legendary-engineers-ai",
    "labNumber": "21",
    "title": "5 位當代軟體開發傳奇人物，怎麼看 AI 寫程式？",
    "shortTitle": "5 位軟體傳奇大師，怎麼看 AI 寫程式",
    "category": "其他",
    "subCategory": "軟體傳奇思維",
    "date": "2026-11-27",
    "summary": "匯集五位當代軟體工程宗師——Linux 之父 Linus Torvalds、C++ 發明者 Bjarne Stroustrup、Ruby on Rails 創始人 DHH、敏捷宣言起草人兼 TDD 之父 Kent Beck、以及 Clean Code 作者 Uncle Bob——對 AI 輔助編程的深度洞見與思維演進。從 2023 到 2026 年，大師們如何界定「哪些代碼能託付 AI、哪些邊界必須由人掌控」？包含宗師思維對照矩陣、精華短語速查卡與時間軸逐字稿，給所有 Vibe Coding 開發者的定心丸與大師級指引。",
    "flowTitle": "五大軟體工程宗師立場光譜與 AI 賦能邊界圖",
    "resultTitle": "五位大師深度解析、立場光譜矩陣、核心分歧與時間軸逐字稿",
    "flowImage": make_svg_diagram(
        "五大軟體傳奇宗師 AI 立場光譜圖",
        "Linus (務實工具) <-> Bjarne (正確本質) <-> DHH (效率賦能) <-> Kent Beck (思考伴侶) <-> Uncle Bob (責任防線)",
        [
            {"num": "LEG-1", "title": "Linus Torvalds", "sub": "Git/Linux：AI 是高階自動補全", "tag": "Pragmatist"},
            {"num": "LEG-2", "title": "Bjarne Stroustrup", "sub": "C++：正確性比代碼量更重要", "tag": "Correctness"},
            {"num": "LEG-3", "title": "DHH", "sub": "Rails：AI 抹平技術落差擴大生產力", "tag": "Productivity"},
            {"num": "LEG-4", "title": "Kent Beck", "sub": "TDD：AI 是即時回饋的思考夥伴", "tag": "TDD Master"},
            {"num": "LEG-5", "title": "Uncle Bob", "sub": "Clean Code：工程師永遠負最終責任", "tag": "Clean Code"}
        ],
        loop_label="大師核心共識：代碼生成越快，對架構判斷力、驗證責任與系統品味的要求就越嚴苛",
        accent="#6366f1"
    ),
    "resultImage": "Vibe Coding/03.其他/5 位當代軟體開發傳奇人物，怎麼看 AI 寫程式.html",
    "slideUrl": "Vibe Coding/03.其他/5 位當代軟體開發傳奇人物，怎麼看 AI 寫程式.html",
    "objective": "1. 綜覽五位當代軟體開發傳奇人物對 AI 編程的演進觀點，建立平衡而深邃的技術哲學觀。\n2. 理解「生產力暴增派 (DHH/Kent Beck)」與「品質責任派 (Bjarne/Uncle Bob)」的核心論點與分歧。\n3. 汲取 Linus Torvalds 的務實主義思維：將 AI 視為高級工具而非神祇，始終緊抓底層代碼審查權。\n4. 掌握大師共識：在 AI 狂飆的時代，如何守護軟體設計的 Clean Code 精神與架構純潔性。",
    "tutorialSteps": [
        {
            "step": "步驟 1: 綜覽立場光譜 — 從熱情擁抱到嚴格審慎的五維觀點分佈",
            "description": "探索五位宗師在開發速度、心智模型、代碼責任與架構哲學上的光譜定位。"
        },
        {
            "step": "步驟 2: 深入五位大師的核心主張 — Linus、Bjarne、DHH、Kent Beck、Uncle Bob",
            "description": "解讀每位大師從早期質疑到如今實踐的真實反饋與深層警告。"
        },
        {
            "step": "步驟 3: 剖析三大核心分歧 — AI 會消滅工程師嗎？TDD 還重要嗎？新手該用 AI 嗎？",
            "description": "從宗師辯論中提煉不同開發場景下的權衡策略與學習建議。"
        },
        {
            "step": "步驟 4: 提煉 Vibe Coding 心法 — 建立「AI 提速、人把關品味與責任」的工程準則",
            "description": "將宗師智慧內化為日常開發習慣，既享受極速產出又杜絕技術債堆積。"
        }
    ],
    "promptTemplate": "你是一位融會貫通 Linus Torvalds、Bjarne Stroustrup、DHH、Kent Beck 與 Uncle Bob 軟工哲學的技術思想家。\n請針對我目前的軟體專案架構（或 AI 生成代碼）：\n1. 【Uncle Bob 視角】：這段代碼是否符合 Clean Code 原則？責任邊界是否清晰？若出事誰該負責？\n2. 【Kent Beck 視角】：這段邏輯是否具備高覆蓋、可信任的測試防護網（TDD 精神）？\n3. 【Bjarne Stroustrup 視角】：是否有潛在的型別安全、記憶體洩漏或效能陷阱？是否為了方便犧牲了正確性？\n4. 【DHH 視角】：我們是否過度工程（Over-engineering）？如何用最優雅簡練的現代語義交付最大價值？\n5. 【Linus 視角】：請給出最務實、不講廢話的審查反饋（實話實說）。",
    "codeSnippet": {
        "language": "javascript",
        "code": "// 大師哲學指導下的 Clean Code 原則：\n// 1. 意圖明確 (Uncle Bob)\n// 2. 測試先行 (Kent Beck)\n// 3. 簡練優雅 (DHH)\n// 4. 正確安全 (Bjarne)\n// 5. 不搞花俏 (Linus)\n\n// 永遠不要讓 AI 產出未受測試保護的盲盒代碼\ndescribe('TemperatureController', () => {\n  it('應在溫度超過 85°C 時精確切斷加熱電驛並紀錄審計日誌', () => {\n    const controller = new IndustrialController({ maxTemp: 85.0 });\n    controller.feedSensorReading(86.2);\n    expect(controller.relayState).toBe('DISCONNECTED');\n    expect(controller.auditLog).toContain('OVERHEAT_CUTOFF');\n  });\n});"
    },
    "references": [
        {
            "title": "5 位當代軟體開發傳奇人物，怎麼看 AI 寫程式？(專屬互動頁面)",
            "url": "Vibe Coding/03.其他/5 位當代軟體開發傳奇人物，怎麼看 AI 寫程式.html",
            "bgColor": "rgba(99, 102, 241, 0.15)",
            "borderColor": "rgba(99, 102, 241, 0.6)",
            "color": "#818cf8",
            "icon": "fa-solid fa-users-viewfinder",
            "badge": "本單元專題"
        },
        {
            "title": "YouTube 官方原片：5 位當代軟體傳奇人物對談精華",
            "url": "https://www.youtube.com/watch?v=edcIT5Pbh18"
        },
        {
            "title": "AI Coding 新時代的團隊開發：從個人用 AI 到 AI-Native 團隊 (單元 16)",
            "url": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-graduation-cap",
            "scenario": "團隊工程文化與技術準則建構",
            "description": "在組織全面導入 AI 輔助開發時，借鑒大師觀點建立「代碼品質與驗證責任歸屬」的技術紅線。"
        },
        {
            "icon": "fa-solid fa-compass",
            "scenario": "資深工程師自我定位與職業演進指南",
            "description": "跳脫語法生成工具的焦慮，將個人核心能力深化至架構品味、邊界把關與系統驗證等無可取代的領域。"
        }
    ]
}

# 20：Vibe Coding 必學的版本控制：從零搞懂 Git！｜Kelly Tsai
unit_20_git_kelly = {
    "id": "vibe-git-kelly",
    "labNumber": "20",
    "title": "Vibe Coding 必學的版本控制：從零搞懂 Git！｜Kelly Tsai",
    "shortTitle": "從零搞懂 Git 版本控制",
    "category": "版本控管",
    "date": "2026-11-18",
    "summary": "AI 幫你光速寫代碼，但改壞了怎麼辦？專為 Vibe Coding 學習者打造的 Git 核心觀念全解析！由知名軟體工程師 Kelly Tsai 親授，徹底破解「三個平行宇宙（Working Directory 工作區、Staging Area 暫存區、Repository 儲存庫）」的神秘面紗。包含平行宇宙動態視覺化模擬器、核心指令速查手冊、遠端 VPS 安全隔離防坑秘笈與完整時間軸逐字稿，讓你放心衝刺 Vibe Coding，隨時擁有時光倒流的改壞後悔藥！",
    "flowTitle": "Git 三大平行宇宙狀態演進與時光倒流防禦流水線",
    "resultTitle": "Git 平行宇宙模擬器、CLI 指令手冊與時間軸逐字稿工作台",
    "flowImage": make_svg_diagram(
        "Git 三大平行宇宙與時光倒流流水線",
        "Working Dir (工作區) -> git add (暫存區) -> git commit (儲存庫) -> git push (遠端)",
        [
            {"num": "GIT-1", "title": "工作區域", "sub": "AI 產出代碼編輯修改", "tag": "Workspace"},
            {"num": "GIT-2", "title": "暫存打包", "sub": "git add 標記關鍵快照", "tag": "Staging"},
            {"num": "GIT-3", "title": "永久封存", "sub": "git commit 鑄造版本節點", "tag": "Repository"},
            {"num": "GIT-4", "title": "分支平行", "sub": "git branch 探索新功能", "tag": "Branching"},
            {"num": "GIT-5", "title": "時光回溯", "sub": "git checkout/reset 救援", "tag": "Rollback"}
        ],
        loop_label="Vibe Coding 必備安全網：以 Commit 為錨點，大膽讓 AI 重構，改壞一鍵穿梭時空還原",
        accent="#f97316"
    ),
    "resultImage": "Vibe Coding/05.版本控管/Vibe Coding必學的版本控制：從零搞懂 Git！｜Kelly Tsai.html",
    "slideUrl": "Vibe Coding/05.版本控管/Vibe Coding必學的版本控制：從零搞懂 Git！｜Kelly Tsai.html",
    "objective": "1. 徹底理解 Git 的本質：分散式版本控制系統與「平行宇宙快照」模型。\n2. 掌握「工作區 ➔ 暫存區 (Stage) ➔ 本地儲存庫 (Repo)」三部曲與核心指令 (status, add, commit, log, branch, merge)。\n3. 熟練掌握時光倒流技巧 (checkout / reset) 與 VPS 伺服器上的安全隔離防禦措施，為 AI 生成代碼打造穩固防線。",
    "tutorialSteps": [
        {
            "step": "步驟 1: 體會 Git 的必要性 — 終結「final_v2_final_真的不改了.zip」",
            "description": "理解在 AI 協同開發時，高頻率的代碼變更若無版本控制將導致災難性的覆蓋與混亂。"
        },
        {
            "step": "步驟 2: 操作「三個平行宇宙」互動模擬器",
            "description": "透過視覺化節點即時觀察 git add 將檔案推入暫存區、git commit 生成 SHA-1 快照的記憶體拓撲。"
        },
        {
            "step": "步驟 3: 掌握 Branch 分支與平行宇宙探索",
            "description": "學會為 AI 實驗性重構開闢獨立 feature 分支，確認穩定後再 merge 回 main 主分支，保持生產代碼乾淨。"
        },
        {
            "step": "步驟 4: 實作改壞救援與 VPS 防坑配置",
            "description": "學習使用 git diff 審閱 AI 產出的改動，並掌握意外 commit 敏感檔案時的救援手段與 .gitignore 配置。"
        }
    ],
    "promptTemplate": "你是一位精通 Git 內部原理的資深技術導師兼版本控制教練。\n請依據 Kelly Tsai 的 Git 教學架構，針對一位剛使用 Cursor / Claude Code 的新手：\n1. 請以「三個平行宇宙（工作區、暫存區、本地儲存庫）」比喻，解釋 git status 輸出的紅字 (Untracked) 與綠字 (Changes to be committed)。\n2. 請給出在讓 AI 大規模重構舊專案之前，最推薦執行的「防爆三步驟」Git 指令組合。\n3. 如果 AI 不小心把包含了 API Key 的 .env 檔案 commit 進本地儲存庫，請給予安全移除且保留本地檔案的具體終端機操作指南。",
    "codeSnippet": {
        "language": "bash",
        "code": "# Vibe Coding 必備 Git 每日防禦工作流\n$ git status                 # 檢視當前工作區狀態與變更檔案\n$ git add -p                 # 逐區塊審閱 AI 生成的代碼差異\n$ git commit -m 'feat: 新增安全驗證中介層' # 鑄造清晰語意的版本快照\n\n# 探索 AI 實驗性新功能：開闢安全分支\n$ git checkout -b feat/ai-refactor\n\n# 若 AI 改壞想一鍵還原工作區\n$ git restore .              # 放棄工作區所有未暫存的修改"
    },
    "references": [
        {
            "title": "Vibe Coding 必學的版本控制：從零搞懂 Git！(專屬互動教學頁面)",
            "url": "Vibe Coding/05.版本控管/Vibe Coding必學的版本控制：從零搞懂 Git！｜Kelly Tsai.html",
            "bgColor": "rgba(249, 115, 22, 0.15)",
            "borderColor": "rgba(249, 115, 22, 0.6)",
            "color": "#fb923c",
            "icon": "fa-solid fa-code-branch",
            "badge": "本單元專題"
        },
        {
            "title": "YouTube 官方原片：Kelly Tsai 教學頻道",
            "url": "https://www.youtube.com/watch?v=xDPoBLnyWIo"
        },
        {
            "title": "給非技術人員的 Github 教學，Vibe Coding 必學基礎 (單元 22)",
            "url": "Vibe Coding/05.版本控管/給非技術人員的 Github 教學，Vibe Coding 必學的基礎技能.html"
        },
        {
            "title": "用 AI 寫程式你得懂的 CI/CD？新手一支影片看懂 (單元 23)",
            "url": "Vibe Coding/05.版本控管/用 AI 寫程式你得懂的 CICD？.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-clock-rotate-left",
            "scenario": "AI 產碼改壞快速時空回溯",
            "description": "當 AI 生成的大規模代碼導致系統報錯崩潰時，藉由乾淨的 Commit 節點一秒重設回健康狀態。"
        },
        {
            "icon": "fa-solid fa-code-fork",
            "scenario": "多功能實驗性並行演進",
            "description": "利用 Git 分支讓不同 AI Coding Agent 在各自獨立的 Worktree / 分支推進任務，避免代碼覆蓋衝突。"
        }
    ]
}

# 21：給非技術人員的 Github 教學，Vibe Coding 必學的基礎技能
unit_21_github_nontech = {
    "id": "vibe-github-nontech",
    "labNumber": "21",
    "title": "給非技術人員的 Github 教學，Vibe Coding 必學的基礎技能",
    "shortTitle": "非技術人員的 GitHub 教學",
    "category": "版本控管",
    "date": "2026-11-18",
    "summary": "不懂終端機黑底白字？這堂專為非工程師、產品經理與 Vibe Coding 初學者設計的 GitHub 白話指南！用生動的比喻破解 Git 與 GitHub 的本質差異：Git 是你電腦上的「時光機」，GitHub 則是雲端的「全宇宙圖書館」。圖解「神奇辦公桌 (Branch 分支)」、Pull Request (PR) 審閱機制與衝突解決，搭配點擊即可複製的「AI 白話指令秘笈」與互動測驗，讓你輕鬆與工程團隊及 Coding Agents 協同合作！",
    "flowTitle": "非技術人員 GitHub 雲端協作與 PR 驗收五步工作流",
    "resultTitle": "GitHub 白話實戰教學、AI 溝通指令庫與互動驗收測驗",
    "flowImage": make_svg_diagram(
        "非技術人員 GitHub 雲端協作與驗收流",
        "Local Machine (時光機) -> Push to Cloud (圖書館) -> Branch Table (獨立桌) -> PR Review (審查) -> Merge (合流)",
        [
            {"num": "GH-1", "title": "本機時光機", "sub": "Git 記錄每一次修改歷程", "tag": "Git Local"},
            {"num": "GH-2", "title": "雲端圖書館", "sub": "GitHub 雲端備份與共享", "tag": "GitHub Cloud"},
            {"num": "GH-3", "title": "獨立辦公桌", "sub": "Branch 打造安全沙盒", "tag": "Branching"},
            {"num": "GH-4", "title": "提出審查", "sub": "Pull Request 成果驗收", "tag": "PR Review"},
            {"num": "GH-5", "title": "無縫合流", "sub": "Merge 整合入主幹專案", "tag": "Production"}
        ],
        loop_label="白話協作模式：即使不會下指令，也能指揮 AI 建立分支、提交變更並在 GitHub 完成安全審閱",
        accent="#8b5cf6"
    ),
    "resultImage": "Vibe Coding/05.版本控管/給非技術人員的 Github 教學，Vibe Coding 必學的基礎技能.html",
    "slideUrl": "Vibe Coding/05.版本控管/給非技術人員的 Github 教學，Vibe Coding 必學的基礎技能.html",
    "objective": "1. 搞懂核心隱喻：Git（單機存檔時光機）與 GitHub（全球雲端協作平台）的互補關係。\n2. 理解團隊協作標準流程：Repository 倉庫、Commit 存檔點、Push 上傳、Pull 下載、Branch 分支與 Pull Request (PR)。\n3. 掌握「用大白話向 AI 下達 Git 指令」的具體溝通技巧，在不背指令的情況下完成無痛版本控管與改壞救援。",
    "tutorialSteps": [
        {
            "step": "步驟 1: 建立概念地圖 — 檔案總管 vs 時光機 vs 雲端圖書館",
            "description": "透過生活化圖解釐清為什麼隨手複製資料夾備份會變成災難，而 GitHub 能解決跨裝置同步與協同難題。"
        },
        {
            "step": "步驟 2: 探索「神奇辦公桌」分支哲學",
            "description": "理解 main 分支作為「正式上線展示間」的崇高地位，任何新功能都應在獨立辦公桌 (feature 分支) 雕琢。"
        },
        {
            "step": "步驟 3: 體驗 Pull Request (PR) 驗收與合併",
            "description": "掌握 PR 作為「邀請主管/團隊同仁驗收工作」的正式儀式，學會看懂 Diff 綠色新增與紅色刪除標記。"
        },
        {
            "step": "步驟 4: 使用「AI 白話指令卡」與自我檢測",
            "description": "直接複製專屬 Prompt 讓 AI 幫你執行 add, commit, push 或救援，並完成 5 道實戰測驗鞏固核心觀念。"
        }
    ],
    "promptTemplate": "你是一位超級親切、善於用生活比喻說明的資深軟體工程教練。\n我是一位非技術背景的專案經理 / Vibe Coding 初學者，正在開發一個網站專案：\n1. 請以最通俗白話的文字（嚴禁出現晦澀技術術語），向我解釋什麼是 Pull Request (PR)？為什麼工程師一定要開 PR 不能直接改 main 分支？\n2. 我剛用 Cursor 寫完了一個新功能，請給我一句我可以直接複製貼給 AI Agent 的指令，讓它自動幫我開一個乾淨分支、把改動存檔並上傳到 GitHub。\n3. 如果我想在 GitHub 介面上預覽改動並確認沒問題再合併，我應該點擊哪些按鈕？請條列圖文步驟說明。",
    "codeSnippet": {
        "language": "markdown",
        "code": "# 非技術人員專用：讓 AI 幫你操作 Git 的白話提示詞\n\n「AI，我剛做好了導航列美化功能：\n1. 請幫我建立一個名為 `feat/navbar-style` 的新分支。\n2. 把目前修改的所有 CSS 與 HTML 檔案加入暫存並存檔 (Commit)。\n3. 提交訊息請寫：`feat: 美化頂部導航列樣式與手機選單`。\n4. 自動推送到遠端 GitHub 儲存庫，並告訴我開 PR 的網址！」"
    },
    "references": [
        {
            "title": "給非技術人員的 Github 教學，Vibe Coding 必學基礎 (專屬互動頁面)",
            "url": "Vibe Coding/05.版本控管/給非技術人員的 Github 教學，Vibe Coding 必學的基礎技能.html",
            "bgColor": "rgba(139, 92, 246, 0.15)",
            "borderColor": "rgba(139, 92, 246, 0.6)",
            "color": "#a78bfa",
            "icon": "fa-brands fa-github",
            "badge": "本單元專題"
        },
        {
            "title": "YouTube 官方原片：非技術人員 GitHub 指南",
            "url": "https://www.youtube.com/watch?v=atqcAb7MFAM"
        },
        {
            "title": "Vibe Coding 必學的版本控制：從零搞懂 Git！(單元 21)",
            "url": "Vibe Coding/05.版本控管/Vibe Coding必學的版本控制：從零搞懂 Git！｜Kelly Tsai.html"
        },
        {
            "title": "用 AI 寫程式你得懂的 CI/CD？新手一支影片看懂 (單元 23)",
            "url": "Vibe Coding/05.版本控管/用 AI 寫程式你得懂的 CICD？.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-users",
            "scenario": "跨職能團隊與非工程人員協作",
            "description": "讓 PM、設計師與業務人員能看懂 GitHub PR、參與驗收測試，並利用網頁介面即時提問與審閱改動。"
        },
        {
            "icon": "fa-solid fa-cloud-arrow-up",
            "scenario": "個人專案雲端備份與多裝置同步",
            "description": "告別隨身碟拷貝代碼，學會利用 GitHub 託管私有倉庫，在家中電腦與筆電之間無痛同步 Vibe Coding 進度。"
        }
    ]
}

# 22：用 AI 寫程式你得懂的 CI/CD？新手一支影片看懂
unit_22_cicd_gary = {
    "id": "vibe-cicd-gary",
    "labNumber": "22",
    "title": "用 AI 寫程式你得懂的 CI/CD？新手一支影片看懂 (自動化軟體工廠指南)",
    "shortTitle": "新手看懂 CI/CD 自動化工廠",
    "category": "版本控管",
    "date": "2026-11-18",
    "summary": "當你用 Claude Code 或 Cursor 開心地寫功能、開了 PR 卻看見黃燈在轉「等待 CI 檢查」時，背後到底發生了什麼？精選知名技術頻道 Gary Chen 重磅教學。用現代汽車組裝工廠為喻，深入淺出拆解 CI (持續整合) 與 CD (持續交付/部署) 的底層機制。涵蓋 5 步驟自動化流水線 (Build ➔ Unit Test ➔ Static Analysis ➔ Staging ➔ Deploy)、三道必備品管關卡、PR 門禁與主幹防禦策略，並提供 GitHub Actions 完整範本與時間軸逐字稿，助你打造不會被 AI 改壞的鋼鐵防線！",
    "flowTitle": "CI/CD 自動化軟體工廠 5 步驟品管與雙層防禦流水線",
    "resultTitle": "CI/CD 互動式流水線工作台、GitHub Actions 範本與時間軸逐字稿",
    "flowImage": make_svg_diagram(
        "CI/CD 自動化品管與部署流水線",
        "Code Push -> Lint & Build -> Unit Tests -> Security Scan -> Deploy",
        [
            {"num": "CI-1", "title": "代碼觸發", "sub": "開發者推送至 GitHub PR", "tag": "Trigger"},
            {"num": "CI-2", "title": "編譯建置", "sub": "驗證依賴與基本語法完整", "tag": "Build"},
            {"num": "CI-3", "title": "自動測試", "sub": "單元測試防止打地鼠噩夢", "tag": "Test"},
            {"num": "CD-1", "title": "靜態分析", "sub": "SonarQube/資安漏洞掃描", "tag": "Analysis"},
            {"num": "CD-2", "title": "自動部署", "sub": "綠燈放行至 Staging/Prod", "tag": "Deploy"}
        ],
        loop_label="品質防線心法：讓機器人替你做枯燥繁重的品管檢查，人在安全護欄內享受極速 Vibe Coding",
        accent="#0ea5e9"
    ),
    "resultImage": "Vibe Coding/05.版本控管/用 AI 寫程式你得懂的 CICD？.html",
    "slideUrl": "Vibe Coding/05.版本控管/用 AI 寫程式你得懂的 CICD？.html",
    "objective": "1. 掌握 CI/CD 的核心定義：CI (持續整合) 負責頻繁驗證品質，CD (持續交付/部署) 負責自動化發布交付。\n2. 深入理解五大流水線步驟：代碼推送 ➔ 自動編譯 ➔ 單元測試 ➔ 靜態程式碼分析 ➔ 自動化部屬。\n3. 學會配置 GitHub Actions 工作流程與 PR 阻擋門禁，徹底終結「改好 A 功能、改壞 B 功能」的打地鼠迴圈。",
    "tutorialSteps": [
        {
            "step": "步驟 1: 體會為什麼需要 CI/CD — 告別「改好 A、改壞 B」的打地鼠噩夢",
            "description": "以生活化案例解析手動測試的遺漏死角，理解自動化迴歸測試為何是 AI 時代最重要的品質護照。"
        },
        {
            "step": "步驟 2: 拆解 CI/CD 五大流水線步驟 (Pipeline)",
            "description": "深入流水線各節點職責：代碼檢出、語法檢查 (Linting)、單元測試 (Unit Tests)、程式碼覆蓋率與建置產物生成。"
        },
        {
            "step": "步驟 3: 建立雙層防禦體系 — PR 門禁與主幹防線",
            "description": "學習在 GitHub 設定分支保護規則 (Branch Protection Rule)，測試未亮綠燈前強制禁止合併入 main。"
        },
        {
            "step": "步驟 4: 實作專屬 GitHub Actions 自動化腳本",
            "description": "研讀專為 Node.js / Web 專案打造的 .github/workflows/ci.yml 實戰範本，並掌握失敗日誌的快速排查技巧。"
        }
    ],
    "promptTemplate": "你是一位頂尖的 DevOps 專家與雲端架構師。\n我們團隊正在進行 Vibe Coding 轉型，經常使用 AI 生成代碼，急需建立現代化的 CI/CD 品質護欄：\n1. 請以「現代汽車品管流水線」為比喻，向團隊解釋為什麼每一次 PR 都必須通過 CI 檢查？\n2. 請為我們由 Node.js + HTML/JS 前端構成的專案，撰寫一份高效的 GitHub Actions (.github/workflows/ci.yml) 設定檔，必須包含：依賴快取、ESLint 語法檢查、Jest 單元測試以及測試覆蓋率報告。\n3. 請說明當 CI 流水線亮紅燈時，開發者應該如何快速查看 Action 日誌，並引導 AI Agent 正確修復失敗的測試。",
    "codeSnippet": {
        "language": "yaml",
        "code": "# 現代化 CI/CD 流水線配置範例 (.github/workflows/ci.yml)\nname: Vibe CI/CD Pipeline\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  quality-gate:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n          cache: 'npm'\n      - run: npm ci\n      - run: npm run lint           # 第一道關卡：語法與風格檢查\n      - run: npm test -- --coverage # 第二道關卡：單元測試全綠\n      - run: npm run build          # 第三道關卡：生產打包建置"
    },
    "references": [
        {
            "title": "用 AI 寫程式你得懂的 CI/CD？新手看懂自動化工廠 (專屬全景互動頁面)",
            "url": "Vibe Coding/05.版本控管/用 AI 寫程式你得懂的 CICD？.html",
            "bgColor": "rgba(14, 165, 233, 0.15)",
            "borderColor": "rgba(14, 165, 233, 0.6)",
            "color": "#38bdf8",
            "icon": "fa-solid fa-gears",
            "badge": "本單元專題"
        },
        {
            "title": "YouTube 官方原片：Gary Chen 教學頻道",
            "url": "https://www.youtube.com/watch?v=aCvEYczBVSY"
        },
        {
            "title": "Vibe Coding 必學的版本控制：從零搞懂 Git！(單元 21)",
            "url": "Vibe Coding/05.版本控管/Vibe Coding必學的版本控制：從零搞懂 Git！｜Kelly Tsai.html"
        },
        {
            "title": "給非技術人員的 Github 教學，Vibe Coding 必學基礎 (單元 22)",
            "url": "Vibe Coding/05.版本控管/給非技術人員的 Github 教學，Vibe Coding 必學的基礎技能.html"
        }
    ],
    "applications": [
        {
            "icon": "fa-solid fa-shield-virus",
            "scenario": "AI 產碼自動化回歸測試與打地鼠防禦",
            "description": "在 AI 狂飆產出代碼的同時，自動化單元測試在每次提交時即刻驗證，防止悄悄改壞既有核心業務邏輯。"
        },
        {
            "icon": "fa-solid fa-rocket",
            "scenario": "無痛零停機自動化發布與部署",
            "description": "代碼通過 PR 審閱並合併至 main 主幹後，自動化觸發 GitHub Pages 或雲端容器部屬，大幅縮短交付週期。"
        }
    ]
}

vibe_labs = [
    unit_01_captain_dev,
    unit_01_grill_me,
    unit_02_sdd_bdd_tdd,
    unit_03_evolution,
    unit_04_meteor_fall,
    unit_05_guide,
    unit_06_claude,
    unit_07_google,
    unit_08_uml_blueprint,
    unit_09_uml_advanced,
    unit_value_shift_spec_arch_verify,
    unit_engineer_skills_sdd_tdd_bdd_ddd,
    unit_10_openspec,
    unit_11_opsx_guide,
    unit_12_superpowers,
    unit_13_reverse_engineering,
    unit_14_rea,
    unit_15_team_dev_guide,
    unit_16_team_dev_transcript,
    unit_17_team_dev_transcript_interactive,
    unit_18_ost_vibe_coding,
    unit_modern_web_guidance,
    unit_legendary_engineers_ai,
    unit_20_git_kelly,
    unit_21_github_nontech,
    unit_22_cicd_gary
]

# 自動依序重新編號所有單元 labNumber，確保 01, 02, 03 ... 完全連續且零填充
for idx, lab in enumerate(vibe_labs, 1):
    lab["labNumber"] = f"{idx:02d}"

# 寫入 vibecoding.json
out_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(out_dir, 'vibecoding.json'), 'w', encoding='utf-8') as f:
    json.dump(vibe_labs, f, ensure_ascii=False, indent=2)

# 寫入 vibecodingData.js
js_content = "// Vibe Coding 專區資料庫 (包含軟體工程、Skills(技能)、其他三大主題，支援 Google 課程群組與子群組)\nwindow.INITIAL_VIBE_DATA = " + json.dumps(vibe_labs, ensure_ascii=False, indent=2) + ";\n"
with open(os.path.join(out_dir, 'vibecodingData.js'), 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"成功更新資料結構，包含新單元 01 Grill Me，其餘順延！共保留 {len(vibe_labs)} 個單元。")


