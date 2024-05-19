import { connect } from "@/database/connection";
import bcrypt from "bcryptjs";
import User from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connect();
    const { name, email, password } = await req.json();
    const checkExisting = await User.findOne({ email });
    if (checkExisting)
      return NextResponse.json(
        { message: "user already exists" },
        { status: 422 }
      );
    const hashPassword = await bcrypt.hash(password, 14);
    const newUser = await User.create({ name, email, password: hashPassword });
    await newUser.save();
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
