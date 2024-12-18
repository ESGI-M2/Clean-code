import express, { Request, Response, Router } from 'express';
import RouteInterface from './route-interface';
import container from '../ioc/container.registry';
import BikeController from '../controllers/bike/bike-controller';
import BikeControllerWriter from '../controllers/bike/bike-controller-writer';

export default class BikeRoute implements RouteInterface {
  router: Router;
  bikeController: BikeController;
  bikeControllerWriter: BikeControllerWriter;

  constructor() {
    this.router = express.Router();
    this.bikeController = container.resolve<BikeController>('BikeController');
    this.bikeControllerWriter = container.resolve<BikeControllerWriter>('BikeControllerWriter');
  }

  getRouter() {
    this.router.get('/', async (req: Request, res: Response) => {
      this.bikeController.list(req, res);
    });

    this.router.get('/:id', async (req: Request, res: Response) => {
      this.bikeController.getById(req, res);
    });

    this.router.get('/search/:keyword', async (req: Request, res: Response) => {
      this.bikeController.search(req, res);
    });

    this.router.post('/', async (req: Request, res: Response) => {
      this.bikeControllerWriter.create(req, res);
    });

    return this.router;
  }
}
