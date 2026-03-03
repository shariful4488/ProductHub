import  mongoConnect  from "@/lib/mongoConnect";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("Please add JWT_SECRET in .env");

export async function POST(req) {
  let client;
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // 2. Database Connection
    const connection = await mongoConnect();
    client = connection.client;
    const db = connection.db;

    // 3. Find user
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials (User not found)" },
        { status: 401 }
      );
    }

    // 4. Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials (Wrong password)" },
        { status: 401 }
      );
    }

    // 5. Generate JWT
    const token = jwt.sign(
      { 
        id: user._id.toString(), 
        email: user.email, 
        role: user.role || "user" 
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 6. Response with Cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id.toString(), 
        username: user.username || user.name,
        email: user.email,
        role: user.role || "user",
      },
      token: token 
    });

    // Set HttpOnly Cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return response;

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    // if (client) await client.close(); 
  }
}