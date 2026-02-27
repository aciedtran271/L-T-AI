import { useEffect } from 'react';

interface WinModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export function WinModal({ open, onClose, title, message }: WinModalProps) {
  useEffect(() => {
    if (!open) return;
    if (navigator.vibrate) navigator.vibrate(200);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-sm w-full p-6 animate-pop"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-orange-600 text-white font-semibold touch-manipulation"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
