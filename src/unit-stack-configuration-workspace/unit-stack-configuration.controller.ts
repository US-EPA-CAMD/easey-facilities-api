import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '@us-epa-camd/easey-common/decorators';
import { LookupType } from '@us-epa-camd/easey-common/enums';

import { UnitStackConfigurationDTO } from '../dtos/unit-stack-configuration.dto';
import { UnitStackConfigurationWorkspaceService } from './unit-stack-configuration.service';
import { ApiExcludeControllerByEnv } from '../decorators/swagger-decorator';
import { ArrayResponse } from '@us-epa-camd/easey-common/interfaces/common.interface';

@Controller()
@ApiSecurity('APIKey')
@ApiTags('Unit Stack Configurations')
@ApiExcludeControllerByEnv()
export class UnitStackConfigurationWorkspaceController {
  constructor(
    private readonly service: UnitStackConfigurationWorkspaceService,
  ) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: UnitStackConfigurationDTO,
    description: 'Retrieves a list of unit stack configurations by oris code',
  })
  @RoleGuard(
    {
      enforceCheckout: false,
      pathParam: 'orisCode',
      enforceEvalSubmitCheck: false,
    },
    LookupType.Facility,
  )
  async getUnitStackConfigurationsByOrisCode(@Param('orisCode') orisCode: number):Promise<ArrayResponse<UnitStackConfigurationDTO>> {
    const list = await this.service.getUnitStackConfigurationsByOrisCode(orisCode);
    return {
      items:list
    }
  }
}
