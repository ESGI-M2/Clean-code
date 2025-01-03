import { Module } from '@nestjs/common';
import { CustomerReaderController } from '../../controllers/customer/customer-controller';
import { CustomerWriterController } from '../../controllers/customer/customer-controller-writer';
import SequelizeCustomerRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/customer/customer-repository-writer';
import SequelizeCustomerRepositoryReader from '@triumph/sequelize-adapter/src/repositories/customer/customer-repository-reader';
import SequelizeDrivingLicenseRepositoryReader from '@triumph/sequelize-adapter/src/repositories/driving-license/driving-license-repository-reader';
import SequelizeOccupationRepositoryReader from '@triumph/sequelize-adapter/src/repositories/occupation/occupation-repository-reader';
import CreateCustomerCommandHandler from '@triumph/application/queries/customer/add/create-customer-handler';
import GetCustomerListQueryHandler from '@triumph/application/queries/customer/get/get-customer-list-query-handler';
import GetCustomerQueryHandler from '@triumph/application/queries/customer/get/get-customer-query-handler';
import SearchCustomerQueryHandler from '@triumph/application/queries/customer/filter/search-customer-query-handler';
import  CustomerService  from '../../modules/customer/customer-services';

@Module({
  controllers: [CustomerReaderController, CustomerWriterController],
  providers: [
    {
      provide: 'CustomerRepositoryWriter',
      useClass: SequelizeCustomerRepositoryWriter,
    },
    {
      provide: 'CustomerRepositoryReader',
      useClass: SequelizeCustomerRepositoryReader,
    },
    {
      provide: 'DrivingLicenseRepositoryReader',
      useClass: SequelizeDrivingLicenseRepositoryReader,
    },
    {
      provide: 'OccupationRepositoryReader',
      useClass: SequelizeOccupationRepositoryReader,
    },
    GetCustomerListQueryHandler,
    GetCustomerQueryHandler,
    SearchCustomerQueryHandler,
    CreateCustomerCommandHandler,
    CustomerService,
  ],
})
export class CustomerModule {}
