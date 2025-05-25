"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePlanStore } from "@/features/plan/store";
import { Button } from "@/components/ui/button";

const schema = z.object({
  title: z.string().min(1, "제목을 입력하세요"),
  content: z.string().min(1, "학습 내용을 입력하세요"),
});

export function PlanForm() {
  const { addPlan } = usePlanStore();
  const form = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data: any) => {
    // TODO: AI 요약/질문 생성 API 연동
    addPlan({
      title: data.title,
      content: data.content,
      summary: data.content.slice(0, 100) + "...",
      questions: [
        { id: "q1", question: "예시 질문1", isBookmarked: false },
        { id: "q2", question: "예시 질문2", isBookmarked: false },
      ],
    });
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <input {...form.register("title")} placeholder="학습 제목" className="input" />
      <textarea {...form.register("content")} placeholder="학습 내용" className="textarea" />
      <Button type="submit">플랜 생성</Button>
    </form>
  );
} 