import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '@us-epa-camd/easey-common/decorators';
import { LookupType } from '@us-epa-camd/easey-common/enums';

import { UnitDTO } from '../dtos/unit.dto';
import { UnitWorkspaceService } from './unit.service';

@Controller()
@ApiSecurity('APIKey')
@ApiTags('Units')
export class UnitWorkspaceController {
  constructor(private readonly service: UnitWorkspaceService) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: UnitDTO,
    description: 'Retrieves a list of units by facility oris code',
  })
  @RoleGuard(
    {
      enforceCheckout: false,
      pathParam: 'orisCode',
      enforceEvalSubmitCheck: false,
    },
    LookupType.Facility,
  )
  getUnitsByOrisCode(@Param('orisCode') orisCode: number) {
    return this.service.getUnitsByOrisCode(orisCode);
  }
}
