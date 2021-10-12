import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-constants';

import { LinkDTO } from './link.dto';

export class FacilityDTO {
  facilityRecordId: number;

  @ApiProperty({
    description: propertyMetadata.facilityId.description,
    example: propertyMetadata.facilityId.example,
    name: propertyMetadata.facilityId.fieldLabels.value,
  })
  facilityId: number;

  @ApiProperty({
    description: propertyMetadata.facilityName.description,
    example: propertyMetadata.facilityName.example,
    name: propertyMetadata.facilityName.fieldLabels.value,
  })
  facilityName: string;

  @ApiProperty({
    description: propertyMetadata.state.description,
    example: propertyMetadata.state.example,
    name: propertyMetadata.state.fieldLabels.value,
  })
  state: string;

  @ApiProperty({
    description: propertyMetadata.epaRegion.description,
    example: propertyMetadata.epaRegion.example,
    name: propertyMetadata.epaRegion.fieldLabels.value,
  })
  epaRegion: number;

  links: LinkDTO[];
}
