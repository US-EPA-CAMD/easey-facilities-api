import { Injectable } from '@nestjs/common';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { UnitStackConfigurationDTO } from '../dtos/unit-stack-configuration.dto';
import { UnitStackConfiguration } from '../entities/unit-stack-configuration.entity';
import { UnitStackConfiguration as UnitStackConfigurationWorkspace } from '../entities/workspace/unit-stack-configuration.entity';

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
