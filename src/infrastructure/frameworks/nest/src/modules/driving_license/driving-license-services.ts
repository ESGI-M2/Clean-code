import { Injectable, Inject } from '@nestjs/common';
import DrivingLicenseRepositoryReader from '@triumph/application/ports/repositories/reader/driving-license-repository-reader';
import DrivingLicenseRepositoryWriter from '@triumph/application/ports/repositories/writer/driving-license-repository-writer';
import CreateDrivingLicenseCommandHandler from '@triumph/application/queries/driving-license/add/create-driving-license-handler';
import CreateDrivingLicenseCommand from '@triumph/application/queries/driving-license/add/create-driving-license-command';
import GetDrivingLicenseListQueryHandler from '@triumph/application/queries/driving-license/get/get-driving-license-list-query-handler';
import GetDrivingLicenseListQuery from '@triumph/application/queries/driving-license/get/get-driving-license-list-query';
import GetDrivingLicenseQueryHandler from '@triumph/application/queries/driving-license/get/get-driving-license-query-handler';
import GetDrivingLicenseQuery from '@triumph/application/queries/driving-license/get/get-driving-license-query';
import SearchDrivingLicenseQueryHandler from '@triumph/application/queries/driving-license/filter/search-driving-license-query-handler';
import SearchDrivingLicenseQuery from '@triumph/application/queries/driving-license/filter/search-driving-license-query';
import { PermisStatus } from '@triumph/domain/entity/driving-license';


@Injectable()
export class DrivingLicenseService {
  constructor(
    @Inject('DrivingLicenseRepositoryReader')
    private readonly drivingLicenseRepositoryReader: any,
    @Inject('DrivingLicenseRepositoryWriter')
    private readonly drivingLicenseRepositoryWriter: any
  ) {}
  async list() {
    const listDrivingLicenseUsecase = new GetDrivingLicenseListQueryHandler(
      this.drivingLicenseRepositoryReader
    );
    return listDrivingLicenseUsecase.execute(new GetDrivingLicenseListQuery());
  }

  async getById(id: number) {
    const getDrivingLicenseUsecase = new GetDrivingLicenseQueryHandler(
      this.drivingLicenseRepositoryReader
    );
    return getDrivingLicenseUsecase.execute(new GetDrivingLicenseQuery(id));
  }

  async search(keyword: string) {
    const searchDrivingLicenseUsecase = new SearchDrivingLicenseQueryHandler(
      this.drivingLicenseRepositoryReader
    );
    return searchDrivingLicenseUsecase.execute(
      new SearchDrivingLicenseQuery(keyword)
    );
  }

  async create(data: { date: Date; status: string; country: string }) {
    const validStatuses: PermisStatus[] = ['VALID', 'EXPIRED', 'SUSPENDED'];
    if (!validStatuses.includes(data.status as PermisStatus)) {
      throw new Error(`Invalid status: ${data.status}`);
    }

    const createDrivingLicenseUsecase = new CreateDrivingLicenseCommandHandler(
      this.drivingLicenseRepositoryWriter
    );

    const permisStatus = data.status as PermisStatus;

    return createDrivingLicenseUsecase.execute(
      new CreateDrivingLicenseCommand(data.date, permisStatus, data.country)
    );
  }
}
