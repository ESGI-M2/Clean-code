import { Injectable, Inject } from '@nestjs/common';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/reader/occupation-repository-reader';
import OccupationRepositoryWriter from '@triumph/application/ports/repositories/writer/occupation-repository-writer';
import CreateOccupationCommand from '@triumph/application/queries/occupation/add/create-occupation-command';
import {Occupation} from '@triumph/domain/entity/occupation'; 

@Injectable()
export class OccupationService {
  constructor(
    @Inject('OccupationRepositoryReader') 
    private readonly occupationRepositoryReader: OccupationRepositoryReader,

    @Inject('OccupationRepositoryWriter')
    private readonly occupationRepositoryWriter: OccupationRepositoryWriter,
  ) {}

  async getList() {
    return await this.occupationRepositoryReader.list();
  }

  async getById(id: number) {
    return await this.occupationRepositoryReader.getById(id);
  }

  async search(keyword: string) {
    return await this.occupationRepositoryReader.search(keyword);
  }

  async create(name: string) {
    const command = new CreateOccupationCommand(name);
    
    const occupation: Occupation = {
      id: 0,
      name: command.name,
    };
    
    return await this.occupationRepositoryWriter.add(occupation);
  }
}
