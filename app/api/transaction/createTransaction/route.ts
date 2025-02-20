import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Your transaction creation logic here
    return NextResponse.json({ message: 'Transaction created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}

// If you need other HTTP methods, export them like this:
export async function GET(request: Request) {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}