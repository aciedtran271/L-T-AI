export interface ExportSession {
  id: string;
  startedAt: string;
  numbersCalled: number[];
  speedSeconds: number;
  tickets: number[][];
  results: Array<{
    ticketIndex: number;
    matchedCount: number;
    level: string;
    matchedNumbers: number[];
  }>;
}

export function downloadJson(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportSessionJson(session: ExportSession): void {
  downloadJson(
    {
      numbersCalled: session.numbersCalled,
      tickets: session.tickets,
      results: session.results,
      startedAt: session.startedAt,
      speedSeconds: session.speedSeconds,
    },
    `loto-${session.id}.json`
  );
}

export function exportHistoryCsv(history: ExportSession[]): void {
  const headers = [
    'id',
    'startedAt',
    'speedSeconds',
    'ticketCount',
    'numbersCalledCount',
    'numbersCalled',
  ].join(',');
  const rows = history.map((h) =>
    [
      h.id,
      h.startedAt,
      h.speedSeconds,
      h.tickets.length,
      h.numbersCalled.length,
      h.numbersCalled.join(' '),
    ].join(',')
  );
  const csv = [headers, ...rows].join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `loto-history-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
