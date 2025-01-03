import { Injectable, Inject } from '@nestjs/common';
import GuaranteeRepositoryWriter from '@triumph/application/ports/repositories/writer/guarantee-repository-writer';
import GuaranteeRepositoryReader from '@triumph/application/ports/repositories/reader/guarantee-repository-reader';
import VisitRepositoryReader from '@triumph/application/ports/repositories/reader/visit-repository-reader';
import { Guarantee } from '@triumph/domain/entity/guarantee';
import { Visit } from '@triumph/domain/entity/visit';

@Injectable()
export class GuaranteeService {
  constructor(
    @Inject('GuaranteeRepositoryWriter') private readonly guaranteeRepositoryWriter: GuaranteeRepositoryWriter,
    @Inject('GuaranteeRepositoryReader') private readonly guaranteeRepositoryReader: GuaranteeRepositoryReader,
    @Inject('VisitRepositoryReader') private readonly visitRepositoryReader: VisitRepositoryReader,
  ) {}

  async createGuarantee({
    visitId,
    startDate,
    endDate,
    type,
  }: {
    visitId: number;
    startDate: Date;
    endDate: Date;
    type: string;
  }): Promise<Guarantee> {
    const visit: Visit | null = await this.visitRepositoryReader.getById(visitId);
    if (!visit) {
      throw new Error(`Visit with ID ${visitId} not found.`);
    }

    const guarantee = new Guarantee(0, visit, startDate, endDate, type);
    return this.guaranteeRepositoryWriter.add(guarantee);
  }

  async listGuarantees(): Promise<Guarantee[]> {
    return this.guaranteeRepositoryReader.list();
  }

  async getGuaranteeById(id: number): Promise<Guarantee | null> {
    return this.guaranteeRepositoryReader.getById(id);
  }

  async searchGuarantees(keyword: string): Promise<Guarantee[]> {
    return this.guaranteeRepositoryReader.search(keyword);
  }
  
}
