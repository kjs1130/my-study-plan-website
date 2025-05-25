"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function TextSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError("텍스트를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary("");

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ text: text.trim() })
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("서버에서 잘못된 응답을 받았습니다.");
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "요약을 생성하는 중 오류가 발생했습니다.");
      }

      if (!data.summary) {
        throw new Error("요약을 생성할 수 없습니다.");
      }

      setSummary(data.summary);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>AI 텍스트 요약</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="요약할 텍스트를 입력하세요..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px]"
            />
            <Button
              onClick={handleSummarize}
              disabled={isLoading || !text.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  요약 중...
                </>
              ) : (
                "요약하기"
              )}
            </Button>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600 font-medium">오류 발생</p>
                <p className="text-sm text-red-500 mt-1">{error}</p>
              </div>
            )}
            {summary && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <h3 className="font-semibold mb-2 text-green-800">요약 결과:</h3>
                <p className="text-gray-700">{summary}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 