import mongoose from 'mongoose'

const ShopOwnerSchema = new mongoose.Schema({

    name:{type: String, required: true},
    NIC:{type: String, required: true},
    phone:{type: String, required: true},
    email:{type: String, required: true,unique: true},
    password:{type: String, required: true},
    address:{type: String, required: true},
    role:{type: String, required: true},
    about:{type:String},
    isApproved: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
      },
    
})

export default mongoose.model("ShopOwner", ShopOwnerSchema);