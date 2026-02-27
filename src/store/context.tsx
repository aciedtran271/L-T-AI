import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { appReducer, initialState } from './reducer';
import type { AppState, AppAction } from './types';
import { loadState, saveState, loadHistory, saveHistory } from '../utils/storage';

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Hydrate từ LocalStorage khi mount
  useEffect(() => {
    const saved = loadState();
    const history = loadHistory();
    if (saved) {
      dispatch({
        type: 'HYDRATE',
        payload: {
          numbersCalled: saved.numbersCalled ?? [],
          pool: saved.pool ?? initialState.pool,
          currentNumber: saved.numbersCalled?.length ? saved.numbersCalled[saved.numbersCalled.length - 1] ?? null : null,
          speedSeconds: saved.speedSeconds ?? 5,
          speechEnabled: saved.speechEnabled ?? true,
          darkMode: saved.darkMode ?? true,
          tickets: saved.tickets ?? [],
        },
      });
    }
    dispatch({ type: 'SET_HISTORY', payload: history });
  }, []);

  // Persist state (debounce nhẹ để tránh ghi liên tục)
  useEffect(() => {
    const t = setTimeout(() => {
      saveState({
        numbersCalled: state.numbersCalled,
        pool: state.pool,
        tickets: state.tickets,
        speedSeconds: state.speedSeconds,
        speechEnabled: state.speechEnabled,
        darkMode: state.darkMode,
        lastStartedAt: null,
        isPaused: state.status === 'paused',
      });
    }, 300);
    return () => clearTimeout(t);
  }, [
    state.numbersCalled,
    state.pool,
    state.tickets,
    state.speedSeconds,
    state.speechEnabled,
    state.darkMode,
    state.status,
  ]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
