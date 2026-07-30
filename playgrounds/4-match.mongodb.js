//////////////////////////////
// $match -- filter documents (WHERE)
//////////////////////////////
use('sample_mflix');
// show the R rated movies from the 90s
db.movies.aggregate(
    { $match: { year: { $gte: 1990, $lt: 2000} , rated: "R" } },
    { $project: { _id:0, title:1, year:1, rated:1 } }
);