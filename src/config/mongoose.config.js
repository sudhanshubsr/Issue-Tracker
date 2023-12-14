import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://sudhanshubsrdev:8CWBDGJUzl7nuIV4@cluster0.wbtwrdy.mongodb.net/IssueTracker?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

export default db;
