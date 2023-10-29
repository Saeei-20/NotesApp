import express from "express";
import cors from "cors";
import connection from "./db.js";
import userRouter from "./routes/user.routes.js";
import { config } from 'dotenv';
config();




const app = express();
const port = process.env.PORT || 3000; // You should provide a default value for PORT if it's not set in the environment.

app.use(cors());
app.use(express.json()); // Use express.json() instead of json()

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send({ message: "API is working now" });
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${port}, database is connected`);
  } catch (error) {
    console.error(error);
  }
});
