import mongoose from 'mongoose'
import Project from '../models/project.model.js'
export default class homeController{

    static getHome(req, res){
        Project.find()
        .then(projects=>{
            res.render('home',{
                title: 'Home',
                ProjectData: projects,
                user: req.user
        })
        }).catch(err=>{
            console.log("Render Home Error:",err);
            res.status(500).send("Error in rendering Home Page");
    })
        
    }
}