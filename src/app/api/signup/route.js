import mongoConnect from "@/lib/mongoConnect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import mongoose from "mongoose"; 
export async function POST(req) {
  try {
    const { name, username, email, password, image } = await req.json();

    if (!name || !username || !email || !password) {
      return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
    }
    await mongoConnect();
    const db = mongoose.connection.db; 

    
    const userExists = await db.collection("users").findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }
      ]
    });

    if (userExists) {
      return NextResponse.json({ error: "Email or Username already exists!" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}