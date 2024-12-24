import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Category } from "./entity/Category";
import { SubCategory } from "./entity/SubCategory";
import { Question } from "./entity/Question";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "ninja",
  synchronize: true,
  logging: false,
  entities: [User, Category, SubCategory, Question],
  migrations: [],
  subscribers: [],
});
