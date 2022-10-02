import { ApiProperty } from '@nestjs/swagger';
import { State } from '@us-epa-camd/easey-common/enums';
import { ErrorMessages, propertyMetadata } from '@us-epa-camd/easey-common/constants';

import { IsOptional } from 'class-validator';
import { PaginationDTO } from './pagination.dto';
import { IsStateCode } from '../pipes/is-state-code.pipe';

export class FacilityParamsDTO extends PaginationDTO {
  @ApiProperty({
    enum: State,
    description: propertyMetadata.stateCode.description,
  })
  @IsOptional()
  @IsStateCode({
    message: ErrorMessages.UnitCharacteristics(true, 'state-code'),
  })
  stateCode?: State

  @ApiProperty({
    description: propertyMetadata.epaRegion.description,
  })
  @IsOptional()
  epaRegion?: string;
}
