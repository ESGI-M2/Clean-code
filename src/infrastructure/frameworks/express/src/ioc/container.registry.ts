import { createContainer, asClass } from 'awilix';

import CustomerController from '../controllers/customer/customer-controller';
import SequelizeCustomerRepository from '@triumph/sequelize-adapter/src/repositories/customer/customer-repository-reader';
import CustomerControllerWriter from '../controllers/customer/customer-controller-writer';
import SequelizeCustomerRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/customer/customer-repository-writer';

import CustomerEventController from '../controllers/customer-event/customer-event-controller';
import SequelizeCustomerEventRepository from '@triumph/sequelize-adapter/src/repositories/customer-event/customer-event-repository-reader';
import CustomerEventControllerWriter from '../controllers/customer-event/customer-event-controller-writer';
import SequelizeCustomerEventRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/customer-event/customer-event-repository-writer';

import OccupationController from '../controllers/occupation/occupation-controller';
import OccupationControllerWriter from '../controllers/occupation/occupation-controller-writer';
import SequelizeOccupationRepository from '@triumph/sequelize-adapter/src/repositories/occupation/occupation-repository-reader';
import SequelizeOccupationRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/occupation/occupation-repository-writer';

import BikeModelController from '../controllers/bike-model/bike-model-controller';
import BikeModelControllerWriter from '../controllers/bike-model/bike-model-controller-writer';
import SequelizeBikeModelRepository from '@triumph/sequelize-adapter/src/repositories/bike-model/bike-model-repository-reader';
import SequelizeBikeModelRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/bike-model/bike-model-repository-writer';

import BikeController from '../controllers/bike/bike-controller';
import BikeControllerWriter from '../controllers/bike/bike-controller-writer';
import SequelizeBikeRepository from '@triumph/sequelize-adapter/src/repositories/bike/bike-repository-reader';
import SequelizeBikeRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/bike/bike-repository-writer';

import DrivingLicenseController from '../controllers/driving-license/driving-license-controller';
import SequelizeDrivingLicenseRepository from '@triumph/sequelize-adapter/src/repositories/driving-license/driving-license-repository-reader';
import DrivingLicenseControllerWriter from '../controllers/driving-license/driving-license-controller-writer';
import SequelizeDrivingLicenseRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/driving-license/driving-license-repository-writer';

import EventController from '../controllers/event/event-controller';
import EventControllerWriter from '../controllers/event/event-controller-writer';
import SequelizeEventRepository from '@triumph/sequelize-adapter/src/repositories/event/event-repository-reader';
import SequelizeEventRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/event/event-repository-writer';

import GuaranteeController from '../controllers/guarantee/guarantee-controller';
import SequelizeGuaranteeRepository from '@triumph/sequelize-adapter/src/repositories/guarantee/guarantee-repository-reader';
import GuaranteeControllerWriter from '../controllers/guarantee/guarantee-controller-writer';
import SequelizeGuaranteeRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/guarantee/guarantee-repository-writer';

import TrialController from '../controllers/trial/trial-controller';
import SequelizeTrialRepository from '@triumph/sequelize-adapter/src/repositories/trial/trial-repository-reader';
import TrialControllerWriter from '../controllers/trial/trial-controller-writer';
import SequelizeTrialRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/trial/trial-repository-writer';

import VisitController from '../controllers/visit/visit-controller';
import SequelizeVisitRepository from '@triumph/sequelize-adapter/src/repositories/visit/visit-repository-reader';
import VisitControllerWriter from '../controllers/visit/visit-controller-writer';
import SequelizeVisitRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/visit/visit-repository-writer';

import SequelizeAdapter from '@triumph/sequelize-adapter/src';
import ExpressApplication from '../express-application';
const container = createContainer();

container.register({
  ExpressApplication: asClass(ExpressApplication).classic(),
  DatabaseAdapter: asClass(SequelizeAdapter).classic(),

  CustomerRepositoryReader: asClass(SequelizeCustomerRepository).singleton(),
  CustomerController: asClass(CustomerController).classic(),

  CustomerRepositoryWriter: asClass(SequelizeCustomerRepositoryWriter).singleton(),
  CustomerControllerWriter: asClass(CustomerControllerWriter).classic(),

  CustomerEventRepositoryReader: asClass(SequelizeCustomerEventRepository).singleton(),
  CustomerEventController: asClass(CustomerEventController).classic(),

  CustomerEventRepositoryWriter: asClass(SequelizeCustomerEventRepositoryWriter).singleton(),
  CustomerEventControllerWriter: asClass(CustomerEventControllerWriter).classic(),

  OccupationRepositoryReader: asClass(SequelizeOccupationRepository).singleton(),
  OccupationController: asClass(OccupationController).classic(),

  OccupationRepositoryWriter: asClass(SequelizeOccupationRepositoryWriter).singleton(),
  OccupationControllerWriter: asClass(OccupationControllerWriter).classic(),

  BikeModelRepositoryReader: asClass(SequelizeBikeModelRepository).singleton(),
  BikeModelController: asClass(BikeModelController).classic(),

  BikeModelRepositoryWriter: asClass(SequelizeBikeModelRepositoryWriter).singleton(),
  BikeModelControllerWriter: asClass(BikeModelControllerWriter).classic(),

  BikeRepositoryReader: asClass(SequelizeBikeRepository).singleton(),
  BikeController: asClass(BikeController).classic(),

  BikeRepositoryWriter: asClass(SequelizeBikeRepositoryWriter).singleton(),
  BikeControllerWriter: asClass(BikeControllerWriter).classic(),

  DrivingLicenseRepositoryReader: asClass(SequelizeDrivingLicenseRepository).singleton(),
  DrivingLicenseController: asClass(DrivingLicenseController).classic(),

  DrivingLicenseRepositoryWriter: asClass(SequelizeDrivingLicenseRepositoryWriter).singleton(),
  DrivingLicenseControllerWriter: asClass(DrivingLicenseControllerWriter).classic(),

  EventRepositoryReader: asClass(SequelizeEventRepository).singleton(),
  EventController: asClass(EventController).classic(),

  EventRepositoryWriter: asClass(SequelizeEventRepositoryWriter).singleton(),
  EventControllerWriter: asClass(EventControllerWriter).classic(),

  GuaranteeRepositoryReader: asClass(SequelizeGuaranteeRepository).singleton(),
  GuaranteeController: asClass(GuaranteeController).classic(),

  GuaranteeRepositoryWriter: asClass(SequelizeGuaranteeRepositoryWriter).singleton(),
  GuaranteeControllerWriter: asClass(GuaranteeControllerWriter).classic(),

  TrialRepositoryReader: asClass(SequelizeTrialRepository).singleton(),
  TrialController: asClass(TrialController).classic(),

  TrialRepositoryWriter: asClass(SequelizeTrialRepositoryWriter).singleton(),
  TrialControllerWriter: asClass(TrialControllerWriter).classic(),

  VisitRepositoryReader: asClass(SequelizeVisitRepository).singleton(),
  VisitController: asClass(VisitController).classic(),

  VisitRepositoryWriter: asClass(SequelizeVisitRepositoryWriter).singleton(),
  VisitControllerWriter: asClass(VisitControllerWriter).classic(),
});

export default container;
