import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { books, quotes } from './data';

export interface Study {
  id: string;
  title: string;
  content: string;
  summary: string;
  questions: Question[];
  createdAt: string;
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  isBookmarked: boolean;
}

export interface StudyPlan {
  id: string;
  title: string;
  content: string;
  summary: string;
  questions: {
    id: string;
    question: string;
    answer?: string;
    isBookmarked: boolean;
  }[];
  createdAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  tags: string[];
  emotions: string[];
  personalityTypes: string[];
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  emotion: string;
}

export interface UserPreferences {
  favoriteEmotions: string[];
  favoriteTags: string[];
  bookHistory: string[];
  personalityType: string | null;
}

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'high';
  createdAt: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  description?: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

interface AppState {
  // Todos
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  
  // Calendar
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  removeEvent: (id: string) => void;
  
  // Notes
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  removeNote: (id: string) => void;
  
  // Study Time Tracking
  studyTime: number;
  lastStudyDate: string | null;
  addStudyTime: (seconds: number) => void;
  resetStudyTime: () => void;
}

interface StudyStore {
  studies: Study[];
  activeStudyId: string | null;
  addStudy: (study: Omit<Study, 'id' | 'createdAt'>) => void;
  removeStudy: (id: string) => void;
  setActiveStudy: (id: string | null) => void;
  updateStudy: (id: string, study: Partial<Study>) => void;
  addAnswer: (studyId: string, questionId: string, answer: string) => void;
  toggleBookmark: (studyId: string, questionId: string) => void;
}

interface StudyPlanStore {
  plans: StudyPlan[];
  addPlan: (plan: Omit<StudyPlan, 'id' | 'createdAt'>) => void;
  updatePlan: (id: string, plan: Partial<StudyPlan>) => void;
  deletePlan: (id: string) => void;
  toggleBookmark: (planId: string, questionId: string) => void;
}

