import { NextResponse } from 'next/server';
import supabase from '../../../lib/supabase';

export async function POST(req: Request) {
  const { token } = await req.json();
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token
  });

  if (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }

  return NextResponse.json(data);
}
