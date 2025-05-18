import { useTSCSP } from "./utils/hooks/useTSCSP";
import { Router } from "./components/Router/router";
import { useTSComponent } from "./utils/hooks/useTSComponent";
import { useTSElements } from "./utils/hooks/useTSElements";
import Navbar from "./components/Navbar/Navbar";
import { useTSAddBg } from "./utils/hooks/useTSAddBg";
import { config } from "./config/Start.config";
import Sidebar from "./components/Sidebar/Sidebar";
import { searchFunction } from "./components/func/Global";
import { searchModal } from "./components/SearchModal/SearchModal";
import { sidebarfetch } from "./components/func/sidebar";

// Interface for sanitized parameters
interface SanitizedParams {
  [key: string]: string;
}

export default function Start(
  DOM: HTMLElement | null,
  params: SanitizedParams
) {
  if (!DOM) return null;

  // Apply Content Security Policy (CSP)
  useTSCSP(
    `'self' https://www.youtube.com https://api.themoviedb.org https://googleads.g.doubleclick.net`,
    `'self' 'nonce-rAnd0m123'`,
    `'none'`,
    `'self' https://fonts.googleapis.com https://fonts.gstatic.com`,
    `'self' https://blogger.googleusercontent.com https://image.tmdb.org https://googleads.g.doubleclick.net','https://image.tmdb.org'`,
    [
      `'self'`,
      `https://fonts.googleapis.com`,
      `https://fonts.gstatic.com`,
      `https://www.google.com/maps/`,
      `https://www.youtube.com/embed/`,
      `https://github.com`,
      `https://googleads.g.doubleclick.net`,
      `https://api.themoviedb.org`,
    ],
    `'self' https://www.youtube.com/embed/`,
    ``,
    "/csp-report",
    false
  );

  const websiteName = "Tvflix Movies App";

  const ui = useTSElements(
    DOM,
    /*html*/ `
    <div class='font-dmsans relative'>
      <header class='sticky top-0 z-[999] w-full bg-bg'>
        <nav id="navbar"></nav>
      </header>
      <div class='flex'>
         <aside id='sidebar'></aside>
         <div class="overlay" overlay menu-toggler></div>
         <article class='w-full' id="router"></article>
      </div>
      <main id='search-modal'></main>
      <footer class='px-[20px] md:px-[80px]' id="footer"></footer>
    </div>
    `,
    config
  );

  useTSComponent("navbar", DOM, Navbar);
  useTSComponent("sidebar", DOM, Sidebar);
  useTSComponent("router", DOM, Router, websiteName, params);
  useTSComponent("search-modal", DOM, searchModal);

  // Set background and text styles
  useTSAddBg(
    "body",
    { color: "hsla(220,17%,7%,1)" },
    {
      textColor: "hsla(220,100%,95%,1)",
      textSize: "14px",
      lineHeight: "1.5",
      fontFamily: "DM Sans",
    }
  );

  // Handle Toggle Menu to Sidebar
  searchFunction();
  sidebarfetch();

  return ui;
}
