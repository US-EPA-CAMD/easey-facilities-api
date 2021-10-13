import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-constants';

export class ApplicableFacilityAttributesDTO {
  @ApiProperty({
    description: propertyMetadata.year.description,
    example: propertyMetadata.year.example,
    name: propertyMetadata.year.fieldLabels.value,
  })
  year: number;

  @ApiProperty({
    description: propertyMetadata.programCode.description,
    example: propertyMetadata.programCode.example,
    name: propertyMetadata.programCode.fieldLabels.value,
  })
  programCode: string;

  @ApiProperty({
    description: propertyMetadata.facilityId.description,
    example: propertyMetadata.facilityId.example,
    name: propertyMetadata.facilityId.fieldLabels.value,
  })
  facilityId: number;

  @ApiProperty({
    description: propertyMetadata.state.description,
    example: propertyMetadata.state.example,
    name: propertyMetadata.state.fieldLabels.value,
  })
  state: string;

  @ApiProperty({
    description: propertyMetadata.unitTypeCode.description,
    example: propertyMetadata.unitTypeCode.example,
    name: propertyMetadata.unitTypeCode.fieldLabels.value,
  })
  unitTypeCode: string;

  @ApiProperty({
    description: propertyMetadata.fuelTypeCode.description,
    example: propertyMetadata.fuelTypeCode.example,
    name: propertyMetadata.fuelTypeCode.fieldLabels.value,
  })
  fuelTypeCode: string;

  @ApiProperty({
    description: propertyMetadata.controlCode.description,
    example: propertyMetadata.controlCode.example,
    name: propertyMetadata.controlCode.fieldLabels.value,
  })
  controlCode: string;

  @ApiProperty({
    description: propertyMetadata.sourceCategoryDescription.description,
    example: propertyMetadata.sourceCategoryDescription.example,
    name: propertyMetadata.sourceCategoryDescription.fieldLabels.value,
  })
  sourceCategoryDescription: string;
}
