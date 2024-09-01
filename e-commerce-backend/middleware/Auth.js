const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");


function Auth(req,res,next){
     let authHearder = req.headers.authorization
     if(!authHearder) {
          return res.send({
               status: false,
               message: "No token provided"
          });
     }

     let token = authHearder.split(' ')[1];

     jwt.verify(token, 'Hello_World', async(err, payload) => {
          if(err) {
               return res.send({
                    status: false,
                    message: "Invalid token"
                    });
               }
          const existingUser = await UserModel.findById(payload.id)
          if(!existingUser) {
               return res.send({
                    status: false,
                    message: "User not verified"
               })
          }
          console.log("User Data", existingUser);
          req.userId = payload.id;
          next();
     });
}

module.exports = Auth;