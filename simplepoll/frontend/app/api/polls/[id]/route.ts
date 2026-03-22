import { NextRequest, NextResponse } from 'next/server';

// Mock database
const polls: any = {
  '1': {
    id: '1',
    title: 'Best Programming Language?',
    description: 'Which programming language do you think is the best for building modern applications?',
    author: 'Dev Community',
    options: [
      { id: '1', text: 'TypeScript', votes: 524 },
      { id: '2', text: 'Python', votes: 398 },
      { id: '3', text: 'Go', votes: 189 },
      { id: '4', text: 'Rust', votes: 123 },
    ],
    totalVotes: 1234,
    createdAt: '2024-03-10',
    endsAt: '2024-03-20',
    verified: true,
    txHash: '0x1234567890abcdef',
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const poll = polls[id];

    if (!poll) {
      return NextResponse.json(
        { success: false, error: 'Poll not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: poll,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch poll' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const poll = polls[id];

    if (!poll) {
      return NextResponse.json(
        { success: false, error: 'Poll not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Record vote
    if (body.vote !== undefined && body.optionId !== undefined) {
      const optionIndex = poll.options.findIndex(
        (opt: any) => opt.id === body.optionId
      );

      if (optionIndex !== -1) {
        poll.options[optionIndex].votes += 1;
        poll.totalVotes += 1;
      }
    }

    return NextResponse.json({
      success: true,
      data: poll,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update poll' },
      { status: 500 }
    );
  }
}
