import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { VisitService } from '../../modules/visit/visit-services';

@Controller('visits')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  async createVisit(@Body() body: { bikeModelId: number, visitDate: Date, price: number, recapitulation: string }) {
    const { bikeModelId, visitDate, price, recapitulation } = body;
    const visit = await this.visitService.createVisit(bikeModelId, visitDate, price, recapitulation);
    return visit;
  }

  @Get()
  async listVisits() {
    const visits = await this.visitService.getVisitList();
    return visits;
  }

  @Get(':id')
  async getVisitById(@Param('id') id: number) {
    const visit = await this.visitService.getVisitById(id);
    if (!visit) {
      throw new Error('Visit not found');
    }
    return visit;
  }

  @Get('search')
  async searchVisits(@Query('keyword') keyword: string) {
    const visits = await this.visitService.searchVisits(keyword);
    return visits;
  }
}
