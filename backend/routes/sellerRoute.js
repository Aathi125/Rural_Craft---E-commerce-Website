import express from "express";
import multer from "multer";
import path from "path";

import {
  isAuthenticatedUser,
  authorizeRoles,
  isAuthenticatedSeller,
  authorizeRolesSeller,
} from "../middlewares/authenticate.js";

import {
  registerSeller,
  loginSeller,
  logoutSeller,
  forgotPasswordSeller,
  resetPasswordSeller,
  getSellerProfile,
  changePasswordSeller,
  updateProfileSeller,
  getAllSellers,
  getSeller,
  updateSeller,
  deleteSeller,
  deleteMyAccountSeller,
  getSellerAnalytics,
} from "../controller/sellerController.js";

const router = express.Router();

// Multer config
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), "uploads/user"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

// Auth routes
router.post("/registerSeller", upload.single("avatar"), registerSeller);
router.post("/loginSeller", loginSeller);
router.get("/logoutSeller", logoutSeller);
router.post("/password/forgotSeller", forgotPasswordSeller);
router.post("/password/resetSeller/:token", resetPasswordSeller);
router.get("/myprofileSeller", isAuthenticatedSeller, getSellerProfile);
router.put("/password/changeSeller", isAuthenticatedSeller, changePasswordSeller);
router.put("/updateSeller", isAuthenticatedSeller, upload.single("avatar"), updateProfileSeller);
router.delete("/deleteMyAccountSeller", isAuthenticatedSeller, deleteMyAccountSeller);

// Get all sellers (authenticated users)
router.get("/sellers", isAuthenticatedUser, getAllSellers);

// Admin routes
router.get("/admin/sellers", isAuthenticatedSeller, authorizeRolesSeller("admin"), getAllSellers);
router
  .route("/admin/seller/:id")
  .get(isAuthenticatedSeller, authorizeRolesSeller("admin"), getSeller)
  .put(isAuthenticatedSeller, authorizeRolesSeller("admin"), updateSeller)
  .delete(isAuthenticatedSeller, authorizeRolesSeller("admin"), deleteSeller);

// Seller analytics
router.get("/seller-analytics", isAuthenticatedSeller, getSellerAnalytics);

export default router;
