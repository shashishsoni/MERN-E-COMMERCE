const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/ErrorHandler");
const InventoryRoutes = require("./routers/InventoryRoutes");
const UserRoutes = require("./routers/UserRoutes");
const Auth = require("./middleware/Auth");
const AddressRoutes = require("./routers/AdressRouters");
const orderRoutes = require("./routers/OrderRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: ['https://mern-e-commerce-1-svyi.onrender.com', 'http://localhost:5173'] // Allow your frontend URL
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

// Serve static files from the Vite build output directory
app.use(express.static('dist'));

// Routes
app.use("/inventory", InventoryRoutes);
app.use("/address", Auth, AddressRoutes);
app.use("/Users", UserRoutes);
app.use("/orders", Auth, orderRoutes);

// Final middleware
app.use(errorHandler); // Error handling

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose
        .connect("mongodb+srv://root:root@shashish.oucqq.mongodb.net/E-commerce?retryWrites=true&w=majority&appName=shashish")
        .then(() => console.log("DB connected"))
        .catch((e) => console.log("Error ++>", e.message));
});

const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'dtbppvpta',
  api_key: '575994427588995',
  api_secret: 'JG6tsp-dQT2hggIpleAY6PDPRF0',
  secure: true,
});

