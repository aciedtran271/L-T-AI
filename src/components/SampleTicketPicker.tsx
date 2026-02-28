import { useApp } from '../store/context';
import sampleSheets from '../data/sampleSheets.json';

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

/** Lấy số vé từ tên (vd: "Vé 1" -> 1, "Vé 12" -> 12) */
function getTicketNumber(t: SheetTicket): number {
  const n = parseInt(t.name.replace(/\D/g, ''), 10);
  return Number.isNaN(n) ? 999 : n;
}

function getFirstTicketNumber(sheet: SampleSheet): number {
  return getTicketNumber(sheet.tickets[0] ?? { name: '' });
}

/** Sắp xếp 3 vé trong tờ theo đúng thứ tự số (Vé 1, 2, 3...) */
function sortTicketsInSheet(sheet: SampleSheet): SampleSheet {
  return {
    ...sheet,
    tickets: [...sheet.tickets].sort((a, b) => getTicketNumber(a) - getTicketNumber(b)),
  };
}

export function SampleTicketPicker() {
  const { dispatch } = useApp();
  const sheets = [...(sampleSheets as SampleSheet[])]
    .map(sortTicketsInSheet)
    .sort((a, b) => getFirstTicketNumber(a) - getFirstTicketNumber(b));

  const addSheet = (sheet: SampleSheet) => {
    const imageUrl = `${baseUrl}ve/${sheet.image}`;
    sheet.tickets.forEach((t, i) => {
      dispatch({
        type: 'ADD_TICKET',
        payload: {
          numbers: t.numbers,
          sheetImage: imageUrl,
          ticketIndexInSheet: i,
        },
      });
    });
  };

  return (
    <div className="space-y-6">
      {/* Tờ có sẵn (3 vé / tờ) - sắp xếp theo vé 1,2,3,4... hiển thị full tờ */}
      <section>
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Tờ có sẵn (3 vé 1 tờ)
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Sắp xếp theo vé số 1, 2, 3, 4... Bấm «Thêm cả 3 vé» để thêm cả tờ vào chơi.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {sheets.map((sheet, index) => (
            <div
              key={sheet.id}
              className="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 overflow-hidden"
            >
              <img
                src={`${baseUrl}ve/${sheet.image}`}
                alt={`Tờ ${index + 1}`}
                className="w-full object-contain bg-gray-100 max-h-[50vh]"
              />
              <div className="p-3 flex justify-between items-center flex-wrap gap-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Tờ {index + 1} ({sheet.tickets.map((t) => t.name).join(', ')})
                </span>
                <button
                  type="button"
                  onClick={() => addSheet(sheet)}
                  className="py-1.5 px-3 rounded-lg bg-green-600 text-white text-sm font-medium touch-manipulation shrink-0"
                >
                  Thêm cả 3 vé
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
