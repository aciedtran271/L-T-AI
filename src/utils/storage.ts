const KEY_STATE = 'loto-app-state';
const KEY_HISTORY = 'loto-history';

export interface PersistedState {
  numbersCalled: number[];
  pool: number[];
  tickets: number[][];
  speedSeconds: number;
  speechEnabled: boolean;
  darkMode: boolean;
  lastStartedAt: string | null;
  isPaused: boolean;
}

export interface HistoryItem {
  id: string;
  startedAt: string;
  numbersCalled: number[];
  speedSeconds: number;
  tickets: number[][];
  results: Array<{
    ticketIndex: number;
    matchedCount: number;
    level: string;
    matchedNumbers: number[];
  }>;
}

export function loadState(): Partial<PersistedState> | null {
  try {
    const raw = localStorage.getItem(KEY_STATE);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<PersistedState>;
  } catch {
    return null;
  }
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(KEY_STATE, JSON.stringify(state));
  } catch {
    // quota or private mode
  }
}

export function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(KEY_HISTORY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryItem[];
  } catch {
    return [];
  }
}

export function saveHistory(history: HistoryItem[]): void {
  try {
    // Giữ tối đa 50 ván
    const trimmed = history.slice(-50);
    localStorage.setItem(KEY_HISTORY, JSON.stringify(trimmed));
  } catch {
    //
  }
}

export function addToHistory(item: HistoryItem): void {
  const list = loadHistory();
  list.push(item);
  saveHistory(list);
}
