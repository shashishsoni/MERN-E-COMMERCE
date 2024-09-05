const express = require("express");
const InventoryModel = require("../models/InventoryModel");
const AsyncWapper = require("../middleware/ErrorWrapper");
const Auth = require("../middleware/Auth")

const router = express.Router();

router.get(
     "/",
     AsyncWapper(async (req, res) => {
          const product = await InventoryModel.find();

          return res.status(200).send({
               message: "Inventory list",
               data: product,
          });
     })
);

router.get("/Search/:keyword", Auth, AsyncWapper(async (req, res) => {
     let keyword = req.params.keyword;
     
     // If no keyword is provided, return an empty result
     if (!keyword || keyword.trim() === "") {
         return res.status(200).send({
             data: [],
         });
     }
 
     try {
         // Find matching products based on keyword
         let resp = await InventoryModel.find({
             $or: [
                 { name: { $regex: keyword, $options: "i" } },  // Case-insensitive search
                 //{ description: { $regex: keyword, $options: "i" } }
             ]
         });
 
         // Return the search results
         return res.status(200).send({
             data: resp
         });
     } catch (error) {
         console.error("Search error: ", error);
         return res.status(500).send({
             message: "Internal Server Error",
             error: error.message
         });
     }
 }));
 

router.post("/create-inventory",AsyncWapper(async (req, res) => {
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