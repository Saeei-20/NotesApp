import { Schema, model } from "mongoose";
const noteSchema = Schema({
    title: { type: String, required: true },
    body: { type: String, required:true},
    user:{type:String,required:true}
},{
    versionkey:false,
})
const NoteModel = model("note", noteSchema);
module.exports=NoteModel;