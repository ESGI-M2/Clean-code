import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import  BikeService from '../../modules/bike/bike-services';
import { Bike } from '@triumph/domain/entity/bike';

@Controller('bikes')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @Post()
  async create(@Body() bike: Bike, @Res() res: Response): Promise<Response> {
    try {
      const createdBike = await this.bikeService.createBike(bike);
      return res.status(201).json(createdBike);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }

  @Get()
  async getList(@Res() res: Response): Promise<Response> {
    try {
      const bikes = await this.bikeService.getBikeList();
      return res.status(200).json(bikes);
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
      const bike = await this.bikeService.getBikeById(numericId);
      if (!bike) {
        return res.status(404).json({ message: 'Bike not found' });
      }
      return res.status(200).json(bike);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }

  @Get('search/:keyword')
  async search(@Param('keyword') keyword: string, @Res() res: Response): Promise<Response> {
    try {
      const bikes = await this.bikeService.searchBike(keyword);
      return res.status(200).json(bikes);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }
}
