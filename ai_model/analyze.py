import sys
import json
import pickle
import pandas as pd
import os

# Load model
model_path = os.path.join(os.path.dirname(__file__), "risk_model.pkl")
with open(model_path, "rb") as f:
    model = pickle.load(f)

symptoms = json.loads(sys.argv[1])
symptom_keys = ["nausea", "vomiting", "fatigue", "bleeding", "cramping"]

# Build a DataFrame instead of plain list
input_data = {key: [1 if key in symptoms else 0] for key in symptom_keys}
input_df = pd.DataFrame(input_data)

# Predict risk level
risk_level = model.predict(input_df)[0]

# Map to output
risk_text = {
    0: "Low Risk - Normal pregnancy symptoms.",
    1: "Moderate Risk - Monitor and hydrate.",
    2: "High Risk - Contact your OB immediately!"
}

print(risk_text[risk_level])
