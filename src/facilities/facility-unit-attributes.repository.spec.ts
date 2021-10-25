import { Test } from '@nestjs/testing';
import { SelectQueryBuilder } from 'typeorm';

import {
  State,
  UnitType,
  UnitFuelType,
  ControlTechnology,
  Program,
  SourceCategory,
} from '@us-epa-camd/easey-common/enums';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { FacilityAttributesParamsDTO } from '../dtos/facility-attributes.param.dto';
import { FacilityUnitAttributesRepository } from './facility-unit-attributes.repository';
import { FacilityUnitAttributes } from '../entities/vw-facility-unit-attributes.entity';

const mockQueryBuilder = () => ({
  andWhere: jest.fn(),
  getMany: jest.fn(),
  select: jest.fn(),
  orderBy: jest.fn(),
  addOrderBy: jest.fn(),
  getCount: jest.fn(),
  skip: jest.fn(),
  take: jest.fn(),
});

const filters: FacilityAttributesParamsDTO = {
  page: undefined,
  perPage: undefined,
  year: [2019],
  state: [State.TX],
  facilityId: [3],
  unitType: [UnitType.BUBBLING_FLUIDIZED, UnitType.ARCH_FIRE_BOILER],
  unitFuelType: [UnitFuelType.COAL, UnitFuelType.DIESEL_OIL],
  controlTechnologies: [
    ControlTechnology.ADDITIVES_TO_ENHANCE,
    ControlTechnology.OTHER,
  ],
  programCodeInfo: [Program.ARP, Program.RGGI],
  sourceCategory: [SourceCategory.AUTOMOTIVE_STAMPINGS],
};

describe('FacilityUnitAttributesRepository', () => {
  let facilityUnitAttributesRepository;
  let queryBuilder;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FacilityUnitAttributesRepository,
        { provide: SelectQueryBuilder, useFactory: mockQueryBuilder },
      ],
    }).compile();

    facilityUnitAttributesRepository = module.get<
      FacilityUnitAttributesRepository
    >(FacilityUnitAttributesRepository);
    queryBuilder = module.get<SelectQueryBuilder<FacilityUnitAttributes>>(
      SelectQueryBuilder,
    );

    facilityUnitAttributesRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(queryBuilder);
    queryBuilder.select.mockReturnValue(queryBuilder);
    queryBuilder.andWhere.mockReturnValue(queryBuilder);
    queryBuilder.orderBy.mockReturnValue(queryBuilder);
    queryBuilder.addOrderBy.mockReturnValue(queryBuilder);
    queryBuilder.skip.mockReturnValue(queryBuilder);
    queryBuilder.take.mockReturnValue('mockPagination');
    queryBuilder.getCount.mockReturnValue('mockCount');
    queryBuilder.getMany.mockReturnValue('mockFacilityAttributes');
  });

  describe('getAllFacilityAttributes', () => {
    it('calls createQueryBuilder and gets all facility attributes from the repository', async () => {
      // branch coverage
      const emptyFilters: FacilityAttributesParamsDTO = new FacilityAttributesParamsDTO();
      let result = await facilityUnitAttributesRepository.getAllFacilityAttributes(
        emptyFilters,
      );

      result = await facilityUnitAttributesRepository.getAllFacilityAttributes(
        filters,
      );

      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockFacilityAttributes');
    });

    it('calls createQueryBuilder and gets all facility attributes paginated results from the repository', async () => {
      ResponseHeaders.setPagination = jest
        .fn()
        .mockReturnValue('paginated results');

      const paginatedFilters = filters;
      paginatedFilters.page = 1;
      paginatedFilters.perPage = 10;

      const paginatedResult = await facilityUnitAttributesRepository.getAllFacilityAttributes(
        paginatedFilters,
      );

      expect(ResponseHeaders.setPagination).toHaveBeenCalled();
      expect(paginatedResult).toEqual('mockFacilityAttributes');
    });
  });
});
