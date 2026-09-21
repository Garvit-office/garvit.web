import { NextResponse } from "next/server";

export async function GET() {
  const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
  const LINKEDIN_PERSON_URN = process.env.LINKEDIN_PERSON_URN; // e.g., urn:li:person:YOUR_ID

  if (!LINKEDIN_ACCESS_TOKEN || !LINKEDIN_PERSON_URN) {
    return NextResponse.json(
      { error: "LinkedIn integration is not configured on the server." },
      { status: 500 }
    );
  }

  try {
    // Fetch posts using LinkedIn's UGC Posts API or Shares API
    const response = await fetch(
      `https://api.linkedin.com/v2/ugcPosts?authors=List(${LINKEDIN_PERSON_URN})`,
      {
        headers: {
          Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts from LinkedIn API");
    }

    const data = await response.json();
    
    // Format the response to fit your FeedSection component requirements
    const posts = data.elements.map((post: any) => ({
      id: post.id,
      text: post.specificContent?.["com.linkedin.ugc.ShareContent"]?.shareCommentary?.text || "",
      createdTime: post.created?.time,
      // Add other mapping fields as needed
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching LinkedIn posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}