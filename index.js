import express, { request, response } from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { getbike, updateBike, getbikebyid, editbikebyid, deletebikebyid } from './editbikebyid.js';
import {bikesRouter} from "./routes/bike.js";
import cors from 'cors';

import { usersRouter } from './routes/users.js';
dotenv.config();// getting file from .env
console.log(process.env)
const app = express();
//const PORT=3000;
const PORT=process.env.PORT;

//app.use(cors({allowedHeaders: "*"}));  //3rd party middleware to access data
const MONGO_URL=process.env.MONGO_URL;
//const MONGO_URL="mongodb://localhost";
async function createConnection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongodb connected");
    return client;
}
export const client=await createConnection();
  //middleware
  app.use(express.json());
//const dbConnection=require('./db')
const bikes=[
    {
      "id": "100",
      "name": "TVS Appache",
      "poster": "https://wallpaperheart.com/wp-content/uploads/2018/05/bike-wallpapers-hd-download-8.jpg",
      "engine": "SI, 4- stroke, Air- Cooled",
      "frontBrake": "Disc",
      "fuelCapacity": "12L",
      "left": 6,
      "dayprice": 169,
      "weekly": 699,
      "monthly": 3899
    },
    {
      "id": "101",
      "name": "Bajaj Pulsar NS160",
      "poster": "https://compare.pricesofindia.com/src/wallpapers/bajaj/bajaj-pulsar-160-ns/pulsar-ns-160-wallpaper-1.jpg",
      "engine": "4 Stroke, SOHC 4 Valve, Oil Cooled, Twin Spark BSVI DTS-i FI engine",
      "frontBrake": "Disc",
      "fuelCapacity": "12L",
      "left": 5,
      "dayprice": 169,
      "weekly": 699,
      "monthly": 3899
    },
    {
      "id": "102",
      "name": "Hero Xtreme 160R",
      "poster": "https://www.rushlane.com/wp-content/uploads/2020/03/2020-hero-xtreme-160r-launch-price-website-1.jpg",
      "engine": "Air cooled, 4 Stroke 2 Valve Single cylinder OHC",
      "frontBrake": "Disc",
      "fuelCapacity": "12L",
      "left": 6,
      "dayprice": 169,
      "weekly": 699,
      "monthly": 3899
    },
    {
      "id": "103",
      "name": "Hero Pleasure Plus",
      "poster": "https://www.thrustzone.com/wp-content/uploads/2019/05/Hero-pleasure-plus-110cc-review-3.jpg",
      "engine": "Air cooled, 4-Stroke Single Cylinder OHC",
      "frontBrake": "Drum",
      "fuelCapacity": "4.8L",
      "left": 4,
      "dayprice": 169,
      "weekly": 699,
      "monthly": 3899
    },
    {
      "id": "104",
      "name": "Hero Destini 125",
      "poster": "https://ic1.maxabout.us/autos/tw_india/H/2020/6/hero-destini-125-in-pearl-silver-white-color.jpg",
      "engine": "Air Cooled, 4-Stroke, SI Engine",
      "frontBrake": "Drum",
      "fuelCapacity": "5L",
      "left": 6,
      "dayprice": 169,
      "weekly": 699,
      "monthly": 3899
    },
    {
      "id": "105",
      "name": "Bajaj Pulsar RS200",
      "poster": "https://th.bing.com/th/id/OIP.jBTP2q_OTA4CPW6tLo_jDgHaEo?pid=ImgDet&rs=1https://www.team-bhp.com/forum/attachments/motorbikes/1363145d1429616842-report-pics-video-bajaj-pulsar-rs200-ridden-factory-test-track-47pulsar.jpg",
      "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
      "frontBrake": "Disc",
      "fuelCapacity": "15L",
      "left": "3",
      "dayprice": 169,
      "weekly": 699,
      "monthly": 3899
    },
    {
      "id": "106",
      "name": "Bajaj CT100",
      "poster": "https://th.bing.com/th/id/OIP.pKBzHyQX8omOqbR_YVifhwHaHo?pid=ImgDet&rs=1",
      "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
      "frontBrake": "Disc",
      "fuelCapacity": "15L",
      "left": 6,
      "dayprice": 169,
      "weekly": 699,
      "monthly": 3899
    },
    {
      "id": "107",
      "name": "Honda Dream Neo",
      "poster": "https://th.bing.com/th/id/R.b044ff896677a7bd79d8edc28555cb64?rik=21PerMQtnV2D5w&riu=http%3a%2f%2fwww.sagmart.com%2fother_images%2f2016-honda-dream-neo.jpg&ehk=CeNIuJ37E826w1Ir8OUZ6M0rUt1BXbRil0CT7U91k00%3d&risl=&pid=ImgRaw&r=0",
      "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
      "frontBrake": "Disc",
      "fuelCapacity": "15L",
      "left": 2,
      "dayprice": 189,
      "weekly": 799,
      "monthly": 2499
    },
    {
      "id": "108",
      "name": "Honda Navi",
      "poster": "https://th.bing.com/th/id/R.16b810c16d95a469bdbeedc45d9ac370?rik=Qk%2fOBMBJqZvadg&riu=http%3a%2f%2fstat.overdrive.in%2fwp-content%2fodgallery%2f2016%2f04%2f29709_Honda_navi_021.JPG&ehk=H0l5yflYUHTE8bVf57%2fH2Aj4eqfnmEmHuuv4Qnj8i1M%3d&risl=&pid=ImgRaw&r=0",
      "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
      "frontBrake": "Disc",
      "fuelCapacity": "15L",
      "left": 6,
      "dayprice": 199,
      "weekly": 699,
      "monthly": 2599
    },
    {
      "id": "109",
      "name": "Honda Livo",
      "poster": "https://th.bing.com/th/id/OIP.u5f8ufPXlkdyH_1tB6f22AHaEy?pid=ImgDet&rs=1",
      "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
      "frontBrake": "Disc",
      "fuelCapacity": "15L",
      "left": 6,
      "dayprice": 189,
      "weekly": 899,
      "monthly": 2999
    },
    {
      "id": "110",
      "name": "Honda Activa",
      "poster": "https://news.maxabout.com/wp-content/uploads/2020/01/Honda-Activa-6G-Launched-1.png",
      "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
      "frontBrake": "Disc",
      "fuelCapacity": "15L",
      "left": 6,
      "dayprice": 259,
      "weekly": 4699,
      "monthly": 3699
    },
    {
      "id": "111",
      "name": "Honda Dio",
      "poster": "https://img.indianautosblog.com/2020/02/10/honda-dio-bs-vi-d41d.jpg",
      "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
      "frontBrake": "Disc",
      "fuelCapacity": "15L",
      "left": 6,
      "dayprice": 159,
      "weekly": 599,
      "monthly": 2699
    },
    {
      "id": "112",
      "name": "Bajaj Pulsar 150",
      "poster": "https://ic1.maxabout.us/autos/tw_india/B/2020/5/bajaj-pulsar-150-twin-disc-side-view.jpg",
      "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
      "frontBrake": "Disc",
      "fuelCapacity": "15L",
      "left": 6,
      "dayprice": 189,
      "weekly": 899,
      "monthly": 2999
    },
    {
      "id": "113",
      "name": "Yamaha FZ",
      "poster": "https://blog.motorcycle.com/wp-content/uploads/2016/04/041416-2017-yamaha-FZ-10-Black_3_l.jpg",
      "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
      "frontBrake": "Disc",
      "fuelCapacity": "15L",
      "left": 7,
      "dayprice": 199,
      "weekly": 699,
      "monthly": 2599
    },
    {
      "id": "114",
      "name": "Royal Enfield 500 Clasic",
      "poster": "https://th.bing.com/th/id/OIP.O-54KtAENlfllYk0rVPjkAHaE8?pid=ImgDet&rs=1",
      "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
      "frontBrake": "Disc",
      "fuelCapacity": "15L",
      "left": 3,
      "dayprice": 189,
      "weekly": 899,
      "monthly": 2999
    },
    {
    "id": "100",
    "name": "TVS Appache",
    "poster": "https://wallpaperheart.com/wp-content/uploads/2018/05/bike-wallpapers-hd-download-8.jpg",
    "engine": "SI, 4- stroke, Air- Cooled",
    "frontBrake": "Disc",
    "fuelCapacity": "12L",
    "left":6,
    "dayprice":169,
    "weekly":699,
    "monthly":3899
   },
   {
    "id": "101",
    "name": "Bajaj Pulsar NS160",
    "poster": "https://compare.pricesofindia.com/src/wallpapers/bajaj/bajaj-pulsar-160-ns/pulsar-ns-160-wallpaper-1.jpg",
    "engine": "4 Stroke, SOHC 4 Valve, Oil Cooled, Twin Spark BSVI DTS-i FI engine",
    "frontBrake": "Disc",
    "fuelCapacity": "12L",
    "left":5,
    "dayprice":169,
    "weekly":699,
    "monthly":3899
   },
   {
    "id": "102",
    "name": "Hero Xtreme 160R",
    "poster": "https://www.rushlane.com/wp-content/uploads/2020/03/2020-hero-xtreme-160r-launch-price-website-1.jpg",
    "engine": "Air cooled, 4 Stroke 2 Valve Single cylinder OHC",
    "frontBrake": "Disc",
    "fuelCapacity": "12L",
    "left":6,
    "dayprice":169,
    "weekly":699,
    "monthly":3899
   },
   {
    "id": "103",
    "name": "Hero Pleasure Plus",
    "poster": "https://www.thrustzone.com/wp-content/uploads/2019/05/Hero-pleasure-plus-110cc-review-3.jpg",
    "engine": "Air cooled, 4-Stroke Single Cylinder OHC",
    "frontBrake": "Drum",
    "fuelCapacity": "4.8L",
    "left":4,
    "dayprice":169,
    "weekly":699,
    "monthly":3899
   },
   {
    "id": "104",
    "name": "Hero Destini 125",
    "poster": "https://ic1.maxabout.us/autos/tw_india/H/2020/6/hero-destini-125-in-pearl-silver-white-color.jpg",
    "engine": "Air Cooled, 4-Stroke, SI Engine",
    "frontBrake": "Drum",
    "fuelCapacity": "5L",
    "left":6,
    "dayprice":169,
    "weekly":699,
    "monthly":3899
   },
   {
    "id": "105",
    "name": "Bajaj Pulsar RS200",
    "poster": "https://th.bing.com/th/id/OIP.jBTP2q_OTA4CPW6tLo_jDgHaEo?pid=ImgDet&rs=1https://www.team-bhp.com/forum/attachments/motorbikes/1363145d1429616842-report-pics-video-bajaj-pulsar-rs200-ridden-factory-test-track-47pulsar.jpg",
    "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
    "frontBrake": "Disc",
    "fuelCapacity": "15L",
    "left":3,
    "dayprice":169,
    "weekly":699,
    "monthly":3899
   },
   {
    "id": "106",
    "name": "Bajaj CT100",
    "poster": "https://th.bing.com/th/id/OIP.pKBzHyQX8omOqbR_YVifhwHaHo?pid=ImgDet&rs=1",
    "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
    "frontBrake": "Disc",
    "fuelCapacity": "15L",
    "left":6,
    "dayprice":169,
    "weekly":699,
    "monthly":3899
   },
   {
    "id": "107",
    "name": "Honda Dream Neo",
    "poster": "https://th.bing.com/th/id/R.b044ff896677a7bd79d8edc28555cb64?rik=21PerMQtnV2D5w&riu=http%3a%2f%2fwww.sagmart.com%2fother_images%2f2016-honda-dream-neo.jpg&ehk=CeNIuJ37E826w1Ir8OUZ6M0rUt1BXbRil0CT7U91k00%3d&risl=&pid=ImgRaw&r=0",
    "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
    "frontBrake": "Disc",
    "fuelCapacity": "15L",
    "left":2,
    "dayprice":189,
    "weekly":799,
    "monthly":2499
   },
   {
    "id": "108",
    "name": "Honda Navi",
    "poster": "https://th.bing.com/th/id/R.16b810c16d95a469bdbeedc45d9ac370?rik=Qk%2fOBMBJqZvadg&riu=http%3a%2f%2fstat.overdrive.in%2fwp-content%2fodgallery%2f2016%2f04%2f29709_Honda_navi_021.JPG&ehk=H0l5yflYUHTE8bVf57%2fH2Aj4eqfnmEmHuuv4Qnj8i1M%3d&risl=&pid=ImgRaw&r=0",
    "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
    "frontBrake": "Disc",
    "fuelCapacity": "15L",
    "left":6,
    "dayprice":199,
    "weekly":699,
    "monthly":2599
   },
   {
    "id": "109",
    "name": "Honda Livo",
    "poster": "https://th.bing.com/th/id/OIP.u5f8ufPXlkdyH_1tB6f22AHaEy?pid=ImgDet&rs=1",
    "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
    "frontBrake": "Disc",
    "fuelCapacity": "15L",
    "left":6,
    "dayprice":189,
    "weekly":899,
    "monthly":2999
   },
   {
    "id": "110",
    "name": "Honda Activa",
    "poster": "https://news.maxabout.com/wp-content/uploads/2020/01/Honda-Activa-6G-Launched-1.png",
    "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
    "frontBrake": "Disc",
    "fuelCapacity": "15L",
    "left":6,
    "dayprice":259,
    "weekly":4699,
    "monthly":3699
   },
   {
    "id": "111",
    "name": "Honda Dio",
    "poster": "https://img.indianautosblog.com/2020/02/10/honda-dio-bs-vi-d41d.jpg",
    "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
    "frontBrake": "Disc",
    "fuelCapacity": "15L",
    "left":6,
    "dayprice":159,
    "weekly":599,
    "monthly":2699
   },
   {
    "id": "112",
    "name": "Bajaj Pulsar 150",
    "poster": "https://ic1.maxabout.us/autos/tw_india/B/2020/5/bajaj-pulsar-150-twin-disc-side-view.jpg",
    "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
    "frontBrake": "Disc",
    "fuelCapacity": "15L",
    "left":6,
    "dayprice":189,
    "weekly":899,
    "monthly":2999
   },
   {
    "id": "113",
    "name": "Yamaha FZ",
    "poster": "https://blog.motorcycle.com/wp-content/uploads/2016/04/041416-2017-yamaha-FZ-10-Black_3_l.jpg",
    "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
    "frontBrake": "Disc",
    "fuelCapacity": "15L",
    "left":7,
    "dayprice":199,
    "weekly":699,
    "monthly":2599
   },
   {
    "id": "114",
    "name": "Royal Enfield 500 Clasic",
    "poster": "https://th.bing.com/th/id/OIP.O-54KtAENlfllYk0rVPjkAHaE8?pid=ImgDet&rs=1",
    "engine": "Air Cooled, 4-Stroke, SI Engine\\t4-Stroke, SOHC 2-Valve, Air Cooled, BSVI Compliant DTS-i Fi Engine",
    "frontBrake": "Disc",
    "fuelCapacity": "15L",
    "left":3,
    "dayprice":189,
    "weekly":899,
    "monthly":2999
   },
  
  ]
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

  app.get("/",(request,response)=>{
    response.send("hello");
});
app.use("/usersdata",usersRouter);
app.use("/fleetandpricing",bikesRouter)





app.listen(PORT,()=>console.log(`App is started ${PORT}`));


