import { client } from './index.js';


export async function editbikebyid(id, data) {
  return await client.db("bikerental")
    .collection("users")
    .updateOne({ id: id }, { $set: data });
}
export async function getbike() {
  return await client
    .db("bikerental")
    .collection("users")
    .find({}).toArray();
}
export async function deletebikebyid(id) {
  return await client
    .db("bikerental")
    .collection("users")
    .deleteOne({ id: id });
}
export async function getbikebyid(id) {
  return await client
    .db("bikerental")
    .collection("users")
    .findOne({ id: id });
}
export async function updateBike(data) {
  return await client
    .db("bikerental")
    .collection("users")
    .insertMany(data);
}
