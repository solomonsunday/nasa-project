const http = require("http");
require("dotenv").config();

const app = require("./app");
const { mongoConnect } = require("./services/mongo");
const { loadPlanetData } = require("./models/planets.model");
const { loadLunchData } = require("./models/lunches.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
mongoConnect();

async function startServer() {
  await loadPlanetData();
  await loadLunchData();
  server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}...`);
  });
}

startServer();

// ssh -i "nasa-project.pem" ec2-user@ec2-3-138-174-153.us-east-2.compute.amazonaws.com
//NASA-PROJECT % docker build --platform linux/arm64 -t  chinoyerem/nasa-project:latest .  this was used to build for M1 chip
//docker run --restart=always -p  8000:8000 chinoyerem/nasa-project
