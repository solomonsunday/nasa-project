const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const planets = require("./planet.mongo");

// console.log(parse(), "parse");

const results = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        // Using upsert to insert + update value in the field
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err, "err message");
        reject(err);
      })
      .on("end", async () => {
        const countPlantFount = (await getAllPlanets()).length;
        console.log(
          `${countPlantFount} habitable planet found`,
          "habitablePlanets"
        );
        console.log("done");
      });
    resolve();
  });
}

async function getAllPlanets() {
  // return habitablePlanets;
  return await planets.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log("Could not davde a planet", +err);
  }
}

module.exports = {
  loadPlanetData,
  getAllPlanets,
};
