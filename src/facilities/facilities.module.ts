import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { FacilitiesRepository } from './facilities.repository';

import { FacilityMap } from '../maps/facility.map';

@Module({
  imports: [
    TypeOrmModule.forFeature([FacilitiesRepository]),
  ],
  controllers: [FacilitiesController],
  providers: [
    FacilityMap,
    FacilitiesService,
  ],
})

export class FacilitiesModule {}
