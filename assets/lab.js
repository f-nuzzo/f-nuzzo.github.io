(async () => {
  const D = await (await fetch('data/portfolio_returns.json')).json();
  const E = Engine, $ = id => document.getElementById(id);
  const MIX = { id:'mix', name:'Your mix', who:'You', color:'var(--p-mix)', w:{SPY:.5, VEU:.2, IEF:.2, GLD:.1} };
  const MIX_ASSETS = ['SPY','IJS','VEU','TLT','IEF','SHY','BIL','GLD','DBC'];
  const state = { ccy:'usd', start:D.dates[0].slice(0,4), on:new Set(['stocks','6040','allweather','butterfly','mix']), sort:{k:'sharpe',d:-1} };
  const all = () => [...E.PORTFOLIOS, MIX];
  const fmt = (x,d=1) => (x>0?'+':'') + E.pct(x,d);
  const col = x => x >= 0 ? 'var(--pos)' : 'var(--neg)';

  // ---- controls
  const years = [...new Set(D.dates.map(d=>d.slice(0,4)))].filter(y => D.dates.filter(d=>d.startsWith(y)).length > 0).slice(0,-3);
  $('start').innerHTML = years.map(y=>`<option value="${y}">${I18N.L('From','Dal')} ${y}</option>`).join('');
  $('start').onchange = e => { state.start = e.target.value; render(); };
  $('ccy').onclick = e => { const b = e.target.closest('button'); if(!b) return;
    state.ccy = b.dataset.v; [...$('ccy').children].forEach(x=>x.classList.toggle('on', x===b)); render(); };
  function chips() {
    $('chips').innerHTML = all().map(p=>`<button class="chip ${state.on.has(p.id)?'on':''}" data-id="${p.id}"><i style="background:${p.color}"></i>${p.name}</button>`).join('');
  }
  $('chips').onclick = e => { const b = e.target.closest('.chip'); if(!b) return;
    const id = b.dataset.id; state.on.has(id) ? state.on.delete(id) : state.on.add(id); if(!state.on.size) state.on.add(id); chips(); render(); };
  function mixUI() {
    $('mix').innerHTML = MIX_ASSETS.map(k=>`<label>${D.assets[k].name}<input type="range" min="0" max="100" step="5" value="${Math.round((MIX.w[k]||0)*100)}" data-k="${k}"><span class="v">${Math.round((MIX.w[k]||0)*100)}%</span></label>`).join('');
  }
  $('mix').oninput = e => { const k = e.target.dataset.k; if(!k) return;
    MIX.w[k] = e.target.value/100; e.target.nextElementSibling.textContent = e.target.value+'%';
    state.on.add('mix'); chips(); render(); };

  // ---- charts
  function lineChart(el, series, {h=320, log=false, yfmt, zero=false}) {
    const W = el.clientWidth || 800, pad = {l:52, r:12, t:10, b:26};
    const n = series[0].v.length, dates = series[0].dates;
    const tf = v => log ? Math.log(v) : v;
    const vals = series.flatMap(s=>s.v.map(tf));
    let lo = Math.min(...vals), hi = Math.max(...vals); if (zero) hi = 0;
    const x = i => pad.l + i/(n-1)*(W-pad.l-pad.r), y = v => pad.t + (hi - tf(v))/(hi-lo||1)*(h-pad.t-pad.b);
    // y ticks
    let ticks = [];
    if (log) { for (const t of [5e3,7.5e3,1e4,1.5e4,2e4,3e4,4e4,6e4,8e4,1e5]) if (Math.log(t)>=lo-.02 && Math.log(t)<=hi+.02) ticks.push(t); }
    else { const step = [.05,.1,.2,.25][[.05,.1,.2,.25].findIndex(s => (hi-lo)/s <= 6)] || .25; for (let t = 0; t >= lo; t -= step) ticks.push(t); }
    const yrs = dates.map((d,i)=>[d,i]).filter(([d])=>d.endsWith('-01') && +d.slice(0,4) % (n>150?3:2) === 0);
    let g = ticks.map(t=>`<line x1="${pad.l}" x2="${W-pad.r}" y1="${y(t)}" y2="${y(t)}" stroke="var(--line)"/><text x="${pad.l-8}" y="${y(t)+3.5}" text-anchor="end">${yfmt(t)}</text>`).join('');
    g += yrs.map(([d,i])=>`<text x="${x(i)}" y="${h-6}" text-anchor="middle">${d.slice(0,4)}</text>`).join('');
    g += series.map(s=>`<path d="${s.v.map((v,i)=>(i?'L':'M')+x(i).toFixed(1)+','+y(v).toFixed(1)).join('')}" fill="none" style="stroke:${s.color}" stroke-width="${s.id==='mix'?2.2:1.7}" ${s.id==='mix'?'stroke-dasharray="5 3"':''}/>`).join('');
    g += `<line id="cur" y1="${pad.t}" y2="${h-pad.b}" stroke="var(--muted)" stroke-dasharray="2 3" opacity="0"/>`;
    el.innerHTML = `<svg viewBox="0 0 ${W} ${h}" height="${h}">${g}</svg><div class="tip"></div>`;
    const svg = el.querySelector('svg'), tip = el.querySelector('.tip'), cur = el.querySelector('#cur');
    svg.onmousemove = ev => {
      const r = svg.getBoundingClientRect(), mx = (ev.clientX - r.left) * W / r.width;
      const i = Math.max(0, Math.min(n-1, Math.round((mx-pad.l)/(W-pad.l-pad.r)*(n-1))));
      cur.setAttribute('x1', x(i)); cur.setAttribute('x2', x(i)); cur.setAttribute('opacity', 1);
      const rows = [...series].sort((a,b)=>b.v[i]-a.v[i]);
      tip.innerHTML = `<div style="color:var(--muted);margin-bottom:6px">${new Date(dates[i]+'-01').toLocaleString('en-GB',{month:'short',year:'numeric'})}</div>` +
        rows.map(s=>`<div><span style="color:${s.color}">${s.name}</span><b>${yfmt(s.v[i])}</b></div>`).join('');
      const px = x(i) / W * r.width; tip.style.left = (px > r.width*.6 ? px - tip.offsetWidth - 14 : px + 14) + 'px';
      tip.style.top = '10px'; tip.style.opacity = 1;
    };
    svg.onmouseleave = () => { tip.style.opacity = 0; cur.setAttribute('opacity', 0); };
  }

  // ---- render
  function render() {
    const i0 = D.dates.findIndex(d => d.startsWith(state.start));
    const res = all().filter(p=>state.on.has(p.id)).map(p => ({...p, ...E.run(D, p.w, state.ccy, i0)}));
    const cur = state.ccy === 'usd' ? '$' : '€';
    lineChart($('growth'), res.map(r=>({...r, v:r.value.map(v=>v*1e4)})), {log:true, yfmt:v=>cur+(v>=1e4?(v/1e3).toFixed(v%1e3?1:0).replace('.0','')+'k':Math.round(v/100)/10+'k')});
    lineChart($('dd'), res.map(r=>({...r, v:r.stats.dd})), {h:200, zero:true, yfmt:v=>Math.round(v*100)+'%'});
    const md = new Date(D.dates[i0]+'-01').toLocaleString(I18N.L('en-GB','it-IT'),{month:'short',year:'numeric'});
    $('growth-sub').textContent = I18N.L(`${cur}10,000 invested ${md}, in ${state.ccy.toUpperCase()}. Log scale, so equal slopes mean equal % returns.`, `${cur}10.000 investiti a ${md}, in ${state.ccy.toUpperCase()}. Scala logaritmica: pendenze uguali significano rendimenti % uguali.`);

    // stats table
    const spy = E.run(D, {SPY:1}, state.ccy, i0).ret;
    const cols = [
      ['cagr','CAGR',x=>E.pct(x),1], ['vol','Volatility',x=>E.pct(x),-1], ['sharpe','Sharpe',x=>x.toFixed(2),1],
      ['sortino','Sortino',x=>x.toFixed(2),1], ['maxdd','Max drawdown',x=>E.pct(x),1], ['longest','Longest underwater',x=>x+I18N.L(' mo',' mesi'),-1],
      ['calmar','Calmar',x=>x.toFixed(2),1], ['bestY','Best year',x=>x,0], ['worstY','Worst year',x=>x,0], ['corr','Corr. to stocks',x=>x.toFixed(2),0], ['final','Final value',x=>x,0]];
    const rows = res.map(r => ({ r, cagr:r.stats.cagr, vol:r.stats.vol, sharpe:r.stats.sharpe, sortino:r.stats.sortino, maxdd:r.stats.maxdd,
      longest:r.stats.longest, calmar:r.stats.calmar, corr:E.corr(r.ret, spy), finalN:r.value.at(-1),
      bestY: r.stats.best ? `${fmt(r.stats.best.r)} <span style="color:var(--dim)">${r.stats.best.y}</span>` : '–',
      worstY: r.stats.worst ? `${fmt(r.stats.worst.r)} <span style="color:var(--dim)">${r.stats.worst.y}</span>` : '–',
      final: cur + Math.round(r.value.at(-1)*1e4).toLocaleString('en-US') }));
    const sk = state.sort.k === 'final' ? 'finalN' : state.sort.k;
    if (typeof rows[0][sk] === 'number') rows.sort((a,b)=>(a[sk]-b[sk])*state.sort.d);
    const best = {}; cols.forEach(([k,,,dir]) => { if (dir) best[k] = (dir>0?Math.max:Math.min)(...rows.map(x=>x[k])); });
    $('stats').innerHTML = `<tr><th>Portfolio</th>${cols.map(([k,l])=>`<th data-k="${k}">${l}${state.sort.k===k?(state.sort.d<0?' ↓':' ↑'):''}</th>`).join('')}</tr>` +
      rows.map(x=>`<tr><td><span class="dot" style="background:${x.r.color}"></span>${x.r.name}</td>${cols.map(([k,,f,dir])=>`<td class="${dir&&x[k]===best[k]&&rows.length>1?'best':''}">${f(x[k])}</td>`).join('')}</tr>`).join('');

    // crisis
    $('crisis').innerHTML = `<tr><th>Portfolio</th>${E.CRISES.map(c=>`<th>${c.name}<br><span style="text-transform:none;letter-spacing:0">${c.from} → ${c.to}</span></th>`).join('')}</tr>` +
      res.map(r=>`<tr><td><span class="dot" style="background:${r.color}"></span>${r.name}</td>${E.CRISES.map(c=>{const v=E.crisis(D,r.w,state.ccy,c);return `<td style="color:${col(v)}">${fmt(v)}</td>`}).join('')}</tr>`).join('');

    // heatmap
    const yrs = res[0].stats.annual;
    $('heat').innerHTML = `<tr><th>Portfolio</th>${yrs.map(a=>`<th>${a.y}${a.full?'':'*'}</th>`).join('')}</tr>` +
      res.map(r=>`<tr><td><span class="dot" style="background:${r.color}"></span>${r.name}</td>${r.stats.annual.map(a=>{
        const t = Math.min(1, Math.abs(a.r)/.3), bg = a.r>=0 ? `rgba(var(--pos-rgb),${.08+t*.45})` : `rgba(var(--neg-rgb),${.08+t*.5})`;
        return `<td style="background:${bg};color:var(--text)">${(a.r*100).toFixed(0)}</td>`}).join('')}</tr>`).join('');

    const mt = Object.values(MIX.w).reduce((a,b)=>a+b,0);
    $('mix-total').textContent = I18N.L('Total set: ','Totale impostato: ') + Math.round(mt*100) + '%' + (Math.abs(mt-1)>.001 ? I18N.L(' → rescaled to 100%',' → riportato al 100%') : '');
  }
  $('stats').onclick = e => { const k = e.target.closest('th')?.dataset.k; if(!k) return;
    state.sort = { k, d: state.sort.k===k ? -state.sort.d : -1 }; render(); };

  // ---- portfolio cards
  const ac = {SPY:'#2f3a35',VTI:'#55625b',IJS:'#7d8a83',VEU:'#3b6fd8',TLT:'#0d7a52',IEF:'#2ea476',BND:'#5cc095',SHY:'#94d6b6',BIL:'#b9c2bd',GLD:'#d49a1c',DBC:'#8b4fd6'};
  $('cards').innerHTML = E.PORTFOLIOS.map(p=>`<div class="pcard"><h4><span class="dot" style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${p.color}"></span>${p.name}</h4>
    <div class="who">${p.who}</div><p>${p.note}</p>
    <div class="wbar">${Object.entries(p.w).map(([k,v])=>`<span style="flex:${v};background:${ac[k]}"></span>`).join('')}</div>
    <div class="wlist">${Object.entries(p.w).map(([k,v])=>`<span><span style="color:${ac[k]}">●</span> ${Math.round(v*1000)/10}% <span>${D.assets[k].name}</span></span>`).join('')}</div></div>`).join('');

  chips(); mixUI(); render();
  addEventListener('langchange', () => { const v = $('start').value; $('start').innerHTML = years.map(y=>`<option value="${y}">${I18N.L('From','Dal')} ${y}</option>`).join(''); $('start').value = v; render(); });
  let t; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(render, 150); });
})();
