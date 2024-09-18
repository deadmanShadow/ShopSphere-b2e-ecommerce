const petsCollection = client.db("petsaveDB").collection("pets");
const adoptionCollection = client.db("petsaveDB").collection("fosterPet");

// pets related API's
app.get("/pets", async (req, res) => {
  const cursor = petsCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});
// separate vabe pet nitesi by using id
app.get("/pets/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await petsCollection.findOne(query);
  res.send(result);
});

// adoption related API's here

app.post("/fosteringHome", async (req, res) => {
  const adoption = req.body;

  // ekhane insert hocche fostering collection
  const fosterResult = await adoptionCollection.insertOne(adoption);
  // ekhane fostering er data i mean same data  pets collection e save korlam 

  const petResult = await petsCollection.insertOne(adoption);

  console.log("inserted into fosterpet",fosterResult);

  console.log("inserted into pets", petResult);

// send back to client
  res.send({
    fosterResult,
    petResult
  });
});
