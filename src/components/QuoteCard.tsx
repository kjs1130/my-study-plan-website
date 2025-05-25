import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookStore } from "@/lib/store";

interface QuoteCardProps {
  emotion: string;
}

export function QuoteCard({ emotion }: QuoteCardProps) {
  const { quotes } = useBookStore();
  
  const relevantQuotes = quotes.filter(quote => quote.emotion === emotion);
  
  if (relevantQuotes.length === 0) {
    return null;
  }

  const randomQuote = relevantQuotes[Math.floor(Math.random() * relevantQuotes.length)];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Quote for your mood</CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="space-y-2">
          <p className="text-lg italic">"{randomQuote.text}"</p>
          <p className="text-sm text-muted-foreground">- {randomQuote.author}</p>
        </blockquote>
      </CardContent>
    </Card>
  );
} 