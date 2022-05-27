import express from 'express';
import debug from 'debug';
import {apiKeyRepo} from "../../database/repositories/api_key_repo";


const log: debug.IDebugger = debug('app:api-key-controller');
class ApiKeyController{

    async create_key(req: express.Request, res: express.Response){
        try{
            const apiKey = await apiKeyRepo.create_key(req.body);
            res.status(201).send(apiKey);
        }catch(err){
            res.status(404).send("Forbidden: Request body is missing some fields")
        }
    }

    async delete_key(req: express.Request, res: express.Response){
        try{
            const { id } = req.params;
            log(await apiKeyRepo.delete_key(parseInt(id)));
            res.status(204).send();
        }catch(err){
            res.status(404).send("Forbidden: Request doesn't contain 'keyId' params")
        }
    }

    async update_key(req: express.Request, res: express.Response){
        try{
            const { id } = req.params;
            log(await apiKeyRepo.update_key(parseInt(id), req.body));
            res.status(204).send();
        }catch(err){
            res.status(404).send("Forbidden: Request body is missing some fields")
        }
    }
}

export const apiKeyController = new ApiKeyController();