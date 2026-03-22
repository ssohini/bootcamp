'use client';

interface PollData {
  id: string;
  question: string;
  options: string[];
  votes: number[];
}

interface PollProps {
  poll: PollData;
  onVote: (pollId: string, optionIndex: number) => void;
}

export default function Poll({ poll, onVote }: PollProps) {
  const totalVotes = poll.votes.reduce((sum, vote) => sum + vote, 0);

  const handleVote = (optionIndex: number) => {
    onVote(poll.id, optionIndex);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">{poll.question}</h3>

      <div className="space-y-3">
        {poll.options.map((option, index) => {
          const percentage = totalVotes > 0 ? (poll.votes[index] / totalVotes) * 100 : 0;

          return (
            <div key={index} className="flex items-center space-x-3">
              <button
                onClick={() => handleVote(index)}
                className="flex-1 text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                {option}
              </button>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {poll.votes[index]} ({percentage.toFixed(1)}%)
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Total votes: {totalVotes}
      </div>
    </div>
  );
}