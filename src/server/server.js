// server.js

// Import necessary libraries
import express from 'express';
import { pipeline } from '@xenova/transformers';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define a singleton class to manage the object detection model.
// This ensures the model is loaded only once, improving performance.
class ValidatorPipeline {
    static task = 'zero-shot-object-detection';
    static model = 'Xenova/owlv2-base-patch16';
    static instance = null;

    // Static method to get the pipeline instance.
    // If the instance doesn't exist, it's created.
    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, {
                cache_dir: path.join(__dirname, 'models'), // Use the local models directory
                local_files_only: true, // Force loading from local files only
                progress_callback
            });
        }
        return this.instance;
    }
}

// Initialize the Express app
const app = express();

// Use the express.json middleware to parse JSON request bodies
app.use(express.json());

// Define the POST endpoint for image validation
app.post('/validate-image', async (req, res) => {
    // Extract image_url and queries from the request body
    const { image_url, queries } = req.body;

    // Basic validation for the request body
    if (!image_url || !queries || !Array.isArray(queries)) {
        return res.status(400).json({ error: 'Missing image_url or queries' });
    }

    try {
        // Get the validator pipeline instance
        const validator = await ValidatorPipeline.getInstance();

        // Run the object detection on the provided image and queries
        const output = await validator(image_url, queries);

        // Return the detection results as a JSON array
        res.json(output);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error during image validation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define the port the server will listen on
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // It's good practice to pre-load the model when the server starts
    // to avoid a cold start on the first request.
    ValidatorPipeline.getInstance(console.log);
});
