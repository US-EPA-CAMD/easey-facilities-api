import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UnitStackConfigurationMap } from '../maps/unit-stack-configuration.map';
import { UnitStackConfigurationWorkspaceController } from './unit-stack-configuration.controller';
import { UnitStackConfigurationWorkspaceRepository } from './unit-stack-configuration.repository';
import { UnitStackConfigurationWorkspaceService } from './unit-stack-configuration.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UnitStackConfigurationWorkspaceRepository]),
    HttpModule,
  ],
  controllers: [UnitStackConfigurationWorkspaceController],
  providers: [
    UnitStackConfigurationMap,
    UnitStackConfigurationWorkspaceRepository,
    UnitStackConfigurationWorkspaceService,
  ],
  exports: [
    TypeOrmModule,
    UnitStackConfigurationMap,
    UnitStackConfigurationWorkspaceRepository,
    UnitStackConfigurationWorkspaceService,
  ],
})
export class UnitStackConfigurationWorkspaceModule {}
