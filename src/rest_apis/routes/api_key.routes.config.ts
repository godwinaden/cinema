import {RoutesConfig} from "./route.config";
import express from "express";

export class ApiKeyRoutes extends RoutesConfig {

    constructor(app: express.Application) {
        super(app, 'ApiKeyRoutes');
    }

    configureRoutes() {
        // (we'll add the actual route configuration here next)
        return this.app;
    }

}