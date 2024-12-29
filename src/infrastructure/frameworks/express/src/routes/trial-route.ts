import express, { Request, Response, Express, Router } from 'express';
import RouteInterface from './route-interface';
import TrialController from '../controllers/trial/trial-controller';
import TrialControllerWriter from '../controllers/trial/trial-controller-writer';
import container from '../ioc/container.registry';

export default class TrialRoute implements RouteInterface {
  router: Router;
  trialController: TrialController;
  trialControllerWriter: TrialControllerWriter;

  constructor() {
    this.router = express.Router();
    this.trialController = container.resolve<TrialController>('TrialController');
    this.trialControllerWriter = container.resolve<TrialControllerWriter>('TrialControllerWriter');
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

    this.router.post('/', async (req: Request, res: Response) => {
      this.trialControllerWriter.create(req, res);
    });

    return this.router;
  }
}
