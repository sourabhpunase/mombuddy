import { spawn } from "child_process";

export const analyzeSymptoms = async (req, res) => {
  const { symptoms } = req.body;

  const py = spawn("python3", ["../ai_model/analyze.py", JSON.stringify(symptoms)]);
  
  let result = "";
  py.stdout.on("data", (data) => {
    result += data.toString();
  });

  py.stderr.on("data", (data) => {
    console.error(`Python error: ${data}`);
  });

  py.on("close", () => {
    res.json({ risk: result });
  });
};
