import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { UnitsRepository } from './units.repository';

import { UnitMap } from '../maps/unit.map';

@Module({
  imports: [
    TypeOrmModule.forFeature([UnitsRepository]),
  ],
  controllers: [UnitsController],
  providers: [
    UnitMap,
    UnitsService,
  ],
})

export class UnitsModule {}
