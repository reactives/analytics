import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSiteDto } from './dto/create-site.dto';
import { Site } from './site.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class SitesService {

  constructor(@InjectModel('Site') private siteModel: Model<Site>,
    private userService: UsersService
  ) {}

  async create(userId: string, createSiteDto: CreateSiteDto) {
    let createdSite = new this.siteModel(createSiteDto);
    return await createdSite.save();
  }

  async findOneById(_id: string): Model<Site> {
    return await this.siteModel.all({_id: _id});
  }

  async findAllByUserId(userId: string): Model<Site> {
    return await this.siteModel.find({userId: userId});
  }

  async deleteSite(siteId): Promise<any> {
    return await this.siteModel
      .findByIdAndDelete(siteId);
  }

  async getIdByUser(_id: string, siteId: string): Model<Site> {
    return await this.siteModel.findOne({userId: _id, _id:siteId });
  }
}
