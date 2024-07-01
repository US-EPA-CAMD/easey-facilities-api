import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { StackPipe } from '@us-epa-camd/easey-common/entities/workspace';

import { StackPipeMap } from '../maps/stack-pipe.map';
import { StackPipeWorkspaceRepository } from './stack-pipe.repository';
import { StackPipeWorkspaceService } from './stack-pipe.service';

const mockRepository = () => ({
  findBy: jest.fn().mockResolvedValue(''),
  findOneBy: jest.fn().mockResolvedValue(''),
  update: jest.fn().mockResolvedValue(true),
});

const mockStackPipe = (id: string, name: string, facId: number) => {
  const stackPipe = new StackPipe();
  stackPipe.id = id;
  stackPipe.name = name;
  stackPipe.facId = facId;
  return stackPipe;
};

describe('StackPipe Workspace Tests', () => {
  const map = new StackPipeMap();
  let service: StackPipeWorkspaceService;
  let repository: StackPipeWorkspaceRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        StackPipeMap,
        {
          provide: StackPipeWorkspaceRepository,
          useFactory: mockRepository,
        },
        StackPipeWorkspaceService,
      ],
    }).compile();

    repository = module.get(StackPipeWorkspaceRepository);
    service = module.get(StackPipeWorkspaceService);
  });

  describe('getStackPipes', () => {
    const stackPipeList: StackPipe[] = new Array(16)
      .fill(null)
      .map((_, i) =>
        mockStackPipe(`${i + 1}`, `Test StackPipe ${i + 1}`, (i + 1) % 4),
      );
    it('should return array with all stackPipes for a facility', async () => {
      const stackPipes = stackPipeList.filter(u => u.facId === 2);
      const stackPipesDto = await map.many(stackPipes);
      jest.spyOn(repository, 'findBy').mockResolvedValue(stackPipes);
      const results = await service.getStackPipesByFacId(2);
      expect(results).toStrictEqual(stackPipesDto);
    });
  });
});
