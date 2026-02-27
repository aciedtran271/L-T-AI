import { useApp } from '../store/context';
import { ROWS, COLS } from '../utils/checkWin';
import type { WinLevel } from '../utils/checkWin';

const WIN_LABEL: Record<WinLevel, string> = {
  none: '',
  line1: '1 hàng',
  line2: '2 hàng',
  full: 'Full vé',
};

interface TicketCardProps {
  ticket: number[];
  index: number;
  result?: { matchedCount: number; level: WinLevel };
}

export function TicketCard({ ticket, index, result }: TicketCardProps) {
  const { state, dispatch } = useApp();
  const calledSet = new Set(state.numbersCalled);

  const level = result?.level ?? 'none';
  const label = WIN_LABEL[level];

  return (
    <div className="rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="flex justify-between items-center px-3 py-2 bg-gray-100 dark:bg-gray-700">
        <span className="font-semibold text-sm">Vé #{index + 1}</span>
        {label && (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
            {label}
          </span>
        )}
        <button
          type="button"
          onClick={() => dispatch({ type: 'REMOVE_TICKET', payload: index })}
          className="text-red-600 dark:text-red-400 text-sm font-medium"
        >
          Xóa
        </button>
      </div>
      <div className="p-2">
        {Array.from({ length: ROWS }, (_, row) => (
          <div key={row} className="flex gap-1 justify-center mb-1">
            {ticket.slice(row * COLS, (row + 1) * COLS).map((num, col) => {
              const called = calledSet.has(num);
              return (
                <div
                  key={`${row}-${col}`}
                  className={`
                    w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-sm font-bold
                    ${called
                      ? 'bg-green-500 text-white dark:bg-green-600'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200'
                    }
                  `}
                >
                  {num}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
