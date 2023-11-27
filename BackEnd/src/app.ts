import express from "express";
import cors from "cors";
import "dotenv/config";
import { router } from "./routes";

const PORT = process.env.PORT || 3000
const app = express();

app.set('view engine', 'html');
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
app.all('*', function(req, res, next)/*** CORS support.*/
{
   if (!req.get('Origin')) return next();// use "*" here to accept any origin
   res.set('Access-Control-Allow-Origin', '*');
   res.set('Access-Control-Allow-Methods', 'GET, POST');
   res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   res.set('Access-Control-Allow-Max-Age', '3600');
   if ('OPTIONS' == req.method) return res.send(200);
   next();
});
app.use(router);
app.use(function(req, res){
    res.status(404).render('Not-Found',{title:'no se encuentra la ruta'});
  });
app.listen(3001, ()=>{
    console.log('Listo el servidor en puerto ' + PORT);
});