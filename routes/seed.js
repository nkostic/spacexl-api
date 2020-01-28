const Router = require("express-promise-router");
const db = require("../db");
const seed = require("../seed-data.json");

const router = new Router();

router.get("/", async (req, res) => {
  const { rows } = await db.query(
    `SELECT
	(select count(1) from flights) as flights
	,(select count(1) from rockets) as rockets
	,(select count(1) from links) as links;`
  );
  if (rows[0].flights == 0 && rows[0].rockets == 0 && rows[0].links == 0) {
    for (let i = 0; i < seed.length; i++) {
      const flight = seed[i];
      const rocket = flight.rocket;
      const links = flight.links;
      if (rocket != null) {
        const rockets = await db.query(
          `SELECT id FROM rockets WHERE rocket_name=$1;`,
          [rocket.rocket_name]
        );
        let rocket_id = null;
        if (rockets.rowCount > 0) {
          rocket_id = rockets.rows[0].id;
        } else {
          const insert_rocket = await db.query(
            `INSERT INTO rockets (rocket_name,rocket_type,reused,land_success) values ($1, $2, $3, $4) RETURNING id;`,
            [
              rocket.rocket_name,
              rocket.rocket_type,
              rocket.first_stage.cores.filter(core => core.reused == true).length>0,
              rocket.first_stage.cores.filter(core => core.land_success == true).length>0
            ]
          );
          rocket_id = insert_rocket.rows[0].id;
        }

        const insert_flight = await db.query(
          `INSERT INTO flights (flight_number, launch_date,details,rocket_id) values ($1,$2,$3,$4) RETURNING id`,
          [
            flight.flight_number,
            flight.launch_date_utc,
            flight.details,
            rocket_id
          ]
        );
        const flight_id = insert_flight.rows[0].id;

        await db.query(
          `INSERT INTO links (flight_id,mission_patch,mission_patch_small,article_link,reddit_launch) values ($1,$2,$3,$4,$5)`,
          [
            flight_id,
            links.mission_patch,
            links.mission_patch_small,
            links.article_link,
            links.reddit_launch == null ? false : true
          ]
        );
      }
    }
    res.send({ info: "Database Seeded Successfully!" });
  } else {
    res.send({ info: "Database is not empty, can not seed." });
  }
});

module.exports = router;
