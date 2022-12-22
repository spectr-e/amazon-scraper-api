const express = require("express");
const request = require("request-promise");

//creating a node js express backend javascript server with root route
// init our application
const app = express();
// assigning a static port from where we deploy our application
const PORT = process.env.PORT || 5000;
//dynamic (from user) Scraper API apikey that turns any HTML from any website into useful JSON
//call it from every endpoint, add query param to every get request that allows users to enter their apikeys
const genScrapUrl = (apiKey) => {
  return `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;
};

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
  const { api_key } = req.query;
  try {
    const response = await request(
      `${genScrapUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response)); // making the response readable with parse func
  } catch (error) {
    res.json(error);
  }
});
// 2nd EndPoint - GET Product Reviews
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${genScrapUrl(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );
    res.json(JSON.parse(response)); // making the response readable with parse func
  } catch (error) {
    res.json(error);
  }
});
// 3rd EndPoint - GET Product Offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${genScrapUrl(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response)); // making the response readable with parse func
  } catch (error) {
    res.json(error);
  }
});
// 4th EndPoint - GET Search Results
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${genScrapUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`
    );
    res.json(JSON.parse(response)); // making the response readable with parse func
  } catch (error) {
    res.json(error);
  }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // makes the server listen on the specified port
