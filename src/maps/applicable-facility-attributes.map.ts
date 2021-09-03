import { Injectable } from '@nestjs/common';

import { BaseMap } from './base.map';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';

@Injectable()
export class ApplicableFacilityAttributesMap extends BaseMap<any, any> {
  public async one(entity: any): Promise<ApplicableFacilityAttributesDTO> {
    return {
      year: Number(entity.pyd_op_year),
      programCode: entity.pyd_prg_code,
      facilityId: Number(entity.uf_orispl_code),
      state: entity.uf_state,
      unitTypeCode: entity.utyd_unit_type,
      fuelTypeCode: entity.fyd_fuel_code,
      controlCode: entity.cyd_control_code,
    };
  }
}
