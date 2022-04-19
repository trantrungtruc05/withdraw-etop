import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as controller from './controller';
import connection from './db/connection';
import * as withdrawService from './service/withdrawService';
var cron = require('node-cron');

const app: Express = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route("/withdraw/:category").get(controller.withdraw);

// cron.schedule('*/2 * * * * *', async () => {
//   withdrawService.withdraw('csgo');
// });

// cron.schedule('*/2 * * * * *', async () => {
//   withdrawService.withdraw('dota');
// });

app.listen(port, async () => {
  await connection.sync();
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});