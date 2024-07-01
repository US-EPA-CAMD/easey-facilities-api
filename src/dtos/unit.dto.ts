import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';
import { MatchesRegEx } from '@us-epa-camd/easey-common/pipes';
import { IsNumber, IsString, ValidationArguments } from 'class-validator';

const KEY = 'Unit';

export class UnitDTO {
  @IsNumber()
  @ApiProperty({
    description: propertyMetadata.unit_id.description,
    example: propertyMetadata.unit_id.example,
    name: propertyMetadata.unit_id.fieldLabels.value,
  })
  id: number;

  @IsString()
  @MatchesRegEx('^[A-z0-9\\-\\*#]{1,6}$', {
    message: (args: ValidationArguments) => {
      return `The value [${args.value}] for [${args.property}] must be match the RegEx: [A-Za-z0-9-*#]{1,6} for [${KEY}].`;
    },
  })
  @ApiProperty({
    description: propertyMetadata.unitId.description,
    example: propertyMetadata.unitId.example,
    name: propertyMetadata.unitId.fieldLabels.value,
  })
  unitId: string;

  @IsNumber()
  @ApiProperty({
    description: propertyMetadata.facilityId.description,
    example: propertyMetadata.facilityId.example,
    name: propertyMetadata.facilityId.fieldLabels.value,
  })
  facilityId: number;
}
