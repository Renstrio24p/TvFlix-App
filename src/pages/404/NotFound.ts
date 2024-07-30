import { useTSMetaData } from "../../utils/hooks/useTSMetaData";
import { useTSElements } from "../../utils/hooks/useTSElements";
import "./tailwind.css";

export default function NotFound(
  DOM: HTMLElement,
  websiteName: string
): string {
  // SEO Hook
  useTSMetaData({
    name: "NotFound",
    description: "Not Found Page",
    author: "Waren Gador",
  });

  document.title = `${websiteName} - 404`;

  const ui = useTSElements(
    DOM,
    /*html*/ `
    <div class='w-full h-full grid place-items-center'>
      <div class='text-center px-3'>
        <h1 class='text-[5em] md:text-[10em] animate-[fadeIn_.7s_ease]'>404</h1>
        <h2 class='animate-[fadeInUp_.7s_ease]'>oops! nothing was found</h2>
        <p class='text-[12px] md:text-[14px] animate-[fadeInUp_.7s_ease]'>
            The page you were looking for might have been removed, had its name changed, or is temporarily unavailable. 
            <a id='return' class='text-yellow-800 underline return' href="/"><span class='underline'>Return to Homepage</span></a>
        </p>
      </div>
    </div>
    `
  ) as string;

  return ui;
}
