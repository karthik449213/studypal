import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface QuizProps {
  questions: QuizQuestion[];
  onScoreUpdate: (score: number) => void;
  onQuizComplete: (finalScore: number) => void;
}

export function Quiz({ questions, onScoreUpdate, onQuizComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correct;
    let newScore = quizScore;

    if (isCorrect) {
      newScore = quizScore + 100;
      setQuizScore(newScore);
      onScoreUpdate(100);
    }

    if (isLastQuestion) {
      setShowResults(true);
      onQuizComplete(newScore);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setShowResults(false);
  };

  const getScoreMessage = (score: number) => {
    if (score === 0) return 'Keep practicing! 💪';
    if (score <= 200) return 'Good effort! Try again! 📚';
    if (score <= 400) return 'Well done! 👏';
    return 'Excellent work! 🌟';
  };

  if (showResults) {
    return (
      <Card className="p-6 sm:p-8">
        <CardContent className="text-center">
          <div className="gradient-bg rounded-xl p-8 text-white mb-6">
            <h4 className="text-2xl font-bold mb-4">Quiz Complete! 🎉</h4>
            <div className="text-4xl font-bold mb-2">{quizScore}</div>
            <div className="text-lg opacity-90">{getScoreMessage(quizScore)}</div>
          </div>
          
          <Button 
            onClick={handleRestartQuiz}
            className="bg-studypal-blue hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl"
          >
            <i className="fas fa-redo mr-2"></i>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <CardContent>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Quiz Time! 🎮</h3>
          <div className="flex justify-center items-center space-x-4 mb-4">
            <div className="bg-studypal-green/10 px-4 py-2 rounded-full">
              <span className="studypal-green font-semibold">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
            <div className="bg-studypal-blue/10 px-4 py-2 rounded-full">
              <span className="studypal-blue font-semibold">
                Score: {quizScore}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <Card className="bg-muted p-6 mb-6">
            <h4 className="text-xl font-semibold mb-4">{currentQuestion.question}</h4>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedAnswer === index
                      ? 'border-studypal-blue bg-studypal-blue/10'
                      : 'border-border hover:border-studypal-blue'
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-muted-foreground mr-3 flex items-center justify-center">
                      {selectedAnswer === index && (
                        <div className="w-3 h-3 rounded-full bg-studypal-blue"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="bg-studypal-green hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-xl disabled:opacity-50"
            >
              {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
