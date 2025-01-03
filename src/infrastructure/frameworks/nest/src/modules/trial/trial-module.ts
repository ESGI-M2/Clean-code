import { Module } from '@nestjs/common';
import  {TrialControllerWriter}  from '../../controllers/trial/trial-controller-writer';
import  {TrialController}  from '../../controllers/trial/trial-controller';
import SequelizeTrialRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/trial/trial-repository-writer';
import SequelizeTrialRepositoryReader from '@triumph/sequelize-adapter/src/repositories/trial/trial-repository-reader';
import SequelizeBikeRepositoryReader from '@triumph/sequelize-adapter/src/repositories/bike/bike-repository-reader';
import { TrialService } from '../../modules/trial/trial-services';
import CreateTrialCommandHandler from '@triumph/application/queries/trial/add/create-trial-handler';
import GetTrialListQueryHandler from '@triumph/application/queries/trial/get/get-trial-list-query-handler';
import GetTrialQueryHandler from '@triumph/application/queries/trial/get/get-trial-query-handler';
import SearchTrialQueryHandler from '@triumph/application/queries/trial/filter/search-trial-query-handler';

@Module({
  controllers: [TrialControllerWriter, TrialController],
  providers: [
    TrialService,
    {
      provide: 'TrialRepositoryWriter',
      useClass: SequelizeTrialRepositoryWriter,
    },
    {
      provide: 'TrialRepositoryReader',
      useClass: SequelizeTrialRepositoryReader,
    },
    {
      provide: 'BikeRepositoryReader',
      useClass: SequelizeBikeRepositoryReader,
    },
    CreateTrialCommandHandler,
    GetTrialListQueryHandler,
    GetTrialQueryHandler,
    SearchTrialQueryHandler,
  ],
})
export class TrialModule {}
