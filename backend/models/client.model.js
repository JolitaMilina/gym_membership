import { Schema, model } from "mongoose";

const clientSchema = new Schema({
  name: String,
  email: String,
  membershipstarts: {
    type: Date,
  },
  membershipends: {
    type: Date,
  },
});

const Client = model("clients", clientSchema);

export default Client;
