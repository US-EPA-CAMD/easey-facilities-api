import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import dbConfig from './config/db.config'
import appConfig from './config/app.config'
import { TypeOrmConfigService } from './config/typeorm.config';

import { FacilitiesModule } from './facilities/facilities.module';

@Module({
  imports: [
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
