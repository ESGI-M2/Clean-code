import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { GuaranteeService } from '../../modules/guarantee/guarantee-services';

@Controller('guaranties')
export class GuaranteeWriterController {
  constructor(private readonly guaranteeService: GuaranteeService) {}

  @Post()
  async create(@Body() body: { visitId: number, startDate: Date, endDate: Date, type: string }, @Res() res: Response): Promise<Response> {
    const { visitId, startDate, endDate, type } = body;

    try {
      const guarantee = await this.guaranteeService.createGuarantee({ visitId, startDate, endDate, type });
      return res.status(201).json(guarantee);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la création de la garantie', error });
    }
  }
}
