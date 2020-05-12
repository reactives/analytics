import { Controller, Get, Post, Body, UseGuards, Request, Delete, Param, NotFoundException } from '@nestjs/common';
 import { CreateSiteDto } from './dto/create-site.dto';
import { AuthGuard } from '@nestjs/passport';
import { SitesService } from './sites.service';
import { RequestDto } from './dto/request.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('sites')
@UseGuards(AuthGuard())
export class SiteController {

  constructor(private sitesService: SitesService) {}

  @Get()
  async getAll(@Request() req) {
    return await this.sitesService.findAllByUserId(req.user._id);
  }

  @Post()
  async create(@Request() req, @Body() requestDto: RequestDto) {
      const createSiteDto: CreateSiteDto = {
          host: requestDto.host,
          siteName: requestDto.siteName,
          userId: req.user._id
      };
    return await this.sitesService.create(req.user._id, createSiteDto);
  }

  @Delete(':siteId')
  async delete(@Request() req, @Param('siteId', new ValidateObjectId()) siteId) {
    const site = await this.sitesService.getIdByUser(req.user._id, siteId);
    if (!site) {
      throw new NotFoundException('Post does not exist!');
    }

    return await this.sitesService.deleteSite(site._id);
  }

  @Get(':siteId')
  async get(@Request() req, @Param('siteId', new ValidateObjectId()) siteId) {
    const site = await this.sitesService.getIdByUser(req.user._id, siteId);
    if (!site) {
      throw new NotFoundException('Post does not exist!');
    }

    return site;
  }
}
