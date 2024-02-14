import { UserType, userZodType } from "@/app/_utils/types";
import connect from "@/app/dbConfig/dbConfig";
import { User } from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

connect();
const key = process.env.SECRET_KEY!;
const COOKIE_NAME = "accessToken";
const MAX_AGE = 3600; // 1 hour in seconds

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const userDetails: UserType = await req.json();
    const validateData = userZodType.safeParse(userDetails);

    if (validateData.success) {
      const { email, password } = validateData.data;
      const user = await User.findOne({ email });

      if (!user) {
        return NextResponse.json(
          { error: "User does not exist" },
          { status: 404 },
        );
      }

      const isPasswordValid = await user.isPasswordCorrect(password);

      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Invalid password" },
          { status: 404 },
        );
      }

      // User authenticated successfully, generate JWT token
      const payload = {
        id: user._id,
        email: user.email,
      };

      const token = jwt.sign(payload, key, { expiresIn: "1h" });

      // Serialize the token into a cookie string
      const serializedCookie = serialize(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: MAX_AGE,
        path: "/",
      });

      return NextResponse.json(
        { message: "User logged in successfully", data: user },
        { headers: { "Set-Cookie": serializedCookie } },
      );
    }

    return NextResponse.json({ error: validateData.error }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
