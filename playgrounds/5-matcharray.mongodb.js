//////////////////////////////
// $match - array membership matches
//////////////////////////////
use('sample_mflix');

// check that `genres` contains "Horror"
db.movies.aggregate([
    { $match: { genres: "Horror" } },
    { $project: { _id:0, title:1, genres:1 } },
    { $limit: 10 }
]);