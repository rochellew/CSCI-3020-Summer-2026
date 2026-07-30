//////////////////////////////
// $sort
//////////////////////////////
use('sample_mflix');
// top 3 movies per awards received
db.movies.aggregate([
    { $sort : { "awards.wins": -1 } },
    { $limit: 3 },
    { $project: {title:1, year:1, "awards.wins":1}}
]);