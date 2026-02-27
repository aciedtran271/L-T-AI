const VALID_RANGE = { min: 1, max: 90 };
const NUMBERS_PER_TICKET = 15;

export interface ValidationResult {
  valid: boolean;
  numbers?: number[];
  error?: string;
}

/**
 * Kiểm tra mảng số: 1–90, không trùng, đủ 15 số cho 1 vé.
 */
export function validateTicketNumbers(nums: number[], strictCount = true): ValidationResult {
  const set = new Set<number>();
  const out: number[] = [];

  for (const n of nums) {
    const num = typeof n === 'string' ? parseInt(n, 10) : n;
    if (Number.isNaN(num) || num < VALID_RANGE.min || num > VALID_RANGE.max) {
      return { valid: false, error: `Số ${n} không hợp lệ (phải từ 1 đến 90).` };
    }
    if (set.has(num)) {
      return { valid: false, error: `Số ${num} bị trùng.` };
    }
    set.add(num);
    out.push(num);
  }

  if (strictCount && out.length !== NUMBERS_PER_TICKET) {
    return {
      valid: false,
      error: `Mỗi vé cần đúng ${NUMBERS_PER_TICKET} số (hiện có ${out.length}).`,
    };
  }

  return { valid: true, numbers: out.sort((a, b) => a - b) };
}

/**
 * Parse chuỗi "01 15 22 33 ..." thành mảng number.
 */
export function parseTicketFromText(text: string): ValidationResult {
  const parts = text
    .trim()
    .split(/\s+/)
    .map((s) => s.replace(/\D/g, '') || '0')
    .filter(Boolean)
    .map((s) => parseInt(s, 10));
  return validateTicketNumbers(parts, false);
}

export { VALID_RANGE, NUMBERS_PER_TICKET };
