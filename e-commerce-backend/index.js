const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/ErrorHandler");
const InventoryRoutes = require("./routers/InventoryRoutes");
const AsyucWapper = require("./middleware/ErrorWrapper");
const UserRoutes = require("./routers/UserRoutes")
const Auth =  require("./middleware/Auth");
const AddressRoutes = require("./routers/AdressRouters");
const orderRoutes = require("./routers/OrderRoutes");

const app = express();

//initia middleware
app.use(cors());
app.use(
     express.urlencoded({
          extended: true
     })
);
app.use(express.json());
app.use(morgan("tiny"));

//routes calling

app.use("/inventory",InventoryRoutes)
app.use("/address", Auth ,AddressRoutes)
app.use("/Users", UserRoutes)
app.use("/orders", Auth, orderRoutes)



// final middleware
app.use(errorHandler); //error handling

const PORT = 8000;
app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
     mongoose
          .connect(
               "mongodb+srv://root:root@shashish.oucqq.mongodb.net/E-commerce?retryWrites=true&w=majority&appName=shashish"
          )
          .then(() => console.log("DB connected"))
          .catch((e) => console.log("Error ++>", e.message));
})