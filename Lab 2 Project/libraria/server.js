const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');

const app = express();
const port = 3002;

app.use(express.json()); // Analizo trupat e kërkesave JSON

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Lejo kërkesat nga çdo origjinë
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Lejo metodat HTTP të specifikuara
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // Lejo kokat e specifikuara
  next();
});

const uri = "mongodb+srv://endriptex:AhZN4Zeo34fAomBr@cluster0.3vuacui.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', async (req, res) => {
  try {
    await client.connect();
    console.log("Të lidhur me MongoDB!");

    const db = client.db("libraria");
    const collection = db.collection("librat");

    const librat = await collection.find().toArray();
    console.log("Të dhënat u marrën:", librat);

    res.send(librat);
  } catch (error) {
    console.error(error);
    res.status(500).send("Gabim në marrjen e të dhënave nga MongoDB");
  }
});

app.post('/', async (req, res) => {
  try {
    await client.connect();
    console.log("Të lidhur me MongoDB!");

    const db = client.db("libraria");
    const collection = db.collection("librat");

    const newLibrat = req.body; // Kemi parasysh që trupi i kërkesës përmban të dhënat për të futur

    // Fut të dhënat e reja në koleksion
    const result = await collection.insertOne(newLibrat);
    console.log("Të dhënat u futën:", result);

    res.send("Të dhënat u futen me sukses");
  } catch (error) {
    console.error(error);
    res.status(500).send("Gabim në futjen e të dhënave në MongoDB");
  }
});

app.put('/:id', async (req, res) => {
  try {
    await client.connect();
    console.log("Të lidhur me MongoDB!");

    const db = client.db("libraria");
    const collection = db.collection("librat");

    const libriID = req.params.id;
    const updatedLibrat = req.body;

    // Remove the _id field from the updated data to prevent updating the _id field
    delete updatedLibrat._id;

    // Update the data in the collection
    const result = await collection.updateOne({ _id: libriID }, { $set: updatedLibrat });
    console.log("Updated data:", result);

    res.send("Data updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating data in MongoDB");
  }
});


// ...

app.delete('/:id', async (req, res) => {
  try {
    await client.connect();
    console.log("Të lidhur me MongoDB!");

    const db = client.db("libraria");
    const collection = db.collection("librat");

    const libriID = req.params.id;
    const objectIdLibriID =new ObjectId(libriID);
    console.log(objectIdLibriID)
    // Delete the document from the collection
    const result = await collection.deleteOne({ _id: libriID });
    console.log("Deleted data:", result);

    res.send("Data deleted successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
});

app.listen(port, () => {
  console.log(`Serveri është i aktivizuar në portin ${port}`);
});
