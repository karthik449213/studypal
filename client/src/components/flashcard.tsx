import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FlashcardProps {
  front: string;
  back: string;
  index: number;
}

export function Flashcard({ front, back, index }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flip-card h-64 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`flip-card-inner h-full ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front h-full">
          <Card className="h-full border-2 border-studypal-green">
            <CardContent className="h-full flex flex-col justify-center items-center p-6">
              <div className="text-sm studypal-green font-semibold mb-2">Question {index + 1}</div>
              <div className="text-lg font-semibold text-center">{front}</div>
              <div className="mt-4 text-sm text-muted-foreground">Click to reveal answer</div>
            </CardContent>
          </Card>
        </div>
        <div className="flip-card-back h-full">
          <Card className="h-full bg-studypal-green text-white border-studypal-green">
            <CardContent className="h-full flex flex-col justify-center items-center p-6">
              <div className="text-sm mb-2 opacity-90">Answer</div>
              <div className="text-lg font-semibold text-center">{back}</div>
              <div className="mt-4 text-sm opacity-80">Click to see question</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
