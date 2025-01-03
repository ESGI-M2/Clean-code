import { Module } from '@nestjs/common';
import { BikeController } from '../../controllers/bike/bike-controller';
import  BikeService  from '../../modules/bike/bike-services';
import  BikeRepositoryWriter  from '@triumph/sequelize-adapter/src/repositories/bike/bike-repository-writer';
import  BikeRepositoryReader  from '@triumph/sequelize-adapter/src/repositories/bike/bike-repository-reader';
import  CustomerRepositoryReader  from '@triumph/sequelize-adapter/src/repositories/customer/customer-repository-reader';
import  BikeModelRepositoryReader  from '@triumph/sequelize-adapter/src/repositories/bike-model/bike-model-repository-reader';

@Module({
  controllers: [BikeController],
  providers: [
    BikeService,
    {
      provide: 'BikeRepositoryWriter',
      useClass: BikeRepositoryWriter,
    },
    {
      provide: 'BikeRepositoryReader',
      useClass: BikeRepositoryReader,
    },
    {
      provide: 'CustomerRepositoryReader',
      useClass: CustomerRepositoryReader,
    },
    {
      provide: 'BikeModelRepositoryReader',
      useClass: BikeModelRepositoryReader,
    },
  ],
})
export class BikeModule {}
