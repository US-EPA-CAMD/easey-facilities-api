import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-constants';

import { BaseMap } from './base.map';
import { Plant } from '../entities/plant.entity';
import { FacilityDTO } from '../dtos/facility.dto';
import { LinkDTO } from '../dtos/link.dto';

@Injectable()
export class FacilityMap extends BaseMap<Plant, FacilityDTO> {
  public async one(entity: Plant): Promise<any> {
    const self = new LinkDTO(
      'self',
      `/api/facility-mgmt/facilities/${entity.id}`,
    );
    const units = new LinkDTO(
      'units',
      `/api/facility-mgmt/facilities/${entity.id}/units`,
    );
    const stacks = new LinkDTO(
      'stacks',
      `/api/facility-mgmt/facilities/${entity.id}/stacks`,
    );
    const owners = new LinkDTO(
      'owners',
      `/api/facility-mgmt/facilities/${entity.id}/owners`,
    );
    const contacts = new LinkDTO(
      'contacts',
      `/api/facility-mgmt/facilities/${entity.id}/contacts`,
    );

    return {
      id: entity.id,
      [propertyMetadata.facilityId.fieldLabels.value]: entity.facilityId,
      [propertyMetadata.facilityName.fieldLabels.value]: entity.facilityName,
      [propertyMetadata.state.fieldLabels.value]: entity.state,
      [propertyMetadata.epaRegion.fieldLabels.value]: entity.epaRegion,
      links: [self, units, stacks, owners, contacts],
    };
  }
}
