const conn = require("../database/conn");

const addUser = async (req, res) => {
  console.log("Reached");
  const values = [
    req.body.fullname,
    req.body.email,
    req.body.phone,
    req.body.password,
    req.body.selectedProfile,
    req.body.profilePic,
  ];
  console.log(values);

  const q =
    "insert into ef_user (fullname, email, phone, password, profile_type, profile_pic) values (?)";

  conn.query(q, [values], (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.send(data);
    }
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const q = `SELECT * FROM ef_user WHERE email = '${email}' AND password = '${password}'`;

  conn.query(q, (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.send(result);
  });
};

module.exports = { addUser, userLogin };
