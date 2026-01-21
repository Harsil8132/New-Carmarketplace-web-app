import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET || process.env.VITE_CLOUDINARY_API_SECRET,
});

// Multer for temporary upload
const upload = multer({ dest: "uploads/" });

// Upload API Route
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    console.log("Upload request received");
    console.log("File:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "car_marketplace",
    });

    console.log("Cloudinary upload result:", result);

    fs.unlinkSync(req.file.path);

    res.json({ url: result.url });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload Failed", details: err.message });
  }
});

app.listen(5000, () => {
  console.log("Cloudinary Upload Server running on port 5000");
});
