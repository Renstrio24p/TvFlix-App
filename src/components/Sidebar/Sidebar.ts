import { useTSComponent } from "../../utils/hooks/useTSComponent";
import { useTSElements } from "../../utils/hooks/useTSElements";
import SidebarFooter from "./side-footer/Footer";

export const genreList: string[] = [];

export default function Sidebar(DOM: HTMLElement) {
  const ui = useTSElements(
    DOM,
    /*html*/ `
        <div class="sidebar lg:sticky" sidebar>
            <div class="sidebar-inner"></div>
            <div id='sidebar-footer'></div>
        </div>
    `
  );

  useTSComponent("sidebar-footer", DOM, SidebarFooter);

  return ui;
}
