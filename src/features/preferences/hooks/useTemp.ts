import { useEffect, useState } from "react";
import type { TempUnit } from "../types";

export function useTemp() {
 const [temp, setTemp] = useState<TempUnit>(() => {
   return (
    (localStorage.getItem("temp") as TempUnit) ||
    "celsius"
   );
 });

 useEffect(() => {
   document.documentElement.setAttribute(
      "temperature-unit",
      temp
   );

   localStorage.setItem(
      "temp",
      temp  
   );
 }, [temp]);

 const toggleTemp = (value: TempUnit) => {
  setTemp(value);

 };

 return {
   temp,
   toggleTemp
 };
}