import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    buyeremail: { type: String },
    selleremail: { type: String},
    photo: { type: String },
    itemID: { type: String },
    orderId:{type: String},
    quantity:{type: String},
    Total:{type: String},
    stetus: {
        type: String,
        enum: ["pending", "successful"],
        default: "successful",
      },
    
}, { timestamps: true });



export default mongoose.model("Payment", PaymentSchema);