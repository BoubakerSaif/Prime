import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    prod_name: { type: String, unique: true },
    prod_description: { type: String },
    prod_image: { type: String },
    prod_price: { type: Float32Array },
    prod_categorie: { type: String },
    prod_stock: { type: Number },
  },
  { timestamps: true }
);
export default mongoose.model("Product", productSchema);
