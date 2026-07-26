import { NextResponse } from 'next/server';

const SYSTEM_PROMPT =
  "You are a knowledgeable technical sales assistant for Bharat Electrosafe, an Indian manufacturer of electrical insulating mats, visible-safety mat variants, geomembranes (BharatMembrane) and PVC water-stop profiles (BharatHydro). You help engineers, procurement teams and project managers with: product selection by operating voltage, IS 15652 compliance, insulation classes (A: 3.3kV/2.0mm, B: 11kV/2.5mm, C: 33kV/3.0mm), visible-safety mat options (coloured strip, bi-colour, auto-glow/reflective), geomembrane and water-stop applications, BIS licensing and third-party testing, custom sizing and project packaging. Be concise, technically accurate, and helpful. If asked about pricing, redirect to the Request a Quote form. If asked something outside your expertise, politely acknowledge and suggest they contact technical sales at +91 123 456 7890.";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Lazy-initialize ZAI instance (reuse across requests)
let zaiInstance: ReturnType<typeof import('z-ai-web-dev-sdk').default> | null = null;
let zaiInitPromise: Promise<typeof zaiInstance> | null = null;

async function getZAI() {
  if (zaiInstance) return zaiInstance;
  if (zaiInitPromise) return zaiInitPromise;

  zaiInitPromise = (async () => {
    const ZAI = (await import('z-ai-web-dev-sdk')).default;
    const instance = await ZAI.create();
    zaiInstance = instance;
    return instance;
  })();

  return zaiInitPromise;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, history } = body as { message: string; history?: ChatMessage[] };

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build messages array: system prompt + conversation history + new user message
    const messages: Array<{ role: 'assistant' | 'user'; content: string }> = [
      { role: 'assistant', content: SYSTEM_PROMPT },
    ];

    // Add previous conversation history (keep last 10 messages for context window)
    if (Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    // Add the new user message
    messages.push({ role: 'user', content: message });

    const zai = await getZAI();

    const completion = await zai.chat.completions.create({
      messages,
      thinking: { type: 'disabled' },
    });

    const response = completion.choices[0]?.message?.content;

    if (!response || response.trim().length === 0) {
      return NextResponse.json({
        response:
          'I apologize, I could not generate a response. Please try again or contact our technical sales team at +91 123 456 7890.',
      });
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        response:
          'I apologize, I encountered a technical issue. Please try again or contact our technical sales team at +91 123 456 7890.',
      },
      { status: 500 }
    );
  }
}
