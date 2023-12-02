import {default as express} from 'express';
const router = express.Router()
import FileService from '../services/file-service.js'
import FileServiceMapper from '../services/file-service-mapper.js'
import axios from 'axios';

/**
 *  Handle the route of Files/data
 */
router.get('/data',async (req, res) => {
    const newFileService= new FileService(axios.create(),FileServiceMapper);
    try{
      const result = await newFileService.getFiles(); 
      res.send(result)
    }catch (error){
      console.log(error)
      res.sendStatus(500).send(`${error}`)
      throw error
    }
  });

  export {router as fileRoute}