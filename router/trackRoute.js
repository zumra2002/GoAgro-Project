import express from "express";
import { Track } from "../modle/trackModel.js";
const router = express.Router();

// Route for saving a new Track
router.post('/', async (request, response) =>{
    try{
        if(
            !request.body.OrderId ||
            !request.body.address ||
            !request.body.status
            )  {
            return response.status(400).send({
                message:'Send required field:OrderId',
            });
        }
        const newTrack = {
            OrderId: request.body.OrderId,
            address: request.body.address,
            status :request.body.status
        };
        const track = await Track.create(newTrack);
        return response.status(201).send(track);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for Get All Track from database
router.get('/',async (request, response) =>{
    try{
        const tracks = await Track.find({}); 
        return response.status(200).json({
            count:tracks.length,
            data:tracks
        })

    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

//Route for Get one Track from database by id
router.get('/:id',async (request, response) =>{
    try{

        const { id } = request.params;

        const tracks = await Track.findById(id); 

        return response.status(200).json(tracks)

    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});
//Route for Update a Trrack
router.put('/:id',async (request, response) =>{
    try{
        if(
        !request.body.OrderId ||
        !request.body.address
        ){
            return response.status(400).send({
                message: 'Send all required fields:OrderId, address, status',
            });
        }

        const{ id } = request.params;

        const result = await Track.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({ message: 'Track not found'});
        }
        return response.status(200).send({ message: 'Track updated successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});

    }
});


router.delete('/:id',async(request,response) =>{
    try{
        const { id } = request.params; 

        const result = await Track.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message:'Track not found'});
        }

        return response.status(200).send({message:'Track deleted successfully'});

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});
// GET route for retrieving filtered feedback based on search criteria
router.get("/tracks", async (req, res) => {
    try {
      const { search = "", sort = "name" } = req.query;
  
      // Define search query
      const query = {
        $or: [
          { OrderId: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } },
          { status: { $regex: search, $options: "i" } },
         
        ],
      };
  
      // Fetch filtered feedback based on search criteria and sort
      const tracks = await tracks.find(query)
        .sort({ [sort]: 1 });
  
      res.status(200).json({ count: tracks.length, data: tracks });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  });
export default router;

