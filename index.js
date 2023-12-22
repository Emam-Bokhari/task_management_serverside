const express=require("express")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const port=process.env.PORT||3000
const app=express()

// middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// task-management
// A5aDeikTVUmjQ0rt


const { MongoClient, ServerApiVersion, Collection } = require('mongodb');
const uri = "mongodb+srv://task-management:A5aDeikTVUmjQ0rt@cluster0.kndeci6.mongodb.net/?retryWrites=true&w=majority";

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
     client.connect();

     const database=client.db("taskManagementDB")
     const taskCollection=database.collection("task")

     app.post("/api/v1/create-task",async(req,res)=>{
        const task=req.body 
        console.log(task);
        const result=await taskCollection.insertOne(task)
        res.send(result)
     })


    // Send a ping to confirm a successful connection
     client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
    res.send('Server is running...');
  })
  
  app.listen(port, (req, res) => {
    console.log(`port${port}`);
  })