import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  try {
    const user = jwt.verify(token!, process.env.SECRET_KEY!);
    return NextResponse.json({ data: user });
  } catch (error) {
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 },
    );
  }
}
