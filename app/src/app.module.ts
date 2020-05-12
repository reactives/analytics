import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SitesModule } from './sites/sites.module';
import { StatsModule } from './stats/stats.module';

const mongoUri = 'mongodb://root:example@localhost/analytics?authSource=admin';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    SitesModule,
    StatsModule,
    MongooseModule.forRoot(mongoUri)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
