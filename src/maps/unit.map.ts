import { Injectable } from '@nestjs/common';

import { BaseMap } from './base.map';
import { Unit } from '../entities/unit.entity';
import { UnitDTO } from '../dtos/unit.dto';

@Injectable()
export class UnitMap extends BaseMap<Unit, UnitDTO> {
  public async one(entity: Unit): Promise<UnitDTO> {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
    };
  }
}
