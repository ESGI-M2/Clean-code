import express, { Request, Response, Express, Router } from 'express';
import RouteInterface from './route-interface';
import CustomerEventController from '../controllers/customer-event/customer-event-controller';
import container from '../ioc/container.registry';

export default class CustomeEventrRoute implements RouteInterface {
  router: Router;
  customerEventController: CustomerEventController;

  constructor() {
    this.router = express.Router();
    this.customerEventController = container.resolve<CustomerEventController>('CustomerEventController');
  }

  getRouter() {
    this.router.get('/', (req: Request, res: Response) => {
      this.customerEventController.list(req, res);
    });

    this.router.get('/:id', (req: Request, res: Response) => {
      this.customerEventController.getById(req, res);
    });
    
    this.router.get('/search/:keyword', (req: Request, res: Response) => {
      this.customerEventController.search(req, res);
    });

    return this.router;
  }
}
