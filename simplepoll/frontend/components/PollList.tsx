'use client';

import Poll from './Poll';

interface PollData {
  id: string;
  question: string;
  options: string[];
  votes: number[];
}

interface PollListProps {
  polls: PollData[];
  onVote: (pollId: string, optionIndex: number) => void;
}

export default function PollList({ polls, onVote }: PollListProps) {
  if (polls.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No polls yet. Create your first poll above!
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Active Polls</h2>
      {polls.map((poll) => (
        <Poll key={poll.id} poll={poll} onVote={onVote} />
      ))}
    </div>
  );
}