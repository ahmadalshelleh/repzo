const checkParams = async (req, res, next) => {
  const params = ["from", "to", "day"];
  const days = {
    sunday: 1,
    monday: 2,
    tuesday: 3,
    wednesday: 4,
    thursday: 5,
    friday: 6,
    saturday: 7,
  };
  let keys = Object.keys(req.query);

  const isValid = keys.every((update) => params.includes(update));

  if (keys.length !== 3 || !isValid || !days[req.query.day]) {
    res.status(400).send({ error: "Params issue!" });
  } else {
    req.query.day = days[req.query.day];
    next();
  }
};

module.exports = checkParams;
