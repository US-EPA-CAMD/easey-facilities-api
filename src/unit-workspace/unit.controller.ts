import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { RoleGuard } from '@us-epa-camd/easey-common/decorators';
import { LookupType } from '@us-epa-camd/easey-common/enums';

import { UnitDTO } from '../dtos/unit.dto';
import { UnitWorkspaceService } from './unit.service';
import { ApiExcludeControllerByEnv } from '../decorators/swagger-decorator';
import { ArrayResponse } from '@us-epa-camd/easey-common/interfaces/common.interface';

@Controller()
@ApiSecurity('APIKey')
@ApiTags('Units')
@ApiExcludeControllerByEnv()
@ApiExtraModels(UnitDTO)
export class UnitWorkspaceController {
  constructor(private readonly service: UnitWorkspaceService) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieves a list of units by facility oris code',
    content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(UnitDTO) },
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
  async getUnitsByOrisCode(@Param('orisCode') orisCode: number): Promise<ArrayResponse<UnitDTO>> {
    const unitsFacilityOrisCode = await this.service.getUnitsByOrisCode(orisCode);
    return {
      items: unitsFacilityOrisCode
    }
  }
}
