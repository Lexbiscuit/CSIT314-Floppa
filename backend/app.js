import express from "express";
import cors from "cors";
import accountRoutes from "./Routes/accountRoutes.js";
import profileRoutes from "./Routes/profileRoutes.js";
import workslotRoutes from "./Routes/workslotRoutes.js";
import mngrbidRoutes from "./Routes/mngrbidRoutes.js";
import staffbidRoutes from "./Routes/staffbidRoutes.js";
import authRoutes from "./Routes/authRoutes.js";


const app = express();
const port = 3000;

// -- middleware --
app.use(express.json()); // parses incoming requests with JSON payloads

// -- CORS --
var corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// -- routes --
app.all("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);

app.use("/accounts", accountRoutes);

app.use("/profiles", profileRoutes);

app.use("/workslots", workslotRoutes);

app.use("/mngrbids", mngrbidRoutes);

app.use("/staffbids", staffbidRoutes);

app.listen(port, () => {
  console.log(`CSIT314 "Team Floppa" Express.js app listening on port ${port}`);
});
