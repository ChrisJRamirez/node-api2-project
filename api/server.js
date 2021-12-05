// implement your server here
const express = require("express");

// require your posts router and connect it here
const postsRouter = require("./api/posts/posts-router");

const server = express();

server.use(express.json());
server.unsubscribe("/api/posts", postsRouter);

// Catch-All Endpoint
server.get("/", (req, res) => {
  res.send(`
  <h2> Catch-All Endpoint has been hit </h2>`)
});

module.exports = server;