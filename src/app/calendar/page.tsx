'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { format, parseISO, isDate } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CalendarPage() {
  const { events, addEvent, updateEvent, removeEvent } = useAppStore()
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd')
  )
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(parseISO(selectedDate));

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    try {
      const dateObj = parseISO(selectedDate);
      if (isDate(dateObj)) {
         setCalendarDate(dateObj);
      } else {
         const todayObj = new Date();
         setSelectedDate(format(todayObj, 'yyyy-MM-dd'));
         setCalendarDate(todayObj);
      }
    } catch (error) {
       console.error("Error parsing date:", error);
       const todayObj = new Date();
       setSelectedDate(format(todayObj, 'yyyy-MM-dd'));
       setCalendarDate(todayObj);
    }
  }, [selectedDate]);

  const handleAddEvent = () => {
    if (newEvent.title.trim()) {
      addEvent({
        title: newEvent.title.trim(),
        description: newEvent.description.trim(),
        date: selectedDate,
        completed: false,
      })
      setNewEvent({ title: '', description: '' })
    }
  }

  const getEventsForDate = (date: string) => {
    return events.filter(
      (event) =>
        event.date && format(parseISO(event.date), 'yyyy-MM-dd') === date
    )
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

      <h1 className="text-4xl font-bold text-center mb-8">학습 일정 캘린더</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>날짜 선택 및 달력</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full"
            />
            
            {calendarDate && isDate(calendarDate) && (
               <Calendar
                 mode="single"
                 selected={calendarDate}
                 onSelect={(date) => {
                    if (date) {
                      setCalendarDate(date);
                      setSelectedDate(format(date, 'yyyy-MM-dd'));
                    }
                 }}
                 initialFocus
                 locale={ko}
                 className="rounded-md border shadow w-full"
               />
            )}
           
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>새로운 일정 추가</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="일정 제목"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
                <Textarea
                  placeholder="일정 설명"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                />
                <Button onClick={handleAddEvent} className="w-full">
                  일정 추가
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {format(parseISO(selectedDate), 'yyyy년 MM월 dd일', {
                  locale: ko,
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getEventsForDate(selectedDate).length === 0 ? (
                  <p className="text-center text-gray-500">
                    예정된 일정이 없습니다.
                  </p>
                ) : (
                  getEventsForDate(selectedDate).map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        {event.description && (
                          <p className="text-sm text-gray-500">
                            {event.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            updateEvent(event.id, {
                              completed: !event.completed,
                            })
                          }
                        >
                          {event.completed ? '완료 취소' : '완료'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEvent(event.id)}
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
        </div>
      </div>
    </main>
  )
} 