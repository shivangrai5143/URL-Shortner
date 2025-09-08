const express = require('express');
const { connectToMongoDB } = require("./connect");
const urlRoute = require('./routes/url');
 
const url = require('./models/url');
const app = express();
const port = 8001;

// Database connection
connectToMongoDB("mongodb://localhost:27017/url-shortner").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});

// Middleware - This must come BEFORE your routes
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Add this to handle form submissions as well

// Routes
app.use("/url", urlRoute);

app.get("/:shortId",async (req,res)=>{
 const shortId=req.params.shortId;
  const entry = await url.findOneAndUpdate({
   shortId
 },{$push:{
  visitHistory:{
    timestamp : Date.now()
  },
 } })
 res.redirect(entry.redirectUrl);
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
