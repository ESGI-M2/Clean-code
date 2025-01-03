import { Controller, Get, Param, Post, Body, Res } from '@nestjs/common';
import { OccupationService } from '../../modules/occupation/occupation-services';
import { Response } from 'express';

@Controller('occupations')
export class OccupationController {
  constructor(private readonly occupationService: OccupationService) {}

  @Get()
  async getList(@Res() res: Response): Promise<Response> {
    try {
      const occupations = await this.occupationService.getList();
      return res.status(200).json(occupations);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    try {
      const occupation = await this.occupationService.getById(numericId);
      if (!occupation) {
        return res.status(404).json({ message: 'Occupation not found' });
      }
      return res.status(200).json(occupation);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }

  @Get('search/:keyword')
  async search(@Param('keyword') keyword: string, @Res() res: Response): Promise<Response> {
    try {
      const occupations = await this.occupationService.search(keyword);
      return res.status(200).json(occupations);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }

  @Post()
  async create(@Body() body: { name: string }, @Res() res: Response): Promise<Response> {
    const { name } = body;
    try {
      const occupation = await this.occupationService.create(name);
      return res.status(201).json(occupation);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }
}
