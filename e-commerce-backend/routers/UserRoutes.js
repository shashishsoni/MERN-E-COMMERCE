const express = require("express");
//const bcrypt = require("bcrypt");
const argon2 = require("argon2");
const AsyncWapper = require("../middleware/ErrorWrapper");
const userModel = require("../models/UserModel");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
     return res.send("Runnning");
});

router.post("/sign-up", AsyncWapper(async (req, res) => {
     const existingUser = await userModel.findOne({
          email: req.body.email,
     });

     //console.log(existingUser);
     if (existingUser) {
          return res.send({
               message: "User already exists",
               status: false,
          });
     }

     const hashedpassword = await argon2.hash(req.body.password, {
          type: argon2.argon2id,
          memoryCost: 2 ** 16,
          timeCost: 4,
          hashLength: 32,
          parallelism:2,  
     });
     req.body.password = hashedpassword;
     let newUser = new userModel(req.body);
     await newUser.save();

     return res.send({
          message: "User created successfully",
          status: true,
     })
}));

router.post("/sign-in", AsyncWapper(async (req, res) => {
     const existingUser = await userModel.findOne({
          email: req.body.email,
     });

     //console.log(existingUser);
     if (!existingUser) {
          return res.status(400).send({
               message: "User not found",
               status: false
          });
     }

     const isVaildPwd = await argon2.verify(
          existingUser.password,
          req.body.password,
     );

     if (!isVaildPwd) {
          return res.status(400).send({
               message: "Invalid password",
               status: false
          });
     } else {
          const access_token = jwt.sign({
               id: existingUser._id,
          },
               "Hello_World",
               {
                    expiresIn: "1h",
               }
          );

          return res.send({
               message: "Login success",
               status: true,
               access_token: access_token
          });
     }
}));

module.exports = router;