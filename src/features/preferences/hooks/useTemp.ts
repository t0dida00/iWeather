import { useEffect, useState } from "react";
import type { TempUnit } from "../types";
import { ConvertFahrenheitToCelsius, convertCelsiusToFahrenheit } from "../../../shared/utils/common";

const TEMP_STORAGE_KEY = "temp";
const TEMP_CHANGE_EVENT = "temperature-unit-change";
const SEARCH_HISTORY_STORAGE_KEY = "search_history";
const SEARCH_HISTORY_CHANGE_EVENT = "search_history_change";

type SearchHistoryEntry = {
  tempHigh?: number;
  tempLow?: number;
  [key: string]: unknown;
}

const convertSearchHistoryTemperatures = (from: TempUnit, to: TempUnit): void => {
  if (from === to) {
    return;
  }

  const storedHistory = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);

  if (!storedHistory) {
    return;
  }

  const convertTemperature =
    to === "fahrenheit" ? convertCelsiusToFahrenheit : ConvertFahrenheitToCelsius;

  const history = JSON.parse(storedHistory) as SearchHistoryEntry[];
  const convertedHistory = history.map((entry) => ({
    ...entry,
    tempHigh: typeof entry.tempHigh === "number" ? convertTemperature(entry.tempHigh) : entry.tempHigh,
    tempLow: typeof entry.tempLow === "number" ? convertTemperature(entry.tempLow) : entry.tempLow,
  }));

  localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(convertedHistory));
  window.dispatchEvent(new Event(SEARCH_HISTORY_CHANGE_EVENT));
};

export function useTemp() {
 const [temp, setTemp] = useState<TempUnit>(() => {
   return (
    (localStorage.getItem(TEMP_STORAGE_KEY) as TempUnit) ||
    "celsius"
   );
 });

 useEffect(() => {
   const handleTempChange = (event: Event) => {
     setTemp((event as CustomEvent<TempUnit>).detail);
   };

   window.addEventListener(TEMP_CHANGE_EVENT, handleTempChange);

   return () => {
     window.removeEventListener(TEMP_CHANGE_EVENT, handleTempChange);
   };
 }, []);

 useEffect(() => {
   document.documentElement.setAttribute(
      "temperature-unit",
      temp
   );

   localStorage.setItem(
      TEMP_STORAGE_KEY,
      temp  
   );
 }, [temp]);

 const toggleTemp = (value: TempUnit) => {
  convertSearchHistoryTemperatures(temp, value);
  setTemp(value);
  window.dispatchEvent(new CustomEvent(TEMP_CHANGE_EVENT, { detail: value }));

 };

 return {
   temp,
   toggleTemp
 };
}
