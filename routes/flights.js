const Router = require("express-promise-router");

const db = require("../db");

const router = new Router();

router.get("/", async (req, res) => {
  const { rows } = await db.query(
    `select
			f.id,
			l.mission_patch_small,
			r.rocket_name,
			r.rocket_type,
			f.launch_date,
			f.details,
			f.flight_number,
			l.article_link,
			r.land_success,
			r.reused,
			l.reddit_launch
		from
			flights f
			inner join rockets r on r.id = f.rocket_id
			inner join links l on l.flight_id = f.id;
    `
  );
  res.send(rows);
});

module.exports = router;
