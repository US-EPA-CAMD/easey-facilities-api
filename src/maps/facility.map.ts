import { Injectable } from '@nestjs/common';

import { BaseMap } from './base.map';
import { Plant } from '../entities/plant.entity';
import { FacilityDTO } from '../dtos/facility.dto';
import { LinkDTO } from '../dtos/link.dto';

@Injectable()
export class FacilityMap extends BaseMap<Plant, FacilityDTO> {
  public async one(entity: Plant): Promise<FacilityDTO> {
    const self = new LinkDTO('self', `/api/facility-mgmt/facilities/${entity.id}`);
    const units = new LinkDTO('units', `/api/facility-mgmt/facilities/${entity.id}/units`);
    const stacks = new LinkDTO('stacks', `/api/facility-mgmt/facilities/${entity.id}/stacks`);
    const owners = new LinkDTO('owners', `/api/facility-mgmt/facilities/${entity.id}/owners`);
    const contacts = new LinkDTO('contacts', `/api/facility-mgmt/facilities/${entity.id}/contacts`);

    return {
      facId: entity.id,
      orisCode: entity.orisCode,
      name: entity.name,
      state: entity.state,
      region: entity.region,
      links: [
        self,
        units,
        stacks,
        owners,
        contacts
      ]
    };
  }
}
