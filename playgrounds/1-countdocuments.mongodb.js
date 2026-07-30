//////////////////////////////
// find() -- filter
//////////////////////////////
// select the database
use('sample_mflix');
// how many were released after 2008?
db.movies.countDocuments( { "year" : 2008 });