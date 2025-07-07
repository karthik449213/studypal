import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '@/components/theme-provider';
import { Flashcard } from '@/components/flashcard';
import { Quiz } from '@/components/quiz';
import { Leaderboard } from '@/components/leaderboard';
import { useToast } from '@/hooks/use-toast';
import { Brain, Moon, Sun, WandSparkles, Play, IdCard, Gamepad2, Copy, Download, Flame, Lightbulb } from 'lucide-react';

interface FlashcardData {
  front: string;
  back: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'flashcard' | 'quiz'>('flashcard');
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [userTotalScore, setUserTotalScore] = useState(0);

  // Demo data
  const demoFlashcards: FlashcardData[] = [
    {
      front: "What is photosynthesis?",
      back: "The process by which plants convert sunlight, water, and carbon dioxide into glucose and oxygen"
    },
    {
      front: "What is the powerhouse of the cell?",
      back: "The mitochondria - it produces ATP energy for cellular processes"
    },
    {
      front: "At what temperature does water boil at sea level?",
      back: "100°C or 212°F at standard atmospheric pressure"
    },
    {
      front: "What is the formula for photosynthesis?",
      back: "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂"
    },
    {
      front: "What are the three states of matter?",
      back: "Solid, liquid, and gas (plasma is the fourth state)"
    }
  ];

  const demoQuizQuestions: QuizQuestion[] = [
    {
      question: "What is photosynthesis?",
      options: [
        "The process of cellular respiration",
        "The process by which plants convert sunlight into energy",
        "The process of protein synthesis",
        "The process of DNA replication"
      ],
      correct: 1
    },
    {
      question: "What is the powerhouse of the cell?",
      options: [
        "Nucleus",
        "Ribosome",
        "Mitochondria",
        "Endoplasmic reticulum"
      ],
      correct: 2
    },
    {
      question: "At what temperature does water boil at sea level?",
      options: [
        "90°C",
        "100°C",
        "110°C",
        "120°C"
      ],
      correct: 1
    },
    {
      question: "What gas do plants release during photosynthesis?",
      options: [
        "Carbon dioxide",
        "Nitrogen",
        "Oxygen",
        "Hydrogen"
      ],
      correct: 2
    },
    {
      question: "What are the three main states of matter?",
      options: [
        "Solid, liquid, gas",
        "Hot, cold, warm",
        "Big, medium, small",
        "Fast, slow, still"
      ],
      correct: 0
    }
  ];

