import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const quoteSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Valid phone is required'),
  company: z.string().optional(),
  productSystem: z.string().min(1, 'Product system is required'),
  productClass: z.string().optional(),
  operatingVoltage: z.string().optional(),
  dimensions: z.string().optional(),
  quantity: z.string().optional(),
  deliveryLocation: z.string().optional(),
  message: z.string().optional(),
});

// In-memory store for quotes (would be a database in production)
const quoteStore: Array<Record<string, unknown> & { id: string; submittedAt: string }> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = quoteSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validated.error.flatten().fieldErrors,
          message: 'Validation failed',
        },
        { status: 400 }
      );
    }

    const quote = {
      id: `Q-${Date.now().toString(36).toUpperCase()}`,
      submittedAt: new Date().toISOString(),
      ...validated.data,
    };

    quoteStore.push(quote);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 400));

    return NextResponse.json({
      success: true,
      message: 'Quote request received. Our technical sales team will respond within 24 hours.',
      quoteId: quote.id,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while submitting your quote request.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    count: quoteStore.length,
    quotes: quoteStore,
  });
}
