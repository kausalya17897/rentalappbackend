import express from 'express';
const router=express.Router();

import { getbike, updateBike, getbikebyid, editbikebyid, deletebikebyid } from '../editbikebyid.js';

router.get("/",async(request,response)=>{
  const bike=await getbike();
   console.log(bike);
    response.send(bike);
    
});
router.post("/",async(request,response)=>{
  const data=request.body;
  const result=await updateBike(data);
  response.send(result)
  
  {/*response.send(data)*/}
})
router.get("/:id",async(request,response)=>{
    console.log(request.params)
    const {id}=request.params;
   const bike= await getbikebyid(id);
    //const bike=bikes.find(a=>a.id===id);
    bike
    ?response.send(bike)
    :response.status(404).send({message:"No maching bike"});
    
});
router.put("/:id",async(request,response)=>{
  const {id}=request.params;
  const data=request.body;
 const bikeupdate=await editbikebyid(id, data);
  response.send(bikeupdate);
})
router.delete("/:id",async(request,response)=>{
  console.log(request.params)
  const {id}=request.params;
 const bike= await deletebikebyid(id);
  //const bike=bikes.find(a=>a.id===id);
  bike
  ?response.send(bike)
  :response.status(404).send({message:"No maching bike"});
  
});

export const bikesRouter=router;