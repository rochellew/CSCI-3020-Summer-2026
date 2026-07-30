//////////////////////////////
// $group on a determined key
//////////////////////////////
use('sample_mflix');

db.movies.aggregate([
    // unwind the genres into indiv. documents
    { $unwind: "$genres" },
    // group on the genre field
    { $group: { _id: "$genres", avgRating: { $avg: "$imdb.rating" } } },
    // sort in reverse 
    { $sort: { count:-1 } }
]);