import { NextRequest, NextResponse } from 'next/server';

// Mock database - in real app, use actual database
let polls: any[] = [];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: polls,
      count: polls.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch polls' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newPoll = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description,
      author: body.author || 'Anonymous',
      options: body.options,
      votes: new Array(body.options.length).fill(0),
      totalVotes: 0,
      createdAt: new Date().toISOString(),
      endsAt: new Date(Date.now() + body.duration * 24 * 60 * 60 * 1000).toISOString(),
      verified: false,
      txHash: null,
    };

    polls.push(newPoll);

    return NextResponse.json(
      { success: true, data: newPoll },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create poll' },
      { status: 500 }
    );
  }
}
