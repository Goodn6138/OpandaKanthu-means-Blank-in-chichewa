import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (email) {
      const client = await pool.connect();
      await client.query(
        `UPDATE users SET last_visit = NOW(), visit_count = visit_count + 1 WHERE email = $1`,
        [email]
      );
      client.release();
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
