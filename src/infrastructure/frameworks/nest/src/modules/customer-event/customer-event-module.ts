import { Module } from '@nestjs/common';
import { CustomerEventReaderController } from '../../controllers/customer-event/customer-event-controller';
import { CustomerEventWriterController } from '../../controllers/customer-event/customer-event-controller-writer';
import { CustomerEventService } from '../../modules/customer-event/customer-event-services';
import  SequelizeCustomerEventRepositoryReader  from '@triumph/sequelize-adapter/src/repositories/customer-event/customer-event-repository-reader';
import  SequelizeCustomerEventRepositoryWriter  from '@triumph/sequelize-adapter/src/repositories/customer-event/customer-event-repository-writer';
import  SequelizeCustomerRepositoryReader  from '@triumph/sequelize-adapter/src/repositories/customer/customer-repository-reader';
import  SequelizeEventRepositoryReader  from '@triumph/sequelize-adapter/src/repositories/event/event-repository-reader';

@Module({
  imports: [],
  controllers: [CustomerEventReaderController, CustomerEventWriterController],
  providers: [
    CustomerEventService,
    {
      provide: 'CustomerEventRepositoryReader',
      useClass: SequelizeCustomerEventRepositoryReader,
    },
    {
      provide: 'CustomerEventRepositoryWriter',
      useClass: SequelizeCustomerEventRepositoryWriter,
    },
    {
      provide: 'CustomerRepositoryReader',
      useClass: SequelizeCustomerRepositoryReader,
    },
    {
      provide: 'EventRepositoryReader',
      useClass: SequelizeEventRepositoryReader,
    },
  ],
})
export class CustomerEventModule {}
