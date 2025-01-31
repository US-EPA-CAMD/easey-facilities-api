import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { DataSource, EntityManager } from 'typeorm';

import { StackPipeDTO } from '../dtos/stack-pipe.dto';
import { StackPipeWorkspaceService } from './stack-pipe.service';
import { StackPipeWorkspaceController } from './stack-pipe.controller';
import { StackPipeWorkspaceRepository } from './stack-pipe.repository';
import { StackPipeMap } from '../maps/stack-pipe.map';

const mockRequest = (url: string) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
  };
};

describe('-- Stack Pipe Controller --', () => {
  let service: StackPipeWorkspaceService;
  let unitController: StackPipeWorkspaceController;
  let req: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule, HttpModule],
      controllers: [StackPipeWorkspaceController],
      providers: [
      EntityManager,
      StackPipeMap,
      StackPipeWorkspaceRepository,
      StackPipeWorkspaceService,
      ConfigService,
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    unitController = module.get(StackPipeWorkspaceController);
    service = module.get(StackPipeWorkspaceService);
    req = mockRequest('');
    req.res.setHeader.mockReturnValue();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('* getStackPipesByOrisCode', () => {
    it('Retrieves a list of stacks/pipes by oris code', async () => {
      const list: StackPipeDTO[] = [];
      const expectedResult = {
          items:list
      }
      jest
        .spyOn(service, 'getStackPipesByOrisCode')
        .mockResolvedValue(list);
         expect(await unitController.getStackPipesByOrisCode(null)).toEqual(
        expectedResult,
      );
    });
  });
});
