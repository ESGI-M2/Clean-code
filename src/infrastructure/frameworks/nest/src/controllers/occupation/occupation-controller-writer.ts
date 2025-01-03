import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { OccupationService } from '../../modules/occupation/occupation-services';

@Controller('occupations')
export class OccupationControllerWriter {
  constructor(private readonly occupationService: OccupationService) {}

  @Post()
  async create(@Body() body: { name: string }, @Res() res: Response): Promise<Response> {
    const { name } = body;
    const occupation = await this.occupationService.create(name);
    return res.status(201).json(occupation);
  }
}
