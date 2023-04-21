import './load_env';
import mongoose from 'mongoose';

//connecting to server
mongoose
    .connect(process.env.DB_CONNECTION_URI)
    .then((res) => {
        console.info("Successfully connected to mongodb server");
    })
    .catch((error) => {
        console.info("Error while connectiong to mongodb server", error.message);
    });