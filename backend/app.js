import express from "express";
import accountRoutes from "./Routes/accountRoutes.js";
import profileRoutes from "./Routes/profileRoutes.js";

const app = express();
const port = 3000;

// -- middleware --
app.use(express.json()); // parses incoming requests with JSON payloads

app.all("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/account", accountRoutes);

app.use("/profile", profileRoutes);

app.listen(port, () => {
  console.log(`CSIT314 "Team Floppa" Express.js app listening on port ${port}`);
});
