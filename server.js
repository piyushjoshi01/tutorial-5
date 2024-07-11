const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("./UserModel");
app.use(express.json());

app.use(cors());

const PORT = 3000;

const connection_url =
  "mongodb+srv://piyush706:newuser@assignmentcluster1.yktl74n.mongodb.net/Users";

mongoose
  .connect(connection_url)
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log(err));

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    if (users) {
      res.status(200).json({ message: "Users retrived", success: true, users });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const { email, firstName } = req.body;

  try {
    const user = await User.create({ email, firstName });
    return res.status(201).json({ message: "User added", success: true });
  } catch (err) {
    console.log(err);
  }
});

app.get(`/user/:id`, async (req, res) => {
  const { id } = req.params;

  console.log(id);
  try {
    const foundUser = await User.findOne({ id });

    if (foundUser) {
      res.status(200).json(foundUser);
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (err) {
    console.log(err);
  }
});

app.put(`/update/:id`, async (req, res) => {
  const { id } = req.params;
  const { email, firstName } = req.body;

  try {
    const foundUser = await User.findByIdAndUpdate(
      id,
      { email, firstName },
      { new: true }
    );

    if (foundUser) {
      res.status(200).json({ message: "User updated", success: true });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
