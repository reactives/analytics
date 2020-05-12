import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { SiteController } from './site.controller';
import { SitesService } from './sites.service';
import { SiteSchema } from './site.schema';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{name: 'Site', schema: SiteSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  exports: [SitesService],
  controllers: [SiteController],
  providers: [SitesService]
})
export class SitesModule {}
