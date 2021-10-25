import { IsDefined, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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
import { IsOrisCode, IsYearFormat } from '@us-epa-camd/easey-common/pipes';

import { IsStateCode } from '../pipes/is-state-code.pipe';
import { IsUnitType } from '../pipes/is-unit-type.pipe';
import { IsUnitFuelType } from '../pipes/is-unit-fuel-type.pipe';
import { IsControlTechnology } from '../pipes/is-control-technology.pipe';
import { IsEmissionsProgram } from '../pipes/is-emissions-program.pipe';
import { IsSourceCategory } from '../pipes/is-source-category.pipe';
import { IsInDateRange } from '../pipes/is-in-date-range.pipe';

export class FacilityAttributesParamsDTO {
  @ApiProperty({
    description: propertyMetadata.page.description,
  })
  @IsOptional()
  page?: number;

  @ApiProperty({
    description: propertyMetadata.perPage.description,
  })
  @IsOptional()
  perPage?: number;

  @ApiProperty({
    isArray: true,
    description: propertyMetadata.year.description,
  })
  @IsDefined({ message: ErrorMessages.RequiredProperty() })
  @IsYearFormat({
    each: true,
    message: ErrorMessages.MultipleFormat('year', 'YYYY format'),
  })
  @IsInDateRange([new Date(1995, 0), new Date()], true, true, true, {
    each: true,
    message: ErrorMessages.DateRange(
      'year',
      true,
      'a year between 1995 and this year',
    ),
  })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
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
    description: propertyMetadata.state.description,
  })
  @IsOptional()
  @IsStateCode({
    each: true,
    message: ErrorMessages.UnitCharacteristics(true, 'state'),
  })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  state?: State[];

  @ApiProperty({
    enum: UnitType,
    description: propertyMetadata.unitType.description,
  })
  @IsOptional()
  @IsUnitType({
    each: true,
    message: ErrorMessages.UnitCharacteristics(true, 'unitType'),
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
    message: ErrorMessages.UnitCharacteristics(true, 'unitFuelType'),
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
    message: ErrorMessages.UnitCharacteristics(true, 'controlTechnologies'),
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
    message: ErrorMessages.UnitCharacteristics(true, 'sourceCategories'),
  })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  sourceCategory?: SourceCategory[];

  @ApiProperty({
    enum: Program,
    description: propertyMetadata.programCodeInfo.description,
  })
  @IsOptional()
  @IsEmissionsProgram({
    each: true,
    message:
      ErrorMessages.UnitCharacteristics(true, 'programCodeInfo') +
      '?emissionsUIFilter=true',
  })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  programCodeInfo?: Program[];

  @ApiProperty({
    description:
      'Attaches a file with data in the format specified by the Accept header',
  })
  attachFile?: boolean;
}
