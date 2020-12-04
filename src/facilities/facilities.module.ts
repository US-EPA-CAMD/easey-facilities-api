import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { FacilitiesRepository } from './facilities.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FacilitiesRepository]),
  ],
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
})

export class FacilitiesModule {}
