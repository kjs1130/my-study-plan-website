'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotesPage() {
  const { notes, addNote, updateNote, removeNote } = useAppStore()
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
  })
  const [editingNote, setEditingNote] = useState<string | null>(null)

  const handleAddNote = () => {
    if (newNote.title.trim()) {
      addNote({
        title: newNote.title.trim(),
        content: newNote.content.trim(),
      })
      setNewNote({ title: '', content: '' })
    }
  }

  const handleUpdateNote = (id: string) => {
    const note = notes.find((n) => n.id === id)
    if (note) {
      updateNote(id, {
        title: note.title,
        content: note.content,
      })
      setEditingNote(null)
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

      <h1 className="text-4xl font-bold text-center mb-8">학습 노트</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>새로운 노트 작성</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
            />
            <Textarea
              placeholder="내용"
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
              className="min-h-[200px]"
            />
            <Button onClick={handleAddNote} className="w-full">
              노트 추가
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.length === 0 ? (
          <p className="text-center text-gray-500 col-span-2">
            작성된 노트가 없습니다.
          </p>
        ) : (
          notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  {editingNote === note.id ? (
                    <Input
                      value={note.title}
                      onChange={(e) =>
                        updateNote(note.id, { title: e.target.value })
                      }
                      className="flex-1 mr-2"
                    />
                  ) : (
                    <CardTitle>{note.title}</CardTitle>
                  )}
                  <div className="flex gap-2">
                    {editingNote === note.id ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateNote(note.id)}
                        >
                          저장
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingNote(null)}
                        >
                          취소
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingNote(note.id)}
                        >
                          수정
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNote(note.id)}
                        >
                          삭제
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {format(new Date(note.createdAt), 'yyyy년 MM월 dd일', {
                    locale: ko,
                  })}
                </p>
              </CardHeader>
              <CardContent>
                {editingNote === note.id ? (
                  <Textarea
                    value={note.content}
                    onChange={(e) =>
                      updateNote(note.id, { content: e.target.value })
                    }
                    className="min-h-[200px]"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{note.content}</p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  )
} 