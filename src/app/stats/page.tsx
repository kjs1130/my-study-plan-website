'use client'

import { useAppStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function StatsPage() {
  const { todos, studyTime, addStudyTime, resetStudyTime } = useAppStore()

  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        addStudyTime(1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRunning, addStudyTime])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    const pad = (num: number) => num.toString().padStart(2, '0')
    return `${pad(h)}:${pad(m)}:${pad(s)}`
  }

  const handleStartTimer = () => {
    setIsRunning(true)
  }

  const handleStopTimer = () => {
    setIsRunning(false)
  }

  const handleResetTimer = () => {
    setIsRunning(false)
    resetStudyTime()
  }

  const calculateProgress = (priority: 'low' | 'high') => {
    const tasksByPriority = todos.filter(todo => todo.priority === priority)
    const completedTasks = tasksByPriority.filter(todo => todo.completed).length
    const totalTasks = tasksByPriority.length

    if (totalTasks === 0) {
      return 0
    }

    return (completedTasks / totalTasks) * 100
  }

  const highPriorityProgress = calculateProgress('high')
  const lowPriorityProgress = calculateProgress('low')

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-4">
          <Link href="/" passHref>
            <Button variant="ghost" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              메인 화면으로
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">학습 진행상황</h1>

        <Card className="mb-8 shadow-lg rounded-lg border border-gray-200">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-2xl font-semibold">학습 시간 측정</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6 py-6">
            <div className="text-6xl font-mono text-blue-600">
              {formatTime(studyTime)}
            </div>
            <div className="flex gap-4">
              {!isRunning ? (
                <Button onClick={handleStartTimer} className="px-8 py-3 text-lg">시작</Button>
              ) : (
                <Button onClick={handleStopTimer} variant="destructive" className="px-8 py-3 text-lg">정지</Button>
              )}
              <Button onClick={handleResetTimer} variant="outline" className="px-8 py-3 text-lg">초기화</Button>
            </div>
          </CardContent>
        </Card>


        <Card className="shadow-lg rounded-lg border border-gray-200">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-2xl font-semibold">할 일 완료율 (중요도별)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 py-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-base font-medium text-gray-700">높음 ({highPriorityProgress.toFixed(0)}%)</span>
                <span className="text-sm text-gray-500">{todos.filter(t => t.priority === 'high' && t.completed).length} / {todos.filter(t => t.priority === 'high').length}</span>
              </div>
              <Progress value={highPriorityProgress} className="w-full h-3 [&>*]:bg-red-500" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-base font-medium text-gray-700">낮음 ({lowPriorityProgress.toFixed(0)}%)</span>
                <span className="text-sm text-gray-500">{todos.filter(t => t.priority === 'low' && t.completed).length} / {todos.filter(t => t.priority === 'low').length}</span>
              </div>
              <Progress value={lowPriorityProgress} className="w-full h-3 [&>*]:bg-green-500" />
            </div>
          </CardContent>
        </Card>

        {/* TODO: 스터디 노트 관련 통계 등 추가 */}
      </div>
    </main>
  )
} 