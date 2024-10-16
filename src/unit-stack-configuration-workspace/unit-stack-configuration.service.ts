import { Injectable } from '@nestjs/common';

import { UnitStackConfigurationMap } from '../maps/unit-stack-configuration.map';
import { UnitStackConfigurationWorkspaceRepository } from './unit-stack-configuration.repository';

@Injectable()
export class UnitStackConfigurationWorkspaceService {
  constructor(
    private readonly repository: UnitStackConfigurationWorkspaceRepository,
    private readonly map: UnitStackConfigurationMap,
  ) {}

  async getUnitStackConfigurationsByOrisCode(orisCode: number) {
    const results = await this.repository.find({
      relations: {
        stackPipe: true,
        unit: true,
      },
      where: [
        { unit: { plant: { facilityId: orisCode } } },
        { stackPipe: { plant: { facilityId: orisCode } } },
      ],
    });
    return this.map.many(results);
  }
}
