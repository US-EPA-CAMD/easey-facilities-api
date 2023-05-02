import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  propertyMetadata,
  ErrorMessages,
} from '@us-epa-camd/easey-common/constants';
import {
  IsInDateRange,
  IsNotEmptyString,
  IsYearFormat,
} from '@us-epa-camd/easey-common/pipes';
import { IsArray } from 'class-validator';

export class ApplicableFacilityAttributesParamsDTO {
  @ApiProperty({
    isArray: true,
    description: propertyMetadata.year.description,
  })
  @IsYearFormat({
    each: true,
    message: ErrorMessages.MultipleFormat('year', 'YYYY format'),
  })
  @IsInDateRange(new Date(1995, 0), true, true, true, {
    each: true,
    message: ErrorMessages.DateRange(
      'year',
      true,
      `1980, 1985, 1990, or to a year between 1995 and the quarter ending on ${ErrorMessages.ReportingQuarter()}`,
    ),
  })
  @IsNotEmptyString({ message: ErrorMessages.RequiredProperty() })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  @IsArray()
  year: number[];
}
