import { useState, useMemo } from 'react';
import { useApp } from '../store/context';

type Filter = 'all' | 'called' | 'uncalled';

export function Board90() {
  const { state } = useApp();
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');

  const calledSet = useMemo(() => new Set(state.numbersCalled), [state.numbersCalled]);
  const allNumbers = useMemo(() => Array.from({ length: 90 }, (_, i) => i + 1), []);

  const filtered = useMemo(() => {
    let list = allNumbers;
    if (filter === 'called') list = list.filter((n) => calledSet.has(n));
    if (filter === 'uncalled') list = list.filter((n) => !calledSet.has(n));
    if (search.trim()) {
      const q = search.trim().replace(/\D/g, '');
      if (q) {
        const num = parseInt(q, 10);
        if (!Number.isNaN(num) && num >= 1 && num <= 90) {
          list = list.filter((n) => n === num || String(n).includes(q));
        } else {
          list = list.filter((n) => String(n).includes(q));
        }
      }
    }
    return list;
  }, [allNumbers, calledSet, filter, search]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="search"
          placeholder="Tìm số..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[120px] py-2 px-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
        />
        <div className="flex gap-1">
          {(['all', 'called', 'uncalled'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`
                py-2 px-3 rounded-lg text-sm font-medium
                ${filter === f
                  ? 'bg-orange-600 text-white dark:bg-orange-500'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }
              `}
            >
              {f === 'all' ? 'Tất cả' : f === 'called' ? 'Đã gọi' : 'Chưa gọi'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[320px] sm:max-w-[400px] md:max-w-[480px] mx-auto">
        <div className="grid grid-cols-10 gap-0.5 sm:gap-1">
          {filtered.map((n) => {
            const called = calledSet.has(n);
            return (
              <div
                key={n}
                className={`
                  aspect-square flex items-center justify-center rounded text-[10px] sm:text-xs font-semibold min-w-0
                  ${called
                    ? 'bg-green-500 text-white dark:bg-green-600 animate-pop'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }
                `}
              >
                {n}
              </div>
            );
          })}
        </div>
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">Không có số nào.</p>
      )}
    </div>
  );
}
