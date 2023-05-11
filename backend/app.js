import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import {
  createClient,
  getDbClients,
  deleteClient,
  updateClient,
} from "./controllers/client.controller.js";

dotenv.config();

const app = express();

app.use(cors());

const PORT = 5001;

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Conenected to MongoDB"))
  .catch((e) => console.log("Error connecting to MongoDB: " + e));

// Middilewares
app.use(express.json());

// Rest API endpoints
app.get("ENDPOINT", (_req, res) => {
  res.json({ message: "API is running" });
});

// Routes

// .POST - /api/clients - talpins vartotojus (name, email, address)

app.post("/api/clients", createClient);

//  GET - /api/clients - grąžins vartotojus (_id, name, email, address)

app.get("/api/clients", getDbClients);

// PUT
app.put("/api/clients/:id", updateClient);

// DELETE

app.delete("/api/clients/:id", deleteClient);

// Starting server
app.listen(PORT, () => console.log("Server is running on PORT:" + PORT));
