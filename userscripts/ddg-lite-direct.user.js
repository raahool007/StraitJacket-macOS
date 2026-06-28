// ==UserScript==
// @name         DuckDuckGo Lite: open results directly
// @namespace    https://github.com/raahool007/StraitJacket-macOS
// @version      1.0.0
// @description  Rewrite DDG Lite result links so clicks go straight to the destination URL instead of through https://duckduckgo.com/l/?uddg=... (the click-tracking redirector, which the StraitJacket Firefox WebsiteFilter policy blocks).
// @match        https://lite.duckduckgo.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    for (const a of document.querySelectorAll('a[href]')) {
        let url;
        try { url = new URL(a.href); } catch { continue; }

        const isRedirector =
            (url.hostname === 'duckduckgo.com' || url.hostname === 'www.duckduckgo.com')
            && url.pathname === '/l/';
        if (!isRedirector) continue;

        const dest = url.searchParams.get('uddg');
        if (!dest) continue;

        a.href = dest;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
    }
})();
