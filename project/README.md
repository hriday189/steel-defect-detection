# Steel Surface Defect Detection

AI-powered steel surface defect detection using YOLOv8 + React + FastAPI.

---

## Project Structure

```
project/
├── backend/
│   ├── main.py          ← FastAPI app (fixed: CORS + proxy-ready)
│   ├── requirements.txt
│   ├── uploads/         ← Uploaded images stored here
│   └── yolov8n.pt       ← Place your YOLOv8 weights here
├── src/
│   └── components/
│       └── AIDetectionDemo.tsx  ← Wired to /api/detect
├── vite.config.ts       ← Fixed: Vite proxy /api → backend:8000
└── package.json
```

---

## Setup & Running

### 1. Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

API docs available at: http://127.0.0.1:8000/docs

### 2. Frontend (React + Vite)

```bash
# from project root
npm install
npm run dev
```

App runs at: http://localhost:5173

---

## How the Fix Works

### Problem
- Frontend (port 5173) calling backend (port 8000) = **different origins**
- Browser blocks cross-origin requests unless server allows them (CORS)
- Result: 404 / network errors even though backend is running fine

### Fix 1 — CORS Middleware in FastAPI (`backend/main.py`)
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Fix 2 — Vite Proxy (`vite.config.ts`)
```ts
server: {
  proxy: {
    "/api": {
      target: "http://127.0.0.1:8000",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
}
```

Frontend calls `/api/detect` → Vite rewrites to `http://127.0.0.1:8000/detect`  
No CORS issue because the request appears same-origin to the browser.

### Fix 3 — No manual Content-Type header
When sending `FormData`, **never** set `Content-Type: multipart/form-data` manually.  
The browser must set it automatically to include the correct `boundary` value.  
Setting it manually causes `422 Unprocessable Entity` from FastAPI.

---

## Adding Real YOLOv8 Inference

Replace the mock block in `backend/main.py`:

```python
from ultralytics import YOLO
model = YOLO("yolov8n.pt")  # or your custom weights

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    ...
    results = model(file_path)
    boxes = results[0].boxes
    detections = [
        {
            "type": results[0].names[int(b.cls)],
            "confidence": round(float(b.conf) * 100, 1),
            "bbox": b.xyxy[0].tolist(),
        }
        for b in boxes
    ]
    return {"image_url": f"/uploads/{filename}", "detections": detections}
```
