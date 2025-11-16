// server.js

// Import necessary libraries
import { env } from '@xenova/transformers';

env.allowRemoteModels = true;
env.localFilesOnly = false;

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { pipeline } from '@xenova/transformers';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== MODEL SINGLETON (unchanged) =====
class ValidatorPipeline {
  static task = 'zero-shot-object-detection';
  static model = 'Xenova/owlv2-base-patch16';
  static instance = null;

<<<<<<< HEAD
  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, {
        cache_dir: path.join(__dirname, 'models'),
        local_files_only: true,
        progress_callback,
      });
=======
    // Static method to get the pipeline instance.
    // If the instance doesn't exist, it's created.
    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, {
                cache_dir: path.join(__dirname, 'models'),
                local_files_only: false,
                progress_callback
            });
        }
        return this.instance;
>>>>>>> b9061d17d33991476f2eb9566aff1540da5aabd2
    }
    return this.instance;
  }
}

// ===== EXPRESS APP SETUP =====
const app = express();

// CORS so frontend (8080) can talk to backend (3000)
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);

// Only needed for JSON endpoints, not multipart
app.use(express.json());

// ===== MULTER SETUP (file upload) 🔥 =====
const upload = multer({
  dest: path.join(__dirname, 'uploads'), // folder inside container
});

// ===== NEW ENDPOINT: multipart/form-data 🔥 =====
app.post(
  '/validate-image',
  upload.single('image'), // "image" is the field name from the frontend
  async (req, res) => {
    try {
      // File from multer
      const file = req.file;
      // Queries from text field
      const { queries } = req.body;

      if (!file) {
        return res.status(400).json({ error: 'Missing image file' });
      }

      if (!queries) {
        return res.status(400).json({ error: 'Missing queries' });
      }

      // queries might come as JSON string, e.g. '["a","b"]'
      let parsedQueries;
      try {
        parsedQueries = JSON.parse(queries);
      } catch (e) {
        // fallback: comma-separated list
        parsedQueries = queries.split(',').map((q) => q.trim());
      }

      if (!Array.isArray(parsedQueries) || parsedQueries.length === 0) {
        return res.status(400).json({ error: 'Invalid queries format' });
      }

      const imagePath = file.path; // local path to uploaded image

      // Get the validator pipeline instance
      const validator = await ValidatorPipeline.getInstance();

      // Run detection. Xenova's pipeline can load from a local path string.
      const output = await validator(imagePath, parsedQueries);

      // Optional: delete the temp file after processing to save space
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting temp file:', err);
      });
      const cleaned = output.map(({ image, ...rest }) => rest);
      // You can return raw output or wrap it nicely
      res.json({
        detections: cleaned,
      });
    } catch (error) {
      console.error('Error during image validation:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// ===== SERVER START =====
const PORT = 3000;

app.listen(PORT, () => {
<<<<<<< HEAD
  console.log(`Server is running on http://localhost:${PORT}`);
  ValidatorPipeline.getInstance(console.log);
=======
    console.log(`Server is running on http://localhost:${PORT}`);
    // It's good practice to pre-load the model when the server starts
    // to avoid a cold start on the first request.
    ValidatorPipeline.getInstance();
>>>>>>> b9061d17d33991476f2eb9566aff1540da5aabd2
});
