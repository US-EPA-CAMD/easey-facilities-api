import {
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PAGINATION_MAX_PER_PAGE } from '../config/app.config';

import {
  propertyMetadata,
  ErrorMessages,
} from '@us-epa-camd/easey-common/constants';
import {
  State,
  UnitType,
  UnitFuelType,
  ControlTechnology,
  Program,
  SourceCategory,
} from '@us-epa-camd/easey-common/enums';
import {
  IsInDateRange,
  IsOrisCode,
  IsYearFormat,
  Min,
  IsInRange,
  IsNotEmptyString,
} from '@us-epa-camd/easey-common/pipes';

import { IsProgram } from '../pipes/is-program.pipe';
import { IsStateCode } from '../pipes/is-state-code.pipe';
import { IsUnitType } from '../pipes/is-unit-type.pipe';
import { IsUnitFuelType } from '../pipes/is-unit-fuel-type.pipe';
import { IsControlTechnology } from '../pipes/is-control-technology.pipe';
import { IsSourceCategory } from '../pipes/is-source-category.pipe';

export class FacilityAttributesParamsDTO {
  @ApiProperty({
    isArray: true,
    description: propertyMetadata.year.description,
  })
  @IsNotEmptyString({ message: ErrorMessages.RequiredProperty() })
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
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  @IsArray()
  year: number[];

  @ApiProperty({
    isArray: true,
    description: propertyMetadata.facilityId.description,
  })
  @IsOptional()
  @IsOrisCode({
    each: true,
    message: ErrorMessages.UnitCharacteristics(true, 'facilityId'),
  })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  facilityId?: number[];

  @ApiProperty({
    enum: State,
    description: propertyMetadata.stateCode.description,
  })
  @IsOptional()
  @IsStateCode({
    each: true,
    message: ErrorMessages.UnitCharacteristics(true, 'state-code'),
  })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  stateCode?: State[];

  @ApiProperty({
    enum: UnitType,
    description: propertyMetadata.unitType.description,
  })
  @IsOptional()
  @IsUnitType({
    each: true,
    message: ErrorMessages.UnitCharacteristics(true, 'unit-type-code'),
  })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  unitType?: UnitType[];

  @ApiProperty({
    enum: UnitFuelType,
    description: propertyMetadata.unitFuelType.description,
  })
  @IsOptional()
  @IsUnitFuelType({
    each: true,
    message: ErrorMessages.UnitCharacteristics(true, 'fuel-type-code'),
  })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  unitFuelType?: UnitFuelType[];

  @ApiProperty({
    enum: ControlTechnology,
    description: propertyMetadata.controlTechnologies.description,
  })
  @IsOptional()
  @IsControlTechnology({
    each: true,
    message: ErrorMessages.UnitCharacteristics(true, 'control-code'),
  })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  controlTechnologies?: ControlTechnology[];

  @ApiProperty({
    enum: SourceCategory,
    description: propertyMetadata.sourceCategory.description,
  })
  @IsOptional()
  @IsSourceCategory({
    each: true,
    message: ErrorMessages.UnitCharacteristics(true, 'source-category-code'),
  })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  sourceCategory?: SourceCategory[];

  @ApiProperty({
    enum: Program,
    description: propertyMetadata.programCodeInfo.description,
  })
  @IsOptional()
  @IsProgram({
    each: true,
    message: ErrorMessages.UnitCharacteristics(true, 'program-code'),
  })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  programCodeInfo?: Program[];
}

export class PaginatedFacilityAttributesParamsDTO extends FacilityAttributesParamsDTO {
  @Min(1, {
    message: ErrorMessages.GreaterThanOrEqual('page', 1),
  })
  @ApiProperty({
    description: propertyMetadata.page.description,
  })
  @IsNotEmpty({ message: ErrorMessages.RequiredProperty() })
  @IsNumberString()
  page: number;

  @IsInRange(1, PAGINATION_MAX_PER_PAGE, {
    message: ErrorMessages.Between('perPage', 1, PAGINATION_MAX_PER_PAGE),
  })
  @ApiProperty({
    description: propertyMetadata.perPage.description,
  })
  @IsNotEmpty({ message: ErrorMessages.RequiredProperty() })
  @IsNumberString()
  perPage: number;
}
