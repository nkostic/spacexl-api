const Router = require("express-promise-router");

const db = require("../db");

const router = new Router();

router.get("/land/:land/reused/:reused/with/:with", async (req, res) => {

	const queryParams = [];
	let queryWhereClause = ``;
	let index = 0;
	for (const prop in req.params) {
		if(req.params[prop]=='true'){
			index++;
			queryParams.push(true);
			if(prop=='land'){
				queryWhereClause = `${queryWhereClause} and r.land_success = $${index}`
			}
			if(prop=='reused'){
				queryWhereClause = `${queryWhereClause} and r.reused = $${index}`
			}
			if(prop=='with'){
				queryWhereClause = `${queryWhereClause} and l.reddit_launch = $${index}`
			}
		}
	}
	
	const querry =   `select
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
		inner join links l on l.flight_id = f.id
	where
		1=1
		${queryWhereClause}
	order by f.launch_date desc;
	`;

  const { rows } = await db.query(querry, queryParams);
  res.send(rows);
});

module.exports = router;
