import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { defaultSession, sessionOptions } from '@/lib/definitions';
import { SessionData } from '@/lib/definitions';
import { checkEmailConfirmed } from '@/components/actions/auth';

// login
export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  const { email } = (await request.json()) as {
    email: string;
  };

  const { checkEmail } = await checkEmailConfirmed();

  session.email = email;
  session.isLoggedIn = true;
  session.isVerified = checkEmail;
  await session.save();

  console.log(session);

  return Response.json(session);
}

// read session
export async function GET() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  return Response.json(session);
}

// logout
export async function DELETE() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  session.destroy();

  return Response.json(defaultSession);
}
