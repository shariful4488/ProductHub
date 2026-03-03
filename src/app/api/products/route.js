import { NextResponse } from "next/server"; 
import mongoConnect from "@/lib/mongoConnect"; 
import Product from "@/model/Product"; 


export async function POST(request) {
  try {
    const data = await request.json();
    
  
    await mongoConnect(); 

    
    const newProduct = await Product.create({
      title: data.title,
      price: Number(data.price), 
      image: data.image,
      category: data.category,
      description: data.description,
      authorEmail: data.authorEmail || "unknown",
      authorName: data.authorName || "unknown",
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("DETAILED_ERROR:", error); 
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


export async function GET() {
  try {
   
    await mongoConnect();

 
    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET_ERROR:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}