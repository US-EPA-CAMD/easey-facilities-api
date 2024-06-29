import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Unit } from '@us-epa-camd/easey-common/entities/workspace';

@Injectable()
export class UnitWorkspaceRepository extends Repository<Unit> {
  constructor(entityManager: EntityManager) {
    super(Unit, entityManager);
  }
}
