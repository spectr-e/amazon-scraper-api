const express = require("express");
const request = require("request-promise");

//creating a node js express backend javascript server with root route
// init our application
const app = express(); 
// assigning a static port from where we deploy our application
const PORT = process.env.PORT || 5000; 
//adding apikey from Scraper API that turns any HTML from any website into useful JSON
const apiKey = "a644d6298b755630a074bd871e5b35cd";
// the autoparse true enables our application parse JSON input
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

 
app.use(express.json()); 
// creating a route for our express application (root)
app.get("/", (req, res) => {
    // returns this statement when user visits the root url
  res.send("Welcome to Amazon Scraper API"); 
}); 

// 1st EndPoint - GET Product Details 
// essentially creating a new route, the colon makes the prodID dynamic
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response)); // making the response readable with parse func
  } catch (error) {
    res.json(error);
  }
});
// 2nd EndPoint - GET Product Reviews 
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`
    );
    res.json(JSON.parse(response)); // making the response readable with parse func
  } catch (error) {
    res.json(error);
  }
});
// 3rd EndPoint - GET Product Offers 
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response)); // making the response readable with parse func
  } catch (error) {
    res.json(error);
  }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // makes the server listen on the specified port
