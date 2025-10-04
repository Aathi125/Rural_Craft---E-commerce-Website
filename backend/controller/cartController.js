import mongoose from "mongoose";
import Cart from "../models/Cart.js";

// ✅ Add to Cart
export const addToCart = async (req, res) => {
  const { productId, sellerId, userId, quantity } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    if (!userId || !sellerId || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Check if product already exists in cart for this user
    const existingItem = await Cart.findOne({ productId, userId });

    if (existingItem) {
      existingItem.quantity += quantity;
      const updatedItem = await existingItem.save();
      return res.status(200).json(updatedItem);
    }

    const newItem = new Cart({ productId, sellerId, userId, quantity });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
};

// ✅ Get Cart Items for a Specific User
export const getCartItems = async (req, res) => {
  const { userId } = req.query;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const items = await Cart.find({ userId }).populate("productId");
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error: error.message });
  }
};

// ✅ Update Quantity of a Cart Item
export const updateCartItemQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid cart item ID" });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const updatedItem = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to update quantity", error: error.message });
  }
};

// ✅ Delete Cart Item
export const deleteCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid cart item ID" });
    }

    const deletedItem = await Cart.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error: error.message });
  }
};
