import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

import buildHTTPTodoController from "./todo/controller/http-todo";
import buildMongoTodoRepo from "./todo/repo/mongo-todo";
import buildTodoUCase from "./todo/usecase";

dotenv.config();

const mongoURL = "mongodb://localhost:27017";

(async () => {
  const client = new MongoClient(mongoURL, { useNewUrlParser: true });
  await client.connect();
  const todoDb = client.db("todo");
  const todoRepo = buildMongoTodoRepo({ db: todoDb });
  const todoUCase = buildTodoUCase({ todoRepo });
  const todoController = buildHTTPTodoController({ todoUCase });

  const app = express();
  app.use(bodyParser.json());

  app.post("/todo", (req, res) => {
    const httpReq = {
      body: req.body,
    };

    todoController.createTodo(httpReq).then((httpRes) => {
      if (httpRes.headers) {
        res.set(httpRes.headers);
      }

      res.type("json").status(httpRes.statusCode).send(httpRes.body);
    });
  });

  app.listen(3000, () => {
    console.log("App listening on port 3000");
  });
})();
