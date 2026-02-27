/**
 * Trả về mảng số từ 1 đến 90 đã xáo trộn (Fisher-Yates).
 */
export function shuffle1To90(): number[] {
  const arr = Array.from({ length: 90 }, (_, i) => i + 1);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Lấy số tiếp theo từ pool (không trùng). Pool được truyền từ bên ngoài để dễ sync state.
 */
export function pickNextFromPool(pool: number[]): number | null {
  if (pool.length === 0) return null;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}
