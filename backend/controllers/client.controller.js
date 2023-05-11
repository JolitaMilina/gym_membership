import Client from "../models/client.model.js";

export const createClient = async (req, res) => {
  try {
    const newClient = req.body;

    const validatedNewClient = new Client(newClient);

    const savedData = await validatedNewClient.save();

    res.json(savedData);
  } catch (error) {
    console.log(error);
    res.json({ message: "Error..." });
  }
};

export const getDbClients = async (_req, res) => {
  try {
    const clients = await Client.find();

    res.json(clients);
  } catch (error) {
    console.log(error);
    res.json({ message: "Error..." });
  }
};

export const updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedClient) {
      // If the client was not found
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    console.log("Failed to update client details: " + error);
    res.status(500).json({ message: "Error updating client" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndRemove(req.params.id);

    res.status(204).end();
  } catch (error) {
    console.log("Failed to delete user details: " + error);
    res.json({ message: "Error..." });
  }
};
