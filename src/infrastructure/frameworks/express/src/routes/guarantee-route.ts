import express, { Request, Response, Express, Router } from 'express';
import RouteInterface from './route-interface';
import GuaranteeController from '../controllers/guarantee/guarantee-controller';
import container from '../ioc/container.registry';

export default class GuaranteeRoute implements RouteInterface {
  router: Router;
  guaranteeController: GuaranteeController;

  constructor() {
    this.router = express.Router();
    this.guaranteeController = container.resolve<GuaranteeController>('GuaranteeController');
  }

  getRouter() {
    this.router.get('/', (req: Request, res: Response) => {
      this.guaranteeController.list(req, res);
    });

    this.router.get('/:id', (req: Request, res: Response) => {
      this.guaranteeController.getById(req, res);
    });
    
    this.router.get('/search/:keyword', (req: Request, res: Response) => {
      this.guaranteeController.search(req, res);
    });

    return this.router;
  }
}
