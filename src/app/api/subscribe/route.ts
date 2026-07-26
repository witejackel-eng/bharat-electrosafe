import { NextResponse } from 'next/server';

// In-memory store (resets on server restart — fine for demo purposes)
const subscribers: Array<{
  email: string;
  createdAt: string;
  source: string;
}> = [];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  const { email, source } = (body ?? {}) as { email?: string; source?: string };

  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { ok: false, error: 'A valid email address is required.' },
      { status: 422 }
    );
  }

  const cleanEmail = email.trim().toLowerCase();
  const already = subscribers.find((s) => s.email === cleanEmail);
  if (already) {
    return NextResponse.json(
      {
        ok: true,
        message: 'You are already subscribed to Bharat Electrosafe updates.',
        email: cleanEmail,
        duplicate: true,
      },
      { status: 200 }
    );
  }

  subscribers.push({
    email: cleanEmail,
    createdAt: new Date().toISOString(),
    source: typeof source === 'string' ? source : 'footer',
  });

  return NextResponse.json(
    {
      ok: true,
      message:
        'Thank you for subscribing. We will send product updates and technical resources to your inbox.',
      email: cleanEmail,
      count: subscribers.length,
    },
    { status: 201 }
  );
}

export async function GET() {
  // Mask emails in the public listing for safety.
  const masked = subscribers.map((s) => ({
    email: s.email.replace(/^(.{2}).*(@.*)$/, '$1***$2'),
    createdAt: s.createdAt,
    source: s.source,
  }));
  return NextResponse.json({ ok: true, count: subscribers.length, subscribers: masked });
}
