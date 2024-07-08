import express from 'express';
import {Notification} from '../modle/notificationModel.js'; // Assuming Notification is the default export
import mongoose from 'mongoose';
const router = express.Router();




 // Route for retrieving a specific Order by ID
 router.get('/:identifier', async (request, response) => {
    try {
        const { identifier } = request.params;
  
        // Fetch notification data from the database based on the identifier
        const notification = await Notification.findOne({ ordernumber: identifier });
        
        if (notification) {
            // Extract the necessary fields from the notification data
            const { ordernumber, ordername, name } = notification;

            // Sending the fetched notification data as a JSON response
            return response.status(200).json({ ordernumber, ordername, name });
        } else {
            // If no notification found, send a 404 Not Found response
            return response.status(404).json({ message: 'Notification not found' });
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Error fetching notification: ' + error.message });
    }
});



//Route for create a new notification
router.post('/',async(req,res)=>{
    try{
        if(
            
            !req.body.message ||
            !req.body.fullMsg ||
            !req.body.onClickPath ||
            !req.body.ordernumber ||
            !req.body.ordername ||
            !req.body.name
          
             
        ){
            return res.status(400).send({
                message: 'Send all required fields',
            });
        }
        const newNotification={
           
            message:req.body.message,
            onClickPath:req.body.onClickPath,
            fullMsg:req.body.fullMsg,
            ordernumber:req.body.ordernumber,
            ordername:req.body.ordername,
            name:req.body.name,
            
        };

        const notification = await Notification.create(newNotification);

        return res.status(201).send(notification);
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }

});
//Route for Get All notifications from database
router.get('/',async(request,response)=>{
    try{
        const notifications = await Notification.find({});

        return response.status(200).json(notifications);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

// Route to get one notification by ID
router.get('/details/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});



// Route to delete a notification by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Notification.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get one notification by name
router.get('/detailsByName/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const notification = await Notification.find({ name });
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
export default router;
