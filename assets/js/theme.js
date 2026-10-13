(() => {
  const root = document.documentElement;
  const storageKey = 'homepage-theme';
  const normalize = value => value === 'dark' ? 'dark' : 'light';
  let resetIcons = () => {};

  // Run before styles load so a saved dark theme does not flash white.
  try {
    root.dataset.theme = normalize(localStorage.getItem(storageKey));
  } catch {
    root.dataset.theme = 'light';
  }

  const updateControls = () => {
    const dark = root.dataset.theme === 'dark';
    const button = document.querySelector('.theme-toggle');
    if (button) {
      const label = `Switch to ${dark ? 'light' : 'dark'} mode`;
      button.setAttribute('aria-label', label);
      button.title = label;
      button.querySelector('[data-theme-label]').textContent = dark ? 'Light mode' : 'Dark mode';
    }
    const favicon = document.querySelector('[data-favicon-light]');
    if (favicon) favicon.href = dark ? favicon.dataset.faviconDark : favicon.dataset.faviconLight;
  };

  const applyTheme = (theme, persist = false) => {
    root.dataset.theme = normalize(theme);
    if (persist) {
      try {
        localStorage.setItem(storageKey, root.dataset.theme);
      } catch {
        // Theme switching still works when browser storage is unavailable.
      }
    }
    updateControls();
  };

  document.addEventListener('DOMContentLoaded', () => {
    const control = document.querySelector('.theme-control');
    const button = document.querySelector('.theme-toggle');
    if (!control || !button) return;
    control.hidden = false;
    updateControls();
    const sun = control.querySelector('.theme-sun');
    const moon = control.querySelector('.theme-moon');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let progress = root.dataset.theme === 'dark' ? 1 : 0;
    let frame;
    const paintIcons = value => {
      const angle = value * Math.PI / 2;
      moon.style.transform = `translate(${22 + 26 * Math.sin(angle)}px, ${22 + 26 * (1 - Math.cos(angle))}px) rotate(${value * 60}deg)`;
      sun.style.transform = `translate(${22 - 26 * Math.cos(angle)}px, ${22 + 26 * (1 - Math.sin(angle))}px) rotate(${(value - 1) * 60}deg)`;
    };
    resetIcons = () => {
      cancelAnimationFrame(frame);
      progress = root.dataset.theme === 'dark' ? 1 : 0;
      paintIcons(progress);
    };
    const animateIcons = target => {
      cancelAnimationFrame(frame);
      if (reducedMotion.matches || document.hidden || Math.abs(target - progress) < 0.001) {
        resetIcons();
        return;
      }
      // Reverse smoothly from the currently painted position on another click.
      const from = progress;
      const duration = Math.max(200, 800 * Math.abs(target - from));
      const started = performance.now();
      const animate = now => {
        const t = Math.min(1, (now - started) / duration);
        const eased = t * t * (3 - 2 * t);
        progress = from + (target - from) * eased;
        paintIcons(progress);
        if (t < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    };
    paintIcons(progress);
    button.addEventListener('click', () => {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
      animateIcons(root.dataset.theme === 'dark' ? 1 : 0);
    });
    reducedMotion.addEventListener('change', event => { if (event.matches) resetIcons(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) resetIcons(); });
  });

  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) {
      applyTheme(event.newValue);
      resetIcons();
    }
  });
})();
