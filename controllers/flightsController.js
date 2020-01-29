const db = require("../db");

module.exports.getFlights = async (req, res, next) => {
  const { filters } = req.body;
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
        inner join links l on l.flight_id = f.id
    where
        ($1 = false or r.land_success = $1)
        and ($2 = false or r.reused = $2)
        and ($3 = false or l.reddit_launch = $3)
        
    order by f.launch_date desc;
    `,
    [filters.land, filters.reused, filters.with]
  );
  return res.status(200).send({
      message: "Flights Successfully Fetched!",
      results: rows
  });
};
