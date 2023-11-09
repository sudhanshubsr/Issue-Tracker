import mongoose from "mongoose";
import Issue from './issues.model.js';
const projectSchema = new mongoose.Schema({
    project_name:{
        type:String,
        required:true
    },
    issues:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Issue'
    }],
    project_description:{
        type:String,
        required:true
    },
    project_author:{
        type:String,
        required:true
    },
    },{timestamps:true});

    const Project = mongoose.model('Project',projectSchema);
    export default Project;
    