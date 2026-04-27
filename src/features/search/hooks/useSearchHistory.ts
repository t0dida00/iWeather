import { useCallback, useState } from "react";

const STORAGE_KEY = "search_history";
const MAX_ITEMS = 10;

type SearchHistoryEntry = {
    name: string;
    country_code: string;
    country: string;
    latitude: number;
    longitude: number;
    tempHigh?: number;
    tempLow?: number;
    weatherCode?: number;
}

type SearchHistoryUpdate = Partial<Omit<SearchHistoryEntry, "latitude" | "longitude">>;

export function useSearchHistory() {
    const [history, setHistory] = useState<SearchHistoryEntry[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    const addToHistory = useCallback((entry: SearchHistoryEntry): void => {
        setHistory(prev => {
            const filtered = prev.filter(q => !(q.name === entry.name && q.country_code === entry.country_code));
            const updated = [entry, ...filtered].slice(0, MAX_ITEMS);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    }, []);

    const updateHistory = useCallback((latitude: number, longitude: number, updates: SearchHistoryUpdate): void => {
        setHistory(prev => {
            let hasChanges = false;

            const updated = prev.map(entry => {
                if (entry.latitude !== latitude || entry.longitude !== longitude) {
                    return entry;
                }

                const entryHasChanges = Object.entries(updates).some(([key, value]) =>
                    entry[key as keyof SearchHistoryEntry] !== value
                );

                if (!entryHasChanges) {
                    return entry;
                }

                hasChanges = true;
                return { ...entry, ...updates };
            });

            if (!hasChanges) {
                return prev;
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    }, []);


    const clearHistory = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setHistory([]);
    }, []);

    return { history, addToHistory, updateHistory, clearHistory };
}
