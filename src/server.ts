import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
//import  * as url  from 'url';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // GET /filteredimage?image_url={{URL}}
    // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file 

  app.get( "/filteredimage", async ( req, res ) => {
    console.log("test")
    if(typeof req.query.image_url == 'undefined'){
      res.status(400).send( "try GET /filteredimage?image_url={{}}")
    } else{
      if(req.query.image_url == ''){
        res.status(400).send("image_url is empty")
      }else{
        try {
          console.log(req.query.image_url);
         let localLocation=await filterImageFromURL(req.query.image_url);
          
         res.sendFile(localLocation);
        }catch(e){
          console.log( e.message);
        }
      }
   }
  } );

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();