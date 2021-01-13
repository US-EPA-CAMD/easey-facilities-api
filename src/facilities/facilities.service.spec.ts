import { Repository } from 'typeorm';
import { Test } from "@nestjs/testing";

import { FacilityParamsDTO } from '../dtos/facility.params.dto';
import { FacilitiesRepository } from './facilities.repository';
import { FacilitiesService } from './facilities.service';
import { FacilityMap } from '../maps/facility.map';
import { Plant } from '../entities/plant.entity';

const createPlant = (id: number, name: string, orisCode: number, state: string) => {
  const plant = new Plant();
  plant.id = id;
  plant.name = name;
  plant.orisCode = orisCode;
  plant.state = state;
  return plant;
}

describe('-- Facilities Service --', () => {
  let facilitiesRepositoryMock: MockType<Repository<Plant>>;
  let facilitiesService: FacilitiesService;
  let facilityMap = new FacilityMap();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FacilityMap,
        FacilitiesService,
        {
          provide: FacilitiesRepository,
          useFactory: repositoryMockFactory
        },
      ],
    }).compile();

    facilitiesService = module.get(FacilitiesService);
    facilitiesRepositoryMock = module.get(FacilitiesRepository);
  });

  describe('* getFacilities', async () => {
    const plants: Plant[] = [
      createPlant(1000, 'Test Plant 1', 35, 'TX'),
      createPlant(1001, 'Test Plant 2', 656, 'AL'),
      createPlant(1002, 'Test Plant 3', 5676, 'FL'),
      createPlant(1003, 'Test Plant 4', 12456, 'GA'),
    ];
    const facilities = await facilityMap.many(plants);
 
    it('should return array with 4 facilities', async () => {
      const paramsDto: FacilityParamsDTO = new FacilityParamsDTO();
      facilitiesRepositoryMock.findAndCount.mockReturnValue([plants]);
      const results = await facilitiesService.getFacilities(paramsDto, undefined);
      expect(facilitiesRepositoryMock.findAndCount).toHaveBeenCalled();
      expect(results).toStrictEqual(facilities);
    });
  });

  describe('* getFacilityById', () => {
    it('should return a single Facility', async () => {
      const facilityId = 1000;
      const plant = createPlant(facilityId, 'Test Plant', 123456, 'TX');
      const facility = await facilityMap.one(plant);
      facilitiesRepositoryMock.findOne.mockReturnValue(plant);
      expect(await facilitiesService.getFacilityById(facilityId)).toStrictEqual(facility);
    });

    it('should throw NotFoundException if facility not found', async (done) => {
      facilitiesRepositoryMock.findOne.mockReturnValue(undefined);
      await facilitiesService.getFacilityById(-1)
      .then(() => done.fail('Facilities service should return NotFoundException error of 404 but did not'))
      .catch((error) => {
        expect(error.status).toBe(404);
        expect(error.message).toBe('Facility with Id -1 does not exist');
        done();
      });
    });
  });
});

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(),
  findAndCount: jest.fn(),
 }));

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};