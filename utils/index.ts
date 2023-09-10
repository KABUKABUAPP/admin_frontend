import { ACCESS_TOKEN } from "@/constants";
import Cookie from "js-cookie";

import { milliSecondToSecondConversionRate } from "@/constants";
import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query";

export const getImageUrl = (img: File) => {
  const objectUrl = URL.createObjectURL(img);
  return objectUrl;
};

export function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
    throw new Error(`Node expected`);
  }
}

export const verifyIsDigit = (value: string | number): boolean => {
  const re = /^[0-9\b]+$/;

  if (value === "" || re.test(String(value))) {
    return true;
  }
  return false;
};

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
  if (splitName?.length && splitName[1]) {
    lastNameInitial = splitName[1][0]?.toLocaleUpperCase();
  }

  return { firstName, lastNameInitial };
};

export const capitalizeAllFirstLetters = (word?: string): string => {
  if (word) {
    let splitName = word.split(" ");
    splitName = splitName.map((name) => capitalizeFirstLetter(name));
    return splitName.join(" ");
  } else return "";
};

export const hyphenateString = (val: string): string => {
  const splitVal = val.split(" ");
  return splitVal.join("-").toLocaleLowerCase();
};

export const getComponentStates = ({
  data,
  loading,
  error,
}: {
  data: any;
  loading: boolean;
  error: boolean;
}): { viewState: boolean; loadingState: boolean; errorState: boolean } => {
  const viewState = data && !loading && !error;
  const loadingState = !data && loading && !error;
  const errorState = !data && !loading && error;

  return {
    viewState,
    loadingState,
    errorState,
  };
};

export const formatChartLabels = ({
  query,
  data,
}: {
  query?: string;
  data: string[];
}) => {
  return data.map((item) => {
    const splitString = item.split(" ");
    if (query === "7_days") return splitString[0];
    return splitString[1];
  });
};

