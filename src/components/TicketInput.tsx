import { useState } from 'react';
import { useApp } from '../store/context';
import { validateTicketNumbers, parseTicketFromText, NUMBERS_PER_TICKET } from '../utils/validate';

export function TicketInput() {
  const { dispatch } = useApp();
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addByText = () => {
    setError(null);
    const result = parseTicketFromText(text);
    if (!result.valid || !result.numbers) {
      setError(result.error ?? 'Dữ liệu không hợp lệ.');
      return;
    }
    if (result.numbers.length !== NUMBERS_PER_TICKET) {
      setError(`Cần đúng ${NUMBERS_PER_TICKET} số (hiện có ${result.numbers.length}).`);
      return;
    }
    dispatch({ type: 'ADD_TICKET', payload: result.numbers });
    setText('');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Import vé (cách nhau bằng dấu cách, ví dụ: 01 15 22 33 44 55 66 77 88 90 12 23 34 45 56)
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => { setText(e.target.value); setError(null); }}
          placeholder="01 15 22 ..."
          className="flex-1 py-2 px-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
        />
        <button
          type="button"
          onClick={addByText}
          className="py-2 px-4 rounded-xl bg-orange-600 text-white font-medium text-sm touch-manipulation"
        >
          Thêm vé
        </button>
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
