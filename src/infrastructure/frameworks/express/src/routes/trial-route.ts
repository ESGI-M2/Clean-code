import express, { Request, Response, Express, Router } from 'express';
import RouteInterface from './route-interface';
import TrialController from '../controllers/trial/trial-controller';
import container from '../ioc/container.registry';

export default class TrialRoute implements RouteInterface {
  router: Router;
  trialController: TrialController;

  constructor() {
    this.router = express.Router();
    this.trialController = container.resolve<TrialController>('TrialController');
  }

  getRouter() {
    this.router.get('/', (req: Request, res: Response) => {
      this.trialController.list(req, res);
    });

    this.router.get('/:id', (req: Request, res: Response) => {
      this.trialController.getById(req, res);
    });
    
    this.router.get('/search/:keyword', (req: Request, res: Response) => {
      this.trialController.search(req, res);
    });

    return this.router;
  }
}
