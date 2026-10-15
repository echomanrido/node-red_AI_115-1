# -*- coding: utf-8 -*-
import json
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

# 02：Vibe Coding 與新世代 AI 原生軟體工程權威指南
unit_02_guide = {
    "id": "vibe-guide",
    "labNumber": "02",
    "title": "Vibe Coding 與新世代 AI 原生軟體工程 (AI-Native SDLC 權威指南)",
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
            "title": "軟體工程演進全景圖",
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

# 01：軟體工程演進全景圖
unit_01_evolution = {
    "id": "vibe-01",
    "labNumber": "01",
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

# 順延為 03：Anthropic Claude AI-Native SDLC
unit_03_claude = {
    "id": "vibe-02",
    "labNumber": "03",
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

# 順延為 04：Google 5-Day 全系列母群組
unit_04_google = {
    "id": "vibe-google-course",
    "labNumber": "04",
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

# 05：Vibe Coding × UML (一)：以 UML 藍圖鎖定架構
unit_05_uml_blueprint = {
    "id": "vibe-uml-blueprint",
    "labNumber": "05",
    "title": "軟體工程：Vibe Coding × UML (一)：以 UML 藍圖鎖定架構，釋放 AI 創意",
    "shortTitle": "Vibe Coding × UML 藍圖架構",
    "category": "軟體工程",
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

# 06：Vibe Coding × UML (二)：14 種圖表全覽與規範 AI 的程式靈魂
unit_06_uml_advanced = {
    "id": "vibe-uml-14-types",
    "labNumber": "06",
    "title": "軟體工程：Vibe Coding × UML (二)：14 種圖表全覽與規範 AI 的程式靈魂",
    "shortTitle": "UML 14種圖表全覽與規範 AI",
    "category": "軟體工程",
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

# 07：OpenSpec (opsx) 指南：AI 規格驅動開發
unit_07_openspec = {
    "id": "vibe-openspec",
    "labNumber": "07",
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

# 08：OpenSpec SDD 軟體開發生命週期指南：5大核心指令與檔案生成全解析
unit_08_opsx_guide = {
    "id": "vibe-opsx-lifecycle",
    "labNumber": "08",
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

# 09：Superpowers 軟體工程 Agent 工作流規範
unit_09_superpowers = {
    "id": "vibe-superpowers",
    "labNumber": "09",
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

# 10：傳統逆向工程與核心工具解析
unit_10_reverse_engineering = {
    "id": "vibe-reverse-engineering-traditional",
    "labNumber": "10",
    "title": "逆向工程：傳統逆向工程與核心工具解析：Detect It Easy、IDA Pro 與 Ghidra 實戰指南",
    "shortTitle": "逆向工程：傳統工具 (DIE/IDA/Ghidra)",
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

# 11：REA (Reverse Engineer Anything)
unit_11_rea = {
    "id": "vibe-reverse-engineering-rea",
    "labNumber": "11",
    "title": "逆向工程：REA (Reverse Engineer Anything)：AI 智能體逆向工程協議與實戰指南",
    "shortTitle": "逆向工程：REA 智能體",
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

# 12：AI Coding 新時代的團隊開發
unit_12_team_dev = {
    "id": "vibe-ai-coding-team-dev",
    "labNumber": "12",
    "title": "團隊開發：AI Coding 新時代的團隊開發：從個人用 AI 到 AI-Native 組織 (陳宜昌 YC 演講精粹)",
    "shortTitle": "AI Coding 新時代的團隊開發",
    "category": "其他",
    "subCategory": "團隊開發",
    "date": "2026-10-15",
    "summary": "改編自陳宜昌 (YC / Nova AI 創辦人) 於 HWDC 2026 的震撼演講。全方位解構 AI Coding 三大進階層次：Level 1 個人 AI 賦能、Level 2 Agentic Workflow 協同、Level 3 AI-Native 組織重構。深入探討組織架構三大黃金法則：徹底劃分「人組成決策團隊、Agent 組成執行團隊」、原型期「三大關卡」防線，以及為什麼「Spec 是鷹架不是藍圖」！本單元亦附完整演講時間軸與逐字稿索引。",
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
            "title": "AI Coding 新時代的團隊開發：實戰教學指南 (互動專題頁面)",
            "url": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發.html"
        },
        {
            "title": "陳宜昌 YC 演講時間軸與完整逐字稿紀要",
            "url": "Vibe Coding/03.其他/AI Coding 新時代的團隊開發/AI Coding 新時代的團隊開發_逐字稿.html"
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

vibe_labs = [
    unit_01_evolution,
    unit_02_guide,
    unit_03_claude,
    unit_04_google,
    unit_05_uml_blueprint,
    unit_06_uml_advanced,
    unit_07_openspec,
    unit_08_opsx_guide,
    unit_09_superpowers,
    unit_10_reverse_engineering,
    unit_11_rea,
    unit_12_team_dev
]

# 寫入 vibecoding.json
with open('vibecoding.json', 'w', encoding='utf-8') as f:
    json.dump(vibe_labs, f, ensure_ascii=False, indent=2)

# 寫入 vibecodingData.js
js_content = "// Vibe Coding 專區資料庫 (包含軟體工程、Skills(技能)、其他三大主題，支援 Google 課程群組與子群組)\nwindow.INITIAL_VIBE_DATA = " + json.dumps(vibe_labs, ensure_ascii=False, indent=2) + ";\n"
with open('vibecodingData.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"成功更新資料結構，包含新 12 AI Coding 新時代的團隊開發！共保留 {len(vibe_labs)} 個單元。")

