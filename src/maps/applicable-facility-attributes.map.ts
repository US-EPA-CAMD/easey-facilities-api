import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-constants';

import { BaseMap } from './base.map';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';

@Injectable()
export class ApplicableFacilityAttributesMap extends BaseMap<any, ApplicableFacilityAttributesDTO> {
  public async one(entity: any): Promise<any> {
    return {
      [propertyMetadata.year.fieldLabels.value]: Number(entity.pyd_op_year),
      [propertyMetadata.programCode.fieldLabels.value]: entity.pyd_prg_code,
      [propertyMetadata.facilityId.fieldLabels.value]: Number(
        entity.uf_orispl_code,
      ),
      [propertyMetadata.state.fieldLabels.value]: entity.uf_state,
      [propertyMetadata.unitTypeCode.fieldLabels.value]: entity.utyd_unit_type,
      [propertyMetadata.fuelTypeCode.fieldLabels.value]: entity.fyd_fuel_code,
      [propertyMetadata.controlCode.fieldLabels.value]: entity.cyd_control_code,
    };
  }
}
