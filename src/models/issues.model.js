import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    author:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    labels: [{
        type: String,
        required: true,
    }]
},{timestamps:true});


const Issue = mongoose.model('Issue', issueSchema);

export default Issue;