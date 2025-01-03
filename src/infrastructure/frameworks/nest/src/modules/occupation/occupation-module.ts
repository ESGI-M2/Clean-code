import { Module } from '@nestjs/common';
import { OccupationController } from '../../controllers/occupation/occupation-controller';
import { OccupationService } from '../../modules/occupation/occupation-services';
import SequelizeOccupationRepositoryReader from '@triumph/sequelize-adapter/src/repositories/occupation/occupation-repository-reader';
import SequelizeOccupationRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/occupation/occupation-repository-writer';

@Module({
  controllers: [OccupationController],
  providers: [
    OccupationService,
    {
      provide: 'OccupationRepositoryReader',
      useClass: SequelizeOccupationRepositoryReader,
    },
    {
      provide: 'OccupationRepositoryWriter',
      useClass: SequelizeOccupationRepositoryWriter,
    },
  ],
})
export class OccupationModule {}
