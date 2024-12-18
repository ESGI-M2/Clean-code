import express, { Request, Response, Express, Router } from 'express';
import RouteInterface from './route-interface';
import container from '../ioc/container.registry';
import BikeModelController from '../controllers/bike-model/bike-model-controller';
import BikeModelControllerWriter from '../controllers/bike-model/bike-model-controller-writer';

export default class BikeModelRoute implements RouteInterface {
  router: Router;
  bikeModelController: BikeModelController;
  bikeModelControllerWriter: BikeModelControllerWriter;

  constructor() {
    this.router = express.Router();
    this.bikeModelController = container.resolve<BikeModelController>('BikeModelController');
    this.bikeModelControllerWriter = container.resolve<BikeModelControllerWriter>('BikeModelControllerWriter');
  }

  getRouter() {
    this.router.get('/', async (req: Request, res: Response) => {
      this.bikeModelController.list(req, res);
    });

    this.router.get('/:id', async (req: Request, res: Response) => {
      this.bikeModelController.getById(req, res);
    });

    this.router.get('/search/:keyword', async (req: Request, res: Response) => {
      this.bikeModelController.search(req, res);
    });

    this.router.post('/', async (req: Request, res: Response) => {
      this.bikeModelControllerWriter.create(req, res);
    });

    return this.router;
  }
}
