import mongoose from 'mongoose';


const TrackModel = mongoose.Schema(
    {
        OrderId: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true  // Ensure status field is required
        }
       
    
});

export const Track = mongoose.model('tracks',TrackModel);
