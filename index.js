const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

require('dotenv').config()

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.lln6rsh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        await client.connect();

        app.get('/groups', async (req, res) => {

            const email = req.query.email;
            const collection = client.db('HobbyHubDb').collection('groups');

            try {
                let groups;
                if (email) {
                    groups = await collection.find({ userEmail: email }).toArray();
                } else {
                    groups = await collection.find().toArray();
                }
                res.send(groups);
            } catch (err) {
                res.status(500).send({ error: 'Failed to fetch groups' });
            }
        });
        app.get('/groups/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const group = await client.db('HobbyHubDb').collection('groups').findOne(query);
            res.send(group);
        });
        

        app.post('/createGroup', async (req, res) => {
            const group = req.body;
            //console.log(group);
            const result = await client.db('HobbyHubDb').collection('groups').insertOne(group);
            res.send(result);
           
        });
        app.put('/updateGroup/:id', async (req, res) => {
            const id = req.params.id;
            const {name,category, description,maxMembers,startDate, imageUrl,userName,userEmail} = req.body;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name,
                    category,
                    description,
                    maxMembers,
                    startDate,
                    imageUrl,
                    userName,
                    userEmail
                },
            };
            const result = await client.db('HobbyHubDb').collection('groups').updateOne(query, updateDoc, options);
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
       // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})