import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import config from 'config';
import connect from './config/db.config';
import { routes } from './routes';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();


// app.use(connect);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use(routes);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello from the TypeScript world!</h1>');
});
connect();
app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

export default app;