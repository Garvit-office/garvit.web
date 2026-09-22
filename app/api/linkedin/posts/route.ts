import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Replace with your actual LinkedIn API fetch logic or mock fallback data
    const response = await fetch("https://api.linkedin.com/v2/ugcPosts?q=authors&authors=urn:li:person:YOUR_ID", {
      headers: {
        Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
        "cache-control": "no-cache",
        "X-Restli-Protocol-Version": "2.0.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch LinkedIn posts: ${response.statusText}`);
    }

    const data: unknown = await response.json();

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
