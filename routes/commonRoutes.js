import { Router } from "express";
import { getBookbyId } from "../controller/bookController.js";

const commonRouter = Router();

commonRouter.get('/book/:id',getBookbyId)
// commonRouter.get('/page/:number',(req,res)=>{
//     let pageNumber = req.params.number;
// })


export default commonRouter;