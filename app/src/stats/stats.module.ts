import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { StatSchema } from './stats.schema';
import { UsersModule } from '../users/users.module';
import { SitesService } from '../sites/sites.service';
import { SitesModule } from '../sites/sites.module';


@Module({
  imports: [
    SitesModule,
    MongooseModule.forFeature([{name: 'Stats', schema: StatSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  exports: [StatsService],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
