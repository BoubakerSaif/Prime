import mongoose from "mongoose";

const categorieSchema = mongoose.Schema({

    cat_name:{type:String,unique:true},
    cat_description:{type:String},

},{timestamps:true})
export default mongoose.model("Categorie" , categorieSchema)
