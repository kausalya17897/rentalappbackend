import express from 'express';

import { getbike, updateBike, getbikebyid, editbikebyid, deletebikebyid } from '../editbikebyid.js';
import { auth } from '../middleware/auth.js';
const router=express.Router();
router
.route("/")
.get(auth,async(request,response)=>{
  const bike=await getbike();
  const token=request.body.jwt;
   console.log(bike);
    response.send(bike);
    response.json({jwt: token});
})
.post(auth,async(request,response)=>{
  const data=request.body;
  const token=request.body.jwt;
  const result=await updateBike(data);
  response.send(result);
  response.json({jwt: token});
  {/*response.send(data)*/}
})


router
.route("/:id")
.get(async(request,response)=>{
    console.log(request.params)
    const {id}=request.params;
   const bike= await getbikebyid(id);
    //const bike=bikes.find(a=>a.id===id);
    bike
    ?response.send(bike)
    :response.status(404).send({message:"No maching bike"});
    
})
.put(async(request,response)=>{
  const {id}=request.params;
  const data=request.body;
 const bikeupdate=await editbikebyid(id, data);
  response.send(bikeupdate);
})
.delete(async(request,response)=>{
  console.log(request.params)
  const {id}=request.params;
 const bike= await deletebikebyid(id);
  //const bike=bikes.find(a=>a.id===id);
  bike
  ?response.send(bike)
  :response.status(404).send({message:"No maching bike"});
  
});

export const bikesRouter=router;