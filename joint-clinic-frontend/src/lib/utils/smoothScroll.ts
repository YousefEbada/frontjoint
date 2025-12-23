// Custom smooth scroll helper with configurable duration and offset
export function smoothScrollTo(target: Element | string | null, duration = 700, offset = 86) {
  if (!target) return Promise.resolve();

  const element = typeof target === "string" ? document.querySelector(target) : target;
  if (!element) return Promise.resolve();

  const startY = window.scrollY || window.pageYOffset;
  const rect = element.getBoundingClientRect();
  const targetY = startY + rect.top - offset;
  const distance = targetY - startY;
  const startTime = performance.now();

  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  return new Promise<void>((resolve) => {
    function step(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const progress = easeInOutCubic(t);
      window.scrollTo(0, Math.round(startY + distance * progress));

      if (elapsed < duration) requestAnimationFrame(step);
      else resolve();
    }

    requestAnimationFrame(step);
  });
}

export function scrollToHash(hash: string, duration = 700, offset = 86) {
  if (!hash) return Promise.resolve();
  const cleaned = hash.startsWith("#") ? hash : `#${hash}`;
  const el = document.querySelector(cleaned);
  if (!el) return Promise.resolve();
  // update url without jumping
  history.pushState(null, "", cleaned);
  return smoothScrollTo(el, duration, offset);
}
