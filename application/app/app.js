import bodyParser from 'body-parser';
import config from './config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import routes from './REST/routes';

const app = express();
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '2048kb' }));

app.use(cors());

routes(app);

app.listen(config.port, function () {
  console.info(`Server is running at ${config.port}`)
});