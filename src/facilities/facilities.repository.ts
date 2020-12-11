import { Repository, EntityRepository } from 'typeorm';

import { Plant } from '../entities/plant.entity';

@EntityRepository(Plant)
export class FacilitiesRepository extends Repository<Plant>{

}