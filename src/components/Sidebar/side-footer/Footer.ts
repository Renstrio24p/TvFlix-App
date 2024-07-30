import { useTSElements } from "../../../utils/hooks/useTSElements";
import { configSidebarFooter } from "./config/sidebarfooter.config";

export const config = {
  ALLOWED_ATTR: [
    "src",
    "width",
    "height",
    "loading",
    "referrerpolicy",
    "class",
    "id",
    "href",
  ],
  ALLOW_UNSAFE_SCRIPT: false,
};

export default function SidebarFooter(DOM: HTMLElement) {
  const ui = useTSElements(
    DOM,
    /*html*/ `
            <div class='sidebar-footer'>
                <p class="copyright">
                    Copyright 2024 <a target="_blank" rel="noopener noreferrer" href='https://www.facebook.com/renstrio' class="link" aria-label='copyright-owner'>Waren Gador</a>
                </p>
                <img src="/tmdb-logo.webp" alt="tmdb logo" width='130' height='17'>
            </div>
        `,
    configSidebarFooter
  );

  return ui;
}
