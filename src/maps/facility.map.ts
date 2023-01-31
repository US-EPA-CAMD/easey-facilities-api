import { Injectable } from '@nestjs/common';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { Plant } from '../entities/plant.entity';
import { FacilityDTO } from '../dtos/facility.dto';

@Injectable()
export class FacilityMap extends BaseMap<Plant, FacilityDTO> {
  public async one(entity: Plant): Promise<any> {
    return {
      facilityRecordId: entity.id,
      facilityId: entity.facilityId,
      facilityName: entity.facilityName,
      stateCode: entity.stateCode,
      epaRegion: entity.epaRegion,
    };
  }
}
