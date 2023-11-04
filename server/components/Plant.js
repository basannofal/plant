const conn = require("../database/conn");

const addPlant = async (req, res) => {
  const { plantName, plantDesc, plantLink, plantImage } = req.body;
  const values = [plantName, plantDesc, plantLink, plantImage];
  console.log(values);

  const q =
    "INSERT INTO ef_plant (plant_name, plant_desc, plant_link, plant_image) VALUES (?)";
  conn.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" }); // Set a 500 status code for server error
    } else {
      console.log(`Plant Add Successfully!`);
      res.status(201).json({ message: "Plant Add Successfully" }); // Set a 201 status code for resource created
    }
  });
};

const fetchPlant = async (req, res) => {
  const q = "SELECT * FROM ef_plant";
  conn.query(q, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" }); // Set a 500 status code for server error
    } else {
      // res.status(201).json({ message: "Plant fetched", data }); // Set a 201 status code for resource created
      res.send(data);
    }
  });
};
module.exports = { fetchPlant, addPlant };
