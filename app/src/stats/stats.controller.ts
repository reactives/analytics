import { Controller, Get, Post, Body, UseGuards, Request, Delete, Param, NotFoundException } from '@nestjs/common';
import { RequestStatsDto } from './dto/request.dto';
import { AuthGuard } from '@nestjs/passport';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { StatsService } from './stats.service';
import { SitesService } from '../sites/sites.service';

@Controller('api')
export class StatsController {

  constructor(
    private statsService: StatsService,
    private sitesService: SitesService
  ) {
  }

  @Get()
  //@UseGuards(AuthGuard())
  async getAll(@Request() req) {
    //return await this.sitesService.findAllByUserId(req.user._id);
  }

  /**
   * API analytics
   * @param req
   * @param requestStatsDto
   */
  @Post()
  async create(@Request() req, @Body() requestStatsDto: RequestStatsDto) {
    const result = await this.statsService.create(requestStatsDto);
    console.log(result);
    return [];
  }

  @Get('test')
  async test() {

    for (let i = 0; i < 100; i++) {
      const stat = <RequestStatsDto> {
        location: 'https://site.com/most-popular', // https://site.com/most-popular
        title: 'New 2020 Ringtones ' + i, // New 2020 Ringtones for mobile phone
        clientId: '216466132.1583342561', //
        trackingId: '5eb708c392a25116bff4a30f', //siteId
        viewportSize: '1573x452', //
        language: 'uk-ua', //uk-ua
        hitType: 'pageview', //pageview
        userAgent: 'string', //userAgent
        date: new Date('Wed Mar 25 2015 0' + i +':00:00 GMT+0200')
      }
      await this.statsService.create(stat);
    }

    return {
      test: 11
    };
  }

  @Get(':siteId')
  @UseGuards(AuthGuard())
  async getStatsUser(@Request() req, @Param('siteId', new ValidateObjectId()) siteId) {
    const site = await this.sitesService.getIdByUser(req.user._id, siteId);
    if (!site) {
      throw new NotFoundException('site does not exist!');
    }
    return await this.statsService.get(siteId);
  }
}
