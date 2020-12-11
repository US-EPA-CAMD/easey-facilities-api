import { FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UnitDTO } from '../dtos/unit.dto';
import { UnitsRepository } from './units.repository';
import { UnitMap } from '../maps/unit.map';

@Injectable()
export class UnitsService {
  constructor(@InjectRepository(UnitsRepository)
    private repository: UnitsRepository,
    private map: UnitMap,    
  ) {}

  async getUnits(facId: number): Promise<UnitDTO[]> {
    const findOpts: FindManyOptions = {
      select: [ "id", "facId", "name", "description", "commissionOpDate" ],
      where: { facId: facId }
    }
    const [results, totalCount] = await this.repository.findAndCount(findOpts);
    return this.map.many(results);
  }
}
