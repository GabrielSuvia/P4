import express from 'express';
const app = express();
const PORT = 3000;

//lista harcodeados
let listTask = [{tarea:"hacer la casa", estado:"pendiente"},{tarea:"hacer el cuarto", estado:"pendiente"},{tarea:"pasear al perro", estado:"pendiente"}];
//const listComplete = [];


app.use(express.json());

//rutas get
app.get('/tarea',(req,res)=>{
       return res.send("ruta de tarea")
})

app.get('/tarea/tareas',(req,res)=>{
    const lisTareas =listTask.filter((tarea)=> tarea.estado === "pendiente")
    return res.send(lisTareas)
})

app.get('/tarea/:id', (req, res) => {
    const taskId = req.params.id
    res.send(`consiguiendo, ${JSON.stringify(listTask[Number(taskId)])}...`);
  });

//ruta con post

app.post('/tarea/add',(req,res)=>{
const {tarea, estado} =  req.body//req.body with thunder client
if(tarea && estado){
    listTask.push({tarea,estado});
    res.send(`tarea añadida a la lista:${JSON.stringify(listTask)}`);
};
    res.send('invalid request')
   

})

//ruta con delete

app.delete('/tarea/delete/:id',(req,res)=>{

    const taskId = Number(req.params.id);
    if(taskId <= listTask.length){
        const elemTask = listTask[taskId];
        const listUpdate = listTask.filter((task,i)=> i !== taskId );
         listTask = [...listUpdate]
     res.send(`tarea, ${JSON.stringify(elemTask)} eliminada`);
    }
    res.send(`invalid id`);
    })

app.put('/tarea/update/:id',(req,res)=>{
    const taskId = Number(req.params.id);
    const long = listTask.length-1;
    if(taskId>=0 && taskId <= long){
        listTask[taskId].estado ="completed" 
        return res.send(`tarea actualizada:${JSON.stringify(listTask[taskId])}`)
    }
    return res.send(`invalid id`)
})

app.listen(PORT,()=>{
    console.log("conected server")
})