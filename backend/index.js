require("dotenv").config();
const express=require("express");
const mongoose = require("mongoose");


const app=express();
const PORT=process.env.PORT ||8000;
const cardModel=require("./userModel/cardModel")
const MongoUri=process.env.MONGO_URI;
const cors=require("cors")

//middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cors());

//db connection
mongoose
.connect(MongoUri)
.then(()=>{
console.log("connection successfull")
})
.catch((err)=>{
    console.log("Err:",err)
})




app.get("/",(req,res)=>{
    res.status(200)
})



app.post("/cards",async (req,res)=>{
    const {id,title,description}=req.body;
    try {
        
        console.log(req.body,id)
        const newCard= new cardModel({ id,title,description})
        await newCard.save();
        res.json(newCard)
        
    
    }catch (error) {
        return res.status(400).json(error);
      }
    
})

app.get("/cards",async (req,res)=>{
    try {
        const cards = await cardModel.find();
        res.status(200).json(cards);
    } catch (err) {
        res.status(500).json({error:err.message});
    } 
})

app.get("/cards:title",async (req,res)=>{
    try {
        const card = await cardModel.findOne({ title: req.params.title });
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.listen(PORT,(req,res)=>{
    console.log("Server running on Port:"+PORT)
})