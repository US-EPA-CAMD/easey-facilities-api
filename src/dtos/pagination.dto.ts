import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { propertyMetadata, ErrorMessages } from '@us-epa-camd/easey-common/constants';
import { Min, IsInRange } from '@us-epa-camd/easey-common/pipes';

import { PAGINATION_MAX_PER_PAGE } from '../config/app.config';

export class PaginationDTO {
  @Min(1, {
    message: ErrorMessages.GreaterThanOrEqual('page', 1),
  })
  @IsOptional()
  @ApiPropertyOptional({
    description: propertyMetadata.page.description,
  })
  page: number;

  @IsInRange(1, PAGINATION_MAX_PER_PAGE, {
    message: ErrorMessages.Between('perPage', 1, PAGINATION_MAX_PER_PAGE),
  })
  @IsOptional()
  @ApiPropertyOptional({
    description: propertyMetadata.perPage.description,
  })
  perPage: number;
}
