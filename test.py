import requests
import json

# Your model endpoint
url = "http://10.10.110.25:11434/api/generate"

# Define the payload
payload = {
    "prompt": "i am 2 months pregnant how i can maintain follic acid level during pregnancy",
    "stream": True,
    "model": "llama4"
}

# Set headers
headers = {
    "Content-Type": "application/json"
}

# Send the POST request with stream=True
response = requests.post(url, json=payload, headers=headers, stream=True)

# Check status
if response.status_code == 200:
    print("Model Response:")
    for line in response.iter_lines(decode_unicode=True):
        if line.strip():
            try:
                json_data = json.loads(line)
                print(json_data.get("response", ""), end="", flush=True)
            except json.JSONDecodeError:
                continue
    print()  # Newline after stream
else:
    print("Request failed with status code:", response.status_code)
    print("Details:", response.text)
