import "./load_env";
import mongoose from "mongoose";
import express, { Express } from "express";
import projectsRouter from "./routes/projects";
import { API_PREFIX_v1 } from "./common/constants";
import commentsRouter from "./routes/comments";

const app: Express = express();

app.use(express.json());
app.use(`${API_PREFIX_v1}/projects`, projectsRouter);
app.use(`${API_PREFIX_v1}/comments`, commentsRouter);

//connecting to db and starting server
mongoose
  .connect(process.env.DB_CONNECTION_URI)
  .then((res) => {
    const PORT: number = parseInt(process.env.PORT, 10) || 5000;
    console.info("Successfully connected to mongodb server");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.info("Error while connectiong to mongodb server", error.message);
  });
