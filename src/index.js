import {default as express} from 'express';
import FileService from './services/file-service.js'
const app = express()
const port = 3000

app.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  next();
});

app.get('/files/data',async (req, res) => {
  const newFileService= new FileService();
  try{
    const result = await newFileService.getFiles(); 
    res.send(result)
  }catch (error){
    console.log(error)
    res.sendStatus(500).send(`${error}`)
    throw error
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})