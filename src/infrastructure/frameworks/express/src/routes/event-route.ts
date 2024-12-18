import express, { Request, Response, Express, Router } from 'express';
import RouteInterface from './route-interface';
import container from '../ioc/container.registry';
import EventController from '../controllers/event/event-controller';
import EventControllerWriter from '../controllers/event/event-controller-writer';

export default class EventRoute implements RouteInterface {
  router: Router;
  eventController: EventController;
  eventControllerWriter: EventControllerWriter;

  constructor() {
    this.router = express.Router();
    this.eventController = container.resolve<EventController>('EventController');
    this.eventControllerWriter = container.resolve<EventControllerWriter>('EventControllerWriter');
  }

  getRouter() {
    this.router.get('/', async (req: Request, res: Response) => {
      this.eventController.list(req, res);
    });

    this.router.get('/:id', async (req: Request, res: Response) => {
      this.eventController.getById(req, res);
    });

    this.router.get('/search/:keyword', async (req: Request, res: Response) => {
      this.eventController.search(req, res);
    });

    this.router.post('/', async (req: Request, res: Response) => {
      this.eventControllerWriter.create(req, res);
    });

    return this.router;
  }
}
