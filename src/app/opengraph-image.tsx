import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Inactive Followers Detector";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// dynamically generated OG image for frame preview
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: "linear-gradient(to right, #4f46e5, #6366f1)",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
            }}
          >
            {/* Simple user icon */}
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h1 style={{ fontSize: 60, fontWeight: "bold", margin: 0 }}>
            {process.env.NEXT_PUBLIC_FRAME_NAME}
          </h1>
        </div>
        <p style={{ fontSize: 32, textAlign: "center", maxWidth: "800px" }}>
          Find and unfollow users who haven't posted in a while.
          Filter by inactivity period and sort by oldest followers.
        </p>
      </div>
    ),
    { ...size }
  );
}
