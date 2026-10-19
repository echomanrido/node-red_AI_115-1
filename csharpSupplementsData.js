// C# 學習補充教材離線備援資料 (自動根據投影片各議題產生)
// 包含 14 大核心議題，每個步驟均嵌入投影片高解析度截圖與詳細圖說

var INITIAL_CSHARP_SUPPLEMENTS_DATA = [
  {
    "id": "cs-sup-01",
    "supNumber": "01",
    "title": "Visual Studio 2026社群版安裝與 .NET 桌面開發環境配置",
    "date": "2026-08-12",
    "category": "環境建置",
    "summary": "工控 PC-Based 程式開發首選工具 Visual Studio 2026 完整安裝與實戰配置指南。收錄官方 Community 免費下載路徑、工作負載「必選項目」（.NET 桌面開發與 GitHub Copilot）、Epson 工控人機五大版面配置，以及 GitHub Copilot Agent 模式最新實戰技巧。",
    "image": "images_src/csharp_supplements/vs_copilot_chat_guide.png",
    "objective": "1. 掌握 Visual Studio 2026 Community (社群版) 官方免費下載與安裝流程。\n2. 熟記安裝精靈中的工作負載「必選項目」：.NET 桌面開發、GitHub Copilot、GitHub Copilot 應用程式現代化，以及 C++ 桌面擴充。\n3. 精通工控人機介面開發標準五大版面配置：工具箱、設計畫布、方案總管、屬性面板與輸出偵錯視窗。\n4. 掌握 GitHub Copilot Agent 模式、多模型切換 (如 Claude Haiku 4.5) 與自動化提示詞協作技巧。",
    "tutorialSteps": [
      {
        "step": "1. Visual Studio 2026 下載與社群版 (Community) 選擇",
        "description": "前往微軟官方 Visual Studio 下載專區 (https://visualstudio.microsoft.com/zh-hant/downloads/)。在「Visual Studio 2026」產品分類下，選擇「Community (社群版)」點擊「免費下載」。該版本功能強大完整，免費提供給學生、開放原始碼參與者及個人開發者使用。",
        "image": "images_src/csharp_supplements/vs2026_download_community.png",
        "imageCaption": "圖 1：Visual Studio 2026 官方下載頁面，選擇 Community 社群版免費下載"
      },
      {
        "step": "2. GitHub Copilot 現代化 AI 開發功能啟用",
        "description": "Visual Studio 2026 深度整合免費的 GitHub Copilot (https://visualstudio.microsoft.com/zh-hant/github-copilot/)。引入全新的「Agent 模式」，能在背景協調編程步驟、即時因應問題、自動套用跨檔案變更並逐一排查代碼錯誤，大幅提升工控軟體開發效能。",
        "image": "images_src/csharp_supplements/vs2026_copilot_free.png",
        "imageCaption": "圖 2：Visual Studio 中免費的 Copilot 功能介紹與 Agent 模式增強"
      },
      {
        "step": "3. 安裝精靈工作負載「必選項目」完整勾選",
        "description": "啟動 Visual Studio Installer 後，請務必依序確認並勾選以下核心元件：\n• 【必選工作負載】：勾選「.NET 桌面開發」（支援 C#、Visual Basic、WPF、Windows Forms 與主控台應用程式）。\n• 【右側安裝詳細資料】：在「選擇性」清單中，務必勾選「GitHub Copilot」與「GitHub Copilot 應用程式現代化」。\n• 【傳統與原生支援】：建議勾選「使用 C++ 的桌面開發」，便於日後引用或編譯機械手臂、視覺相機與 PLC 原生動態鏈結庫 (DLL)。",
        "image": "images_src/csharp_supplements/vs2026_installer_workloads.png",
        "imageCaption": "圖 3：Visual Studio Installer 必選工作負載與 GitHub Copilot 詳細安裝項目"
      },
      {
        "step": "4. 工控 HMI 系統五大標準版面配置 (IDE Layout)",
        "description": "進入 Visual Studio 後，建議依照工控人機（如 EpsonRobotRC7 專案）配置最順手的五大區塊：\n1. 【左側 - 工具箱 (Toolbox)】：釘選 Windows Forms 控制項（Button, Label, TextBox, CheckBox, ComboBox, DataGridView 等）。\n2. 【中間 - 設計畫布與代碼視窗】：上層切換 FormMain.cs [設計]* 視覺化排版與 FormMain.cs 邏輯代碼。\n3. 【右側 - 方案總管 (Solution Explorer)】：檢視專案結構 (Forms, Models, Services, Program.cs)，並整合「GitHub Copilot 聊天」分頁。\n4. 【右下 - 屬性視窗 (Properties)】：調整所選元件的屬性（如 btnMotorOn 的 Text, TextAlign, BackColor, Font 等）。\n5. 【底部 - 輸出與診斷視窗】：檢視編譯 Output、錯誤清單 (Error List) 與 Copilot 終端機。",
        "image": "images_src/csharp_supplements/vs2026_ide_layout.png",
        "imageCaption": "圖 4：Visual Studio 工控人機 (Epson Robot RC+ 7.0) 標準五大版面配置"
      },
      {
        "step": "5. GitHub Copilot 深度配置與 Agent 模式實戰",
        "description": "點開右側或底部的「GitHub Copilot 聊天」視窗：\n• 【功能選單】：點擊右上角選單可確認「啟用 Copilot 自動補全」、「啟用下一個編輯建議」皆已打勾啟用。\n• 【模式與模型切換】：在輸入框左下角可選擇「Agent 模式」與「互動式」，並可彈性選用最新模型（如 Claude Haiku 4.5、GPT-4o）。\n• 【快速捷徑】：支援一鍵點擊「建立新專案」、「改善 #method 的實作」、「為 #file 中的所有方法撰寫單元測試」，實現人機協同 Vibe Coding。",
        "image": "images_src/csharp_supplements/vs2026_copilot_agent.png",
        "imageCaption": "圖 5：GitHub Copilot Agent 模式設定、自動補全與模型選擇視窗"
      }
    ],
    "applications": [
      {
        "scenario": "快速建立標準化工控軟體架構",
        "description": "藉由 Visual Studio 範本建立標準化目錄結構 (Models, Services, Controls, Forms)，便於產線軟體維護與版本控管。",
        "icon": "fa-solid fa-laptop-code"
      }
    ],
    "aiPrompt": "請以 Markdown 條列式說明：在 Windows 11 環境下配置 Visual Studio 2022/2026 進行工控 C# 開發，最推薦安裝的 5 個核心 NuGet 套件與理由（例如 System.IO.Ports, MQTTnet, NModbus4 等）。",
    "references": [
      {
        "title": "什麼是 Visual Studio 的 GitHub Copilot 對話功能？(官方文檔)",
        "url": "https://learn.microsoft.com/zh-tw/visualstudio/ide/visual-studio-github-copilot-chat?view=vs-2022#ask-questions-in-the-inline-chat-view"
      },
      {
        "title": "Visual Studio 2026 官方下載中心",
        "url": "https://visualstudio.microsoft.com/zh-hant/downloads/"
      },
      {
        "title": "Visual Studio 中的 GitHub Copilot 功能介紹",
        "url": "https://visualstudio.microsoft.com/zh-hant/github-copilot/"
      },
      {
        "title": "Microsoft Learn - .NET 桌面開發與 Windows Forms 建立導覽",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/get-started/create-app-visual-studio"
      }
    ],
    "imageTitle": "Visual Studio GitHub Copilot 對話功能指南",
    "imageLink": "https://learn.microsoft.com/zh-tw/visualstudio/ide/visual-studio-github-copilot-chat?view=vs-2022#ask-questions-in-the-inline-chat-view"
  },
  {
    "id": "cs-sup-02",
    "supNumber": "02",
    "title": "C# 串列埠 SerialPort 參數詳解與防鎖死/超時防護指南",
    "date": "2026-08-15",
    "category": "序列通訊",
    "summary": "深入剖析 RS232 / RS485 實體層通訊關鍵參數（BaudRate, DataBits, Parity, StopBits），以及在 C# 中使用 SerialPort 容易遇到的 UI 卡死、執行緒鎖定與緩衝區溢位問題，提供工業級防禦性程式碼範本。",
    "image": "images_src/csharp_labs/slides/slide_164.png",
    "imageTitle": "SerialPort 串列埠通訊與封包發送架構",
    "imageLink": "https://learn.microsoft.com/zh-tw/dotnet/api/system.io.ports.serialport",
    "objective": "1. 徹底理解波特率 (Baud Rate)、同位檢查位元 (Parity)、資料長度與停止位元的硬體物理意義。\n2. 掌握 ReadTimeout 與 WriteTimeout 設定，防止因現場訊號線脫落導致軟體永久未響應 (Not Responding)。\n3. 學會正確呼叫 DiscardInBuffer() 與 DiscardOutBuffer() 清除歷史殘留雜訊。",
    "tutorialSteps": [
      {
        "step": "1. 引用 System.IO.Ports 命名空間與初始化",
        "description": "在工控程式開頭使用 `using System.IO.Ports;` 引用序列埠命名空間。上位機與 PLC / 感測器端之 BaudRate (9600)、Parity (Even)、DataBits (7)、StopBits (One) 必須完全一致。",
        "image": "images_src/csharp_labs/slides/slide_164.png",
        "imageCaption": "投影片 P.164：SerialPort 引用與 force_Y 輸出指令初始化"
      },
      {
        "step": "2. 設定防卡死超時限制 (Read/Write Timeout)",
        "description": "嚴禁將 ReadTimeout 與 WriteTimeout 設為 Infinite！建議設定為 500 ~ 1000 毫秒，並以 try-catch(TimeoutException) 妥善攔截處理，確保通訊中斷時介面不凍結。",
        "image": "images_src/csharp_labs/slides/slide_165.png",
        "imageCaption": "投影片 P.165：SerialPort 實例化與連線開啟關閉流程"
      },
      {
        "step": "3. Copilot 輔助分析與通訊代碼除錯",
        "description": "善用 AI 工具分析 Y_ON_OFF.txt 指令表與 Click 事件寫入邏輯，驗證通訊位址與暫存器計算正確性。",
        "image": "images_src/csharp_labs/slides/slide_166.png",
        "imageCaption": "投影片 P.166：利用 Copilot 輔助查驗 Y0~Y17 序列通訊控制指令"
      }
    ],
    "applications": [
      {
        "scenario": "高雜訊工廠環境下的序列連線自癒系統",
        "description": "當現場變頻器啟動造成 EMI 干擾產生校驗錯誤時，程式能自動重拋超時並重送請求，連續 3 次失敗才通報實體線路檢修。",
        "icon": "fa-solid fa-shield-virus"
      }
    ],
    "aiPrompt": "請幫我用 C# 編寫一個防鎖死的 SafeSerialPortHelper 封裝類別，包含合理 Timeout (1000ms)、執行緒安全的 SendAndReceiveString 函式，以及安全關閉 (SafeClose) 模式。",
    "references": [
      {
        "title": "Microsoft Learn - System.IO.Ports.SerialPort 最佳實踐",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/api/system.io.ports.serialport"
      }
    ]
  },
  {
    "id": "cs-sup-03",
    "supNumber": "03",
    "title": "三菱 FX 系列 PLC 序列通訊 ASCII 封包協定與 CheckSum 驗證演算法精解",
    "date": "2026-08-18",
    "category": "通訊協定",
    "summary": "三菱 MELSEC-F 系列 (FX1N, FX2N, FX3U) 微型 PLC 程式撰寫埠 (Programming Port) 通訊協議完全解析。圖解 STX/ETX/ENQ 幀格式、資料位址轉換演算法與兩位元 CheckSum 運算推導公式。",
    "image": "images_src/csharp_labs/slides/slide_173.png",
    "imageTitle": "三菱 PLC 序列通訊協定封包格式與 CheckSum 演算圖解",
    "imageLink": "https://www.mitsubishielectric.tw/",
    "objective": "1. 掌握三菱 FX 序列協定的核心控制字元：STX (0x02)、ETX (0x03)、CMD 指令碼 ('7' 強制 ON, '8' 強制 OFF)。\n2. 理解實體暫存器定址算法 (Base Address + Offset) 與高低位節組對調規則。\n3. 精通 CheckSum 累加和：(Sum of ASCII bytes) & 0xFF 轉換為雙碼十六進位。",
    "tutorialSteps": [
      {
        "step": "1. 三菱 FX 通訊協定幀格式結構 (Packet Frame)",
        "description": "三菱 FX 編程口協定標準幀由 5 大區塊組成：STX(0x02 起始字元) + CMD(指令碼，如'7'強制置位) + Device Address(裝置位址) + ETX(0x03 結束字元) + 錯誤碼 Checksum(2字元)。",
        "image": "images_src/csharp_labs/slides/slide_173.png",
        "imageCaption": "投影片 P.173：三菱 FX 通訊協定封包組成（STX, CMD, Address, ETX, Checksum）"
      },
      {
        "step": "2. 控制指令碼與 ASCII 編碼運算",
        "description": "封包中的所有位址與指令皆以 ASCII 碼傳輸。例如指令 '7' 對應 0x37，'0' 對應 0x30，藉由標準 ASCII 表可驗證每個 Hex 碼的數值。",
        "image": "images_src/csharp_labs/slides/slide_174.png",
        "imageCaption": "投影片 P.174：三菱指令與 ASCII 編碼十六進位對照表"
      },
      {
        "step": "3. PC 與 PLC 封包互動時序與實體信號流程",
        "description": "PC 上位機送出 command 封包後，PLC 底層進行語法檢查與校驗碼比對，若正確則回覆 ACK (0x06)，若錯誤則回覆 NAK (0x15)。",
        "image": "images_src/csharp_labs/slides/slide_185.png",
        "imageCaption": "投影片 P.185：PC 上位機與 PLC 封包交互時序圖 (Example: PC -> PLC)"
      },
      {
        "step": "4. CheckSum 累加和與位元運算公式推導",
        "description": "將 CMD 開始至 ETX 之間所有字元的 ASCII 數值加總，取最後 8 個位元 (`sum & 0xFF`)，轉換成 2 碼大寫十六進位字串作為校驗碼。",
        "image": "images_src/csharp_labs/slides/slide_186.png",
        "imageCaption": "投影片 P.186：CheckSum 累加推導與實體封包演算範例"
      }
    ],
    "applications": [
      {
        "scenario": "自研三菱 PLC 原生通訊驅動程式",
        "description": "擺脫第三方付費軟體授權，直接以純 C# 控制機電設備，毫秒級讀寫 PLC 暫存器。",
        "icon": "fa-solid fa-microchip"
      }
    ],
    "aiPrompt": "請幫我寫一個 C# 控制台程式，示範如何手動計算三菱 FX 系列 PLC 的 CheckSum：給定輸入字串 \"70500\\x03\"，輸出其累加和 CheckSum 雙碼十六進位字串，並附上逐步計算過程說明。",
    "references": [
      {
        "title": "三菱電機 - MELSEC-F 系列通訊手冊",
        "url": "https://www.mitsubishielectric.tw/"
      }
    ]
  },
  {
    "id": "cs-sup-04",
    "supNumber": "04",
    "title": "工控通訊編碼核心：ASCII Code、Hex 十六進位與 Byte2String 位元組轉換",
    "date": "2026-08-20",
    "category": "通訊編碼",
    "summary": "工控底層通訊與串列資料流的靈魂基礎。詳解 ASCII 碼表（0~127 控制字元與可印字元）、十六進位數值轉換 (Convert.ToInt32)、字元累加校驗與 Byte 陣列轉 Hex 字串 (Byte2String) 實作技術。",
    "image": "images_src/csharp_labs/slides/slide_155.png",
    "imageTitle": "工控 ASCII Code 表與通訊編碼查詢系統",
    "imageLink": "https://learn.microsoft.com/zh-tw/dotnet/api/system.convert.toint32",
    "objective": "1. 熟記工控常用 ASCII 控制字元：STX(2), ETX(3), ACK(6), LF(10), CR(13), NAK(21)。\n2. 掌握 C# 中字元 (char) 與整數 (int) 的隱含轉換與 ASCII 查詢機制。\n3. 熟練運用 Convert.ToInt32(str, 16) 與 Byte2String 位元組格式化輸出。",
    "tutorialSteps": [
      {
        "step": "1. ASCII Code 編碼查詢與 KeyPress 事件結合",
        "description": "利用 KeyPressEventArgs 中的 KeyChar 取得按鍵字元，將其轉型為 (int)e.KeyChar 即可查出對應的 ASCII 碼值。",
        "image": "images_src/csharp_labs/slides/slide_155.png",
        "imageCaption": "投影片 P.155：ASCII Code 查詢介面與微軟官方文檔說明"
      },
      {
        "step": "2. Convert.ToInt32 進位轉換與 CheckSum 運算",
        "description": "運用 `Convert.ToInt32(hexStr, 16)` 可快速將十六進位文字轉為整數數值，支援任意 2~36 進位解析。",
        "image": "images_src/csharp_labs/slides/slide_158.png",
        "imageCaption": "投影片 P.158：ToInt32 進位轉換與 CheckSum 校驗演算法"
      },
      {
        "step": "3. CheckSum_Char 字元陣列逐碼累加演算法",
        "description": "將待校驗字串拆解為字元陣列，以迴圈逐碼累加其 ASCII 數值，取低 8 位元並格式化輸出。",
        "image": "images_src/csharp_labs/slides/slide_162.png",
        "imageCaption": "投影片 P.162：CheckSum_Char 字元累加運算邏輯"
      },
      {
        "step": "4. Byte2String 位元組緩衝區轉十六進位字串",
        "description": "通訊接收緩衝區 `byte[]` 透過迴圈呼叫 `b.ToString(\"X2\")` 串接成 Hex 字串，便於在介面上即時呈現原始封包進行除錯。",
        "image": "images_src/csharp_labs/slides/slide_163.png",
        "imageCaption": "投影片 P.163：Byte2String 位元組陣列轉 Hex 字串實作"
      }
    ],
    "applications": [
      {
        "scenario": "串列通訊封包監聽與通訊協定分析儀",
        "description": "上位機即時攔截硬體通訊封包，將原始 Byte 流轉換為清晰的 Hex 與 ASCII 碼，快速揪出校驗碼錯誤。",
        "icon": "fa-solid fa-barcode"
      }
    ],
    "aiPrompt": "請以 C# 撰寫一個 ByteArrayToHexHelper 類別，提供 Byte2HexString(byte[] buffer) 與 HexStringToByteArray(string hex) 雙向互轉方法，並包含空白分隔排版功能。",
    "references": [
      {
        "title": "Microsoft Learn - Convert.ToInt32 方法說明",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/api/system.convert.toint32"
      }
    ]
  },
  {
    "id": "cs-sup-05",
    "supNumber": "05",
    "title": "WinForms 多執行緒管理：作業系統 Process、Thread 執行緒與 ProcessThreadView 觀測",
    "date": "2026-08-22",
    "category": "作業系統與多執行緒",
    "summary": "打造 24 小時不當機工控人機的底層心法。深入剖析 Windows 作業系統之行程 (Process) 與執行緒 (Thread) 架構，使用工作管理員與 ProcessThreadView 工具動態觀測 CPU 核心分配、執行緒切換與記憶體佔用。",
    "image": "images_src/csharp_labs/slides/slide_233.png",
    "imageTitle": "Windows 工作管理員行程與多執行緒運作觀測",
    "imageLink": "https://learn.microsoft.com/zh-tw/windows/win32/procthread/processes-and-threads",
    "objective": "1. 理解作業系統行程 (Process) 與執行緒 (Thread) 的層級架構與資源分配。\n2. 掌握 ProcessThreadView 與工作管理員實用技巧，快速揪出無窮迴圈或死結執行緒。\n3. 學會避免在 UI 主執行緒執行耗時運算，確保人機介面維持 60 FPS 順暢反應。",
    "tutorialSteps": [
      {
        "step": "1. Windows 工作管理員行程詳細資料剖析",
        "description": "開啟工作管理員，觀察 C# 程式的 PID、CPU 使用率、記憶體 Working Set 與執行緒數量 (Threads)，評估軟體健康度。",
        "image": "images_src/csharp_labs/slides/slide_233.png",
        "imageCaption": "投影片 P.233：Windows 工作管理員與工控軟體行程監控"
      },
      {
        "step": "2. 使用 ProcessThreadView 深度觀測執行緒狀態",
        "description": "透過微軟 Sysinternals 工具 ProcessThreadView 檢視每個 Thread 的 ID、優先權 (Priority)、上下文切換 (Context Switch) 與呼叫堆疊，精確排查卡死位置。",
        "image": "images_src/csharp_labs/slides/slide_234.png",
        "imageCaption": "投影片 P.234：ProcessThreadView 專業執行緒觀測工具實戰"
      }
    ],
    "applications": [
      {
        "scenario": "工控人機軟體效能瓶頸快篩",
        "description": "當現場人機介面出現點擊無反應時，工程師能快速開啟執行緒分析工具，釐清是通訊死結還是大量 GDI 重繪阻塞主執行緒。",
        "icon": "fa-solid fa-microchip"
      }
    ],
    "aiPrompt": "請以 Markdown 說明：在 C# WinForms 工控人機開發中，UI 主執行緒 (STA Thread) 與背景工作執行緒 (Background Thread) 的分工架構，以及如何利用 ProcessThreadView 診斷執行緒凍結問題。",
    "references": [
      {
        "title": "Microsoft Learn - 行程與執行緒概觀",
        "url": "https://learn.microsoft.com/zh-tw/windows/win32/procthread/processes-and-threads"
      }
    ]
  },
  {
    "id": "cs-sup-06",
    "supNumber": "06",
    "title": "程式除錯核心技巧：Call Stack 呼叫堆疊、區域變數 (Locals) 與自動變數 (Autos) 監看式",
    "date": "2026-08-25",
    "category": "除錯技術",
    "summary": "掌握專業工程師的偵錯神技！深入剖析 Visual Studio 偵錯器的 Call Stack (呼叫堆疊) 回溯路徑、Autos (自動變數) 與 Locals (區域變數) 視窗，精準捕捉變數狀態異常與程式崩潰根源。",
    "image": "images_src/csharp_labs/slides/slide_250.png",
    "imageTitle": "Visual Studio 呼叫堆疊 (Call Stack) 與偵錯視窗架構",
    "imageLink": "https://learn.microsoft.com/zh-tw/visualstudio/debugger/autos-and-locals-windows?view=vs-2022",
    "objective": "1. 熟練使用 F9 (設定中斷點)、F10 (不進入逐步執行)、F11 (進入逐步執行) 進行程式追蹤。\n2. 深入理解「自動變數」視窗在目前陳述式周圍變數的動態監看能力。\n3. 學會透過「呼叫堆疊 (Call Stack)」回溯函式調用鏈，快速找出例外拋出的最初源頭。",
    "tutorialSteps": [
      {
        "step": "1. 自動變數 (Autos) 與 區域變數 (Locals) 差異比較",
        "description": "「自動變數」只顯示目前程式碼行附近被使用的變數；「區域變數」則列出目前方法範圍內的所有變數。掌握兩者能大幅提升除錯效率。",
        "image": "images_src/csharp_labs/slides/slide_220.png",
        "imageCaption": "投影片 P.220：Visual Studio 自動變數與區域變數視窗功能說明"
      },
      {
        "step": "2. 中斷點設定與變數即時值監看",
        "description": "在迴圈或條件式行號左側點擊設定紅點中斷點，程式暫停時將滑鼠懸停於變數上方即可即時檢視數值，並可在 Locals 視窗手動修改數值進行假設驗證。",
        "image": "images_src/csharp_labs/slides/slide_226.png",
        "imageCaption": "投影片 P.226：中斷點停駐與區域變數即時監控"
      },
      {
        "step": "3. Call Stack (呼叫堆疊) 回溯調用鏈",
        "description": "當程式遭遇 NullReferenceException 或未預期例外時，雙擊 Call Stack 中的上層函式名稱即可瞬間回到調用源頭，精準重現當下參數狀態。",
        "image": "images_src/csharp_labs/slides/slide_250.png",
        "imageCaption": "投影片 P.250：Call Stack 呼叫堆疊回溯與調用階層剖析"
      }
    ],
    "applications": [
      {
        "scenario": "複雜工控多層方法呼叫中的異常定位",
        "description": "在多重階層的 SCADA 配方下發演算法中，透過 Call Stack 10 秒內精準鎖定是哪一層呼叫傳入了無效的暫存器索引值。",
        "icon": "fa-solid fa-bug"
      }
    ],
    "aiPrompt": "請列出 Visual Studio 偵錯工控 C# 程式的 5 大核心視窗與快捷鍵技巧（中斷點、逐行除錯、Call Stack、Locals、Immediate Window），並提供實際除錯情境範例。",
    "references": [
      {
        "title": "Microsoft Learn - 在 Visual Studio 中使用自動和區域變數視窗",
        "url": "https://learn.microsoft.com/zh-tw/visualstudio/debugger/autos-and-locals-windows?view=vs-2022"
      }
    ]
  },
  {
    "id": "cs-sup-07",
    "supNumber": "07",
    "title": "ILSpy 逆向工程：.NET 中介語言 (IL) 與反編譯實戰",
    "date": "2026-08-28",
    "category": "逆向工程",
    "summary": "揭開 .NET 程式編譯後的真實面貌。解析 C# 原始碼編譯為 MSIL (IL 中介語言) 的過程，以及 JIT 即時編譯器的運作；使用開源神器 ILSpy 載入 dll / exe 反編譯還原高階 C# 語法，強化軟體智財防護與第三方庫逆向分析能力。",
    "image": "images_src/csharp_labs/slides/slide_232.png",
    "imageTitle": "ILSpy 反編譯器解析 .NET 程式集與中介語言",
    "imageLink": "https://github.com/icsharpcode/ILSpy",
    "objective": "1. 理解 C# -> MSIL (中介語言) -> 原生機器碼 (Native Machine Code) 的編譯流水線。\n2. 掌握開源工具 ILSpy 的操作方法，學會讀取第三方 DLL 類別結構與私有方法。\n3. 認識混淆器 (Obfuscator) 概念，防止工控專利配方演算法被輕易逆向反編譯。",
    "tutorialSteps": [
      {
        "step": "1. 什麼是 .NET 中介語言 (IL)？",
        "description": "C# 編譯後產生的並非 CPU 直接執行的二進位機器碼，而是跨平台的 IL (Intermediate Language) 指令，由 .NET CLR 在運行時透過 JIT 編譯器轉為機器碼。",
        "image": "images_src/csharp_labs/slides/slide_228.png",
        "imageCaption": "投影片 P.228：.NET 編譯流程與反編譯可行性原理"
      },
      {
        "step": "2. 無原始碼環境下的反編譯除錯實戰",
        "description": "當廠商僅提供 compiled dll 且文檔不全時，工程師可直接將其拖入 ILSpy，完整檢視內部 classes、methods 與 enum 定義。",
        "image": "images_src/csharp_labs/slides/slide_230.png",
        "imageCaption": "投影片 P.230：若無原始碼時可使用反編譯工具檢視內部實作"
      },
      {
        "step": "3. 使用 ILSpy 導出還原專案原始碼",
        "description": "ILSpy 支援一鍵將整組 Assembly 另存為 C# Project，甚至可分析 Lambda、async-await 狀態機背後的底層生成程式碼。",
        "image": "images_src/csharp_labs/slides/slide_232.png",
        "imageCaption": "投影片 P.232：ILSpy 操作介面與反編譯 C# 類別實例"
      }
    ],
    "applications": [
      {
        "scenario": "老舊機台通訊 DLL 逆向分析與現代化改寫",
        "description": "原廠倒閉失聯且無原始碼的情況下，透過 ILSpy 逆向解析出通訊通訊協定細節，成功改寫為現代化 .NET 8 跨平台服務。",
        "icon": "fa-solid fa-code-compare"
      }
    ],
    "aiPrompt": "請解釋 .NET 中介語言 (IL) 與 JIT 編譯器的運作機制，並說明工控軟體廠商如何透過程式碼混淆 (Obfuscation) 保護智慧財產權不被 ILSpy 逆向。",
    "references": [
      {
        "title": "ILSpy 官方開源專案 (GitHub)",
        "url": "https://github.com/icsharpcode/ILSpy"
      }
    ]
  },
  {
    "id": "cs-sup-08",
    "supNumber": "08",
    "title": "工控 Web Server、Socket 網路通訊架構與 Wireshark 抓包分析",
    "date": "2026-08-30",
    "category": "網路通訊",
    "summary": "將工控人機升級為支援平板與跨平台瀏覽器監控的 Web SCADA！深入解析 Socket bind() / listen() / accept() / recv() 底層通訊時序，並運用網路分析神器 Wireshark 監聽封包、設定過濾條件進行即時診斷。",
    "image": "images_src/csharp_labs/slides/slide_199.png",
    "imageTitle": "工控內嵌 Web Server 與 Socket 通訊架構圖解",
    "imageLink": "https://learn.microsoft.com/zh-tw/dotnet/framework/network-programming/socket-code-examples",
    "objective": "1. 掌握 TCP Socket 伺服器五大生命週期：socket() -> bind() -> listen() -> accept() -> recv()/send()。\n2. 理解瀏覽器 Client 發送 HTTP GET 請求與工控 Server 回應 HTML/JSON 的封包格式。\n3. 學會使用 Wireshark 監聽特定 Port (如 8080)，過濾並解析工控傳輸數據。",
    "tutorialSteps": [
      {
        "step": "1. 瀏覽器 Client 與工控 Web Server 架構",
        "description": "工控機於背景建立監聽 Socket (Port 8080)，手機或平板在相同局域網輸入 `http://192.168.1.100:8080` 即可接收人機狀態與控制指令。",
        "image": "images_src/csharp_labs/slides/slide_199.png",
        "imageCaption": "投影片 P.199：Client 瀏覽器與工控 Web Server 通訊架構"
      },
      {
        "step": "2. Socket 底層 API 連線生命週期時序",
        "description": "bind() 綁定 IP 與 Port、listen() 進入監聽佇列、accept() 接受客戶端連線並生成通訊 Socket、recv() 讀取請求、close() 關閉釋放資源。",
        "image": "images_src/csharp_labs/slides/slide_200.png",
        "imageCaption": "投影片 P.200：Socket 通訊函式呼叫順序 (bind, listen, accept, recv, close)"
      },
      {
        "step": "3. Wireshark 網路抓包與通訊協定分析",
        "description": "啟動 Wireshark 選擇網卡，透過 Filter (如 `tcp.port == 8080`) 隔離出工控連線，檢視 TCP 三向交握 (SYN, SYN-ACK, ACK) 與 HTTP 傳輸內容。",
        "image": "images_src/csharp_labs/slides/slide_206.png",
        "imageCaption": "投影片 P.206：Wireshark 網路封包監聽與分析介面"
      },
      {
        "step": "4. Wireshark Filter 過濾條件設定實戰",
        "description": "運用 Wireshark 語法精準過濾：`ip.addr == 192.168.1.50 && tcp.port == 502` 可精確鎖定目標 PLC 的 Modbus 通訊異常。",
        "image": "images_src/csharp_labs/slides/slide_207.png",
        "imageCaption": "投影片 P.207：Wireshark 篩選器設定與封包追蹤"
      }
    ],
    "applications": [
      {
        "scenario": "產線設備無紙化行動巡檢人機",
        "description": "廠長手持 iPad 掃描機台 QR Code 連入內嵌 Web Server，即時監控射出成型機模具溫度與累計產量。",
        "icon": "fa-solid fa-server"
      }
    ],
    "aiPrompt": "請使用 C# TcpListener 撰寫一個輕量化的 MiniWebServer 類別，監聽 8080 埠，當瀏覽器連入時回傳含有目前機台狀態與溫度的 HTML 頁面，並具備優雅關閉機制。",
    "references": [
      {
        "title": "Wireshark 官方文檔與過濾語法手冊",
        "url": "https://www.wireshark.org/docs/"
      }
    ]
  },
  {
    "id": "cs-sup-09",
    "supNumber": "09",
    "title": "Data URI 與 Base64 圖像串流傳輸原理解析",
    "date": "2026-09-02",
    "category": "影像技術",
    "summary": "將工控人機畫面即時推播至網頁的最強利器！深入解析 Base64 編碼原理（每 3 個 8-bit 位元組轉為 4 個 6-bit 可印字元），以及如何利用 HTML Data URI 語法 `<img src=\"data:image/png;base64,...\" />` 無需建立外部圖檔即可即時串流顯示 SCADA 畫面。",
    "image": "images_src/csharp_labs/slides/slide_204.png",
    "imageTitle": "Base64 編碼原理與 Data URI 圖像傳輸架構",
    "imageLink": "https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Basics_of_HTTP/Data_URLs",
    "objective": "1. 理解 Base64 編碼的數學原理與字元集 (A-Z, a-z, 0-9, +, /)。\n2. 掌握 C# 中 Bitmap 經 MemoryStream 轉為 Base64 字串的高性能做法。\n3. 學會組裝 Data URI 格式，在遠端網頁無縫顯示即時生產畫面。",
    "tutorialSteps": [
      {
        "step": "1. 什麼是 Data URI 格式架構？",
        "description": "Data URI 允許將微型檔案直接內嵌在網頁代碼中，語法：`data:[<mediatype>][;base64],<data>`，避免了額外發送 HTTP 圖片請求的延遲開銷。",
        "image": "images_src/csharp_labs/slides/slide_203.png",
        "imageCaption": "投影片 P.203：Data URI 語法規格與結構說明"
      },
      {
        "step": "2. Base64 編碼原理與 6-bit 映射表",
        "description": "Base64 將 24 個 bits 的二進位資料拆為 4 組 6-bit 索引值，查表轉換為 ASCII 碼，使二進位影像能安全地穿透所有純文字通訊協定。",
        "image": "images_src/csharp_labs/slides/slide_204.png",
        "imageCaption": "投影片 P.204：Base64 8-bit 轉 6-bit 編碼演算法原理"
      },
      {
        "step": "3. 在 HTML 中直接以 Base64 顯示動態圖片",
        "description": "工控伺服器將截圖編碼後送出 `<img src=\"data:image/png;base64,iVBORw0KGgo...\">`，瀏覽器接收後無需發起次級連線即可立即渲染成像。",
        "image": "images_src/csharp_labs/slides/slide_205.png",
        "imageCaption": "投影片 P.205：How to display Base64 images in HTML 實作示範"
      }
    ],
    "applications": [
      {
        "scenario": "SCADA 畫面高頻即時遠端鏡像投影",
        "description": "上位機將 WinForms 畫面定時截圖轉 Base64 透過 WebSocket 推播，中控室大螢幕網頁即時無延遲鏡像顯示產線現況。",
        "icon": "fa-solid fa-file-image"
      }
    ],
    "aiPrompt": "請用 C# 撰寫一個 ImageToBase64Helper 工具類別，包含 BitmapToBase64String(Bitmap bmp) 與 Base64StringToBitmap(string base64) 函式，並加上在 HTML Data URI 中使用的說明範例。",
    "references": [
      {
        "title": "MDN Web Docs - Data URLs 規範",
        "url": "https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Basics_of_HTTP/Data_URLs"
      }
    ]
  },
  {
    "id": "cs-sup-10",
    "supNumber": "10",
    "title": "Microsoft Spy++ 視窗訊息監控與 WinForms 控制代碼 (HWND) 追蹤",
    "date": "2026-09-05",
    "category": "系統工具",
    "summary": "工控視窗通訊與底層整合必備神兵利器！介紹微軟官方 Spy++ 工具的使用技巧，實時追蹤 Windows 視窗代碼 (HWND)、捕捉視窗訊息佇列 (WM_KEYDOWN, WM_PAINT) 與攔截第三方自動化控制項屬性。",
    "image": "images_src/csharp_labs/slides/slide_131.png",
    "imageTitle": "Microsoft Spy++ 視窗代碼追蹤與訊息監視系統",
    "imageLink": "https://learn.microsoft.com/zh-tw/visualstudio/debugger/how-to-start-spy-increment?view=vs-2022",
    "objective": "1. 學會使用 Spy++ 瞄準靶標 (Finder Tool) 鎖定任意視窗取得 HWND 控制代碼。\n2. 理解 Windows 訊息分發機制與 WinForms WndProc 核心處理管線。\n3. 掌握在 Win32 API 中傳送 PostMessage / SendMessage 跨軟體自動化控制。",
    "tutorialSteps": [
      {
        "step": "1. 啟動 Spy++ 與視窗階層樹狀檢視",
        "description": "在 Visual Studio 工具選單啟動 Spy++，檢視作業系統內所有運行中行程的視窗層級 (Parent/Child Windows) 與類別名稱。",
        "image": "images_src/csharp_labs/slides/slide_131.png",
        "imageCaption": "投影片 P.131：Microsoft Spy++ 介面與視窗代號 (HWND) 探索"
      },
      {
        "step": "2. 監聽 KeyPress 與 KeyDown 鍵盤訊息分發",
        "description": "在 Spy++ 勾選 Messages 監聽 WM_CHAR 與 WM_KEYDOWN，印證 WinForms 的 KeyPress 與 KeyDown 事件背後的實體視窗訊息流。",
        "image": "images_src/csharp_labs/slides/slide_132.png",
        "imageCaption": "投影片 P.132：KeyPress 事件與 Windows 鍵盤訊息對照"
      }
    ],
    "applications": [
      {
        "scenario": "封閉式第三方量測儀器軟體自動化觸發",
        "description": "透過 Spy++ 找出老舊光學投影儀軟體之「開始測量」按鈕 HWND，由 C# 自動發送點擊訊息，達成無 API 軟體的自動化整合。",
        "icon": "fa-solid fa-crosshairs"
      }
    ],
    "aiPrompt": "請解釋 Microsoft Spy++ 在 Windows 開發中的主要用途，並提供一段 C# 使用 Win32 API (FindWindow, SendMessage) 向指定 HWND 視窗發送按鈕點擊事件的代碼範例。",
    "references": [
      {
        "title": "Microsoft Learn - Spy++ 檢視器手冊",
        "url": "https://learn.microsoft.com/zh-tw/visualstudio/debugger/how-to-start-spy-increment?view=vs-2022"
      }
    ]
  },
  {
    "id": "cs-sup-11",
    "supNumber": "11",
    "title": "工控圖形繪製原理：GDI+ 繪圖、BMP 點陣圖結構與 256 色調色盤 (Palette) 架構",
    "date": "2026-09-08",
    "category": "圖形處理",
    "summary": "工控機台視覺演算法與高速排版核心。剖析點陣圖 BMP 內部結構（BITMAPFILEHEADER, BITMAPINFOHEADER）、256 色調色盤色彩映射表，以及 WinForms Graphics API 繪圖原理，實現高流暢度動態產線繪圖。",
    "image": "images_src/csharp_labs/slides/slide_145.png",
    "imageTitle": "BMP 點陣圖檔案結構與像素陣列排版圖解",
    "imageLink": "https://learn.microsoft.com/zh-tw/dotnet/api/system.drawing.graphics",
    "objective": "1. 徹底理解點陣圖 BMP 結構：檔頭、資訊頭、調色盤 (Palette) 與點陣像素資料。\n2. 掌握 256 色（8 位元）與全彩 24/32 位元在工控視覺取像記憶體佔用上的巨大差異。\n3. 熟練使用 C# System.Drawing.Graphics 進行高速雙緩衝 (DoubleBuffering) 繪圖。",
    "tutorialSteps": [
      {
        "step": "1. BMP 點陣圖結構與 14-byte 檔案標頭",
        "description": "BMP 前 14 位元組包含 'BM' 識別碼、檔案總大小與像素偏移位址 (bfOffBits)，決定了影像讀取的基底起點。",
        "image": "images_src/csharp_labs/slides/slide_144.png",
        "imageCaption": "投影片 P.144：BMP 點陣圖結構與 144 頁實務解析"
      },
      {
        "step": "2. 像素點陣排版與上下倒置特性",
        "description": "標準 BMP 在記憶體中的像素排列是由底層向上（Bottom-up）儲存，影像寬度若非 4 的倍數需進行 Padding 補零對齊。",
        "image": "images_src/csharp_labs/slides/slide_145.png",
        "imageCaption": "投影片 P.145：BMP 像素點陣排列方式與記憶體對齊"
      },
      {
        "step": "3. 256 色調色盤 (Color Palette) 色彩索引架構",
        "description": "8-bit 工控灰階相機利用 256 色 Palette，像素僅需儲存 0~255 的索引值即可呈現細膩灰階，記憶體佔用僅全彩的三分之一。",
        "image": "images_src/csharp_labs/slides/slide_147.png",
        "imageCaption": "投影片 P.147：256 色調色盤架構與灰階影像對照"
      }
    ],
    "applications": [
      {
        "scenario": "AOI 光學檢測灰階影像高速演算法處理",
        "description": "直接透過 LockBits 操作 8-bit BMP 記憶體像素陣列，毫秒級完成邊緣偵測與刮傷缺陷標註。",
        "icon": "fa-solid fa-palette"
      }
    ],
    "aiPrompt": "請用 C# 撰寫一段 Bitmap.LockBits 高速處理點陣圖像素的範例代碼，說明為什麼避免使用 GetPixel/SetPixel，以及如何處理 Stride 跨距對齊。",
    "references": [
      {
        "title": "Microsoft Learn - 使用 GDI+ 進行圖形程式設計",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/advanced/about-gdi-managed-code"
      }
    ]
  },
  {
    "id": "cs-sup-12",
    "supNumber": "12",
    "title": "工控邊緣 AI 與工業 4.0 大趨勢 (COMPUTEX / NVIDIA GTC 邊緣運算)",
    "date": "2026-09-10",
    "category": "工控趨勢",
    "summary": "台灣製造業全面轉型邊緣 AI！剖析 2024~2026 COMPUTEX 與 NVIDIA GTC 發表之工業邊緣運算架構，探討生成式 AI、數位孿生 (Digital Twins) 與邊緣工控機 (IPC) 如何重塑全球電子代工與智慧工廠生態。",
    "image": "images_src/csharp_labs/slides/slide_236.png",
    "imageTitle": "COMPUTEX 與 NVIDIA 全球製造業邊緣 AI 趨勢分析",
    "imageLink": "https://www.nvidia.com/zh-tw/events/gtc/",
    "objective": "1. 認識 Edge AI 邊緣運算在即時性、頻寬節省與資料隱私上的三大戰略價值。\n2. 理解電子代工大廠（鴻海、廣達、和碩等）如何將 NVIDIA Omniverse 導入虛實整合產線。\n3. 掌握 PC-Based C# 上位機如何作為在地邊緣端與雲端 AI 模型的協同中樞。",
    "tutorialSteps": [
      {
        "step": "1. COMPUTEX 全球科技大展邊緣運算重磅趨勢",
        "description": "工業現場不再只是收集數據，而是將具備神經網路加速器 (NPU/GPU) 的工控機直布產線第一線，實現 5 毫秒內的自主決策。",
        "image": "images_src/csharp_labs/slides/slide_236.png",
        "imageCaption": "投影片 P.236：2024 COMPUTEX 邊緣運算與工業 AI 重點展示"
      },
      {
        "step": "2. 全球電子製造業龍頭之邊緣 AI 實戰落地",
        "description": "全球頂尖組裝代工廠全面採用邊緣 AI 進行視覺品檢、AGV 無人搬運車路徑動態避障與自動瑕疵分析。",
        "image": "images_src/csharp_labs/slides/slide_237.png",
        "imageCaption": "投影片 P.237：全球電子製造業者之邊緣 AI 應用分佈圖"
      },
      {
        "step": "3. NVIDIA GTC 與工業機器人自動化生態系",
        "description": "NVIDIA 發表之 Isaac 機器人平台與 Jetson 邊緣模組，透過 ROS 與 C# 介接，開啟次世代具身智能 (Embodied AI) 浪潮。",
        "image": "images_src/csharp_labs/slides/slide_238.png",
        "imageCaption": "投影片 P.238：NVIDIA GTC 大會工業 AI 生態與機器人技術"
      }
    ],
    "applications": [
      {
        "scenario": "次世代 AI 賦能智慧表面黏著 (SMT) 產線",
        "description": "產線 IPC 搭載本地小模型，即時分析錫膏印刷機錫厚與元器件貼片偏移，自動即時閉環校正機構座標。",
        "icon": "fa-solid fa-microchip-ai"
      }
    ],
    "aiPrompt": "請以 Markdown 報告格式分析：工業邊緣運算 (Industrial Edge AI) 相較於傳統雲端 AI 在智慧工廠落地面臨的 3 大挑戰與解決策略（即時延遲、模型量化蒸餾、惡劣工廠環境耐受性）。",
    "references": [
      {
        "title": "NVIDIA GTC 官方精華手冊",
        "url": "https://www.nvidia.com/zh-tw/events/gtc/"
      }
    ]
  },
  {
    "id": "cs-sup-13",
    "supNumber": "13",
    "title": "GitHub Copilot 與 Google AI Studio 協同工控軟體開發實戰",
    "date": "2026-09-12",
    "category": "AI 輔助開發",
    "summary": "掌握 Vibe Coding 工控開發模式！深入學習如何在 Visual Studio 中運用 GitHub Copilot 進行「下一個編輯建議 (Next Edit Suggestions)」、函式自動補全，並結合 Google AI Studio 打造專屬的工控通訊協定提示詞產生器。",
    "image": "images_src/csharp_labs/slides/slide_246.png",
    "imageTitle": "Visual Studio GitHub Copilot 工控代碼自動生成實戰",
    "imageLink": "https://visualstudio.microsoft.com/zh-hant/github-copilot/",
    "objective": "1. 掌握 Copilot 在 C# 工控開發中的三大神效：自動撰寫 Modbus 封包、產生單元測試、排查執行緒死結。\n2. 學會使用 Google AI Studio 設計 System Prompt，精確規範生成的 C# 語法符合工業安全規範。\n3. 理解 AI 輔助與工程師人工審查 (Human-in-the-loop) 的關鍵邊界。",
    "tutorialSteps": [
      {
        "step": "1. Google AI Studio 與 Gemini 工控提示詞調校",
        "description": "在 AI Studio 中輸入工業設備手冊，設定溫度設定與安全鎖定規則，將複雜的非結構化手冊轉為結構化 C# 類別程式碼。",
        "image": "images_src/csharp_labs/slides/slide_244.png",
        "imageCaption": "投影片 P.244：Google AI Studio 平台與工控提示詞工程"
      },
      {
        "step": "2. Visual Studio 深度配置 GitHub Copilot",
        "description": "在 Visual Studio 啟用 Copilot 自動補全與灰色幽靈文字 (Ghost Text)，按 Tab 鍵一秒生成標準的 PLC 讀寫邏輯。",
        "image": "images_src/csharp_labs/slides/slide_246.png",
        "imageCaption": "投影片 P.246：Visual Studio 整合 GitHub Copilot 輔助開發"
      },
      {
        "step": "3. 專家部落格實戰技巧與避坑心法",
        "description": "參考業內專家在實際自動化產線上的 Copilot 落地經驗，了解如何透過詳細的註解引導 AI 產出高穩定度、零 memory leak 的工控代碼。",
        "image": "images_src/csharp_labs/slides/slide_247.png",
        "imageCaption": "投影片 P.247：專家實戰分享使用 GitHub Copilot 加速 C# 開發"
      }
    ],
    "applications": [
      {
        "scenario": "新進工控工程師快速熟悉產線軟體架構",
        "description": "利用 Copilot Chat 解讀 10 年前老舊 C# 系統程式碼，2 分鐘內自動輸出繁體中文流程圖與函式功能解析。",
        "icon": "fa-solid fa-robot"
      }
    ],
    "aiPrompt": "請示範如何在 Visual Studio 中使用 #file 與 #method 指令，向 GitHub Copilot 提問：為現有的三菱 PLC SerialPort 通訊類別加入逾時重試 (Retry Mechanism) 與 CRC 校驗邏輯。",
    "references": [
      {
        "title": "Microsoft Learn - 在 Visual Studio 中使用 GitHub Copilot 補全",
        "url": "https://learn.microsoft.com/zh-tw/visualstudio/ide/visual-studio-github-copilot-install-and-states"
      }
    ]
  },
  {
    "id": "cs-sup-14",
    "supNumber": "14",
    "title": "三菱 MELSEC iQ-R 結構化文本 (ST) 與 C# 混合架構",
    "date": "2026-09-15",
    "category": "機電架構",
    "summary": "打通 PLC 與 PC 上位機的語言藩籬！介紹 IEC 61131-3 國際標準下的結構化文本 (ST, Structured Text) 高階語言，比較 ST 與 C# 語法同源性，並剖析現代工控中「PLC 負責硬體即時互鎖、PC C# 負責高階演算法與雲端數據串接」的黃金雙核心分工架構。",
    "image": "images_src/csharp_labs/slides/slide_216.png",
    "imageTitle": "三菱 MELSEC iQ-R 結構化文本 (ST) 程式設計與架構",
    "imageLink": "https://www.mitsubishielectric.tw/",
    "objective": "1. 認識 IEC 61131-3 五大 PLC 語言中的結構化文本 (ST) 之語法優勢與適用場景。\n2. 比較 ST 語言中 IF-THEN-ELSE, FOR 迴圈與 C# 語法的異同點。\n3. 理解 PC-Based 混合架構下，C# 內部 (internal) 方法封裝與 PLC 實體邊界的協作理念。",
    "tutorialSteps": [
      {
        "step": "1. 三菱 MELSEC iQ-R 結構化文字 (ST) 語言特色",
        "description": "ST 語言類似 Pascal 與 C 語言，極適合處理複雜的數學運算、PID 控制演算法與陣列尋址，大幅克服傳統階梯圖 (Ladder) 排版冗長的缺點。",
        "image": "images_src/csharp_labs/slides/slide_216.png",
        "imageCaption": "投影片 P.216：三菱 MELSEC iQ-R 結構化文本 (ST) 官方編程手冊"
      },
      {
        "step": "2. C# 物件封裝邊界與工控方法權限劃分",
        "description": "將 method 或 class 標記為 internal，嚴格限制僅在專案內部使用，確保底層通訊與機電驅動不被外部調用竄改，實現穩健的分層架構。",
        "image": "images_src/csharp_labs/slides/slide_218.png",
        "imageCaption": "投影片 P.218：C# 類別與方法存取修飾詞封裝原則"
      }
    ],
    "applications": [
      {
        "scenario": "半導體機台雙核心高可靠度控制系統",
        "description": "三菱 iQ-R PLC 以 ST 語言維持 1ms 硬實時安全急停互鎖；上位機 C# 透過光纖工業乙太網進行每秒萬筆晶圓缺陷光學影像判定。",
        "icon": "fa-solid fa-layer-group"
      }
    ],
    "aiPrompt": "請以繁體中文比較 IEC 61131-3 結構化文本 (ST) 語言與 C# 語言在語法、資料型態與變數作用域上的異同，並說明現代工控系統如何整合兩者優勢。",
    "references": [
      {
        "title": "三菱電機 - MELSEC iQ-R 程式設計手冊 (結構化文字篇)",
        "url": "https://www.mitsubishielectric.tw/"
      }
    ]
  }
];
