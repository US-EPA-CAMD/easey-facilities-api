import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { FacilitiesRepository } from './facilities.repository';
import { FacilityMap } from '../maps/facility.map';
import { UnitFactRepository } from './unit-fact.repository';
import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';
import { FacilityAttributesMap } from '../maps/facility-attributes.map';
import { FacilityUnitAttributesRepository } from './facility-unit-attributes.repository';

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
    FacilityMap,
    FacilitiesService,
    ApplicableFacilityAttributesMap,
    FacilityAttributesMap,
  ],
})
export class FacilitiesModule {}