interface BookStore {
  books: Book[];
  quotes: Quote[];
  userPreferences: UserPreferences;
  addBookToHistory: (bookId: string) => void;
  updatePersonalityType: (type: string) => void;
  addFavoriteEmotion: (emotion: string) => void;
  addFavoriteTag: (tag: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => {
      return {
        // Todos
        todos: [],
        addTodo: (todo) => {
          const newTodo: Todo = {
            ...todo,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            completed: false,
          };
          set((state) => ({
            todos: [...state.todos, newTodo],
          }));

          // Add calendar event automatically
          const today = new Date().toISOString().split('T')[0];
          get().addEvent({
            title: newTodo.title,
            date: today,
            description: `중요도: ${newTodo.priority === 'high' ? '높음' : '낮음'}`,
            completed: newTodo.completed,
          });
        },
        toggleTodo: (id) =>
          set((state) => {
            const todoToToggle = state.todos.find(t => t.id === id);

            const updatedTodos = state.todos.map((t) =>
              t.id === id ? { ...t, completed: !t.completed } : t
            );

            if (todoToToggle) {
              const eventToUpdate = state.events.find(e =>
                e.title === todoToToggle.title &&
                e.date === new Date(todoToToggle.createdAt).toISOString().split('T')[0]
              );

              if (eventToUpdate) {
                get().updateEvent(eventToUpdate.id, { completed: !todoToToggle.completed });
              }
            }

            return { todos: updatedTodos };
          }),
        removeTodo: (id) =>
          set((state) => {
            const todoToRemove = state.todos.find(t => t.id === id);

            const filteredTodos = state.todos.filter((t) => t.id !== id);

            if (todoToRemove) {
              const eventToRemove = state.events.find(e =>
                e.title === todoToRemove.title &&
                e.date === new Date(todoToRemove.createdAt).toISOString().split('T')[0]
              );
              if (eventToRemove) {
                get().removeEvent(eventToRemove.id);
              }
            }

            return { todos: filteredTodos };
          }),

        // Calendar
        events: [],
        addEvent: (event) =>
          set((state) => ({
            events: [
              ...state.events,
              { ...event, id: crypto.randomUUID() },
            ],
          })),
        updateEvent: (id, event) =>
          set((state) => ({
            events: state.events.map((e) =>
              e.id === id ? { ...e, ...event } : e
            ),
          })),
        removeEvent: (id) =>
          set((state) => ({
            events: state.events.filter((e) => e.id !== id),
          })),

        // Notes
        notes: [],
        addNote: (note) =>
          set((state) => ({
            notes: [
              ...state.notes,
              {
                ...note,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          })),
        updateNote: (id, note) =>
          set((state) => ({
            notes: state.notes.map((n) =>
              n.id === id
                ? { ...n, ...note, updatedAt: new Date().toISOString() }
                : n
            ),
          })),
        removeNote: (id) =>
          set((state) => ({
            notes: state.notes.filter((n) => n.id !== id),
          })),

        // Study Time
        studyTime: 0,
        lastStudyDate: null,
        addStudyTime: (seconds) => {
          const today = new Date().toISOString().split('T')[0];
          set((state) => {
            const newStudyTime = state.lastStudyDate !== today ? seconds : state.studyTime + seconds;
            return {
              studyTime: newStudyTime,
              lastStudyDate: today,
            };
          });
        },
        resetStudyTime: () => set({ studyTime: 0, lastStudyDate: new Date().toISOString().split('T')[0] }),
      };
    },
    {
      name: 'study-planner-store',
    }
  )
);

export const useStudyStore = create<StudyStore>()(
  persist(
    (set) => ({
      studies: [],
      activeStudyId: null,
      addStudy: (newStudy) => 
        set((state) => ({
          studies: [
            ...state.studies,
            {
              ...newStudy,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      removeStudy: (id) =>
        set((state) => ({
          studies: state.studies.filter((study) => study.id !== id),
          activeStudyId: state.activeStudyId === id ? null : state.activeStudyId,
        })),
      setActiveStudy: (id) => set({ activeStudyId: id }),
      updateStudy: (id, updatedStudy) =>
        set((state) => ({
          studies: state.studies.map((study) =>
            study.id === id ? { ...study, ...updatedStudy } : study
          ),
        })),
      addAnswer: (studyId, questionId, answer) =>
        set((state) => ({
          studies: state.studies.map((study) =>
            study.id === studyId
              ? {
                  ...study,
                  questions: study.questions.map((q) =>
                    q.id === questionId ? { ...q, answer } : q
                  ),
                }
              : study
          ),
        })),
      toggleBookmark: (studyId, questionId) =>
        set((state) => ({
          studies: state.studies.map((study) =>
            study.id === studyId
              ? {
                  ...study,
                  questions: study.questions.map((q) =>
                    q.id === questionId
                      ? { ...q, isBookmarked: !q.isBookmarked }
                      : q
                  ),
                }
              : study
          ),
        })),
    }),
    {
      name: 'study-store',
    }
  )
);

export const useStudyPlanStore = create<StudyPlanStore>()(
  persist(
    (set) => ({
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
      updatePlan: (id, plan) =>
        set((state) => ({
          plans: state.plans.map((p) =>
            p.id === id ? { ...p, ...plan } : p
          ),
        })),
      deletePlan: (id) =>
        set((state) => ({
          plans: state.plans.filter((p) => p.id !== id),
        })),
      toggleBookmark: (planId, questionId) =>
        set((state) => ({
          plans: state.plans.map((plan) =>
            plan.id === planId
              ? {
                  ...plan,
                  questions: plan.questions.map((q) =>
                    q.id === questionId
                      ? { ...q, isBookmarked: !q.isBookmarked }
                      : q
                  ),
                }
              : plan
          ),
        })),
    }),
    {
      name: 'study-plans',
    }
  )
);

export const useBookStore = create<BookStore>()(
  persist(
    (set) => ({
      books,
      quotes,
      userPreferences: {
        favoriteEmotions: [],
        favoriteTags: [],
        bookHistory: [],
        personalityType: null,
      },
      addBookToHistory: (bookId) =>
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            bookHistory: [...state.userPreferences.bookHistory, bookId],
          },
        })),
      updatePersonalityType: (type) =>
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            personalityType: type,
          },
        })),
      addFavoriteEmotion: (emotion) =>
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            favoriteEmotions: [...state.userPreferences.favoriteEmotions, emotion],
          },
        })),
      addFavoriteTag: (tag) =>
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            favoriteTags: [...state.userPreferences.favoriteTags, tag],
          },
        })),
    }),
    {
      name: 'book-recommendations',
    }
  )
); 