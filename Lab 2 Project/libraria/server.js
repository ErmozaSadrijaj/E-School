const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');



const app = express();
const port = 3002;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the specified HTTP methods
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // Allow the specified headers
  next();
});
const uri = "mongodb+srv://endriptex:AhZN4Zeo34fAomBr@cluster0.3vuacui.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', async (req, res) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    console.log("Connected to MongoDB!");

    // Access the desired database and collection
    const db = client.db("libraria");
    const collection = db.collection("librat");

    // Query the collection to fetch data
    const librat = await collection.find().toArray();
    console.log("Fetched data:", librat);

    // Send the fetched data as a response to the client
    res.send(librat);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from MongoDB");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
