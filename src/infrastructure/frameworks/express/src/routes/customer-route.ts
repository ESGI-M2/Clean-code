import express, { Request, Response, Express, Router } from 'express';
import RouteInterface from './route-interface';
import CustomerController from '../controllers/customer/customer-controller';
import CustomerControllerWriter from '../controllers/customer/customer-controller-writer';
import container from '../ioc/container.registry';

export default class CustomerRoute implements RouteInterface {
  router: Router;
  customerController: CustomerController;
  customerControllerWriter: CustomerControllerWriter;

  constructor() {
    this.router = express.Router();
    this.customerController = container.resolve<CustomerController>('CustomerController');
    this.customerControllerWriter = container.resolve<CustomerControllerWriter>('CustomerControllerWriter');
  }

  getRouter() {
    this.router.get('/', (req: Request, res: Response) => {
      this.customerController.list(req, res);
    });

    this.router.get('/:id', (req: Request, res: Response) => {
      this.customerController.getById(req, res);
    });
    
    this.router.get('/search/:keyword', (req: Request, res: Response) => {
      this.customerController.search(req, res);
    });

    this.router.post('/', async (req: Request, res: Response) => {
      this.customerControllerWriter.create(req, res);
    });

    return this.router;
  }
}
