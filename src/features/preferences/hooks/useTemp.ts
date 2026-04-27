import { useEffect, useState } from "react";
import type { TempUnit } from "../types";

const TEMP_STORAGE_KEY = "temp";
const TEMP_CHANGE_EVENT = "temperature-unit-change";

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
  setTemp(value);
  window.dispatchEvent(new CustomEvent(TEMP_CHANGE_EVENT, { detail: value }));

 };

 return {
   temp,
   toggleTemp
 };
}
