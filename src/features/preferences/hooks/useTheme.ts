import { useEffect, useState } from "react";
import type { Theme } from "../types";

export function useTheme() {
 const [theme, setTheme] = useState<Theme>(() => {
   return (
    (localStorage.getItem("theme") as Theme) ||
    "light"
   );
 });

 useEffect(() => {
   document.documentElement.setAttribute(
      "data-theme",
      theme
   );

   localStorage.setItem(
      "theme",
      theme
   );
 }, [theme]);

 const toggleTheme = (value: Theme) => {
  setTheme(value);

 };

 return {
   theme,
   toggleTheme
 };
}