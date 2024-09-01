const express = require("express");
const AsyncWapper = require("../middleware/ErrorWrapper");
const userModel = require("../models/UserModel");
const { model } = require("mongoose");
const AddressModel = require("../models/AddressModel");

const router = express.Router();

router.get("/get-user-address", AsyncWapper(async(req,res)=>{
     let address = await AddressModel.find({user: req.userId});
     return res.send({
          status:true,
          data:address
     });

}));

router.post("/create-user-address", AsyncWapper(async(req,res)=>{
     const address = new AddressModel({
          ...req.body,
          user: req.userId
     });
     await address.save();
     return res.send({
          status:true,
          message: "address is created",
          data:address
     });
}));


router.delete('/delete-address/:id', AsyncWapper(async(req, res) => {
     const { id } = req.params;
     const userId = req.userId;

     const address = await AddressModel.findOneAndDelete(
          {_id: id, user: userId},
          {isDeleted: true, isDeletedAt: new Date()},
          {new: true}
     );

     if(!address) {
          return res.status(404).send({
               status: false,
               message: "Address not found",
          }); 
     }
     return res.status(200).send({
          message: "Address deleted successfully",
          ststus: true,
          data: address
     });
}));

router.put('/update-address/:id',AsyncWapper(async(req, res) => {
     const { id } = req.params;
     const userId = req.userId;
     const updateData = req.body;

     const address = await AddressModel.findOneAndUpdate(
          { _id: id,  user: userId },
          updateData,
          { new: true }
     );

     if(!address) {
          return res.status(404).send({
               status: false,
               message: "Address not found",
          });
     }

     return res.status(200).send({
          status: true,
          message: "Address updated successfully",
          data: address
     });
}));



module.exports = router;