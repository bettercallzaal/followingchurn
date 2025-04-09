import { NextRequest, NextResponse } from 'next/server';
import { unfollowUser } from '~/lib/neynarService';

export async function POST(request: NextRequest) {
  try {
    // Get the user FID and target FID from the request body
    const body = await request.json();
    const { targetFid, userFid } = body;
    
    if (!userFid) {
      return NextResponse.json(
        { error: 'User FID is required' },
        { status: 400 }
      );
    }
    
    if (!targetFid) {
      return NextResponse.json(
        { error: 'Target FID is required' },
        { status: 400 }
      );
    }
    
    // Unfollow the target user
    const success = await unfollowUser(userFid, targetFid);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to unfollow user' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return NextResponse.json(
      { error: 'Failed to unfollow user' },
      { status: 500 }
    );
  }
}
