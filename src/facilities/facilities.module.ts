import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { FacilitiesRepository } from './facilities.repository';
import { FacilityMap } from '../maps/facility.map';
import { ProgramYearDimRepository } from './program-year-dim.repository';
import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';
import { FacilityAttributesMap } from '../maps/facility-attributes.map';
import { FacilityUnitAttributesRepository } from './facility-unit-attributes.repository';
import { Logger, LoggerModule } from '@us-epa-camd/easey-common/logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FacilitiesRepository,
      ProgramYearDimRepository,
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
