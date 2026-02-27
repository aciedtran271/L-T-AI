type LottoCallsMap = Record<string, string>;

let cachedVoices: SpeechSynthesisVoice[] = [];

export function getVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const list = speechSynthesis.getVoices();
    if (list.length > 0) {
      cachedVoices = list;
      resolve(list);
      return;
    }
    speechSynthesis.onvoiceschanged = () => {
      cachedVoices = speechSynthesis.getVoices();
      resolve(cachedVoices);
    };
    // Fallback nếu không fire
    setTimeout(() => resolve(speechSynthesis.getVoices()), 100);
  });
}

/**
 * Chọn voice tiếng Việt nếu có, không thì dùng mặc định.
 */
export function selectVietnameseVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const vi = voices.find((v) => v.lang.startsWith('vi'));
  if (vi) return vi;
  return voices[0] ?? null;
}

/**
 * Đọc số với câu lô tô tùy biến (từ lottoCalls.json) hoặc mặc định "Số X".
 */
export function speakNumber(
  num: number,
  callsMap: LottoCallsMap,
  voice: SpeechSynthesisVoice | null,
  enabled: boolean
): void {
  if (!enabled || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const text = callsMap[String(num)] ?? `Số ${num}`;
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  u.pitch = 1;
  u.volume = 1;
  if (voice) u.voice = voice;
  u.lang = 'vi-VN';
  window.speechSynthesis.speak(u);
}

export function stopSpeech(): void {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}
