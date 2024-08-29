const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const cardModel=new Schema({
     id:{
         type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
    }, 
    description:{
        type:String,
        required:true,
    }
});

module.exports=mongoose.model("user",cardModel);