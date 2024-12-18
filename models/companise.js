import mongoose from "mongoose";

const companiseShcema=mongoose.Schema({
    name:{type:String,
        unique:true,
        required:true
    },
    description:String,
    website:String,
    location:String,
    title:String,
    logo:String,
    regTime:String,
    updateTime:String,
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
    
},{timestamps:true})
const company =mongoose.model('Company',companiseShcema)
export default company;