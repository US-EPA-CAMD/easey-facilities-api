import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '@us-epa-camd/easey-common/decorators';
import { LookupType } from '@us-epa-camd/easey-common/enums';

import { UnitStackConfigurationDTO } from '../dtos/unit-stack-configuration.dto';
import { UnitStackConfigurationWorkspaceService } from './unit-stack-configuration.service';

@Controller()
@ApiSecurity('APIKey')
@ApiTags('Unit Stack Configurations')
export class UnitStackConfigurationWorkspaceController {
  constructor(
    private readonly service: UnitStackConfigurationWorkspaceService,
  ) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: UnitStackConfigurationDTO,
    description: 'Retrieves a list of unit stack configurations by facility ID',
  })
  @RoleGuard(
    {
      enforceCheckout: false,
      pathParam: 'facId',
      enforceEvalSubmitCheck: false,
    },
    LookupType.Facility,
  )
  getUnitStackConfigurationsByFacId(@Param('facId') facId: number) {
    return this.service.getUnitStackConfigurationsByFacId(facId);
  }
}
