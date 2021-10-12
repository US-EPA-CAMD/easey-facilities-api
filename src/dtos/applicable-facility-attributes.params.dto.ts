import { IsDefined } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-constants';

import { IsInYearRange } from '../pipes/is-in-year-range.pipe';
import { ErrorMessages } from '../utils/error-messages';
import { IsYearFormat } from '../pipes/is-year-format.pipe';

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
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  year: number[];
}
