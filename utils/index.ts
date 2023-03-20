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

export const capitalizeFirstLetter = (word: string | undefined): string => {
  const firstLetter = word?.charAt(0);

  const firstLetterCap = firstLetter?.toUpperCase();

  const remainingLetters = word?.slice(1);

  let capitalizedWord = "";

  if (firstLetterCap && remainingLetters) {
    capitalizedWord = firstLetterCap + remainingLetters;
  }

  return capitalizedWord;
};

export const formatFullName = (name: string | undefined) => {
  const splitName = name?.split(" ");
  const firstName = capitalizeFirstLetter(splitName ? splitName[0] : "");
  let lastNameInitial = "";
  if(splitName?.length && splitName[1]){
    lastNameInitial = splitName[1][0]?.toLocaleUpperCase()
  }

  return { firstName, lastNameInitial };
};
