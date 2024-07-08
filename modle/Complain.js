import mongoose from "mongoose";


const ComplaintSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String},
    photo: { type: String },
    description: { type: String },
    problem_type: { type: String },
    reply: { type: String , default: "" }
}, { timestamps: true });



export default mongoose.model("Complaint", ComplaintSchema);