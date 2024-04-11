import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilitiesRepository } from '../facilities/facilities.repository';
import { FacilityUnitAttributesRepository } from '../facilities/facility-unit-attributes.repository';
import { UnitFactRepository } from '../facilities/unit-fact.repository';
import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';
import { FacilityAttributesMap } from '../maps/facility-attributes.map';
import { FacilityMap } from '../maps/facility.map';
import { FacilitiesWorkspaceController } from './facilities.controller';
import { FacilitiesWorkspaceService } from './facilities.service';

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
    ApplicableFacilityAttributesMap,
    FacilitiesRepository,
    FacilitiesWorkspaceService,
    FacilityAttributesMap,
    FacilityMap,
    FacilityUnitAttributesRepository,
    UnitFactRepository,
  ],
})
export class FacilitiesWorkspaceModule {}
