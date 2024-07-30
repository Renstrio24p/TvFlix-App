import { useTSElements } from "../../../utils/hooks/useTSElements";

export default function MoviesList(DOM: HTMLElement) {
  const ui = useTSElements(
    DOM,
    /*html*/ `
      <div>
        
      </div>
    `
  );

  return ui;
}
