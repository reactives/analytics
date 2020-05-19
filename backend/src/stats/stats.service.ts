import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { Stats } from './stats.interface';
import { RequestStatsDto } from './dto/request.dto';
const ObjectId = require('mongoose').Types.ObjectId;
import { Logger } from '@nestjs/common';

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

  async getUsersByTime(siteId: string, dataStart: Date, dataEnd: Date) {
      const res = await this.statsModel.aggregate([
      { $match: {
          'trackingId': new ObjectId(siteId),
          'date': { $lt: dataStart, $gte: dataEnd }
      }
          },
          { $group: {'_id': {
            'year': { '$year': "$date" },
            'month': { '$month': "$date" },
            'day': { '$dayOfMonth': "$date" }
          },
          users: { $sum: 1 }
        }},
        { $sort: {_id: 1} },
    ]);

      Logger.log({siteId, dataStart, dataEnd});

      return res;
  }

 async getUsersByPage(siteId: string) {
        const res = await this.statsModel.aggregate([
            { $match: {
                    'trackingId': new ObjectId(siteId),
                    //'date': { $lt: dataStart, $gte: dataEnd }
                }
            },
            { $group: {'_id': {
                        'year': { '$year': "$date" },
                        'month': { '$month': "$date" },
                        'day': { '$dayOfMonth': "$date" }
                    },
                    users: { $sum: 1 }
                }},
            { $sort: {_id: 1} },
        ]);

        return res;
    }

    async getPieUsers(siteId: string) {
        const all = await this.statsModel.aggregate([
            { $match: {
                    'trackingId': new ObjectId(siteId),
                }
            },{
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ]);

        const unique = await this.statsModel.aggregate([
            { $match: {
                    'trackingId': new ObjectId(siteId),
                }
            },{
                $group: {
                    _id: 'clientId',
                    count: { $sum: 1 }
                }
            }
        ]);

        return {
            all: all,
            unique: unique
        }
    }
}
