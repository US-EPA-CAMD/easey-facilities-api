import { Injectable } from '@nestjs/common';

import { BaseMap } from './base.map';
import { Plant } from '../entities/plant.entity';
import { FacilityDTO } from '../dtos/facility.dto';

@Injectable()
export class FacilityMap extends BaseMap<Plant, FacilityDTO> {
  public async one(entity: Plant): Promise<FacilityDTO> {
    return {
      facId: entity.id,
      orisCode: entity.orisCode,
      name: entity.name,
      state: entity.state,
      region: entity.region,
      links: [
        {
          rel: 'self',
          href: `/api/facility-mgmt/facilities/${entity.id}`
        },
        {
          rel: 'units',
          href: `/api/facility-mgmt/facilities/${entity.id}/units`
        },
        {
          rel: 'stacks',
          href: `/api/facility-mgmt/facilities/${entity.id}/stacks`
        },
        {
          rel: 'owners',
          href: `/api/facility-mgmt/facilities/${entity.id}/owners`
        },
        {
          rel: 'contacts',
          href: `/api/facility-mgmt/facilities/${entity.id}/contacts`
        },
      ]
    };
  }
}
