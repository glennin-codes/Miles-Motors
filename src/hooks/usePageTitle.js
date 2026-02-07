import { useEffect } from "react";

const BASE_TITLE = "Miles Motors | New & Used Cars Nairobi, Kenya";

/**
 * Sets document title for the page. Resets to base title on unmount.
 * @param {string} [pageTitle] - Optional page-specific title (e.g. "Cars", "About"). Full title becomes "{pageTitle} – {BASE_TITLE}".
 * @param {string} [fullTitle] - If set, used as the full title instead of combining pageTitle with BASE_TITLE.
 */
export function usePageTitle(pageTitle, fullTitle) {
  useEffect(() => {
    const prev = document.title;
    document.title = fullTitle != null ? fullTitle : (pageTitle ? `${pageTitle} – ${BASE_TITLE}` : BASE_TITLE);
    return () => {
      document.title = prev;
    };
  }, [pageTitle, fullTitle]);
}
