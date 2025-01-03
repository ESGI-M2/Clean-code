import { Module } from '@nestjs/common';
import { BikeModelController } from '../../controllers/bike_model/bike-model-controller';
import { BikeModelControllerWriter } from '../../controllers/bike_model/bike-model-controller-writer';
import { BikeModelService } from '../../modules/bike_model/bike-model-services';
import  BikeModelRepositoryReader  from '@triumph/application/ports/repositories/reader/bike-model-repository-reader';
import  BikeModelRepositoryWriter  from '@triumph/application/ports/repositories/writer/bike-model-repository-writer';
import  SequelizeBikeModelRepositoryReader  from '@triumph/sequelize-adapter/src/repositories/bike-model/bike-model-repository-reader';
import  SequelizeBikeModelRepositoryWriter  from '@triumph/sequelize-adapter/src/repositories/bike-model/bike-model-repository-writer';

@Module({
  imports: [],
  controllers: [BikeModelController, BikeModelControllerWriter],
  providers: [
    BikeModelService,
    {
      provide: BikeModelRepositoryReader,
      useClass: SequelizeBikeModelRepositoryReader, 
    },
    {
      provide: BikeModelRepositoryWriter,
      useClass: SequelizeBikeModelRepositoryWriter,
    },
  ],
})
export class BikeModelModule {}
