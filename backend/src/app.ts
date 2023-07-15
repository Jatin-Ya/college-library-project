import dotenv from "dotenv";
dotenv.config();
import express from "express";
const path = require("path");
import booksRouter from "./routes/booksRouter";
import studentsRouter from "./routes/studentsRoutes";
import cors from "cors";
const app: express.Application = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
app.use(express.json());

app.use(express.static("./build"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});
app.get("/books", (req, res) => res.redirect("/"));
app.get("/students", (req, res) => res.redirect("/"));
app.use("/api/v1/books/", booksRouter);
app.use("/api/v1/students/", studentsRouter);

export default app;
