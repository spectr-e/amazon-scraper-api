const express = require("express");
const request = require("request-promise");
const app = express(); // init our application
const PORT = process.env.PORT || 5000; // assigning a static port from where we deploy our application

app.use(express.json()); // allows our application to parse JSON input
app.get("/", (req, res) => {
  res.send("Welcome to Amazon Scraper API"); // returns this statement when user visits the root url
}); // creating a route for our express application (root)
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)) // makes the server listen on the specified port