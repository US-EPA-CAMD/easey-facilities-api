import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';
import { FacilityAttributesMap } from '../maps/facility-attributes.map';
import { FacilityMap } from '../maps/facility.map';
import { FacilitiesController } from './facilities.controller';
import { FacilitiesRepository } from './facilities.repository';
import { FacilitiesService } from './facilities.service';
import { FacilityUnitAttributesRepository } from './facility-unit-attributes.repository';
import { UnitFactRepository } from './unit-fact.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UnitFactRepository,
      FacilitiesRepository,
      FacilityUnitAttributesRepository,
    ]),
  ],
  controllers: [FacilitiesController],
  providers: [
    ApplicableFacilityAttributesMap,
    FacilityAttributesMap,
    FacilityMap,
    FacilityUnitAttributesRepository,
    FacilitiesRepository,
    FacilitiesService,
    UnitFactRepository,
  ],
})
export class FacilitiesModule {}
