require("dotenv").config();
const express = require("express");
const app = express();
port = 5000;
const userRoutes = require("./Routes/User.routes");
const ProductRoutes = require("./Routes/product.routes");
const connectdb = require("./Config/db");

connectdb();

app.use(express.json());
app.use('/',userRoutes);
app.use('/',ProductRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});