"""Europe Dashboard data: ECB Data Portal (no key). Writes data/europe.json."""
import csv, io, json, urllib.request
from datetime import date, timedelta
API = "https://data-api.ecb.europa.eu/service/data/{}?format=csvdata&startPeriod={}"
START = (date.today() - timedelta(days=365*11)).isoformat()

def get(key, start=START):
    flow, rest = key.split("/", 1)
    url = API.format(f"{flow}/{rest}", start)
    with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "curl/8.7.1"}), timeout=60) as r:
        rows = list(csv.DictReader(io.StringIO(r.read().decode())))
    return [(x["TIME_PERIOD"], float(x["OBS_VALUE"])) for x in rows if x["OBS_VALUE"] not in ("", "NaN")]

def weekly(obs):  # daily -> last obs per ISO week
    out = {}
    for d, v in obs:
        y, w, _ = date.fromisoformat(d).isocalendar(); out[(y, w)] = (d, v)
    return list(out.values())

S = {
 "dfr":   ("ECB deposit rate", "%", "FM/D.U2.EUR.4F.KR.DFR.LEV", True),
 "unemp": ("Euro-area unemployment", "%", "LFSI/M.I9.S.UNEHRT.TOTAL0.15_74.T", False),
 "eurusd":("EUR/USD", "USD", "EXR/D.USD.EUR.SP00.A", True),
}
ESTAT = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_minr?unit=RCH_A&coicop18={}&geo={}&sinceTimePeriod={}"
def hicp(coicop, geo="EA"):
    """Eurostat HICP (ECOICOP ver.2 dataset, live since Jan 2026), annual rate of change."""
    url = ESTAT.format(coicop, geo, START[:7])
    with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "curl/8.7.1"}), timeout=60) as r:
        d = json.load(r)
    t = {i: k for k, i in d["dimension"]["time"]["category"]["index"].items()}
    return [(t[int(i)], v) for i, v in sorted(d["value"].items(), key=lambda x: int(x[0]))]

LT = {"DE":"Germany","IT":"Italy","FR":"France","ES":"Spain","GR":"Greece","NL":"Netherlands","PT":"Portugal"}
out = {"updated": date.today().isoformat(), "series": {}, "yields": {}, "curve": {}}
for k, (name, unit, key, daily) in S.items():
    obs = get(key); out["series"][k] = {"name": name, "unit": unit, "obs": weekly(obs) if daily else obs}
    print(k, obs[-1])
out["series"]["hicp"] = {"name": "Euro-area inflation", "unit": "% y/y", "obs": hicp("TOTAL")}
out["series"]["core"] = {"name": "Core inflation", "unit": "% y/y", "obs": hicp("TOT_X_NRG_FOOD")}
out["inflation_by_country"] = {c: hicp("TOTAL", {"GR": "EL"}.get(c, c))[-1] for c in LT}
print("hicp", out["series"]["hicp"]["obs"][-1], out["inflation_by_country"])
for c, name in LT.items():
    obs = get(f"IRS/M.{c}.L.L40.CI.0000.EUR.N.Z"); out["yields"][c] = {"name": name, "obs": obs}
    print(c, obs[-1])
MAT = ["3M","6M","1Y","2Y","3Y","5Y","7Y","10Y","15Y","20Y","30Y"]
curve_start = (date.today() - timedelta(days=400)).isoformat()
for m in MAT:
    obs = get(f"YC/B.U2.EUR.4F.G_N_A.SV_C_YM.SR_{m}", curve_start)
    out["curve"][m] = obs
print("curve", out["curve"]["10Y"][-1])
json.dump(out, open("data/europe.json", "w"), separators=(",", ":"))
