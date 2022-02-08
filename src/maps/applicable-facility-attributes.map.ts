import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';

@Injectable()
export class ApplicableFacilityAttributesMap extends BaseMap<
  any,
  ApplicableFacilityAttributesDTO
> {
  public async one(entity: any): Promise<any> {
    return {
      year: entity.pyd_op_year,
      programCode: entity.pyd_prg_code,
      facilityId: entity.uf_orispl_code,
      stateCode: entity.uf_state,
      unitTypeCode: entity.utyd_unit_type,
      fuelTypeCode: entity.fyd_fuel_code,
      controlCode: entity.cyd_control_code,
      sourceCategoryDescription: entity.uf_source_cat,
    };
  }
}
