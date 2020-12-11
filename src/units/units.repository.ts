import { Repository, EntityRepository } from 'typeorm';

import { Unit } from '../entities/unit.entity';

@EntityRepository(Unit)
export class UnitsRepository extends Repository<Unit>{

}