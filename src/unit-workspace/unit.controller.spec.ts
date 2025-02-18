import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { DataSource, EntityManager } from 'typeorm';

import { UnitMap } from '../maps/unit.map';
import { UnitWorkspaceController } from './unit.controller';
import { UnitWorkspaceRepository } from './unit.repository';
import { UnitWorkspaceService } from './unit.service';
import { UnitDTO } from '../dtos/unit.dto';

const mockRequest = (url: string) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
  };
};

describe('-- Unit Controller --', () => {
  let service: UnitWorkspaceService;
  let unitController: UnitWorkspaceController;
  let req: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule, HttpModule],
      controllers: [UnitWorkspaceController],
      providers: [
        EntityManager,
        UnitMap, UnitWorkspaceRepository, UnitWorkspaceService,
        ConfigService,
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    unitController = module.get(UnitWorkspaceController);
    service = module.get(UnitWorkspaceService);
    req = mockRequest('');
    req.res.setHeader.mockReturnValue();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('* getUnitsByOrisCode', () => {
    it('Retrieves a list of units by facility oris code', async () => {
      const unitFacilities: UnitDTO[] = [];
      const expectedResult = {
          items:unitFacilities
      }
      jest
        .spyOn(service, 'getUnitsByOrisCode')
        .mockResolvedValue(unitFacilities);
         expect(await unitController.getUnitsByOrisCode(null)).toEqual(
        expectedResult,
      );
    });
  });
});
