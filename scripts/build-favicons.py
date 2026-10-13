"""Wrap the original PNG icons in self-contained SVGs with circular clipping."""
import base64
from pathlib import Path
import struct

image_dir = Path(__file__).resolve().parents[1] / "assets" / "img"

for stem, radius_ratio in [("favicon", 0.44), ("favicon-dark", 0.45)]:
    source = image_dir / f"{stem}.png"
    if not source.exists():
        continue
    png = source.read_bytes()
    width, height = struct.unpack(">II", png[16:24])
    cx, cy = width / 2, height / 2
    radius = round(min(width, height) * radius_ratio)
    encoded = base64.b64encode(png).decode("ascii")
    # Embed the PNG because SVGs loaded as favicons cannot fetch external images.
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" '
        f'viewBox="{cx-radius} {cy-radius} {radius*2} {radius*2}">'
        '<defs><clipPath id="round"><circle '
        f'cx="{cx}" cy="{cy}" r="{radius}"/></clipPath></defs>'
        f'<image width="{width}" height="{height}" clip-path="url(#round)" '
        f'href="data:image/png;base64,{encoded}"/></svg>\n'
    )
    (image_dir / f"{stem}-round.svg").write_text(svg, encoding="utf-8")
