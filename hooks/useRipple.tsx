import React, { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
/**
 * This hook accepts a ref to any element and adds a click event handler that creates ripples when click
 */
const useRipple = <T extends HTMLElement>(ref: React.RefObject<T>, btnVariant: "contained" | "outlined" | "text") => {
  //ripples are just styles that we attach to span elements
  const [ripples, setRipples] = useState<React.CSSProperties[]>([]);
  useEffect(() => {
    //check if there's a ref
    if (ref.current) {
      const elem = ref.current;
      //add a click handler for the ripple
      const clickHandler = (e: MouseEvent) => {
        //calculate the position and dimensions of the ripple.
        //based on click position and button dimensions
        var rect = elem.getBoundingClientRect();
        var left = e.clientX - rect.left;
        var top = e.clientY - rect.top;
        const height = elem.clientHeight;
        const width = elem.clientWidth;
        const diameter = Math.max(width, height);
        setRipples([
          ...ripples,
          {
            top: top - diameter / 2,
            left: left - diameter / 2,
            height: Math.max(width, height),
            width: Math.max(width, height),
          },
        ]);
      };
      //add an event listener to the button
      elem.addEventListener("click", clickHandler);
      //clean up when the component is unmounted
      return () => {
        elem.removeEventListener("click", clickHandler);
      };
    }
  }, [ref, ripples]);
  //add a debounce so that if the user doesn't click after 1s, we remove the ripples
  const _debounced = useDebounce(ripples, 1000);
  useEffect(() => {
    if (_debounced.length) {
      setRipples([]);
    }
  }, [_debounced.length]);
  //map through the ripples and return span elements.
  //this will be added to the button component later
  return ripples?.map((style, i) => {
    return (
      <span key={i}>
        <style>
          {`@keyframes ripple {
                to {
                  transform: scale(4);
                  opacity: 0;
                }
            }`}
        </style>
        <span
          key={i}
          style={{
            ...style,
            //should be absolutely positioned
            position: "absolute",
            backgroundColor: btnVariant=== 'outlined' ? "#D3D3D3" : "#FFFFFF",
            opacity: "25%",
            transform: "scale(0)",
            // add ripple animation from styles.css
            animation: "ripple 600ms linear",
            borderRadius: "50%",
          }}
        />
      </span>
    );
  });
};
export default useRipple;
