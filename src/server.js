import {default as express} from 'express';
import {fileRoute} from './controllers/file-controller.js'
import {default as cors} from 'cors'
const app = express();
const port = 3000;

app.use(cors());
app.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  next();
});

app.use('/files',fileRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export {app}