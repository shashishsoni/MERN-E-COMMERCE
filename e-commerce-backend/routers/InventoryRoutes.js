const express = require("express");
const InventoryModel = require("../models/InventoryModel");
const AsyncWapper = require("../middleware/ErrorWrapper");
const Auth = require("../middleware/Auth")

const router = express.Router();

router.get(
     "/",
     Auth,
     AsyncWapper(async (req, res) => {
          const product = await InventoryModel.find();

          return res.status(200).send({
               message: "Inventory list",
               data: product,
          });
     })
);

router.post("/create-inventory",Auth, AsyncWapper(async (req, res) => {
     let data = req.body.data;
     let resp = await InventoryModel.insertMany(data);
     //console.log("Resp", resp);
     return res.send({
          message: "Inventory created",
          status: true,
          resp,
     })
})
);

module.exports = router;