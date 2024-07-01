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
import { IsNumber, IsString, ValidationArguments } from 'class-validator';

const KEY = 'Stack Pipe';

export class StackPipeDTO {
  @IsString()
  @ApiProperty({
    description: propertyMetadata.stackPipe.stack_pipe_id.description,
    example: propertyMetadata.stackPipe.stack_pipe_id.example,
    name: propertyMetadata.stackPipe.stack_pipe_id.fieldLabels.value,
  })
  id: string;

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
  @ApiProperty({
    description: propertyMetadata.stackPipe.activeDate.description,
    example: propertyMetadata.stackPipe.activeDate.example,
    name: propertyMetadata.stackPipe.activeDate.fieldLabels.value,
  })
  activeDate: Date;

  @IsNumber()
  @ApiProperty({
    description: propertyMetadata.facilityId.description,
    example: propertyMetadata.facilityId.example,
    name: propertyMetadata.facilityId.fieldLabels.value,
  })
  facilityId: number;

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
  @ApiProperty({
    description: propertyMetadata.stackPipe.retireDate.description,
    example: propertyMetadata.stackPipe.retireDate.example,
    name: propertyMetadata.stackPipe.retireDate.fieldLabels.value,
  })
  retireDate: Date;

  @IsString()
  @MatchesRegEx('^(C|c|M|m|X|x)(S|s|P|p)[A-z0-9\\-]{1,6}$', {
    message: (args: ValidationArguments) => {
      return `The value [${args.value}] for [${args.property}] must be match the RegEx: (C|c|M|m|X|x)(S|s|P|p)[A-z0-9-]{1,4} for [${KEY}].`;
    },
  })
  @ApiProperty({
    description: propertyMetadata.stackPipeId.description,
    example: propertyMetadata.stackPipeId.example,
    name: propertyMetadata.stackPipeId.fieldLabels.value,
  })
  stackPipeId: string;
}
