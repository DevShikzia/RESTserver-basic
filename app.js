import * as dotenv from 'dotenv'; 
import { v2 as cloudinary } from 'cloudinary'
dotenv.config();


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret:process.env.CLOUD_API_SECRET 
  });

import { Server } from './models/server.js';


const server = new Server()

server.listen();

var c = (c) => console.log(c)