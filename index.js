const express = require('express')
const app = express()
require("dotenv").config();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')



app.use(cors())
app.use(express.json())


// TaskFlow
// ZHkB5dj64LnHx5MD



const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASSWORD}@cluster0.w9fev91.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const Tasks = client.db('task-manage').collection('Tasks')
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    app.get('/tasks/:email',async(req,res)=>{
        const email = req.params.email
        const query = {email : email}
        const result = await Tasks.find(query).toArray()
        res.send(result)       
    })


    app.post('/addtasks',async(req,res)=>{
      console.log('task',req.body)
      const body = req.body 
      const result = await Tasks.insertOne(body)
      res.send(result)   

  })


  app.put('/updateTask/:status/:id',async(req,res)=>{
    const status = req.params.status
    const Id = req.params.id
    const query = { _id : new ObjectId(Id)  }
    const updateDoc = {
      $set:{
        status : status
      }
    }
    const result = await Tasks.updateOne(query,updateDoc)
    res.send(result)
    
  })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Task is ready')
})

app.listen(port, () => {
  console.log(`Task is running on port ${port}`)
})