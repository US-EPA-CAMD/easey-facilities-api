import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { FacilitiesRepository } from './facilities.repository';

import { FacilityMap } from '../maps/facility.map';
import { ProgramYearDimRepository } from './program-year-dim.repository';
import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';

@Module({
  imports: [
    TypeOrmModule.forFeature([FacilitiesRepository, ProgramYearDimRepository]),
  ],
  controllers: [FacilitiesController],
  providers: [
    FacilityMap,
    FacilitiesService,
    ApplicableFacilityAttributesMap
  ],
})

export class FacilitiesModule {}
