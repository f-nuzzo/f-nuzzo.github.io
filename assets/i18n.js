// IT/EN switch. Pages are written in English; Italian comes from this dictionary.
// Static text nodes are translated by exact match; dynamic strings use I18N.L(en, it).
const I18N = (() => {
  const IT = {
"Lab":"Lab","Education":"Formazione","Projects":"Progetti","Portfolio Lab":"Portfolio Lab","Europe":"Europa","World":"Mondo","World Map":"Mappa","Contact":"Contatti",
"Finance · Markets · Tech":"Finanza · Mercati · Tech",
"MSc Finance student at":"Studente di MSc Finance alla",", Paris":", Parigi",
"I study finance and keep reading about it after class: markets, portfolios, how investors make decisions. When a model looks neat on a slide, I want to see how it holds up on real data.":"Studio finanza e continuo a leggerne anche fuori dall'aula: mercati, portafogli, come decidono gli investitori. Quando un modello sembra perfetto su una slide, voglio vedere come regge sui dati veri.",
"I'm curious about the tech side too.":"Mi incuriosisce anche il lato tecnologico.",
"Python, data and AI tools":"Python, i dati e gli strumenti di AI",
"are changing how analysts work, and I want to learn to use them well.":"stanno cambiando il lavoro degli analisti, e voglio imparare a usarli bene.",
"Why this site":"Perché questo sito",
"It's my lab. When a course topic gets me curious, I rebuild it here with real data and put the method next to the result, so anyone can check it.":"È il mio laboratorio. Quando un argomento di un corso mi incuriosisce, lo rifaccio qui con dati reali e metto il metodo accanto al risultato, così chiunque può controllarlo.",
"Some projects are finished and some I'm still working on. I built each one because I wanted to understand the topic better.":"Alcuni progetti sono finiti, altri ci sto ancora lavorando. Li ho costruiti tutti perché volevo capire meglio l'argomento.",
"The Lab":"Il Lab","Interactive projects":"Progetti interattivi",
"Tools on asset allocation and markets, built on public data. Each one shows how it's calculated.":"Strumenti su asset allocation e mercati, costruiti su dati pubblici. Ognuno mostra come è calcolato.",
"Live":"Online",
"All Weather, Golden Butterfly, Permanent, 60/40 and more, compared on real monthly data since 2007. Switch between dollars and euros, stress-test them through four crises, or build your own mix.":"All Weather, Golden Butterfly, Permanent, 60/40 e altri, confrontati su dati mensili reali dal 2007. Passa da dollari a euro, mettili alla prova in quattro crisi o costruisci il tuo mix.",
"Europe Dashboard":"Cruscotto Europa",
"ECB rates, euro-area inflation, the BTP-Bund spread and the yield curve, refreshed daily, with a one-line read on each.":"Tassi BCE, inflazione dell'eurozona, spread BTP-Bund e curva dei rendimenti, aggiornati ogni giorno, con una riga di lettura per ciascuno.",
"World Returns Map":"Mappa dei rendimenti",
"43 stock markets on one map, coloured by return. Year to date, 1, 3 or 5 years, in dollars or euros.":"43 borse su una mappa, colorate in base al rendimento. Da inizio anno, a 1, 3 o 5 anni, in dollari o euro.",
"What I've studied":"Cosa ho studiato",
"IÉSEG School of Management · Paris":"IÉSEG School of Management · Parigi",
"MSc Finance, Banking, Capital Markets & FinTech":"MSc Finance, Banking, Capital Markets & FinTech",
"Portfolio management.":"Gestione di portafoglio.",
"Asset allocation, mean-variance optimisation and its limits, factor investing (momentum, value, low volatility), fund performance evaluation.":"Asset allocation, ottimizzazione media-varianza e i suoi limiti, factor investing (momentum, value, bassa volatilità), valutazione della performance dei fondi.",
"Markets and instruments.":"Mercati e strumenti.",
"Fixed income, derivatives, financial markets, and a trading-desk course run on Bloomberg terminals.":"Obbligazioni, derivati, mercati finanziari e un corso di trading desk svolto sui terminali Bloomberg.",
"Risk and quantitative methods.":"Rischio e metodi quantitativi.",
"Financial econometrics (GARCH, VaR and Expected Shortfall), market risk management, machine learning for finance in Python.":"Econometria finanziaria (GARCH, VaR ed Expected Shortfall), gestione del rischio di mercato, machine learning per la finanza in Python.",
"Banking.":"Banca.",
"Corporate banking and credit analysis, plus banking and capital markets simulations.":"Corporate banking e analisi del credito, più simulazioni di banca e mercati dei capitali.",
"Sustainable finance.":"Finanza sostenibile.",
"How institutional investors measure and set climate targets for their portfolios.":"Come gli investitori istituzionali misurano e fissano obiettivi climatici per i loro portafogli.",
"Sapienza University of Rome":"Sapienza Università di Roma",
"BSc Economics and Finance":"Laurea triennale in Economia e Finanza",
"The foundations.":"Le basi.",
"Micro and macroeconomics, statistics and econometrics, corporate finance, financial markets and institutions.":"Micro e macroeconomia, statistica ed econometria, finanza aziendale, mercati e intermediari finanziari.",
"Thesis: Diversified Portfolios and Efficient Markets.":"Tesi: Portafogli Diversificati e Mercati Efficienti.",
"Theory and practice of diversification and market efficiency. This is where my interest in asset allocation started, and the Portfolio Lab picks up from there.":"Teoria e pratica della diversificazione e dell'efficienza dei mercati. Da qui è nato il mio interesse per l'asset allocation, e il Portfolio Lab riparte proprio da lì.",
"Coursework":"Progetti dei corsi","Selected projects":"Progetti scelti",
"Mostly group projects from my master's. What they asked, and what we found.":"Per lo più progetti di gruppo della magistrale. Cosa chiedevano e cosa abbiamo trovato.",
"Optimised portfolios vs simple 1/N":"Portafogli ottimizzati contro il semplice 1/N",
"Built minimum-variance, maximum-Sharpe and equal-weight portfolios from 10 ETFs across 5 asset classes, then tested them out of sample. Equal weight came out ahead, with a Sharpe of 1.24 against 0.64 for the \"optimal\" portfolio: estimation errors in the inputs hurt the optimisers. We also backtested the VaR models with Kupiec and Christoffersen tests.":"Abbiamo costruito portafogli a varianza minima, a Sharpe massimo e equipesati con 10 ETF di 5 classi di attivo, poi li abbiamo testati fuori campione. Ha vinto l'equipesato, con uno Sharpe di 1,24 contro 0,64 del portafoglio \"ottimo\": gli errori di stima negli input penalizzano gli ottimizzatori. Abbiamo anche verificato i modelli di VaR con i test di Kupiec e Christoffersen.",
"Fund performance and risk review":"Analisi di performance e rischio dei fondi",
"Five funds against their benchmarks on ten years of daily data: Sharpe, Sortino, drawdown, Jensen's alpha, tracking error, information ratio and up/down capture.":"Cinque fondi contro i loro benchmark su dieci anni di dati giornalieri: Sharpe, Sortino, drawdown, alfa di Jensen, tracking error, information ratio e up/down capture.",
"Multi-factor portfolios with dynamic allocation":"Portafogli multi-fattore con allocazione dinamica",
"Momentum, reversal and volatility factors combined with risk-based weights, with turnover control and allocations that shift with the market regime.":"Fattori momentum, reversal e volatilità combinati con pesi basati sul rischio, con controllo del turnover e allocazioni che cambiano con il regime di mercato.",
"Machine learning for multi-asset strategies":"Machine learning per strategie multi-asset",
"Logistic regression, Lasso, Ridge and random forests used as a systematic overlay on a multi-asset portfolio.":"Regressione logistica, Lasso, Ridge e random forest usati come overlay sistematico su un portafoglio multi-asset.",
"The global network of bank lending":"La rete globale dei prestiti tra banche",
"From half a million syndicated-loan records (8,000+ banks, 112 countries) we mapped who lends with whom. A logit model showed strong home bias: banks from the same country were 38% more likely to partner.":"Da mezzo milione di record di prestiti sindacati (oltre 8.000 banche, 112 paesi) abbiamo mappato chi presta insieme a chi. Un modello logit ha mostrato un forte home bias: le banche dello stesso paese avevano il 38% di probabilità in più di collaborare.",
"Risk review of a $1bn bridge loan":"Analisi del rischio di un prestito ponte da 1 miliardo di dollari",
"A Harvard case on a loan to a mining company in 2008: mapped how a drop in the gold price spreads into credit, country and reputational risk, then computed expected loss and risk-adjusted return from PD, LGD and EAD.":"Un caso di Harvard su un prestito a una società mineraria nel 2008: abbiamo mostrato come un calo del prezzo dell'oro si trasmette al rischio di credito, paese e reputazione, poi calcolato perdita attesa e rendimento corretto per il rischio da PD, LGD ed EAD.",
"Case study":"Caso di studio","Networks":"Reti",
"Want to talk markets or projects?":"Vuoi parlare di mercati o progetti?",
"Write to me by email or on LinkedIn.":"Scrivimi per email o su LinkedIn.",
"Educational projects. Nothing here is investment advice.":"Progetti didattici. Niente qui è una consulenza finanziaria.",
// Portfolio Lab
"Six well-known portfolios, tested on real monthly data from mid-2007, which means the 2008 crisis, the euro debt crisis, Covid and the 2022 rate shock are all in the sample. Switch to euros to see them through the eyes of a European investor, or build your own mix.":"Sei portafogli famosi, testati su dati mensili reali da metà 2007: nel campione ci sono la crisi del 2008, la crisi del debito europeo, il Covid e lo shock dei tassi del 2022. Passa agli euro per vederli con gli occhi di un investitore europeo, o costruisci il tuo mix.",
"Growth of 10,000":"Crescita di 10.000","Log scale, so equal slopes mean equal % returns.":"Scala logaritmica: pendenze uguali significano rendimenti % uguali.",
"Build your own":"Costruisci il tuo","Shown as “Your mix”. Weights are rescaled to 100%.":"Appare come “Il tuo mix”. I pesi vengono riportati al 100%.",
"Drawdowns":"Drawdown","How far each portfolio sat below its previous peak.":"Quanto ogni portafoglio è sceso sotto il suo massimo precedente.",
"Statistics":"Statistiche","Click a column to sort. Best value in each column highlighted.":"Clicca una colonna per ordinare. Il valore migliore di ogni colonna è evidenziato.",
"Crisis test":"Test sulle crisi","Total return through each stress period (independent of the start year).":"Rendimento totale in ogni periodo di crisi (indipendente dall'anno di partenza).",
"Calendar-year returns":"Rendimenti anno per anno","Partial years marked with *.":"Gli anni parziali sono segnati con *.",
"The portfolios":"I portafogli","What's inside":"Cosa contengono","Method":"Metodo","How it's calculated":"Come è calcolato",
"Data.":"Dati.","Rebalancing.":"Ribilanciamento.","Euros.":"Euro.","Risk metrics.":"Misure di rischio.","Limits.":"Limiti.",
"Monthly total returns (dividends reinvested) of US-listed ETFs from Yahoo Finance, used as proxies for each asset class: SPY, VTI, IJS, VEU, TLT, IEF, BND, SHY, BIL, GLD, DBC. The sample starts in June 2007 because that is when every ETF has a full monthly history.":"Rendimenti totali mensili (dividendi reinvestiti) di ETF quotati negli USA, da Yahoo Finance, usati come approssimazione di ogni classe di attivo: SPY, VTI, IJS, VEU, TLT, IEF, BND, SHY, BIL, GLD, DBC. Il campione parte da giugno 2007 perché da lì tutti gli ETF hanno una storia mensile completa.",
"Back to target weights at the end of every December. Between rebalances, weights drift with the market.":"I pesi tornano a quelli obiettivo alla fine di ogni dicembre. Tra un ribilanciamento e l'altro si muovono con il mercato.",
"In EUR mode each monthly return is converted at the EUR/USD rate, so currency moves are included. Unhedged, as a European buying these ETFs would actually experience them.":"In euro ogni rendimento mensile viene convertito al cambio EUR/USD, quindi i movimenti della valuta sono inclusi. Senza copertura, come li vivrebbe un europeo che compra questi ETF.",
"Volatility and Sharpe are annualised from monthly returns. In USD the risk-free rate is the T-bill ETF (BIL). In EUR it is set to zero, which slightly flatters every portfolio by the same amount. Max drawdown is measured on month-end values, so intra-month lows are deeper.":"Volatilità e Sharpe sono annualizzati dai rendimenti mensili. In dollari il tasso privo di rischio è l'ETF sui T-bill (BIL). In euro è posto a zero, il che migliora leggermente tutti i portafogli della stessa misura. Il drawdown massimo è misurato sui valori di fine mese, quindi i minimi durante il mese sono più profondi.",
"No fees, taxes or trading costs. ETF proxies are simplified versions of the original portfolios (the All Weather here is the widely published retail version, not Bridgewater's fund). About 19 years is one market history, not a forecast.":"Niente commissioni, tasse o costi di negoziazione. Gli ETF sono versioni semplificate dei portafogli originali (l'All Weather qui è la versione retail più diffusa, non il fondo di Bridgewater). Circa 19 anni sono una sola storia di mercato, non una previsione.",
"Educational project. Past performance does not predict future returns. Not investment advice.":"Progetto didattico. I rendimenti passati non predicono quelli futuri. Non è una consulenza finanziaria.",
"Portfolio":"Portafoglio","CAGR":"CAGR","Volatility":"Volatilità","Sharpe":"Sharpe","Sortino":"Sortino","Max drawdown":"Drawdown max","Longest underwater":"Più lungo sott'acqua","Calmar":"Calmar","Best year":"Anno migliore","Worst year":"Anno peggiore","Corr. to stocks":"Corr. con azioni","Final value":"Valore finale",
"Financial crisis":"Crisi finanziaria","Euro debt crisis":"Crisi del debito euro","Covid crash":"Crollo Covid","2022 rate shock":"Shock dei tassi 2022",
"100% Stocks":"100% Azioni","Classic 60/40":"60/40 classico","Your mix":"Il tuo mix","Benchmark":"Riferimento","Industry standard":"Standard di settore","You":"Tu",
"All in the S&P 500. The reference point: maximum growth, maximum pain.":"Tutto sull'S&P 500. Il punto di riferimento: massima crescita, massimo dolore.",
"60% stocks, 40% intermediate Treasuries. The default balanced portfolio.":"60% azioni, 40% Treasury a medio termine. Il portafoglio bilanciato per eccellenza.",
"US total market, international stocks and aggregate bonds. Cheap and global.":"Tutto il mercato USA, azioni internazionali e obbligazioni aggregate. Economico e globale.",
"Balances risk across growth and inflation regimes. Heavy in long bonds.":"Bilancia il rischio tra scenari di crescita e di inflazione. Molto pesato sulle obbligazioni lunghe.",
"Four equal parts for prosperity, deflation, inflation and recession.":"Quattro parti uguali per prosperità, deflazione, inflazione e recessione.",
"Permanent Portfolio with a tilt to small-cap value for more growth.":"Il Permanent Portfolio con un'inclinazione verso le small cap value, per più crescita.",
"US stocks (S&P 500)":"Azioni USA (S&P 500)","US total market":"Mercato USA totale","US small-cap value":"Small cap value USA","International stocks":"Azioni internazionali","Long-term Treasuries":"Treasury a lungo termine","Intermediate Treasuries":"Treasury a medio termine","US aggregate bonds":"Obbligazioni USA aggregate","Short-term Treasuries":"Treasury a breve termine","T-bills (cash)":"T-bill (liquidità)","Gold":"Oro","Commodities":"Materie prime",
// Europe
"Where euro-area rates, inflation and government bond yields stand today, and how we got here. Official data from the ECB and Eurostat, with a one-line read on each number.":"A che punto sono oggi tassi, inflazione e rendimenti dei titoli di Stato nell'eurozona, e come ci siamo arrivati. Dati ufficiali BCE ed Eurostat, con una riga di lettura per ogni numero.",
"Policy rate vs inflation":"Tasso BCE contro inflazione",
"When the deposit rate sits above inflation, money is “tight”: holding cash earns a real return.":"Quando il tasso sui depositi è sopra l'inflazione la politica è “restrittiva”: tenere liquidità rende in termini reali.",
"Euro-area yield curve":"Curva dei rendimenti dell'eurozona",
"AAA-rated government bonds, by maturity. Today vs one month and one year ago.":"Titoli di Stato con rating AAA, per scadenza. Oggi, un mese fa e un anno fa.",
"10-year spreads vs Germany":"Spread a 10 anni sulla Germania",
"Extra yield each country pays over the Bund, in basis points (monthly, since 2019).":"Il rendimento in più che ogni paese paga rispetto al Bund, in punti base (mensile, dal 2019).",
"Country snapshot":"Paese per paese","Latest month available for each country.":"Ultimo mese disponibile per ogni paese.",
"Sources and notes":"Fonti e note","Sources.":"Fonti.","Frequency.":"Frequenza.","The reads.":"Le letture.",
"ECB Data Portal for the deposit facility rate, EUR/USD, unemployment, the AAA yield curve and the 10-year convergence yields by country. Eurostat for HICP inflation (the ECOICOP 2 dataset that replaced the old series in January 2026). All free, public and unmodified.":"ECB Data Portal per il tasso sui depositi, EUR/USD, disoccupazione, la curva AAA e i rendimenti decennali di convergenza per paese. Eurostat per l'inflazione HICP (il dataset ECOICOP 2 che ha sostituito la vecchia serie a gennaio 2026). Tutti gratuiti, pubblici e non modificati.",
"Daily series are shown weekly to keep the page light. Country yields are monthly averages, so the spread is a monthly figure, not today's close.":"Le serie giornaliere sono mostrate settimanali per alleggerire la pagina. I rendimenti per paese sono medie mensili, quindi lo spread è un dato mensile, non la chiusura di oggi.",
"The one-liners under each number are written by simple rules (above or below target, rising or falling over a year), not by hand. They describe the data, they don't forecast it.":"Le righe sotto ogni numero sono scritte da regole semplici (sopra o sotto l'obiettivo, in salita o in discesa su un anno), non a mano. Descrivono i dati, non li prevedono.",
"Educational project. Not investment advice.":"Progetto didattico. Non è una consulenza finanziaria.",
"Deposit rate":"Tasso sui depositi","Inflation":"Inflazione","Core inflation":"Inflazione di fondo","Today":"Oggi","1 month ago":"1 mese fa","1 year ago":"1 anno fa",
"ECB deposit rate":"Tasso BCE sui depositi","Inflation (HICP)":"Inflazione (HICP)","BTP–Bund spread":"Spread BTP–Bund","German 10-year yield":"Bund a 10 anni","EUR / USD":"EUR / USD",
"Country":"Paese","10Y yield":"Rendimento 10A","Spread vs DE":"Spread su DE","Real 10Y yield":"Rendimento reale 10A",
"Germany":"Germania","Italy":"Italia","France":"Francia","Spain":"Spagna","Greece":"Grecia","Netherlands":"Paesi Bassi","Portugal":"Portogallo",
// World
"How 43 stock markets have done, country by country. Switch the period, and switch to euros to see what a European investor actually earned once the currency is counted.":"Come sono andate 43 borse, paese per paese. Cambia il periodo e passa agli euro per vedere quanto ha guadagnato davvero un investitore europeo, contando il cambio.",
"YTD":"Da inizio anno","1 year":"1 anno","3y / yr":"3a / anno","5y / yr":"5a / anno",
"Best performers":"I migliori","Worst performers":"I peggiori","Periods.":"Periodi.",
"Each country is measured through its main US-listed country ETF (mostly iShares MSCI funds, SPY for the United States), with dividends reinvested. Prices from Yahoo Finance.":"Ogni paese è misurato con il suo principale ETF quotato negli USA (per lo più fondi iShares MSCI, SPY per gli Stati Uniti), con dividendi reinvestiti. Prezzi da Yahoo Finance.",
"YTD and 1 year are total returns. 3 and 5 years are annualised, so they compare with each other on a per-year basis.":"Da inizio anno e 1 anno sono rendimenti totali. 3 e 5 anni sono annualizzati, così si confrontano su base annua.",
"EUR returns convert the dollar result at the EUR/USD rate. The ETFs already carry each local currency's move against the dollar, so the euro view is what an unhedged European investor would have seen.":"I rendimenti in euro convertono il risultato in dollari al cambio EUR/USD. Gli ETF includono già il movimento di ogni valuta locale contro il dollaro, quindi la vista in euro è quella di un investitore europeo senza copertura.",
"An ETF is a proxy, not the national index itself: fees, sampling and sector weights differ. Grey countries have no liquid country ETF in the sample. Map shapes: Natural Earth via world-atlas.":"Un ETF è un'approssimazione, non l'indice nazionale: commissioni, campionamento e pesi settoriali sono diversi. I paesi in grigio non hanno un ETF liquido nel campione. Forme della mappa: Natural Earth tramite world-atlas.",
"Educational project. Past returns are not a forecast. Not investment advice.":"Progetto didattico. I rendimenti passati non sono una previsione. Non è una consulenza finanziaria.",
"United States":"Stati Uniti","Canada":"Canada","Mexico":"Messico","Brazil":"Brasile","Argentina":"Argentina","Chile":"Cile","Peru":"Perù","Colombia":"Colombia","United Kingdom":"Regno Unito","Switzerland":"Svizzera","Belgium":"Belgio","Austria":"Austria","Sweden":"Svezia","Norway":"Norvegia","Denmark":"Danimarca","Finland":"Finlandia","Ireland":"Irlanda","Poland":"Polonia","Turkey":"Turchia","Israel":"Israele","Saudi Arabia":"Arabia Saudita","United Arab Emirates":"Emirati Arabi Uniti","Qatar":"Qatar","South Africa":"Sudafrica","India":"India","China":"Cina","Japan":"Giappone","South Korea":"Corea del Sud","Taiwan":"Taiwan","Australia":"Australia","New Zealand":"Nuova Zelanda","Indonesia":"Indonesia","Malaysia":"Malesia","Thailand":"Thailandia","Philippines":"Filippine","Vietnam":"Vietnam","Singapore":"Singapore","Hong Kong":"Hong Kong",
"Best market":"Borsa migliore","Median country":"Paese mediano","United States vs Italy":"Stati Uniti contro Italia","Total return":"Rendimento totale","Annualised":"Annualizzato",
  };
  let lang = localStorage.getItem('lang') === 'it' ? 'it' : 'en';
  const EN = new WeakMap();
  function apply(root = document.body) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode());) {
      if (n.parentElement && /^(SCRIPT|STYLE)$/.test(n.parentElement.tagName)) continue;
      const raw = n.nodeValue, key = raw.replace(/\s+/g, ' ').trim();
      if (!key) continue;
      if (!EN.has(n)) { if (!(key in IT)) continue; EN.set(n, raw); }
      const en = EN.get(n), enKey = en.replace(/\s+/g, ' ').trim();
      const want = lang === 'it' ? en.replace(enKey, IT[enKey]) : en;
      if (n.nodeValue !== want) n.nodeValue = want;
    }
  }
  const L = (en, it) => lang === 'it' ? it : en;
  function set(l) { lang = l; localStorage.setItem('lang', l); document.documentElement.lang = l; apply(); sync(); dispatchEvent(new Event('langchange')); }
  function sync() { const b = document.getElementById('lang'); if (b) { b.textContent = lang === 'it' ? 'EN' : 'IT'; b.title = lang === 'it' ? 'English' : 'Italiano'; } }
  addEventListener('DOMContentLoaded', () => {
    document.documentElement.lang = lang;
    const right = document.querySelector('.nav-right');
    if (right && !document.getElementById('lang')) { const b = document.createElement('button'); b.id = 'lang'; b.className = 'theme lang'; right.prepend(b); b.onclick = () => set(lang === 'it' ? 'en' : 'it'); }
    sync(); apply();
    new MutationObserver(ms => { if (lang === 'it') ms.forEach(m => m.addedNodes.forEach(n => n.nodeType === 1 ? apply(n) : n.nodeType === 3 && n.parentElement && apply(n.parentElement))); })
      .observe(document.body, { childList: true, subtree: true });
  });
  return { L, apply, get lang() { return lang; } };
})();
