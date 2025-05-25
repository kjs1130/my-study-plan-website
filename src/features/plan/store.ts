import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StudyPlan } from './types';

interface PlanState {
  plans: StudyPlan[];
  addPlan: (plan: Omit<StudyPlan, 'id' | 'createdAt'>) => void;
  toggleBookmark: (planId: string, questionId: string) => void;
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set, get) => ({
      plans: [],
      addPlan: (plan) =>
        set((state) => ({
          plans: [
            ...state.plans,
            {
              ...plan,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      toggleBookmark: (planId, questionId) =>
        set((state) => ({
          plans: state.plans.map((plan) =>
            plan.id === planId
              ? {
                  ...plan,
                  questions: plan.questions.map((q) =>
                    q.id === questionId ? { ...q, isBookmarked: !q.isBookmarked } : q
                  ),
                }
              : plan
          ),
        })),
    }),
    { name: 'study-plans' }
  )
); 