import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardProps {
  userTotalScore: number;
}

export function Leaderboard({ userTotalScore }: LeaderboardProps) {
  const leaderboardData = [
    {
      rank: 1,
      name: 'Sarah Chen',
      title: 'Biology Master',
      score: 2485,
      gradient: 'from-orange-400 to-yellow-400'
    },
    {
      rank: 2,
      name: 'Alex Rodriguez',
      title: 'Chemistry Ace',
      score: 2240,
      gradient: 'from-gray-400 to-gray-500'
    },
    {
      rank: 3,
      name: 'Emma Johnson',
      title: 'Physics Pro',
      score: 1895,
      gradient: 'from-amber-600 to-amber-700'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5" />;
      case 2:
        return <Medal className="w-5 h-5" />;
      case 3:
        return <Award className="w-5 h-5" />;
      default:
        return <span className="text-sm font-bold">{rank}</span>;
    }
  };

  return (
    <Card className="p-6 sm:p-8">
      <CardContent>
        <h3 className="text-2xl font-bold mb-6 text-center">
          <Trophy className="studypal-orange mr-2 inline" />
          Leaderboard
        </h3>
        
        <div className="space-y-4">
          {leaderboardData.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center justify-between p-4 bg-gradient-to-r ${entry.gradient} rounded-xl text-white`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  {getRankIcon(entry.rank)}
                </div>
                <div>
                  <div className="font-semibold">{entry.name}</div>
                  <div className="text-sm opacity-90">{entry.title}</div>
                </div>
              </div>
              <div className="text-2xl font-bold">{entry.score.toLocaleString()}</div>
            </div>
          ))}
          
          {/* User's Position */}
          <div className="flex items-center justify-between p-4 bg-studypal-green/10 rounded-xl border-2 border-studypal-green">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-studypal-green rounded-full flex items-center justify-center font-bold text-white">
                4
              </div>
              <div>
                <div className="font-semibold studypal-green">You</div>
                <div className="text-sm text-muted-foreground">Keep studying!</div>
              </div>
            </div>
            <div className="text-2xl font-bold studypal-green">
              {userTotalScore.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
