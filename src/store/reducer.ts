import { shuffle1To90, pickNextFromPool } from '../utils/random';
import { checkAllTickets } from '../utils/checkWin';
import type { AppState, AppAction } from './types';

function nextPool(currentPool: number[], called: number): number[] {
  return currentPool.filter((n) => n !== called);
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, tab: action.payload };

    case 'TOGGLE_DARK':
      return { ...state, darkMode: !state.darkMode };

    case 'SET_DARK':
      return { ...state, darkMode: action.payload };

    case 'START_GAME': {
      const pool = state.pool.length > 0 ? [...state.pool] : shuffle1To90();
      const next = pickNextFromPool(pool);
      if (next === null) {
        return {
          ...state,
          pool: [],
          status: 'finished',
          currentNumber: state.currentNumber,
          numbersCalled: state.numbersCalled,
          results: checkAllTickets(state.tickets, state.numbersCalled),
        };
      }
      const newPool = nextPool(pool, next);
      const newCalled = [...state.numbersCalled, next];
      return {
        ...state,
        pool: newPool,
        numbersCalled: newCalled,
        currentNumber: next,
        status: 'running',
        results: checkAllTickets(state.tickets, newCalled),
      };
    }

    case 'PAUSE_GAME':
      return { ...state, status: 'paused' };

    case 'RESUME_GAME':
      return state.status === 'paused' ? { ...state, status: 'running' } : state;

    case 'NEXT_NUMBER': {
      if (state.status !== 'running' && state.status !== 'paused') return state;
      const pool = state.pool.length > 0 ? [...state.pool] : [];
      const next = pickNextFromPool(pool);
      if (next === null) {
        return {
          ...state,
          pool: [],
          status: 'finished',
          currentNumber: state.currentNumber,
          numbersCalled: state.numbersCalled,
          results: checkAllTickets(state.tickets, state.numbersCalled),
        };
      }
      const newPool = nextPool(pool, next);
      const newCalled = [...state.numbersCalled, next];
      return {
        ...state,
        pool: newPool,
        numbersCalled: newCalled,
        currentNumber: next,
        results: checkAllTickets(state.tickets, newCalled),
      };
    }

    case 'RESET_GAME': {
      const freshPool = shuffle1To90();
      return {
        ...state,
        pool: freshPool,
        numbersCalled: [],
        currentNumber: null,
        status: 'idle',
        results: checkAllTickets(state.tickets, []),
      };
    }

    case 'SET_SPEED':
      return { ...state, speedSeconds: action.payload };

    case 'TOGGLE_SPEECH':
      return { ...state, speechEnabled: !state.speechEnabled };

    case 'SET_SPEECH':
      return { ...state, speechEnabled: action.payload };

    case 'SET_TICKETS':
      return {
        ...state,
        tickets: action.payload,
        results: checkAllTickets(action.payload, state.numbersCalled),
      };

    case 'ADD_TICKET':
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
        results: checkAllTickets([...state.tickets, action.payload], state.numbersCalled),
      };

    case 'REMOVE_TICKET': {
      const next = state.tickets.filter((_, i) => i !== action.payload);
      return {
        ...state,
        tickets: next,
        results: checkAllTickets(next, state.numbersCalled),
      };
    }

    case 'SET_HISTORY':
      return { ...state, history: action.payload };

    case 'HYDRATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

export const initialState: AppState = {
  tab: 'draw',
  darkMode: true,
  numbersCalled: [],
  pool: shuffle1To90(),
  currentNumber: null,
  status: 'idle',
  speedSeconds: 5,
  speechEnabled: true,
  tickets: [],
  results: [],
  history: [],
};
