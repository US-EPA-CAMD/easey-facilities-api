import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { FacilityRepository } from './facilities.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FacilityRepository]),
  ],
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
})

export class FacilitiesModule {}
