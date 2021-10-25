import { IsDefined } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  propertyMetadata,
  ErrorMessages,
} from '@us-epa-camd/easey-common/constants';

import { IsYearFormat, IsInYearRange } from '@us-epa-camd/easey-common/pipes';

export class ApplicableFacilityAttributesParamsDTO {
  @ApiProperty({
    isArray: true,
    description: propertyMetadata.year.description,
  })
  @IsYearFormat({
    each: true,
    message: ErrorMessages.MultipleFormat('year', 'YYYY format'),
  })
  @IsInYearRange([new Date(1995, 0), new Date()], {
    each: true,
    message: ErrorMessages.DateRange(
      'year',
      true,
      '1980, 1985, 1990, or to a year between 1995 and this year',
    ),
  })
  @IsDefined({ message: ErrorMessages.RequiredProperty() })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  year: number[];
}
