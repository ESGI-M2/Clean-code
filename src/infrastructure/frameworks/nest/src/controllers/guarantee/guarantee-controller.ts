import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { GuaranteeService } from '../../modules/guarantee/guarantee-services';

@Controller('guaranties')
export class GuaranteeReaderController {
  constructor(private readonly guaranteeService: GuaranteeService) {}

  @Get()
  async list(@Res() res: Response): Promise<Response> {
    const guarantees = await this.guaranteeService.listGuarantees();
    return res.status(200).json(guarantees);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const guarantee = await this.guaranteeService.getGuaranteeById(numericId);
    if (!guarantee) {
      return res.status(404).json({ message: 'Guarantee not found' });
    }

    return res.status(200).json(guarantee);
  }

  @Get('search/:keyword')
  async search(@Param('keyword') keyword: string, @Res() res: Response): Promise<Response> {
    const guarantees = await this.guaranteeService.searchGuarantees(keyword);
    return res.status(200).json(guarantees);
  }
}
