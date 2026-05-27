import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type WordRange = {
  start: number;
  end: number;
};

export interface SpeechProgress {
  currentWordIndex: number;
  totalWords: number;
  percentage: number;
}

export interface UseSpeechSynthesisResult {
  isPlaying: boolean;
  isPaused: boolean;
  isSpeaking: boolean;
  play: (nextText?: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  rate: number;
  setRate: (nextRate: number) => void;
  progress: SpeechProgress;
  isSupported: boolean;
  isReady: boolean;
  error: string | null;
  currentWordIndex: number;
  isLoading: boolean;
  availableVoices: SpeechSynthesisVoice[];
  selectedVoiceIndex: number;
  setSelectedVoice: (index: number) => void;
  playbackRate: number;
  setPlaybackRate: (nextRate: number) => void;
}

const SPEED_MIN = 0.5;
const SPEED_MAX = 2;

const clampRate = (nextRate: number): number => {
  if (Number.isNaN(nextRate)) {
    return 1;
  }

  return Math.min(SPEED_MAX, Math.max(SPEED_MIN, nextRate));
};

const hasSpeechSupport = (): boolean => {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window
  );
};

const buildWordRanges = (inputText: string): WordRange[] => {
  if (!inputText.trim()) {
    return [];
  }

  const ranges: WordRange[] = [];
  const wordPattern = /\S+/g;

  for (const match of inputText.matchAll(wordPattern)) {
    const start = match.index ?? 0;
    ranges.push({
      start,
      end: start + match[0].length,
    });
  }

  return ranges;
};

const getWordIndexAtCharIndex = (
  charIndex: number,
  ranges: WordRange[],
): number => {
  if (ranges.length === 0) {
    return 0;
  }

  const matchIndex = ranges.findIndex(
    (range) => charIndex >= range.start && charIndex <= range.end,
  );

  if (matchIndex >= 0) {
    return matchIndex;
  }

  const fallbackIndex = ranges.findIndex((range) => charIndex < range.start);
  return fallbackIndex >= 0 ? Math.max(0, fallbackIndex - 1) : ranges.length - 1;
};

export const useSpeechSynthesis = (text = ""): UseSpeechSynthesisResult => {
  const [isSupported, setIsSupported] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [rate, setRateState] = useState(1);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const textRef = useRef(text);
  const wordRangesRef = useRef<WordRange[]>(buildWordRanges(text));

  useEffect(() => {
    textRef.current = text;
    wordRangesRef.current = buildWordRanges(text);
    setCurrentWordIndex(0);
  }, [text]);

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }

    utteranceRef.current = null;
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentWordIndex(0);
  }, []);

  useEffect(() => {
    if (!hasSpeechSupport()) {
      setIsSupported(false);
      setIsReady(false);
      setError("Text-to-speech is not supported in this browser.");
      return;
    }

    const speechSynthesis = window.speechSynthesis;
    synthRef.current = speechSynthesis;
    setIsSupported(true);

    const syncVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
      setIsReady(true);

      if (voices.length > 0) {
        setSelectedVoiceIndex((currentIndex) =>
          currentIndex >= voices.length ? 0 : currentIndex,
        );
      }
    };

    syncVoices();
    speechSynthesis.onvoiceschanged = syncVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  useEffect(() => {
    if (isSpeaking || isPaused) {
      stop();
    }
  }, [text, stop, isPaused, isSpeaking]);

  const speakText = useCallback(
    (nextText?: string) => {
      const textToSpeak = (nextText ?? textRef.current).trim();

      if (!synthRef.current || !isSupported) {
        setError("Text-to-speech is not supported in this browser.");
        return;
      }

      if (!textToSpeak) {
        setError("No text to speak.");
        return;
      }

      stop();
      setError(null);

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utteranceRef.current = utterance;
      utterance.rate = rate;
      utterance.pitch = 1;
      utterance.volume = 1;

      const selectedVoice = availableVoices[selectedVoiceIndex];
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };

      utterance.onresume = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };

      utterance.onpause = () => {
        setIsPaused(true);
      };

      utterance.onboundary = (event) => {
        if (event.name !== "word") {
          return;
        }

        const nextWordIndex = getWordIndexAtCharIndex(
          event.charIndex,
          wordRangesRef.current,
        );

        setCurrentWordIndex(nextWordIndex);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentWordIndex(
          wordRangesRef.current.length > 0 ? wordRangesRef.current.length - 1 : 0,
        );
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setError("Unable to play narration. Please try again.");
      };

      synthRef.current.cancel();
      synthRef.current.speak(utterance);
      setCurrentWordIndex(0);
    },
    [availableVoices, isSupported, rate, selectedVoiceIndex, stop],
  );

  const pause = useCallback(() => {
    if (synthRef.current && isSpeaking && !isPaused) {
      synthRef.current.pause();
    }
  }, [isPaused, isSpeaking]);

  const resume = useCallback(() => {
    if (synthRef.current && isPaused) {
      synthRef.current.resume();
    }
  }, [isPaused]);

  const setRate = useCallback((nextRate: number) => {
    setRateState(clampRate(nextRate));
  }, []);

  const setPlaybackRate = useCallback((nextRate: number) => {
    setRateState(clampRate(nextRate));
  }, []);

  const progress = useMemo<SpeechProgress>(() => {
    const totalWords = wordRangesRef.current.length;

    if (totalWords === 0) {
      return {
        currentWordIndex: 0,
        totalWords: 0,
        percentage: 0,
      };
    }

    const boundedCurrentWordIndex = Math.min(
      Math.max(currentWordIndex, 0),
      totalWords - 1,
    );

    return {
      currentWordIndex: boundedCurrentWordIndex,
      totalWords,
      percentage: Math.min(1, (boundedCurrentWordIndex + 1) / totalWords),
    };
  }, [currentWordIndex]);

  return {
    isPlaying: isSpeaking && !isPaused,
    isPaused,
    isSpeaking,
    play: speakText,
    pause,
    resume,
    stop,
    rate,
    setRate,
    progress,
    isSupported,
    isReady,
    error,
    currentWordIndex,
    isLoading: isSupported && !isReady,
    availableVoices,
    selectedVoiceIndex,
    setSelectedVoice: setSelectedVoiceIndex,
    playbackRate: rate,
    setPlaybackRate,
  };
};

export default useSpeechSynthesis;
