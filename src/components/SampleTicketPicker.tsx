import { useApp } from '../store/context';
import sampleTickets from '../data/sampleTickets.json';
import sampleSheets from '../data/sampleSheets.json';

export interface SampleTicket {
  id: string;
  name: string;
  numbers: number[];
}

export interface SheetTicket {
  name: string;
  numbers: number[];
}

export interface SampleSheet {
  id: string;
  name: string;
  image: string;
  tickets: SheetTicket[];
}

const baseUrl = import.meta.env.BASE_URL;

export function SampleTicketPicker() {
  const { dispatch } = useApp();
  const tickets = sampleTickets as SampleTicket[];
  const sheets = sampleSheets as SampleSheet[];

  const addTicket = (numbers: number[]) => {
    dispatch({ type: 'ADD_TICKET', payload: numbers });
  };

  const addSheet = (sheet: SampleSheet) => {
    sheet.tickets.forEach((t) => addTicket(t.numbers));
  };

  return (
    <div className="space-y-6">
      {/* Tờ có sẵn (3 vé / tờ) - từ folder vé */}
      <section>
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Tờ có sẵn (3 vé 1 tờ)
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Chọn tờ để xem ảnh và thêm từng vé hoặc thêm cả 3 vé vào chơi.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {sheets.map((sheet) => (
            <div
              key={sheet.id}
              className="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 overflow-hidden"
            >
              <img
                src={`${baseUrl}ve/${sheet.image}`}
                alt={sheet.name}
                className="w-full h-32 object-cover object-top bg-gray-100"
              />
              <div className="p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {sheet.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => addSheet(sheet)}
                    className="py-1.5 px-3 rounded-lg bg-green-600 text-white text-sm font-medium touch-manipulation"
                  >
                    Thêm cả 3 vé
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {sheet.tickets.map((t, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => addTicket(t.numbers)}
                      className="py-1 px-2 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium touch-manipulation"
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vé lẻ (danh sách vé đơn) */}
      <section>
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Vé đơn
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Chọn vé có sẵn để thêm vào vé chơi của bạn.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {ticket.name}
                </span>
                <button
                  type="button"
                  onClick={() => addTicket(ticket.numbers)}
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
      </section>
    </div>
  );
}
