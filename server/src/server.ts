import path from "path";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from "./routes/users";
import expressSession from "express-session";

const app = express();

dotenv.config({ path: path.resolve(__dirname, "../.env") });
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);
app.use(
  expressSession({
    secret: process.env.EXPRESS_SECRET as string,
    resave: false,
    saveUninitialized: true
  })
);

app.use("/users", UserRouter);

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log("Server listening on port", port);
});
