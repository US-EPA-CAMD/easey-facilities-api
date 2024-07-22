import { Injectable } from '@nestjs/common';

import { UnitMap } from '../maps/unit.map';
import { UnitWorkspaceRepository } from './unit.repository';

@Injectable()
export class UnitWorkspaceService {
  constructor(
    private readonly repository: UnitWorkspaceRepository,
    private readonly map: UnitMap,
  ) {}

  async getUnitsByFacId(facId: number) {
    const results = await this.repository.find({
      where: { facId },
      relations: {
        location: {
          methods: true,
          plans: true,
        },
        opStatuses: true,
      },
    });
    return this.map.many(results);
  }
}
