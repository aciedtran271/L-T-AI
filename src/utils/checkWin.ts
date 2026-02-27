const ROWS = 3;
const COLS = 5;
const TOTAL = 15;

export type WinLevel = 'none' | 'line1' | 'line2' | 'full';

export interface TicketResult {
  ticketIndex: number;
  matchedCount: number;
  level: WinLevel;
  matchedNumbers: number[];
}

/**
 * Vé là mảng 15 số, hiển thị 3x5.
 * line1 = hàng 0 (index 0-4), line2 = hàng 1 (5-9), line3 = hàng 2 (10-14).
 */
function getRowIndices(row: 0 | 1 | 2): number[] {
  const start = row * COLS;
  return Array.from({ length: COLS }, (_, i) => start + i);
}

function countMatchedInRow(ticket: number[], calledSet: Set<number>, row: 0 | 1 | 2): number {
  return getRowIndices(row).filter((i) => calledSet.has(ticket[i])).length;
}

function isRowComplete(ticket: number[], calledSet: Set<number>, row: 0 | 1 | 2): boolean {
  return countMatchedInRow(ticket, calledSet, row) === COLS;
}

/**
 * Xác định mức thắng: none / line1 / line2 / full.
 */
export function getWinLevel(ticket: number[], calledSet: Set<number>): WinLevel {
  const r0 = isRowComplete(ticket, calledSet, 0);
  const r1 = isRowComplete(ticket, calledSet, 1);
  const r2 = isRowComplete(ticket, calledSet, 2);
  const full = ticket.every((n) => calledSet.has(n));
  if (full) return 'full';
  const lines = [r0, r1, r2].filter(Boolean).length;
  if (lines >= 2) return 'line2';
  if (lines >= 1) return 'line1';
  return 'none';
}

/**
 * Tính kết quả cho một vé.
 */
export function checkTicket(
  ticket: number[],
  calledNumbers: number[],
  ticketIndex: number
): TicketResult {
  const calledSet = new Set(calledNumbers);
  const matchedNumbers = ticket.filter((n) => calledSet.has(n));
  const level = getWinLevel(ticket, calledSet);
  return {
    ticketIndex,
    matchedCount: matchedNumbers.length,
    level,
    matchedNumbers,
  };
}

/**
 * Tính kết quả cho tất cả vé.
 */
export function checkAllTickets(
  tickets: number[][],
  calledNumbers: number[]
): TicketResult[] {
  return tickets.map((t, i) => checkTicket(t, calledNumbers, i));
}

export { ROWS, COLS, TOTAL };
