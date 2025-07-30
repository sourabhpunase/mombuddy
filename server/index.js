import express from "express";
import cors from "cors";
import symptomRouter from "./routes/symptom.js";
import aiRouter from "./routes/ai.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/symptoms", symptomRouter);
app.use("/api/ai", aiRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
