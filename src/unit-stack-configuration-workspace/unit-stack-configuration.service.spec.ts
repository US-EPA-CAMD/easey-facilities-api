import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';

import { UnitStackConfiguration } from '../entities/workspace/unit-stack-configuration.entity';
import { UnitStackConfigurationMap } from '../maps/unit-stack-configuration.map';
import { UnitStackConfigurationWorkspaceRepository } from './unit-stack-configuration.repository';
import { UnitStackConfigurationWorkspaceService } from './unit-stack-configuration.service';

const mockRepository = () => ({
  find: jest.fn().mockResolvedValue(''),
  findBy: jest.fn().mockResolvedValue(''),
  findOneBy: jest.fn().mockResolvedValue(''),
  update: jest.fn().mockResolvedValue(true),
});

const mockUnitStackConfiguration = (
  id: string,
  unitId: number,
  stackPipeId: string,
) => {
  const unitStackConfig = new UnitStackConfiguration();
  unitStackConfig.id = id;
  unitStackConfig.unitId = unitId;
  unitStackConfig.stackPipeId = stackPipeId;
  return unitStackConfig;
};

describe('UnitStackConfiguration Workspace Tests', () => {
  const map = new UnitStackConfigurationMap();
  let service: UnitStackConfigurationWorkspaceService;
  let repository: UnitStackConfigurationWorkspaceRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        UnitStackConfigurationMap,
        {
          provide: UnitStackConfigurationWorkspaceRepository,
          useFactory: mockRepository,
        },
        UnitStackConfigurationWorkspaceService,
      ],
    }).compile();

    repository = module.get(UnitStackConfigurationWorkspaceRepository);
    service = module.get(UnitStackConfigurationWorkspaceService);
  });

  describe('getUnitStackConfigurations', () => {
    const unitStackConfigList: UnitStackConfiguration[] = new Array(16)
      .fill(null)
      .map((_, i) =>
        mockUnitStackConfiguration(`${i + 1}`, (i + 1) % 4, `${i + 1}`),
      );
    it('should return array with all unitStackConfigs for a facility', async () => {
      const unitStackConfigs = unitStackConfigList.filter(u => u.unitId === 2);
      const unitStackConfigsDto = await map.many(unitStackConfigs);
      jest.spyOn(repository, 'find').mockResolvedValue(unitStackConfigs);
      const results = await service.getUnitStackConfigurationsByOrisCode(5);
      expect(results).toStrictEqual(unitStackConfigsDto);
    });
  });
});
