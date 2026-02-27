import type { TicketResult } from '../utils/checkWin';
import type { HistoryItem } from '../utils/storage';

export type TabId = 'draw' | 'tickets' | 'history';

export type GameStatus = 'idle' | 'running' | 'paused' | 'finished';

export interface AppState {
  tab: TabId;
  darkMode: boolean;
  // Quay số
  numbersCalled: number[];
  pool: number[];
  currentNumber: number | null;
  status: GameStatus;
  speedSeconds: number;
  speechEnabled: boolean;
  // Vé
  tickets: number[][];
  results: TicketResult[];
  // Lịch sử (trong memory, sync từ storage khi cần)
  history: HistoryItem[];
}

export type AppAction =
  | { type: 'SET_TAB'; payload: TabId }
  | { type: 'TOGGLE_DARK' }
  | { type: 'SET_DARK'; payload: boolean }
  | { type: 'START_GAME' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'NEXT_NUMBER' }
  | { type: 'RESET_GAME' }
  | { type: 'SET_SPEED'; payload: number }
  | { type: 'TOGGLE_SPEECH' }
  | { type: 'SET_SPEECH'; payload: boolean }
  | { type: 'SET_TICKETS'; payload: number[][] }
  | { type: 'ADD_TICKET'; payload: number[] }
  | { type: 'REMOVE_TICKET'; payload: number }
  | { type: 'SET_HISTORY'; payload: HistoryItem[] }
  | { type: 'HYDRATE'; payload: Partial<AppState> };
