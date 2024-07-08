import express from 'express';
import List from '../modle/listModel.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploads = multer({ storage: storage }).single('image');
router.use('/uploads', express.static(join(__dirname, 'uploads')));

// Route for saving all list items from the database
router.post('/',(req, res) => {
    uploads(req, res, async (err) => { // Handle file upload before processing request
        try {
            if (err instanceof multer.MulterError) {
                // Multer error occurred
                return res.status(400).json({ error: err.message });
            } else if (err) {
                // Other errors occurred
                return res.status(500).json({ error: err.message });
            }

            const { paddyType, quantity, pricePer1kg, listCreateBy,listCreateByEmail } = req.body;
            const image = req.file ? req.file.path.replace(/\\/g, '/') : null; // Check if file exists before accessing path

            const newList = new List({
                paddyType,
                quantity,
                pricePer1kg,
                image,
                listCreateBy,
                listCreateByEmail
            });

            await newList.save();
            return res.status(201).json({ message: "List created" });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
});

// Route for getting all list items from the database
router.get('/', async (req, res) => {
    try {
        const listings = await List.find({});
        return res.status(200).json(listings);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
});

// Route for getting a single list from the database by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await List.findById(id);
        return res.status(200).json(listing);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
});

// Route for updating a list
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await List.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: 'List not found' });
        }
        return res.status(200).json({ message: 'List updated successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
});

// Route for deleting a list
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await List.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'List not found' });
        }
        return res.status(200).json({ message: 'List deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
});

export default router;
