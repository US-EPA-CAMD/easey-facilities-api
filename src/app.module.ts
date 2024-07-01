import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '@us-epa-camd/easey-common/config';
import { CorsOptionsModule } from '@us-epa-camd/easey-common/cors-options';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { RouterModule } from 'nest-router';

import appConfig from './config/app.config';
import { TypeOrmConfigService } from './config/typeorm.config';
import { FacilitiesWorkspaceModule } from './facilities-workspace/facilities.module';
import { FacilitiesModule } from './facilities/facilities.module';
import routes from './routes';
import { StackPipeWorkspaceModule } from './stack-pipe-workspace/stack-pipe.module';
import { UnitStackConfigurationWorkspaceModule } from './unit-stack-configuration-workspace/unit-stack-configuration.module';
import { UnitWorkspaceModule } from './unit-workspace/unit.module';
import {
  IsControlTechnologyValidator,
  IsProgramValidator,
  IsSourceCategoryValidator,
  IsStateCodeValidator,
  IsUnitFuelTypeValidator,
  IsUnitTypeValidator,
} from './validators';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    HttpModule,
    LoggerModule,
    CorsOptionsModule,
    FacilitiesModule,
    FacilitiesWorkspaceModule,
    UnitWorkspaceModule,
    StackPipeWorkspaceModule,
    UnitStackConfigurationWorkspaceModule,
  ],
  providers: [
    IsControlTechnologyValidator,
    IsProgramValidator,
    IsSourceCategoryValidator,
    IsStateCodeValidator,
    IsUnitFuelTypeValidator,
    IsUnitTypeValidator,
  ],
})
export class AppModule {}
