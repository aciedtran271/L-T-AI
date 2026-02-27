import { CurrentNumber } from '../components/CurrentNumber';
import { DrawControls } from '../components/DrawControls';
import { Board90 } from '../components/Board90';
import { SpeechToggle } from '../components/SpeechToggle';
import { useApp } from '../store/context';
import { useSpeechOnNumber } from '../hooks/useSpeechOnNumber';

export function DrawPage() {
  const { state } = useApp();
  useSpeechOnNumber(state.currentNumber, state.speechEnabled);

  return (
    <div className="px-4 pb-4 space-y-6">
      <CurrentNumber />
      <div className="flex justify-center">
        <SpeechToggle />
      </div>
      <DrawControls />
      <section>
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Bảng 90 số</h2>
        <Board90 />
      </section>
    </div>
  );
}
