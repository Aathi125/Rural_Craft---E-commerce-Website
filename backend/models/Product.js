import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  sellerId: { type: String, required: true },
  category: {
    type: String,
    enum: ["Handicrafts & Artisanal Products", "Ayurvedic & Herbal Products", "Coconut & Coconut based Products", "Food & Spices", "Earthenware Products"], // 5 Categories
    required: true,
  },
  price: { type: Number, required: true ,min: [0, "Price cannot be negative"]},//validation
  stock: { type: Number, required: true ,min: [0, "Stock cannot be negative"]},//validation
  image: { type: String }, // Store image file path or URL
});

const Product = mongoose.model("Product", productSchema);

export default Product;
