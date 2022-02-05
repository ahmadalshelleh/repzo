const express = require("express");
const checkParams = require("../middleware/params");
const router = new express.Router();

const { getLessVisitedData } = require("../controller/client");
const { get, set } = require("../cache/redis");

router.get("/less-visited-clients-per-day", checkParams, async (req, res) => {
  const { from, to, day } = req.query;
  let data, report_time

  data = await get("last_report");
  report_time = await get("report_time");
  if (data && report_time == `${from}_${to}_${day}`)
    return res.send(data);

  data = await getLessVisitedData({ from, to, day });
  if (data !== null) {
    await set("last_report", data);
    await set("report_time", `${from}_${to}_${day}`);
    return res.send(data);
  }

  return res.status(500);
});

module.exports = router;
