import { Injectable } from '@nestjs/common';
import { Unit } from '@us-epa-camd/easey-common/entities';
import { Unit as UnitWorkspace } from '@us-epa-camd/easey-common/entities/workspace';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { UnitDTO } from '../dtos/unit.dto';

@Injectable()
export class UnitMap extends BaseMap<Unit | UnitWorkspace, UnitDTO> {
  public async one(entity: Unit | UnitWorkspace): Promise<UnitDTO> {
    return {
      id: entity.id,
      unitId: entity.name,
      facilityId: entity.facId,
    };
  }
}
