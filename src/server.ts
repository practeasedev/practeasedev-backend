import "./load_env";
import mongoose from "mongoose";
import express, { Express } from "express";
import projectsRouter from "./routes/projects";
import { API_PREFIX_v1 } from "./common/constants";
import commentsRouter from "./routes/comments";
import redisClient from "./services/cache";
import authRouter from "./routes/auth";


const PORT = process.env.PORT || 5000;

const app: Express = express();

app.use(express.json());
app.use(`${API_PREFIX_v1}/projects`, projectsRouter);
app.use(`${API_PREFIX_v1}/comments`, commentsRouter);
app.use(`${API_PREFIX_v1}/auth`, authRouter);

const startConnections = async () => {
  try {
    const mongooseConnection = mongoose.connect(process.env.DB_CONNECTION_URI);
    const redisConnection = redisClient.connect();
    await Promise.all([mongooseConnection, redisConnection]);
    console.log('Successfully connected to db and cache');
  } catch (error) {
    console.log('Error while connecting to db/cache: ', error.message);
  }
}

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    startConnections();
});


