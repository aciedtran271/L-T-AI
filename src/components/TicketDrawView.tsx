import { useRef, useEffect, useState, useCallback } from 'react';

interface TicketDrawViewProps {
  imageUrl: string;
  ticketIndexInSheet: number; // 0 = top, 1 = middle, 2 = bottom
  ticketLabel: string;
  onClose: () => void;
}

export function TicketDrawView({
  imageUrl,
  ticketIndexInSheet,
  ticketLabel,
  onClose,
}: TicketDrawViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  const getCoords = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || !canvasRef.current) return null;
      const scaleX = canvasRef.current.width / rect.width;
      const scaleY = canvasRef.current.height / rect.height;
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
      if (clientX == null || clientY == null) return null;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    },
    []
  );

  const startDraw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      const coords = getCoords(e);
      if (!coords || !canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      setIsDrawing(true);
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.stroke();
    },
    [getCoords]
  );

  const moveDraw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      if (!isDrawing) return;
      const coords = getCoords(e);
      if (!coords || !canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    },
    [isDrawing, getCoords]
  );

  const endDraw = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0]?.contentRect ?? { width: 0, height: 0 };
      if (width && height) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.strokeStyle = '#dc2626';
          ctx.lineWidth = Math.max(2, 3 * dpr);
          ctx.lineCap = 'round';
        }
        setDimensions({ w: width, h: height });
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
    }
  }, [dimensions]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 safe-top safe-bottom">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <span className="font-semibold text-white">{ticketLabel} — Vẽ lên ảnh</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={clearCanvas}
            className="py-2 px-3 rounded-lg bg-gray-600 text-white text-sm font-medium"
          >
            Xóa nét
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-3 rounded-lg bg-orange-600 text-white text-sm font-medium"
          >
            Đóng
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto flex items-center justify-center p-2 min-h-0">
        <div
          ref={containerRef}
          className="relative w-full max-w-md mx-auto bg-gray-800 rounded-lg overflow-hidden touch-none"
          style={{ aspectRatio: '5/7' }}
        >
          {/* Ảnh tờ: 1/3 tờ tương ứng vé; contain = hiển thị full vé không cắt */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <img
              src={imageUrl}
              alt={ticketLabel}
              className="block w-full object-contain"
              style={{
                height: '300%',
                marginTop: `-${ticketIndexInSheet * 100}%`,
                objectFit: 'contain',
                objectPosition: 'top center',
              }}
            />
          </div>
          {/* Canvas vẽ đè lên, cùng kích thước container */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full touch-none"
            style={{ pointerEvents: 'auto' }}
            onMouseDown={startDraw}
            onMouseMove={moveDraw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={moveDraw}
            onTouchEnd={endDraw}
          />
        </div>
      </div>
    </div>
  );
}
