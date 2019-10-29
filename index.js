const express = require('express');
const server = express();

let count = 0;


const projects = [];


server.use(express.json());


//----------MIDDLEWARES----------

function checkProjectExists(req, res, next) {
    const { index } = req.params;
    

    const projectIndex = projects.findIndex((item) => {
        return item.id == index;
    });


    if(!projects[projectIndex]){
        return res.status(400).json({ error: "Usuário não existe" });
    }
    next();
    
};

server.use('/projects', (req, res, next) => {
    count += 1;
    console.log(count);
    next();
})


//----------ROUTES----------


server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.get('/projects/:index', checkProjectExists, (req, res) => {
    const { index } = req.params;

    const projectIndex = projects.findIndex((item) => {
        return item.id == index
    });

    res.json(projects[projectIndex]);
})

server.post('/projects', (req, res) => {
    const { body } = req;

    body.tasks = [];

    projects.push(body);

    return res.json(projects);
});

server.post('/projects/:index/tasks', checkProjectExists, (req, res) => {
    const { index } = req.params;

    const projectIndex = projects.findIndex((item) => {
        return item.id == index;
    });
    
    projects[projectIndex].tasks.push(req.body.task);

    return res.json(projects);
})

server.delete('/projects/:index', checkProjectExists, (req, res) => {
    const { index } = req.params;

    const projectIndex = projects.findIndex((item) => {
        return item.id == index;
    });
    
    projects.splice(projectIndex, 1);

    return res.json(projects);
})

server.listen(3333);