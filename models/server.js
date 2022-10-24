import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import {router as routerUsers} from '../routes/user.js';
import {router as routerCategories} from '../routes/categories.js';
import {router as routerAuth} from '../routes/auth.js';
import {router as routerProducts} from '../routes/products.js';
import {router as routerSearch} from '../routes/search.js';
import {router as routerUpload} from '../routes/uploads.js'
import { dbConnection } from '../database/config.js';


export class Server {
    
    constructor(){
        
        this.app = express();
        this.port = process.env.PORT;

        //rutas 
        this.paths = {
            auth:     '/api/auth',
            category: '/api/categories',
            upload: '/api/upload',
            user:     '/api/users',
            product:   '/api/products',
            search:     '/api/search',

        }
      //  this.usersPath = '/api/users'
       // this.authPath = '/api/auth'



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

            //Config FileUpload

            this.app.use(fileUpload({
                useTempFiles : true,
                tempFileDir : '/tmp/'
            }));
        }

        

        routes() {
              

            this.app.use(this.paths.auth,routerAuth)
            this.app.use(this.paths.user,routerUsers)
            this.app.use(this.paths.category,routerCategories)
            this.app.use(this.paths.product,routerProducts)
            this.app.use(this.paths.search,routerSearch)
            this.app.use(this.paths.upload, routerUpload)
        }

        listen() {

            this.app.listen(this.port, () => {
             console.log(`Example app listening on port ${this.port}`)
});
        }

}




