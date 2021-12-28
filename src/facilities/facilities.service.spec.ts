import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';

import {
  State,
  UnitType,
  UnitFuelType,
  ControlTechnology,
  Program,
  SourceCategory,
} from '@us-epa-camd/easey-common/enums';

import { FacilityParamsDTO } from '../dtos/facility.params.dto';
import { FacilitiesRepository } from './facilities.repository';
import { FacilitiesService } from './facilities.service';
import { FacilityMap } from '../maps/facility.map';
import { Plant } from '../entities/plant.entity';
import { ProgramYearDimRepository } from './program-year-dim.repository';
import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';
import { ApplicableFacilityAttributesParamsDTO } from '../dtos/applicable-facility-attributes.params.dto';
import { FacilityAttributesMap } from '../maps/facility-attributes.map';
import { FacilityUnitAttributesRepository } from './facility-unit-attributes.repository';
import { FacilityAttributesDTO } from '../dtos/facility-attributes.dto';
import { FacilityAttributesParamsDTO } from '../dtos/facility-attributes.param.dto';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';

const mockRequest = (url: string) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
  };
};

const mockPlant = (
  id: number,
  facilityName: string,
  facilityId: number,
  stateCode: string,
) => {
  const plant = new Plant();
  plant.id = id;
  plant.facilityName = facilityName;
  plant.facilityId = facilityId;
  plant.stateCode = stateCode;
  return plant;
};

const mockPyd = () => ({
  getApplicableFacilityAttributes: jest.fn(),
});

const mockFua = () => ({
  getAllFacilityAttributes: jest.fn(),
});

const mockMap = () => ({
  many: jest.fn(),
});

