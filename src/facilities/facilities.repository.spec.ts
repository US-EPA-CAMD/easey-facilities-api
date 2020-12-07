import { Test } from '@nestjs/testing';
import { FacilitiesRepository } from './facilities.repository';
import { FacilityParamsDTO } from './dto/facilitiesParams.dto';
import { FacilityDTO } from './dto/facility.dto';

describe('FacilitiesRepository', () => {
  let facilitiesRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FacilitiesRepository],
    }).compile();

    facilitiesRepository = await module.get<FacilitiesRepository>(
      FacilitiesRepository,
    );
  });

  describe('getFacilities', () => {
    it('gets all static data facilities from the repository', async () => {
      const params: FacilityParamsDTO = {
        state: 'some state',
        region: 'some region',
        page: 1,
        perPage: 1,
        orderBy: 'some string',
      };
      const result = facilitiesRepository.getFacilities(params);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getFacilityById', () => {
    it('searches static data and returns the facility', async () => {
      const result = facilitiesRepository.getFacilityById(1);
      expect(result).toBeInstanceOf(FacilityDTO);
    });
  });

  describe('numOfFacilitiesPages', () => {
    it('calculates how many pages there will be given what perPage is', async () => {
      const params: FacilityParamsDTO = {
        state: 'some state',
        region: 'some region',
        page: 2,
        perPage: 3,
        orderBy: 'some string',
      };

      const result = facilitiesRepository.numOfFacilitiesPages(params);
      expect(result).toBe(4);

    });
  });
});
