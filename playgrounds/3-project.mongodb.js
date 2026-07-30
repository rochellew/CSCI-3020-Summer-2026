//////////////////////////////
// $project - choose what shows
//////////////////////////////
use('sample_mflix');

// just show the title
db.movies.aggregate([
    { $project: { _id: 0, title:1} }
]);