import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  fullName: z.string().min(2).max(80),
  phone: z.string().regex(/^\+?[0-9\s\-]{10,15}$/),
  address: z.string().min(5).max(300),
  email: z.string().email(),
  products: z.array(z.string()).min(1),
  website: z.string().max(0).optional(), // honeypot — must stay empty
});

// Naive rate-limit: track per-IP submissions in memory (resets on server restart)
// For production, use Redis or an edge KV store.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(req: Request) {
  // Rate limit
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  // Honeypot check
  if (parsed.data.website) {
    // Silently succeed to not tip off bots
    return NextResponse.json({ ok: true });
  }

  const { fullName, phone, address, email, products } = parsed.data;

  // Plain-text email body (no HTML to avoid injection)
  const textBody = [
    `New enquiry from ${fullName}`,
    `─────────────────────────────`,
    `Name:     ${fullName}`,
    `Phone:    ${phone}`,
    `Email:    ${email}`,
    `Message:  ${address}`,
    `Products: ${products.join(', ')}`,
    `─────────────────────────────`,
    `Sent via jbtimbertech.com contact form`,
  ].join('\n');

  const fromAddress = process.env.CONTACT_FROM_EMAIL?.includes('<')
    ? process.env.CONTACT_FROM_EMAIL
    : `JB Timber Tech <${process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'}>`;

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: process.env.CONTACT_TO_EMAIL ?? 'jbtimbertech@gmail.com',
    replyTo: email,
    subject: `New enquiry — ${fullName} (${products.length} product${products.length > 1 ? 's' : ''})`,
    text: textBody,
  });

  if (error) {
    console.error('[contact route] Resend error:', error);
    return NextResponse.json({ error: 'Email failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

