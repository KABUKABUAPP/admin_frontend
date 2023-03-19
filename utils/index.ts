import { ACCESS_TOKEN } from "@/constants";
import Cookie from "js-cookie";

import { milliSecondToSecondConversionRate } from "@/constants";

export function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
    throw new Error(`Node expected`);
  }
}

export const secondsToMilliSeconds = (seconds: number): number => {
  return seconds * milliSecondToSecondConversionRate;
};

export const logout = (callback?: () => any) => {
  Cookie.remove(ACCESS_TOKEN);
  if (callback) callback();
};
