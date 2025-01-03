import { Injectable } from '@nestjs/common';
import BikeModelRepositoryReader from '@triumph/application/ports/repositories/reader/bike-model-repository-reader';
import BikeModelRepositoryWriter from '@triumph/application/ports/repositories/writer/bike-model-repository-writer';
import CreateBikeModelCommandHandler from '@triumph/application/queries/bike-model/add/create-bike-model-handler';
import CreateBikeModelCommand from '@triumph/application/queries/bike-model/add/create-bike-model-command';
import GetBikeModelListQuery from '@triumph/application/queries/bike-model/get/get-bike-model-list-query';
import GetBikeModelQuery from '@triumph/application/queries/bike-model/get/get-bike-model-query';
import SearchBikeModelQuery from '@triumph/application/queries/bike-model/filter/search-bike-model-query';
import GetBikeModelListQueryHandler from '@triumph/application/queries/bike-model/get/get-bike-model-list-query-handler';
import GetBikeModelQueryHandler from '@triumph/application/queries/bike-model/get/get-bike-model-query-handler';
import SearchBikeModelQueryHandler from '@triumph/application/queries/bike-model/filter/search-bike-model-query-handler';

@Injectable()
export class BikeModelService {
  private createBikeModelCommandHandler: CreateBikeModelCommandHandler;
  private getBikeModelListQueryHandler: GetBikeModelListQueryHandler;
  private getBikeModelQueryHandler: GetBikeModelQueryHandler;
  private searchBikeModelQueryHandler: SearchBikeModelQueryHandler;

  constructor(
    private readonly bikeModelRepositoryReader: BikeModelRepositoryReader,
    private readonly bikeModelRepositoryWriter: BikeModelRepositoryWriter,
  ) {
    this.createBikeModelCommandHandler = new CreateBikeModelCommandHandler(this.bikeModelRepositoryWriter);
    this.getBikeModelListQueryHandler = new GetBikeModelListQueryHandler(this.bikeModelRepositoryReader);
    this.getBikeModelQueryHandler = new GetBikeModelQueryHandler(this.bikeModelRepositoryReader);
    this.searchBikeModelQueryHandler = new SearchBikeModelQueryHandler(this.bikeModelRepositoryReader);
  }

  async getList() {
    const query = new GetBikeModelListQuery();
    return await this.getBikeModelListQueryHandler.execute(query);
  }

  async getById(id: number) {
    const query = new GetBikeModelQuery(id);
    return await this.getBikeModelQueryHandler.execute(query);
  }

  async search(keyword: string) {
    const query = new SearchBikeModelQuery(keyword);
    return await this.searchBikeModelQueryHandler.execute(query);
  }

  async create(name: string) {
    const command = new CreateBikeModelCommand(name);
    return await this.createBikeModelCommandHandler.execute(command);
  }
}
