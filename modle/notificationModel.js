import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
          },
        fullMsg:{
          type:String,
          required:true,
        },
        onClickPath: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now
        },
        ordernumber: {
          type: String,
          required: true,
        },
        ordername: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        }
     
      }
)
 

export const Notification = mongoose.model("notification", notificationSchema);
