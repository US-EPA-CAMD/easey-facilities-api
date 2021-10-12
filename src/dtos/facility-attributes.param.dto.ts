import { IsDefined, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-constants';

import { ErrorMessages } from '../utils/error-messages';
import { State } from '../enums/state.enum';
import { UnitType } from '../enums/unit-type.enum';
import { UnitFuelType } from '../enums/unit-fuel-type.enum';
import { ControlTechnology } from '../enums/control-technology.enum';
import { Program } from '../enums/program.enum';
import { SourceCategory } from '../enums/source-category.enum';
import { IsStateCode } from '../pipes/is-state-code.pipe';
import { IsOrisCode } from '../pipes/is-oris-code.pipe';
import { IsUnitType } from '../pipes/is-unit-type.pipe';
import { IsUnitFuelType } from '../pipes/is-unit-fuel-type.pipe';
import { IsControlTechnology } from '../pipes/is-control-technology.pipe';
import { IsEmissionsProgram } from '../pipes/is-emissions-program.pipe';
import { IsYearFormat } from '../pipes/is-year-format.pipe';
import { IsInDateRange } from '../pipes/is-in-date-range.pipe';
import { IsSourceCategory } from '../pipes/is-source-category.pipe';

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
  @Transform((value: string) => value.split('|').map(item => item.trim()))
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
  @Transform((value: string) => value.split('|').map(item => item.trim()))
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
  @Transform((value: string) => value.split('|').map(item => item.trim()))
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
  @Transform((value: string) => value.split('|').map(item => item.trim()))
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
  @Transform((value: string) => value.split('|').map(item => item.trim()))
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
  @Transform((value: string) => value.split('|').map(item => item.trim()))
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
  @Transform((value: string) => value.split('|').map(item => item.trim()))
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
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  programCodeInfo?: Program[];

  @ApiProperty({
    description:
      'Attaches a file with data in the format specified by the Accept header',
  })
  attachFile?: boolean;
}
