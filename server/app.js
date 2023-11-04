const express = require("express");
const app = express();
const conn = require("./database/conn");
const User_Route = require("./routes/user");
const Plant_Route = require("./routes/plant");
const Notification_Route = require("./routes/notification");

app.use(express.json());

app.use("/", User_Route);
app.use("/", Plant_Route);
app.use("/", Notification_Route);

app.listen(8000, () => {
  console.log("Server Created");
});
