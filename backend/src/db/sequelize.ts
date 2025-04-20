import { Sequelize } from "sequelize-typescript";
import config from "config";

import { User } from "../models/user";
import { Follow } from "../models/follow";
import { Vacation } from "../models/vacation";

const logging = config.get<boolean>("sequelize.logging") ? console.log : false;

const dbConfig = config.get<{
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}>("db");

const sequelize = new Sequelize({
  database: dbConfig.name,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: "mysql",
  models: [User, Vacation, Follow],
  logging,
});

export default sequelize;
