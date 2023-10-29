import { Schema, model } from "mongoose";
const userSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required:true},
    password:{type:String,required:true}
},{
    versionkey:false,
})
const userModel = model("user", userModel);
module.exports=userModel;