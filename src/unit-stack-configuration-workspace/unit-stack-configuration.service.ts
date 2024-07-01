import { Injectable } from '@nestjs/common';

import { UnitStackConfigurationMap } from '../maps/unit-stack-configuration.map';
import { UnitStackConfigurationWorkspaceRepository } from './unit-stack-configuration.repository';

@Injectable()
export class UnitStackConfigurationWorkspaceService {
  constructor(
    private readonly repository: UnitStackConfigurationWorkspaceRepository,
    private readonly map: UnitStackConfigurationMap,
  ) {}

  async getUnitStackConfigurationsByFacId(facId: number) {
    const results = await this.repository.find({
      relations: {
        stackPipe: true,
        unit: true,
      },
      where: [{ unit: { facId } }, { stackPipe: { facId } }],
    });
    return this.map.many(results);
  }
}
