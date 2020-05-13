import { Controller, Get, Post, Body, UseGuards, Request, Delete, Param, NotFoundException } from '@nestjs/common';
import { RequestStatsDto } from './dto/request.dto';
import { AuthGuard } from '@nestjs/passport';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { StatsService } from './stats.service';
import { SitesService } from '../sites/sites.service';
import { v4 as uuid } from 'uuid';

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
   getRandomInt(max) {
    const r =  Math.floor(Math.random() * Math.floor(max));

    if (r ===0) return 1;

    return r;
  }
  @Get('test')
  async test() {

    const trackingId = '5eb5d140d8a72d72322f3f05';

    //for (let m = 1; m < 12; m++) {
      for (let d = 1; d < 30; d++) {
        const m = 3;
        for (let u = 1; u < this.getRandomInt(370); u++) {
          const stat = <RequestStatsDto> {
            location: 'https://site.com/most-popular', // https://site.com/most-popular
            title: 'New 2020 Ringtones ' + d + m, // New 2020 Ringtones for mobile phone
            clientId: uuid(), //
            trackingId: trackingId, //siteId
            viewportSize: '1573x452', //
            language: 'uk-ua', //uk-ua
            hitType: 'pageview', //pageview
            userAgent: 'string', //userAgent
            date: new Date("2020-0"+m+"-"+d)
          }
          console.log(stat);
          await this.statsService.create(stat);
        }
      }
   // }

    return {
      test: new Date()
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

  @Get(':siteId/users')
  @UseGuards(AuthGuard())
  async getUsersByTime(@Request() req, @Param('siteId', new ValidateObjectId()) siteId) {
    const site = await this.sitesService.getIdByUser(req.user._id, siteId);
    if (!site) {
      throw new NotFoundException('site does not exist!');
    }
    const dataEnd = new Date();
    dataEnd.setDate(dataEnd.getDate() - 60);

    return await this.statsService.getUsersByTime(siteId, new Date(), dataEnd);
  }
}
