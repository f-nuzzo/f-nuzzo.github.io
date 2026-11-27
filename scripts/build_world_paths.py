"""Convert world-atlas countries-110m TopoJSON to SVG paths (Equal Earth projection). Run once."""
import json, math, sys
topo = json.load(open(sys.argv[1]))
sx, sy = topo["transform"]["scale"]; tx, ty = topo["transform"]["translate"]
arcs = []
for a in topo["arcs"]:
    x = y = 0; pts = []
    for dx, dy in a:
        x += dx; y += dy; pts.append((x * sx + tx, y * sy + ty))
    arcs.append(pts)
A1, A2, A3, A4 = 1.340264, -0.081106, 0.000893, 0.003796; M = math.sqrt(3) / 2
def proj(lon, lat):
    l, p = math.radians(lon), math.radians(lat)
    t = math.asin(M * math.sin(p)); t2 = t * t; t6 = t2 ** 3
    x = l * math.cos(t) / (M * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2)))
    y = t * (A1 + A2 * t2 + t6 * (A3 + A4 * t2))
    return x, y
W = 1000; K = W / (2 * proj(180, 0)[0]); H = 2 * proj(0, 90)[1] * K
def ring(idx):
    pts = []
    for i in idx:
        a = arcs[i] if i >= 0 else arcs[~i][::-1]
        pts += a if not pts else a[1:]
    out = []
    for lon, lat in pts:
        x, y = proj(lon, lat); out.append(f"{x*K+W/2:.1f},{H/2-y*K:.1f}")
    return "M" + "L".join(out) + "Z"
paths = {}
for g in topo["objects"]["countries"]["geometries"]:
    if g.get("type") is None or g["properties"]["name"] == "Antarctica": continue
    polys = g["arcs"] if g["type"] == "MultiPolygon" else [g["arcs"]]
    paths[g.get("id", g["properties"]["name"])] = {"n": g["properties"]["name"], "d": "".join(ring(r) for p in polys for r in p)}
json.dump({"w": W, "h": round(H, 1), "c": paths}, open("data/world_paths.json", "w"), separators=(",", ":"))
print(len(paths), round(H))
# small markets missing at 110m resolution: drawn as dots
dots = {"702": (103.82, 1.35), "344": (114.17, 22.32)}
data = json.load(open("data/world_paths.json"))
data["dots"] = {k: [round(proj(lo, la)[0]*K+W/2, 1), round(H/2-proj(lo, la)[1]*K, 1)] for k, (lo, la) in dots.items()}
json.dump(data, open("data/world_paths.json", "w"), separators=(",", ":"))
