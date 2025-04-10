'use client';

import { useEffect, useState } from 'react';
import { useFrame } from '~/components/providers/FrameProvider';
import sdk from '@farcaster/frame-sdk';

export interface FarcasterUser {
  fid?: number;
  username?: string;
  displayName?: string;
  pfp?: string;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useFarcasterUser(): FarcasterUser {
  const { isSDKLoaded } = useFrame();
  const [user, setUser] = useState<FarcasterUser>({
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        // Wait for the SDK context to be available
        const sdkContext = await sdk.context;
        
        // Check if we have user information in the context
        if (sdkContext?.user?.fid) {
          setUser({
            fid: sdkContext.user.fid,
            username: sdkContext.user.username,
            displayName: sdkContext.user.displayName,
            pfp: sdkContext.user.pfpUrl as string,
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          // No user info in context, try to authenticate
          try {
            // Try to sign in with Farcaster
            // @ts-expect-error - SDK types might be outdated
            await sdk.actions.signIn();
            
            // Get updated context after sign in
            const updatedContext = await sdk.context;
            
            if (updatedContext?.user?.fid) {
              setUser({
                fid: updatedContext.user.fid,
                username: updatedContext.user.username,
                displayName: updatedContext.user.displayName,
                pfp: updatedContext.user.pfpUrl as string,
                isAuthenticated: true,
                isLoading: false
              });
            } else {
              // Still no user after sign in attempt
              setUser({
                isAuthenticated: false,
                isLoading: false
              });
            }
          } catch (error) {
            console.error('Failed to sign in with Farcaster:', error);
            setUser({
              isAuthenticated: false,
              isLoading: false
            });
          }
        }
      } catch (error) {
        console.error('Error accessing Farcaster context:', error);
        setUser({
          isAuthenticated: false,
          isLoading: false
        });
      }
    };

    if (isSDKLoaded) {
      getUserInfo().catch(err => {
        console.error('Error in getUserInfo:', err);
        setUser({
          isAuthenticated: false,
          isLoading: false
        });
      });
    }
  }, [isSDKLoaded]);

  return user;
}
