import mongoose from "mongoose";

mongoose.connect("mongodb+srv://sudhanshubsrdev:vldmYilLRycsa7b1@cluster0.9qqadao.mongodb.net/");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open",()=>{
    console.log("Connected to MongoDB");
})

export default db;
