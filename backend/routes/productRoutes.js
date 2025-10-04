// import express from "express";
// import { getProducts, createProduct, updateProduct, deleteProduct,getProductById,updateStock } from "../controller/productController.js";

// const router = express.Router();

// router.get("/", getProducts); // ✅ GET all products
// router.post("/", createProduct); // ✅ CREATE a product
// router.put("/:id", updateProduct); // ✅ UPDATE a product
// router.delete("/:id", deleteProduct); // ✅ DELETE a product
// router.get("/:id", getProductById);
// // ✅ New Route: Update Stock
// router.put("/:id/update-stock", updateStock); 



// export default router;
import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  updateStock
} from "../controller/productController.js";
import upload from "../middlewares/upload.js";


const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", upload.single("image"), createProduct); // <-- multer used here
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.put("/:id/update-stock", updateStock);

export default router;
