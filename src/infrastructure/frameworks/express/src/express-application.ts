import express, { Express } from 'express';
import IndexRoute from './routes/index-route';

export default class ExpressApplication {
  private app: Express;
  private routes: IndexRoute;

  constructor() {
    this.app = express();
    this.routes = new IndexRoute();
  }

  configureExpressApplication(): Express {
    this.routes.configureRoutes(this.app);

    return this.app;
  }
}
