import { useApp } from '../store/context';
import sampleTickets from '../data/sampleTickets.json';

export interface SampleTicket {
  id: string;
  name: string;
  numbers: number[];
}

export function SampleTicketPicker() {
  const { dispatch } = useApp();
  const tickets = sampleTickets as SampleTicket[];

  const addTicket = (ticket: SampleTicket) => {
    dispatch({ type: 'ADD_TICKET', payload: ticket.numbers });
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Chọn vé có sẵn để thêm vào vé chơi của bạn.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900 dark:text-gray-100">{ticket.name}</span>
              <button
                type="button"
                onClick={() => addTicket(ticket)}
                className="py-1.5 px-3 rounded-lg bg-orange-600 text-white text-sm font-medium touch-manipulation"
              >
                Chọn vé
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {ticket.numbers.map((n) => (
                <span
                  key={n}
                  className="w-7 h-7 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-600 text-xs font-medium"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
