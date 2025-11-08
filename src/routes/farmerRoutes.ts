import { Router } from "express";
import { FarmerController } from "../controllers/farmerController";
import { generateCloudinaryPresignedUrl } from "../utils/cloudinaryUpload";
const router = Router();

router.post("/register", FarmerController.register);
router.get("/cloudUploadSignature",generateCloudinaryPresignedUrl);

export { router as farmerRoutes };
