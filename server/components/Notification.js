const conn = require("../database/conn");

const fetchNotification = async (req, res) => {
  const q = "SELECT * FROM ef_notification";
  conn.query(q, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" }); // Set a 500 status code for server error
    } else {
      // res.status(201).json({ message: "Notification fetched", data }); // Set a 201 status code for resource created
      res.send(data);
    }
  });
};
module.exports = { fetchNotification };
