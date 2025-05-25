import { Button } from "@/components/ui/button"
import { useBookStore } from "@/lib/store"

const emotions = [
  "Happy",
  "Sad",
  "Excited",
  "Anxious",
  "Calm",
  "Angry",
  "Inspired",
  "Stressed",
  "Nostalgic",
  "Hopeful",
]

interface EmotionSelectorProps {
  onSelect: (emotion: string) => void
  selectedEmotion: string | null
}

export function EmotionSelector({ onSelect, selectedEmotion }: EmotionSelectorProps) {
  const { addFavoriteEmotion } = useBookStore()

  const handleEmotionClick = (emotion: string) => {
    onSelect(emotion)
    addFavoriteEmotion(emotion)
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {emotions.map((emotion) => (
        <Button
          key={emotion}
          variant={selectedEmotion === emotion ? "default" : "outline"}
          onClick={() => handleEmotionClick(emotion)}
          className="h-24 text-lg font-medium"
        >
          {emotion}
        </Button>
      ))}
    </div>
  )
} 