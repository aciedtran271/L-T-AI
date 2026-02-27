import type { HistoryItem } from '../utils/storage';
import { exportSessionJson } from '../utils/exportData';

interface HistoryListProps {
  items: HistoryItem[];
  onReplay: (item: HistoryItem) => void;
}

export function HistoryList({ items, onReplay }: HistoryListProps) {
  if (items.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-sm py-4">Chưa có lịch sử ván chơi.</p>
    );
  }

  return (
    <ul className="space-y-3">
      {[...items].reverse().map((item) => (
        <li
          key={item.id}
          className="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4"
        >
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {new Date(item.startedAt).toLocaleString('vi-VN')}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.numbersCalled.length} số • {item.tickets.length} vé • {item.speedSeconds}s/lượt
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onReplay(item)}
                className="py-2 px-3 rounded-lg bg-orange-600 text-white text-sm font-medium touch-manipulation"
              >
                Phát lại
              </button>
              <button
                type="button"
                onClick={() =>
                  exportSessionJson({
                    id: item.id,
                    startedAt: item.startedAt,
                    numbersCalled: item.numbersCalled,
                    speedSeconds: item.speedSeconds,
                    tickets: item.tickets,
                    results: item.results,
                  })
                }
                className="py-2 px-3 rounded-lg bg-gray-600 text-white text-sm font-medium touch-manipulation"
              >
                Export
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
