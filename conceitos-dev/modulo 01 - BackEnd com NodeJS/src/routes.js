const express = require('express');
const { uuid } = require('uuidv4');
const router = express.Router();

const projects = [];

function logRequest(req,res,next)
{
  const {method, url} = req;
  console.log(`[${method}] ${url}`);
  console.time(method);
  next();
  console.timeEnd(method);
}

router.use(logRequest);

router.post('/projects', (req,res) => {
  const { title, owner } = req.body; 
  const project = {
    id: uuid(),
    title,
    owner 
  };
  projects.push(project);
  return res.json(project);
});

router.delete('/projects/:id', (req,res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(project => project.id === id);
  if(projectIndex < 0)
    return res.status(400).json({ message: "Project not found!" });

  projects.splice(projectIndex, 1);
  return res.status(204).send(); 
});

router.get('/projects', (req,res) => {
  const { title } = req.query;

  const result = title 
    ? projects.filter(
        project => project.title.includes(title))
    : projects;  

  return res.json(result);
});

router.put('/projects/:id', (req,res) => {
  const { id } = req.params;
  const { title, owner } = req.body; 

  const projectIndex = projects.findIndex(project => project.id === id);
  if(projectIndex < 0)
    return res.status(400).json({ message: "Project not found!" });

  const project = {
    id, 
    title,
    owner,
  }

  projects[projectIndex] = project;

  return res.status(200).json(project); 
});

module.exports = router;