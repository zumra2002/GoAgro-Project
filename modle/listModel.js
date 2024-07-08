import mongoose from "mongoose";

const { Schema, model } = mongoose;

const listSchema = new Schema(
    {
        paddyType: {
            type: String,
            
        },
        quantity: {
            type: Number,
            
        },
        pricePer1kg: {
            type: Number,
            
        },
        image: {
            type: String,
            
        },

        listCreateBy:{
            type: String
        },

        listCreateByEmail:{
            type: String
        }
    },
    {
        timestamps: true,
    }
);

const List = model('List', listSchema);

export default List;