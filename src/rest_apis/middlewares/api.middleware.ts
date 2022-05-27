import express from 'express';
import debug from 'debug';
import {apiKeyRepo} from "../../database/repositories/api_key_repo";

const log: debug.IDebugger = debug('app:api-middleware');
class ApiMiddleware {

    /*
    * The idea here is to be able to simply use the full body request when we would like
    * to update cinema information, without worrying about getting the ID from the parameters every time.
    * Instead, it’s taken care of in just one spot, the middleware
    * */
    async extractId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.cinemaId;
        next();
    }

    async validateApiKeyExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        //every api request must carry an authorization header have the domain name without http://www. and .com with space
        //then the api key
        try {
            let reqToken = req.header('authorization')!.split(' ');
            const apiKey = await apiKeyRepo.checkIfKeyExist(reqToken[0], reqToken[1]);
            if (apiKey) {
                next();
            } else {
                res.status(401).send({
                    error: `Domain Unauthorized Domain | Key`,
                });
            }
        }catch(err){
            log('Validating ApiKey: Error: ', err );
            res.status(404).send({
                error: `Request Forbidden From This Domain`,
            });
        }
    }
}

export const apiMiddleware = new ApiMiddleware();