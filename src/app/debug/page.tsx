'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeaders = async () => {
      try {
        // Fetch the current page to check its headers
        const response = await fetch('/debug');
        
        // Convert headers to an object
        const headerObj: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          headerObj[key] = value;
        });
        
        setHeaders(headerObj);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    fetchHeaders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Debug Headers</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}
      
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Response Headers</h2>
        <pre className="bg-white p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(headers, null, 2)}
        </pre>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Environment Information</h2>
        <ul className="list-disc pl-5">
          <li>Next.js Environment: {process.env.NODE_ENV}</li>
          <li>NEXT_PUBLIC_URL: {process.env.NEXT_PUBLIC_URL || 'Not set'}</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Frame Embedding Test</h2>
        <p>This section tests if the page can be embedded in an iframe:</p>
        <iframe 
          src="/debug" 
          className="w-full h-64 border border-gray-300 rounded mt-2"
          title="Self-embedding test"
        />
      </div>
    </div>
  );
}
