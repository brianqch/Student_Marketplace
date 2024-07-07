import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /item.
const router = express.Router();

// This section will help you get a list of all the items.
router.get("/", async (req, res) => {
  let collection = await db.collection("items");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single item by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("items");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new item.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      item_title: req.body.item_title,
      item_price: req.body.item_price,
      item_category: req.body.item_category,
      item_condition: req.body.item_condition,
      item_description: req.body.item_description
    };
    let collection = await db.collection("items");
    let result = await collection.insertOne(newDocument);
    console.log("DEBUG", result);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding item");
  }
});

// This section will help you update a item by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        item_title: req.body.item_title,
        item_price: req.body.item_price,
        item_category: req.body.item_category,
        item_condition: req.body.item_condition,
        item_description: req.body.item_description
      },
    };

    let collection = await db.collection("items");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating item");
  }
});

// This section will help you delete a item
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("items");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting item");
  }
});

export default router;