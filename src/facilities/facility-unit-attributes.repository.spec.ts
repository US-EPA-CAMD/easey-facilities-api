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

  describe('buildQuery — control-technology SQL composition (TT6897 regression)', () => {
    // buildQuery inlines its control-tech WHERE clause as a plain
    // concatenated SQL string and passes it directly to
    // `query.andWhere(string)`. The existing spec mocks createQueryBuilder,
    // so there is no real SelectQueryBuilder to call .getSql() on — but the
    // captured first-argument of andWhere IS the same SQL fragment that
    // .getSql() / .getQueryAndParameters() would surface for this clause
    // (the Regex.pipeDelimited output is baked into the string before
    // TypeORM ever sees it). These assertions operate purely on the captured
    // SQL string — no DB connection required.
    const findControlTechClause = (): string | undefined =>
      queryBuilder.andWhere.mock.calls
        .map((call: any[]) => call[0])
        .find(
          (arg: any) =>
            typeof arg === 'string' && arg.includes('so2ControlInfo'),
        );

    it('emits pipe-delimited regex for a single control-tech filter and never comma-delimited', async () => {
      const ctFilters = new PaginatedFacilityAttributesParamsDTO();
      ctFilters.controlTechnologies = [
        ControlTechnology.SELECTIVE_NON_CATALYTIC,
      ];

      await facilityUnitAttributesRepository.getAllFacilityAttributes(
        ctFilters,
        req,
      );

      const clause = findControlTechClause();
      expect(clause).toBeDefined();
      // Pipe-delimited alternation marker produced by Regex.pipeDelimited:
      expect(clause).toContain('[|]');
      // Regression guard against accidental revert to Regex.commaDelimited:
      expect(clause).not.toContain('[,]');
    });

    it('emits pipe-delimited alternation for every value in a multi-select union, wrapped in an OR group', async () => {
      const ctFilters = new PaginatedFacilityAttributesParamsDTO();
      ctFilters.controlTechnologies = [
        ControlTechnology.SELECTIVE_NON_CATALYTIC,
        ControlTechnology.SELECTIVE_CATALYTIC,
      ];

      await facilityUnitAttributesRepository.getAllFacilityAttributes(
        ctFilters,
        req,
      );

      const clause = findControlTechClause();
      expect(clause).toBeDefined();
      // Both filter values appear in the clause (buildQuery uppercases the
      // filter text before passing it into pipeDelimited):
      expect(clause).toContain('SELECTIVE NON-CATALYTIC REDUCTION');
      expect(clause).toContain('SELECTIVE CATALYTIC REDUCTION');
      // Pipe-delimited alternation present, comma-delimited absent:
      expect(clause).toContain('[|]');
      expect(clause).not.toContain('[,]');
      // Union semantics: parenthesized OR group wrapping the branches.
      const trimmed = (clause as string).trim();
      expect(trimmed.startsWith('(')).toBe(true);
      expect(trimmed.endsWith(')')).toBe(true);
      expect(clause).toContain(' OR ');
    });

    it('does not emit a control-tech clause when the filter is absent', async () => {
      const ctFilters = new PaginatedFacilityAttributesParamsDTO();
      // controlTechnologies intentionally left undefined — this is the
      // realistic "no filter provided" DTO shape. (Literal [] is truthy in
      // JS and would fall through the current
      // `if (params.controlTechnologies)` guard in buildQuery, producing an
      // empty-grouping andWhere call; that edge case is out of scope for
      // TT6897 Required #2.)

      await facilityUnitAttributesRepository.getAllFacilityAttributes(
        ctFilters,
        req,
      );

      expect(findControlTechClause()).toBeUndefined();
    });

    it('references all four *ControlInfo columns in the emitted clause', async () => {
      const ctFilters = new PaginatedFacilityAttributesParamsDTO();
      ctFilters.controlTechnologies = [
        ControlTechnology.SELECTIVE_NON_CATALYTIC,
      ];

      await facilityUnitAttributesRepository.getAllFacilityAttributes(
        ctFilters,
        req,
      );

      const clause = findControlTechClause();
      expect(clause).toBeDefined();
      expect(clause).toContain('fua.so2ControlInfo');
      expect(clause).toContain('fua.noxControlInfo');
      expect(clause).toContain('fua.pmControlInfo');
      expect(clause).toContain('fua.hgControlInfo');
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
