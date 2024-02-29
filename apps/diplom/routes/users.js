var express = require("express");
var router = express.Router();
const passport = require("../middleware/passport");
const knex = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const SECRET = "any_secret_you_want_to_use";
const axios = require("axios");
const path = require("path");

require("dotenv").config();
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signUp", async (req, res, next) => {
  if (req.user.admin) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
      await knex("users").insert({
        username: req.body.username,
        password: hashedPassword,
        profile: req.body.profile,
      });
      res.status(200).send("success");
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    res.send({ message: "You have no permission." });
  }
});

router.post(
  "/login",
  passport.authenticate("local"),
  async (req, res, next) => {
    try {
      const user = await knex
        .select("id", "username", "telephone", "email", "role")
        .table("users")
        .where("username", req.user.username)
        .first();

      jwt.sign(user, SECRET, (error, token) => {
        res.status(200).send({ ...user, token });
      });
      console.log(req.user);
    } catch (e) {
      console.log(e);
      res.status(400).send();
    }
  }
);

router.get("/getGroups", auth, async (req, res, next) => {
  try {
    const groups = await knex.select().table("groups");
    res.send(JSON.stringify(groups));
  } catch (e) {
    console.log(e);
  }
});

router.get("/getUsers", async (req, res, next) => {
  try {
    const users = await knex.select().table("users");
    res.send(JSON.stringify(users));
  } catch (e) {
    console.log(e);
  }
});

router.get("/getProfile", async (req, res, next) => {
  try {
    const users = await knex
      .select("username", "telephone", "email")
      .table("users");
    res.send(JSON.stringify(users));
  } catch (e) {
    console.log(e);
  }
});

router.get("/getDocs", auth, async (req, res, next) => {
  try {
    const docs = await knex("uploads")
      .join("users", "uploads.id_user", "users.id_user")
      .select("uploads.id_user", "id_doc", "title", "url", "profile");
    res.send(JSON.stringify(docs));
  } catch (e) {
    console.log(e);
  }
});

router.post("/update", auth, async (req, res, next) => {
  try {
    const { username, password, newpassword, profile } = req.body;

    const userPassword = await knex("users")
      .where("username", username)
      .select("password")
      .first();
    const isCorrectPassword = await bcrypt.compare(
      password,
      userPassword.password
    );

    if (isCorrectPassword) {
      const hashedPassword = await bcrypt.hash(newpassword, 10);
      const user = {
        username,
        password: hashedPassword,
        profile,
      };
      try {
        await knex("users")
          .where("username", username)
          .update({ ...user });
        res.status(200).send("update success!");
      } catch (e) {
        res.status(400).send({ error: e });
      }
    } else {
      res.status(400).send({ error: "old password not correct!" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/remove", auth, async (req, res, next) => {
  try {
    if (req.user.admin) {
      console.log(req.body);
      try {
        await knex("users").where("username", req.body.username).del();
        res.status(200).send("remove success!");
      } catch (e) {
        res.send({ error: e });
      }
    } else {
      res.send({ message: "You have no permission." });
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/updateUsers", async (req, res, next) => {
  try {
    const backup = await knex.select().table("users");
    console.log(req.body);
    try {
      await knex("users").truncate();
      await knex("users").insert([...req.body]);
    } catch (error) {
      console.log(error);
      await knex("users").insert([...backup]);
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;

// router.get("/verify", (req, res, next) => {
//   const token = req.headers.authorization.split(" ")[1]
//   jwt.verify(token, SECRET, (error, decodedToken) => {
//     if (error) {
//       res.status(401).json({
//         message: "Unauthorized Access!"
//       })
//     } else {
//       res.status(200).json({
//         id: decodedToken.id,
//         username: decodedToken.username
//       })
//     }
//   })
// })
