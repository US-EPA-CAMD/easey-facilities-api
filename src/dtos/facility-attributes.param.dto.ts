import { IsDefined, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;

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

  @IsOptional()
  @IsOrisCode({
    each: true,
    message: ErrorMessages.UnitCharacteristics(true, 'orisCode'),
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  orisCode?: number[];

  @IsOptional()
  @IsStateCode({
    each: true,
    message: ErrorMessages.UnitCharacteristics(true, 'state'),
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  state?: State[];

  @IsOptional()
  @IsUnitType({
    each: true,
    message: ErrorMessages.UnitCharacteristics(true, 'unitType'),
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  unitType?: UnitType[];

  @IsOptional()
  @IsUnitFuelType({
    each: true,
    message: ErrorMessages.UnitCharacteristics(true, 'unitFuelType'),
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  unitFuelType?: UnitFuelType[];

  @IsOptional()
  @IsControlTechnology({
    each: true,
    message: ErrorMessages.UnitCharacteristics(true, 'controlTechnologies'),
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  controlTechnologies?: ControlTechnology[];

  @IsOptional()
  @IsSourceCategory({
    each: true,
    message: ErrorMessages.UnitCharacteristics(true, 'sourceCategories')
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  sourceCategory?: SourceCategory[];

  @IsOptional()
  @IsEmissionsProgram({
    each: true,
    message:
      ErrorMessages.UnitCharacteristics(true, 'program') +
      '?emissionsUIFilter=true',
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  program?: Program[];

  @ApiProperty({
    description:
      'Attaches a file with data in the format specified by the Accept header',
  })
  attachFile?: boolean;
}
