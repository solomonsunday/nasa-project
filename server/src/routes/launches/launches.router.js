const express = require("express");

const {
  httpGetAllLaunches,
  httpAddNewLuanch,
  httpAbortLaunch,
} = require("./launches.controller");
const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLuanch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
