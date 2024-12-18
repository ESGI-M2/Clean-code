import { Express } from 'express';
import RouteInterface from './route-interface';
import CustomerRoute from './customer-route';
import CustomerEventRoute from './customer-event-route';
import OccupationRoute from './occupation-route';
import GuaranteeRoute from './guarantee-route';
import TrialRoute from './trial-route';
import EventRoute from './event-route';
import BikeRoute from './bike-route';
import BikeModelRoute from './bike-model-route';
import DrivingLicenseRoute from './driving-license-route';
import VisitRoute from './visit-route';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';


export default class IndexRoute {
  clientRoute: RouteInterface;
  clientEventRoute: RouteInterface;
  occupationRoute: RouteInterface;
  bikeModelRoute: RouteInterface;
  bikeRoute: RouteInterface;
  drivingLicenseRoute: RouteInterface;
  eventRoute: RouteInterface;
  guaranteeRoute: RouteInterface;
  trialRoute: RouteInterface;
  visitRoute: RouteInterface;

  constructor() {
    this.clientRoute = new CustomerRoute();
    this.clientEventRoute = new CustomerEventRoute();
    this.occupationRoute = new OccupationRoute();
    this.bikeModelRoute = new BikeModelRoute();
    this.bikeRoute = new BikeRoute();
    this.drivingLicenseRoute = new DrivingLicenseRoute();
    this.eventRoute = new EventRoute();
    this.guaranteeRoute = new GuaranteeRoute();
    this.trialRoute = new TrialRoute();
    this.visitRoute = new VisitRoute();
  }

  configureRoutes(app: Express) {
    app.use(cors({
      origin: 'http://localhost:3030',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.use(bodyParser.json());
    app.use(express.json());
    app.use('/customers', this.clientRoute.getRouter());
    app.use('/occupations', this.occupationRoute.getRouter());
    app.use('/bikemodels', this.bikeModelRoute.getRouter());
    app.use('/bikes', this.bikeRoute.getRouter());
    app.use('/customerevents', this.clientEventRoute.getRouter());
    app.use('/drivinglicenses', this.drivingLicenseRoute.getRouter());
    app.use('/events', this.eventRoute.getRouter());
    app.use('/guaranties', this.guaranteeRoute.getRouter());
    app.use('/trials', this.trialRoute.getRouter());
    app.use('/visits', this.visitRoute.getRouter());
  }
}
