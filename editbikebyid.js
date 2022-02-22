import { ObjectId } from 'mongodb';
import { client } from './index.js';
import bcrypt from 'bcrypt';

export async function editbikebyid(id, data) {
  return await client.db("bikerental")
    .collection("users")
    .updateOne({ _id: id }, { $set: data });
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
    .deleteOne({ _id: id });
}
export async function getbikebyid(id) {
  console.log("***",id)
  return await client
    .db("bikerental")
    .collection("users")
    .findOne({ _id:ObjectId(id)});
}
export async function updateBike(data) {
  return await client
    .db("bikerental")
    .collection("users")
    .insertMany(data);
}
export async function createUser(data) {
  return await client
    .db("bikerental")
    .collection("usersdata")
    .insertOne(data);
}
export async function getUserByName(username) {
  return await client
    .db("bikerental")
    .collection("usersdata")
    .findOne({username:username});
}
async function genPassword(password){
  const NO_OF_ROUNDS=10;
  const salt=await bcrypt.genSalt(NO_OF_ROUNDS);
  console.log("salt",salt);
  const hashpassword= await bcrypt.hash(password,salt);
  console.log(hashpassword);
  return hashpassword;
}
export {genPassword};