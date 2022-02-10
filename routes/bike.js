import express from 'express';
const router=express.Router();

import { getbike, updateBike, getbikebyid, editbikebyid, deletebikebyid } from '../editbikebyid.js';
import { auth } from '../middleware/auth.js';

router
.route("/")
.get(auth,async(request,response)=>{
  const bike=await getbike();
   console.log(bike);
    response.send(bike);
    
})
.post(auth,async(request,response)=>{
  const data=request.body;
  const result=await updateBike(data);
  response.send(result)
  
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