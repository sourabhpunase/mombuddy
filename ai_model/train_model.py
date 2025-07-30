import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import pickle

# Simulated dataset
data = [
    {"nausea": 1, "vomiting": 1, "fatigue": 1, "bleeding": 0, "cramping": 0, "risk": 1},
    {"nausea": 1, "vomiting": 1, "fatigue": 1, "bleeding": 1, "cramping": 1, "risk": 2},
    {"nausea": 0, "vomiting": 0, "fatigue": 0, "bleeding": 0, "cramping": 0, "risk": 0},
    {"nausea": 1, "vomiting": 0, "fatigue": 1, "bleeding": 0, "cramping": 1, "risk": 1},
    {"nausea": 1, "vomiting": 1, "fatigue": 1, "bleeding": 1, "cramping": 0, "risk": 2},
    {"nausea": 1, "vomiting": 1, "fatigue": 0, "bleeding": 0, "cramping": 0, "risk": 1},
]

df = pd.DataFrame(data)
X = df.drop("risk", axis=1)
y = df["risk"]

model = LogisticRegression()
model.fit(X, y)

# Save model
with open("risk_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model trained and saved as risk_model.pkl")
