import { ApiProperty } from '@nestjs/swagger';
import { CheckCatalogService } from '@us-epa-camd/easey-common/check-catalog';
import {
  DATE_FORMAT,
  propertyMetadata,
} from '@us-epa-camd/easey-common/constants';
import {
  IsIsoFormat,
  IsValidDate,
  MatchesRegEx,
} from '@us-epa-camd/easey-common/pipes';
import { IsString, ValidationArguments } from 'class-validator';

const KEY = 'Unit Stack Configuration';

export class UnitStackConfigurationDTO {
  @ApiProperty({
    description: propertyMetadata.unitStackConfigurationDTOId.description,
    example: propertyMetadata.unitStackConfigurationDTOId.example,
    name: propertyMetadata.unitStackConfigurationDTOId.fieldLabels.value,
  })
  @IsString()
  id: string;

  @IsString()
  @MatchesRegEx('^[A-z0-9\\-\\*#]{1,6}$', {
    message: (args: ValidationArguments) => {
      return `The value [${args.value}] for [${args.property}] must be match the RegEx: [A-Za-z0-9-*#]{1,6} for [${KEY}].`;
    },
  })
  unitId: string;

  @IsString()
  @MatchesRegEx('^(C|c|M|m|X|x)(S|s|P|p)[A-z0-9\\-]{1,6}$', {
    message: (args: ValidationArguments) => {
      return `The value [${args.value}] for [${args.property}] must be match the RegEx: (C|c|M|m|X|x)(S|s|P|p)[A-z0-9-]{1,4} for [${KEY}].`;
    },
  })
  stackPipeId: string;

  @ApiProperty({
    description:
      propertyMetadata.unitStackConfigurationDTOBeginDate.description,
    example: propertyMetadata.unitStackConfigurationDTOBeginDate.example,
    name: propertyMetadata.unitStackConfigurationDTOBeginDate.fieldLabels.value,
  })
  @IsIsoFormat({
    message: (args: ValidationArguments) => {
      return `The value of [${args.value}] for [${args.property}] must be a valid ISO date format ${DATE_FORMAT} for [${KEY}].`;
    },
  })
  @IsValidDate({
    message: (args: ValidationArguments) => {
      return CheckCatalogService.formatMessage(
        `[${args.property}] must be a valid date in the format of ${DATE_FORMAT}. You reported an invalid date of [${args.value}]`,
      );
    },
  })
  beginDate: Date;

  @ApiProperty({
    description: propertyMetadata.unitStackConfigurationDTOEndDate.description,
    example: propertyMetadata.unitStackConfigurationDTOEndDate.example,
    name: propertyMetadata.unitStackConfigurationDTOEndDate.fieldLabels.value,
  })
  @IsIsoFormat({
    message: (args: ValidationArguments) => {
      return `The value of [${args.value}] for [${args.property}] must be a valid ISO date format ${DATE_FORMAT} for [${KEY}].`;
    },
  })
  @IsValidDate({
    message: (args: ValidationArguments) => {
      return CheckCatalogService.formatMessage(
        `[${args.property}] must be a valid date in the format of ${DATE_FORMAT}. You reported an invalid date of [${args.value}]`,
      );
    },
  })
  endDate: Date;
}
