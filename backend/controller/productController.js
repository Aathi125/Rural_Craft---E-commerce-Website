import Product from "../models/Product.js";

// ✅ Fetch All Products from Database
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    
    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

//fetch
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};


// ✅ Create New Product with Image Upload
export const createProduct = async (req, res) => {
  try {
    const { name, description, sellerId, category, price, stock } = req.body;

    // ✅ Get filename from Multer upload
    const imageFilename = req.file ? req.file.filename : "";

    const product = new Product({
      name,
      description,
      sellerId,
      category,
      price,
      stock,
      image: imageFilename, // 🔗 Store image filename
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

// ✅ Update Product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, sellerId, category, price, stock, image } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, sellerId, category, price, stock, image },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

// ✅ Delete Product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

// ✅ New function: Update Stock
export const updateStock = async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { stock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Stock updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating stock", error: error.message });
  }
};
