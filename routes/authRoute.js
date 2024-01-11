import express from "express";
import {
  registerController,
  loginController,
  testcontroller,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
const router = express.Router();
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// routing
//register || post

router.post("/register", registerController);

// login || post

router.post("/login", loginController);

// /forgotpassword

router.post("/forgot-password", forgotPasswordController);

//test route
router.get("/test", requireSignIn, isAdmin, testcontroller);

// protected router

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

//update profile

router.put("/profile", requireSignIn, updateProfileController);

router.get("/orders", requireSignIn, getOrdersController);

router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order update

router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