describe('-- Facilities Service --', () => {
  let facilitiesRepositoryMock: MockType<Repository<Plant>>;
  let facilitiesService: FacilitiesService;
  const facilityMap = new FacilityMap();
  let programYearDimRepository;
  let applicableFacilityAttributesMap;
  let facilityUnitAttributesRepository;
  let facilityAttributesMap;
  let req: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        FacilityMap,
        FacilityAttributesMap,
        FacilitiesService,
        {
          provide: FacilitiesRepository,
          useFactory: repositoryMockFactory,
        },
        {
          provide: ProgramYearDimRepository,
          useFactory: mockPyd,
        },
        {
          provide: ApplicableFacilityAttributesMap,
          useFactory: mockMap,
        },
        {
          provide: FacilityAttributesMap,
          useFactory: mockMap,
        },
        {
          provide: FacilityUnitAttributesRepository,
          useFactory: mockFua,
        },
      ],
    }).compile();

    facilitiesService = module.get(FacilitiesService);
    facilitiesRepositoryMock = module.get(FacilitiesRepository);
    programYearDimRepository = module.get(ProgramYearDimRepository);
    applicableFacilityAttributesMap = module.get(
      ApplicableFacilityAttributesMap,
    );
    facilityAttributesMap = module.get(FacilityAttributesMap);
    facilityUnitAttributesRepository = module.get(
      FacilityUnitAttributesRepository,
    );
  });

  describe('* getFacilities', () => {
    let n = 1;
    const plantList: Plant[] = [
      mockPlant(n, `Test Plant ${n}`, n++, 'TX'),
      mockPlant(n, `Test Plant ${n}`, n++, 'AL'),
      mockPlant(n, `Test Plant ${n}`, n++, 'FL'),
      mockPlant(n, `Test Plant ${n}`, n++, 'GA'),
      mockPlant(n, `Test Plant ${n}`, n++, 'TX'),
      mockPlant(n, `Test Plant ${n}`, n++, 'AL'),
      mockPlant(n, `Test Plant ${n}`, n++, 'FL'),
      mockPlant(n, `Test Plant ${n}`, n++, 'GA'),
      mockPlant(n, `Test Plant ${n}`, n++, 'TX'),
      mockPlant(n, `Test Plant ${n}`, n++, 'AL'),
      mockPlant(n, `Test Plant ${n}`, n++, 'FL'),
      mockPlant(n, `Test Plant ${n}`, n++, 'GA'),
      mockPlant(n, `Test Plant ${n}`, n++, 'TX'),
      mockPlant(n, `Test Plant ${n}`, n++, 'AL'),
      mockPlant(n, `Test Plant ${n}`, n++, 'FL'),
      mockPlant(n, `Test Plant ${n}`, n++, 'GA'),
    ];
    let totalCount = plantList.length;

    it('should return array with all facilities', async () => {
      const paramsDto: FacilityParamsDTO = new FacilityParamsDTO();
      const facilities = await facilityMap.many(plantList);
      facilitiesRepositoryMock.findAndCount.mockReturnValue([
        plantList,
        totalCount,
      ]);
      const results = await facilitiesService.getFacilities(
        paramsDto,
        undefined,
      );
      //expect(facilitiesRepositoryMock.findAndCount).toHaveBeenCalled();
      expect(results).toStrictEqual(facilities);
    });

    it('should return 1-4 of 16 facilities', async () => {
      const page = 1;
      const perPage = 4;
      const end = page * perPage;
      const start = page * perPage - perPage + 1;
      const req: any = mockRequest(
        `/facilities?page=${page}&perPage=${perPage}`,
      );
      req.res.setHeader.mockReturnValue();
      const paramsDto: FacilityParamsDTO = {
        page: page,
        perPage: perPage,
        stateCode: undefined,
        epaRegion: undefined,
      };
      const plants = plantList.slice(start, end);
      const facilities = await facilityMap.many(plants);
      facilitiesRepositoryMock.findAndCount.mockReturnValue([
        plants,
        totalCount,
      ]);
      const results = await facilitiesService.getFacilities(paramsDto, req);
      //expect(facilitiesRepositoryMock.findAndCount).toHaveBeenCalled();
      expect(results).toStrictEqual(facilities);
    });

    it('should return 5-8 of 16 facilities', async () => {
      const page = 2;
      const perPage = 4;
      const end = page * perPage;
      const start = page * perPage - perPage + 1;
      const req: any = mockRequest(
        `/facilities?page=${page}&perPage=${perPage}`,
      );
      req.res.setHeader.mockReturnValue();
      const paramsDto: FacilityParamsDTO = {
        page: page,
        perPage: perPage,
        stateCode: undefined,
        epaRegion: undefined,
      };
      const plants = plantList.slice(start, end);
      const facilities = await facilityMap.many(plants);
      facilitiesRepositoryMock.findAndCount.mockReturnValue([
        plants,
        totalCount,
      ]);
      const results = await facilitiesService.getFacilities(paramsDto, req);
      //expect(facilitiesRepositoryMock.findAndCount).toHaveBeenCalled();
      expect(results).toStrictEqual(facilities);
    });

    it('should return 9-12 of 16 facilities', async () => {
      const page = 3;
      const perPage = 4;
      const end = page * perPage;
      const start = page * perPage - perPage + 1;
      const req: any = mockRequest(
        `/facilities?page=${page}&perPage=${perPage}`,
      );
      req.res.setHeader.mockReturnValue();
      const paramsDto: FacilityParamsDTO = {
        page: page,
        perPage: perPage,
        stateCode: undefined,
        epaRegion: undefined,
      };
      const plants = plantList.slice(start, end);
      const facilities = await facilityMap.many(plants);
      facilitiesRepositoryMock.findAndCount.mockReturnValue([
        plants,
        totalCount,
      ]);
      const results = await facilitiesService.getFacilities(paramsDto, req);
      //expect(facilitiesRepositoryMock.findAndCount).toHaveBeenCalled();
      expect(results).toStrictEqual(facilities);
    });

    it('should return 13-16 of 16 facilities', async () => {
      const page = 4;
      const perPage = 4;
      const end = page * perPage;
      const start = page * perPage - perPage + 1;
      const req: any = mockRequest(
        `/facilities?page=${page}&perPage=${perPage}`,
      );
      req.res.setHeader.mockReturnValue();
      const paramsDto: FacilityParamsDTO = {
        page: page,
        perPage: perPage,
        stateCode: undefined,
        epaRegion: undefined,
      };
      const plants = plantList.slice(start, end);
      const facilities = await facilityMap.many(plants);
      facilitiesRepositoryMock.findAndCount.mockReturnValue([
        plants,
        totalCount,
      ]);
      const results = await facilitiesService.getFacilities(paramsDto, req);
      //expect(facilitiesRepositoryMock.findAndCount).toHaveBeenCalled();
      expect(results).toStrictEqual(facilities);
    });

    it('should return array with 4 facilities in TX', async () => {
      const paramsDto: FacilityParamsDTO = {
        page: undefined,
        perPage: undefined,
        stateCode: 'TX',
        epaRegion: undefined,
      };
      const plants = plantList.filter(p => (p.stateCode = paramsDto.stateCode));
      totalCount = plants.length;
      const facilities = await facilityMap.many(plants);
      facilitiesRepositoryMock.findAndCount.mockReturnValue([
        plants,
        totalCount,
      ]);
      const results = await facilitiesService.getFacilities(
        paramsDto,
        undefined,
      );
      //expect(facilitiesRepositoryMock.findAndCount).toHaveBeenCalled();
      expect(results).toStrictEqual(facilities);
    });
  });

  describe('* getFacilityById', () => {
    it('should return a single Facility', async () => {
      const facilityId = 1000;
      const plant = mockPlant(facilityId, 'Test Plant', 123456, 'TX');
      const facility = await facilityMap.one(plant);
      facilitiesRepositoryMock.findOne.mockReturnValue(plant);
      expect(await facilitiesService.getFacilityById(facilityId)).toStrictEqual(
        facility,
      );
    });

    it('should throw NotFoundException if facility not found', async done => {
      facilitiesRepositoryMock.findOne.mockReturnValue(undefined);
      await facilitiesService
        .getFacilityById(-1)
        .then(() =>
          done.fail(
            'Facilities service should return NotFoundException error of 404 but did not',
          ),
        )
        .catch(error => {
          expect(error.status).toBe(404);
          expect(error.message).toBe('Facility id does not exist');
          done();
        });
    });
  });

  describe('* getApplicableFacilityAtrributes', () => {
    it('should return a list of Applicable Facilities Attributes', async () => {
      const expectedResult: ApplicableFacilityAttributesDTO[] = [];
      const params: ApplicableFacilityAttributesParamsDTO = new ApplicableFacilityAttributesParamsDTO();
      params.year = [2016, 2017];

      programYearDimRepository.getApplicableFacilityAttributes.mockResolvedValue(
        'entities',
      );
      applicableFacilityAttributesMap.many.mockResolvedValue(expectedResult);

      expect(
        await facilitiesService.getApplicableFacilityAttributes(params),
      ).toBe(expectedResult);
    });
  });

  describe('* getAllFacilityAtrributes', () => {
    it('should return a list of All Facilities Attributes', async () => {
      const expectedResult: FacilityAttributesDTO[] = [];
      const params: FacilityAttributesParamsDTO = new FacilityAttributesParamsDTO();
      params.page = undefined;
      params.perPage = undefined;
      params.year = [2019];
      params.stateCode = [State.TX];
      params.facilityId = [3];
      params.unitType = [
        UnitType.BUBBLING_FLUIDIZED,
        UnitType.ARCH_FIRE_BOILER,
      ];
      params.unitFuelType = [UnitFuelType.COAL, UnitFuelType.DIESEL_OIL];
      params.controlTechnologies = [
        ControlTechnology.ADDITIVES_TO_ENHANCE,
        ControlTechnology.OTHER,
      ];
      params.programCodeInfo = [Program.ARP, Program.RGGI];
      params.sourceCategory = [SourceCategory.AUTOMOTIVE_STAMPINGS];

      const req: any = mockRequest(
        `/facilities/attributes?page=${params.page}&perPage=${params.perPage}`,
      );
      facilityUnitAttributesRepository.getAllFacilityAttributes.mockResolvedValue(
        'entities',
      );
      facilityAttributesMap.many.mockResolvedValue(expectedResult);

      expect(
        await facilitiesService.getAllFacilityAttributes(params, req),
      ).toBe(expectedResult);
    });
  });
});

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn(),
    findAndCount: jest.fn(),
  }),
);

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};
