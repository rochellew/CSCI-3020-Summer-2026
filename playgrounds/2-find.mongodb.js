//////////////////////////////
// find() -- filter
//////////////////////////////
use('sample_mflix');
db.movies.find(
    { "year" : 2000 },
    // this is called a projection
    { _id: 0, title: 1, year: 1}
);