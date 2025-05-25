import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontSize = 'small' | 'medium' | 'large';

interface SettingsStore {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  autoGenerateQuestions: boolean;
  setAutoGenerateQuestions: (value: boolean) => void;
  questionsCount: number;
  setQuestionsCount: (count: number) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      fontSize: 'medium',
      setFontSize: (size) => set({ fontSize: size }),
      autoGenerateQuestions: true,
      setAutoGenerateQuestions: (value) => set({ autoGenerateQuestions: value }),
      questionsCount: 5,
      setQuestionsCount: (count) => set({ questionsCount: count }),
    }),
    {
      name: 'settings-store',
      version: 2,
    }
  )
);

localStorage.removeItem('book-recommendations');