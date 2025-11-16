import { Router } from "express";
import FarmerController  from "../controllers/farmerController";
const router = Router();

router.post("/register", FarmerController.register);
router.post("/farmDetails", FarmerController.farmDetails)

export { router as farmerRoutes };
