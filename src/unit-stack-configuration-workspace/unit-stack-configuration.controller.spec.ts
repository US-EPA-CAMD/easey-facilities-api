import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { DataSource, EntityManager } from 'typeorm';

import { UnitStackConfigurationWorkspaceService } from './unit-stack-configuration.service';
import { UnitStackConfigurationDTO } from '../dtos/unit-stack-configuration.dto';
import { UnitStackConfigurationWorkspaceController } from './unit-stack-configuration.controller';
import { UnitStackConfigurationMap } from '../maps/unit-stack-configuration.map';
import { UnitStackConfigurationWorkspaceRepository } from './unit-stack-configuration.repository';

const mockRequest = (url: string) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
  };
};

describe('-- Unit Stack Configuration Controller --', () => {
  let service: UnitStackConfigurationWorkspaceService;
  let unitController: UnitStackConfigurationWorkspaceController;
  let req: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule, HttpModule],
      controllers: [UnitStackConfigurationWorkspaceController],
      providers: [
        EntityManager,
        UnitStackConfigurationMap,
        UnitStackConfigurationWorkspaceRepository,
        UnitStackConfigurationWorkspaceService,
        ConfigService,
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    unitController = module.get(UnitStackConfigurationWorkspaceController);
    service = module.get(UnitStackConfigurationWorkspaceService);
    req = mockRequest('');
    req.res.setHeader.mockReturnValue();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('* getStackPipesByOrisCode', () => {
    it('Retrieves a list of unit stack configurations by oris code', async () => {
      const list: UnitStackConfigurationDTO[] = [];
      const expectedResult = {
          items:list
      }
      jest
        .spyOn(service, 'getUnitStackConfigurationsByOrisCode')
        .mockResolvedValue(list);
         expect(await unitController.getUnitStackConfigurationsByOrisCode(null)).toEqual(
        expectedResult,
      );
    });
  });
});
