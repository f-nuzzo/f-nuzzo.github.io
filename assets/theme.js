// Theme: light by default, dark on toggle, remembered between visits.
(() => {
  const root = document.documentElement;
  if (localStorage.getItem('theme') === 'dark') root.dataset.theme = 'dark';
  addEventListener('DOMContentLoaded', () => {
    const b = document.getElementById('theme');
    if (!b) return;
    const sync = () => { const d = root.dataset.theme === 'dark'; b.textContent = d ? '☀' : '☾'; b.title = d ? 'Light mode' : 'Dark mode'; };
    sync();
    b.onclick = () => {
      const d = root.dataset.theme !== 'dark';
      d ? root.dataset.theme = 'dark' : delete root.dataset.theme;
      localStorage.setItem('theme', d ? 'dark' : 'light'); sync();
    };
  });
})();
