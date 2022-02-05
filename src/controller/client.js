const Client = require("../models/client");

const getLessVisitedData = async ({ from, to, day }) => {
    const days = {
        sunday: 1,
        monday: 2,
        tuesday: 3,
        wednesday: 4,
        thursday: 5,
        friday: 6,
        saturday: 7,
      };
      const limit = { $limit: 5 };
    
      const lookup = {
        $lookup: {
          from: "visits",
          let: {
            id: "$_id",
            from: parseInt(from),
            to: parseInt(to),
            day: days[day.toLowerCase()],
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$id", "$client"] },
                    { $gte: ["$time", "$$from"] },
                    { $lte: ["$time", "$$to"] },
                    { $eq: [{ $dayOfWeek: { $toDate: "$time" } }, "$$day"] },
                  ],
                },
              },
            },
          ],
          as: "client_visits",
        },
      };
    
      const project = {
        $project: {
          name: 1,
          number_of_visits: { $size: "$client_visits" },
          client_visits: 1,
        },
      };
    
      const sort = { $sort: { number_of_visits: 1 } };
    
      try {
        const clients = await Client.aggregate([limit, lookup, project, sort]);
        return clients
      } catch (e) {
        return null
      }
}

module.exports.getLessVisitedData = getLessVisitedData