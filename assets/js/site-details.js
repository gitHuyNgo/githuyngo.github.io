(() => {
  // Show recent activity first while keeping the complete year scrollable.
  const calendar = document.querySelector('.github-calendar');
  if (calendar) {
    const image = calendar.querySelector('img');
    const showRecent = () => { calendar.scrollLeft = calendar.scrollWidth; };
    const hideCalendar = () => {
      calendar.hidden = true;
      calendar.nextElementSibling.hidden = true;
      // The caption remains a usable link to the full GitHub profile.
    };
    if (image.complete) {
      if (image.naturalWidth) showRecent();
      else hideCalendar();
    } else {
      image.addEventListener('load', showRecent, { once: true });
      image.addEventListener('error', hideCalendar, { once: true });
    }
  }

  const footer = document.querySelector('.site-updated');
  if (!footer || !footer.dataset.repository) return;

  // GitHub Pages supplies the deployed revision; local previews use remote HEAD.
  const repository = footer.dataset.repository;
  const revision = footer.dataset.commitRef || 'HEAD';
  const endpoint = `https://api.github.com/repos/${repository.split('/').map(encodeURIComponent).join('/')}/commits/${encodeURIComponent(revision)}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  fetch(endpoint, { signal: controller.signal })
    .then(response => {
      if (!response.ok) throw new Error('Commit date unavailable');
      return response.json();
    })
    .then(data => {
      const timestamp = data.commit?.committer?.date;
      const date = new Date(timestamp);
      if (!timestamp || Number.isNaN(date.getTime())) return;

      const time = document.createElement('time');
      time.dateTime = timestamp;
      time.textContent = new Intl.DateTimeFormat('en', {
        month: 'long', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh'
      }).format(date);
      footer.querySelector('.last-updated-link').replaceChildren(time);
    })
    .catch(() => {
      // Keep the commit-history link instead of guessing a last-updated date.
    })
    .finally(() => clearTimeout(timeout));
})();
