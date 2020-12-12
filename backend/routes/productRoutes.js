import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// @desc    Fetch all products
// @route   GET /api/products
// @route   POST /api/products
// @access  public (no need of any token)
router.route("/").get(getProducts).post(protect, admin, createProduct);

// @desc    Create product review
// @route   POST /api/products/:id/reviews
// @access  Private
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);

// @desc    Fetch a single product
// @route   GET /api/products/:id
// @route   DELETE /api/products/:id
// @route   PUT /api/products/:id
// @access  public (no need of any token) and Private/Admin (DELETE)
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
