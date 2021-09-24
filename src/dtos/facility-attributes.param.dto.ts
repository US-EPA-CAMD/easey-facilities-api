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

export class FacilityAttributesParamsDTO {
  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;

  @IsDefined({ message: ErrorMessages.RequiredProperty() })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  year: number[];

  @Transform((value: string) => value.split('|').map(item => item.trim()))
  orisCode?: number[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  state?: State[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  unitType?: UnitType[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  unitFuelType?: UnitFuelType[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  controlTechnologies?: ControlTechnology[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  sourceCategory?: SourceCategory[];

  @Transform((value: string) => value.split('|').map(item => item.trim()))
  program?: Program[];

  @ApiProperty({
    description:
      'Attaches a file with data in the format specified by the Accept header',
  })
  attachFile?: boolean;
}
