import { Injectable } from '@nestjs/common';

import { StackPipeMap } from '../maps/stack-pipe.map';
import { StackPipeWorkspaceRepository } from './stack-pipe.repository';

@Injectable()
export class StackPipeWorkspaceService {
  constructor(
    private readonly repository: StackPipeWorkspaceRepository,
    private readonly map: StackPipeMap,
  ) {}

  async getStackPipesByFacId(facId: number) {
    const results = await this.repository.findBy({ facId });
    return this.map.many(results);
  }
}
