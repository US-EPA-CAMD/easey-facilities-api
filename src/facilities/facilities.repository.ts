import { Repository, EntityRepository } from "typeorm";


import { FacilityDTO } from './dto/facility.dto';
import { Plant } from './entities/plant.entity';


const facilities: Array<FacilityDTO> = [
  new FacilityDTO(1, 3, "Barry", null, "AL"),
  new FacilityDTO(2, 9, "Copper Station", null, "TX"),
  new FacilityDTO(3, 51, "Dolet Hills Power Station", null, "LA"),
  new FacilityDTO(4, 87, "Escalante", null, "NM"),
  new FacilityDTO(5, 108, "Holcomb", null, "KS"),
  new FacilityDTO(6, 113, "Cholla", null, "AZ"),
  new FacilityDTO(7, 130, "Cross", null, "SC"),
  new FacilityDTO(8, 477, "Valmont", null, "CO"),
  new FacilityDTO(9, 564, "Curtis H. Stanton Energy Center", null, "FL"),
  new FacilityDTO(10, 596, "Madison Street", null, "DE"),
];

@EntityRepository(Plant)
export class FacilityRepository extends Repository<Plant>{
  
  getFacilities() {
    return facilities;
  }
  getFacilityById(facId: number) {
    return facilities.filter(x => x.facId === facId);
  }
}