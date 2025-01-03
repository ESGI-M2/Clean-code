import { Injectable, Inject } from '@nestjs/common';
import VisitRepositoryWriter from '@triumph/application/ports/repositories/writer/visit-repository-writer';
import VisitRepositoryReader from '@triumph/application/ports/repositories/reader/visit-repository-reader';
import BikeRepositoryReader from '@triumph/application/ports/repositories/reader/bike-repository-reader';

import CreateVisitCommandHandler from '@triumph/application/queries/visit/add/create-visit-handler';
import CreateVisitCommand from '@triumph/application/queries/visit/add/create-visit-command';
import SearchVisitQueryHandler from '@triumph/application/queries/visit/filter/search-visit-query-handler';
import SearchVisitQuery from '@triumph/application/queries/visit/filter/search-visit-query';

@Injectable()
export class VisitService {
  constructor(
    @Inject('VisitRepositoryWriter') private readonly visitRepositoryWriter: VisitRepositoryWriter,
    @Inject('VisitRepositoryReader') private readonly visitRepositoryReader: VisitRepositoryReader,
    @Inject('BikeRepositoryReader') private readonly bikeRepositoryReader: BikeRepositoryReader,
  ) {}

  async createVisit(bikeModelId: number, visitDate: Date, price: number, recapitulation: string) {
    const createVisitCommandHandler = new CreateVisitCommandHandler(
      this.visitRepositoryWriter,
      this.bikeRepositoryReader 
    );

    return await createVisitCommandHandler.execute(new CreateVisitCommand(bikeModelId, visitDate, price, recapitulation));
  }

  async getVisitList() {
    return this.visitRepositoryReader.list(); 
  }

  async getVisitById(id: number) {
    return this.visitRepositoryReader.getById(id);
  }

  async searchVisits(keyword: string) {
    const searchVisitQueryHandler = new SearchVisitQueryHandler(this.visitRepositoryReader);
    return await searchVisitQueryHandler.execute(new SearchVisitQuery(keyword));
  }
}
