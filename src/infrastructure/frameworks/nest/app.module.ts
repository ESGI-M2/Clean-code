import { Module } from '@nestjs/common';
import { CustomerModule } from './src/modules/customer-module';
import { OccupationModule } from './src/modules/occupation-module';
import SequelizeAdapter from '@triumph/sequelize-adapter/src';
import DatabaseAdapter from '@triumph/shared-infrastructure/database-adapter/database-adapter.interface';

@Module({
  imports: [
    CustomerModule,
    OccupationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: DatabaseAdapter,
      useClass: SequelizeAdapter,
    },
  ],
  exports: [DatabaseAdapter],
})
export class AppModule {}
