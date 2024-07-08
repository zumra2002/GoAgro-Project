import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        buyername: {
            type: String,
            required: true,
        },

        buyeremail:{
            type: String
        },

        sellername: {
            type: String,
            required: true,
        },

        selleremail : {
            type: String
        },
        type: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
        },
        orderStatus: {
            type: String,
            enum: ["Pending", "Successful"],
            default: "Pending",
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Order', orderSchema);
