"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { formatDistanceToNow } from "date-fns";
import { useFarcasterUser } from "~/hooks/useFarcasterUser";

// Types for our followers
interface Follower {
  fid: number;
  username: string;
  displayName: string;
  pfp: string;
  lastActive: Date;
  followedAt: Date;
}

export default function InactiveFollowers() {
  const user = useFarcasterUser();
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [filteredFollowers, setFilteredFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inactivityFilter, setInactivityFilter] = useState("30");
  const [sortBy, setSortBy] = useState("lastActive");
  const [unfollowingFid, setUnfollowingFid] = useState<number | null>(null);

  // Fetch followers when authenticated via Farcaster
  useEffect(() => {
    if (user.isAuthenticated && user.fid) {
      fetchFollowers();
    }
  }, [user.isAuthenticated, user.fid]);

  // Filter and sort followers when filters change
  useEffect(() => {
    if (followers.length > 0) {
      filterAndSortFollowers();
    }
  }, [followers, inactivityFilter, sortBy]);

  // Fetch followers from Farcaster API
  const fetchFollowers = useCallback(async () => {
    if (!user.fid) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Call our API endpoint to fetch inactive followers using the FID from the Frame context
      const response = await fetch(`/api/followers?inactivity=${inactivityFilter}&fid=${user.fid}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch followers');
      }
      
      const data = await response.json();
      
      // Convert string dates to Date objects
      const followersWithDates = data.followers.map((follower: any) => ({
        ...follower,
        lastActive: new Date(follower.lastActive),
        followedAt: new Date(follower.followedAt),
      }));
      
      setFollowers(followersWithDates);
    } catch (err) {
      setError("Failed to fetch followers. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [inactivityFilter, user.fid]);

  // Filter and sort followers based on current filters
  const filterAndSortFollowers = useCallback(() => {
    const daysAgo = parseInt(inactivityFilter);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
    
    // Filter by inactivity
    let filtered = followers.filter(follower => follower.lastActive < cutoffDate);
    
    // Sort by selected method
    if (sortBy === "lastActive") {
      filtered = filtered.sort((a, b) => a.lastActive.getTime() - b.lastActive.getTime());
    } else if (sortBy === "oldest") {
      filtered = filtered.sort((a, b) => a.followedAt.getTime() - b.followedAt.getTime());
    }
    
    setFilteredFollowers(filtered);
  }, [followers, inactivityFilter, sortBy]);

  // Unfollow a user
  const unfollowUser = useCallback(async (fid: number) => {
    if (!user.fid) return;
    
    setUnfollowingFid(fid);
    
    try {
      // Call our API endpoint to unfollow the user with the current user's FID
      const response = await fetch('/api/unfollow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          targetFid: fid,
          userFid: user.fid 
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to unfollow user');
      }
      
      // Remove from list
      setFollowers(prev => prev.filter(f => f.fid !== fid));
    } catch (err) {
      setError("Failed to unfollow user. Please try again.");
      console.error(err);
    } finally {
      setUnfollowingFid(null);
    }
  }, [user.fid]);

  if (user.isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center py-10">
        <h2 className="text-xl font-semibold mb-4">Loading your Farcaster profile...</h2>
        <p className="text-gray-500">Please wait while we connect to Farcaster.</p>
      </div>
    );
  }
  
  if (!user.isAuthenticated) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center py-10">
        <h2 className="text-xl font-semibold mb-4">Welcome to Inactive Followers Detector</h2>
        <p className="text-gray-500 mb-4">This app works best within the Farcaster ecosystem.</p>
        <p className="text-gray-500">Please make sure you're using this app within Farcaster.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Label htmlFor="inactivity-filter" className="block mb-2">Inactivity Period</Label>
          <select
            id="inactivity-filter"
            className="w-full sm:w-[180px] p-2 border rounded-md"
            value={inactivityFilter}
            onChange={(e) => setInactivityFilter(e.target.value)}
          >
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="sort-by" className="block mb-2">Sort By</Label>
          <select
            id="sort-by"
            className="w-full sm:w-[180px] p-2 border rounded-md"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="lastActive">Most Inactive First</option>
            <option value="oldest">Oldest Following First</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-full p-4 border rounded-md shadow-sm">
              <div className="flex items-center gap-4 pb-2">
                <div className="h-12 w-12 rounded-full bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-4 w-[150px] bg-gray-200 rounded" />
                  <div className="h-4 w-[100px] bg-gray-200 rounded" />
                </div>
              </div>
              <div className="mt-2">
                <div className="h-4 w-[200px] bg-gray-200 rounded mb-2" />
              </div>
              <div className="mt-4">
                <div className="h-10 w-[100px] bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-500 rounded-md">
          {error}
          <Button onClick={fetchFollowers} className="mt-2">
            Retry
          </Button>
        </div>
      ) : filteredFollowers.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium">No inactive followers found</h3>
          <p className="text-gray-500 mt-2">
            All your followers have been active within the last {inactivityFilter} days.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Found {filteredFollowers.length} inactive followers
          </p>
          
          {filteredFollowers.map((follower) => (
            <div key={follower.fid} className="w-full p-4 border rounded-md shadow-sm">
              <div className="flex items-center gap-4 pb-2">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                  {follower.displayName.substring(0, 2)}
                </div>
                <div>
                  <h3 className="text-base font-medium">{follower.displayName}</h3>
                  <p className="text-sm text-gray-500">@{follower.username}</p>
                </div>
              </div>
              <div className="mt-2 text-sm space-y-1">
                <p>Last active: {typeof window !== 'undefined' ? `${formatDistanceToNow(follower.lastActive)} ago` : 'Loading...'}</p>
                <p>Following since: {typeof window !== 'undefined' ? `${formatDistanceToNow(follower.followedAt)} ago` : 'Loading...'}</p>
              </div>
              <div className="mt-4">
                <Button 
                  onClick={() => unfollowUser(follower.fid)}
                  disabled={unfollowingFid === follower.fid}
                >
                  {unfollowingFid === follower.fid ? "Unfollowing..." : "Unfollow"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
