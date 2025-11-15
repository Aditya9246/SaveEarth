// download-model.mjs

import { pipeline } from '@xenova/transformers';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the model and the cache directory
const modelName = 'Xenova/owlv2-base-patch16';
const cacheDir = path.join(__dirname, 'models');

console.log(`Starting download of model: ${modelName}`);
console.log(`Model will be saved to: ${cacheDir}`);

// Define a progress callback function
const progress_callback = (data) => {
    if (data.status === 'progress') {
        console.log(`Download progress: ${data.progress.toFixed(2)}% - ${data.file}`);
    } else if (data.status === 'done') {
        console.log(`Finished downloading ${data.file}`);
    }
};

// Download the model
try {
    await pipeline('zero-shot-object-detection', modelName, {
        cache_dir: cacheDir,
        progress_callback: progress_callback
    });
    console.log('Download complete!');
} catch (error) {
    console.error('Error during model download:', error);
}
