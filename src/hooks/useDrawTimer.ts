import { useEffect, useRef } from 'react';
import type { GameStatus } from '../store/types';

/**
 * Chỉ auto gọi NEXT khi status === 'running'. Pause/Reset không trigger.
 * Đổi speed khi đang chạy: interval dùng speed mới ngay từ lần sau.
 */
export function useDrawTimer(
  status: GameStatus,
  speedSeconds: number,
  onTick: () => void
): void {
  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

  useEffect(() => {
    if (status !== 'running') return;

    const ms = speedSeconds * 1000;
    const id = setInterval(() => {
      onTickRef.current();
    }, ms);
    return () => clearInterval(id);
  }, [status, speedSeconds]);
}
