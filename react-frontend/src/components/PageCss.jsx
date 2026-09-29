import { useEffect } from "react";

export default function PageCss({ href, hrefs }) {
  const files = hrefs || (href ? [href] : []);
  useEffect(() => {
    files.forEach((file) => {
      if (document.querySelector(`link[data-page-css="${file}"]`)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = file;
      link.dataset.pageCss = file;
      document.head.appendChild(link);
    });
  }, [JSON.stringify(files)]);
  return null;
}
