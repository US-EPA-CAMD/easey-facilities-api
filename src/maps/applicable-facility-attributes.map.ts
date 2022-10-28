import { Injectable } from '@nestjs/common';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';

@Injectable()
export class ApplicableFacilityAttributesMap extends BaseMap<
  any,
  ApplicableFacilityAttributesDTO
> {
  public async one(entity: any): Promise<any> {
    return {
      year: Number(entity.year),
      programCode: entity.programCode,
      facilityId: Number(
        entity.facilityId,
      ),
      stateCode: entity.stateCode,
      unitTypeCode: entity.unitTypeCode,
      fuelTypeCode: entity.fuelTypeCode,
      controlCode: entity.controlCode,
      sourceCategoryDescription: entity.sourceCategory,
    };
  }
}
