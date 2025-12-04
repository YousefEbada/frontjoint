"use client";

import { useEffect } from "react";
import { scrollToHash } from "@/lib/utils/smoothScroll";

export default function SmoothScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // only handle left clicks
      if (e.button !== 0) return;

      const target = (e.target as HTMLElement)?.closest?.("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // internal hash anchors: '#id' or '/#id' or full-url-to-same-origin/#id
      try {
        const url = new URL(href, window.location.href);

        if (url.hash && url.origin === window.location.origin) {
          // it's an in-page anchor
          e.preventDefault();
          scrollToHash(url.hash, 700, 86);
        }
      } catch (err) {
        // malformed URL -> ignore
      }
    };

    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash) scrollToHash(hash, 700, 86);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);

    // if page loaded with a hash, animate into place
    if (window.location.hash) {
      // small timeout to allow layout to settle
      setTimeout(() => scrollToHash(window.location.hash, 700, 86), 50);
    }

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
