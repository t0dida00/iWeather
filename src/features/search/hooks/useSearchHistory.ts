import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "search_history";
const STORAGE_CHANGE_EVENT = "search_history_change";
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

const readHistory = (): SearchHistoryEntry[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

const writeHistory = (history: SearchHistoryEntry[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    window.dispatchEvent(new Event(STORAGE_CHANGE_EVENT));
}

export function useSearchHistory() {
    const [history, setHistory] = useState<SearchHistoryEntry[]>(readHistory);

    useEffect(() => {
        const syncHistory = () => setHistory(readHistory());
        const syncStoredHistory = (event: StorageEvent) => {
            if (event.key === STORAGE_KEY) {
                syncHistory();
            }
        };

        window.addEventListener(STORAGE_CHANGE_EVENT, syncHistory);
        window.addEventListener("storage", syncStoredHistory);

        return () => {
            window.removeEventListener(STORAGE_CHANGE_EVENT, syncHistory);
            window.removeEventListener("storage", syncStoredHistory);
        };
    }, []);

    const addToHistory = useCallback((entry: SearchHistoryEntry): void => {
        setHistory(() => {
            const latestHistory = readHistory();
            const existingEntry = latestHistory.find(q =>
                q.latitude === entry.latitude && q.longitude === entry.longitude
            );
            const filtered = latestHistory.filter(q =>
                !(q.latitude === entry.latitude && q.longitude === entry.longitude)
            );
            const updated = [{ ...existingEntry, ...entry }, ...filtered].slice(0, MAX_ITEMS);
            writeHistory(updated);
            return updated;
        });
    }, []);

    const updateHistory = useCallback((latitude: number, longitude: number, updates: SearchHistoryUpdate): void => {
        setHistory(() => {
            const latestHistory = readHistory();
            let hasChanges = false;

            const updated = latestHistory.map(entry => {
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
                return latestHistory;
            }

            writeHistory(updated);
            return updated;
        });
    }, []);


    const clearHistory = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new Event(STORAGE_CHANGE_EVENT));
        setHistory([]);
    }, []);

    return { history, addToHistory, updateHistory, clearHistory };
}
