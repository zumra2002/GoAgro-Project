import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import complaintRoute from './router/ComplaintRoute.js'
import farmerRoute from './router/FarmerRoute.js'
import adminRoute from './router/AdminRoute.js'
import bodyParser from 'body-parser'
import listRoute from './router/listRoute.js'
import shopOwnerRoute from './router/ShopownerRoute.js'
import millownerRoute from  './router/MillOwnerRoute.js'
import ordersRoute from './router/ordersRoute.js';
import reviewRoute from './router/reviewRoute.js';
import notificationRoute from './router/notificationRoute.js';
import paymentRoute from './router/PaymentRoute.js'
import trackRoute from './router/trackRoute.js';


dotenv.config()

const app = express()
const port = process.env.PORT || 8000
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));



app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true // Allow cookies and authorization headers with credentials
  }));
  

const corsOption = {
    origin:true
}

app.listen(port,()=>{
    console.log('server is running '+port)
})

//database connection
const URL = process.env.MONGO_URL;


mongoose.connect(URL, {
 
}); 

const connection = mongoose.connection;
connection.once("open", () =>{
    console.log("MongoDb connection sucessfull");
})


//routes

app.use('/complaints', complaintRoute )
app.use('/farmers', farmerRoute )
app.use('/admins', adminRoute)
app.use('/lists', listRoute)
app.use('/shopowners', shopOwnerRoute)
app.use('/millowners', millownerRoute)
app.use('/orders', ordersRoute);
app.use('/reviews', reviewRoute);
app.use('/notifications', notificationRoute);
app.use('/payments', paymentRoute)
app.use('/tracks',trackRoute);



