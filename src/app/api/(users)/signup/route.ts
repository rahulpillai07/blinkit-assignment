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
      if (await User.findOne({ email }))
        return NextResponse.json({ error: "User already exists" });
      const newUser = new User({
        email,
        password,
      });
      await newUser.save();
      console.log("user saved succesfully");
      return NextResponse.json({
        message: "user created succesfully",
        data: newUser,
      });
    }
    return NextResponse.json({ error: validateData.error });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "something went wrong" });
  }
}
