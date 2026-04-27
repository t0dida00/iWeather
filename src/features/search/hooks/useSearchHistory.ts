import { useState } from "react";

const STORAGE_KEY = "search_history";
const MAX_ITEMS = 10;

type SearchHistoryEntry = {
    name: string;
    country_code: string;
    latitude: number;
    longitude: number;
}
export function useSearchHistory() {
    const [history, setHistory] = useState<SearchHistoryEntry[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

   const addToHistory = (entry: SearchHistoryEntry): void => {
    setHistory(prev => {
        const filtered = prev.filter(q => !(q.name === entry.name && q.country_code === entry.country_code));
        const updated = [entry, ...filtered].slice(0, MAX_ITEMS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
    });
};


    const clearHistory = () => {
        localStorage.removeItem(STORAGE_KEY);
        setHistory([]);
    };

    return { history, addToHistory, clearHistory };
}