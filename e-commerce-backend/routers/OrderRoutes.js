const express = require("express");
const AsyncWrapper = require("../middleware/ErrorWrapper");
const InventoryModel = require("../models/InventoryModel");
const userModel = require("../models/UserModel");
const Address = require("../models/AddressModel");
const OrderModel = require("../models/OrderModels");

const router = express.Router();
router.get("/get-user-order", AsyncWrapper(async(req,res) => {
     console.log(req.body);
     const order = await OrderModel.find({user: req.userId})
     .populate('product.item_id', "name description price")
     .populate("address")
     return res.send({
          status: 200,
          data: order,
     })
}));

router.get("/get-user-order-by-id/:id", AsyncWrapper(async(req,res) => {
     const order = await OrderModel.findById(req.params.id)
     .populate('product.item_id', "name description price")
     .populate("address")
     return res.send({
          status: 200,
          data: order,
     })
}));

router.post("/create-new-order", AsyncWrapper(async(req,res) => {
     const newOrder = new OrderModel({
          ...req.body,
          user: req.userId,
     });

     const {product} = req.body;

     for(let i=0; i< product.length; i++) {
          const {item_id, quantity} = product[i];

          const inventoriesItem = await InventoryModel.findById(item_id);
          
          if(!inventoriesItem) {
               return res.status(400).send({
                    message: `Item with thid ID ${item_id} not found in inventories`,
                    status: false,
               });
          }

          if(quantity > inventoriesItem.quantity) {
               return res.status(400).send({
                    message: `connot order ${quantity} unit of ${inventoriesItem.name}. Only ${inventoriesItem.quantity} units are availabe`,
                    status: false,
               });
          }
     }   

     await newOrder.save();

     return res.send({
          status: 200,
          message: "order placed",
     })
}));

module.exports = router;