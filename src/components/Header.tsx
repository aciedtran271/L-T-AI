import { useApp } from '../store/context';

export function Header() {
  const { state, dispatch } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-top">
      <div className="flex items-center justify-between h-14 px-4">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white truncate">
          LÔ TÔ VIỆT NAM
        </h1>
        <button
          type="button"
          onClick={() => dispatch({ type: 'TOGGLE_DARK' })}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          aria-label={state.darkMode ? 'Bật sáng' : 'Bật tối'}
        >
          {state.darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
