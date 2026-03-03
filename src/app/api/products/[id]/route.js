import { NextResponse } from "next/server";
import mongoConnect from "@/lib/mongoConnect";
import Product from "@/model/Product";

export async function DELETE(request, { params }) {
  try {
   
    const { id } = await params; 
    
    await mongoConnect();

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE_ERROR:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    
    const { id } = await params;
    
    await mongoConnect();
    const product = await Product.findById(id);
    
    if (!product) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}



export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await mongoConnect();

    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });

    if (!updatedProduct) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}