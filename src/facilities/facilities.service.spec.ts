import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';

import { FacilityParamsDTO } from '../dtos/facility.params.dto';
import { FacilitiesRepository } from './facilities.repository';
import { FacilitiesService } from './facilities.service';
import { FacilityMap } from '../maps/facility.map';
import { Plant } from '../entities/plant.entity';
import { ProgramYearDimRepository } from './program-year-dim.repository';
import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';
import { ApplicableFacilityAttributesParamsDTO } from '../dtos/applicable-facility-attributes.params.dto';

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
  name: string,
  orisCode: number,
  state: string,
) => {
  const plant = new Plant();
  plant.id = id;
  plant.name = name;
  plant.orisCode = orisCode;
  plant.state = state;
  return plant;
};

const mockPyd = () => ({
  getApplicableFacilityAttributes: jest.fn(),
});

const mockMap = () => ({
  many: jest.fn(),
});

describe('-- Facilities Service --', () => {
  let facilitiesRepositoryMock: MockType<Repository<Plant>>;
  let facilitiesService: FacilitiesService;
  let facilityMap = new FacilityMap();
  let programYearDimRepository;
  let applicableFacilityAttributesMap;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FacilityMap,
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
      ],
    }).compile();

    facilitiesService = module.get(FacilitiesService);
    facilitiesRepositoryMock = module.get(FacilitiesRepository);
    programYearDimRepository = module.get(ProgramYearDimRepository);
    applicableFacilityAttributesMap = module.get(
      ApplicableFacilityAttributesMap,
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
        orderBy: undefined,
        state: undefined,
        region: undefined,
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
        orderBy: undefined,
        state: undefined,
        region: undefined,
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
        orderBy: undefined,
        state: undefined,
        region: undefined,
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
        orderBy: undefined,
        state: undefined,
        region: undefined,
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
        orderBy: undefined,
        state: 'TX',
        region: undefined,
      };
      const plants = plantList.filter(p => (p.state = paramsDto.state));
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
          expect(error.message).toBe('Facility with Id -1 does not exist');
          done();
        });
    });
  });

  describe('* getApplicableFacilityAtrributes', () => {
    it('should return a list of Applicable Facilities Attributes', async () => {
      const expectedResult: ApplicableFacilityAttributesDTO[] = [];
      const params: ApplicableFacilityAttributesParamsDTO = {
        year: [2016, 2017],
      };
      programYearDimRepository.getApplicableFacilityAttributes.mockResolvedValue(
        'entities',
      );
      applicableFacilityAttributesMap.many.mockResolvedValue(expectedResult);

      expect(
        await facilitiesService.getApplicableFacilityAtrributes(params),
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
