import { propertyMetadata } from '@us-epa-camd/easey-common/constants';
import { State } from '@us-epa-camd/easey-common/enums';

import { IsOptional } from 'class-validator';
import { PaginationDTO } from './pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FacilityParamsDTO extends PaginationDTO {
  @ApiProperty({
    enum: State,
    description: propertyMetadata.state.description,
  })
  @IsOptional()
  state?: string;

  @ApiProperty({
    description: propertyMetadata.epaRegion.description,
  })
  @IsOptional()
  epaRegion?: string;
}
