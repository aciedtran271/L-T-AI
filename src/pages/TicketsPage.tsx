import { useState, useEffect } from 'react';
import { useApp } from '../store/context';
import { TicketCard } from '../components/TicketCard';
import { TicketInput } from '../components/TicketInput';
import { ChipInput } from '../components/ChipInput';
import { SampleTicketPicker } from '../components/SampleTicketPicker';
import { WinModal } from '../components/WinModal';

export function TicketsPage() {
  const { state } = useApp();
  const [winModal, setWinModal] = useState<{ title: string; message: string } | null>(null);
  const [inputMode, setInputMode] = useState<'chip' | 'text' | 'sample'>('sample');

  const results = state.results;

  useEffect(() => {
    const hasWin = results.some((r) => r.level !== 'none');
    if (!hasWin) return;
    const full = results.find((r) => r.level === 'full');
    const line2 = results.find((r) => r.level === 'line2');
    const line1 = results.find((r) => r.level === 'line1');
    const which = full ?? line2 ?? line1;
    if (!which) return;
    const titles: Record<string, string> = {
      full: '🎉 Full vé!',
      line2: '🎉 Trúng 2 hàng!',
      line1: '🎉 Trúng 1 hàng!',
    };
    setWinModal({
      title: titles[which.level],
      message: `Vé #${which.ticketIndex + 1}: ${which.matchedCount}/15 số.`,
    });
  }, [results]);

  return (
    <div className="px-4 pb-4 space-y-6">
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 flex-wrap">
        <button
          type="button"
          onClick={() => setInputMode('sample')}
          className={`flex-1 min-w-[80px] py-2 rounded-xl font-medium text-sm ${
            inputMode === 'sample' ? 'bg-orange-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Vé có sẵn
        </button>
        <button
          type="button"
          onClick={() => setInputMode('chip')}
          className={`flex-1 min-w-[80px] py-2 rounded-xl font-medium text-sm ${
            inputMode === 'chip' ? 'bg-orange-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Chọn số
        </button>
        <button
          type="button"
          onClick={() => setInputMode('text')}
          className={`flex-1 min-w-[80px] py-2 rounded-xl font-medium text-sm ${
            inputMode === 'text' ? 'bg-orange-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Nhập text
        </button>
      </div>

      {inputMode === 'sample' && <SampleTicketPicker />}
      {inputMode === 'chip' && <ChipInput />}
      {inputMode === 'text' && <TicketInput />}

      <section>
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Vé của tôi ({state.tickets.length})
        </h2>
        {state.tickets.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">Chưa có vé. Thêm vé ở trên.</p>
        ) : (
          <div className="space-y-4">
            {state.tickets.map((ticket, i) => (
              <TicketCard
                key={i}
                ticket={ticket}
                index={i}
                result={results[i]}
              />
            ))}
          </div>
        )}
      </section>

      {state.tickets.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Kết quả</h2>
          <ul className="space-y-1 text-sm">
            {results.map((r, i) => (
              <li key={i} className="flex justify-between">
                <span>Vé #{i + 1}</span>
                <span>
                  {r.matchedCount}/15
                  {r.level !== 'none' && ` — ${r.level === 'full' ? 'Full' : r.level === 'line2' ? '2 hàng' : '1 hàng'}`}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <WinModal
        open={!!winModal}
        onClose={() => setWinModal(null)}
        title={winModal?.title ?? ''}
        message={winModal?.message ?? ''}
      />
    </div>
  );
}
