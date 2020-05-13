import {Controller, Get, Res, Next, Req} from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { Response, NextFunction, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/stats.js')
  getStatsJs(
      @Res() res: Response,
      @Next() next: NextFunction,
      @Req() req: Request,
  ): any {
    res.sendFile(join(process.cwd(), '/src/stats.js'));
  }
}
