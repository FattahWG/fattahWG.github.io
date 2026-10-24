// Runs before paint: set the theme (saved choice, else the system setting) and mark that JavaScript runs.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) root.classList.add('dark');
  } catch (e) { /* storage blocked: follow the system setting */
    if (matchMedia('(prefers-color-scheme: dark)').matches) root.classList.add('dark');
  }
})();
