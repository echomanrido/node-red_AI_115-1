from gguf import GGUFReader

blob_path = r"C:\Users\echom\.ollama\models\blobs\sha256-970aa74c0a90ef7482477cf803618e776e173c007bf957f635f1015bfcfef0e6"

# 讀取 GGUF 檔案（使用記憶體映射，不會把整個幾 GB 載入記憶體導致當機）
reader = GGUFReader(blob_path, "r")

print(f"總共有 {len(reader.tensors)} 組權重張量 (Tensors)\n")

# 列出前 10 組訓練參數（權重層）的名稱、形狀、資料型態與前幾個數值
for tensor in reader.tensors[:10]:
    print(f"層名稱 (Name): {tensor.name}")
    print(f"張量形狀 (Shape): {tensor.shape}")
    print(f"量化類型 (Type): {tensor.tensor_type.name}")
    # 印出該層權重的前 5 個實際數值（若為量化格式則顯示原始 bytes/區塊資料）
    print(f"前 5 筆資料: {tensor.data[:5]}")
    print("-" * 50)