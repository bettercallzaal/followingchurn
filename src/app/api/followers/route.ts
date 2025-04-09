import { NextRequest, NextResponse } from 'next/server';
import { fetchFollowing, fetchUserActivity, fetchFollowDate } from '~/lib/neynarService';

export async function GET(request: NextRequest) {
  try {
    // Get parameters from query
    const searchParams = request.nextUrl.searchParams;
    const fidParam = searchParams.get('fid');
    const inactivityParam = searchParams.get('inactivity') || '30';
    
    if (!fidParam) {
      return NextResponse.json(
        { error: 'FID parameter required' },
        { status: 400 }
      );
    }
    
    const userFid = parseInt(fidParam);
    const inactivityDays = parseInt(inactivityParam);
    
    // Fetch the user's following list
    const following = await fetchFollowing(userFid);
    
    // For each user, fetch their activity and follow date
    const followersWithActivity = await Promise.all(
      following.map(async (user) => {
        // Get the user's last activity date
        const lastActive = await fetchUserActivity(user.fid);
        
        // Get when the current user followed this user
        const followedAt = await fetchFollowDate(userFid, user.fid);
        
        return {
          ...user,
          lastActive: lastActive || new Date(0), // Use epoch if no activity
          followedAt: followedAt || new Date(0), // Use epoch if no follow date
        };
      })
    );
    
    // Filter users who haven't been active for the specified number of days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - inactivityDays);
    
    const inactiveFollowers = followersWithActivity.filter(
      (user) => user.lastActive < cutoffDate
    );
    
    return NextResponse.json({ followers: inactiveFollowers });
  } catch (error) {
    console.error('Error fetching followers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch followers' },
      { status: 500 }
    );
  }
}
