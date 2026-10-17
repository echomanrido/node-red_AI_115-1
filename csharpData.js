// C# 課程離線備援資料庫 (支援 file:/// 協定直接開啟)
var INITIAL_CSHARP_DATA = [
  {
    "id": "csharp-01",
    "labNumber": "01",
    "title": "PC 與 PC 透過 RS232 串列埠雙向通訊實作",
    "date": "2026-08-10",
    "category": "PC-Based控制",
    "summary": "使用 C# 的 System.IO.Ports.SerialPort 類別，在兩台電腦或虛擬串列埠 (VSP) 間建立點對點通訊連線，實作字串指令發送、非同步 DataReceived 事件監聽與跨執行緒 UI 安全更新。",
    "flowImage": "images_src/ok/node-red_csharp_02-page-1.jpg",
    "resultImage": "images_src/ok/03-01_csharp.jpg",
    "flowTitle": "C# RS232 串列通訊架構與執行緒流程圖",
    "resultTitle": "WinForms 雙機雙向文字傳輸與 Hex 監視畫面",
    "objective": "1. 掌握 C# System.IO.Ports 命名空間與 SerialPort 物件生命週期管理。\n2. 理解串列通訊四項核心硬體參數：BaudRate (波特率 9600)、Parity (None)、DataBits (8)、StopBits (1)。\n3. 學會透過 DataReceived 事件處理非同步接收，並利用 Control.Invoke 避免跨執行緒例外 (Cross-thread operation)。",
    "tutorialSteps": [
      {
        "step": "1. 介面設計與控制項配置",
        "description": "建立 Windows Forms 專案，加入 ComboBox (選擇 COM Port)、Button (連線/中斷)、TextBox (輸入發送內容)、RichTextBox (接收日誌視窗)。"
      },
      {
        "step": "2. 初始化 SerialPort 物件",
        "description": "設定 PortName = \"COM1\"、BaudRate = 9600、Parity = Parity.None、DataBits = 8、StopBits = StopBits.One，並註冊 DataReceived 事件委派。"
      },
      {
        "step": "3. 實作非同步接收與跨執行緒更新",
        "description": "在 DataReceived 事件中呼叫 serialPort.ReadExisting()，並使用 this.Invoke((MethodInvoker)delegate { txtLog.AppendText(data); }) 安全將字串回填至 UI 視窗。"
      },
      {
        "step": "4. 雙機或虛擬串列埠交握測試",
        "description": "使用 com0com 或實體 USB-to-RS232 跳線 (Null Modem Cable) 對接，發送 \"PING\" 指令並驗證另一端成功回傳 \"ACK\"。"
      }
    ],
    "csharpCode": "using System;\nusing System.IO.Ports;\nusing System.Windows.Forms;\n\nnamespace CSharpIndustrialControl\n{\n    public partial class FormSerialBasic : Form\n    {\n        private SerialPort _serialPort;\n\n        public FormSerialBasic()\n        {\n            InitializeComponent();\n            InitSerialPort();\n        }\n\n        private void InitSerialPort()\n        {\n            _serialPort = new SerialPort\n            {\n                PortName = \"COM1\",\n                BaudRate = 9600,\n                Parity = Parity.None,\n                DataBits = 8,\n                StopBits = StopBits.One,\n                ReadTimeout = 1000,\n                WriteTimeout = 1000\n            };\n            _serialPort.DataReceived += OnDataReceived;\n        }\n\n        private void btnConnect_Click(object sender, EventArgs e)\n        {\n            try\n            {\n                if (!_serialPort.IsOpen)\n                {\n                    _serialPort.PortName = cmbPort.SelectedItem.ToString();\n                    _serialPort.Open();\n                    lblStatus.Text = \"狀態：連線成功\";\n                }\n            }\n            catch (Exception ex)\n            {\n                MessageBox.Show($\"串列埠開啟失敗：{ex.Message}\");\n            }\n        }\n\n        private void btnSend_Click(object sender, EventArgs e)\n        {\n            if (_serialPort != null && _serialPort.IsOpen)\n            {\n                string msg = txtInput.Text;\n                _serialPort.WriteLine(msg);\n                txtLog.AppendText($\"[TX] {msg}\\r\\n\");\n            }\n        }\n\n        private void OnDataReceived(object sender, SerialDataReceivedEventArgs e)\n        {\n            string received = _serialPort.ReadExisting();\n            this.Invoke((MethodInvoker)delegate\n            {\n                txtLog.AppendText($\"[RX] {received}\\r\\n\");\n            });\n        }\n    }\n}",
    "aiPrompt": "請幫我用 C# (.NET 8 Windows Forms) 撰寫一個 industrial RS232 串列通訊程式。需求包含：\n1. 自動掃描本機可用 COM Ports 並填入 ComboBox。\n2. 包含連線/斷線切換按鈕，正確判斷 SerialPort 是否開啟。\n3. 使用非同步 DataReceived 事件監聽，並使用 Invoke 確保無跨執行緒 UI 更新例外。\n4. 支援發送字串與十六進位 Hex 顯示。\n請提供完整包含命名空間與錯誤例外的 Form1.cs 程式碼。",
    "applications": [
      {
        "scenario": "產線上位 PC 與測試機通訊",
        "description": "品檢上位機向治具控制器發送開始測試命令，並接收測試儀器回傳之合格/不良代碼與量測電壓值。",
        "icon": "fa-solid fa-desktop"
      },
      {
        "scenario": "條碼掃描槍與磅秤數據採集",
        "description": "倉儲進出料工作站透過 RS232 序列介面即時攔截電子磅秤重量與條碼槍字元串列，自動存入出貨資料庫。",
        "icon": "fa-solid fa-barcode"
      }
    ],
    "references": [
      {
        "title": "Microsoft Learn - SerialPort 類別 (System.IO.Ports)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/api/system.io.ports.serialport"
      },
      {
        "title": "com0com 虛擬序列埠驅動套件 (開源工具)",
        "url": "https://sourceforge.net/projects/com0com/"
      }
    ]
  },
  {
    "id": "csharp-02",
    "labNumber": "02",
    "title": "PC 與三菱 FX 系列 PLC 序列通訊交握機制",
    "date": "2026-08-11",
    "category": "PLC通訊",
    "summary": "掌握三菱 FX2N / FX3U PLC 的程式撰寫通訊協定，發送問詢碼 ENQ (0x05) 進行心跳交握，解析 PLC 回應之確認碼 ACK (0x06)，建立工業級通訊連線防線。",
    "flowImage": "images_src/ok/node-red_csharp_02-page-2.jpg",
    "resultImage": "images_src/ok/03-01_csharp.jpg",
    "flowTitle": "三菱 PLC ENQ / ACK / NAK 序列交握時序圖",
    "resultTitle": "PLC 連線交握狀態與響應時間量測介面",
    "objective": "1. 掌握三菱 FX PLC 程式撰寫口 (Programming Port) 的通訊規格 (9600-7-E-1)。\n2. 了解 ASCII 控制字元 ENQ (詢問)、ACK (確認)、NAK (否認) 在交握中的標準行為。\n3. 學會編寫具備超時重試機制 (Timeout Retry) 的工業通訊交握函式。",
    "tutorialSteps": [
      {
        "step": "1. 設定三菱 PLC 串列參數",
        "description": "三菱 FX 程式撰寫通訊埠預設規格為：波特率 9600 bps、資料位元 7、同位檢查 Even (偶同位)、停止位元 1。"
      },
      {
        "step": "2. 發送 ENQ 詢問信號",
        "description": "連線建立後，向 PLC 寫入一個位元組 0x05 (ENQ)，啟動通訊協議判定。"
      },
      {
        "step": "3. 判定 ACK / NAK 回應",
        "description": "等待 PLC 回應，若在 500ms 內收到 0x06 (ACK)，代表 PLC 就緒；若收到 0x15 (NAK) 或超時，則標記通訊異常並重試。"
      },
      {
        "step": "4. 建立通訊心跳守門員 (Watchdog)",
        "description": "使用背景 Timer 定時每秒發送交握信號，確保現場 PLC 未發生斷線或死機。"
      }
    ],
    "csharpCode": "public bool TestPlcConnection(SerialPort port)\n{\n    try\n    {\n        port.DiscardInBuffer();\n        port.DiscardOutBuffer();\n        \n        // 發送 ENQ (0x05)\n        byte[] enq = new byte[] { 0x05 };\n        port.Write(enq, 0, 1);\n        \n        // 設定 500ms 讀取超時\n        port.ReadTimeout = 500;\n        int response = port.ReadByte();\n        \n        if (response == 0x06) // ACK\n        {\n            return true; // 交握成功\n        }\n    }\n    catch (TimeoutException)\n    {\n        // 超時無回應\n    }\n    return false;\n}",
    "aiPrompt": "請以 C# 撰寫三菱 FX3U PLC 的 RS422/RS232 通訊交握類別。要求包含：\n1. 通訊參數自動設定為 9600, 7, Even, 1。\n2. 提供 PingPlc() 方法發送 ENQ (0x05) 並等待 ACK (0x06)。\n3. 具備 3 次重試與自訂 Timeout 機制。\n4. 若失敗拋出具體 IndustrialCommException 例外。",
    "applications": [
      {
        "scenario": "SCADA 開機自檢流程",
        "description": "廠務圖控主程式在啟動第一時間輪詢所有實體 PLC，自動標記在線與離線機台清單。",
        "icon": "fa-solid fa-server"
      }
    ],
    "references": [
      {
        "title": "三菱電機 - MELSEC-F FX 系列微型可程式控制器編程手冊",
        "url": "https://www.mitsubishielectric.tw/"
      }
    ]
  },
  {
    "id": "csharp-03",
    "labNumber": "03",
    "title": "PC 透過 RS232 強制控制三菱 PLC 繼電器 Y1 ON/OFF",
    "date": "2026-08-12",
    "category": "PLC控制",
    "summary": "以 C# 組裝三菱 FX 專屬強制置位 (Force Set, 0x37) 與強制復位 (Force Reset, 0x38) 指令封包，計算校驗碼並發送至 PLC，驅動實體輸出繼電器 Y1 控制電磁閥或指示燈。",
    "flowImage": "images_src/ok/node-red_csharp_02-page-5.jpg",
    "resultImage": "images_src/ok/03-01_csharp.jpg",
    "flowTitle": "強制 I/O 命令組裝與 CheckSum 演算流程",
    "resultTitle": "WinForms 強制 Y1 開關與 PLC 實體燈亮反饋",
    "objective": "1. 掌握三菱 FX 系列 PLC 強制線圈指令代碼：'7' (0x37, Set ON) 與 '8' (0x38, Reset OFF)。\n2. 理解暫存器實體位址轉換運算法（如 Y1 對應內部通訊記憶體位址）。\n3. 實作 C# 按鈕控制實體 PLC 繼電器輸出動作，建立 PC-Based 控制基礎。",
    "tutorialSteps": [
      {
        "step": "1. 計算 Y1 接點通訊記憶體位址",
        "description": "在三菱 FX 協定中，Y0~Y7 的位元強制位址計算規則：Y1 對應位址為 0x0501（十六進位字串為 \"0501\"）。"
      },
      {
        "step": "2. 組裝強制控制封包",
        "description": "ON 封包：STX(0x02) + '7'(0x37) + 位址(\"0501\") + ETX(0x03) + CheckSum。\nOFF 封包：STX(0x02) + '8'(0x38) + 位址(\"0501\") + ETX(0x03) + CheckSum。"
      },
      {
        "step": "3. 計算與附加 CheckSum",
        "description": "將 STX 之後到 ETX 為止的所有字元 ASCII 碼進行累加，取其最低 8 位元並轉換為 2 位元十六進位大寫字元。"
      },
      {
        "step": "4. 發送指令與驗證實體輸出",
        "description": "透過 SerialPort 發送字串指令，若 PLC 回應 ACK (0x06)，則實體 PLC 模組上 Y1 紅色 LED 燈亮起。"
      }
    ],
    "csharpCode": "public void ForceOutputY(SerialPort port, int yNumber, bool state)\n{\n    // 計算 Y 接點位址 (例如 Y1 -> \"0501\")\n    string address = (0x0500 + yNumber).ToString(\"X4\");\n    // 指令 '7' 為 ON, '8' 為 OFF\n    char cmd = state ? '7' : '8';\n    \n    string data = cmd + address;\n    // 計算 CheckSum\n    int sum = 0;\n    foreach (char c in data) sum += (byte)c;\n    sum += 0x03; // 加上 ETX (0x03)\n    string checkSum = (sum & 0xFF).ToString(\"X2\");\n    \n    // 完整封包: STX + CMD + ADDR + ETX + CHECKSUM\n    string packet = $\"\\x02{data}\\x03{checkSum}\";\n    port.Write(packet);\n}",
    "aiPrompt": "請幫我寫一個 C# 函式，用於三菱 FX3U PLC 透過 RS232 控制強制輸出點 Y (例如 Y0 到 Y7)。\n要求輸入參數包含：SerialPort port, int yIndex, bool isOn。\n自動組裝 STX (0x02)、指令碼 ('7'/'8')、FX 暫存器位址偏移、ETX (0x03) 及 2 位元 CheckSum，並透過串列埠送出，確保安全防護。",
    "applications": [
      {
        "scenario": "半導體無塵室遠端排氣閥緊急切斷",
        "description": "當 SCADA 偵測到氣體外洩濃度超標時，PC 程式毫秒級發送指令強制 PLC 輸出 Y1 閉合關斷電磁閥。",
        "icon": "fa-solid fa-triangle-exclamation"
      }
    ],
    "references": [
      {
        "title": "FX 通訊協議專題：電腦連線與命令格式解析",
        "url": "https://www.mitsubishielectric.com/"
      }
    ]
  },
  {
    "id": "csharp-04",
    "labNumber": "04",
    "title": "C# WinForms 工控人機介面 (HMI) 基礎控制項配置",
    "date": "2026-08-13",
    "category": "人機介面",
    "summary": "運用 Visual Studio 視覺化設計工具，配置 Label (數值顯示)、PictureBox (機台示意圖)、Button (操作開關)、TextBox (配方輸入) 等核心控制項，打造符合工控人因工程的高質感 HMI 視窗。",
    "flowImage": "images_src/ok/node-red_csharp_02-page-3.jpg",
    "resultImage": "images_src/ok/03-01_csharp.jpg",
    "flowTitle": "WinForms 控制項層次結構與佈局錨點設定",
    "resultTitle": "工控機台主控制台 HMI 操作畫面",
    "objective": "1. 熟練掌握 WinForms 核心控制項 (Label, PictureBox, Button, TextBox) 的屬性配置。\n2. 理解 Anchor (錨點) 與 Dock (停靠) 屬性在工控工業觸控螢幕自適應解析度的應用。\n3. 學會為各控制項設定直觀的工控暗黑配色與標準狀態反饋。",
    "tutorialSteps": [
      {
        "step": "1. 新建 WinForms 應用程式",
        "description": "設定表單 FormBorderStyle = FixedSingle，StartPosition = CenterScreen，背景顏色設為工控深色 #1E293B。"
      },
      {
        "step": "2. 加入設備監控示意圖與標籤",
        "description": "拉取 PictureBox 載入輸送帶或機械手臂圖形 (SizeMode = Zoom)，上方放置 Label 顯示機台名稱與稼動率。"
      },
      {
        "step": "3. 配置操作按鈕群組",
        "description": "拉取 TableLayoutPanel 配置「系統啟動 (綠)」、「系統停止 (紅)」、「故障復歸 (黃)」、「手動點動 (藍)」四顆按鈕。"
      },
      {
        "step": "4. 撰寫按鈕 Hover 與 Click 狀態切換",
        "description": "透過按鈕 Click 事件修改設備運行旗標，並即時更新畫面上運行狀態指示 Label 的文字與色彩。"
      }
    ],
    "csharpCode": "private void btnStart_Click(object sender, EventArgs e)\n{\n    // 啟動生產線\n    _isMachineRunning = true;\n    lblMachineStatus.Text = \"狀態：運轉中 (RUN)\";\n    lblMachineStatus.ForeColor = Color.LimeGreen;\n    btnStart.Enabled = false;\n    btnStop.Enabled = true;\n}\n\nprivate void btnStop_Click(object sender, EventArgs e)\n{\n    // 停止生產線\n    _isMachineRunning = false;\n    lblMachineStatus.Text = \"狀態：已停止 (STOP)\";\n    lblMachineStatus.ForeColor = Color.OrangeRed;\n    btnStart.Enabled = true;\n    btnStop.Enabled = false;\n}",
    "aiPrompt": "請幫我設計一個 C# WinForms 工控機台操作面板介面代碼。包含：\n1. 頂部狀態列顯示目前連線 COM Port 與時間。\n2. 中間包含機台運轉示意圖與即時溫度、壓力數值 Label。\n3. 底部包含啟動、停止、急停三個大按鈕，具備防重複點擊與顏色動態切換邏輯。\n代碼請採用現代簡潔的寫法。",
    "applications": [
      {
        "scenario": "包裝機操作觸控螢幕面板",
        "description": "現場作業員透過 WinForms 觸控介面切換包裝速度、手動點動封口刀模，並檢視目前已完成之封裝包數。",
        "icon": "fa-solid fa-box"
      }
    ],
    "references": [
      {
        "title": "Microsoft Learn - Windows Forms 控制項設計規範",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/controls/"
      }
    ]
  },
  {
    "id": "csharp-05",
    "labNumber": "05",
    "title": "燈號狀態動態變更與工控指示燈屬性綁定",
    "date": "2026-08-14",
    "category": "人機介面",
    "summary": "透過自訂 Panel 或圓形按鈕類別，實作具備 3D 質感與呼吸燈效果的工控指示燈控制項。藉由屬性封裝動態切換綠燈 (正常)、紅燈 (警報) 與黃燈 (待機)，並綁定閃爍 Timer。",
    "flowImage": "images_src/ok/node-red_csharp_02-page-3.jpg",
    "resultImage": "images_src/ok/03-01_csharp.jpg",
    "flowTitle": "機台三色警示燈狀態機 (FSM) 狀態轉換圖",
    "resultTitle": "工控機台塔燈即時視覺化動態指示面板",
    "objective": "1. 掌握 WinForms 自訂控制項 (Custom Control) 基礎與 GDI+ 重繪 (OnPaint)。\n2. 理解機台三色燈 (Tower Lamp: Red, Yellow, Green) 的工業標準定義與狀態機。\n3. 學會透過 Timer 控制燈號以 500ms 頻率閃爍模擬現場故障急迫警報。",
    "tutorialSteps": [
      {
        "step": "1. 建立自訂指示燈類別",
        "description": "建立繼承自 Control 的 LampIndicator 元件，公開 IsOn、LampColor 等屬性，並在 OnPaint 中使用 Graphics 繪製發光漸層圓形。"
      },
      {
        "step": "2. 定義機台狀態列舉 (MachineState)",
        "description": "建立列舉 enum MachineState { Idle, Running, Alarm, Maintenance }，便於集中管理機台生命週期。"
      },
      {
        "step": "3. 撰寫閃爍定時器邏輯",
        "description": "加入 Timer (Interval = 500ms)，當機台處於 Alarm 狀態時，每次觸發反轉燈號 Visible 屬性達成閃爍警示。"
      },
      {
        "step": "4. 整合現場蜂鳴器與警報文字",
        "description": "紅燈閃爍時同步於警報清單寫入警報發生時間與原因，提供作業員第一時間應變。"
      }
    ],
    "csharpCode": "public enum TowerLampState { Off, Green, Yellow, Red, RedBlink }\n\npublic class TowerLampController\n{\n    private Panel pnlRed, pnlYellow, pnlGreen;\n    private Timer blinkTimer;\n    private bool blinkToggle = false;\n\n    public void SetState(TowerLampState state)\n    {\n        blinkTimer.Stop();\n        pnlRed.BackColor = Color.DarkRed;\n        pnlYellow.BackColor = Color.DarkGoldenrod;\n        pnlGreen.BackColor = Color.DarkGreen;\n\n        switch (state)\n        {\n            case TowerLampState.Green:\n                pnlGreen.BackColor = Color.Lime;\n                break;\n            case TowerLampState.Yellow:\n                pnlYellow.BackColor = Color.Yellow;\n                break;\n            case TowerLampState.Red:\n                pnlRed.BackColor = Color.Red;\n                break;\n            case TowerLampState.RedBlink:\n                blinkTimer.Start();\n                break;\n        }\n    }\n}",
    "aiPrompt": "請幫我用 C# 撰寫一個機台三色警示燈 (Tower Lamp) 控制類別。包含紅、黃、綠三盞燈。\n提供 SetLampState(string state) 方法，支援 Normal (綠燈常亮)、Warning (黃燈常亮)、Critical (紅燈以 500ms 頻率閃爍)。\n請附帶 Form 範例代碼展示如何呼叫。",
    "applications": [
      {
        "scenario": "SMT 表面貼焊機警示燈連動",
        "description": "當料捲缺料或吸嘴堵塞時，C# 監控程式立即將機台塔燈切換為紅色閃爍並啟動警報蜂鳴器。",
        "icon": "fa-solid fa-lightbulb"
      }
    ],
    "references": [
      {
        "title": "工業安全規範 - 機台警示燈與聲音訊號規範 (IEC 60073)",
        "url": "https://www.iec.ch/"
      }
    ]
  },
  {
    "id": "csharp-06",
    "labNumber": "06",
    "title": "C# 程式基礎：數值運算、資料型態精準度與單位換算計算機",
    "date": "2026-08-15",
    "category": "程式基礎",
    "summary": "深入探討 C# 工控程式中 integer、float、double 與 decimal 的精準度與溢位風險。實作生產累加器、壓力單位 (bar / psi / kPa) 換算與 OEE 生產良率即時計算機。",
    "flowImage": "images_src/ok/node-red_csharp_02-page-6.jpg",
    "resultImage": "images_src/ok/03-01_csharp.jpg",
    "flowTitle": "工控數值型態精確度與單位轉換運算架構",
    "resultTitle": "工控多功能單位換算與 OEE 良率計算機",
    "objective": "1. 徹底理解 float/double 浮點數精度損失在工控計費與精密量測中的風險，並學會使用 decimal。\n2. 掌握 C# 數值溢位防護 (checked / unchecked 關鍵字)。\n3. 實作工控常用的氣壓、溫度、重量單位換算與總生產稼動率 (OEE) 公式計算。",
    "tutorialSteps": [
      {
        "step": "1. 浮點數精度比對實例",
        "description": "示範 double (0.1 + 0.2) 產生 0.30000000000000004 之現象，對比 decimal (0.1m + 0.2m = 0.3m) 的精準特性。"
      },
      {
        "step": "2. 實作壓力單位轉換函式",
        "description": "撰寫 ConvertPressure(double value, Unit from, Unit to)，支援 bar, psi, kPa, kg/cm² 間的雙向精確轉換。"
      },
      {
        "step": "3. 建立生產累積加總與溢位防護",
        "description": "使用 long 儲存高速累加產量，並使用 checked 區塊防範 integer 溢位導致計數變為負數的工控災難。"
      },
      {
        "step": "4. 串接 UI 計算機介面",
        "description": "設計輸入面板，作業員輸入生產總數與不良品數，即時以百分比 (Format: P2) 呈現良率與直通率。"
      }
    ],
    "csharpCode": "public static class UnitConverter\n{\n    // 壓力換算：bar 轉 psi (1 bar ≈ 14.5038 psi)\n    public static double BarToPsi(double bar) => bar * 14.50377377;\n    public static double PsiToBar(double psi) => psi / 14.50377377;\n\n    // 溫度換算：攝氏轉華氏\n    public static double CelsiusToFahrenheit(double c) => (c * 9.0 / 5.0) + 32.0;\n\n    // OEE 良率計算 (使用 decimal 保證精準度)\n    public static decimal CalculateYield(int totalCount, int defectCount)\n    {\n        if (totalCount <= 0) return 0m;\n        decimal goodCount = (decimal)(totalCount - defectCount);\n        return Math.Round((goodCount / totalCount) * 100m, 2);\n    }\n}",
    "aiPrompt": "請幫我用 C# 撰寫一個工控計算模組，包含：\n1. 氣壓單位雙向轉換 (bar, psi, kPa, kg/cm²)。\n2. 溫度單位雙向轉換 (攝氏、華氏、熱力學絕對溫標 Kelvin)。\n3. 工廠設備總合效率 OEE (稼動率、產能效率、良率) 計算函式，全部採用 decimal 避免浮點數誤差。\n附上完整的單元測試範例。",
    "applications": [
      {
        "scenario": "氣壓傳感器數值標準化轉換",
        "description": "將現場不同歐規 (bar) 與美規 (psi) 空壓機壓力感測器數值統一標準化後寫入中控 SCADA 資料庫。",
        "icon": "fa-solid fa-gauge"
      }
    ],
    "references": [
      {
        "title": "Microsoft Learn - C# 內建數值型別與浮點精確度",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types"
      }
    ]
  },
  {
    "id": "csharp-07",
    "labNumber": "07",
    "title": "程式邏輯控制：for/while 迴圈、星號直角三角形與九九乘法表",
    "date": "2026-08-16",
    "category": "程式進階",
    "summary": "透過 for、foreach、while 迴圈與巢狀迴圈建構自動化演算法思維。練習正直角三角形、倒直角三角形、等腰菱形與格式化九九乘法表輸出，奠定步進馬達循軌點位巡檢基礎。",
    "flowImage": "images_src/ok/node-red_csharp_02-page-4.jpg",
    "resultImage": "images_src/ok/03-01_csharp.jpg",
    "flowTitle": "巢狀迴圈索引走訪與空間維度映射概念",
    "resultTitle": "字串圖形運算與多維陣列九九乘法展示視窗",
    "objective": "1. 熟練使用單迴圈與雙層巢狀迴圈 (Nested Loops)。\n2. 掌握 StringBuilder 類別在大量字串拼接時的記憶體效能優勢。\n3. 理解多維度矩陣走訪與步進馬達點位逐點移動 (Raster Scan) 的演算法關聯。",
    "tutorialSteps": [
      {
        "step": "1. 直角正三角形輸出演算法",
        "description": "外層迴圈控制列數 (i 從 1 到 N)，內層迴圈控制星號數量 (j 從 1 到 i)，逐列生成遞增字串。"
      },
      {
        "step": "2. 倒直角三角形與空白對齊",
        "description": "計算空白填充數量與星號數量的互補關係，實現靠右對齊之幾何圖案。"
      },
      {
        "step": "3. 格式化九九乘法表輸出",
        "description": "使用 string.Format(\"{0}x{1}={2,2} \") 對齊欄位，以 9 欄 9 列陣列結構輸出至文字框或主控台。"
      },
      {
        "step": "4. 映射至二維步進掃描路徑",
        "description": "將雙層迴圈索引 (row, col) 轉換為實體伺服馬達 X-Y 平台之絕對座標 (X = col * step, Y = row * step)。"
      }
    ],
    "csharpCode": "using System.Text;\n\npublic static class PatternGenerator\n{\n    // 產生直角正三角形\n    public static string GenerateRightTriangle(int rows)\n    {\n        var sb = new StringBuilder();\n        for (int i = 1; i <= rows; i++)\n        {\n            sb.AppendLine(new string('*', i));\n        }\n        return sb.ToString();\n    }\n\n    // 產生格式化九九乘法表\n    public static string GenerateMultiplicationTable()\n    {\n        var sb = new StringBuilder();\n        for (int i = 1; i <= 9; i++)\n        {\n            for (int j = 1; j <= 9; j++)\n            {\n                sb.Append($\"{j} x {i} = {i * j,2}   \");\n            }\n            sb.AppendLine();\n        }\n        return sb.ToString();\n    }\n}",
    "aiPrompt": "請幫我用 C# 寫一個圖形邏輯產生工具類別，包含以下靜態方法：\n1. GenerateRightTriangle(int rows)：正直角三角形。\n2. GenerateInvertedTriangle(int rows)：倒直角三角形。\n3. GenerateDiamond(int size)：等腰菱形。\n4. GenerateMultiplicationTable()：對齊美觀的九九乘法表。\n所有方法均使用 StringBuilder 最佳化，並附上調用展示。",
    "applications": [
      {
        "scenario": "晶圓瑕疵逐點光學檢測 (AOI) 走訪",
        "description": "透過雙層迴圈控制檢測鏡頭沿著晶圓晶粒 (Die) 座標逐列逐行掃描取像，進行瑕疵特徵比對。",
        "icon": "fa-solid fa-microchip"
      }
    ],
    "references": [
      {
        "title": "Microsoft Learn - C# 反覆運算陳述式 (for, foreach, while)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/language-reference/statements/iteration-statements"
      }
    ]
  },
  {
    "id": "csharp-08",
    "labNumber": "08",
    "title": "流程控制與物件導向：if-else 條件判斷、Switch case 與類別繼承",
    "date": "2026-08-17",
    "category": "物件導向",
    "summary": "掌握 if-else 分支、C# 現代 switch pattern matching (模式比對) 與物件導向 (OOP: 封裝、繼承、多型)。設計工控設備基礎類別 (BaseDevice) 與 PLC/手臂衍生類別，提高系統可擴充性。",
    "flowImage": "images_src/ok/node-red_csharp_02-page-4.jpg",
    "resultImage": "images_src/ok/03-01_csharp.jpg",
    "flowTitle": "工業自動化設備階層架構 (UML 類別圖)",
    "resultTitle": "工控物件多型調度與狀態分流測試視窗",
    "objective": "1. 熟練掌握 if-else-if 多條件判斷與 C# switch 模式匹配語法。\n2. 深入理解物件導向三大特性：封裝 (Encapsulation)、繼承 (Inheritance)、多型 (Polymorphism)。\n3. 學會將真實世界的 PLC、機械手臂、感測器抽象為 C# 物件架構。",
    "tutorialSteps": [
      {
        "step": "1. 定義抽象基礎設備類別",
        "description": "建立 abstract class BaseDevice，定義 DeviceId, Name, IsConnected 屬性，以及 Connect(), Disconnect() 虛擬方法。"
      },
      {
        "step": "2. 實作三菱 PLC 與機械手臂衍生類別",
        "description": "建立 MitsubishiPlcDevice 與 RobotArmDevice 繼承 BaseDevice，分別實作各自的通訊協定細節。"
      },
      {
        "step": "3. 運用 Switch 進行料件尺寸分級",
        "description": "使用 switch 模式比對 (pattern matching)，依據感測器厚度數值迅速將工件分為「合格品」、「過厚重工」、「過薄報廢」。"
      },
      {
        "step": "4. 多型設備批次連線管理",
        "description": "建立 List<BaseDevice> 設備清單，使用單一 foreach 迴圈一鍵連線所有現場設備。"
      }
    ],
    "csharpCode": "public abstract class BaseDevice\n{\n    public string DeviceId { get; set; }\\n    public string Name { get; set; }\n    public bool IsConnected { get; protected set; }\n\n    public abstract bool Connect();\n    public abstract void Disconnect();\n}\n\npublic class MitsubishiPlc : BaseDevice\n{\n    public string ComPort { get; set; }\n    public override bool Connect()\n    {\n        // 實作 FX 通訊連線\n        IsConnected = true;\n        return true;\n    }\n    public override void Disconnect() => IsConnected = false;\n}\n\npublic class QualityClassifier\n{\n    public string ClassifyPart(double thickness) => thickness switch\n    {\n        < 4.8 => \"過薄 - 報廢 (Reject)\",\n        >= 4.8 and <= 5.2 => \"標準品 - 合格 (Pass)\",\n        _ => \"過厚 - 需二次銑削 (Rework)\"\n    };\n}",
    "aiPrompt": "請幫我用 C# 物件導向設計一個工業自動化設備管理器。要求：\n1. 抽象父類別 IndustrialDevice (含連線狀態、報警狀態、Connect, Disconnect 抽象方法)。\n2. 衍生類別 MitsubishiPlcDevice, ModbusGatewayDevice, RobotDevice。\n3. 使用 C# 模式匹配 (switch pattern matching) 處理設備報警代碼對應文字。\n4. 提供 DeviceManager 支援多型集合迴圈批次啟動。",
    "applications": [
      {
        "scenario": "全自動裝配線彈性站點調度",
        "description": "上位圖控以統一的 BaseDevice 介面管理壓合站、螺絲機與雷射雕刻站，擴充新站點無需改動核心流程。",
        "icon": "fa-solid fa-sitemap"
      }
    ],
    "references": [
      {
        "title": "Microsoft Learn - C# 物件導向程式設計指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/fundamentals/tutorials/oop"
      }
    ]
  },
  {
    "id": "csharp-09",
    "labNumber": "09",
    "title": "視窗互動事件：鍵盤 KeyPress/KeyDown 與滑鼠點擊控制",
    "date": "2026-08-18",
    "category": "人機互動",
    "summary": "掌握 Windows Forms 的輸入事件管線。攔截表單 KeyDown 事件實現「空白鍵緊急煞車 (E-Stop)」、「方向鍵控制馬達點動 (JOG)」，並利用 MouseDown / MouseUp 事件實作現場真實按鈕的手感體驗。",
    "flowImage": "images_src/ok/node-red_csharp_02-page-5.jpg",
    "resultImage": "images_src/ok/03-01_csharp.jpg",
    "flowTitle": "Windows 訊息迴圈與鍵盤滑鼠工控事件派送架構",
    "resultTitle": "工控虛擬教導盒 (Teach Pendant) 鍵盤滑鼠互動畫面",
    "objective": "1. 掌握 Form.KeyPreview 屬性讓表單優先攔截全域鍵盤熱鍵。\n2. 理解 KeyDown (按下)、KeyUp (放開)、KeyPress (字元輸入) 的觸發順序差異。\n3. 實作按下滑鼠發送 JOG ON、放開滑鼠發送 JOG OFF 的實體示教盒操作邏輯。",
    "tutorialSteps": [
      {
        "step": "1. 開啟 Form KeyPreview 屬性",
        "description": "將 this.KeyPreview 設為 true，確保即使子控制項具有焦點，表單仍能攔截快速鍵。"
      },
      {
        "step": "2. 撰寫緊急停止快捷鍵 (Space / Esc)",
        "description": "在 Form_KeyDown 事件中判斷 e.KeyCode == Keys.Space，立刻觸發 EmergencyStop() 邏輯並發送硬體急停。"
      },
      {
        "step": "3. 實作點動 (JOG) 按鈕 MouseDown/Up",
        "description": "為「正轉 JOG+」按鈕註冊 MouseDown 發送 PLC Y0=ON；註冊 MouseUp 發送 PLC Y0=OFF，避免連點造成機構衝撞。"
      },
      {
        "step": "4. 加入方向鍵寸動控制 (Jog by Arrow Keys)",
        "description": "按下鍵盤 Left/Right 控制軸線水平位移，Up/Down 控制軸線垂直升降。"
      }
    ],
    "csharpCode": "protected override void OnKeyDown(KeyEventArgs e)\n{\n    base.OnKeyDown(e);\n    if (e.KeyCode == Keys.Space || e.KeyCode == Keys.Escape)\n    {\n        // 緊急停止\n        TriggerEmergencyStop();\n        e.Handled = true;\n    }\n    else if (e.KeyCode == Keys.Right)\n    {\n        // X 軸向右點動\n        SendJogCommand(\"X\", 1);\n    }\n}\n\nprivate void btnJogForward_MouseDown(object sender, MouseEventArgs e)\n{\n    // 按下滑鼠發送啟動訊號\n    _plc.SetRelay(\"M100\", true);\n}\n\nprivate void btnJogForward_MouseUp(object sender, MouseEventArgs e)\n{\n    // 放開滑鼠立即切斷\n    _plc.SetRelay(\"M100\", false);\n}",
    "aiPrompt": "請幫我用 C# WinForms 撰寫一個機械手臂手動示教 (Jogging) 面板。\n需求：\n1. 表單支援 KeyPreview，按下空白鍵立刻執行緊急停止 (E-Stop)。\n2. 面板上有「X+」與「X-」按鈕，使用 MouseDown 與 MouseUp 實作「按著走、放開停」的安全點動邏輯。\n3. 按下方向鍵也可以進行同等點動。\n4. 加入代碼防止滑鼠拖曳離開按鈕時未觸發 MouseUp 的安全性問題。",
    "applications": [
      {
        "scenario": "CNC 工具機手輪與虛擬示教盒",
        "description": "作業員使用工業鍵盤或平板螢幕長按點動按鈕調整銑刀對刀點，放開即刻煞車確保安全。",
        "icon": "fa-solid fa-gamepad"
      }
    ],
    "references": [
      {
        "title": "Microsoft Learn - Windows Forms 中的鍵盤與滑鼠事件處理",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/input-keyboard"
      }
    ]
  },
  {
    "id": "csharp-10",
    "labNumber": "10",
    "title": "三菱 FX PLC ASCII 通訊協定封包格式與 CheckSum 驗證演算法",
    "date": "2026-08-19",
    "category": "通訊協定",
    "summary": "徹底解析三菱 FX 序列協定 (Computer Link Format 1 / Programming Protocol)。手寫 ASCII 編碼、位址定址轉換、累加校驗碼 (CheckSum) 與封包解碼器，實作 100% 穩健工控驅動核心。",
    "flowImage": "images_src/ok/node-red_csharp_02-page-2.jpg",
    "resultImage": "images_src/ok/03-01_csharp.jpg",
    "flowTitle": "三菱 FX 序列封包結構：STX + CMD + ADDR + BYTES + ETX + SUM",
    "resultTitle": "CheckSum 算檢碼驗證器與封包收發日誌診斷視窗",
    "objective": "1. 深入理解三菱 FX 系列封包結構 (STX, Command, Address, Length, ETX, CheckSum)。\n2. 掌握 CheckSum 累加和演算法（加總取最低兩位十六進位字元）。\n3. 學會編寫具備封包完整度校驗 (Integrity Validation) 的底層序列封包解析器。",
    "tutorialSteps": [
      {
        "step": "1. 認識封包控制字元 (Control Characters)",
        "description": "STX = 0x02 (封包起始), ETX = 0x03 (資料結束), ENQ = 0x05, ACK = 0x06, NAK = 0x15。"
      },
      {
        "step": "2. 解析暫存器地址計算規則",
        "description": "三菱 FX 資料暫存器 D0 的實體位址為 0x1000 (每個 D 暫存器佔 2 位元組，故 D1 為 0x1002，D100 為 0x10C8)。"
      },
      {
        "step": "3. 實作 CheckSum 演算法函式",
        "description": "將從 Command 到 ETX 間所有字元的 ASCII 數值加總，將結果與 0xFF 做 AND 運算，最後以 \"X2\" 格式化為兩碼十六進位。"
      },
      {
        "step": "4. 封包接收解碼與校驗比對",
        "description": "接收 PLC 回傳封包，重新計算校驗碼並比對末尾 2 碼，若相符則提取有效資料，不符則要求重傳。"
      }
    ],
    "csharpCode": "public static class MitsubishiPacketHelper\n{\n    // 計算 CheckSum 累加和\n    public static string CalculateCheckSum(string contentWithEtx)\n    {\n        int sum = 0;\n        foreach (char c in contentWithEtx)\n        {\n            sum += (byte)c;\n        }\n        // 取最低 8 位元並轉為 2 碼 16 進位大寫\n        return (sum & 0xFF).ToString(\"X2\");\n    }\n\n    // 建立讀取 D 暫存器之完整指令 (例如讀取 D0 1個字元)\n    public static string BuildReadRegisterPacket(int dRegisterIndex, int count)\n    {\n        // D 暫存器基礎位址 0x1000，每個字佔 2 bytes\n        int addr = 0x1000 + (dRegisterIndex * 2);\n        string cmd = $\"0{addr:X4}{(count * 2):X2}\"; // '0' 讀取命令\n        string contentWithEtx = $\"{cmd}\\x03\";\n        string sum = CalculateCheckSum(contentWithEtx);\n        return $\"\\x02{contentWithEtx}{sum}\";\n    }\n}",
    "aiPrompt": "請幫我用 C# 編寫一個三菱 FX3U PLC 通訊封包工具類別 MitsubishiFxProtocol。\n包含以下功能：\n1. CalculateCheckSum(string rawData) 演算法。\n2. BuildForceBitPacket(string relayType, int index, bool state) 強制線圈封包 (如 Y1, M10)。\n3. BuildReadDRegisterPacket(int startD, int wordCount) 讀取資料暫存器封包。\n4. ParseResponse(string responsePacket) 解碼並驗證回傳封包 CheckSum 是否正確。",
    "applications": [
      {
        "scenario": "自研工業物聯網邊緣閘道器 (Edge Gateway)",
        "description": "無須購買昂貴第三方 OPC Server，直接以自研 C# 驅動高頻讀取現場 50 台三菱 FX PLC 產能與能耗數據。",
        "icon": "fa-solid fa-network-wired"
      }
    ],
    "references": [
      {
        "title": "三菱電機 - MELSEC 序列通訊模組手冊 (Computer Link 規格)",
        "url": "https://www.mitsubishielectric.com/fa/"
      }
    ]
  },
  {
    "id": "csharp-11",
    "labNumber": "11",
    "title": "讀取 PLC 狀態：X/Y 接點監控、M 輔助繼電器與 Timer 計時器輪詢",
    "date": "2026-08-20",
    "category": "狀態監控",
    "summary": "建立高效的定時輪詢 (Polling Engine) 架構，定時每 100 毫秒向 PLC 發送狀態讀取指令，批次取得輸入接點 X0~X7、輸出接點 Y0~Y7 與內部標誌 M0~M15，並在 WinForms 儀表板上點亮即時狀態 LED。",
    "flowImage": "images_src/ok/node-red_csharp_02-page-4.jpg",
    "resultImage": "images_src/ok/03-01_csharp.jpg",
    "flowTitle": "非同步輪詢計時器與 I/O 狀態映射快取模型",
    "resultTitle": "PLC 實體 I/O 全接點動態虛擬監視儀表板",
    "objective": "1. 掌握三菱 FX 系列「批次讀取位元狀態」命令格式。\n2. 理解工控輪詢頻率 (Polling Rate) 與串列傳輸延遲的平衡設計。\n3. 學會將接收之 Hex 十六進位字元解析為獨立的位元二進位陣列 (BitArray)。",
    "tutorialSteps": [
      {
        "step": "1. 設定輪詢定時器 (System.Windows.Forms.Timer)",
        "description": "設定 Timer Interval = 200ms，在 Tick 事件中觸發非同步讀取請求，防止介面卡頓。"
      },
      {
        "step": "2. 發送讀取接點命令",
        "description": "組裝讀取 X0 起始位元之封包，PLC 回傳例如 \"01\" (代表 X0=1, 其餘為 0)。"
      },
      {
        "step": "3. 十六進位轉換為布林狀態陣列",
        "description": "將回傳字元以 Convert.ToByte(hex, 16) 轉為 byte，並使用位元遮罩 ((b & (1 << i)) != 0) 萃取 X0~X7 狀態。"
      },
      {
        "step": "4. 動態更新 UI 燈號控制項",
        "description": "遍歷虛擬 LED 燈陣列，為 ON 的接點標記亮綠色，為 OFF 的接點標記深灰色。"
      }
    ],
    "csharpCode": "private void pollTimer_Tick(object sender, EventArgs e)\n{\n    if (!_serialPort.IsOpen) return;\n    \n    // 讀取 X0~X7 輸入接點 (假設封包讀取成功獲得 response)\n    string rawHex = ReadPlcBitRegisters(0x0080, 1); // 取得 1 byte (8 bits)\n    if (!string.IsNullOrEmpty(rawHex))\n    {\n        byte val = Convert.ToByte(rawHex, 16);\n        for (int i = 0; i < 8; i++)\n        {\n            bool isBitOn = (val & (1 << i)) != 0;\n            UpdateLedUI(i, isBitOn);\n        }\n    }\n}\n\nprivate void UpdateLedUI(int index, bool isOn)\n{\n    Panel led = this.Controls.Find($\"ledX{index}\", true).FirstOrDefault() as Panel;\n    if (led != null)\n    {\n        led.BackColor = isOn ? Color.LimeGreen : Color.DarkSlateGray;\n    }\n}",
    "aiPrompt": "請幫我用 C# WinForms 撰寫一個 PLC 實體 I/O 監控器。\n包含：\n1. 一個 BackgroundWorker 或 Task 每 100ms 輪詢一次 PLC 的 X0~X7 與 Y0~Y7 狀態。\n2. 將 PLC 回傳的十六進位 ASCII 數據轉換為 8 個 boolean 狀態。\n3. 在 UI 上透過 16 個 Panel 動態呈現綠色 (ON) 或暗色 (OFF)。\n4. 包含掉線自動重連機制。",
    "applications": [
      {
        "scenario": "沖壓自動化安全光閘即時監控",
        "description": "高速輪詢 PLC 之 X0 (安全光閘信號) 與 X1 (防護門磁簧)，一旦遮光立刻於 SCADA 螢幕彈出最高等級黃光閃爍警報。",
        "icon": "fa-solid fa-shield-halved"
      }
    ],
    "references": [
      {
        "title": "Microsoft Learn - 使用 Timer 控制項排程工控任務",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/api/system.windows.forms.timer"
      }
    ]
  },
  {
    "id": "csharp-12",
    "labNumber": "12",
    "title": "工控資料視覺化：Form 轉圖片、圓餅圖與 DataGridView 資料庫表格",
    "date": "2026-08-21",
    "category": "數據視覺化",
    "summary": "將工控生產歷史數據寫入 DataGridView 資料庫表格，並利用 WinForms 自帶 Chart 元件繪製即時良率圓餅圖 (Pie Chart) 與趨勢曲線。更實作一鍵截取 Form 畫面 (DrawToBitmap) 輸出報表圖檔功能。",
    "flowImage": "images_src/ok/node-red_csharp_02-page-6.jpg",
    "resultImage": "images_src/ok/03-01_csharp.jpg",
    "flowTitle": "工控歷史數據流水線：PLC -> DataTable -> DataGridView -> Chart",
    "resultTitle": "生產批次產量統計、良率圓餅圖與報表匯出介面",
    "objective": "1. 掌握 DataGridView 與 DataTable 的雙向資料繫結 (Data Binding)。\n2. 學會使用 System.Windows.Forms.DataVisualization.Charting 繪製圓餅圖與折線圖。\n3. 實作以 GDI+ Graphics.CopyFromScreen 或 Control.DrawToBitmap 一鍵匯出高解析度生產報表截圖。",
    "tutorialSteps": [
      {
        "step": "1. 建立記憶體資料表 DataTable",
        "description": "建立包含「時間戳記」、「工件編號」、「檢驗尺寸」、「良品判定」四個欄位的 DataTable，並繫結至 DataGridView。"
      },
      {
        "step": "2. 配置圓餅圖 Series 與 Legends",
        "description": "拉取 Chart 控制項，設定 SeriesChartType.Pie，加入「合格良品」與「不良廢品」兩個資料點與對應色彩。"
      },
      {
        "step": "3. 即時數據動態灌入",
        "description": "每次檢驗完成，向 DataTable 插入一列 (NewRow)，Chart 即時重繪百分比標籤。"
      },
      {
        "step": "4. 實作表單一鍵截圖匯出",
        "description": "呼叫 this.DrawToBitmap() 將整個 WinForms 畫面儲存為 PNG 圖片，自動附加時間戳記歸檔於 D:\\Reports 資料夾。"
      }
    ],
    "csharpCode": "private void ExportFormToImage()\n{\n    // 建立與表單相同大小的 Bitmap\n    using (Bitmap bmp = new Bitmap(this.Width, this.Height))\n    {\n        // 將表單繪製至點陣圖中\n        this.DrawToBitmap(bmp, new Rectangle(0, 0, this.Width, this.Height));\n        \n        string filename = $\"Report_{DateTime.Now:yyyyMMdd_HHmmss}.png\";\n        bmp.Save(filename, System.Drawing.Imaging.ImageFormat.Png);\n        MessageBox.Show($\"生產報表截圖已成功儲存至：{filename}\");\n    }\n}\n\nprivate void UpdatePieChart(int passCount, int failCount)\n{\n    chartOee.Series[\"Yield\"].Points.Clear();\n    var passPoint = chartOee.Series[\"Yield\"].Points.Add(passCount);\n    passPoint.LegendText = $\"良品 ({passCount})\";\n    passPoint.Color = Color.SeaGreen;\n    \n    var failPoint = chartOee.Series[\"Yield\"].Points.Add(failCount);\n    failPoint.LegendText = $\"不良 ({failCount})\";\n    failPoint.Color = Color.Crimson;\n}",
    "aiPrompt": "請幫我用 C# WinForms 撰寫一個品質檢驗報表視覺化畫面。需求包含：\n1. 一個 DataGridView 呈現檢驗記錄 (時間、批號、數值、結果)。\n2. 一個 Chart 元件呈現良品與不良品比例的圓餅圖。\n3. 一個按鈕「匯出檢驗報表圖片」，呼叫 DrawToBitmap 將當前視窗存為 PNG 圖檔。\n4. 介面美觀，具備現代暗色工控主題風格。",
    "applications": [
      {
        "scenario": "交接班品質履歷報表自動歸檔",
        "description": "每日三班輪替時，系統自動將當班生產圓餅圖與檢驗明細截圖存檔，並自動上傳至廠務 NAS 檔案伺服器。",
        "icon": "fa-solid fa-chart-pie"
      }
    ],
    "references": [
      {
        "title": "Microsoft Learn - DataGridView 控制項概觀",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/controls/datagridview-control-overview-windows-forms"
      }
    ]
  },
  {
    "id": "csharp-13",
    "labNumber": "13",
    "title": "多協議物聯網整合：C# MQTT 遙測發布與 Modbus TCP 設備通訊",
    "date": "2026-08-22",
    "category": "物聯網通訊",
    "summary": "打破單一通訊限制，整合開源 MQTTnet 函式庫發布工控遙測資料至 Mosquitto / EMQX 雲端 Broker，並透過 NModbus4 函式庫以 Modbus TCP 協議直連智慧電表與變頻器，打造全功能物聯網閘道器。",
    "flowImage": "images_src/ok/node-red_csharp_02-page-7.jpg",
    "resultImage": "images_src/ok/03-02_csharp_web.jpg",
    "flowTitle": "C# 物聯網中繼閘道器：Modbus TCP 採集 -> MQTT JSON 發布",
    "resultTitle": "MQTT 主題監聽與 Modbus TCP 暫存器讀寫對照面板",
    "objective": "1. 掌握 NuGet 安裝與使用 MQTTnet (MQTT 用戶端) 及 NModbus4 函式庫。\n2. 理解 Modbus TCP 封包結構 (MBAP Header + PDU) 與保持暫存器 (Holding Register 4xxxx) 定址。\n3. 學會將現場設備二進位數據序列化為結構化 JSON 封包並發布至雲端主題。",
    "tutorialSteps": [
      {
        "step": "1. 安裝 NuGet 依賴套件",
        "description": "透過 NuGet 安裝 MQTTnet (4.x 版本) 與 NModbus4 (支援 Modbus TCP 主站/從站)。"
      },
      {
        "step": "2. 建立 Modbus TCP 連線並讀取電表",
        "description": "使用 TcpClient 連線電表 IP (例如 192.168.1.50:502)，呼叫 master.ReadHoldingRegisters(1, 0, 4) 讀取三相電壓與電流。"
      },
      {
        "step": "3. 封裝 JSON 遙測酬載",
        "description": "將電壓、電流、產量以 System.Text.Json.JsonSerializer 序列化為 {\"voltage\": 220.5, \"current\": 12.3}。"
      },
      {
        "step": "4. 透過 MQTT 發布至主題",
        "description": "向 MQTT Broker 發布主題 factory/line1/power，供 Node-RED、手機 App 或雲端戰情室即時訂閱。"
      }
    ],
    "csharpCode": "using MQTTnet;\nusing MQTTnet.Client;\nusing Modbus.Device;\nusing System.Net.Sockets;\n\npublic async Task PublishEnergyTelemetryAsync(string brokerIp, string modbusMeterIp)\n{\n    // 1. Modbus TCP 讀取智慧電表\n    using (TcpClient client = new TcpClient(modbusMeterIp, 502))\n    {\n        ModbusIpMaster master = ModbusIpMaster.CreateIp(client);\n        ushort[] registers = master.ReadHoldingRegisters(slaveId: 1, startAddress: 0, numberOfPoints: 2);\n        double voltage = registers[0] / 10.0; // 假設縮放比為 0.1\n        double current = registers[1] / 100.0;\n\n        // 2. MQTT 發布\n        var factory = new MqttFactory();\n        using (var mqttClient = factory.CreateMqttClient())\n        {\n            var options = new MqttClientOptionsBuilder().WithTcpServer(brokerIp, 1883).Build();\n            await mqttClient.ConnectAsync(options);\n            \n            string payload = $\"{{\\\"voltage\\\": {voltage}, \\\"current\\\": {current}, \\\"timestamp\\\": \\\"{DateTime.UtcNow:o}\\\"}}\";\n            var message = new MqttApplicationMessageBuilder()\n                .WithTopic(\"factory/line1/energy\")\n                .WithPayload(payload)\n                .WithQualityOfServiceLevel(MQTTnet.Protocol.MqttQualityOfServiceLevel.AtLeastOnce)\n                .Build();\n                \n            await mqttClient.PublishAsync(message);\n            await mqttClient.DisconnectAsync();\n        }\n    }\n}",
    "aiPrompt": "請幫我用 C# (.NET 8) 寫一個工業物聯網邊緣閘道器類別。\n功能要求：\n1. 使用 NModbus4 透過 Modbus TCP 讀取現場設備暫存器 (IP: 192.168.1.100, Port: 502)。\n2. 使用 MQTTnet 將讀取到的數值封裝成 JSON 封包。\n3. 發布至 MQTT Broker (IP: 192.168.1.10) 的工廠主題中。\n4. 包含完整 async/await 非同步操作與斷線重連機制。",
    "applications": [
      {
        "scenario": "全廠 ESG 碳盤查電力即時監控",
        "description": "各廠區配電盤智慧電表透過 Modbus TCP 被 C# 閘道器輪詢，每秒發布至 MQTT，連動碳排即時換算。",
        "icon": "fa-solid fa-leaf"
      }
    ],
    "references": [
      {
        "title": "MQTTnet GitHub 官方開源專案與範例庫",
        "url": "https://github.com/dotnet/MQTTnet"
      },
      {
        "title": "NModbus4 工業通訊開源函式庫",
        "url": "https://github.com/NModbus4/NModbus4"
      }
    ]
  },
  {
    "id": "csharp-14",
    "labNumber": "14",
    "title": "生成式 AI 語音與邊緣視覺：C# 串接 Gemini 雲端語音與 Ollama 邊緣車牌辨識",
    "date": "2026-08-23",
    "category": "AI整合應用",
    "summary": "將前瞻 AI 能力注入傳統工控！在 C# 中呼叫 Google Gemini API 進行工控自然語言意圖理解與設備故障診斷，並透過本地端 HTTP API 串接 Ollama 視覺模型 (LLaVA) 實現不連外網的安全車牌與工件瑕疵邊緣檢測。",
    "flowImage": "images_src/ok/node-red_csharp_02-page-8.jpg",
    "resultImage": "images_src/ok/03-02_csharp_web.jpg",
    "flowTitle": "雲端 GenAI (Gemini) 與地端邊緣視覺 (Ollama) 雙引擎架構",
    "resultTitle": "AI 自然語言語音控機與邊緣視覺車牌檢驗介面",
    "objective": "1. 掌握 C# HttpClient 呼叫雲端 Google Gemini REST API 並處理 JSON 結構。\n2. 學習在無網際網路的封閉廠區環境下，使用 C# 串接本地端 Ollama 邊緣推論伺服器。\n3. 實作將相機捕獲之圖片轉 Base64 編碼，由 AI 辨識字元並自動驅動 PLC 閘門放行。",
    "tutorialSteps": [
      {
        "step": "1. 設定 Gemini API 金鑰與連線客戶端",
        "description": "向 Google AI Studio 申請 API Key，使用 HttpClient 發送 Prompt 要求分析 PLC 報警代碼並回傳修復建議。"
      },
      {
        "step": "2. 本地端 Ollama 視覺模型配置",
        "description": "在工廠邊緣伺服器運行 `ollama run llava`，開啟本機連接埠 11434。"
      },
      {
        "step": "3. 圖片編碼與 AI 視覺辨識",
        "description": "將車道相機拍攝之車牌 JPG 圖檔轉換為 Base64 字串，向 http://localhost:11434/api/generate 發送推論請求。"
      },
      {
        "step": "4. 串接三菱 PLC 開閘放行",
        "description": "比對回傳字元與授權名單，若驗證通過則 C# 自動發送指令強制 PLC 輸出 Y0=ON 抬起道閘欄杆。"
      }
    ],
    "csharpCode": "using System.Net.Http;\nusing System.Text;\nusing System.Text.Json;\n\npublic class LocalOllamaVisionService\n{\n    private static readonly HttpClient _httpClient = new HttpClient();\n\n    public async Task<string> RecognizeLicensePlateAsync(string imagePath)\n    {\n        // 讀取圖片轉為 Base64\n        byte[] imageBytes = File.ReadAllBytes(imagePath);\n        string base64Image = Convert.ToBase64String(imageBytes);\n\n        var requestBody = new\n        {\n            model = \"llava\",\n            prompt = \"請辨識圖片中的車牌號碼，只需直接回傳車牌英文與數字，不要任何多餘說明。\",\n            stream = false,\n            images = new string[] { base64Image }\n        };\n\n        string json = JsonSerializer.Serialize(requestBody);\n        var content = new StringContent(json, Encoding.UTF8, \"application/json\");\n\n        var response = await _httpClient.PostAsync(\"http://localhost:11434/api/generate\", content);\n        string responseJson = await response.Content.ReadAsStringAsync();\n        \n        using var doc = JsonDocument.Parse(responseJson);\n        return doc.RootElement.GetProperty(\"response\").GetString().Trim();\n    }\n}",
    "aiPrompt": "請幫我用 C# (.NET 8) 撰寫一個 AI 視覺檢驗輔助類別。\n包含：\n1. 讀取本機影像檔並壓縮至合適解析度轉 Base64。\n2. 呼叫本地端 Ollama (http://localhost:11434/api/generate) 的 llava 視覺模型。\n3. Prompt: \"檢查該工件表面是否有刮痕或破損，以 JSON 格式回傳 {hasDefect: bool, confidence: float, defectType: string}\"。\n4. 解析 JSON 並在介面上彈出判定指示。",
    "applications": [
      {
        "scenario": "物流園區智慧車牌辨識與自動過磅",
        "description": "貨車駛上地磅時相機取像，地端 AI 0.8秒內識別車牌，C# 比對提貨單號後自動啟動 PLC 抬桿放行。",
        "icon": "fa-solid fa-truck"
      }
    ],
    "references": [
      {
        "title": "Google AI Studio 官方開發文檔與 API 說明",
        "url": "https://aistudio.google.com/"
      },
      {
        "title": "Ollama 官方本地端模型庫與 API 文檔",
        "url": "https://ollama.com/"
      }
    ]
  },
  {
    "id": "csharp-15",
    "labNumber": "15",
    "title": "工業 4.0 整合實戰：Epson 機械手臂 API 控制、時序資料庫與 Android 行動監控",
    "date": "2026-08-25",
    "category": "工業4.0",
    "summary": "全端工控整合大成！串接 Epson 4軸機械手臂控制器 API 實現自走點位路徑規劃，將每秒高頻感測數據寫入 InfluxDB 時序資料庫以 Grafana 呈現，並支援 Android 手機遠端連線監控，打造零死角的現代智慧工廠中控台。",
    "flowImage": "images_src/ok/node-red_csharp_02-page-10.jpg",
    "resultImage": "images_src/ok/03-02_csharp_web.jpg",
    "flowTitle": "工業 4.0 全系統數據流：Epson 手臂 + InfluxDB + Grafana + 手機端",
    "resultTitle": "工控中央戰情監控台與 Epson 手臂動作監視畫面",
    "objective": "1. 掌握 Epson RC+ 機器人控制器通訊介面 (SpelNetLib / Ethernet 通訊協定)。\n2. 學習將百萬筆高頻工控遙測資料高效批次寫入 InfluxDB 2.x 時序資料庫。\n3. 理解行動端 (Android App / Web HMI) 與 PC 主控台間的 Socket 授權通訊機制。",
    "tutorialSteps": [
      {
        "step": "1. 引用 Epson 機械手臂控制器通訊函式庫",
        "description": "引用 SpelNetLib 類別庫，初始化 Spel 物件，建立與 Epson RC700/RC90 控制器的 TCP/IP 連線。"
      },
      {
        "step": "2. 撰寫手臂點位取放 (Pick & Place) 任務",
        "description": "發送馬達勵磁 (MotorsOn)、歸零 (Home)、直線插補運動 (Go P1, Jump P2) 與真空吸嘴 I/O 開關控制。"
      },
      {
        "step": "3. 整合 InfluxDB 時序資料庫寫入",
        "description": "使用 InfluxDB.Client 函式庫，將手臂各軸扭力 (Torque) 與馬達溫度非同步寫入時序資料庫，供 Grafana 繪製預測性維護圖表。"
      },
      {
        "step": "4. 建立手機端遠端監控伺服器",
        "description": "在 C# 中啟動非同步 WebSocket 伺服器，將現場手臂即時 X-Y-Z 座標推播至廠長手機 Android App 儀表板。"
      }
    ],
    "csharpCode": "using InfluxDB.Client;\nusing InfluxDB.Client.Api.Domain;\nusing InfluxDB.Client.Writes;\n\npublic class IndustrialHistorianService\n{\n    private readonly InfluxDBClient _influxClient;\n    private const string Bucket = \"factory_metrics\";\n    private const string Org = \"wugu_ai\";\n\n    public IndustrialHistorianService(string serverUrl, string token)\n    {\n        _influxClient = new InfluxDBClient(serverUrl, token);\n    }\n\n    public async Task WriteRobotTorqueAsync(string robotId, double j1Torque, double j2Torque, double temp)\n    {\n        var point = PointData.Measurement(\"robot_telemetry\")\n            .Tag(\"robot_id\", robotId)\n            .Field(\"j1_torque\", j1Torque)\n            .Field(\"j2_torque\", j2Torque)\n            .Field(\"motor_temp\", temp)\n            .Timestamp(DateTime.UtcNow, WritePrecision.Ns);\n\n        using (var writeApi = _influxClient.GetWriteApi())\n        {\n            writeApi.WritePoint(point, Bucket, Org);\n        }\n    }\n}",
    "aiPrompt": "請幫我用 C# (.NET 8) 寫一個工業 4.0 整合調度服務類別。\n包含：\n1. 連接 Epson 機械手臂發送運動指令方法 (模擬通訊協定封包)。\n2. 使用 InfluxDB.Client 非同步寫入各軸即時溫度與扭力點位數據。\n3. 提供一個輕量級 HttpListener 或 WebSocket 廣播當前機台狀態供手機端 Android App 輪詢。\n4. 結構嚴謹，符合現代軟體工程 SOLID 原則。",
    "applications": [
      {
        "scenario": "高科技晶圓封測無人化關燈工廠",
        "description": "Epson 機械手臂自主取放載盤，巨量運轉數據全自動串流寫入 InfluxDB，遠端工程師透過手機隨時掌握稼動。",
        "icon": "fa-solid fa-robot"
      }
    ],
    "references": [
      {
        "title": "Epson Robots 官方開發者技術支援手冊",
        "url": "https://epson.com/industrial-robots"
      },
      {
        "title": "InfluxDB 官方 .NET Client 開發指南",
        "url": "https://github.com/influxdata/influxdb-client-csharp"
      }
    ]
  }
];
