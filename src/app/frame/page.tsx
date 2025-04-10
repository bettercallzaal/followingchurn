'use client';

import { useEffect } from 'react';
import { sdk } from '@farcaster/frame-sdk';
import App from '../app';

export default function FramePage() {
  useEffect(() => {
    // Signal to Farcaster that the app is ready to be displayed
    const timer = setTimeout(() => {
      sdk.actions.ready()
        .then(() => console.log('App ready signal sent to Farcaster'))
        .catch(err => console.error('Error sending ready signal:', err));
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return <App />;
}
