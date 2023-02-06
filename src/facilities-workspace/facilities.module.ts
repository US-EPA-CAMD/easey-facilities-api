import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilitiesRepository } from '../facilities/facilities.repository';
import { FacilityMap } from '../maps/facility.map';
import { UnitFactRepository } from '../facilities/unit-fact.repository';
import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';
import { FacilityAttributesMap } from '../maps/facility-attributes.map';
import { FacilityUnitAttributesRepository } from '../facilities/facility-unit-attributes.repository';
import { FacilitiesWorkspaceController } from './facilities.controller';
import { FacilitiesWorkspaceService } from './facilities.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      UnitFactRepository,
      FacilitiesRepository,
      FacilityUnitAttributesRepository,
    ]),
  ],
  controllers: [FacilitiesWorkspaceController],
  providers: [
    FacilityMap,
    FacilitiesWorkspaceService,
    ApplicableFacilityAttributesMap,
    FacilityAttributesMap,
  ],
})
export class FacilitiesWorkspaceModule {}
