import express from 'express';
import {RoutesConfig} from "./route.config";
import {apiMiddleware} from "../middlewares/api.middleware";
import {cinemaController} from "../controllers/cinema.controller";

export class CinemasRoutes extends RoutesConfig {

    constructor(app: express.Application) {
        super(app, 'CinemasRoutes');
    }

    configureRoutes() {
        this.app.route('/cinemas')
            .all(apiMiddleware.validateApiKeyExists)
            .get(cinemaController.get_cinemas)
            .post(cinemaController.create_cinema);

        this.app.param(`cinemaId`, apiMiddleware.extractId);
        this.app.route('/cinemas/:cinemaId')
            .all(apiMiddleware.validateApiKeyExists)
            .get(cinemaController.get_cinema)
            .put(cinemaController.update_cinema)
            .patch(cinemaController.rate_cinema)
            .delete(cinemaController.delete_cinema);

        return this.app;
    }

}