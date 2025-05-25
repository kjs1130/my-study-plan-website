import { StudyPlan } from "@/features/plan/types";
import { Button } from "@/components/ui/button";

export function PlanCard({ plan }: { plan: StudyPlan }) {
  return (
    <div className="card">
      <h3>{plan.title}</h3>
      <p>{plan.summary}</p>
      <ul>
        {plan.questions.map((q) => (
          <li key={q.id}>
            {q.question}
            {q.isBookmarked && <span>★</span>}
          </li>
        ))}
      </ul>
      <Button>복습하기</Button>
    </div>
  );
} 