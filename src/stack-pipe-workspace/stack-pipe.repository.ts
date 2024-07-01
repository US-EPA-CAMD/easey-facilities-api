import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { StackPipe } from '@us-epa-camd/easey-common/entities/workspace';

@Injectable()
export class StackPipeWorkspaceRepository extends Repository<StackPipe> {
  constructor(entityManager: EntityManager) {
    super(StackPipe, entityManager);
  }
}
