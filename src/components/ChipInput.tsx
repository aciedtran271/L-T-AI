import { useState } from 'react';
import { useApp } from '../store/context';
import { validateTicketNumbers, NUMBERS_PER_TICKET } from '../utils/validate';

export function ChipInput() {
  const { dispatch } = useApp();
  const [selected, setSelected] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toggle = (n: number) => {
    setError(null);
    if (selected.includes(n)) {
      setSelected(selected.filter((x) => x !== n));
    } else if (selected.length < NUMBERS_PER_TICKET) {
      setSelected([...selected, n].sort((a, b) => a - b));
    }
  };

  const submit = () => {
    const result = validateTicketNumbers(selected);
    if (!result.valid || !result.numbers) {
      setError(result.error ?? 'Vé không hợp lệ.');
      return;
    }
    dispatch({ type: 'ADD_TICKET', payload: result.numbers });
    setSelected([]);
  };

  const clear = () => {
    setSelected([]);
    setError(null);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Chọn {NUMBERS_PER_TICKET} số ({selected.length}/{NUMBERS_PER_TICKET})
      </p>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 90 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => toggle(n)}
            className={`
              w-9 h-9 rounded-lg text-sm font-semibold touch-manipulation
              ${selected.includes(n)
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200'
              }
            `}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={submit}
          disabled={selected.length !== NUMBERS_PER_TICKET}
          className="py-2 px-4 rounded-xl bg-green-600 text-white font-medium disabled:opacity-50 touch-manipulation"
        >
          Thêm vé
        </button>
        <button
          type="button"
          onClick={clear}
          className="py-2 px-4 rounded-xl bg-gray-500 text-white font-medium touch-manipulation"
        >
          Xóa chọn
        </button>
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
