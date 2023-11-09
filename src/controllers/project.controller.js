import Project from '../models/project.model.js'
import Issue from '../models/issues.model.js'

export default class ProjectController {
    static getProjectCreate(req, res) {
        res.render('create_project_page',{
            title: 'Create Project',
            user: req.user
        })    
        }
    static getIssueCreate(req, res) {
        Project.findById(req.params.id)
        .then(project=>{
            res.render('create_issue_page',{
                title: 'Create Issue',
                project
            })    
        }).catch(err=>{
            console.log(err);
        })
        }   
    static getProjecDetail(req, res) {
        const {id} = req.params;
        Project.findById(id).populate('issues')
        .then(project=>{
            res.render('project_detail_page',{
                title: 'Project Details',
                project,
                issues: project.issues,
            })    
        }).catch(err=>{
            console.log(err);
        })
        }
    static createProject(req, res) {
        const project_author = req.user.username;
        const {project_name, project_description} = req.body;
        const newProject = new Project({
            project_name,
            project_description,
            project_author
        })
        Project.create(newProject)
        .then((project) => {
            req.flash('success', 'Project Created Successfully');
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
        })
    }
    static createIssue(req, res) {
        const {title, description, labels, author} = req.body;
        const {id} = req.params;
        const newIssue = new Issue({
            title,
            description,
            labels,
            author,
            project: id
        })
        Issue.create(newIssue)
        .then((issue) => {
            Project.findById(id)
            .then(project=>{
                project.issues.push(issue);
                project.save();
                req.flash('success', 'Issue Created Successfully');
               res.redirect(`/project/detail/${id}`)
            }).catch(err=>{
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    static deleteIssue(req, res) {
        const { id } = req.params;
        Issue.findByIdAndDelete(id)
        .then(issue=>{
            Project.findById(issue.project)
            .then(project=>{
                project.issues.pull(issue);
                project.save();
                req.flash('success', 'Issue Deleted Successfully');
                res.redirect(`/project/detail/${issue.project}`)
            }).catch(err=>{
                console.log(err);
            })
        }).catch(err=>{
            console.log(err);
        })

    }

    static async filterIssues(req, res) {
        try {
            const { id } = req.params;
            const { author, title } = req.body;
    
            // Basic query setup
            const query = { project: id };
    
            // Add filters if provided
            if (author) {
                query.author = author;
            }
    
            if (title) {
                query.title = { $regex: title, $options: 'i' };
            }
    
            const issues = await Issue.find(query);
    
            res.render('project_detail_page', {
                title: 'Project Details',
                project: id,
                issues,
            });
        } catch (error) {
            console.error('Error filtering issues:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    
    

    
} 