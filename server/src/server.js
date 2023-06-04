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
