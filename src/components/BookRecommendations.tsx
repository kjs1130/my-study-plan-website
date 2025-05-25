import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookStore } from "@/lib/store";
import Image from "next/image";

interface BookRecommendationsProps {
  emotion: string | null;
  personalityType: string | null;
}

export function BookRecommendations({ emotion, personalityType }: BookRecommendationsProps) {
  const { books, addBookToHistory } = useBookStore();

  console.log('Current emotion:', emotion);
  console.log('Current personality type:', personalityType);
  console.log('Total books available:', books.length);

  const recommendedBooks = books.filter((book) => {
    // Convert everything to lowercase for case-insensitive comparison
    const bookEmotions = book.emotions.map(e => e.toLowerCase());
    const bookPersonalityTypes = book.personalityTypes.map(p => p.toLowerCase());
    const currentEmotion = emotion?.toLowerCase() || '';
    const currentPersonalityType = personalityType?.toLowerCase() || '';

    const matchesEmotion = emotion ? bookEmotions.includes(currentEmotion) : true;
    const matchesPersonality = personalityType
      ? bookPersonalityTypes.includes(currentPersonalityType)
      : true;

    console.log('Checking book:', book.title);
    console.log('Book emotions:', bookEmotions);
    console.log('Book personality types:', bookPersonalityTypes);
    console.log('Current emotion:', currentEmotion);
    console.log('Current personality type:', currentPersonalityType);
    console.log('Matches emotion:', matchesEmotion);
    console.log('Matches personality:', matchesPersonality);

    return matchesEmotion && matchesPersonality;
  });

  console.log('Recommended books count:', recommendedBooks.length);
  console.log('Recommended books:', recommendedBooks.map(b => b.title));

  if (recommendedBooks.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No books found matching your criteria.</p>
        <p className="mt-2 text-sm">
          Selected emotion: {emotion || 'None'}<br />
          Selected personality type: {personalityType || 'None'}<br />
          Available emotions: {books.flatMap(b => b.emotions).filter((v, i, a) => a.indexOf(v) === i).join(', ')}<br />
          Available personality types: {books.flatMap(b => b.personalityTypes).filter((v, i, a) => a.indexOf(v) === i).join(', ')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recommended Books</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommendedBooks.map((book) => (
          <Card key={book.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2 text-lg">{book.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{book.author}</p>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm">{book.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {book.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 