// C# 工控實驗課程資料 (自動根據投影片產生)
// 包含全投影片 44 個具體實作 Labs，每個 Lab 皆含投影片截圖與詳細說明

var INITIAL_CSHARP_DATA = [
  {
    "id": "cs-lab-00-01",
    "labNumber": "00-01",
    "title": "LAB_00-01: Main_console 主控台程式基礎",
    "date": "2026-08-15",
    "category": "單元 00: 主控台基礎",
    "summary": "C# 主控台應用程式的專案建立、編譯目錄 (bin\\Debug) 與 Main 進入點概念。",
    "image": "images_src/csharp_labs/slides_intro/intro_024.png",
    "objective": "1. 理解並掌握 LAB_00-01: Main_console 主控台程式基礎 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.24 實作解析",
        "description": "Step 4. 建置 -> 開始 課本p1-34，WriteLine",
        "image": "images_src/csharp_labs/slides_intro/intro_024.png",
        "imageCaption": "投影片第 24 頁：LAB_00-01: Main_console 主控台程式基礎 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.25 實作解析",
        "description": "執行結果",
        "image": "images_src/csharp_labs/slides_intro/intro_025.png",
        "imageCaption": "投影片第 25 頁：LAB_00-01: Main_console 主控台程式基礎 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.26 實作解析",
        "description": "執行檔位置 LAB_00-01_Mian_console\\bin\\Debug\\LAB_00-01_Mian_console.exe",
        "image": "images_src/csharp_labs/slides_intro/intro_026.png",
        "imageCaption": "投影片第 26 頁：LAB_00-01: Main_console 主控台程式基礎 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.27 實作解析",
        "description": "開啟舊檔",
        "image": "images_src/csharp_labs/slides_intro/intro_027.png",
        "imageCaption": "投影片第 27 頁：LAB_00-01: Main_console 主控台程式基礎 核心說明與代碼"
      }
    ],
    "csharpCode": "using System;\n\nnamespace LAB_00_01_Main_console\n{\n    internal class Program\n    {\n        static void Main(string[] args)\n        {\n            Console.WriteLine(\"Hello, C# Industrial Control!\");\n            Console.WriteLine(\"專案編譯輸出於: bin\\\\Debug\\\\\");\n            Console.ReadKey();\n        }\n    }\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_00-01: Main_console 主控台程式基礎 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_00-01: Main_console 主控台程式基礎 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-01-01",
    "labNumber": "01-01",
    "title": "LAB_01-01: 標籤(Label)、圖片(Picture)、按鈕(Button)、文字(Text)",
    "date": "2026-08-15",
    "category": "單元 01: 基礎視窗控制項",
    "summary": "學習 Windows Forms 核心控制項配置，包含 Label 顯示文字、PictureBox 載入圖片、Button 按鈕事件與 TextBox 文字輸入。",
    "image": "images_src/csharp_labs/slides/slide_040.png",
    "objective": "1. 理解並掌握 LAB_01-01: 標籤(Label)、圖片(Picture)、按鈕(Button)、文字(Text) 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.40 實作解析",
        "description": "LAB_01-01: 標籤(Label)、圖片(Picture)、按鈕(Button)、文字(Text)",
        "image": "images_src/csharp_labs/slides/slide_040.png",
        "imageCaption": "投影片第 40 頁：LAB_01-01: 標籤(Label)、圖片(Picture)、按鈕(Button)、文字(Text) 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.41 實作解析",
        "description": "調整picturebox照片大小 https://learn.microsoft.com/zh-tw/dotnet/api/system.windows.forms.pictureboxsizemode?view=windowsdesktop-7.0 Zoom: 維持比例 P6-34",
        "image": "images_src/csharp_labs/slides/slide_041.png",
        "imageCaption": "投影片第 41 頁：LAB_01-01: 標籤(Label)、圖片(Picture)、按鈕(Button)、文字(Text) 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.42 實作解析",
        "description": "Button -> BackgaoundImageButton -> Cursor",
        "image": "images_src/csharp_labs/slides/slide_042.png",
        "imageCaption": "投影片第 42 頁：LAB_01-01: 標籤(Label)、圖片(Picture)、按鈕(Button)、文字(Text) 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_01-01: 控制項基本事件與介面配置\nprivate void button1_Click(object sender, EventArgs e)\n{\n    label1.Text = \"機台狀態: 運轉中 (RUN)\";\n    textBox1.Text = \"歡迎進入 C# 工控人機介面開發\";\n    // 載入專案圖片資源\n    pictureBox1.Image = Properties.Resources.motor_running;\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_01-01: 標籤(Label)、圖片(Picture)、按鈕(Button)、文字(Text) 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_01-01: 標籤(Label)、圖片(Picture)、按鈕(Button)、文字(Text) 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-01-02",
    "labNumber": "01-02",
    "title": "LAB_01-02: 變更屬性 (Properties)",
    "date": "2026-08-15",
    "category": "單元 01: 基礎視窗控制項",
    "summary": "掌握透過程式碼與屬性面板動態變更控制項外觀，包括 BackColor 背景色、Font 字型大小、ForeColor 前景色與 Size 尺寸。",
    "image": "images_src/csharp_labs/slides/slide_043.png",
    "objective": "1. 理解並掌握 LAB_01-02: 變更屬性 (Properties) 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.43 實作解析",
        "description": "LAB_01-02: 變更屬性 https://docs.microsoft.com/zh-tw/dotnet/api/system.drawing.font.-ctor?view=dotnet-plat-ext-6.0#system-drawing-font-ctor(system-drawing-font-system-drawing-fontstyle...",
        "image": "images_src/csharp_labs/slides/slide_043.png",
        "imageCaption": "投影片第 43 頁：LAB_01-02: 變更屬性 (Properties) 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.44 實作解析",
        "description": "https://learn.microsoft.com/zh-tw/dotnet/api/system.windows.forms.textbox.textalign?view=windowsdesktop-7.0",
        "image": "images_src/csharp_labs/slides/slide_044.png",
        "imageCaption": "投影片第 44 頁：LAB_01-02: 變更屬性 (Properties) 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.45 實作解析",
        "description": "HorizontalAlignment https://learn.microsoft.com/zh-tw/dotnet/api/system.windows.forms.horizontalalignment?view=windowsdesktop-7.0 指定控制項中的物件或文字如何水平對齊於相關的控制項項目。",
        "image": "images_src/csharp_labs/slides/slide_045.png",
        "imageCaption": "投影片第 45 頁：LAB_01-02: 變更屬性 (Properties) 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.46 實作解析",
        "description": "ContentAlignment https://learn.microsoft.com/zh-tw/dotnet/api/system.drawing.contentalignment?view=windowsdesktop-7.0 繪圖表面上的內容對齊 課本p5-38，標籤對齊",
        "image": "images_src/csharp_labs/slides/slide_046.png",
        "imageCaption": "投影片第 46 頁：LAB_01-02: 變更屬性 (Properties) 核心說明與代碼"
      },
      {
        "step": "步驟 5: 投影片 P.47 實作解析",
        "description": "FromArgb https://learn.microsoft.com/zh-tw/dotnet/api/system.drawing.color.fromargb?view=net-8.0",
        "image": "images_src/csharp_labs/slides/slide_047.png",
        "imageCaption": "投影片第 47 頁：LAB_01-02: 變更屬性 (Properties) 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_01-02: 透過程式碼動態修改屬性\nprivate void btnAlarm_Click(object sender, EventArgs e)\n{\n    // 修改背景色與文字顏色\n    labelStatus.BackColor = Color.Red;\n    labelStatus.ForeColor = Color.White;\n    labelStatus.Text = \"警告: 產線異常停機！\";\n    // 動態修改字體大小\n    labelStatus.Font = new Font(\"微軟正黑體\", 16F, FontStyle.Bold);\n    btnAlarm.Size = new Size(160, 50);\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_01-02: 變更屬性 (Properties) 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_01-02: 變更屬性 (Properties) 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-02-01",
    "labNumber": "02-01",
    "title": "LAB_02-01: 計算機 (Calculator)",
    "date": "2026-08-15",
    "category": "單元 02: 運算與數值轉換",
    "summary": "實作簡易四則運算計算機，學習 Convert.ToInt32() 數值型態轉換、變數宣告與加減乘除運算子應用。",
    "image": "images_src/csharp_labs/slides/slide_048.png",
    "objective": "1. 理解並掌握 LAB_02-01: 計算機 (Calculator) 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.48 實作解析",
        "description": "LAB_02-01: 計算機 Convert.ToInt32 方法 Convert.ToString 方法 https://learn.microsoft.com/zh-tw/dotnet/api/system.convert.toint32?view=net-8.0",
        "image": "images_src/csharp_labs/slides/slide_048.png",
        "imageCaption": "投影片第 48 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.49 實作解析",
        "description": "LAB_02-01: 計算機 整數宣告 課本p1-23 變數與常數 簡單運算",
        "image": "images_src/csharp_labs/slides/slide_049.png",
        "imageCaption": "投影片第 49 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.50 實作解析",
        "description": "50 1-4 基本資料型別 C# 是一種嚴謹的程式語言，程式中所使到的資料在處理前都必須先做宣告。 電腦可以處理的資料分為數值資料和非數值資料，前者可以做四則運算，後者無法做四則運算。",
        "image": "images_src/csharp_labs/slides/slide_050.png",
        "imageCaption": "投影片第 50 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.51 實作解析",
        "description": "51 程式語言會對不同性質的資料賦予適當的資料型別，每種資料型別的資料大小(範圍)都有限制，以方便在宣告變數或常數時能配置適當的記憶體空間來存放資料。 C# 程式語言為靈活使用數值資料，將數值資料依是否帶有小數點細分成整數、短整數、長整數、浮點數和倍精確度資料。 將非數值資料細分成字元、字串、布林、物件等資料型別。",
        "image": "images_src/csharp_labs/slides/slide_051.png",
        "imageCaption": "投影片第 51 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 5: 投影片 P.52 實作解析",
        "description": "依投影片第 52 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_052.png",
        "imageCaption": "投影片第 52 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 6: 投影片 P.53 實作解析",
        "description": "53",
        "image": "images_src/csharp_labs/slides/slide_053.png",
        "imageCaption": "投影片第 53 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 7: 投影片 P.54 實作解析",
        "description": "Overflow P1-23",
        "image": "images_src/csharp_labs/slides/slide_054.png",
        "imageCaption": "投影片第 54 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 8: 投影片 P.55 實作解析",
        "description": "55 55 由上表得知C# 的數值資料部分，可分為有號數值資料和無號數值資料兩種。 有號數值資料帶有正負號；而無號數值資料只能存放正數和0。",
        "image": "images_src/csharp_labs/slides/slide_055.png",
        "imageCaption": "投影片第 55 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 9: 投影片 P.56 實作解析",
        "description": "56 1-5 變數與常數 變數就是程式執行時，內容會隨程式執行而改變。 變數和常數都要先宣告才可使用，宣告的目的是在給予資料一個名稱以供程式識別，並針對資料的性質和所容許的大小設定適當的資料型別，以方便配置適當的記憶空間來存放資料。",
        "image": "images_src/csharp_labs/slides/slide_056.png",
        "imageCaption": "投影片第 56 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 10: 投影片 P.57 實作解析",
        "description": "57 一、識別字 識別字是用來對程式中的方法、變數…等命名以便識別，命名時最好使用有意義的名稱，來增加程式的可讀性。識別字的命名規則如下： 第一個字元必須用A~Z、a~z或_(底線)等字元，第二個字元起還可以使用數字(0~9)。",
        "image": "images_src/csharp_labs/slides/slide_057.png",
        "imageCaption": "投影片第 57 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 11: 投影片 P.58 實作解析",
        "description": "58 58",
        "image": "images_src/csharp_labs/slides/slide_058.png",
        "imageCaption": "投影片第 58 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 12: 投影片 P.59 實作解析",
        "description": "59 二、變數的宣告 程式中靈活使用變數，可讓程式執行時能隨時更改變數的內容，使得程式更富彈性。 宣告變數時要賦予變數名稱和資料型別，以便配置足夠容納該變數的記憶體空間。",
        "image": "images_src/csharp_labs/slides/slide_059.png",
        "imageCaption": "投影片第 59 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 13: 投影片 P.60 實作解析",
        "description": "60 三、變數初值的設定 變數只能放一個資料，存放的資料為「變數值」。 若變數未指定初值系統會給預設值。數值變數，預設值為0；布林變數為false；字串變數為null。",
        "image": "images_src/csharp_labs/slides/slide_060.png",
        "imageCaption": "投影片第 60 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 14: 投影片 P.61 實作解析",
        "description": "61 指定變數值時，若要明確表示數值的資料型別時，可以在數值後面加上代碼來指定。 例如123這個數，可以是整數、長整數、浮點數、倍精確數…，若要指定為長整數，則可以用123L來指定；若要指定為浮點數，則可以用123F。 常用的代碼為：長整數(L)、浮點數(F)、倍精確度(D)、貨幣(M)。",
        "image": "images_src/csharp_labs/slides/slide_061.png",
        "imageCaption": "投影片第 61 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 15: 投影片 P.62 實作解析",
        "description": "62 四、常數(constant) 程式執行的過程中有些資料是始終不變，而且會在程式中重複出現，此時可以使用const關鍵字，宣告一個常數名稱來代替這不變的資料。 使用常數程式較易維護。",
        "image": "images_src/csharp_labs/slides/slide_062.png",
        "imageCaption": "投影片第 62 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 16: 投影片 P.63 實作解析",
        "description": "63 4-7 變數的生命期 在C# 中宣告的變數會因為宣告的位置不同，變數的有效範圍會有所不同。 變數一離開有效範圍，變數占用的記憶體系統會回收，變數的生命就結束。",
        "image": "images_src/csharp_labs/slides/slide_063.png",
        "imageCaption": "投影片第 63 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 17: 投影片 P.64 實作解析",
        "description": "64 在for、foreach、switch程式區塊內所宣告的變數稱為「區塊變數」(block variable)，變數的有效範圍只在該程式區塊內，結束迴圈變數就會消失。 一、區塊變數",
        "image": "images_src/csharp_labs/slides/slide_064.png",
        "imageCaption": "投影片第 64 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      },
      {
        "step": "步驟 18: 投影片 P.65 實作解析",
        "description": "65 在方法內所宣告的變數或參數，是屬於該方法範圍的「區域變數」，方法結束執行變數也就消失。 二、區域變數",
        "image": "images_src/csharp_labs/slides/slide_065.png",
        "imageCaption": "投影片第 65 頁：LAB_02-01: 計算機 (Calculator) 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_02-01: 四則運算計算機\nprivate void btnAdd_Click(object sender, EventArgs e)\n{\n    int num1 = Convert.ToInt32(textBox1.Text);\n    int num2 = Convert.ToInt32(textBox2.Text);\n    int result = num1 + num2;\n    labelResult.Text = \"運算結果: \" + result.ToString();\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_02-01: 計算機 (Calculator) 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_02-01: 計算機 (Calculator) 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-02-02",
    "labNumber": "02-02",
    "title": "LAB_02-02: 加總運算 (Summation)",
    "date": "2026-08-15",
    "category": "單元 02: 運算與數值轉換",
    "summary": "學習連續數值累加運算，運用變數儲存累積結果並輸出至介面。",
    "image": "images_src/csharp_labs/slides/slide_066.png",
    "objective": "1. 理解並掌握 LAB_02-02: 加總運算 (Summation) 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.66 實作解析",
        "description": "LAB_02-02: 加總",
        "image": "images_src/csharp_labs/slides/slide_066.png",
        "imageCaption": "投影片第 66 頁：LAB_02-02: 加總運算 (Summation) 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.67 實作解析",
        "description": "LAB_02-02: 加總 四則運算 變數宣告初始值 課本p1-25 變數初值設定",
        "image": "images_src/csharp_labs/slides/slide_067.png",
        "imageCaption": "投影片第 67 頁：LAB_02-02: 加總運算 (Summation) 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_02-02: 數值累加運算\nint totalSum = 0;\nprivate void btnAccumulate_Click(object sender, EventArgs e)\n{\n    int inputVal = int.Parse(textBoxVal.Text);\n    totalSum += inputVal;\n    lblTotal.Text = \"累加總值: \" + totalSum.ToString();\n    textBoxVal.Clear();\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_02-02: 加總運算 (Summation) 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_02-02: 加總運算 (Summation) 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-02-03",
    "labNumber": "02-03",
    "title": "LAB_02-03: 變數作用域 (Scope of Variables)",
    "date": "2026-08-15",
    "category": "單元 02: 運算與數值轉換",
    "summary": "深入理解區域變數 (Local Variables) 與全域變數 (Global / Field Variables) 的生命週期與存取權限。",
    "image": "images_src/csharp_labs/slides/slide_068.png",
    "objective": "1. 理解並掌握 LAB_02-03: 變數作用域 (Scope of Variables) 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.68 實作解析",
        "description": "public partial class Form1 : Form { int a = 0; }",
        "image": "images_src/csharp_labs/slides/slide_068.png",
        "imageCaption": "投影片第 68 頁：LAB_02-03: 變數作用域 (Scope of Variables) 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.69 實作解析",
        "description": "範疇(scope) 區域變數(local variables)， 宣告在某個函式(包含main()函式)內的變數， 其作用範圍僅限於其所在的函式內。",
        "image": "images_src/csharp_labs/slides/slide_069.png",
        "imageCaption": "投影片第 69 頁：LAB_02-03: 變數作用域 (Scope of Variables) 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.70 實作解析",
        "description": "生命週期(lifetime) 區域變數(local variables) 從其宣告開始至函式結束為止。 全域變數(global variables)",
        "image": "images_src/csharp_labs/slides/slide_070.png",
        "imageCaption": "投影片第 70 頁：LAB_02-03: 變數作用域 (Scope of Variables) 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.71 實作解析",
        "description": "https://ithelp.ithome.com.tw/articles/10257955",
        "image": "images_src/csharp_labs/slides/slide_071.png",
        "imageCaption": "投影片第 71 頁：LAB_02-03: 變數作用域 (Scope of Variables) 核心說明與代碼"
      },
      {
        "step": "步驟 5: 投影片 P.72 實作解析",
        "description": "記憶體空間",
        "image": "images_src/csharp_labs/slides/slide_072.png",
        "imageCaption": "投影片第 72 頁：LAB_02-03: 變數作用域 (Scope of Variables) 核心說明與代碼"
      },
      {
        "step": "步驟 6: 投影片 P.73 實作解析",
        "description": "73 4-7 變數的生命期 在C# 中宣告的變數會因為宣告的位置不同，變數的有效範圍會有所不同。 變數一離開有效範圍，變數占用的記憶體系統會回收，變數的生命就結束。",
        "image": "images_src/csharp_labs/slides/slide_073.png",
        "imageCaption": "投影片第 73 頁：LAB_02-03: 變數作用域 (Scope of Variables) 核心說明與代碼"
      },
      {
        "step": "步驟 7: 投影片 P.74 實作解析",
        "description": "74 在for、foreach、switch程式區塊內所宣告的變數稱為「區塊變數」(block variable)，變數的有效範圍只在該程式區塊內，結束迴圈變數就會消失。 一、區塊變數",
        "image": "images_src/csharp_labs/slides/slide_074.png",
        "imageCaption": "投影片第 74 頁：LAB_02-03: 變數作用域 (Scope of Variables) 核心說明與代碼"
      },
      {
        "step": "步驟 8: 投影片 P.75 實作解析",
        "description": "75 在方法內所宣告的變數或參數，是屬於該方法範圍的「區域變數」，方法結束執行變數也就消失。 二、區域變數",
        "image": "images_src/csharp_labs/slides/slide_075.png",
        "imageCaption": "投影片第 75 頁：LAB_02-03: 變數作用域 (Scope of Variables) 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_02-03: 變數作用域展示\npublic partial class Form1 : Form\n{\n    // 全域變數 (Class Field)\n    int globalCount = 0;\n\n    private void btnTest_Click(object sender, EventArgs e)\n    {\n        // 區域變數 (Local Variable)\n        int localCount = 10;\n        globalCount++;\n        label1.Text = $\"全域計數: {globalCount}, 區域值: {localCount}\";\n    }\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_02-03: 變數作用域 (Scope of Variables) 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_02-03: 變數作用域 (Scope of Variables) 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-02-04",
    "labNumber": "02-04",
    "title": "LAB_02-04: 單位換算 (Unit Conversion)",
    "date": "2026-08-15",
    "category": "單元 02: 運算與數值轉換",
    "summary": "建構工控長度與溫度單位換算器，掌握浮點數 float / double 運算與格式化字串輸出。",
    "image": "images_src/csharp_labs/slides/slide_076.png",
    "objective": "1. 理解並掌握 LAB_02-04: 單位換算 (Unit Conversion) 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.76 實作解析",
        "description": "LAB_02-04: 單位換算 https://docs.microsoft.com/zh-tw/dotnet/api/system.convert.todouble?view=net-6.0 Convert.ToDouble 方法 將指定的值轉換為雙精確度浮點數。",
        "image": "images_src/csharp_labs/slides/slide_076.png",
        "imageCaption": "投影片第 76 頁：LAB_02-04: 單位換算 (Unit Conversion) 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.77 實作解析",
        "description": "浮點數值型別 (C# 參考) 浮點數數值型別代表實數。 所有浮點數數值型別都是 實值型別。 它們也是 簡單的類型 ，而且可以使用 常值初始化。 所有浮點數數值型別都支援 算術、 比較和 等號 比較運算子。 https://learn.microsoft.com/zh-tw/dotnet/csharp/language-reference/builtin-ty...",
        "image": "images_src/csharp_labs/slides/slide_077.png",
        "imageCaption": "投影片第 77 頁：LAB_02-04: 單位換算 (Unit Conversion) 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.78 實作解析",
        "description": "https://docs.microsoft.com/zh-tw/cpp/cpp/data-type-ranges?view=msvc-170",
        "image": "images_src/csharp_labs/slides/slide_078.png",
        "imageCaption": "投影片第 78 頁：LAB_02-04: 單位換算 (Unit Conversion) 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.79 實作解析",
        "description": "http://cshartuc.blogspot.com/2011/12/tostring-tostring-intdoubletostring-c-2.html",
        "image": "images_src/csharp_labs/slides/slide_079.png",
        "imageCaption": "投影片第 79 頁：LAB_02-04: 單位換算 (Unit Conversion) 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_02-04: 單位換算\nprivate void btnConvert_Click(object sender, EventArgs e)\n{\n    // 攝氏轉華氏: F = C * 9/5 + 32\n    double celsius = double.Parse(txtCelsius.Text);\n    double fahrenheit = (celsius * 9.0 / 5.0) + 32.0;\n    lblFahrenheit.Text = string.Format(\"{0:F2} °F\", fahrenheit);\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_02-04: 單位換算 (Unit Conversion) 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_02-04: 單位換算 (Unit Conversion) 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-03-01",
    "labNumber": "03-01",
    "title": "LAB_03-01: 迴圈基礎 (For & While Loops)",
    "date": "2026-08-15",
    "category": "單元 03: 迴圈與邏輯結構",
    "summary": "學習 for 迴圈之初始值、終止條件與遞增運算，並掌握 while 迴圈在工控輪詢中的架構。",
    "image": "images_src/csharp_labs/slides/slide_080.png",
    "objective": "1. 理解並掌握 LAB_03-01: 迴圈基礎 (For & While Loops) 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.80 實作解析",
        "description": "LAB_03-01: 迴圈",
        "image": "images_src/csharp_labs/slides/slide_080.png",
        "imageCaption": "投影片第 80 頁：LAB_03-01: 迴圈基礎 (For & While Loops) 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.81 實作解析",
        "description": "迴圈運用-遞減 for (i = num; i > 0; i--) { textBox2.AppendText(i.ToString() + \"\\r\\n\");",
        "image": "images_src/csharp_labs/slides/slide_081.png",
        "imageCaption": "投影片第 81 頁：LAB_03-01: 迴圈基礎 (For & While Loops) 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.82 實作解析",
        "description": "迴圈運用-遞增 for (i = 0; i < num; i++) { textBox2.AppendText(i.ToString() + \"\\r\\n\");",
        "image": "images_src/csharp_labs/slides/slide_082.png",
        "imageCaption": "投影片第 82 頁：LAB_03-01: 迴圈基礎 (For & While Loops) 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.83 實作解析",
        "description": "依投影片第 83 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_083.png",
        "imageCaption": "投影片第 83 頁：LAB_03-01: 迴圈基礎 (For & While Loops) 核心說明與代碼"
      },
      {
        "step": "步驟 5: 投影片 P.84 實作解析",
        "description": "依投影片第 84 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_084.png",
        "imageCaption": "投影片第 84 頁：LAB_03-01: 迴圈基礎 (For & While Loops) 核心說明與代碼"
      },
      {
        "step": "步驟 6: 投影片 P.85 實作解析",
        "description": "依投影片第 85 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_085.png",
        "imageCaption": "投影片第 85 頁：LAB_03-01: 迴圈基礎 (For & While Loops) 核心說明與代碼"
      },
      {
        "step": "步驟 7: 投影片 P.86 實作解析",
        "description": "依投影片第 86 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_086.png",
        "imageCaption": "投影片第 86 頁：LAB_03-01: 迴圈基礎 (For & While Loops) 核心說明與代碼"
      },
      {
        "step": "步驟 8: 投影片 P.87 實作解析",
        "description": "https://docs.google.com/presentation/d/10PpCTBVYL_DscMEeNI1wmjdriQJpMxp6BLJzJribrJY/edit?slide=id.p1#slide=id.p1",
        "image": "images_src/csharp_labs/slides/slide_087.png",
        "imageCaption": "投影片第 87 頁：LAB_03-01: 迴圈基礎 (For & While Loops) 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_03-01: For / While 迴圈\nprivate void btnRunLoop_Click(object sender, EventArgs e)\n{\n    txtLog.Clear();\n    for (int i = 1; i <= 10; i++)\n    {\n        txtLog.AppendText($\"輪詢第 {i} 次機台狀態...\\r\\n\");\n    }\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_03-01: 迴圈基礎 (For & While Loops) 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_03-01: 迴圈基礎 (For & While Loops) 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-03-02",
    "labNumber": "03-02",
    "title": "LAB_03-02: 2的次方指數計算",
    "date": "2026-08-15",
    "category": "單元 03: 迴圈與邏輯結構",
    "summary": "運用迴圈進行 2 的次方連續相乘計算，掌握工控二進位權重概念與 Math.Pow() 函數。",
    "image": "images_src/csharp_labs/slides/slide_088.png",
    "objective": "1. 理解並掌握 LAB_03-02: 2的次方指數計算 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.88 實作解析",
        "description": "LAB_03-02: 2次方 for (i = 0; i < power; i++) { result = result * 2;",
        "image": "images_src/csharp_labs/slides/slide_088.png",
        "imageCaption": "投影片第 88 頁：LAB_03-02: 2的次方指數計算 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.89 實作解析",
        "description": "Overflow",
        "image": "images_src/csharp_labs/slides/slide_089.png",
        "imageCaption": "投影片第 89 頁：LAB_03-02: 2的次方指數計算 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.90 實作解析",
        "description": "「精確度 vs. 數值範圍 它們佔用的總位元數（Total Bits）是一樣的，但「分配方式」完全不同。 雖然 double 和 ulong 在記憶體中都佔用 64 位元 (8 Bytes)，但它們解釋這些位元的方式決定了它們能表達的範圍與精準度。",
        "image": "images_src/csharp_labs/slides/slide_090.png",
        "imageCaption": "投影片第 90 頁：LAB_03-02: 2的次方指數計算 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.91 實作解析",
        "description": "double值也由極限",
        "image": "images_src/csharp_labs/slides/slide_091.png",
        "imageCaption": "投影片第 91 頁：LAB_03-02: 2的次方指數計算 核心說明與代碼"
      },
      {
        "step": "步驟 5: 投影片 P.92 實作解析",
        "description": "依投影片第 92 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_092.png",
        "imageCaption": "投影片第 92 頁：LAB_03-02: 2的次方指數計算 核心說明與代碼"
      },
      {
        "step": "步驟 6: 投影片 P.93 實作解析",
        "description": "double IEEE 754 標準。這是全球電腦通用的二進位浮點數算術標準。 計初衷是用有限的空間（64位元）換取最大的表達範圍。它就像是一個聰明的科學家，記錄數字時只抓大方向（指數）和最重要的細節（尾數），但對於微不足道的末位誤差，它選擇忽略。",
        "image": "images_src/csharp_labs/slides/slide_093.png",
        "imageCaption": "投影片第 93 頁：LAB_03-02: 2的次方指數計算 核心說明與代碼"
      },
      {
        "step": "步驟 7: 投影片 P.94 實作解析",
        "description": "依投影片第 94 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_094.png",
        "imageCaption": "投影片第 94 頁：LAB_03-02: 2的次方指數計算 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_03-02: 2的次方計算\nprivate void btnPower_Click(object sender, EventArgs e)\n{\n    int baseVal = 2;\n    int power = int.Parse(txtPower.Text);\n    long result = 1;\n    for (int i = 1; i <= power; i++)\n    {\n        result *= baseVal;\n    }\n    lblResult.Text = $\"2^{power} = {result}\";\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_03-02: 2的次方指數計算 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_03-02: 2的次方指數計算 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-03-03",
    "labNumber": "03-03",
    "title": "LAB_03-03: 星號字元累積輸出",
    "date": "2026-08-15",
    "category": "單元 03: 迴圈與邏輯結構",
    "summary": "學習字串累積運算元 (+=) 與單層迴圈印出指定長度的連續星號。",
    "image": "images_src/csharp_labs/slides/slide_095.png",
    "objective": "1. 理解並掌握 LAB_03-03: 星號字元累積輸出 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.95 實作解析",
        "description": "LAB_03-03: 星號 for (int i = 0; i < num; i++) { txtOutput.Text = txtOutput.Text + \"*\";",
        "image": "images_src/csharp_labs/slides/slide_095.png",
        "imageCaption": "投影片第 95 頁：LAB_03-03: 星號字元累積輸出 核心說明與代碼"
      }
    ],
    "csharpCode": "// C# 工控標準範例代碼\nprivate void ExecuteLabLogic()\n{\n    // 請參閱投影片中的詳細指令與介面綁定\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_03-03: 星號字元累積輸出 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_03-03: 星號字元累積輸出 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-03-04",
    "labNumber": "03-04",
    "title": "LAB_03-04: 直角三角形圖樣",
    "date": "2026-08-15",
    "category": "單元 03: 迴圈與邏輯結構",
    "summary": "學習雙層巢狀迴圈 (Nested Loops)，外層控制行數、內層控制每行李號數量印出直角三角形。",
    "image": "images_src/csharp_labs/slides/slide_098.png",
    "objective": "1. 理解並掌握 LAB_03-04: 直角三角形圖樣 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.98 實作解析",
        "description": "LAB_03-04: 直角三角形 第i列 有2*i-1個* for (i = 1; i <= size; i++) {",
        "image": "images_src/csharp_labs/slides/slide_098.png",
        "imageCaption": "投影片第 98 頁：LAB_03-04: 直角三角形圖樣 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.99 實作解析",
        "description": "for (i = 0; i < size; i++) { txtOutput2.Text = txtOutput2.Text + Environment.NewLine; }",
        "image": "images_src/csharp_labs/slides/slide_099.png",
        "imageCaption": "投影片第 99 頁：LAB_03-04: 直角三角形圖樣 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_03: 三角形星號產生函式\nprivate void DrawTriangle(int rows, bool invert = false)\n{\n    txtDisplay.Clear();\n    if (!invert) {\n        for (int i = 1; i <= rows; i++) {\n            txtDisplay.AppendText(new string('*', i) + \"\\r\\n\");\n        }\n    } else {\n        for (int i = rows; i >= 1; i--) {\n            txtDisplay.AppendText(new string('*', i) + \"\\r\\n\");\n        }\n    }\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_03-04: 直角三角形圖樣 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_03-04: 直角三角形圖樣 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-03-05",
    "labNumber": "03-05",
    "title": "LAB_03-05: 倒直角三角形圖樣",
    "date": "2026-08-15",
    "category": "單元 03: 迴圈與邏輯結構",
    "summary": "掌握反向遞減迴圈條件 (i--)，設計由多到少縮減的倒直角三角形圖案。",
    "image": "images_src/csharp_labs/slides/slide_100.png",
    "objective": "1. 理解並掌握 LAB_03-05: 倒直角三角形圖樣 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.100 實作解析",
        "description": "LAB_03-05: 倒直角三角形 for (i = size; i > 0; i--) { txtOutput2.Text = txtOutput2.Text + Environment.NewLine;",
        "image": "images_src/csharp_labs/slides/slide_100.png",
        "imageCaption": "投影片第 100 頁：LAB_03-05: 倒直角三角形圖樣 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.101 實作解析",
        "description": "for (i = 0; i < size; i++) { txtOutput2.Text = txtOutput2.Text + Environment.NewLine; }",
        "image": "images_src/csharp_labs/slides/slide_101.png",
        "imageCaption": "投影片第 101 頁：LAB_03-05: 倒直角三角形圖樣 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.102 實作解析",
        "description": "for (i = 0; i < size; i++) { txtOutput2.Text = txtOutput2.Text + Environment.NewLine; }",
        "image": "images_src/csharp_labs/slides/slide_102.png",
        "imageCaption": "投影片第 102 頁：LAB_03-05: 倒直角三角形圖樣 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_03: 三角形星號產生函式\nprivate void DrawTriangle(int rows, bool invert = false)\n{\n    txtDisplay.Clear();\n    if (!invert) {\n        for (int i = 1; i <= rows; i++) {\n            txtDisplay.AppendText(new string('*', i) + \"\\r\\n\");\n        }\n    } else {\n        for (int i = rows; i >= 1; i--) {\n            txtDisplay.AppendText(new string('*', i) + \"\\r\\n\");\n        }\n    }\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_03-05: 倒直角三角形圖樣 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_03-05: 倒直角三角形圖樣 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-03-06",
    "labNumber": "03-06",
    "title": "LAB_03-06: 直角三角形_函式封裝 (Function)",
    "date": "2026-08-15",
    "category": "單元 03: 迴圈與邏輯結構",
    "summary": "將三角形繪製演算法封裝為自訂方法 (Method)，支援傳入參數自訂三角形高度與字元。",
    "image": "images_src/csharp_labs/slides/slide_103.png",
    "objective": "1. 理解並掌握 LAB_03-06: 直角三角形_函式封裝 (Function) 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.103 實作解析",
        "description": "LAB_03-06: 直角正三角形_function 第i列 有2*i-1個* for (i = 1; i <= size; i++) {",
        "image": "images_src/csharp_labs/slides/slide_103.png",
        "imageCaption": "投影片第 103 頁：LAB_03-06: 直角三角形_函式封裝 (Function) 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_03: 三角形星號產生函式\nprivate void DrawTriangle(int rows, bool invert = false)\n{\n    txtDisplay.Clear();\n    if (!invert) {\n        for (int i = 1; i <= rows; i++) {\n            txtDisplay.AppendText(new string('*', i) + \"\\r\\n\");\n        }\n    } else {\n        for (int i = rows; i >= 1; i--) {\n            txtDisplay.AppendText(new string('*', i) + \"\\r\\n\");\n        }\n    }\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_03-06: 直角三角形_函式封裝 (Function) 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_03-06: 直角三角形_函式封裝 (Function) 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-03-07",
    "labNumber": "03-07",
    "title": "LAB_03-07: 倒直角三角形_函式封裝",
    "date": "2026-08-15",
    "category": "單元 03: 迴圈與邏輯結構",
    "summary": "將倒直角三角形邏輯獨立為重用函式，實現模組化程式架構。",
    "image": "images_src/csharp_labs/slides/slide_104.png",
    "objective": "1. 理解並掌握 LAB_03-07: 倒直角三角形_函式封裝 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.104 實作解析",
        "description": "LAB_03-07: 倒直角正三角形_function for (i = size; i > 0; i--) { print_star(i);",
        "image": "images_src/csharp_labs/slides/slide_104.png",
        "imageCaption": "投影片第 104 頁：LAB_03-07: 倒直角三角形_函式封裝 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_03: 三角形星號產生函式\nprivate void DrawTriangle(int rows, bool invert = false)\n{\n    txtDisplay.Clear();\n    if (!invert) {\n        for (int i = 1; i <= rows; i++) {\n            txtDisplay.AppendText(new string('*', i) + \"\\r\\n\");\n        }\n    } else {\n        for (int i = rows; i >= 1; i--) {\n            txtDisplay.AppendText(new string('*', i) + \"\\r\\n\");\n        }\n    }\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_03-07: 倒直角三角形_函式封裝 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_03-07: 倒直角三角形_函式封裝 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-03-08",
    "labNumber": "03-08",
    "title": "LAB_03-08: 等腰三角形星號陣列",
    "date": "2026-08-15",
    "category": "單元 03: 迴圈與邏輯結構",
    "summary": "結合空白字元位移與星號倍數關係，透過三層邏輯演算法繪製對稱等腰三角形。",
    "image": "images_src/csharp_labs/slides/slide_105.png",
    "objective": "1. 理解並掌握 LAB_03-08: 等腰三角形星號陣列 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.105 實作解析",
        "description": "LAB_03-08: 等腰三角形 第i列 有2*i-1個*，以及size-i個空格 for (i = 0; i <= size; i++) {",
        "image": "images_src/csharp_labs/slides/slide_105.png",
        "imageCaption": "投影片第 105 頁：LAB_03-08: 等腰三角形星號陣列 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.106 實作解析",
        "description": "Vibe Coding 1. UI設計。兩個文字方塊，一個當作輸入，一個當作輸出。 2. 文字方塊，輸入: 輸入數字，印出幾行。 3. 文字方塊，輸出: 輸出三角形，到此文字方塊。",
        "image": "images_src/csharp_labs/slides/slide_106.png",
        "imageCaption": "投影片第 106 頁：LAB_03-08: 等腰三角形星號陣列 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.107 實作解析",
        "description": "依投影片第 107 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_107.png",
        "imageCaption": "投影片第 107 頁：LAB_03-08: 等腰三角形星號陣列 核心說明與代碼"
      }
    ],
    "csharpCode": "// C# 工控標準範例代碼\nprivate void ExecuteLabLogic()\n{\n    // 請參閱投影片中的詳細指令與介面綁定\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_03-08: 等腰三角形星號陣列 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_03-08: 等腰三角形星號陣列 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-03-09",
    "labNumber": "03-09",
    "title": "LAB_03-09: 倒等腰三角形星號陣列",
    "date": "2026-08-15",
    "category": "單元 03: 迴圈與邏輯結構",
    "summary": "實現向下收斂的倒等腰三角形演算法，精準控制每行前置空白與星號數量。",
    "image": "images_src/csharp_labs/slides/slide_108.png",
    "objective": "1. 理解並掌握 LAB_03-09: 倒等腰三角形星號陣列 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.108 實作解析",
        "description": "LAB_03-08: 倒等腰三角形 第i列 有2*i-1個*，以及size-i個空格 for (i = size; i >0; i--) {",
        "image": "images_src/csharp_labs/slides/slide_108.png",
        "imageCaption": "投影片第 108 頁：LAB_03-09: 倒等腰三角形星號陣列 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.109 實作解析",
        "description": "依投影片第 109 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_109.png",
        "imageCaption": "投影片第 109 頁：LAB_03-09: 倒等腰三角形星號陣列 核心說明與代碼"
      }
    ],
    "csharpCode": "// C# 工控標準範例代碼\nprivate void ExecuteLabLogic()\n{\n    // 請參閱投影片中的詳細指令與介面綁定\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_03-09: 倒等腰三角形星號陣列 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_03-09: 倒等腰三角形星號陣列 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-03-10",
    "labNumber": "03-10",
    "title": "LAB_03-10: 等腰菱形圖形演算法",
    "date": "2026-08-15",
    "category": "單元 03: 迴圈與邏輯結構",
    "summary": "結合上半部正等腰與下半部倒等腰演算法，組裝完整的對稱幾何菱形。",
    "image": "images_src/csharp_labs/slides/slide_110.png",
    "objective": "1. 理解並掌握 LAB_03-10: 等腰菱形圖形演算法 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.110 實作解析",
        "description": "LAB_03-10: 等腰菱形 // 印出第i列 Void print_star(size, i){ // 第i列 有size-i個空格",
        "image": "images_src/csharp_labs/slides/slide_110.png",
        "imageCaption": "投影片第 110 頁：LAB_03-10: 等腰菱形圖形演算法 核心說明與代碼"
      }
    ],
    "csharpCode": "// C# 工控標準範例代碼\nprivate void ExecuteLabLogic()\n{\n    // 請參閱投影片中的詳細指令與介面綁定\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_03-10: 等腰菱形圖形演算法 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_03-10: 等腰菱形圖形演算法 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-03-11",
    "labNumber": "03-11",
    "title": "LAB_03-11: 矩形星號矩陣排版",
    "date": "2026-08-15",
    "category": "單元 03: 迴圈與邏輯結構",
    "summary": "利用雙重固定維度迴圈，在 TextBox 輸出 M x N 工控矩陣排版。",
    "image": "images_src/csharp_labs/slides/slide_096.png",
    "objective": "1. 理解並掌握 LAB_03-11: 矩形星號矩陣排版 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.96 實作解析",
        "description": "for(int j = 0; j < num2; j++) { txtOutput.Text = txtOutput.Text + \"\\r\\n\"; }",
        "image": "images_src/csharp_labs/slides/slide_096.png",
        "imageCaption": "投影片第 96 頁：LAB_03-11: 矩形星號矩陣排版 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.97 實作解析",
        "description": "https://docs.microsoft.com/zh-tw/dotnet/csharp/language-reference/statements/iteration-statement s",
        "image": "images_src/csharp_labs/slides/slide_097.png",
        "imageCaption": "投影片第 97 頁：LAB_03-11: 矩形星號矩陣排版 核心說明與代碼"
      }
    ],
    "csharpCode": "// C# 工控標準範例代碼\nprivate void ExecuteLabLogic()\n{\n    // 請參閱投影片中的詳細指令與介面綁定\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_03-11: 矩形星號矩陣排版 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_03-11: 矩形星號矩陣排版 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-03-12",
    "labNumber": "03-12",
    "title": "LAB_03-12: 雙重迴圈九九乘法表",
    "date": "2026-08-15",
    "category": "單元 03: 迴圈與邏輯結構",
    "summary": "工控經典邏輯題目：使用巢狀迴圈印出 1x1 到 9x9 的九九乘法排版與對齊。",
    "image": "images_src/csharp_labs/slides/slide_111.png",
    "objective": "1. 理解並掌握 LAB_03-12: 雙重迴圈九九乘法表 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.111 實作解析",
        "description": "LAB_03-12: 九九乘法 https://docs.microsoft.com/zh-tw/dotnet/csharp/tutorials/string-interpolation C# 中的字串插補 本教學課程會示範如何使用字串插補進行格式化，並將運算式結果包含在結果字串中。",
        "image": "images_src/csharp_labs/slides/slide_111.png",
        "imageCaption": "投影片第 111 頁：LAB_03-12: 雙重迴圈九九乘法表 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.112 實作解析",
        "description": "j i for (int i = 1; i <= 9; i++) {",
        "image": "images_src/csharp_labs/slides/slide_112.png",
        "imageCaption": "投影片第 112 頁：LAB_03-12: 雙重迴圈九九乘法表 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.113 實作解析",
        "description": "依投影片第 113 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_113.png",
        "imageCaption": "投影片第 113 頁：LAB_03-12: 雙重迴圈九九乘法表 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.114 實作解析",
        "description": "C# 中的字串插補 字串插補功能是以複合格式功能為基礎建置而成， 可提供更容易理解且方便的語法，在結果字串中包含已格式化的運算式結果。 若要將字串常值識別為插入字串，請在其前面加上 $ 符號。",
        "image": "images_src/csharp_labs/slides/slide_114.png",
        "imageCaption": "投影片第 114 頁：LAB_03-12: 雙重迴圈九九乘法表 核心說明與代碼"
      },
      {
        "step": "步驟 5: 投影片 P.115 實作解析",
        "description": "\\t \\r \\n\\f \\t \\r \\n都是轉義字符，空格就是單純的空格，輸入時可以輸入空格 \\t 的意思是：水平製表符。將當前位置移到下一個tab位置。 \\r 的意思是： 回車。將當前位置移到本行的開頭。",
        "image": "images_src/csharp_labs/slides/slide_115.png",
        "imageCaption": "投影片第 115 頁：LAB_03-12: 雙重迴圈九九乘法表 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_03-12: 雙重迴圈九九乘法表\nprivate void btnMultiTable_Click(object sender, EventArgs e)\n{\n    txtTable.Clear();\n    for (int i = 1; i <= 9; i++)\n    {\n        for (int j = 1; j <= 9; j++)\n        {\n            txtTable.AppendText($\"{i}x{j}={i*j,2}  \");\n        }\n        txtTable.AppendText(\"\\r\\n\");\n    }\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_03-12: 雙重迴圈九九乘法表 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_03-12: 雙重迴圈九九乘法表 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-03-13",
    "labNumber": "03-13",
    "title": "LAB_03-13: 物件導向基礎 (Class & Object)",
    "date": "2026-08-15",
    "category": "單元 03: 迴圈與邏輯結構",
    "summary": "學習定義 class 類別、宣告欄位與方法、使用 new 運算子實體化物件。",
    "image": "images_src/csharp_labs/slides/slide_116.png",
    "objective": "1. 理解並掌握 LAB_03-13: 物件導向基礎 (Class & Object) 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.116 實作解析",
        "description": "LAB_03-13: 物件 namespace Rido { internal class drawStar",
        "image": "images_src/csharp_labs/slides/slide_116.png",
        "imageCaption": "投影片第 116 頁：LAB_03-13: 物件導向基礎 (Class & Object) 核心說明與代碼"
      }
    ],
    "csharpCode": "// C# 工控標準範例代碼\nprivate void ExecuteLabLogic()\n{\n    // 請參閱投影片中的詳細指令與介面綁定\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_03-13: 物件導向基礎 (Class & Object) 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_03-13: 物件導向基礎 (Class & Object) 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-03-14",
    "labNumber": "03-14",
    "title": "LAB_03-14: Switch Case 條件分支選擇器",
    "date": "2026-08-15",
    "category": "單元 03: 迴圈與邏輯結構",
    "summary": "學習使用 switch-case 處理多重狀態分支，提高工控狀態機 (State Machine) 可讀性。",
    "image": "images_src/csharp_labs/slides/slide_117.png",
    "objective": "1. 理解並掌握 LAB_03-14: Switch Case 條件分支選擇器 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.117 實作解析",
        "description": "LAB_03-14: Switch case switch(option) { case 1:",
        "image": "images_src/csharp_labs/slides/slide_117.png",
        "imageCaption": "投影片第 117 頁：LAB_03-14: Switch Case 條件分支選擇器 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.118 實作解析",
        "description": "118 二、流程圖 「流程圖」就是利用簡明的圖形符號，來表示程式處理問題的流程和方法。 流程圖藉由各種不同的圖形和箭頭來表達解決問題的順序，每一種圖形代表一種作業功能，而箭頭代表流程的方向，可協助我們設計出周詳的程式不致漏掉某些部份。",
        "image": "images_src/csharp_labs/slides/slide_118.png",
        "imageCaption": "投影片第 118 頁：LAB_03-14: Switch Case 條件分支選擇器 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.119 實作解析",
        "description": "119 一般常用的流程圖符號如下表：",
        "image": "images_src/csharp_labs/slides/slide_119.png",
        "imageCaption": "投影片第 119 頁：LAB_03-14: Switch Case 條件分支選擇器 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.120 實作解析",
        "description": "120",
        "image": "images_src/csharp_labs/slides/slide_120.png",
        "imageCaption": "投影片第 120 頁：LAB_03-14: Switch Case 條件分支選擇器 核心說明與代碼"
      },
      {
        "step": "步驟 5: 投影片 P.121 實作解析",
        "description": "121",
        "image": "images_src/csharp_labs/slides/slide_121.png",
        "imageCaption": "投影片第 121 頁：LAB_03-14: Switch Case 條件分支選擇器 核心說明與代碼"
      },
      {
        "step": "步驟 6: 投影片 P.122 實作解析",
        "description": "122",
        "image": "images_src/csharp_labs/slides/slide_122.png",
        "imageCaption": "投影片第 122 頁：LAB_03-14: Switch Case 條件分支選擇器 核心說明與代碼"
      },
      {
        "step": "步驟 7: 投影片 P.123 實作解析",
        "description": "123 二、多向選擇 if …else if…else… 敘述 可以將else和if合併成一行，讓程式碼較為簡潔。",
        "image": "images_src/csharp_labs/slides/slide_123.png",
        "imageCaption": "投影片第 123 頁：LAB_03-14: Switch Case 條件分支選擇器 核心說明與代碼"
      }
    ],
    "csharpCode": "// C# 工控標準範例代碼\nprivate void ExecuteLabLogic()\n{\n    // 請參閱投影片中的詳細指令與介面綁定\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_03-14: Switch Case 條件分支選擇器 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_03-14: Switch Case 條件分支選擇器 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-03-15",
    "labNumber": "03-15",
    "title": "LAB_03-15: 物件導向繼承與衍生 (Inheritance)",
    "date": "2026-08-15",
    "category": "單元 03: 迴圈與邏輯結構",
    "summary": "學習父類別與子類別繼承架構，建立工控元件共用基底類別。",
    "image": "images_src/csharp_labs/slides/slide_197.png",
    "objective": "1. 理解並掌握 LAB_03-15: 物件導向繼承與衍生 (Inheritance) 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.197 實作解析",
        "description": "LAB_19_Object internal class Calc { public int add(int num1 , int num2)",
        "image": "images_src/csharp_labs/slides/slide_197.png",
        "imageCaption": "投影片第 197 頁：LAB_03-15: 物件導向繼承與衍生 (Inheritance) 核心說明與代碼"
      }
    ],
    "csharpCode": "// C# 工控標準範例代碼\nprivate void ExecuteLabLogic()\n{\n    // 請參閱投影片中的詳細指令與介面綁定\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_03-15: 物件導向繼承與衍生 (Inheritance) 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_03-15: 物件導向繼承與衍生 (Inheritance) 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-04-01",
    "labNumber": "04-01",
    "title": "LAB_04-01: if_else 字串比對判斷",
    "date": "2026-08-15",
    "category": "單元 04: 條件分支判斷",
    "summary": "利用 if-else 比對使用者輸入字串，實現工控密碼鎖與權限判斷。",
    "image": "images_src/csharp_labs/slides/slide_124.png",
    "objective": "1. 理解並掌握 LAB_04-01: if_else 字串比對判斷 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.124 實作解析",
        "description": "LAB_04-01: if_esle (字串判斷) private void comboBox1_SelectedIndexChanged(object sender, EventArgs e) { textBox1.Text = comboBox1.Text;",
        "image": "images_src/csharp_labs/slides/slide_124.png",
        "imageCaption": "投影片第 124 頁：LAB_04-01: if_else 字串比對判斷 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_04: 條件判斷與複合邏輯\nprivate void btnCheck_Click(object sender, EventArgs e)\n{\n    int age = int.Parse(txtAge.Text);\n    bool hasTicket = chkTicket.Checked;\n    \n    if (age >= 18 && hasTicket) {\n        lblResult.Text = \"准許進入機房操作 (Access Granted)\";\n    } else if (age < 18) {\n        lblResult.Text = \"年齡不足，禁止操作機台\";\n    } else {\n        lblResult.Text = \"請先向主管領取工單\";\n    }\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_04-01: if_else 字串比對判斷 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_04-01: if_else 字串比對判斷 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-04-02",
    "labNumber": "04-02",
    "title": "LAB_04-02: if_else_age 數值年齡分級判斷",
    "date": "2026-08-15",
    "category": "單元 04: 條件分支判斷",
    "summary": "利用多重 else-if 結構，將輸入數值進行區間劃分與分級輸出。",
    "image": "images_src/csharp_labs/slides/slide_125.png",
    "objective": "1. 理解並掌握 LAB_04-02: if_else_age 數值年齡分級判斷 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.125 實作解析",
        "description": "LAB_04-02: if_esle_age (數字判斷) if(age >= 18) { txtOutput.Text = \"歡迎......\";",
        "image": "images_src/csharp_labs/slides/slide_125.png",
        "imageCaption": "投影片第 125 頁：LAB_04-02: if_else_age 數值年齡分級判斷 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_04: 條件判斷與複合邏輯\nprivate void btnCheck_Click(object sender, EventArgs e)\n{\n    int age = int.Parse(txtAge.Text);\n    bool hasTicket = chkTicket.Checked;\n    \n    if (age >= 18 && hasTicket) {\n        lblResult.Text = \"准許進入機房操作 (Access Granted)\";\n    } else if (age < 18) {\n        lblResult.Text = \"年齡不足，禁止操作機台\";\n    } else {\n        lblResult.Text = \"請先向主管領取工單\";\n    }\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_04-02: if_else_age 數值年齡分級判斷 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_04-02: if_else_age 數值年齡分級判斷 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-04-03",
    "labNumber": "04-03",
    "title": "LAB_04-03: if_else_movie 電影分級與多重邏輯運算",
    "date": "2026-08-15",
    "category": "單元 04: 條件分支判斷",
    "summary": "掌握邏輯 AND (&&) 與 OR (||) 複合條件判斷，實現嚴密的權限規則審核。",
    "image": "images_src/csharp_labs/slides/slide_126.png",
    "objective": "1. 理解並掌握 LAB_04-03: if_else_movie 電影分級與多重邏輯運算 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.126 實作解析",
        "description": "LAB_04-03: if_esle_movie (字串判斷+邏輯&) if (age >= 18) { txtOutput.Text = \"限制級!!!!!!!!\";",
        "image": "images_src/csharp_labs/slides/slide_126.png",
        "imageCaption": "投影片第 126 頁：LAB_04-03: if_else_movie 電影分級與多重邏輯運算 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.127 實作解析",
        "description": "127 127 P2-13",
        "image": "images_src/csharp_labs/slides/slide_127.png",
        "imageCaption": "投影片第 127 頁：LAB_04-03: if_else_movie 電影分級與多重邏輯運算 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.128 實作解析",
        "description": "128 128",
        "image": "images_src/csharp_labs/slides/slide_128.png",
        "imageCaption": "投影片第 128 頁：LAB_04-03: if_else_movie 電影分級與多重邏輯運算 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_04: 條件判斷與複合邏輯\nprivate void btnCheck_Click(object sender, EventArgs e)\n{\n    int age = int.Parse(txtAge.Text);\n    bool hasTicket = chkTicket.Checked;\n    \n    if (age >= 18 && hasTicket) {\n        lblResult.Text = \"准許進入機房操作 (Access Granted)\";\n    } else if (age < 18) {\n        lblResult.Text = \"年齡不足，禁止操作機台\";\n    } else {\n        lblResult.Text = \"請先向主管領取工單\";\n    }\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_04-03: if_else_movie 電影分級與多重邏輯運算 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_04-03: if_else_movie 電影分級與多重邏輯運算 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-04-04",
    "labNumber": "04-04",
    "title": "LAB_04-04: if_else_buy 購物折扣與促銷計算",
    "date": "2026-08-15",
    "category": "單元 04: 條件分支判斷",
    "summary": "結合數量、金額與會員身分進行折扣折讓運算，模擬產線計費邏輯。",
    "image": "images_src/csharp_labs/slides/slide_129.png",
    "objective": "1. 理解並掌握 LAB_04-04: if_else_buy 購物折扣與促銷計算 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.129 實作解析",
        "description": "LAB_04-04_if_esle_buy 巢狀if global變數運用",
        "image": "images_src/csharp_labs/slides/slide_129.png",
        "imageCaption": "投影片第 129 頁：LAB_04-04: if_else_buy 購物折扣與促銷計算 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.130 實作解析",
        "description": "PasswordChar WM_GETTEXT",
        "image": "images_src/csharp_labs/slides/slide_130.png",
        "imageCaption": "投影片第 130 頁：LAB_04-04: if_else_buy 購物折扣與促銷計算 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.131 實作解析",
        "description": "Microsoft Spy++ https://github.com/westoncampbell/SpyPlusPlus",
        "image": "images_src/csharp_labs/slides/slide_131.png",
        "imageCaption": "投影片第 131 頁：LAB_04-04: if_else_buy 購物折扣與促銷計算 核心說明與代碼"
      }
    ],
    "csharpCode": "// C# 工控標準範例代碼\nprivate void ExecuteLabLogic()\n{\n    // 請參閱投影片中的詳細指令與介面綁定\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_04-04: if_else_buy 購物折扣與促銷計算 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_04-04: if_else_buy 購物折扣與促銷計算 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-05-01",
    "labNumber": "05-01",
    "title": "LAB_05-01: KeyPress 鍵盤輸入事件",
    "date": "2026-08-15",
    "category": "單元 05: 鍵盤與滑鼠事件",
    "summary": "利用 KeyPress 事件與 KeyPressEventArgs 攔截鍵盤字元，過濾非法輸入並監聽 Enter 鍵。",
    "image": "images_src/csharp_labs/slides/slide_132.png",
    "objective": "1. 理解並掌握 LAB_05-01: KeyPress 鍵盤輸入事件 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.132 實作解析",
        "description": "LAB_05-01: KeyPress https://docs.microsoft.com/zh-tw/dotnet/api/system.windows.forms.control.keypress?view=windowsdesktop-6.0 https://docs.microsoft.com/zh-tw/dotnet/api/system.win...",
        "image": "images_src/csharp_labs/slides/slide_132.png",
        "imageCaption": "投影片第 132 頁：LAB_05-01: KeyPress 鍵盤輸入事件 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.133 實作解析",
        "description": "private void textBox1_KeyPress(object sender, KeyPressEventArgs e) { int age = 10; if (e.KeyChar == 13)",
        "image": "images_src/csharp_labs/slides/slide_133.png",
        "imageCaption": "投影片第 133 頁：LAB_05-01: KeyPress 鍵盤輸入事件 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.134 實作解析",
        "description": "KeyAscii https://www.itwu.cc/keyboardcode/",
        "image": "images_src/csharp_labs/slides/slide_134.png",
        "imageCaption": "投影片第 134 頁：LAB_05-01: KeyPress 鍵盤輸入事件 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_05-01: KeyPress 限制僅能輸入數字與退格鍵\nprivate void textBox1_KeyPress(object sender, KeyPressEventArgs e)\n{\n    if (!char.IsControl(e.KeyChar) && !char.IsDigit(e.KeyChar))\n    {\n        e.Handled = true; // 攔截非法輸入\n    }\n    if (e.KeyChar == (char)Keys.Enter)\n    {\n        btnSubmit.PerformClick();\n    }\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_05-01: KeyPress 鍵盤輸入事件 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_05-01: KeyPress 鍵盤輸入事件 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-05-02",
    "labNumber": "05-02",
    "title": "LAB_05-02: KeyDown 鍵盤按鍵事件與方向鍵控制",
    "date": "2026-08-15",
    "category": "單元 05: 鍵盤與滑鼠事件",
    "summary": "開啟 Form.KeyPreview 屬性，捕捉方向鍵 (Up/Down/Left/Right) 即時控制畫面上元件位移。",
    "image": "images_src/csharp_labs/slides/slide_135.png",
    "objective": "1. 理解並掌握 LAB_05-02: KeyDown 鍵盤按鍵事件與方向鍵控制 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.135 實作解析",
        "description": "LAB_05-02: KeyDown https://docs.microsoft.com/zh-tw/dotnet/api/system.windows.forms.form.keypreview?view=windowsdesktop-6.0 Form.KeyPreview 屬性 取得或設定值，指出表單是否要在事件傳送至焦點所在的控制項之前，接收按鍵事件...",
        "image": "images_src/csharp_labs/slides/slide_135.png",
        "imageCaption": "投影片第 135 頁：LAB_05-02: KeyDown 鍵盤按鍵事件與方向鍵控制 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.136 實作解析",
        "description": "依投影片第 136 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_136.png",
        "imageCaption": "投影片第 136 頁：LAB_05-02: KeyDown 鍵盤按鍵事件與方向鍵控制 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.137 實作解析",
        "description": "比較 keydown, keypress, keyup 的差異 keydown所謂的keydown就是指按下鍵盤的那個剎那，任何的鍵盤按鍵按下都可以取得對應的鍵盤代碼，也就是所謂的keyCode。例如：a -> 65、b -> 66、 c -> 67……依此類推，但不區分大小寫。也就是說大寫和小寫是一樣的keyCode。其中也包括Enter -> 13、ES...",
        "image": "images_src/csharp_labs/slides/slide_137.png",
        "imageCaption": "投影片第 137 頁：LAB_05-02: KeyDown 鍵盤按鍵事件與方向鍵控制 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.138 實作解析",
        "description": "鍵盤事件 https://crmne0707.pixnet.net/blog/post/335363831-c%23-%e9%8d%b5%e7%9b%a4%e6%bb%91%e9%bc%a0%e4%ba%8b%e4%bb%b6",
        "image": "images_src/csharp_labs/slides/slide_138.png",
        "imageCaption": "投影片第 138 頁：LAB_05-02: KeyDown 鍵盤按鍵事件與方向鍵控制 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_05-02: KeyDown 鍵盤按鍵控制\nprivate void Form1_KeyDown(object sender, KeyEventArgs e)\n{\n    switch (e.KeyCode)\n    {\n        case Keys.Up:\n            btnRobot.Top -= 5;\n            break;\n        case Keys.Down:\n            btnRobot.Top += 5;\n            break;\n        case Keys.Left:\n            btnRobot.Left -= 5;\n            break;\n        case Keys.Right:\n            btnRobot.Left += 5;\n            break;\n    }\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_05-02: KeyDown 鍵盤按鍵事件與方向鍵控制 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_05-02: KeyDown 鍵盤按鍵事件與方向鍵控制 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-05-03",
    "labNumber": "05-03",
    "title": "LAB_05-03: KeyDown+ 組合鍵快速鍵實作",
    "date": "2026-08-15",
    "category": "單元 05: 鍵盤與滑鼠事件",
    "summary": "偵測 Ctrl、Shift 或 Alt 組合鍵 (Modifier Keys)，實現工控快速鍵操作。",
    "image": "images_src/csharp_labs/slides/slide_137.png",
    "objective": "1. 理解並掌握 LAB_05-03: KeyDown+ 組合鍵快速鍵實作 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.137 實作解析",
        "description": "比較 keydown, keypress, keyup 的差異 keydown所謂的keydown就是指按下鍵盤的那個剎那，任何的鍵盤按鍵按下都可以取得對應的鍵盤代碼，也就是所謂的keyCode。例如：a -> 65、b -> 66、 c -> 67……依此類推，但不區分大小寫。也就是說大寫和小寫是一樣的keyCode。其中也包括Enter -> 13、ES...",
        "image": "images_src/csharp_labs/slides/slide_137.png",
        "imageCaption": "投影片第 137 頁：LAB_05-03: KeyDown+ 組合鍵快速鍵實作 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.138 實作解析",
        "description": "鍵盤事件 https://crmne0707.pixnet.net/blog/post/335363831-c%23-%e9%8d%b5%e7%9b%a4%e6%bb%91%e9%bc%a0%e4%ba%8b%e4%bb%b6",
        "image": "images_src/csharp_labs/slides/slide_138.png",
        "imageCaption": "投影片第 138 頁：LAB_05-03: KeyDown+ 組合鍵快速鍵實作 核心說明與代碼"
      }
    ],
    "csharpCode": "// C# 工控標準範例代碼\nprivate void ExecuteLabLogic()\n{\n    // 請參閱投影片中的詳細指令與介面綁定\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_05-03: KeyDown+ 組合鍵快速鍵實作 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_05-03: KeyDown+ 組合鍵快速鍵實作 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-05-04",
    "labNumber": "05-04",
    "title": "LAB_05-04: 滑鼠按下/放開 (MouseDown / MouseUp)",
    "date": "2026-08-15",
    "category": "單元 05: 鍵盤與滑鼠事件",
    "summary": "監聽滑鼠按鍵點擊與放開狀態，配合 Graphics 繪圖 API 實現簡易畫布塗鴉。",
    "image": "images_src/csharp_labs/slides/slide_139.png",
    "objective": "1. 理解並掌握 LAB_05-04: 滑鼠按下/放開 (MouseDown / MouseUp) 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.139 實作解析",
        "description": "LAB_05-04: 滑鼠按下/放開 https://docs.microsoft.com/zh-tw/dotnet/api/system.windows.forms.control.mousedown?view=windowsdesktop-6.0 https://docs.microsoft.com/zh-tw/dotnet/api/system.win...",
        "image": "images_src/csharp_labs/slides/slide_139.png",
        "imageCaption": "投影片第 139 頁：LAB_05-04: 滑鼠按下/放開 (MouseDown / MouseUp) 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.140 實作解析",
        "description": "C# RGB https://www.cnblogs.com/zxtceq/p/8251302.html",
        "image": "images_src/csharp_labs/slides/slide_140.png",
        "imageCaption": "投影片第 140 頁：LAB_05-04: 滑鼠按下/放開 (MouseDown / MouseUp) 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.141 實作解析",
        "description": "更改Button按鈕元件的顏色 Button按鈕元件的色彩是使用HTML色彩 https://www.w3schools.com/colors/colors_picker.asp 141",
        "image": "images_src/csharp_labs/slides/slide_141.png",
        "imageCaption": "投影片第 141 頁：LAB_05-04: 滑鼠按下/放開 (MouseDown / MouseUp) 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.142 實作解析",
        "description": "依投影片第 142 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_142.png",
        "imageCaption": "投影片第 142 頁：LAB_05-04: 滑鼠按下/放開 (MouseDown / MouseUp) 核心說明與代碼"
      },
      {
        "step": "步驟 5: 投影片 P.143 實作解析",
        "description": "notepad-plus https://notepad-plus-plus.org/downloads/",
        "image": "images_src/csharp_labs/slides/slide_143.png",
        "imageCaption": "投影片第 143 頁：LAB_05-04: 滑鼠按下/放開 (MouseDown / MouseUp) 核心說明與代碼"
      },
      {
        "step": "步驟 6: 投影片 P.144 實作解析",
        "description": "144",
        "image": "images_src/csharp_labs/slides/slide_144.png",
        "imageCaption": "投影片第 144 頁：LAB_05-04: 滑鼠按下/放開 (MouseDown / MouseUp) 核心說明與代碼"
      },
      {
        "step": "步驟 7: 投影片 P.145 實作解析",
        "description": "BMP檔頭 https://www.jinnsblog.com/2009/08/bmp-format-graphic-illustration.html",
        "image": "images_src/csharp_labs/slides/slide_145.png",
        "imageCaption": "投影片第 145 頁：LAB_05-04: 滑鼠按下/放開 (MouseDown / MouseUp) 核心說明與代碼"
      },
      {
        "step": "步驟 8: 投影片 P.146 實作解析",
        "description": "BMP檔頭 https://www.jinnsblog.com/2009/08/bmp-format-graphic-illustration.html",
        "image": "images_src/csharp_labs/slides/slide_146.png",
        "imageCaption": "投影片第 146 頁：LAB_05-04: 滑鼠按下/放開 (MouseDown / MouseUp) 核心說明與代碼"
      },
      {
        "step": "步驟 9: 投影片 P.147 實作解析",
        "description": "256色 256色是將圖像信息存儲在電腦的存儲器或圖像文件中的方法，使得每個像素由一個8位元之字節表示，也就是8-bit(3:2:3)模式。任何時候可以顯示的最大顏色數為256。GIF便是採用256色的一種圖像格式。 https://zh.wikipedia.org/zh-tw/256%E8%89%B2",
        "image": "images_src/csharp_labs/slides/slide_147.png",
        "imageCaption": "投影片第 147 頁：LAB_05-04: 滑鼠按下/放開 (MouseDown / MouseUp) 核心說明與代碼"
      },
      {
        "step": "步驟 10: 投影片 P.148 實作解析",
        "description": "滑鼠事件 上述的「滑鼠按鍵」，可以是 「滑鼠左鍵」、 「滑鼠右鍵」、",
        "image": "images_src/csharp_labs/slides/slide_148.png",
        "imageCaption": "投影片第 148 頁：LAB_05-04: 滑鼠按下/放開 (MouseDown / MouseUp) 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_05-04: 滑鼠按下/放開塗鴉\nbool isDrawing = false;\nprivate void Form1_MouseDown(object sender, MouseEventArgs e) {\n    if (e.Button == MouseButtons.Left) isDrawing = true;\n}\nprivate void Form1_MouseUp(object sender, MouseEventArgs e) {\n    isDrawing = false;\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_05-04: 滑鼠按下/放開 (MouseDown / MouseUp) 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_05-04: 滑鼠按下/放開 (MouseDown / MouseUp) 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-05-05",
    "labNumber": "05-05",
    "title": "LAB_05-05: 滑鼠移動追蹤 (MouseMove)",
    "date": "2026-08-15",
    "category": "單元 05: 鍵盤與滑鼠事件",
    "summary": "即時捕捉滑鼠在視窗畫布上的 (X, Y) 座標，在狀態列同步動態顯示游標位置。",
    "image": "images_src/csharp_labs/slides/slide_149.png",
    "objective": "1. 理解並掌握 LAB_05-05: 滑鼠移動追蹤 (MouseMove) 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.149 實作解析",
        "description": "Lab 05-05 小精靈跟著滑鼠走 private void Form1_MouseMove(object sender, MouseEventArgs e) { int x;",
        "image": "images_src/csharp_labs/slides/slide_149.png",
        "imageCaption": "投影片第 149 頁：LAB_05-05: 滑鼠移動追蹤 (MouseMove) 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.150 實作解析",
        "description": "ChatGPT",
        "image": "images_src/csharp_labs/slides/slide_150.png",
        "imageCaption": "投影片第 150 頁：LAB_05-05: 滑鼠移動追蹤 (MouseMove) 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.151 實作解析",
        "description": "ChatGPT",
        "image": "images_src/csharp_labs/slides/slide_151.png",
        "imageCaption": "投影片第 151 頁：LAB_05-05: 滑鼠移動追蹤 (MouseMove) 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.152 實作解析",
        "description": "ChatGPT",
        "image": "images_src/csharp_labs/slides/slide_152.png",
        "imageCaption": "投影片第 152 頁：LAB_05-05: 滑鼠移動追蹤 (MouseMove) 核心說明與代碼"
      },
      {
        "step": "步驟 5: 投影片 P.153 實作解析",
        "description": "DeepSeek",
        "image": "images_src/csharp_labs/slides/slide_153.png",
        "imageCaption": "投影片第 153 頁：LAB_05-05: 滑鼠移動追蹤 (MouseMove) 核心說明與代碼"
      },
      {
        "step": "步驟 6: 投影片 P.154 實作解析",
        "description": "DeepSeek",
        "image": "images_src/csharp_labs/slides/slide_154.png",
        "imageCaption": "投影片第 154 頁：LAB_05-05: 滑鼠移動追蹤 (MouseMove) 核心說明與代碼"
      }
    ],
    "csharpCode": "// C# 工控標準範例代碼\nprivate void ExecuteLabLogic()\n{\n    // 請參閱投影片中的詳細指令與介面綁定\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_05-05: 滑鼠移動追蹤 (MouseMove) 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_05-05: 滑鼠移動追蹤 (MouseMove) 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-06-01",
    "labNumber": "06-01",
    "title": "LAB_06-01: ASCII Code 編碼查詢與轉換",
    "date": "2026-08-15",
    "category": "單元 06: 通訊編碼與校驗",
    "summary": "工控通訊核心基礎：解析字元與 ASCII Code (0~255) 轉換，包含 0x02(STX)、0x03(ETX) 等控制字元。",
    "image": "images_src/csharp_labs/slides/slide_155.png",
    "objective": "1. 理解並掌握 LAB_06-01: ASCII Code 編碼查詢與轉換 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.155 實作解析",
        "description": "LAB_06-01: ASCII Code查表 https://docs.microsoft.com/zh-tw/dotnet/api/system.windows.forms.keypresseventargs.keychar?view=windowsdesktop-6.0 https://docs.microsoft.com/zh-tw/dotnet/a...",
        "image": "images_src/csharp_labs/slides/slide_155.png",
        "imageCaption": "投影片第 155 頁：LAB_06-01: ASCII Code 編碼查詢與轉換 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.156 實作解析",
        "description": "設斷點， KeyDown比KeyPress優先。(但KeyUP事件不見了)KeyPress和KeyDown傳入值不同",
        "image": "images_src/csharp_labs/slides/slide_156.png",
        "imageCaption": "投影片第 156 頁：LAB_06-01: ASCII Code 編碼查詢與轉換 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.157 實作解析",
        "description": "KeyDown V.S. KeyPress 設斷點， KeyDown比KeyPress優先。 但KeyUP事件不見了 KeyPress和KeyDown傳入值不同",
        "image": "images_src/csharp_labs/slides/slide_157.png",
        "imageCaption": "投影片第 157 頁：LAB_06-01: ASCII Code 編碼查詢與轉換 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_06: PLC 通訊 CheckSum 校驗演算法\npublic static string CalcCheckSum(string command)\n{\n    int sum = 0;\n    foreach (char c in command)\n    {\n        sum += (int)c;\n    }\n    // 取低8位並轉為 2位十六進位字串 (例如 \"4F\")\n    return (sum & 0xFF).ToString(\"X2\");\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_06-01: ASCII Code 編碼查詢與轉換 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_06-01: ASCII Code 編碼查詢與轉換 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-06-02",
    "labNumber": "06-02",
    "title": "LAB_06-02: CheckSum 總和校驗碼演算法",
    "date": "2026-08-15",
    "category": "單元 06: 通訊編碼與校驗",
    "summary": "學習 Mitsubishi 三菱與各廠 PLC 通訊協定中的 CheckSum 加總校驗碼演算法。",
    "image": "images_src/csharp_labs/slides/slide_158.png",
    "objective": "1. 理解並掌握 LAB_06-02: CheckSum 總和校驗碼演算法 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.158 實作解析",
        "description": "LAB_6-02: CheckSum https://docs.microsoft.com/zh-tw/dotnet/api/system.convert.toint32?view=net-6.0 ToInt32(String, IFormatProvider) 使用指定之特定文化特性格式資訊，將指定之數字的字串表示轉換為相等的 32 位元帶正負號的整數。",
        "image": "images_src/csharp_labs/slides/slide_158.png",
        "imageCaption": "投影片第 158 頁：LAB_06-02: CheckSum 總和校驗碼演算法 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.159 實作解析",
        "description": "0 1 2 3",
        "image": "images_src/csharp_labs/slides/slide_159.png",
        "imageCaption": "投影片第 159 頁：LAB_06-02: CheckSum 總和校驗碼演算法 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.160 實作解析",
        "description": "ToInt32(String, Int32) https://learn.microsoft.com/zh-tw/dotnet/api/system.convert.toint32?view=net-8.0#system-convert-toint32(system-string-system-int32)",
        "image": "images_src/csharp_labs/slides/slide_160.png",
        "imageCaption": "投影片第 160 頁：LAB_06-02: CheckSum 總和校驗碼演算法 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.161 實作解析",
        "description": "ToString https://learn.microsoft.com/zh-tw/dotnet/api/system.int32.tostring?view=net-8.0#system-int32-tostring(system-iformatprovider)",
        "image": "images_src/csharp_labs/slides/slide_161.png",
        "imageCaption": "投影片第 161 頁：LAB_06-02: CheckSum 總和校驗碼演算法 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_06: PLC 通訊 CheckSum 校驗演算法\npublic static string CalcCheckSum(string command)\n{\n    int sum = 0;\n    foreach (char c in command)\n    {\n        sum += (int)c;\n    }\n    // 取低8位並轉為 2位十六進位字串 (例如 \"4F\")\n    return (sum & 0xFF).ToString(\"X2\");\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_06-02: CheckSum 總和校驗碼演算法 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_06-02: CheckSum 總和校驗碼演算法 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-06-03",
    "labNumber": "06-03",
    "title": "LAB_06-03: CheckSum_Char 字元累加與校驗生成",
    "date": "2026-08-15",
    "category": "單元 06: 通訊編碼與校驗",
    "summary": "以字元陣列迴圈逐一累加 ASCII 碼，取出低位元組並轉為 Hex 格式校驗字元。",
    "image": "images_src/csharp_labs/slides/slide_162.png",
    "objective": "1. 理解並掌握 LAB_06-03: CheckSum_Char 字元累加與校驗生成 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.162 實作解析",
        "description": "LAB_06-02 : CheckSum_Char",
        "image": "images_src/csharp_labs/slides/slide_162.png",
        "imageCaption": "投影片第 162 頁：LAB_06-03: CheckSum_Char 字元累加與校驗生成 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_06: PLC 通訊 CheckSum 校驗演算法\npublic static string CalcCheckSum(string command)\n{\n    int sum = 0;\n    foreach (char c in command)\n    {\n        sum += (int)c;\n    }\n    // 取低8位並轉為 2位十六進位字串 (例如 \"4F\")\n    return (sum & 0xFF).ToString(\"X2\");\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_06-03: CheckSum_Char 字元累加與校驗生成 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_06-03: CheckSum_Char 字元累加與校驗生成 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-06-04",
    "labNumber": "06-04",
    "title": "LAB_06-04: Byte2String 位元組陣列轉 Hex 字串",
    "date": "2026-08-15",
    "category": "單元 06: 通訊編碼與校驗",
    "summary": "將底層通訊 byte[] 緩衝區資料轉換為可讀的十六進位 Hex 字串以利偵錯。",
    "image": "images_src/csharp_labs/slides/slide_163.png",
    "objective": "1. 理解並掌握 LAB_06-04: Byte2String 位元組陣列轉 Hex 字串 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.163 實作解析",
        "description": "LAB_06-03 : Byte2String",
        "image": "images_src/csharp_labs/slides/slide_163.png",
        "imageCaption": "投影片第 163 頁：LAB_06-04: Byte2String 位元組陣列轉 Hex 字串 核心說明與代碼"
      }
    ],
    "csharpCode": "// C# 工控標準範例代碼\nprivate void ExecuteLabLogic()\n{\n    // 請參閱投影片中的詳細指令與介面綁定\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_06-04: Byte2String 位元組陣列轉 Hex 字串 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_06-04: Byte2String 位元組陣列轉 Hex 字串 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-07-01",
    "labNumber": "07-01",
    "title": "LAB_07-01: force_Y 強制 PLC 輸出點 Y0~Y17 ON/OFF",
    "date": "2026-08-15",
    "category": "單元 07: PLC 串列通訊控制",
    "summary": "使用 System.IO.Ports.SerialPort 發送三菱 FX 協定指令 (STX + CMD + 點位 + ETX + CheckSum)，強制控制 Y0~Y17 繼電器輸出。",
    "image": "images_src/csharp_labs/slides/slide_164.png",
    "objective": "1. 理解並掌握 LAB_07-01: force_Y 強制 PLC 輸出點 Y0~Y17 ON/OFF 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.164 實作解析",
        "description": "LAB_07-01: force_Y using System.IO.Ports; //要使用serial port需要引用它 string CmdStr = (Char)2 + \"70005\" + (Char)3 + \"FF\"; serialPort1.Write(CmdStr);",
        "image": "images_src/csharp_labs/slides/slide_164.png",
        "imageCaption": "投影片第 164 頁：LAB_07-01: force_Y 強制 PLC 輸出點 Y0~Y17 ON/OFF 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.165 實作解析",
        "description": "using System.IO.Ports //取得所有port的名字的方法 string[] myPorts = SerialPort.GetPortNames(); ",
        "image": "images_src/csharp_labs/slides/slide_165.png",
        "imageCaption": "投影片第 165 頁：LAB_07-01: force_Y 強制 PLC 輸出點 Y0~Y17 ON/OFF 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.166 實作解析",
        "description": "Copilot 參考 1. 檔案\"Y_ON_OFF.txt\"，裡面為Y0~Y17的ON/OFF指令。 2. 參考button35_Click的實作，為Y0 ON寫法。",
        "image": "images_src/csharp_labs/slides/slide_166.png",
        "imageCaption": "投影片第 166 頁：LAB_07-01: force_Y 強制 PLC 輸出點 Y0~Y17 ON/OFF 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.167 實作解析",
        "description": "依投影片第 167 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_167.png",
        "imageCaption": "投影片第 167 頁：LAB_07-01: force_Y 強制 PLC 輸出點 Y0~Y17 ON/OFF 核心說明與代碼"
      },
      {
        "step": "步驟 5: 投影片 P.168 實作解析",
        "description": "利用串口助手監看",
        "image": "images_src/csharp_labs/slides/slide_168.png",
        "imageCaption": "投影片第 168 頁：LAB_07-01: force_Y 強制 PLC 輸出點 Y0~Y17 ON/OFF 核心說明與代碼"
      },
      {
        "step": "步驟 6: 投影片 P.169 實作解析",
        "description": "PC與PLC通訊參數 傳輸格式: RS232 鮑率（Baud）: 9600 同位檢查（Parity Check）: Even Parity Check (偶同步檢查)",
        "image": "images_src/csharp_labs/slides/slide_169.png",
        "imageCaption": "投影片第 169 頁：LAB_07-01: force_Y 強制 PLC 輸出點 Y0~Y17 ON/OFF 核心說明與代碼"
      },
      {
        "step": "步驟 7: 投影片 P.170 實作解析",
        "description": "依投影片第 170 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_170.png",
        "imageCaption": "投影片第 170 頁：LAB_07-01: force_Y 強制 PLC 輸出點 Y0~Y17 ON/OFF 核心說明與代碼"
      },
      {
        "step": "步驟 8: 投影片 P.171 實作解析",
        "description": "DeviceAddress FX-232AW USER MANUAL",
        "image": "images_src/csharp_labs/slides/slide_171.png",
        "imageCaption": "投影片第 171 頁：LAB_07-01: force_Y 強制 PLC 輸出點 Y0~Y17 ON/OFF 核心說明與代碼"
      },
      {
        "step": "步驟 9: 投影片 P.172 實作解析",
        "description": "Y0~Y17 ON/OFF Y0 ON 02 37 30 30 30 35 03 46 46",
        "image": "images_src/csharp_labs/slides/slide_172.png",
        "imageCaption": "投影片第 172 頁：LAB_07-01: force_Y 強制 PLC 輸出點 Y0~Y17 ON/OFF 核心說明與代碼"
      },
      {
        "step": "步驟 10: 投影片 P.173 實作解析",
        "description": "強制Y1 ON STX(開頭字元) CMD(命令) Device Address(元件位址)",
        "image": "images_src/csharp_labs/slides/slide_173.png",
        "imageCaption": "投影片第 173 頁：LAB_07-01: force_Y 強制 PLC 輸出點 Y0~Y17 ON/OFF 核心說明與代碼"
      },
      {
        "step": "步驟 11: 投影片 P.174 實作解析",
        "description": "ASCII American Standard Code for Information Interchange 美國標準資訊交換碼 https://zh.wikipedia.org/wiki/ASCII",
        "image": "images_src/csharp_labs/slides/slide_174.png",
        "imageCaption": "投影片第 174 頁：LAB_07-01: force_Y 強制 PLC 輸出點 Y0~Y17 ON/OFF 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_07-01: 強制三菱 PLC 輸出點 Y0 ON\nusing System.IO.Ports;\n\nprivate void btnY0_ON_Click(object sender, EventArgs e)\n{\n    SerialPort sp = new SerialPort(\"COM1\", 9600, Parity.Even, 7, StopBits.One);\n    sp.Open();\n    // 協定: STX(0x02) + CMD('7') + Address(\"0005\") + ETX(0x03) + CheckSum\n    string cmd = \"70005\"; \n    string packet = (char)2 + cmd + (char)3 + CalcCheckSum(cmd + (char)3);\n    sp.Write(packet);\n    sp.Close();\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_07-01: force_Y 強制 PLC 輸出點 Y0~Y17 ON/OFF 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_07-01: force_Y 強制 PLC 輸出點 Y0~Y17 ON/OFF 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-07-02",
    "labNumber": "07-02",
    "title": "LAB_07-02: force_Y_OO 物件導向封裝 PLC 指令",
    "date": "2026-08-15",
    "category": "單元 07: PLC 串列通訊控制",
    "summary": "將 PLC 輸出點控制封裝為工控物件，提供 SetY(int index, bool state) 高階呼叫介面。",
    "image": "images_src/csharp_labs/slides/slide_173.png",
    "objective": "1. 理解並掌握 LAB_07-02: force_Y_OO 物件導向封裝 PLC 指令 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.173 實作解析",
        "description": "強制Y1 ON STX(開頭字元) CMD(命令) Device Address(元件位址)",
        "image": "images_src/csharp_labs/slides/slide_173.png",
        "imageCaption": "投影片第 173 頁：LAB_07-02: force_Y_OO 物件導向封裝 PLC 指令 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.174 實作解析",
        "description": "ASCII American Standard Code for Information Interchange 美國標準資訊交換碼 https://zh.wikipedia.org/wiki/ASCII",
        "image": "images_src/csharp_labs/slides/slide_174.png",
        "imageCaption": "投影片第 174 頁：LAB_07-02: force_Y_OO 物件導向封裝 PLC 指令 核心說明與代碼"
      }
    ],
    "csharpCode": "// C# 工控標準範例代碼\nprivate void ExecuteLabLogic()\n{\n    // 請參閱投影片中的詳細指令與介面綁定\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_07-02: force_Y_OO 物件導向封裝 PLC 指令 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_07-02: force_Y_OO 物件導向封裝 PLC 指令 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-07-03",
    "labNumber": "07-03",
    "title": "LAB_07-03: force_Y_object 通訊實體模組化設計",
    "date": "2026-08-15",
    "category": "單元 07: PLC 串列通訊控制",
    "summary": "將 SerialPort 連線、指令生成與重試機制整合為獨立通訊服務類別。",
    "image": "images_src/csharp_labs/slides/slide_174.png",
    "objective": "1. 理解並掌握 LAB_07-03: force_Y_object 通訊實體模組化設計 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.174 實作解析",
        "description": "ASCII American Standard Code for Information Interchange 美國標準資訊交換碼 https://zh.wikipedia.org/wiki/ASCII",
        "image": "images_src/csharp_labs/slides/slide_174.png",
        "imageCaption": "投影片第 174 頁：LAB_07-03: force_Y_object 通訊實體模組化設計 核心說明與代碼"
      }
    ],
    "csharpCode": "// C# 工控標準範例代碼\nprivate void ExecuteLabLogic()\n{\n    // 請參閱投影片中的詳細指令與介面綁定\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_07-03: force_Y_object 通訊實體模組化設計 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_07-03: force_Y_object 通訊實體模組化設計 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-07-04",
    "labNumber": "07-04",
    "title": "LAB_07-04: force_M 強制 PLC 內部輔助繼電器 M 點",
    "date": "2026-08-15",
    "category": "單元 07: PLC 串列通訊控制",
    "summary": "計算 M 點記憶體 Base Address 與 Offset，發送封包強制置位/復歸 PLC 內部輔助繼電器 M0~M15。",
    "image": "images_src/csharp_labs/slides/slide_175.png",
    "objective": "1. 理解並掌握 LAB_07-04: force_M 強制 PLC 內部輔助繼電器 M 點 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.175 實作解析",
        "description": "LAB_07-04: force_M Base address + offset",
        "image": "images_src/csharp_labs/slides/slide_175.png",
        "imageCaption": "投影片第 175 頁：LAB_07-04: force_M 強制 PLC 內部輔助繼電器 M 點 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.176 實作解析",
        "description": "依投影片第 176 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_176.png",
        "imageCaption": "投影片第 176 頁：LAB_07-04: force_M 強制 PLC 內部輔助繼電器 M 點 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_07-01: 強制三菱 PLC 輸出點 Y0 ON\nusing System.IO.Ports;\n\nprivate void btnY0_ON_Click(object sender, EventArgs e)\n{\n    SerialPort sp = new SerialPort(\"COM1\", 9600, Parity.Even, 7, StopBits.One);\n    sp.Open();\n    // 協定: STX(0x02) + CMD('7') + Address(\"0005\") + ETX(0x03) + CheckSum\n    string cmd = \"70005\"; \n    string packet = (char)2 + cmd + (char)3 + CalcCheckSum(cmd + (char)3);\n    sp.Write(packet);\n    sp.Close();\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_07-04: force_M 強制 PLC 內部輔助繼電器 M 點 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_07-04: force_M 強制 PLC 內部輔助繼電器 M 點 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-08-01",
    "labNumber": "08-01",
    "title": "LAB_08-01: Timer 定時器週期性自動觸發",
    "date": "2026-08-15",
    "category": "單元 08: 定時器與訊號監控",
    "summary": "使用 Windows Forms Timer 控制項，設定 Interval 毫秒週期觸發 Tick 事件，定時更新系統資訊。",
    "image": "images_src/csharp_labs/slides/slide_177.png",
    "objective": "1. 理解並掌握 LAB_08-01: Timer 定時器週期性自動觸發 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.177 實作解析",
        "description": "LAB_08-01: Timer Timer.Tick 事件 發生於指定的計時器間隔已耗用，且計時器被啟用時。 https://docs.microsoft.com/zh-tw/dotnet/api/system.windows.forms.timer.tick?view=windowsdesktop-6.0",
        "image": "images_src/csharp_labs/slides/slide_177.png",
        "imageCaption": "投影片第 177 頁：LAB_08-01: Timer 定時器週期性自動觸發 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_08-03: Timer 實時輪詢監控 PLC X/Y 狀態\nprivate void timerPoll_Tick(object sender, EventArgs e)\n{\n    // 每 100ms 讀取 PLC 點位\n    string reply = ReadPlcDevice(\"X000\");\n    if (reply.Contains(\"1\")) {\n        picSensorLamp.BackColor = Color.Lime; // 綠燈亮\n    } else {\n        picSensorLamp.BackColor = Color.Gray; // 熄滅\n    }\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_08-01: Timer 定時器週期性自動觸發 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_08-01: Timer 定時器週期性自動觸發 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-08-02",
    "labNumber": "08-02",
    "title": "LAB_08-02: DigitalLogic 數位邏輯閘模擬與數值剖析",
    "date": "2026-08-15",
    "category": "單元 08: 定時器與訊號監控",
    "summary": "運用 Int32.Parse 剖析通訊回應字串，利用位元運算子 (&, |, ^) 模擬 PLC 內部邏輯狀態。",
    "image": "images_src/csharp_labs/slides/slide_178.png",
    "objective": "1. 理解並掌握 LAB_08-02: DigitalLogic 數位邏輯閘模擬與數值剖析 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.178 實作解析",
        "description": "LAB_08-02: DigitalLogic Int32.Parse 方法 將數字的字串表示轉換成它的對等 32 位元帶正負號的整數。 https://docs.microsoft.com/zh-tw/dotnet/api/system.int32.parse?view=net-6.0",
        "image": "images_src/csharp_labs/slides/slide_178.png",
        "imageCaption": "投影片第 178 頁：LAB_08-02: DigitalLogic 數位邏輯閘模擬與數值剖析 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.179 實作解析",
        "description": "依投影片第 179 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_179.png",
        "imageCaption": "投影片第 179 頁：LAB_08-02: DigitalLogic 數位邏輯閘模擬與數值剖析 核心說明與代碼"
      }
    ],
    "csharpCode": "// C# 工控標準範例代碼\nprivate void ExecuteLabLogic()\n{\n    // 請參閱投影片中的詳細指令與介面綁定\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_08-02: DigitalLogic 數位邏輯閘模擬與數值剖析 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_08-02: DigitalLogic 數位邏輯閘模擬與數值剖析 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-08-03",
    "labNumber": "08-03",
    "title": "LAB_08-03: monitor_X_Y 實時輪詢監控 PLC X/Y 狀態",
    "date": "2026-08-15",
    "category": "單元 08: 定時器與訊號監控",
    "summary": "工控 SCADA 人機核心：Timer 每 100ms 輪詢 PLC 讀取 X 輸入與 Y 輸出，動態更新介面綠/紅指示燈！",
    "image": "images_src/csharp_labs/slides/slide_180.png",
    "objective": "1. 理解並掌握 LAB_08-03: monitor_X_Y 實時輪詢監控 PLC X/Y 狀態 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.180 實作解析",
        "description": "LAB_08-03: monitor_X_Y ((Button)(sender)).Text;",
        "image": "images_src/csharp_labs/slides/slide_180.png",
        "imageCaption": "投影片第 180 頁：LAB_08-03: monitor_X_Y 實時輪詢監控 PLC X/Y 狀態 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.181 實作解析",
        "description": "private void timer1_Tick(object sender, EventArgs e){ } //讀Y0~Y17 CmdStr = (Char)2 + \"0\" + \"00A0\" + \"02\" + (Char)3 + \"66\";",
        "image": "images_src/csharp_labs/slides/slide_181.png",
        "imageCaption": "投影片第 181 頁：LAB_08-03: monitor_X_Y 實時輪詢監控 PLC X/Y 狀態 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.182 實作解析",
        "description": "監看回傳值 buf Dec Hex",
        "image": "images_src/csharp_labs/slides/slide_182.png",
        "imageCaption": "投影片第 182 頁：LAB_08-03: monitor_X_Y 實時輪詢監控 PLC X/Y 狀態 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.183 實作解析",
        "description": "byte[] Dbyte = System.Text.Encoding.Default.GetBytes(str); string Dstring = System.Text.Encoding.Default.GetString(Dbyte); byte[] UTF8bytes = Encoding.UTF8.GetBytes(str); string UT...",
        "image": "images_src/csharp_labs/slides/slide_183.png",
        "imageCaption": "投影片第 183 頁：LAB_08-03: monitor_X_Y 實時輪詢監控 PLC X/Y 狀態 核心說明與代碼"
      },
      {
        "step": "步驟 5: 投影片 P.184 實作解析",
        "description": "Unicode - 控制代碼 https://zh.wikipedia.org/zh-tw/Unicode%E5%AD%97%E7%AC%A6%E5%88%97%E8%A1%A8 https://zh.wikipedia.org/wiki/%E6%8E%A7%E5%88%B6%E5%AD%97%E7%AC%A6 https://cloud.tencent.c...",
        "image": "images_src/csharp_labs/slides/slide_184.png",
        "imageCaption": "投影片第 184 頁：LAB_08-03: monitor_X_Y 實時輪詢監控 PLC X/Y 狀態 核心說明與代碼"
      },
      {
        "step": "步驟 6: 投影片 P.185 實作解析",
        "description": "Example: PC傳送-讀取Y0~Y17 STX(開頭字元) CMD(命令) Group Address(元件群位址)",
        "image": "images_src/csharp_labs/slides/slide_185.png",
        "imageCaption": "投影片第 185 頁：LAB_08-03: monitor_X_Y 實時輪詢監控 PLC X/Y 狀態 核心說明與代碼"
      },
      {
        "step": "步驟 7: 投影片 P.186 實作解析",
        "description": "Example: PC傳送-讀取X0~X17 STX(開頭字元) CMD(命令) Group Address(元件群位址)",
        "image": "images_src/csharp_labs/slides/slide_186.png",
        "imageCaption": "投影片第 186 頁：LAB_08-03: monitor_X_Y 實時輪詢監控 PLC X/Y 狀態 核心說明與代碼"
      },
      {
        "step": "步驟 8: 投影片 P.187 實作解析",
        "description": "PLC回傳: Y0~Y17 STX 1st Data Last Data",
        "image": "images_src/csharp_labs/slides/slide_187.png",
        "imageCaption": "投影片第 187 頁：LAB_08-03: monitor_X_Y 實時輪詢監控 PLC X/Y 狀態 核心說明與代碼"
      },
      {
        "step": "步驟 9: 投影片 P.188 實作解析",
        "description": "Example Y0 ON: 0x0100 Y1 ON: 0x0200 Y2 ON: 0x0400",
        "image": "images_src/csharp_labs/slides/slide_188.png",
        "imageCaption": "投影片第 188 頁：LAB_08-03: monitor_X_Y 實時輪詢監控 PLC X/Y 狀態 核心說明與代碼"
      },
      {
        "step": "步驟 10: 投影片 P.189 實作解析",
        "description": "Y0 ON: 0x0100 Y1 ON: 0x0200 Y2 ON: 0x0400 Y3 ON: 0x0800",
        "image": "images_src/csharp_labs/slides/slide_189.png",
        "imageCaption": "投影片第 189 頁：LAB_08-03: monitor_X_Y 實時輪詢監控 PLC X/Y 狀態 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_08-03: Timer 實時輪詢監控 PLC X/Y 狀態\nprivate void timerPoll_Tick(object sender, EventArgs e)\n{\n    // 每 100ms 讀取 PLC 點位\n    string reply = ReadPlcDevice(\"X000\");\n    if (reply.Contains(\"1\")) {\n        picSensorLamp.BackColor = Color.Lime; // 綠燈亮\n    } else {\n        picSensorLamp.BackColor = Color.Gray; // 熄滅\n    }\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_08-03: monitor_X_Y 實時輪詢監控 PLC X/Y 狀態 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_08-03: monitor_X_Y 實時輪詢監控 PLC X/Y 狀態 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-09-01",
    "labNumber": "09-01",
    "title": "LAB_09-01: FormToPicture 人機介面畫面截圖儲存",
    "date": "2026-08-15",
    "category": "單元 09: 工控進階 HMI 應用",
    "summary": "實作 SaveForm2Picture 方法，將目前視窗或指定區域轉存為 PNG/JPG 圖檔，供警報記錄與報表留存。",
    "image": "images_src/csharp_labs/slides/slide_190.png",
    "objective": "1. 理解並掌握 LAB_09-01: FormToPicture 人機介面畫面截圖儲存 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.190 實作解析",
        "description": "LAB_09-01: FormToPicture private void SaveForm2Picture() { Rectangle rect = this.Bounds;",
        "image": "images_src/csharp_labs/slides/slide_190.png",
        "imageCaption": "投影片第 190 頁：LAB_09-01: FormToPicture 人機介面畫面截圖儲存 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.191 實作解析",
        "description": "ImageFormat 類別 https://docs.microsoft.com/zh-tw/dotnet/api/system.drawing.imaging.imageformat?view=dotnet-plat-ext-6.0 using System.Drawing.Imaging;",
        "image": "images_src/csharp_labs/slides/slide_191.png",
        "imageCaption": "投影片第 191 頁：LAB_09-01: FormToPicture 人機介面畫面截圖儲存 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_09-01: 視窗截圖並儲存\nprivate void SaveForm2Picture()\n{\n    Rectangle rect = this.Bounds;\n    Bitmap bmp = new Bitmap(rect.Width, rect.Height);\n    Graphics g = Graphics.FromImage(bmp);\n    g.CopyFromScreen(rect.Location, Point.Empty, rect.Size);\n    bmp.Save(@\"C:\\SCADA_Logs\\Alarm_\" + DateTime.Now.ToString(\"yyyyMMdd_HHmmss\") + \".png\", \n             System.Drawing.Imaging.ImageFormat.Png);\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_09-01: FormToPicture 人機介面畫面截圖儲存 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_09-01: FormToPicture 人機介面畫面截圖儲存 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-09-02",
    "labNumber": "09-02",
    "title": "LAB_09-02: PieChart 圓餅圖統計與稼動率視覺化",
    "date": "2026-08-15",
    "category": "單元 09: 工控進階 HMI 應用",
    "summary": "使用 DataVisualization.Charting 控制項繪製圓餅圖 (Pie Chart)，動態呈現設備運轉/待機/故障率。",
    "image": "images_src/csharp_labs/slides/slide_192.png",
    "objective": "1. 理解並掌握 LAB_09-02: PieChart 圓餅圖統計與稼動率視覺化 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.192 實作解析",
        "description": "LAB_09-02: PieChart(圓餅圖) https://docs.microsoft.com/zh-tw/dotnet/api/system.web.ui.datavisualization.charting.series?view=netframework-4.8 https://docs.microsoft.com/zh-tw/dotnet/a...",
        "image": "images_src/csharp_labs/slides/slide_192.png",
        "imageCaption": "投影片第 192 頁：LAB_09-02: PieChart 圓餅圖統計與稼動率視覺化 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.193 實作解析",
        "description": "PieChart using System.Windows.Forms.DataVisualization.Charting;",
        "image": "images_src/csharp_labs/slides/slide_193.png",
        "imageCaption": "投影片第 193 頁：LAB_09-02: PieChart 圓餅圖統計與稼動率視覺化 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.194 實作解析",
        "description": "SeriesChartType 列舉 https://docs.microsoft.com/zh-tw/dotnet/api/system.windows.forms.datavisualization.charting.seriescharttype?view=netframework-4.8",
        "image": "images_src/csharp_labs/slides/slide_194.png",
        "imageCaption": "投影片第 194 頁：LAB_09-02: PieChart 圓餅圖統計與稼動率視覺化 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_09-02: 繪製圓餅圖\nprivate void DrawPieChart()\n{\n    chart1.Series.Clear();\n    var series = chart1.Series.Add(\"OEE\");\n    series.ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Pie;\n    series.Points.AddXY(\"稼動運轉 (85%)\", 85);\n    series.Points.AddXY(\"待機換模 (10%)\", 10);\n    series.Points.AddXY(\"異常停機 (5%)\", 5);\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_09-02: PieChart 圓餅圖統計與稼動率視覺化 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_09-02: PieChart 圓餅圖統計與稼動率視覺化 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-09-03",
    "labNumber": "09-03",
    "title": "LAB_09-03: DataGridView 工控配方表與數據管理",
    "date": "2026-08-15",
    "category": "單元 09: 工控進階 HMI 應用",
    "summary": "使用 DataGridView 表格元件綁定生產配方清單，提供即時新增、刪除、修改與匯入功能。",
    "image": "images_src/csharp_labs/slides/slide_195.png",
    "objective": "1. 理解並掌握 LAB_09-03: DataGridView 工控配方表與數據管理 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.195 實作解析",
        "description": "LAB_09-03: DataGridView",
        "image": "images_src/csharp_labs/slides/slide_195.png",
        "imageCaption": "投影片第 195 頁：LAB_09-03: DataGridView 工控配方表與數據管理 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.196 實作解析",
        "description": "依投影片第 196 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_196.png",
        "imageCaption": "投影片第 196 頁：LAB_09-03: DataGridView 工控配方表與數據管理 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_09-03: DataGridView 配方表\nprivate void LoadRecipeData()\n{\n    DataTable dt = new DataTable();\n    dt.Columns.Add(\"配方編號\");\n    dt.Columns.Add(\"射出溫度 (°C)\");\n    dt.Columns.Add(\"保壓時間 (sec)\");\n    dt.Rows.Add(\"RCP-A01\", 215.5, 4.2);\n    dt.Rows.Add(\"RCP-B02\", 230.0, 5.0);\n    dataGridView1.DataSource = dt;\n}",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_09-03: DataGridView 工控配方表與數據管理 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_09-03: DataGridView 工控配方表與數據管理 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  },
  {
    "id": "cs-lab-09-04",
    "labNumber": "09-04",
    "title": "LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控",
    "date": "2026-08-15",
    "category": "單元 09: 工控進階 HMI 應用",
    "summary": "以 Socket 建立輕量化工控 Web Server，透過 Base64 串流將 SCADA 即時畫面傳送至平板瀏覽器！",
    "image": "images_src/csharp_labs/slides/slide_198.png",
    "objective": "1. 理解並掌握 LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 的核心觀念與工控應用場景。\n2. 熟練使用 Visual Studio 設計對應之 Windows Forms 畫面與控制項屬性。\n3. 實作 C# 邏輯代碼並掌握除錯驗證與例外防護技巧。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 投影片 P.198 實作解析",
        "description": "LAB_09-04: Web Server(伺服器)",
        "image": "images_src/csharp_labs/slides/slide_198.png",
        "imageCaption": "投影片第 198 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 2: 投影片 P.199 實作解析",
        "description": "Client: Brower Http Server Request Response",
        "image": "images_src/csharp_labs/slides/slide_199.png",
        "imageCaption": "投影片第 199 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 3: 投影片 P.200 實作解析",
        "description": "socket() bind() listen() accept()",
        "image": "images_src/csharp_labs/slides/slide_200.png",
        "imageCaption": "投影片第 200 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 4: 投影片 P.201 實作解析",
        "description": "工業物聯網（Industrial Internet of Things）簡稱IIoT",
        "image": "images_src/csharp_labs/slides/slide_201.png",
        "imageCaption": "投影片第 201 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 5: 投影片 P.202 實作解析",
        "description": "Html",
        "image": "images_src/csharp_labs/slides/slide_202.png",
        "imageCaption": "投影片第 202 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 6: 投影片 P.203 實作解析",
        "description": "Data URI Data URI 的方式減少 HTTP 的請求（Request）數量， 讓網頁載入速度變得更快。 Data URI 是一種檔案格式，",
        "image": "images_src/csharp_labs/slides/slide_203.png",
        "imageCaption": "投影片第 203 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 7: 投影片 P.204 實作解析",
        "description": "Base64 Base64（基底64）是一種基於64個可列印字元來表示二進位資料的表示方法。 所以每6個位元為一個單元，對應某個可列印字元。 https://zh.wikipedia.org/zh-tw/Base64",
        "image": "images_src/csharp_labs/slides/slide_204.png",
        "imageCaption": "投影片第 204 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 8: 投影片 P.205 實作解析",
        "description": "How to display Base64 images in HTML 205 https://stackoverflow.com/questions/8499633/how-to-display-base64-images-in-html",
        "image": "images_src/csharp_labs/slides/slide_205.png",
        "imageCaption": "投影片第 205 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 9: 投影片 P.206 實作解析",
        "description": "Wireshark https://www.wireshark.org/download.html 網路封包擷取工具",
        "image": "images_src/csharp_labs/slides/slide_206.png",
        "imageCaption": "投影片第 206 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 10: 投影片 P.207 實作解析",
        "description": "Filter dst 192.168.0.136 ip.addr == 192.168.0.136 host 192.168.0.136 && port 80",
        "image": "images_src/csharp_labs/slides/slide_207.png",
        "imageCaption": "投影片第 207 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 11: 投影片 P.208 實作解析",
        "description": "依投影片第 208 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_208.png",
        "imageCaption": "投影片第 208 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 12: 投影片 P.209 實作解析",
        "description": "依投影片第 209 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_209.png",
        "imageCaption": "投影片第 209 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 13: 投影片 P.210 實作解析",
        "description": "依投影片第 210 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_210.png",
        "imageCaption": "投影片第 210 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 14: 投影片 P.211 實作解析",
        "description": "https://api.products.aspose.app/ocr/zh/img-to-base64#",
        "image": "images_src/csharp_labs/slides/slide_211.png",
        "imageCaption": "投影片第 211 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 15: 投影片 P.212 實作解析",
        "description": "謝謝大家 你和母親的關係，決定了你與世界的關係 春潮",
        "image": "images_src/csharp_labs/slides/slide_212.png",
        "imageCaption": "投影片第 212 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 16: 投影片 P.213 實作解析",
        "description": "Appendix",
        "image": "images_src/csharp_labs/slides/slide_213.png",
        "imageCaption": "投影片第 213 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 17: 投影片 P.214 實作解析",
        "description": "依投影片第 214 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_214.png",
        "imageCaption": "投影片第 214 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 18: 投影片 P.215 實作解析",
        "description": "https://sites.google.com/view/plcpcbased/%E8%AA%B2%E7%A8%8B%E5%85%A7%E5%AE%B9/c%E7%89%A9%E8%81%AF%E7%B6%B2%E5%B7%A5%E6%8E%A7%E6%95%B4%E5%90%88%E7%8F%AD/c%E9%80%B2%E9%9A%8E%E7%8F%AD",
        "image": "images_src/csharp_labs/slides/slide_215.png",
        "imageCaption": "投影片第 215 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 19: 投影片 P.216 實作解析",
        "description": "MELSEC iQ-R 結構化文本(ST)程式指南(中文繁體版)",
        "image": "images_src/csharp_labs/slides/slide_216.png",
        "imageCaption": "投影片第 216 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 20: 投影片 P.217 實作解析",
        "description": "依投影片第 217 頁進行介面與代碼實作配置。",
        "image": "images_src/csharp_labs/slides/slide_217.png",
        "imageCaption": "投影片第 217 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 21: 投影片 P.218 實作解析",
        "description": "將 method 或是 class 標記為 internal 來限定專案使用 原因 一般專案常常會有部份操作是的前後台行為相同或是極度類似的， 如果這些行為雷同的程式分別置於前後台會讓程式碼顯得多餘，",
        "image": "images_src/csharp_labs/slides/slide_218.png",
        "imageCaption": "投影片第 218 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 22: 投影片 P.219 實作解析",
        "description": "屬性或索引器不能作為 out 或 ref 參數傳遞 ref和out參數值在內部實現時，需要將內存地址傳給目標方法。由於屬性可能是沒有支持字段的虛字段，也有可能是只讀/只寫的，因此不可能傳遞其基礎存儲的地址。所以，不能將屬性作為ref或out參數值來傳遞。同樣的道理也適用於方法調用屬性是類的 函數成員 只有數據成員(真是存儲數據)才可以在 C# 中，既可以通過...",
        "image": "images_src/csharp_labs/slides/slide_219.png",
        "imageCaption": "投影片第 219 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      },
      {
        "step": "步驟 23: 投影片 P.220 實作解析",
        "description": "[ 自動變數 ] 視窗會顯示在偵錯工具暫停的目前語句周圍所使用的變數。 [ 區域變數 ] 視窗會顯示本機範圍中定義的變數，通常是目前的函式或方法。 https://learn.microsoft.com/zh-tw/visualstudio/debugger/autos-and-locals-windows?view=vs-2022",
        "image": "images_src/csharp_labs/slides/slide_220.png",
        "imageCaption": "投影片第 220 頁：LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 核心說明與代碼"
      }
    ],
    "csharpCode": "// LAB_09-04: 工控 Web Server\nusing System.Net;\nusing System.Net.Sockets;\n\nTcpListener server = new TcpListener(IPAddress.Any, 8080);\nserver.Start();\n// 監聽並將 HMI Base64 畫面輸出為 HTTP Response\n",
    "aiPrompt": "請以 C# (.NET Framework / .NET 8) 撰寫 LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 的完整 Windows Forms 範例，包含控制項配置、事件處理函式，並加上詳細的繁體中文註解與工控實務安全防護考量。",
    "references": [
      {
        "title": "Microsoft Learn - LAB_09-04: Web Server 內嵌網頁伺服器與遠端監控 相關技術指南",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/?view=netdesktop-8.0"
      },
      {
        "title": "C# 程式設計手冊 (Microsoft Learn)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/csharp/programming-guide/"
      }
    ]
  }
];
