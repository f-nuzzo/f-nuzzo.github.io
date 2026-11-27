// Small SVG chart helpers shared by the dashboard pages (no libraries).
const Charts = (() => {
  const t = d => new Date(d.length === 7 ? d + '-15' : d).getTime();
  const fmtDate = d => new Date(t(d)).toLocaleString('en-GB', d.length === 7 ? {month:'short', year:'numeric'} : {day:'numeric', month:'short', year:'numeric'});

  // series: [{name, color, obs:[[date, value]], dash}]
  function time(el, series, {h = 300, yfmt = v => v.toFixed(1), zeroLine = false, step = null} = {}) {
    const W = el.clientWidth || 700, pad = {l:46, r:12, t:12, b:26};
    const xs = series.flatMap(s => s.obs.map(o => t(o[0]))), ys = series.flatMap(s => s.obs.map(o => o[1]));
    const x0 = Math.min(...xs), x1 = Math.max(...xs);
    let lo = Math.min(...ys), hi = Math.max(...ys); if (zeroLine) { lo = Math.min(lo, 0); hi = Math.max(hi, 0); }
    const span = hi - lo || 1; lo -= span * .06; hi += span * .06;
    const X = v => pad.l + (v - x0) / (x1 - x0) * (W - pad.l - pad.r), Y = v => pad.t + (hi - v) / (hi - lo) * (h - pad.t - pad.b);
    const st = step || [.1,.25,.5,1,2,5,10,25,50,100,250][[.1,.25,.5,1,2,5,10,25,50,100,250].findIndex(s => (hi - lo) / s <= 6)];
    let g = '';
    for (let v = Math.ceil(lo / st) * st; v <= hi; v += st)
      g += `<line x1="${pad.l}" x2="${W-pad.r}" y1="${Y(v)}" y2="${Y(v)}" style="stroke:var(--line)" ${Math.abs(v)<1e-9&&zeroLine?'stroke-width="1.5" ':''}/><text x="${pad.l-8}" y="${Y(v)+3.5}" text-anchor="end">${yfmt(v)}</text>`;
    const y0 = new Date(x0).getFullYear(), y1 = new Date(x1).getFullYear(), every = Math.max(1, Math.ceil((y1 - y0) / 6));
    for (let y = y0 + 1; y <= y1; y++) if ((y - y0) % every === 0) { const xx = X(new Date(y, 0, 1).getTime()); g += `<text x="${xx}" y="${h-6}" text-anchor="middle">${y}</text>`; }
    g += series.map(s => `<path d="${s.obs.map((o,i) => (i?'L':'M') + X(t(o[0])).toFixed(1) + ',' + Y(o[1]).toFixed(1)).join('')}" fill="none" style="stroke:${s.color}" stroke-width="${s.width||2}" ${s.dash?'stroke-dasharray="5 4"':''} stroke-linejoin="round"/>`).join('');
    g += `<line class="cur" y1="${pad.t}" y2="${h-pad.b}" style="stroke:var(--dim)" stroke-dasharray="2 3" opacity="0"/>`;
    el.innerHTML = `<svg viewBox="0 0 ${W} ${h}" height="${h}">${g}</svg><div class="tip"></div>`;
    hover(el, W, (mx) => {
      const tm = x0 + (mx - pad.l) / (W - pad.l - pad.r) * (x1 - x0);
      const rows = series.map(s => { let b = s.obs[0]; for (const o of s.obs) if (Math.abs(t(o[0]) - tm) < Math.abs(t(b[0]) - tm)) b = o; return {s, o:b}; });
      const ref = rows[0].o;
      return { x: X(t(ref[0])), html: `<div style="color:var(--muted);margin-bottom:6px">${fmtDate(ref[0])}</div>` +
        rows.map(r => `<div><span style="color:${r.s.color}">${r.s.name}</span><b>${yfmt(r.o[1])}</b></div>`).join('') };
    });
  }

  // categorical x (e.g. maturities). series: [{name, color, vals:[...]}]
  function cat(el, labels, series, {h = 300, yfmt = v => v.toFixed(2) + '%'} = {}) {
    const W = el.clientWidth || 700, pad = {l:46, r:12, t:12, b:26};
    const ys = series.flatMap(s => s.vals); let lo = Math.min(...ys), hi = Math.max(...ys); const sp = hi - lo || 1; lo -= sp*.12; hi += sp*.12;
    const X = i => pad.l + i / (labels.length - 1) * (W - pad.l - pad.r), Y = v => pad.t + (hi - v) / (hi - lo) * (h - pad.t - pad.b);
    const st = [.1,.25,.5,1][[.1,.25,.5,1].findIndex(s => (hi-lo)/s <= 6)] || 1;
    let g = '';
    for (let v = Math.ceil(lo/st)*st; v <= hi; v += st) g += `<line x1="${pad.l}" x2="${W-pad.r}" y1="${Y(v)}" y2="${Y(v)}" style="stroke:var(--line)"/><text x="${pad.l-8}" y="${Y(v)+3.5}" text-anchor="end">${v.toFixed(st<1?2:0)}%</text>`;
    g += labels.map((l,i) => `<text x="${X(i)}" y="${h-6}" text-anchor="middle">${l}</text>`).join('');
    g += series.map(s => `<path d="${s.vals.map((v,i)=>(i?'L':'M')+X(i).toFixed(1)+','+Y(v).toFixed(1)).join('')}" fill="none" style="stroke:${s.color}" stroke-width="${s.width||2}" ${s.dash?'stroke-dasharray="5 4"':''}/>` +
      s.vals.map((v,i)=>`<circle cx="${X(i)}" cy="${Y(v)}" r="${s.width>2?3.5:2.5}" style="fill:${s.color}"/>`).join('')).join('');
    g += `<line class="cur" y1="${pad.t}" y2="${h-pad.b}" style="stroke:var(--dim)" stroke-dasharray="2 3" opacity="0"/>`;
    el.innerHTML = `<svg viewBox="0 0 ${W} ${h}" height="${h}">${g}</svg><div class="tip"></div>`;
    hover(el, W, mx => { const i = Math.max(0, Math.min(labels.length-1, Math.round((mx-pad.l)/(W-pad.l-pad.r)*(labels.length-1))));
      return { x: X(i), html: `<div style="color:var(--muted);margin-bottom:6px">${labels[i]} maturity</div>` + series.map(s=>`<div><span style="color:${s.color}">${s.name}</span><b>${yfmt(s.vals[i])}</b></div>`).join('') }; });
  }

  function spark(el, obs, color = 'var(--accent)') {
    const W = 200, H = 44, v = obs.map(o => o[1]), lo = Math.min(...v), hi = Math.max(...v);
    const d = v.map((y,i) => (i?'L':'M') + (i/(v.length-1)*W).toFixed(1) + ',' + (H-2-(y-lo)/(hi-lo||1)*(H-4)).toFixed(1)).join('');
    el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="width:100%;height:${H}px;display:block"><path d="${d}" fill="none" style="stroke:${color}" stroke-width="1.8" vector-effect="non-scaling-stroke"/></svg>`;
  }

  function hover(el, W, at) {
    const svg = el.querySelector('svg'), tip = el.querySelector('.tip'), cur = el.querySelector('.cur');
    svg.onmousemove = ev => {
      const r = svg.getBoundingClientRect(), mx = (ev.clientX - r.left) * W / r.width, o = at(mx);
      cur.setAttribute('x1', o.x); cur.setAttribute('x2', o.x); cur.setAttribute('opacity', 1);
      tip.innerHTML = o.html; const px = o.x / W * r.width;
      tip.style.left = (px > r.width * .6 ? px - tip.offsetWidth - 14 : px + 14) + 'px'; tip.style.top = '10px'; tip.style.opacity = 1;
    };
    svg.onmouseleave = () => { tip.style.opacity = 0; cur.setAttribute('opacity', 0); };
  }
  return { time, cat, spark, fmtDate };
})();
