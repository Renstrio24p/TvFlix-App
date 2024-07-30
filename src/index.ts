// Import styles and fonts
import "./index.css";
import "animate.css";
import "typeface-spartan";
import "typeface-poppins";
import "typeface-dm-sans";
import "boxicons/css/boxicons.min.css";
import "remixicon/fonts/remixicon.css";

// Import hooks and components
import { useInitialDOM } from "./utils/hooks/useIntialDOM";
import Start from "./Start";
import {
  // useTSCheckInvalidParams,
  useTSURLState,
} from "./utils/hooks/useTSURLState";

const APP_CONTAINER_ID = "app";

// Function to initialize the app
const initializeApp = (): void => {
  // useTSCheckInvalidParams();
  const DOM = document.getElementById(APP_CONTAINER_ID);
  if (!DOM) return;

  const sanitizedParams = useTSURLState();
  useInitialDOM(APP_CONTAINER_ID, () => Start(DOM, sanitizedParams));
};

// Render the app once the DOM content is fully loaded
const setupRendering = (): void => {
  if (typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", initializeApp);
  }
};

// Start the setup process
setupRendering();

export default initializeApp;
