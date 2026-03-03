import { mongoConnect } from "@/lib/mongoConnect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, username, email, password, image } = await req.json();

    // ১. ভ্যালিডেশন চেক
    if (!name || !username || !email || !password) {
      return NextResponse.json({ error: "সবগুলো ঘর পূরণ করুন!" }, { status: 400 });
    }

    const { db } = await mongoConnect();

    // ২. চেক করা ইউজার আগে থেকে আছে কিনা
    const userExists = await db.collection("users").findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }
      ]
    });

    if (userExists) {
      return NextResponse.json({ error: "Email or Username already exists!" }, { status: 400 });
    }

    // ৩. পাসওয়ার্ড এনক্রিপশন
    const hashedPassword = await bcrypt.hash(password, 10);

    // ৪. ডাটাবেসে সেভ
    const newUser = {
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      image: image || null,
      role: "user",
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);

    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}