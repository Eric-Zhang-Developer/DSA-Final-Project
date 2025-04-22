import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type ResponseData = {
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  received: any; 
};

// Export async function POST
export async function POST(
  req: NextRequest // Use NextRequest from next/server
): Promise<NextResponse<ResponseData | { error: string }>> { // Use NextResponse


  try {
    // Parse the JSON body
    const body = await req.json();
    console.log('API /api/compare received body:', body);

    // Send a simple success response 
    return NextResponse.json({
      message: "Success! App Router API /api/compare received POST request.",
      received: body // Send back the received data
    });

  } catch (error) {
    // Bad Request
    console.error("Failed to parse request body or other error:", error);
    return NextResponse.json({ error: 'Invalid request body or server error' }, { status: 400 }); 
  }
}
