"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TextSummarizer from "@/components/TextSummarizer";
import Link from "next/link";
import { BookOpen, PenTool, Notebook, CalendarDays, BarChart2, FileText, Lightbulb, GraduationCap, Feather } from 'lucide-react';

const motivationQuotes = [
  '시작이 반이다.',
  '포기하지 마라. 큰일도 작은 실천에서 시작된다.',
  '오늘의 노력이 내일의 나를 만든다.',
  '성공은 매일 반복되는 작은 노력의 결과다.',
  '지금 시작해도 늦지 않았다.',
  '당신의 한계는 당신이 정한 것이다.',
  '실패는 성공의 어머니다.',
  '꿈을 향해 한 걸음씩 나아가자.',
  '오늘 하루도 최선을 다하자.',
  '작은 진전도 소중하다.',
];

export default function Home() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)]);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl z-10 relative">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          나만의 학습 플랜
        </h1>

        <BookOpen size={70} className="absolute top-16 left-8 text-blue-400 opacity-70 rotate-12 hidden md:block" />
        <PenTool size={60} className="absolute top-36 right-8 text-green-500 opacity-70 -rotate-12 hidden md:block" />
        <Notebook size={80} className="absolute bottom-16 left-16 text-purple-400 opacity-70 -rotate-6 hidden md:block" />
        <CalendarDays size={75} className="absolute bottom-36 right-16 text-red-400 opacity-70 rotate-6 hidden md:block" />
        <FileText size={65} className="absolute top-1/3 left-[15%] text-yellow-500 opacity-70 rotate-45 hidden lg:block" />
        <BarChart2 size={65} className="absolute bottom-1/3 right-[15%] text-teal-500 opacity-70 -rotate-45 hidden lg:block" />
        <Lightbulb size={60} className="absolute top-1/4 right-[10%] text-orange-400 opacity-70 rotate-6 hidden md:block" />
        <GraduationCap size={70} className="absolute bottom-1/4 left-[10%] text-indigo-500 opacity-70 -rotate-6 hidden md:block" />
        <Feather size={55} className="absolute top-[45%] left-[5%] text-gray-500 opacity-70 rotate-3 hidden lg:block" />

        <Card className="mb-8 shadow-lg rounded-lg border border-gray-200 bg-white bg-opacity-80 backdrop-blur-sm z-10 relative">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-800">동기 부여</CardTitle>
          </CardHeader>
          <CardContent className="py-6">
            <p className="text-xl text-center italic text-gray-700">{quote}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 z-10 relative">
          <Link href="/calendar">
            <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                  <CalendarDays className="mr-3 text-blue-600" size={24} />
                  학습 일정 캘린더
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">학습 일정을 달력에서 관리하고 확인하세요.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/todos">
            <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                  <Notebook className="mr-3 text-green-600" size={24} />
                  할 일 리스트
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">학습 목표와 할 일을 체계적으로 관리하세요.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/stats">
            <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                  <BarChart2 className="mr-3 text-red-600" size={24} />
                  진행 상황 트래킹
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">학습 시간과 완료한 할 일을 시각적으로 확인하세요.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/notes">
            <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                  <FileText className="mr-3 text-purple-600" size={24} />
                  학습 노트
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">중요한 내용을 메모하고 정리하세요.</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-8">
          <TextSummarizer />
        </div>
      </div>
    </main>
  );
} 