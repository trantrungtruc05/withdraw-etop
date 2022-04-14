import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as controller from './controller';
import connection from './db/connection';

const app: Express = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.route("/withdraw").get(controller.withdraw);

app.listen(port, async() => {
  await connection.sync();
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});