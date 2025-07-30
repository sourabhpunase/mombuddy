import express from "express";
import { analyzeSymptoms } from "../controller/symptomController.js";

const router = express.Router();
router.post("/", analyzeSymptoms);

export default router;
