import express, { Request, Response, Router } from 'express';
import RouteInterface from './route-interface';
import CustomerEventController from '../controllers/customer-event/customer-event-controller';
import CustomerEventControllerWriter from '../controllers/customer-event/customer-event-controller-writer';
import container from '../ioc/container.registry';

export default class CustomeEventrRoute implements RouteInterface {
  router: Router;
  customerEventController: CustomerEventController;
  customerEventControllerWriter: CustomerEventControllerWriter;

  constructor() {
    this.router = express.Router();
    this.customerEventController = container.resolve<CustomerEventController>('CustomerEventController');
    this.customerEventControllerWriter = container.resolve<CustomerEventControllerWriter>('CustomerEventControllerWriter');
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

    this.router.get('/events/:id', (req: Request, res: Response) => {
      this.customerEventController.getByCustomerId(req, res);
    });

    this.router.post('/', async (req: Request, res: Response) => {
      this.customerEventControllerWriter.create(req, res);
    });

    return this.router;
  }
}
