import mongoose from "mongoose";

const applicationsSchama=new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Jobs',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:'pending'
    }
},{timestamps:true}
)

export const Application=mongoose.model('Application',applicationsSchama)