import { useApp } from '../store/context';

export function CurrentNumber() {
  const { state } = useApp();
  const n = state.currentNumber;

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <span className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
        Số vừa gọi
      </span>
      <div
        className={`
          mt-2 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl flex items-center justify-center
          bg-orange-500 text-white font-bold text-4xl sm:text-5xl shadow-lg
          ${n != null ? 'animate-pop' : ''}
        `}
      >
        {n != null ? n : '—'}
      </div>
    </div>
  );
}
