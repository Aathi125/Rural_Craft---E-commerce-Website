import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// For ES modules, __dirname is not defined by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import errorMiddleware from './middlewares/error.js';
import auth from './routes/auth.js';
import seller from './routes/sellerRoute.js';

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.use('/api/v1/', auth);
app.use('/api/v1/', seller);

// Error handling
app.use(errorMiddleware);

export default app; // Use export default instead of module.exports
