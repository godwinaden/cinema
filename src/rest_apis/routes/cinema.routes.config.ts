import express from 'express';
import {RoutesConfig} from "./route.config";

export class CinemasRoutes extends RoutesConfig {

    constructor(app: express.Application) {
        super(app, 'CinemasRoutes');
    }

    configureRoutes() {
        this.app.route('/cinemas')
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {

                next();
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`List of users`);
            })
            .post((req: express.Request, res: express.Response) => {
                res.status(200).send(`Post to users`);
            });

        this.app.route('/cinemas/:cinemaId')
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {

                next();
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`GET requested for id ${req.params.userId}`);
            })
            .put((req: express.Request, res: express.Response) => {
                res.status(200).send(`PUT requested for id ${req.params.userId}`);
            })
            .patch((req: express.Request, res: express.Response) => {
                res.status(200).send(`PATCH requested for id ${req.params.userId}`);
            })
            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`DELETE requested for id ${req.params.userId}`);
            });

        return this.app;
    }

}