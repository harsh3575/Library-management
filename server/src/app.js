import express from "express";
import * as dotenv from 'dotenv';
dotenv.config()
import { router } from "../router/index.js";
import Connection from "../db/connect.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const port = process.env.PORT;

Connection()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use("/api", router)
app.use('/uploads', express.static('uploads'))
app.listen(port, () => {
    console.log('Server started on ' + port);
});