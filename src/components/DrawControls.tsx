import { useApp } from '../store/context';
import { useDrawTimer } from '../hooks/useDrawTimer';
import { addToHistory, loadHistory } from '../utils/storage';

const SPEED_OPTIONS = [3, 5, 10] as const;

export function DrawControls() {
  const { state, dispatch } = useApp();
  useDrawTimer(state.status, state.speedSeconds, () => dispatch({ type: 'NEXT_NUMBER' }));

  const onStart = () => dispatch({ type: 'START_GAME' });
  const onPause = () => dispatch({ type: 'PAUSE_GAME' });
  const onResume = () => dispatch({ type: 'RESUME_GAME' });
  const onNext = () => dispatch({ type: 'NEXT_NUMBER' });
  const onReset = () => {
    if (state.numbersCalled.length > 0) {
      addToHistory({
        id: `session-${Date.now()}`,
        startedAt: new Date().toISOString(),
        numbersCalled: state.numbersCalled,
        speedSeconds: state.speedSeconds,
        tickets: state.tickets,
        results: state.results.map((r) => ({
          ticketIndex: r.ticketIndex,
          matchedCount: r.matchedCount,
          level: r.level,
          matchedNumbers: r.matchedNumbers,
        })),
      });
      dispatch({ type: 'SET_HISTORY', payload: loadHistory() });
    }
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {SPEED_OPTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => dispatch({ type: 'SET_SPEED', payload: s })}
            className={`
              min-w-[3rem] py-2 px-3 rounded-xl font-medium text-sm
              ${state.speedSeconds === s
                ? 'bg-orange-600 text-white dark:bg-orange-500'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }
            `}
          >
            {s}s
          </button>
        ))}
        <span className="self-center text-sm text-gray-500 dark:text-gray-400">/ lượt</span>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {state.status === 'idle' && (
          <button
            type="button"
            onClick={onStart}
            className="min-h-[48px] px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow touch-manipulation"
          >
            Bắt đầu
          </button>
        )}
        {state.status === 'running' && (
          <button
            type="button"
            onClick={onPause}
            className="min-h-[48px] px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold shadow touch-manipulation"
          >
            Tạm dừng
          </button>
        )}
        {state.status === 'paused' && (
          <>
            <button
              type="button"
              onClick={onResume}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow touch-manipulation"
            >
              Tiếp tục
            </button>
            <button
              type="button"
              onClick={onNext}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow touch-manipulation"
            >
              Gọi tiếp
            </button>
          </>
        )}
        {(state.status === 'running' || state.status === 'paused' || state.status === 'finished') && (
          <button
            type="button"
            onClick={onReset}
            className="min-h-[48px] px-6 py-3 rounded-xl bg-gray-600 text-white font-semibold shadow touch-manipulation"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
