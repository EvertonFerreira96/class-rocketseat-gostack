const express = require('express');
const { uuid } = require('uuidv4');
const routes = express.Router();

const repositories = [];

routes.get("/repositories", (request, response) => {
  return response.json(repositories);
});

routes.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = 
    { id: uuid()
     ,title
     ,url
     ,techs
     ,likes: 0 }
  repositories.push(repository);
  return response.json(repository);

});

routes.put("/repositories/:id", (request, response) => {
   const { id } = request.params;
   const { title, url, techs } = request.body;
   const index = repositories.findIndex(r => r.id == id ); 
   
   if(index < 0)
    return response.status(400).json({ message: "Repository not found!" });
   
   const {likes} =  repositories.find(r => r.id == id );
   const repository = {  id
                        ,title
                        ,url
                        ,techs
                        ,likes: likes };
   repositories[index] = repository;
   return response.json(repository);
});

routes.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex(r => r.id == id ); 
  if(index < 0)
    return response.status(400).json({ message: "Repository not found!" });
  repositories.splice(index, 1);
  return response.status(204).send(); 
});

routes.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex(r => r.id == id ); 
  if(index < 0)
   return response.status(400).json({ message: "Repository not found!" });
   repositories[index].likes = repositories[index].likes+1;
   const likes = repositories[index].likes;
  
  return response.json({likes});

});

module.exports = routes;