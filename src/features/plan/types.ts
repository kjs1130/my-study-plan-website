export interface StudyPlan {
  id: string;
  title: string;
  content: string;
  summary: string;
  questions: { id: string; question: string; answer?: string; isBookmarked: boolean }[];
  createdAt: string;
} 