const db = require("../db");

module.exports.getFlights = async (req, res, next) => {
  let { filters } = req.body;

  if(filters === undefined || filters === null){
    return res.status(400).send({
      message: "No Filters Passed!",
      results: []
    });
  }else {
    if(filters.land === undefined){
      return res.status(400).send({
        message: "Filter LAND not passed!",
        results: []
      });
    }
    if(filters.reused === undefined){
      return res.status(400).send({
        message: "Filter REUSED not passed!",
        results: []
      });
    }
    if(filters.with === undefined){
      return res.status(400).send({
        message: "Filter WITH not passed!",
        results: []
      });
    }
  }

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
