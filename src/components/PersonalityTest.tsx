import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useBookStore } from "@/lib/store";

interface Question {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
  }[];
}

const questions: Question[] = [
  {
    id: "q1",
    text: "When choosing a new book, what do you value more?",
    options: [
      { value: "E", label: "Recommendations and reviews from others" },
      { value: "I", label: "My own interests and preferences" },
    ],
  },
  {
    id: "q2",
    text: "What type of content do you find more engaging?",
    options: [
      { value: "S", label: "Realistic and concrete details" },
      { value: "N", label: "Imaginative and creative concepts" },
    ],
  },
  {
    id: "q3",
    text: "How do you prefer to evaluate a book's content?",
    options: [
      { value: "T", label: "Logical and objective analysis" },
      { value: "F", label: "Emotional and subjective experience" },
    ],
  },
  {
    id: "q4",
    text: "How do you approach your reading schedule?",
    options: [
      { value: "J", label: "Structured and planned approach" },
      { value: "P", label: "Flexible and spontaneous approach" },
    ],
  },
];

interface PersonalityTestProps {
  onComplete: (type: string) => void;
}

export function PersonalityTest({ onComplete }: PersonalityTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { updatePersonalityType } = useBookStore();

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const personalityType = calculatePersonalityType();
      updatePersonalityType(personalityType);
      onComplete(personalityType);
    }
  };

  const calculatePersonalityType = () => {
    const counts: Record<string, number> = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    };

    Object.values(answers).forEach((answer) => {
      counts[answer]++;
    });

    return [
      counts.E > counts.I ? "E" : "I",
      counts.S > counts.N ? "S" : "N",
      counts.T > counts.F ? "T" : "F",
      counts.J > counts.P ? "J" : "P",
    ].join("");
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <div className="h-2 w-full rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-medium">{currentQ.text}</h3>
          <RadioGroup
            onValueChange={handleAnswer}
            className="space-y-4"
          >
            {currentQ.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${currentQ.id}-${option.value}`}
                />
                <Label htmlFor={`${currentQ.id}-${option.value}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
} 