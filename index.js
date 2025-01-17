import express from "express";
import "dotenv/config";
import connectToDB from "./DB/mongoConnection.js";
import cors from "cors";
//import messageRouter from "./routes/Message"
import userRouter from "./routes/user.js";
import profileRouter from "./routes/userProfile.js";
import * as jwt from "./utilities/jwt.js";
import chalk from "chalk";
import mapRouter from "./routes/map.js";
import commentRouter from "./routes/comment.js";
import ratingRouter from "./routes/rating.js";

const app = express();
const PORT = process.env.PORT || 8081;

// MIDDLEWARES
app.use((req, res, next) => {
  console.log(chalk.blue(req.method), chalk.white(req.url));
  next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(jwt.decodeToken);

// AUTHENTICATION
app.use("/users", userRouter);

//USERPROFILE
app.use("/profile", profileRouter);

//MAP
app.use("/map", mapRouter);

//COMMENT
app.use("/comment", commentRouter);

//RATING
app.use("/rating", ratingRouter);

// SIMPLE CRUD EXAMPLE
//
//app.use("/messages", messageRouter)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something broke!" });
});

connectToDB().then(() => {
  app.listen(PORT, () =>
    console.log(
      chalk.green(`LISTENING ON PORT ${PORT} (http://localhost:${PORT})`)
    )
  );
});
