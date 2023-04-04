import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';
import { IsNumber, IsString } from 'class-validator';

export class ApplicableFacilityAttributesDTO {
  @ApiProperty({
    description: propertyMetadata.year.description,
    example: propertyMetadata.year.example,
    name: propertyMetadata.year.fieldLabels.value,
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    description: propertyMetadata.programCode.description,
    example: propertyMetadata.programCode.example,
    name: propertyMetadata.programCode.fieldLabels.value,
  })
  @IsString()
  programCode: string;

  @ApiProperty({
    description: propertyMetadata.facilityId.description,
    example: propertyMetadata.facilityId.example,
    name: propertyMetadata.facilityId.fieldLabels.value,
  })
  @IsNumber()
  facilityId: number;

  @ApiProperty({
    description: propertyMetadata.stateCode.description,
    example: propertyMetadata.stateCode.example,
    name: propertyMetadata.stateCode.fieldLabels.value,
  })
  @IsString()
  stateCode: string;

  @ApiProperty({
    description: propertyMetadata.unitTypeCode.description,
    example: propertyMetadata.unitTypeCode.example,
    name: propertyMetadata.unitTypeCode.fieldLabels.value,
  })
  @IsString()
  unitTypeCode: string;

  @ApiProperty({
    description: propertyMetadata.fuelTypeCode.description,
    example: propertyMetadata.fuelTypeCode.example,
    name: propertyMetadata.fuelTypeCode.fieldLabels.value,
  })
  @IsString()
  fuelTypeCode: string;

  @ApiProperty({
    description: propertyMetadata.controlCode.description,
    example: propertyMetadata.controlCode.example,
    name: propertyMetadata.controlCode.fieldLabels.value,
  })
  @IsString()
  controlCode: string;

  @ApiProperty({
    description: propertyMetadata.sourceCategoryDescription.description,
    example: propertyMetadata.sourceCategoryDescription.example,
    name: propertyMetadata.sourceCategoryDescription.fieldLabels.value,
  })
  @IsString()
  sourceCategoryDescription: string;
}
