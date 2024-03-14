const express = require("express");
const morgan = require("morgan");

const app = new express();
app.use(morgan('dev'));
app.use(express.json());

// in memory storage for task
let tasks = [];
// route to get all tasks
app.get('/',(req,res)=>{
    res.json(tasks);
})

//route to create a new task
app.post('/tasks',(req,res)=>{
    tasks.push(req.body);
    res.send({message:"tasks added successfully",tasks})
})
//route
app.put('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const updatetasktask = req.body
    const index=tasks.findIndex(task=>task.id===id)
    if(index===-1)
    {
        res.send("Task not found")
    }
    else{
        tasks.splice(index,1,updatetasktask);
        res.send({message:"task updated succesfully",tasks})
    }
})


app.get('/task/:id',(req,res)=>{
    const id = req.params.id;
    const task=tasks.find(task=>task.id===id)
    if(!task)
    {
        res.send("Task not found")
    }
    else{
        res.json(task);
    }
})
        
    

app.listen(3005,(req,res)=>{
    console.log("port is up")
})

app.delete('/remove/:id',(req,res)=>{
    const id = req.params.id
    const index = tasks.findIndex((task)=>task.id===id)
    if(index===-1){
        res.send("Not there!")
}else{
    tasks.splice(index,1)
    res.send("Item deleted")
}
})