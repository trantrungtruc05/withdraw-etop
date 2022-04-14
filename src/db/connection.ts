import { Sequelize } from "sequelize-typescript";

import { ConfigInfo } from "../entity/ConfigInfo";
import { EtopItemPage } from "../entity/EtopItemPage";

const connection = new Sequelize({
  dialect: "postgres",
  host: "35.213.181.248",
  username: "tructran",
  password: "652606",
  database: "crawl",
  logging: false,
  models: [ConfigInfo, EtopItemPage],
});

export default connection;