  // Load scores from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('studypal-high-score');
    const savedTotalScore = localStorage.getItem('studypal-total-score');
    
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    if (savedTotalScore) {
      setUserTotalScore(parseInt(savedTotalScore));
    }
  }, []);

  // Save scores to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studypal-high-score', highScore.toString());
    localStorage.setItem('studypal-total-score', userTotalScore.toString());
  }, [highScore, userTotalScore]);

  const handleGenerateFlashcards = async () => {
    if (!notes.trim()) {
      toast({
        title: "No notes provided",
        description: "Please enter some notes first!",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // TODO: Replace with actual OpenAI API call
    // Simulate AI processing
    setTimeout(() => {
      setFlashcards(demoFlashcards);
      setQuizQuestions(demoQuizQuestions);
      setIsLoading(false);
      setMode('flashcard');
      toast({
        title: "Flashcards generated!",
        description: "Your notes have been converted into flashcards."
      });
    }, 2000);
  };

  const handleLoadDemo = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setFlashcards(demoFlashcards);
      setQuizQuestions(demoQuizQuestions);
      setIsLoading(false);
      setMode('flashcard');
      toast({
        title: "Demo loaded!",
        description: "Sample flashcards and quiz questions are ready."
      });
    }, 1000);
  };

  const handleScoreUpdate = (points: number) => {
    setCurrentScore(prev => prev + points);
  };

  const handleQuizComplete = (finalScore: number) => {
    if (finalScore > highScore) {
      setHighScore(finalScore);
      toast({
        title: "New High Score! 🎉",
        description: `You scored ${finalScore} points!`
      });
    }
    
    setUserTotalScore(prev => prev + finalScore);
  };

  const handleCopyFlashcards = async () => {
    if (flashcards.length === 0) {
      toast({
        title: "No flashcards to copy",
        description: "Please generate flashcards first!",
        variant: "destructive"
      });
      return;
    }

    const flashcardText = flashcards.map((card, index) => 
      `${index + 1}. Q: ${card.front}\n   A: ${card.back}`
    ).join('\n\n');

    try {
      await navigator.clipboard.writeText(flashcardText);
      toast({
        title: "Flashcards copied!",
        description: "Flashcards have been copied to your clipboard."
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy flashcards to clipboard.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadFlashcards = () => {
    if (flashcards.length === 0) {
      toast({
        title: "No flashcards to download",
        description: "Please generate flashcards first!",
        variant: "destructive"
      });
      return;
    }

    const flashcardText = flashcards.map((card, index) => 
      `${index + 1}. Q: ${card.front}\n   A: ${card.back}`
    ).join('\n\n');

    const blob = new Blob([flashcardText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'studypal-flashcards.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-studypal-dark text-gray-900 dark:text-white transition-colors duration-300">
      {/* Ad Zone - Top */}
      <div className="w-full h-16 bg-gray-200 dark:bg-studypal-dark-card border-b border-gray-300 dark:border-gray-700 flex items-center justify-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          📢 Advertisement Space
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-studypal-dark-card shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Brain className="text-2xl studypal-green mr-3" />
                <h1 className="text-xl font-bold studypal-green">StudyPal</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Score Display */}
              <div className="hidden sm:flex items-center bg-studypal-green/10 px-3 py-1 rounded-full">
                <span className="studypal-orange mr-2">🏆</span>
                <span className="font-semibold">{currentScore}</span>
              </div>
              
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2 rounded-lg"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="gradient-bg rounded-2xl p-8 sm:p-12 text-white mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Transform Notes into Learning Games! 🎯</h2>
            <p className="text-lg sm:text-xl mb-6 opacity-90">Turn your study notes into interactive flashcards and quiz games with AI magic</p>
            
            {/* Beat Your Score CTA */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6 inline-block">
              <div className="flex items-center justify-center space-x-2">
                <Flame className="studypal-orange text-2xl animate-pulse-slow" />
                <span className="text-lg font-semibold">Beat Your Score!</span>
                <span className="bg-studypal-orange px-2 py-1 rounded-full text-sm font-bold">{highScore}</span>
              </div>
            </div>
            
            {/* Mobile Score Display */}
            <div className="sm:hidden bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-4 inline-block">
              <div className="flex items-center space-x-2">
                <span className="studypal-orange">🏆</span>
                <span>Current Score: <span className="font-bold">{currentScore}</span></span>
              </div>
            </div>
          </div>
        </section>

        {/* Notes Input Section */}
        <section className="mb-12">
          <Card className="p-6 sm:p-8">
            <CardContent>
              <h3 className="text-2xl font-bold mb-6 text-center">
                <span className="studypal-blue mr-2">📝</span>
                Paste Your Notes
              </h3>
              
              <div className="mb-6">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Paste your study notes here... 

Example: 
- Photosynthesis is the process by which plants convert sunlight into energy
- The mitochondria is the powerhouse of the cell
- Water boils at 100°C at sea level"
                  className="w-full h-48 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-studypal-green focus:outline-none resize-none"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleGenerateFlashcards}
                  disabled={isLoading}
                  className="flex-1 bg-studypal-green hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl"
                >
                  <WandSparkles className="mr-2 h-4 w-4" />
                  Generate Flashcards
                </Button>
                
                <Button 
                  onClick={handleLoadDemo}
                  disabled={isLoading}
                  className="bg-studypal-blue hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Load Demo
                </Button>
              </div>
              
              {/* Loading State */}
              {isLoading && (
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-studypal-green"></div>
                    <span className="studypal-green font-semibold">AI is processing your notes...</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Mode Toggle */}
        {flashcards.length > 0 && (
          <section className="mb-8">
            <div className="flex justify-center">
              <div className="bg-white dark:bg-studypal-dark-card rounded-2xl shadow-lg p-2 inline-flex">
                <Button
                  onClick={() => setMode('flashcard')}
                  variant={mode === 'flashcard' ? 'default' : 'ghost'}
                  className={mode === 'flashcard' ? 'bg-studypal-green text-white' : 'text-gray-600 dark:text-gray-400'}
                >
                  <IdCard className="mr-2 h-4 w-4" />
                  Flashcards
                </Button>
                <Button
                  onClick={() => setMode('quiz')}
                  variant={mode === 'quiz' ? 'default' : 'ghost'}
                  className={mode === 'quiz' ? 'bg-studypal-green text-white' : 'text-gray-600 dark:text-gray-400'}
                >
                  <Gamepad2 className="mr-2 h-4 w-4" />
                  Quiz Mode
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Flashcards Section */}
        {mode === 'flashcard' && flashcards.length > 0 && (
          <section className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Your Flashcards</h3>
              <div className="flex justify-center space-x-4 mb-6">
                <Button
                  onClick={handleCopyFlashcards}
                  className="bg-studypal-purple hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button
                  onClick={handleDownloadFlashcards}
                  className="bg-studypal-orange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashcards.map((card, index) => (
                <Flashcard
                  key={index}
                  front={card.front}
                  back={card.back}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}

        {/* Quiz Section */}
        {mode === 'quiz' && quizQuestions.length > 0 && (
          <section className="mb-12">
            <Quiz
              questions={quizQuestions}
              onScoreUpdate={handleScoreUpdate}
              onQuizComplete={handleQuizComplete}
            />
          </section>
        )}

        {/* Leaderboard */}
        <section className="mb-12">
          <Leaderboard userTotalScore={userTotalScore} />
        </section>

        {/* Study Tips */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-studypal-purple to-studypal-blue rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">
              <Lightbulb className="mr-2 inline" />
              Study Tips
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">🧠</div>
                <h4 className="font-semibold mb-2">Spaced Repetition</h4>
                <p className="text-sm opacity-90">Review flashcards at increasing intervals for better retention</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-semibold mb-2">Active Recall</h4>
                <p className="text-sm opacity-90">Test yourself frequently instead of just re-reading notes</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-semibold mb-2">Focus Sessions</h4>
                <p className="text-sm opacity-90">Study in 25-minute focused sessions with short breaks</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-studypal-dark-card border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Brain className="text-2xl studypal-green mr-3" />
              <span className="text-xl font-bold studypal-green">StudyPal</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Making studying fun and effective with AI-powered learning tools</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-studypal-green transition-colors">
                🐦
              </a>
              <a href="#" className="text-gray-400 hover:text-studypal-green transition-colors">
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-studypal-green transition-colors">
                📷
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Ad Zone - Bottom */}
      <div className="w-full h-20 bg-gray-200 dark:bg-studypal-dark-card border-t border-gray-300 dark:border-gray-700 flex items-center justify-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          📢 Advertisement Space
        </span>
      </div>
    </div>
  );
}
