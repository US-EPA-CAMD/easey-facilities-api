import { Injectable } from '@nestjs/common';
import { StackPipe } from '@us-epa-camd/easey-common/entities';
import { StackPipe as StackPipeWorkspace } from '@us-epa-camd/easey-common/entities/workspace';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { StackPipeDTO } from '../dtos/stack-pipe.dto';

@Injectable()
export class StackPipeMap extends BaseMap<
  StackPipe | StackPipeWorkspace,
  StackPipeDTO
> {
  public async one(
    entity: StackPipe | StackPipeWorkspace,
  ): Promise<StackPipeDTO> {
    return {
      id: entity.id,
      activeDate: entity.activeDate,
      facilityId: entity.facId,
      stackPipeId: entity.name,
      retireDate: entity.retireDate,
    };
  }
}
