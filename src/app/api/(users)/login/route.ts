import { UserType, userZodType } from "@/app/_utils/types";
import connect from "@/app/dbConfig/dbConfig";
import { User } from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function POST(req: NextRequest, _res: NextResponse) {
  try {
    const userDetails: UserType = await req.json();
    const validateData = userZodType.safeParse(userDetails);
    if (validateData.success) {
      const { email, password } = validateData.data;
      const user = await User.findOne({ email });
      if (!user) return NextResponse.json({ error: "User does not exist" });
      const isPasswordValid = await user.isPasswordCorrect(password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "invalid password" },
          { status: 404 },
        );
      }
      return NextResponse.json({
        message: "user logged in succesfully",
        data: user,
      });
    }

    return NextResponse.json({ error: validateData.error });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "something went wrong" });
  }
}
