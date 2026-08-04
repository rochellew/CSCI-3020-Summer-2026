using MongoDB.Driver;
using MongoDB.Bson;
using CsvHelper;
using System.Globalization;

// 1. Connect to the cluster
const string connString = "mongodb+srv://admin:Passw0rd@cluster0.rclujps.mongodb.net/?appName=Cluster0";

var settings = MongoClientSettings.FromConnectionString(connString);

settings.ServerApi = new ServerApi(ServerApiVersion.V1);

// create the client, connect to the db, choose the collection
var client  = new MongoClient(settings);
var db = client.GetDatabase("sample_mflix");
var collection = db.GetCollection<BsonDocument>("movies");

// Basic Read - First 10 titles
var movies = collection.Find(new BsonDocument()).Limit(10).ToList();
foreach(var movie in movies)
{
    Console.WriteLine(movie["title"]);
}

Console.WriteLine("------------------------------------------");

// LINQ Example
var highRatedMovies = await collection.Find(m => m["imdb"]["rating"] > 9.0).ToListAsync();

foreach(var movie in highRatedMovies)
{
    Console.WriteLine(
        $"Title: {movie["title"]}\n" +
        $"Rating: {movie["imdb"]["rating"]}\n"
    );
}

Console.WriteLine("------------------------------------------");

var nolanMovies = await collection.Find(m => m["directors"].AsBsonArray.Contains("Christopher Nolan")).ToListAsync();
foreach (var movie in nolanMovies)
{
    Console.WriteLine(movie["title"]);
}

ExportToCSV(nolanMovies);

Console.WriteLine("------------------------------------------");
Console.WriteLine("Writing to csv...Done!");
Console.WriteLine("------------------------------------------");

var goslingMovies = await collection.Find(m => m["cast"].AsBsonArray.Contains("Ryan Gosling")).ToListAsync();
foreach (var movie in goslingMovies)
{
    Console.WriteLine(movie["title"]);
}

static void ExportToCSV(List<BsonDocument> movies)
{
    using (var writer = new StreamWriter("./movies.csv"))
    using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
    {
        csv.WriteRecords(movies.Select(m => new
        {
            Title = m["title"].AsString,
            Year = m["year"].AsInt32,
            Rating = m["imdb"]["rating"].AsDouble,
            PrimaryDirector = m["directors"][0].AsString
        }));
    }
}