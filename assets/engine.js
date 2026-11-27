// Portfolio engine: monthly backtest with annual (end-of-December) rebalancing.
const Engine = (() => {
  const PORTFOLIOS = [
    { id:'stocks', name:'100% Stocks', who:'Benchmark', color:'var(--p-stocks)',
      w:{SPY:1}, note:'All in the S&P 500. The reference point: maximum growth, maximum pain.' },
    { id:'6040', name:'Classic 60/40', who:'Industry standard', color:'var(--p-6040)',
      w:{SPY:.6, IEF:.4}, note:'60% stocks, 40% intermediate Treasuries. The default balanced portfolio.' },
    { id:'threefund', name:'Three-Fund', who:'John Bogle / Bogleheads', color:'var(--p-threefund)',
      w:{VTI:.48, VEU:.32, BND:.20}, note:'US total market, international stocks and aggregate bonds. Cheap and global.' },
    { id:'allweather', name:'All Weather', who:'Ray Dalio, retail version', color:'var(--p-allweather)',
      w:{SPY:.30, TLT:.40, IEF:.15, GLD:.075, DBC:.075}, note:'Balances risk across growth and inflation regimes. Heavy in long bonds.' },
    { id:'permanent', name:'Permanent', who:'Harry Browne', color:'var(--p-permanent)',
      w:{SPY:.25, TLT:.25, GLD:.25, BIL:.25}, note:'Four equal parts for prosperity, deflation, inflation and recession.' },
    { id:'butterfly', name:'Golden Butterfly', who:'Tyler (Portfolio Charts)', color:'var(--p-butterfly)',
      w:{SPY:.20, IJS:.20, TLT:.20, SHY:.20, GLD:.20}, note:'Permanent Portfolio with a tilt to small-cap value for more growth.' },
  ];
  const CRISES = [
    { id:'gfc', name:'Financial crisis', from:'2007-11', to:'2009-02' },
    { id:'euro', name:'Euro debt crisis', from:'2011-05', to:'2011-09' },
    { id:'covid', name:'Covid crash', from:'2020-02', to:'2020-03' },
    { id:'y2022', name:'2022 rate shock', from:'2022-01', to:'2022-12' },
  ];

  function run(D, w, ccy, i0 = 0, i1 = D.dates.length - 1) {
    const keys = Object.keys(w).filter(k => w[k] > 0);
    const tot = keys.reduce((s,k)=>s+w[k],0) || 1;
    let h = keys.map(k => w[k]/tot), V = 1;
    const ret = [], value = [], dates = [];
    for (let i = i0; i <= i1; i++) {
      h = h.map((x,j) => x * (1 + D.assets[keys[j]][ccy][i]));
      const nv = h.reduce((a,b)=>a+b,0);
      ret.push(nv / V - 1); V = nv; value.push(V); dates.push(D.dates[i]);
      if (D.dates[i].endsWith('-12')) h = keys.map(k => V * w[k]/tot);
    }
    const rf = ccy === 'usd' ? D.assets.BIL.usd.slice(i0, i1+1) : ret.map(()=>0);
    return { dates, ret, value, stats: stats(dates, ret, value, rf) };
  }

  function stats(dates, ret, value, rf) {
    const n = ret.length, mean = a => a.reduce((s,x)=>s+x,0)/a.length;
    const sd = a => { const m = mean(a); return Math.sqrt(a.reduce((s,x)=>s+(x-m)**2,0)/(a.length-1)); };
    const ex = ret.map((r,i)=>r-rf[i]);
    const dd = []; let peak = 1, maxdd = 0, under = 0, longest = 0;
    value.forEach(v => { peak = Math.max(peak, v); const d = v/peak-1; dd.push(d); maxdd = Math.min(maxdd, d);
      under = d < -1e-9 ? under+1 : 0; longest = Math.max(longest, under); });
    const down = Math.sqrt(ex.reduce((s,x)=>s+Math.min(0,x)**2,0)/n);
    const years = {};
    dates.forEach((d,i)=>{ const y = d.slice(0,4); (years[y] ||= {v:1,m:0}); years[y].v *= 1+ret[i]; years[y].m++; });
    const annual = Object.entries(years).map(([y,o])=>({y, r:o.v-1, full:o.m===12}));
    const full = annual.filter(a=>a.full);
    const cagr = value[n-1] ** (12/n) - 1;
    return {
      cagr, vol: sd(ret)*Math.sqrt(12), maxdd, longest, dd, annual,
      sharpe: mean(ex)*12 / (sd(ex)*Math.sqrt(12)),
      sortino: mean(ex)*12 / (down*Math.sqrt(12)),
      calmar: cagr / Math.abs(maxdd),
      best: full.reduce((a,b)=>b.r>a.r?b:a, full[0]), worst: full.reduce((a,b)=>b.r<a.r?b:a, full[0]),
      pctUp: ret.filter(r=>r>0).length/n,
    };
  }

  function crisis(D, w, ccy, c) {
    const i0 = D.dates.indexOf(c.from), i1 = D.dates.indexOf(c.to);
    if (i0 < 0 || i1 < 0) return null;
    return run(D, w, ccy, i0, i1).value.at(-1) - 1;
  }

  function corr(a, b) {
    const n=a.length, ma=a.reduce((s,x)=>s+x,0)/n, mb=b.reduce((s,x)=>s+x,0)/n;
    let c=0, va=0, vb=0; for (let i=0;i<n;i++){ c+=(a[i]-ma)*(b[i]-mb); va+=(a[i]-ma)**2; vb+=(b[i]-mb)**2; }
    return c/Math.sqrt(va*vb);
  }

  const pct = (x, d=1) => (x*100).toFixed(d) + '%';
  return { PORTFOLIOS, CRISES, run, crisis, corr, pct };
})();
