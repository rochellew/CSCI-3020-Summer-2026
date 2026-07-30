//////////////////////////////
// Lil bit of everything
//////////////////////////////
use('sample_mflix');

db.movies.aggregate([
    // 1. match
    { 
        $match: 
        { 
            year: {$gte: 1900}, 
            runtime: {$exists: true, $ne: null}
        }
    },

    // 2. add fields to indicate runtime categories
    {
        $addFields: 
        {
            decade: { $subtract: ["$year", { $mod: ["$year", 10] }] },
            runtimecategories: {
                $switch: {
                    branches: [
                        {
                            case: { $lt: ["$runtime", 60] },
                            then: "short"
                        },
                                                {
                            case: { $lt: ["$runtime", 120] },
                            then: "standard"
                        },
                                                {
                            case: { $lt: ["$runtime", 180] },
                            then: "long"
                        }
                    ],
                    default: "unbearable"
                }
            }
        }
    },
    { $unwind: "$genres" },
    {
        $group: {
            _id: 
            { 
                decade: "$decade", 
                genre: "$genres", 
                runtimecategories: "$runtimecategories"
            }, count: {$sum:1}
        }
    },
    {
        $sort: {"_id.decade":1, "_id.genre": 1, count:-1}
    }
]);