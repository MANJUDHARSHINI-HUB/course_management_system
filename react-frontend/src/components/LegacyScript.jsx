import { useEffect, useRef } from "react";

const COMMON = [
  "/legacy/js/navigation.js",
  "/legacy/js/data.js",
  "/legacy/js/storage.js",
  "/legacy/js/validation.js",
  "/legacy/js/session.js"
];

/*
 * React changes pages without reloading the browser document. The original
 * JavaScript files were written around DOMContentLoaded, so firing the real
 * DOMContentLoaded event on every route caused old page scripts to run again
 * and again (duplicate timers/listeners = dashboard glitches).
 *
 * We capture each legacy script's DOMContentLoaded handler and invoke only the
 * handler belonging to the page that has just mounted. Common scripts are
 * initialized once. This keeps the original JavaScript logic while making it
 * safe for React Router navigation.
 */
function loadScript(src) {
  window.__legacyScriptPromises = window.__legacyScriptPromises || {};
  window.__legacyHandlers = window.__legacyHandlers || {};
  window.__legacyReadyRan = window.__legacyReadyRan || {};

  if (window.__legacyScriptPromises[src]) return window.__legacyScriptPromises[src];

  window.__legacyScriptPromises[src] = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-legacy-src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const originalDocumentAdd = document.addEventListener.bind(document);
    let capturedHandler = null;

    document.addEventListener = function (type, listener, options) {
      if (type === "DOMContentLoaded" && !capturedHandler) {
        capturedHandler = listener;
      }
      return originalDocumentAdd(type, listener, options);
    };

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.legacySrc = src;

    script.onload = () => {
      document.addEventListener = originalDocumentAdd;
      if (capturedHandler) {
        window.__legacyHandlers[src] = capturedHandler;
      }
      resolve();
    };

    script.onerror = (error) => {
      document.addEventListener = originalDocumentAdd;
      reject(error);
    };

    document.body.appendChild(script);
  });

  return window.__legacyScriptPromises[src];
}

function runLegacyReady(src) {
  const handler = window.__legacyHandlers?.[src];
  if (typeof handler !== "function") return;

  try {
    handler(new Event("DOMContentLoaded"));
  } catch (error) {
    console.error("Legacy page initialization failed:", src, error);
  }
}

export default function LegacyScript({ src }) {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    (async () => {
      try {
        for (const dependency of COMMON) {
          await loadScript(dependency);
          if (!window.__legacyReadyRan[dependency]) {
            runLegacyReady(dependency);
            window.__legacyReadyRan[dependency] = true;
          }
        }

        await loadScript(src);
        runLegacyReady(src);
      } catch (error) {
        console.error("Unable to load legacy script:", src, error);
      }
    })();
  }, [src]);

  return null;
}
