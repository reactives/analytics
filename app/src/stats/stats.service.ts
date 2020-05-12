import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Stats } from './stats.interface';
import { RequestStatsDto } from './dto/request.dto';

@Injectable()
export class StatsService {

  constructor(@InjectModel('Stats') private statsModel: Model<Stats>) {}

  async create(requestStatsDto: RequestStatsDto) {
    let createdStats = new this.statsModel(requestStatsDto);
    return await createdStats.save();
  }

  async get(siteId: string) {
    return await this.statsModel.find({trackingId: siteId});
  }
}
