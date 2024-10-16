import { Test } from '@nestjs/testing';
import {
  ControlTechnology,
  Program,
  SourceCategory,
  State,
  UnitFuelType,
  UnitType,
} from '@us-epa-camd/easey-common/enums';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';
import { EntityManager, SelectQueryBuilder } from 'typeorm';

import { PaginatedFacilityAttributesParamsDTO } from '../dtos/facility-attributes.param.dto';
import { FacilityUnitAttributes } from '../entities/vw-facility-unit-attributes.entity';
import { FacilityUnitAttributesRepository } from './facility-unit-attributes.repository';

const mockQueryBuilder = () => ({
  andWhere: jest.fn(),
  getMany: jest.fn(),
  getManyAndCount: jest.fn(),
  select: jest.fn(),
  orderBy: jest.fn(),
  addOrderBy: jest.fn(),
  getCount: jest.fn(),
  skip: jest.fn(),
  take: jest.fn(),
  getQueryAndParameters: jest.fn(),
});

const mockRequest = (url: string) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
  };
};

const filters: PaginatedFacilityAttributesParamsDTO = new PaginatedFacilityAttributesParamsDTO();
filters.page = undefined;
filters.perPage = undefined;
filters.year = [2019];
filters.stateCode = [State.TX];
filters.facilityId = [3];
filters.unitType = [UnitType.BUBBLING_FLUIDIZED, UnitType.ARCH_FIRE_BOILER];
filters.unitFuelType = [UnitFuelType.COAL, UnitFuelType.DIESEL_OIL];
filters.controlTechnologies = [
  ControlTechnology.ADDITIVES_TO_ENHANCE,
  ControlTechnology.OTHER,
];
filters.programCodeInfo = [Program.ARP, Program.RGGI];
filters.sourceCategory = [SourceCategory.AUTOMOTIVE_STAMPINGS];

describe('FacilityUnitAttributesRepository', () => {
  let facilityUnitAttributesRepository: FacilityUnitAttributesRepository;
  let queryBuilder: any;
  let req: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EntityManager,
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
    req = mockRequest('');
    req.res.setHeader.mockReturnValue();

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
    queryBuilder.getManyAndCount.mockReturnValue(['mockFacilityAttributes', 0]);
    queryBuilder.getQueryAndParameters.mockReturnValue('');
  });

  describe('getAllFacilityAttributes', () => {
    it('calls createQueryBuilder and gets all facility attributes from the repository', async () => {
      // branch coverage
      const emptyFilters: PaginatedFacilityAttributesParamsDTO = new PaginatedFacilityAttributesParamsDTO();
      let result = await facilityUnitAttributesRepository.getAllFacilityAttributes(
        emptyFilters,
        req,
      );

      result = await facilityUnitAttributesRepository.getAllFacilityAttributes(
        filters,
        req,
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
        req,
      );

      expect(ResponseHeaders.setPagination).toHaveBeenCalled();
      expect(paginatedResult).toEqual('mockFacilityAttributes');
    });
  });

  describe('lastArchivedYear', () => {
    it('returns the last archived year', async () => {
      const archivedYear = [{ year: 2016 }];
      facilityUnitAttributesRepository.query = jest
        .fn()
        .mockReturnValue(archivedYear);
      const year = await facilityUnitAttributesRepository.lastArchivedYear();
      expect(facilityUnitAttributesRepository.query).toHaveBeenCalled();
      expect(year).toEqual(2016);
    });
  });
});
