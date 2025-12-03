import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { RoleGuard } from '@us-epa-camd/easey-common/decorators';
import { LookupType } from '@us-epa-camd/easey-common/enums';

import { StackPipeDTO } from '../dtos/stack-pipe.dto';
import { StackPipeWorkspaceService } from './stack-pipe.service';
import { ApiExcludeControllerByEnv } from '../decorators/swagger-decorator';
import { ArrayResponse } from '@us-epa-camd/easey-common/interfaces/common.interface';

@Controller()
@ApiSecurity('APIKey')
@ApiTags('Stacks & Pipes')
@ApiExcludeControllerByEnv()
@ApiExtraModels(StackPipeDTO)
export class StackPipeWorkspaceController {
  constructor(private readonly service: StackPipeWorkspaceService) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieves a list of stacks/pipes by oris code',
    content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(StackPipeDTO) },
              },
            },
          },
        },
      }
  })
  @RoleGuard(
    {
      enforceCheckout: false,
      pathParam: 'orisCode',
      enforceEvalSubmitCheck: false,
    },
    LookupType.Facility,
  )
  async getStackPipesByOrisCode(@Param('orisCode') orisCode: number):Promise<ArrayResponse<StackPipeDTO>> {
    const list = await this.service.getStackPipesByOrisCode(orisCode);
    return {
      items:list
    }
  }
}
