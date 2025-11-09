import { Router } from "express";
import { FarmerController } from "../controllers/farmerController";
const router = Router();

router.post("/register", FarmerController.register);

export { router as farmerRoutes };
