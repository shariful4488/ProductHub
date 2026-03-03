import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    authorEmail: { type: String, required: true }, 
    authorName: { type: String },
  },
  { timestamps: true } 
);

const Product = models.Product || mongoose.model("Product", productSchema);

export default Product;