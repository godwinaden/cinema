import express from 'express';
import debug from 'debug';
import {cinemaRepo} from "../../database/repositories/cinema_repo";


const log: debug.IDebugger = debug('app:cinema-controller');
class CinemaController{

    async create_cinema(req: express.Request, res: express.Response){
        try{
            const cinema = await cinemaRepo.create_cinema(req.body);
            res.status(201).send(cinema);
        }catch(err){
            res.status(404).send("Forbidden: Request body is missing some fields")
        }
    }

    //request here must possess the following parameters page and limit
    async get_cinemas(req: express.Request, res: express.Response) {
        try{
            let page: number = parseInt(typeof req.query.page == "string"? req.query.page : "1");
            let limit: number = parseInt(typeof req.query.limit == "string"? req.query.limit : "100");
            const cinemas = await cinemaRepo.get_cinemas_with_shows(limit, limit*page);
            res.status(200).send(cinemas);
        }catch(err: any){
            res.status(404).send("Forbidden: Request doesn't " +
                "contain string 'page' and 'limit' request body: " + err.toString())
        }
    }

    async get_cinema(req: express.Request, res: express.Response) {
        try{
            const { cinemaId } = req.params;
            const cinema = await cinemaRepo.get_cinema_with_shows(parseInt(cinemaId));
            res.status(200).send(cinema);
        }catch(err){
            res.status(404).send("Forbidden: Request doesn't contain 'cinemaId' params")
        }
    }

    async delete_cinema(req: express.Request, res: express.Response){
        try{
            const { cinemaId } = req.params;
            log(await cinemaRepo.delete_cinema(parseInt(cinemaId)));
            res.status(204).send();
        }catch(err){
            res.status(404).send("Forbidden: Request doesn't contain 'cinemaId' params")
        }
    }

    async update_cinema(req: express.Request, res: express.Response){
        try{
            const { cinemaId } = req.params;
            log(await cinemaRepo.update_cinema(parseInt(cinemaId), req.body));
            res.status(204).send();
        }catch(err){
            res.status(404).send("Forbidden: Request body is missing some fields")
        }
    }

    async rate_cinema(req: express.Request, res: express.Response){
        try{
            const { cinemaId } = req.params;
            log(await cinemaRepo.rate_cinema(parseInt(cinemaId), req.body["rate"]));
            res.status(204).send();
        }catch(err){
            res.status(404).send("Forbidden: Request body is missing some fields")
        }
    }
}

export const cinemaController = new CinemaController();