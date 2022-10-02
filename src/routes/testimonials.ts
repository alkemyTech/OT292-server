import express, { Router } from "express";

import testimonialsController from "../controllers/testimonials";
import verifyAdmin from "../middleware/verifyAdmin";
import { verifyToken } from "../utils/jwt.handle";
import testimonialValidator from "../validations/testimonialValidator";

const router:Router = express.Router();

router.post('/', verifyToken, verifyToken,testimonialValidator.validateCreation,testimonialsController.create)
router.delete('/:id', verifyToken, verifyToken,testimonialValidator.validateDelete, testimonialsController.deletetestimonial)

export default router;
