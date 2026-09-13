import { useEffect, useRef } from "react";

const COMMON = [
  "/legacy/js/navigation.js",
  "/legacy/js/data.js",
  "/legacy/js/storage.js",
  "/legacy/js/validation.js",
  "/legacy/js/session.js"
];

function loadScript(src) {
  if (window.__legacyScriptPromises?.[src]) return window.__legacyScriptPromises[src];
  window.__legacyScriptPromises = window.__legacyScriptPromises || {};
  window.__legacyScriptPromises[src] = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-legacy-src="${src}"]`);
    if (existing) { resolve(); return; }
    const script = document.createElement("script");
    script.src = src; script.async = false; script.dataset.legacySrc = src;
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.body.appendChild(script);
  });
  return window.__legacyScriptPromises[src];
}

export default function LegacyScript({ src }) {
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    (async () => {
      try {
        for (const dependency of COMMON) await loadScript(dependency);
        await loadScript(src);
        document.dispatchEvent(new Event("DOMContentLoaded"));
        window.dispatchEvent(new Event("load"));
      } catch (error) {
        console.error("Unable to load legacy script:", src, error);
      }
    })();
  }, [src]);
  return null;
}
