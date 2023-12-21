const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// middle were
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
    //   "https://medicamp-603c8.web.app",
    //   "https://medicamp-603c8.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASSWORD}@cluster0.w9fev91.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        
        const usersCollection = client.db('task-manage').collection("users");

    app.post('/users', async(req, res)=>{
        const user = req.body;
        const result = await usersCollection.insertOne(user)
        console.log(result)
        res.send(result)
    })
    app.get('/users/:email', async (req, res) => {
        const email = req.params.email
        // console.log(email)
        const query = { email: email }
        const result = await usersCollection.findOne(query);
        res.send(result)
      })



  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Task manage is open");
  });
  
  app.listen(port, () => {
    console.log(`Task manage is open on port ${port}`);
  });