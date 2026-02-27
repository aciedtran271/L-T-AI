import { useApp } from '../store/context';
import type { TabId } from '../store/types';

const TABS: { id: TabId; label: string }[] = [
  { id: 'draw', label: 'Quay số' },
  { id: 'tickets', label: 'Vé & Dò' },
  { id: 'history', label: 'Lịch sử' },
];

export function BottomNav() {
  const { state, dispatch } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 safe-bottom z-40">
      <div className="flex justify-around items-center h-14">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => dispatch({ type: 'SET_TAB', payload: id })}
            className={`
              flex-1 flex flex-col items-center justify-center min-h-[48px] touch-manipulation
              ${state.tab === id
                ? 'text-orange-600 dark:text-orange-400 font-semibold'
                : 'text-gray-500 dark:text-gray-400'
              }
            `}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
