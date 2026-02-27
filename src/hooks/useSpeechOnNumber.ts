import { useEffect, useRef, useState } from 'react';
import { getVoices, selectVietnameseVoice, speakNumber } from '../utils/speech';
import lottoCalls from '../data/lottoCalls.json';

type LottoCallsMap = Record<string, string>;
const callsMap = lottoCalls as LottoCallsMap;

export function useSpeechOnNumber(num: number | null, enabled: boolean) {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const prevRef = useRef<number | null>(null);

  useEffect(() => {
    getVoices().then((voices) => setVoice(selectVietnameseVoice(voices)));
  }, []);

  useEffect(() => {
    if (num === null || !enabled) return;
    if (prevRef.current === num) return;
    prevRef.current = num;
    speakNumber(num, callsMap, voice, true);
  }, [num, enabled, voice]);
}
