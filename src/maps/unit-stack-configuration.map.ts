import { Injectable } from '@nestjs/common';
import { UnitStackConfiguration } from '@us-epa-camd/easey-common/entities';
import { UnitStackConfiguration as UnitStackConfigurationWorkspace } from '@us-epa-camd/easey-common/entities/workspace';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { UnitStackConfigurationDTO } from '../dtos/unit-stack-configuration.dto';

@Injectable()
export class UnitStackConfigurationMap extends BaseMap<
  UnitStackConfiguration | UnitStackConfigurationWorkspace,
  UnitStackConfigurationDTO
> {
  public async one(
    entity: UnitStackConfiguration | UnitStackConfigurationWorkspace,
  ): Promise<UnitStackConfigurationDTO> {
    return {
      id: entity.id,
      unitId: entity.unit ? entity.unit.name : null,
      stackPipeId: entity.stackPipe ? entity.stackPipe.name : null,
      beginDate: entity.beginDate,
      endDate: entity.endDate,
    };
  }
}
