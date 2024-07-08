import express from 'express';
import { Review } from '../modle/reviewModel.js';
const router = express.Router();
import mongoose from 'mongoose';
import multer from 'multer';

const validateFields = (req, res, next) => {
    const requiredFields = [
        "content",
        "rating",
        "publishDate",
        "ordernumber",
        "ordername",
        "name"
     
    ];
    // Check if all required fields are present
    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res
                .status(400)
                .send({ message: `Field '${field}' cannot be empty` });
        }
    }
    next();
}


// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
    }
  });
  
  const upload = multer({ storage: storage });


// Route for create a new review with file upload
router.post('/', upload.single('photo'), async (request, response) => {
    try {
        if (
          !request.body.content ||
          !request.body.rating ||
          !request.body.publishDate ||
          !request.body.ordernumber ||
          !request.body.photo ||
          !request.body.ordername ||
          !request.body.name
        ) {
          return response.status(400).send({
            message: 'Send all required fields',
          });
        }
    
        // Retrieve file path from request.file
        const photoPath = request.file ? request.file.path : '';
    
        const newReview = {
          content: request.body.content,
          rating: request.body.rating,
          publishDate: request.body.publishDate,
          ordernumber: request.body.ordernumber,
          photo: photoPath, // Use file path instead of file object
          ordername: request.body.ordername,
          name: request.body.name,
        };
    
        const review = await Review.create(newReview);
    
        return response.status(201).send(review);
      } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
    });
   // Route for retrieving a specific review by ID
 router.get('/:identifier', async (request, response) => {
    try {
        // Extracting the identifier from the request parameters
        const { identifier } = request.params;
  
        // Checking if the provided identifier is a valid MongoDB ObjectId
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            // Fetching a review from the database based on the ID
            const ReviewByID = await Review.findById(identifier);
            if (ReviewByID) {
                // Sending the fetched review as a JSON response if found by ID
                return response.status(200).json(ReviewByID);
            }
        }
  
        // If the provided identifier is not a valid ObjectId, try searching by register number
        const ReviewByORDERNUMBER = await Review.find({ ordernumber: identifier });
        if (ReviewByORDERNUMBER) {
            // Sending the fetched review as a JSON response if found by register number
            return response.status(200).json(ReviewByORDERNUMBER);
        }
  
        // If no review found by either ID or register number, send a 404 Not Found response
        return response.status(404).json({ message: 'review not found' });
    } catch (error) {
        // Handling errors and sending an error response with detailed error message
        console.error(error);
        response.status(500).send({ message: 'Error fetching review: ' + error.message });
    }
  }); 

//Route for Get All reviews from database
router.get('/', async (request, response) => {
    try {
        const reviews = await Review.find({});

        return response.status(200).json(reviews);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for Get one review from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const reviews = await Review.findById(id);

        return response.status(200).json(reviews);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for update review
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.content ||
            !request.body.rating ||
            !request.body.publishDate ||
            !request.body.ordernumber ||
            !request.body.ordername ||
            !request.body.name 
           
        ) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }
        const { id } = request.params;

        const result = await Review.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Review not found' });
        }

        return response.status(200).send({ message: 'Review updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for Delete a review
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Review.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Review not found' });
        }

        return response.status(200).send({ message: 'Review deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//GET search bar
router.get("searchreview", function (req, res) {
    var search = req.query.search;
    console.log(search);
    Review.find({
        $or: [
            
            { content: { $regex: search, $options: "i" } },
            { publishDate: { $regex: search, $options: "i" } },
            { ordernumber: { $regex: search, $options: "i" } },
            { name: { $regex: search, $options: "i" } },
            { ordername: { $regex: search, $options: "i"} }
           
        ]
    }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
}); 

router.get('/name/:name', async(req,res)=>{ // view all reviews one 

    const name = req.params.name
try{

    const reviews = await Review.find({name})

    return res.status(200).json({
        
        data: reviews
    })

}catch(err){
    console.log(err.message)
    res.status(500).send({message: err.message})
}
}) 

export default router;