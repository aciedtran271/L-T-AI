import { useApp } from '../store/context';

export function SpeechToggle() {
  const { state, dispatch } = useApp();

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={state.speechEnabled}
        onChange={() => dispatch({ type: 'TOGGLE_SPEECH' })}
        className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
      />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Giọng đọc tiếng Việt
      </span>
    </label>
  );
}
