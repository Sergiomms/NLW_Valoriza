import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "reflect-metadata";
import "./database";
import { router } from "./routes"
 
//@types/express
const app = express();

/**
 *Tipod de Parametros
 *Routes Params => http://localhost:3000/produtos/123456 
 *Query Params => http://localhost:3000/produtos?name=teclado&description=tecladobom
 
 *Body Params => {
 * "name": "teclado"
 * "description": "teclado bom" 
 * }
 */

// yarn typeorm migration:run (rodar migration)
// yarn typeorm migration:revert (desfazer migration)

// Fluxo da aplicação
// Server -> Routes -> Controllers -> Services

app.use(express.json())

app.use(router)

// Para um middlerware de erro precisamos passar 4 parametros 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error){
    return res.status(400).json({error: err.message})
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error.'
  })
})

app.get("/test", (req, res) => {
  return res.send("Olá Neno");
});

app.post("/test-post", (req, res) => {
  return res.send("Olá Neno no POST");
});

app.listen(3000, () => console.log("Server is running"));
