import "./load_env";
import mongoose from "mongoose";
import express, { Express } from "express";
import projectsRouter from "./routes/projects";
import { API_PREFIX_v1 } from "./common/constants";
import commentsRouter from "./routes/comments";
import mailingRouter from './routes/mailing';
// import redisClient from "./services/cache";
import cors from 'cors';
import authRouter from "./routes/auth";
import { authorizationCheck } from "./middleware/authorization";
import userTrackingRouter from "./routes/user-tracking";
const PORT = process.env.PORT || 5000;

const app: Express = express();

app.use(cors({
  origin: "https://practease-6qpyo5lpg-practeasedev.vercel.app", // "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(authorizationCheck);
app.use(`${API_PREFIX_v1}/projects`, projectsRouter);
app.use(`${API_PREFIX_v1}/comments`, commentsRouter);
app.use(`${API_PREFIX_v1}/auth`, authRouter);
app.use(`${API_PREFIX_v1}/mails`,  mailingRouter);
app.use(`${API_PREFIX_v1}/user_tracking`, userTrackingRouter)

const startConnections = async () => {
  try {
    const mongooseConnection = await mongoose.connect(process.env.DB_CONNECTION_URI);
    // const redisConnection = redisClient.connect();
    await Promise.all([mongooseConnection]);
    console.log("Successfully connected to db and cache");
  } catch (error) {
    console.log("Error while connecting to db/cache: ", error.message);
  }
};

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  startConnections();
});
