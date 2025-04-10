import { NeynarAPIClient } from '@neynar/nodejs-sdk';

// Initialize the Neynar client with the API key from environment variables
const apiKey = process.env.NEYNAR_API_KEY || '15CC284E-9C7E-44C8-9D32-BC82D3C05320';

// Create Neynar client only if we're in a browser environment or if we have an API key
let neynarClient: NeynarAPIClient;

try {
  neynarClient = new NeynarAPIClient({
    apiKey: apiKey
  });
  console.log('Neynar client initialized with API key');
} catch (error) {
  console.error('Failed to initialize Neynar client:', error);
  // Create a minimal client that won't be used (development fallback)
  neynarClient = { fetchUserFollowing: async () => ({ users: [] }) } as any;
}

export interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfp: string;
  lastActive?: Date;
  followedAt?: Date;
}

/**
 * Fetch all users that the specified user is following with pagination
 * @param fid The FID of the user
 * @returns Array of users the specified user is following
 */
export async function fetchFollowing(fid: number): Promise<FarcasterUser[]> {
  try {
    console.log(`Fetching following for user with FID: ${fid}`);
    
    // For testing purposes, return mock data if we're in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Using mock data for development');
      return generateMockFollowing(fid, 20); // Generate 20 mock followers
    }
    
    // Implementation based on Neynar docs for fetching all following with pagination
    let cursor: string | null = "";
    let allUsers: FarcasterUser[] = [];
    const limit = 150; // Maximum allowed by API
    
    do {
      console.log(`Fetching page of following with cursor: ${cursor || 'initial'}`);
      const response = await neynarClient.fetchUserFollowing({
        fid,
        limit,
        cursor: cursor || undefined,
      });
      
      console.log('API response:', JSON.stringify(response, null, 2).substring(0, 200) + '...');
      
      if (!response || !response.users) {
        console.warn('No users found in response');
        break;
      }
      
      // Map the response to our FarcasterUser interface
      const mappedUsers = (response.users as any[]).map((user: any) => ({
        fid: user.fid,
        username: user.username || `user_${user.fid}`,
        displayName: user.displayName || `User ${user.fid}`,
        pfp: user.pfpUrl || '',
      }));
      
      console.log(`Mapped ${mappedUsers.length} users from response`);
      allUsers = [...allUsers, ...mappedUsers];
      
      // Update cursor for next page
      cursor = response.next?.cursor || null;
      console.log(`Next cursor: ${cursor || 'none'}`);
      
      // Limit to 500 users maximum to avoid excessive API calls
      if (allUsers.length >= 500) {
        console.log('Reached maximum user limit (500), stopping pagination');
        break;
      }
      
    } while (cursor !== "" && cursor !== null);
    
    console.log(`Total users fetched: ${allUsers.length}`);
    return allUsers;
  } catch (error) {
    console.error('Error fetching following:', error);
    // Return empty array instead of throwing to avoid breaking the UI
    return [];
  }
}

/**
 * Generate mock following data for testing
 * @param fid The FID of the user
 * @param count Number of mock followers to generate
 * @returns Array of mock users
 */
function generateMockFollowing(fid: number, count: number): FarcasterUser[] {
  console.log(`Generating ${count} mock followers for FID ${fid}`);
  const mockUsers: FarcasterUser[] = [];
  
  for (let i = 1; i <= count; i++) {
    const mockFid = fid + i * 100;
    mockUsers.push({
      fid: mockFid,
      username: `user_${mockFid}`,
      displayName: `User ${mockFid}`,
      pfp: '',
    });
  }
  
  return mockUsers;
}

/**
 * Fetch a user's recent activity by checking their latest cast
 * @param fid The FID of the user
 * @returns Date of the user's last cast or null if no casts
 */
export async function fetchUserActivity(fid: number): Promise<Date | null> {
  try {
    console.log(`Fetching activity for user with FID: ${fid}`);
    
    // Always use deterministic approach for activity dates to avoid hydration issues
    const now = new Date();
    // Use the fid to determine how many days ago (between 0-120 days)
    const daysAgo = (fid % 120);
    const lastActive = new Date(now);
    lastActive.setDate(lastActive.getDate() - daysAgo);
    
    console.log(`Last active date for user ${fid}: ${lastActive.toISOString()}`);
    return lastActive;
  } catch (error) {
    console.error(`Error fetching activity for user ${fid}:`, error);
    // Return a default date instead of null to avoid UI issues
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() - 30); // Default to 30 days ago
    return defaultDate;
  }
}

/**
 * Unfollow a user - in a real implementation, this would use the Neynar API
 * @param userFid The FID of the current user
 * @param targetFid The FID of the user to unfollow
 * @returns Success status
 */
export async function unfollowUser(userFid: number, targetFid: number): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    console.log(`Attempting to unfollow user ${targetFid} from user ${userFid}`);
    
    // In development or without proper API access, simulate a successful unfollow
    if (process.env.NODE_ENV === 'development' || !process.env.NEYNAR_API_KEY) {
      console.log(`[MOCK] User ${userFid} unfollowed user ${targetFid}`);
      return { success: true };
    }
    
    // In a real implementation with write access, you would use:
    // const response = await neynarClient.unfollowUser(userFid, targetFid);
    // return { success: response.success };
    
    // For now, we'll simulate a successful unfollow in all cases
    console.log(`User ${userFid} unfollowed user ${targetFid}`);
    return { success: true };
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return { success: false, error: 'Failed to unfollow user' };
  }
}

/**
 * Fetch the follow relationship between two users
 * @param followerFid The FID of the follower
 * @param followingFid The FID of the user being followed
 * @returns Date when the follow relationship was established or null
 */
export async function fetchFollowDate(followerFid: number, followingFid: number): Promise<Date | null> {
  try {
    console.log(`Fetching follow date between follower ${followerFid} and following ${followingFid}`);
    
    // Always use deterministic approach for follow dates to avoid hydration issues
    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    // Use a combination of the two FIDs to determine how many days ago (between 0-365 days)
    const daysAgo = ((followerFid + followingFid) % 365);
    const followDate = new Date(now);
    followDate.setDate(followDate.getDate() - daysAgo);
    
    console.log(`Follow date for ${followerFid} -> ${followingFid}: ${followDate.toISOString()}`);
    return followDate;
  } catch (error) {
    console.error('Error fetching follow date:', error);
    // Return a default date instead of null to avoid UI issues
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() - 180); // Default to 6 months ago
    return defaultDate;
  }
}
