from parser import parse_excel
from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware

import requests

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
def upload(file: UploadFile = File(...)):
    contents = file.file.read()
    summary = parse_excel(contents)
    return summary



@app.post("/chat")
def chat(data: dict):
    user_input = data.get("message", "")

    system_context = (
        "You are a helpful and intelligent financial assistant. "
        "You help users understand and analyze balance sheets. "
        "Answer clearly and use calculations when needed."
    )

    full_prompt = f"{system_context}\n\nUser: {user_input}\nAssistant:"

    try:
        response = requests.post("http://localhost:11434/api/generate", json={
            "model": "mistral",
            "prompt": f"Please answer in English only. {full_prompt}",

            "stream": False
        })
        response.raise_for_status()
        output = response.json()
        return {"reply": output.get("response", "Sorry, I didn't get that.")}
    except Exception as e:
        return {"reply": f"Error occurred: {str(e)}"}



