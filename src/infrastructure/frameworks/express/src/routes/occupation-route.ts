import express, { Request, Response, Express, Router } from 'express';
import RouteInterface from './route-interface';
import container from '../ioc/container.registry';
import OccupationController from '../controllers/occupation/occupation-controller';
import OccupationControllerWriter from '../controllers/occupation/occupation-controller-writer';

export default class OccupationRoute implements RouteInterface {
  router: Router;
  occupationController: OccupationController;
  occupationControllerWriter: OccupationControllerWriter;

  constructor() {
    this.router = express.Router();
    this.occupationController = container.resolve<OccupationController>('OccupationController');
    this.occupationControllerWriter = container.resolve<OccupationControllerWriter>('OccupationControllerWriter');
  }

  getRouter() {
    this.router.get('/', async (req: Request, res: Response) => {
      this.occupationController.list(req, res);
    });

    this.router.get('/:id', async (req: Request, res: Response) => {
      this.occupationController.getById(req, res);
    });

    this.router.get('/search/:keyword', async (req: Request, res: Response) => {
      this.occupationController.search(req, res);
    });

    this.router.post('/', async (req: Request, res: Response) => {
      this.occupationControllerWriter.create(req, res);
    });

   /* this.router.put('/:id', async (req: Request, res: Response) => {
      await this.occupationControllerWriter.edit(req, res);
    });
/*
    this.router.delete('/:id', async (req: Request, res: Response) => {
      await this.occupationControllerWriter.delete(req, res);
    });*/

    return this.router;
  }
}
