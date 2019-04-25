const express = require("express");
const app = express();
const jsonParser = express.json();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
app.use(cors());




app.listen(3000);