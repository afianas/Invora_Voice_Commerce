# backend/whisper_service.py

import whisper

model = whisper.load_model("small")

def speech_to_text(file_path, language="en"):
    result = model.transcribe(
        file_path,
        language=language
    )
    return result["text"]