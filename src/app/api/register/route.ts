import bcrypt from "bcrypt";
import client from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await client.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (ex: any) {
    NextResponse.json({ error: ex.message });
  }
}
