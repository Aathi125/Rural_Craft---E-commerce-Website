import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  registerUser,
  loginuser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  changePassword,
  updateProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  deleteMyAccount,
  verify2FA,
  initiate2FA,
  getAllBuyers
} from '../controller/authController.js';

import { verify2FASeller, initiate2FASeller } from '../controller/sellerController.js';
import { isAuthenticatedUser, authorizeRoles, isAuthenticatedSeller } from '../middlewares/authenticate.js';

const router = express.Router();

// ✅ ES modules don't have __dirname by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'uploads/user')); // ✅ fixed
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

// User routes
router.route('/register').post(upload.single('avatar'), registerUser);
router.route('/login').post(loginuser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/myprofile').get(isAuthenticatedUser, getUserProfile);
router.route('/password/change').put(isAuthenticatedUser, changePassword);
router.route('/update').put(isAuthenticatedUser, upload.single('avatar'), updateProfile);
router.route('/deleteMyAccount').delete(isAuthenticatedUser, deleteMyAccount);

router.route('/verfy2FA').post(isAuthenticatedUser, verify2FA);
router.route('/send2FA').post(isAuthenticatedUser, initiate2FA);

// Seller 2FA routes
router.route('/verfy2FASeller').post(isAuthenticatedSeller, verify2FASeller);
router.route('/send2FASeller').post(isAuthenticatedSeller, initiate2FASeller);

// Get all buyers (accessible to authenticated sellers)
router.route('/buyers').get(isAuthenticatedSeller, getAllBuyers);

// Admin routes
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);
router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getUser)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

export default router;
