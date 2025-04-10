'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/frame-sdk';

export default function DebugFramePage() {
  const [sdkInfo, setSdkInfo] = useState<any>(null);
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFrameContext, setIsFrameContext] = useState<boolean>(false);

  // Add a log function
  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
    console.log(message);
  };

  useEffect(() => {
    // Check if we're in a Farcaster frame context
    try {
      const isFrame = !!sdk.context;
      setIsFrameContext(isFrame);
      addLog(`Is Farcaster Frame context: ${isFrame}`);
      
      if (isFrame) {
        // Get SDK info
        setSdkInfo({
          // Use any to avoid TypeScript errors with SDK properties
          context: sdk.context,
          sdkInfo: 'Farcaster Frame SDK',
        });
        addLog(`SDK Info: Farcaster Frame SDK`);
      }
    } catch (err) {
      addLog(`Error checking frame context: ${err instanceof Error ? err.message : String(err)}`);
    }

    // Fetch headers
    const fetchHeaders = async () => {
      try {
        addLog('Fetching headers...');
        const response = await fetch('/api/debug');
        
        // Convert headers to an object
        const headerObj: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          headerObj[key] = value;
          addLog(`Header: ${key} = ${value}`);
        });
        
        setHeaders(headerObj);
        addLog('Headers fetched successfully');
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMsg);
        addLog(`Error fetching headers: ${errorMsg}`);
      }
    };

    fetchHeaders();

    // Try to signal ready to Farcaster
    const timer = setTimeout(() => {
      addLog('Attempting to call sdk.actions.ready()...');
      sdk.actions.ready()
        .then(() => addLog('App ready signal sent to Farcaster successfully'))
        .catch(err => {
          const errorMsg = err instanceof Error ? err.message : String(err);
          addLog(`Error sending ready signal: ${errorMsg}`);
        });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Farcaster Frame Debug</h1>
      
      <div className="bg-blue-100 p-4 rounded mb-4">
        <h2 className="text-xl font-semibold mb-2">Frame Context</h2>
        <p>Is in Farcaster Frame: <strong>{isFrameContext ? 'Yes' : 'No'}</strong></p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}
      
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="text-xl font-semibold mb-2">SDK Information</h2>
        <pre className="bg-white p-4 rounded overflow-auto max-h-60">
          {sdkInfo ? JSON.stringify(sdkInfo, null, 2) : 'SDK information not available'}
        </pre>
      </div>
      
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="text-xl font-semibold mb-2">Response Headers</h2>
        <pre className="bg-white p-4 rounded overflow-auto max-h-60">
          {JSON.stringify(headers, null, 2)}
        </pre>
      </div>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="text-xl font-semibold mb-2">Debug Logs</h2>
        <div className="bg-black text-green-400 p-4 rounded overflow-auto max-h-96 font-mono text-sm">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Frame Embedding Test</h2>
        <p>This section tests if the page can be embedded in an iframe:</p>
        <iframe 
          src="/debug-frame" 
          className="w-full h-64 border border-gray-300 rounded mt-2"
          title="Self-embedding test"
        />
      </div>

      <div className="mt-8 p-4 bg-yellow-100 rounded">
        <h2 className="text-xl font-semibold mb-2">Testing Instructions</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Test in <a href="https://warpcast.com/~/developers/mini-apps/debug" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Mini App Debug Tool</a> with URL: <code className="bg-gray-200 px-2 py-1 rounded">/frame</code></li>
          <li>Test in <a href="https://warpcast.com/~/developers/frames" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Frame Developer Tools</a> with URL: <code className="bg-gray-200 px-2 py-1 rounded">/frame</code></li>
          <li>Check console logs for any errors</li>
        </ol>
      </div>
    </div>
  );
}
