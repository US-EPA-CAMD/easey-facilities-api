import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '@us-epa-camd/easey-common/decorators';
import { LookupType } from '@us-epa-camd/easey-common/enums';

import { StackPipeDTO } from '../dtos/stack-pipe.dto';
import { StackPipeWorkspaceService } from './stack-pipe.service';

@Controller()
@ApiSecurity('APIKey')
@ApiTags('Stacks & Pipes')
export class StackPipeWorkspaceController {
  constructor(private readonly service: StackPipeWorkspaceService) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: StackPipeDTO,
    description: 'Retrieves a list of stacks/pipes by facility ID',
  })
  @RoleGuard(
    {
      enforceCheckout: false,
      pathParam: 'facId',
      enforceEvalSubmitCheck: false,
    },
    LookupType.Facility,
  )
  getStackPipesByFacId(@Param('facId') facId: number) {
    return this.service.getStackPipesByFacId(facId);
  }
}
