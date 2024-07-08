import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        
        
        content:{
            type:String,
            required : true,
        },
        publishDate:{
            type:String,
            required : true,
        },
        rating: {
            type: Number,
            min: 1, // Minimum rating value
            max: 5, // Maximum rating value
            required: true
        },
        ordernumber: {
            type:String,
            required : true,
        },
        ordername:{
            type:String,
            required : true,
        },
        name:{
            type:String,
            required : true,
        },
        photo: {
            type:String,
           
        }
       
    },
    {
        timestamps:true,
    }
);

export const Review = mongoose.model('review',reviewSchema);