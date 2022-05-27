import {RoutesConfig} from "./route.config";
import express from "express";
import {apiKeyController} from "../controllers/apiKey.controller";
import {apiMiddleware} from "../middlewares/api.middleware";

export class ApiKeyRoutes extends RoutesConfig {

    constructor(app: express.Application) {
        super(app, 'ApiKeyRoutes');
    }

    configureRoutes() {
        this.app.route('/api_keys')
            .post(apiKeyController.create_key);

        this.app.route('/api_keys/:id')
            .all(apiMiddleware.validateApiKeyExists)
            .put(apiKeyController.update_key)
            .delete(apiKeyController.delete_key);

        return this.app;
    }

}