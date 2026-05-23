from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from ultralytics import YOLO
import shutil
import os
import uuid

app = FastAPI()

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Upload folders
UPLOAD_FOLDER = "uploads"
RESULT_FOLDER = "results"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

# Static folders
app.mount("/uploads", StaticFiles(directory=UPLOAD_FOLDER), name="uploads")
app.mount("/results", StaticFiles(directory=RESULT_FOLDER), name="results")

# Load YOLO model
model = YOLO("yolov8n.pt")


@app.get("/")
def home():
    return {"message": "Steel Defect Detection Backend Running"}


@app.post("/detect")
async def detect(file: UploadFile = File(...)):

    # Unique filename
    filename = f"{uuid.uuid4()}_{file.filename}"

    upload_path = os.path.join(UPLOAD_FOLDER, filename)

    # Save uploaded image
    with open(upload_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run YOLO detection
    results = model(upload_path)

    # Save detected image
    result_path = os.path.join(RESULT_FOLDER, filename)

    results[0].save(filename=result_path)

    # Extract detections
    detections = []

    for box in results[0].boxes:

        cls_id = int(box.cls[0])
        confidence = float(box.conf[0])

        detections.append({
            "class": model.names[cls_id],
            "confidence": round(confidence, 2)
        })

    return {
        "success": True,
        "original_image": f"/uploads/{filename}",
        "detected_image": f"/results/{filename}",
        "detections": detections
    }
