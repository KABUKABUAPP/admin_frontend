import { useEffect, useRef } from "react";
import { assertIsNode } from "../utils";

const useClickOutside = <T extends HTMLElement,>(callback: () => any) => {
  const domNode = useRef<T  | null>(null);

  const handleClickOutside = ({ target }: MouseEvent) => {
    assertIsNode(target);
    if (domNode.current && !domNode.current.contains(target)) callback();
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      handleClickOutside(e);
    });

    document.removeEventListener("mousedown", (e) => handleClickOutside(e));
  }, []);

  return domNode
};

export default useClickOutside;
