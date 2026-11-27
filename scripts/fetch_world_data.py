"""World Returns Map data: country stock-market returns via US-listed country ETFs (total return)."""
import json, yfinance as yf, pandas as pd
from datetime import date
# ISO numeric -> (ETF, country)
E = {"840":("SPY","United States"),"124":("EWC","Canada"),"484":("EWW","Mexico"),"076":("EWZ","Brazil"),
 "032":("ARGT","Argentina"),"152":("ECH","Chile"),"604":("EPU","Peru"),"170":("GXG","Colombia"),
 "826":("EWU","United Kingdom"),"276":("EWG","Germany"),"250":("EWQ","France"),"380":("EWI","Italy"),
 "724":("EWP","Spain"),"528":("EWN","Netherlands"),"756":("EWL","Switzerland"),"056":("EWK","Belgium"),
 "040":("EWO","Austria"),"752":("EWD","Sweden"),"578":("ENOR","Norway"),"208":("EDEN","Denmark"),
 "246":("EFNL","Finland"),"372":("EIRL","Ireland"),"620":("PGAL","Portugal"),"300":("GREK","Greece"),
 "616":("EPOL","Poland"),"792":("TUR","Turkey"),"376":("EIS","Israel"),"682":("KSA","Saudi Arabia"),
 "784":("UAE","United Arab Emirates"),"634":("QAT","Qatar"),"710":("EZA","South Africa"),"566":("NGE","Nigeria"),
 "818":("EGPT","Egypt"),"356":("INDA","India"),"156":("MCHI","China"),"392":("EWJ","Japan"),
 "410":("EWY","South Korea"),"158":("EWT","Taiwan"),"036":("EWA","Australia"),"554":("ENZL","New Zealand"),
 "360":("EIDO","Indonesia"),"458":("EWM","Malaysia"),"764":("THD","Thailand"),"608":("EPHE","Philippines"),
 "704":("VNM","Vietnam"),"702":("EWS","Singapore"),"344":("EWH","Hong Kong"),"586":("PAK","Pakistan")}
tick = sorted({v[0] for v in E.values()})
px = yf.download(tick + ["EURUSD=X"], start="2020-11-01", auto_adjust=True, progress=False)["Close"].ffill()
fx = px.pop("EURUSD=X")
last = px.index[-1]
def ret(s, start):
    s = s.dropna(); s0 = s[s.index <= start]
    if s0.empty or s.index[0] > start: return None
    return float(s.iloc[-1] / s0.iloc[-1] - 1)
starts = {"ytd": pd.Timestamp(last.year - 1, 12, 31), "1y": last - pd.DateOffset(years=1),
          "3y": last - pd.DateOffset(years=3), "5y": last - pd.DateOffset(years=5)}
out = {"updated": last.strftime("%Y-%m-%d"), "countries": {}}
for iso, (t, name) in E.items():
    if t not in px or px[t].dropna().empty: print("missing", t); continue
    r = {"etf": t, "name": name, "usd": {}, "eur": {}}
    for k, s0 in starts.items():
        u = ret(px[t], s0); f = ret(fx, s0)
        yrs = {"3y": 3, "5y": 5}.get(k)
        e = None if u is None else (1 + u) / (1 + f) - 1
        ann = lambda x: None if x is None else ((1 + x) ** (1 / yrs) - 1 if yrs else x)
        r["usd"][k] = None if u is None else round(ann(u), 5); r["eur"][k] = None if e is None else round(ann(e), 5)
    out["countries"][iso] = r
json.dump(out, open("data/world_returns.json", "w"), separators=(",", ":"))
print(last.date(), len(out["countries"]), out["countries"]["380"])
