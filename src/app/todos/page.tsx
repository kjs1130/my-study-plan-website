'use client'

import { useState } from 'react'
import { useAppStore, Todo } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TodosPage() {
  const { todos, addTodo, toggleTodo, removeTodo } = useAppStore()
  const [newTodo, setNewTodo] = useState('')
  const [priority, setPriority] = useState<'low' | 'high'>('low')

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo({
        title: newTodo.trim(),
        priority,
      })
      setNewTodo('')
      setPriority('low')
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-4">
        <Link href="/" passHref>
          <Button variant="ghost" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            메인 화면으로
          </Button>
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-center mb-8">할 일 리스트</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>새로운 할 일 추가</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="할 일을 입력하세요"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            />
            <div className="flex gap-2">
              <Button
                variant={priority === 'high' ? 'default' : 'outline'}
                onClick={() => setPriority('high')}
                className="flex-1"
              >
                중요도: 높음
              </Button>
              <Button
                variant={priority === 'low' ? 'default' : 'outline'}
                onClick={() => setPriority('low')}
                className="flex-1"
              >
                중요도: 낮음
              </Button>
            </div>
            <Button onClick={handleAddTodo} className="w-full">
              추가
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>할 일 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500">할 일이 없습니다.</p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`${
                        todo.completed ? 'line-through text-gray-500' : ''
                      }`}
                    >
                      {todo.title}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        todo.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      중요도: {todo.priority === 'high' ? '높음' : '낮음'}
                    </span>
                  </div>
                  <div>
                    {!todo.completed && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleTodo(todo.id)}
                        className="mr-2"
                      >
                        완료
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTodo(todo.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  )
} 