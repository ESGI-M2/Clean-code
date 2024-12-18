import express, { Request, Response, Express, Router } from 'express';
import RouteInterface from './route-interface';
import VisitController from '../controllers/visit/visit-controller';
import container from '../ioc/container.registry';

export default class VisitRoute implements RouteInterface {
  router: Router;
  visitController: VisitController;

  constructor() {
    this.router = express.Router();
    this.visitController = container.resolve<VisitController>('VisitController');
  }

  getRouter() {
    this.router.get('/', (req: Request, res: Response) => {
      this.visitController.list(req, res);
    });

    this.router.get('/:id', (req: Request, res: Response) => {
      this.visitController.getById(req, res);
    });
    
    this.router.get('/search/:keyword', (req: Request, res: Response) => {
      this.visitController.search(req, res);
    });

    return this.router;
  }
}
