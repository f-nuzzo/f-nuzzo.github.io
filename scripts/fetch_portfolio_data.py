"""Download monthly total-return data for the Portfolio Lab (ETF proxies, dividends reinvested)."""
import json, yfinance as yf, pandas as pd
T = {"SPY":"US stocks (S&P 500)","VTI":"US total market","IJS":"US small-cap value",
     "VEU":"International stocks","TLT":"Long-term Treasuries","IEF":"Intermediate Treasuries",
     "BND":"US aggregate bonds","SHY":"Short-term Treasuries","BIL":"T-bills (cash)",
     "GLD":"Gold","DBC":"Commodities"}
px = yf.download(list(T)+["EURUSD=X"], start="2007-01-01", auto_adjust=True, progress=False)["Close"]
m = px.resample("ME").last()
m = m[m.index < pd.Timestamp.today().normalize().replace(day=1)]  # complete months only
r = m.pct_change().dropna()
start = r.index[0]
fx = r.pop("EURUSD=X")                      # USD per EUR change
r_eur = (1+r).div(1+fx, axis=0) - 1         # USD asset return seen by a EUR investor
out = {"source":"Yahoo Finance adjusted close (dividends reinvested), ETF proxies",
       "dates":[d.strftime("%Y-%m") for d in r.index],
       "assets":{k:{"name":T[k],"usd":[round(x,6) for x in r[k]],"eur":[round(x,6) for x in r_eur[k]]} for k in T}}
json.dump(out, open("data/portfolio_returns.json","w"))
print(start, r.index[-1], len(r), r.isna().sum().sum())
