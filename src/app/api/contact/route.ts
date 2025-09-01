import { NextRequest, NextResponse } from 'next/server';

interface ContactData {
  name: string;
  company: string;
  message: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactData = await request.json();
    
    // Validate required fields
    if (!body.name || !body.company || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add timestamp
    const contactData: ContactData = {
      ...body,
      timestamp: new Date().toISOString()
    };

    // In Vercel, we can't write to local files
    // Instead, we'll log the data and return success
    // You can integrate with a database service later (e.g., Vercel KV, Supabase, etc.)
    
    console.log('Contact form submitted:', {
      name: contactData.name,
      company: contactData.company,
      message: contactData.message,
      timestamp: contactData.timestamp
    });

    // For now, we'll just return success
    // TODO: Integrate with a database service for production
    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        data: contactData,
        note: 'Data logged to console. Consider integrating with a database service for production.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
