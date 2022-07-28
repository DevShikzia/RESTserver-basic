import express from 'express';
import cors from 'cors';

import {router} from '../routes/user.js';
import { dbConnection } from '../database/config.js';


export class Server {
    
    constructor(){
        
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users'


        //CONNECT DB

        this.connectDB();

        // Middlewares
 
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

      async connectDB(){
        await dbConnection();
      }

        middlewares() {
            
                // .use() esta propiedad se usa para declarar un middleware
            

            // Lectura y parseo del body

            this.app.use(express.json())

                //CORS
            this.app.use( cors() );


                // Directorio Publico
            this.app.use(express.static('public'))

        }


        routes() {
              

            this.app.use(this.usersPath,router)
        }

        listen() {

            this.app.listen(this.port, () => {
             console.log(`Example app listening on port ${this.port}`)
});
        }

}




