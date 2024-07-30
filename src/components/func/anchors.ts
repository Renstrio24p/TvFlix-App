import { useAnchor } from "../../utils/hooks/useTSAnchor";

export const runAnchor = (anchors: NodeListOf<HTMLAnchorElement>) => {
  anchors.forEach(anchor => useAnchor(anchor, anchor.href));
};
