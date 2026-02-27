import { useEffect, useState } from 'react';
import { useApp } from '../store/context';
import { HistoryList } from '../components/HistoryList';
import { loadHistory } from '../utils/storage';
import { exportHistoryCsv } from '../utils/exportData';
import type { HistoryItem } from '../utils/storage';

export function HistoryPage() {
  const { state, dispatch } = useApp();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, [state.tab]); // refresh khi chuyển sang tab

  const handleReplay = (item: HistoryItem) => {
    dispatch({
      type: 'HYDRATE',
      payload: {
        numbersCalled: item.numbersCalled,
        pool: [],
        currentNumber: item.numbersCalled[item.numbersCalled.length - 1] ?? null,
        status: 'finished',
        tickets: item.tickets,
        results: item.results.map((r) => ({
          ticketIndex: r.ticketIndex,
          matchedCount: r.matchedCount,
          level: r.level as 'none' | 'line1' | 'line2' | 'full',
          matchedNumbers: r.matchedNumbers,
        })),
      },
    });
    dispatch({ type: 'SET_TAB', payload: 'draw' });
  };

  const exportCsv = () => {
    const list = loadHistory();
    exportHistoryCsv(list);
  };

  return (
    <div className="px-4 pb-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Lịch sử ván chơi</h2>
        <button
          type="button"
          onClick={exportCsv}
          disabled={history.length === 0}
          className="py-2 px-4 rounded-xl bg-gray-600 text-white text-sm font-medium disabled:opacity-50 touch-manipulation"
        >
          Export CSV
        </button>
      </div>
      <HistoryList items={history} onReplay={handleReplay} />
    </div>
  );
}
