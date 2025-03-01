import DealerDTO from '../../../interfaces/dtos/dealer.dto';
import DealerDTOMapper from '../../../interfaces/mappers/dealer.dto-mapper';
import DealerRepositoryReader from '../../../ports/repositories/readers/dealer.repository-reader';
import ListDealersQuery from './list-dealers.query';
import ListDealersUseCase from './list-dealers.usecase';

export default class ListDealersQueryHandler implements ListDealersUseCase {
  constructor(private readonly dealerRepositoryReader: DealerRepositoryReader) {}

  async execute(query: ListDealersQuery): Promise<DealerDTO[]> {
    const dealers = await this.dealerRepositoryReader.list();

    return dealers.map(DealerDTOMapper.toDTO);
  }
}
