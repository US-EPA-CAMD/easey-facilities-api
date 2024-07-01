import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { UnitStackConfiguration } from '@us-epa-camd/easey-common/entities/workspace';

@Injectable()
export class UnitStackConfigurationWorkspaceRepository extends Repository<
  UnitStackConfiguration
> {
  constructor(entityManager: EntityManager) {
    super(UnitStackConfiguration, entityManager);
  }
}
