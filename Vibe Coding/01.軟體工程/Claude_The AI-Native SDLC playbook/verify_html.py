# -*- coding: utf-8 -*-
import re

with open("Claude_The_AI-Native_SDLC_playbook_Slides.html", "r", encoding="utf-8") as f:
    html = f.read()

print("HTML file size (bytes):", len(html.encode("utf-8")))
print("Contains detailedSlides:", "const detailedSlides = [" in html)
print("Contains overviewSlides:", "const overviewSlides = [" in html)
print("Contains flowcharts:", "const flowcharts = {" in html)
print("Contains mindmap SVG:", 'id="mindmap-svg"' in html)

# 檢查 20 個章節名稱是否都有出現
all_chapters_present = all(f"第 {i} 章" in html for i in range(1, 21))
print("All 20 chapters present:", all_chapters_present)

# 提取 detailedSlides 的長度
match = re.search(r'const detailedSlides = (\[.*?\]);\s*const flowcharts', html, re.DOTALL)
if match:
    import json
    data = json.loads(match.group(1))
    print(f"Verified detailedSlides count in HTML: {len(data)}")
    print(f"First slide title: {data[0]['title']}")
    print(f"Last slide title: {data[-1]['title']}")
