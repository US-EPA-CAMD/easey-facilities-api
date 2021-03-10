import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import routes from './routes';
import dbConfig from './config/db.config';
import appConfig from './config/app.config';
import { TypeOrmConfigService } from './config/typeorm.config';

import { FacilitiesModule } from './facilities/facilities.module';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        dbConfig,
        appConfig,
      ],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    FacilitiesModule,
  ],
})
export class AppModule {}
