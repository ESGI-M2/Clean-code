import express, { Request, Response, Express, Router } from 'express';
import RouteInterface from './route-interface';
import VisitController from '../controllers/visit/visit-controller';
import VisitControllerWriter from '../controllers/visit/visit-controller-writer';
import container from '../ioc/container.registry';

export default class VisitRoute implements RouteInterface {
  router: Router;
  visitController: VisitController;
  visitControllerWriter: VisitControllerWriter;

  constructor() {
    this.router = express.Router();
    this.visitController = container.resolve<VisitController>('VisitController');
    this.visitControllerWriter = container.resolve<VisitControllerWriter>('VisitControllerWriter');
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

    this.router.post('/', async (req: Request, res: Response) => {
      this.visitControllerWriter.create(req, res);
    });

    return this.router;
  }
}
