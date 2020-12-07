import { Repository, EntityRepository } from 'typeorm';

import { FacilityDTO } from './dto/facility.dto';
import { Plant } from './entities/plant.entity';
import { LinkDTO } from './dto/link.dto';
import { FacilityParamsDTO } from './dto/facilitiesParams.dto';

function createLinks(facId: number): LinkDTO[] {
  const links: Array<LinkDTO> = [
    new LinkDTO('self', `/facilities/${facId}`),
    new LinkDTO('units', `/facilities/${facId}/units`),
    new LinkDTO('stacks', `/facilities/${facId}/stacks`),
    new LinkDTO('owners', `/facilities/${facId}/owners`),
    new LinkDTO('contacts', `/facilities/${facId}/contacts`),
  ]

  return links;
}

// static data
const facilities: Array<FacilityDTO> = [
  new FacilityDTO(1, 3, 'Barry', 'AL', createLinks(1)),
  new FacilityDTO(2, 9, 'Copper Station', 'TX', createLinks(2)),
  new FacilityDTO(3, 51, 'Dolet Hills Power Station', 'LA', createLinks(3)),
  new FacilityDTO(4, 87, 'Escalante', 'NM', createLinks(4)),
  new FacilityDTO(5, 108, 'Holcomb', 'KS', createLinks(5)),
  new FacilityDTO(6, 113, 'Cholla', 'AZ', createLinks(6)),
  new FacilityDTO(7, 130, 'Cross', 'SC', createLinks(7)),
  new FacilityDTO(8, 477, 'Valmont', 'CO', createLinks(8)),
  new FacilityDTO(9, 564, 'Curtis H. Stanton Energy Center', 'FL', createLinks(9)),
  new FacilityDTO(10, 596, 'Madison Street', 'DE', createLinks(10)),
];

export function sortFacilities(orderBy: string):any {
  return (a: FacilityDTO, b: FacilityDTO) => {
    switch(orderBy) {
      case 'facId': 
        return a.facId < b.facId ? -1 : a.facId > b.facId ? 1 : 0;
      case 'orisCode':
        return a.orisCode < b.orisCode ? -1 : a.orisCode > b.orisCode ? 1 : 0;
      case 'name':
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      case 'state':
        return a.state < b.state ? -1 : a.state > b.state ? 1 : 0;
    };
  };
};
@EntityRepository(Plant)
export class FacilitiesRepository extends Repository<Plant>{
  
  getFacilities(facilityParamsDTO: FacilityParamsDTO): FacilityDTO[] {
    const { state, orderBy } = facilityParamsDTO;
    let facilitiesArray: Array<FacilityDTO> = facilities;

    if (orderBy){
      facilitiesArray = facilities.sort(sortFacilities(orderBy));
    }

    if (state) {
      facilitiesArray = facilities.filter(x => x.state === state);
    }

    return facilitiesArray;
  }

  // calculates how many pages there will be given what perPage is
  numOfFacilitiesPages(facilityParamsDTO: FacilityParamsDTO): number {
    const { perPage } = facilityParamsDTO;
    const numFacilities: number = Math.ceil((this.getFacilities(facilityParamsDTO)).length / (+perPage));

    return numFacilities;
  }

  getFacilityById(facId: number): FacilityDTO {
      const facility = facilities.filter(x => x.facId === facId);

      return facility[0];
  }

}