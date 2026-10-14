# -*- coding: utf-8 -*-
"""
update_overview.py
將 data_mindmap_svg 中的心智圖 SVG 注入到 data_overview.py 的 slide 2 中
"""
import re

with open("data_overview.py", "r", encoding="utf-8") as f:
    content = f.read()

# 在開頭加入 import
if "from data_mindmap_svg import mindmap_svg" not in content:
    content = "from data_mindmap_svg import mindmap_svg\n" + content

# 替換 "isMindmap": True 為 "isMindmap": True, "is_mindmap": True, "svg_content": mindmap_svg
content = re.sub(
    r'"isMindmap":\s*True',
    r'"isMindmap": True, "is_mindmap": True, "svg_content": mindmap_svg',
    content
)

with open("data_overview.py", "w", encoding="utf-8") as f:
    f.write(content)

print("data_overview.py updated with mindmap SVG successfully!")
