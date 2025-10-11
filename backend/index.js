// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// For __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Import Routes
import authRoutes from "./routes/auth.js";
import sellerRoutes from "./routes/sellerRoute.js";
import productRoutes from "./routes/productRoutes.js";
//import chatbotRoutes from "./routes/chatbotRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";        // ✅ course routes
import submissionRoutes from "./routes/submissionRoutes.js"; // ✅ submission routes
import userRoutes from "./routes/userRoutes.js";
// Import Middleware
import errorMiddleware from "./middlewares/error.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" })); // increase payload size for file uploads
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected:", process.env.DB_LOCAL_URI);
  } catch (error) {
    console.error(`❌ DB Connection Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// API Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", sellerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
// ✅ Course & Submission routes
app.use("/api/courses", courseRoutes);
app.use("/api/submissions", submissionRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Error Middleware
app.use(errorMiddleware);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 5551;
const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`
  );
});

// Handle crashes
process.on("unhandledRejection", (err) => {
  console.log(`❌ Error: ${err.message}`);
  console.log("Shutting down due to unhandled promise rejection");
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.log(`❌ Error: ${err.message}`);
  console.log("Shutting down due to uncaught exception");
  server.close(() => process.exit(1));
});
