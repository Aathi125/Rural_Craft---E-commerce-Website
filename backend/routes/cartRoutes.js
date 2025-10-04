// import express from "express";
// import { addToCart, getCartItems, deleteCartItem,updateCartQuantity } from "../controller/cartController.js";

// const router = express.Router();

// router.post("/", addToCart);
// router.get("/", getCartItems);
// router.delete("/:id", deleteCartItem);
// router.put("/:id/quantity", updateCartQuantity);

// export default router;
import express from "express";
import {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  deleteCartItem,
} from "../controller/cartController.js";

const router = express.Router();

router.post("/", addToCart);                   // POST: Add to cart
router.get("/", getCartItems);                 // GET: Get items by userId (use query param)
router.put("/:id", updateCartItemQuantity);    // PUT: Update quantity
router.delete("/:id", deleteCartItem);         // DELETE: Remove item

export default router;

