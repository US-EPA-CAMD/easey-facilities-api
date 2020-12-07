import { Test } from '@nestjs/testing';
import { FacilitiesService } from './facilities.service';
import { FacilitiesRepository } from './facilities.repository';
import { NotFoundException } from '@nestjs/common';
import { FacilityParamsDTO } from './dto/facilitiesParams.dto';

const mockFacilitiesRepository = () => ({
  getFacilities: jest.fn(),
  getFacilityById: jest.fn(),
  numOfFacilitiesPages: jest.fn(),
});

describe('FacilitiesService', () => {
  let facilitiesService;
  let facilitiesRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FacilitiesService,
        { provide: FacilitiesRepository, useFactory: mockFacilitiesRepository },
      ],
    }).compile();

    facilitiesService = await module.get<FacilitiesService>(FacilitiesService);
    facilitiesRepository = await module.get<FacilitiesRepository>(FacilitiesRepository);
  });

  describe('getFacilities', () => {
    it('calls FacilitiesRepository.getFacilities() and gets all facilities from the repository', async () => {
      facilitiesRepository.getFacilities.mockReturnValue('list of facilities');
      facilitiesRepository.numOfFacilitiesPages.mockReturnValue('some number');
      
      const request = {
        res: {
          setHeader: jest.fn(),
        }
      }
      request.res.setHeader.mockReturnValue('some response');

      const params: FacilityParamsDTO = {
        state: 'some state',
        region: 'some region',
        page: 1,
        perPage: 1,
        orderBy: 'some string',
      };

      expect(facilitiesRepository.getFacilities).not.toHaveBeenCalled();
      expect(facilitiesRepository.numOfFacilitiesPages).not.toHaveBeenCalled();
      const result = facilitiesService.getFacilities(params, request);

      expect(facilitiesRepository.getFacilities).toHaveBeenCalled();
      expect(facilitiesRepository.numOfFacilitiesPages).toHaveBeenCalled();
      expect(result).toEqual('list of facilities');
    });
  });

  describe('getFacilityById', () => {
    it('calls facilitiesRepository.getFacilityById() and successfully retrieves and returns the facility', async () => {
      facilitiesRepository.getFacilityById.mockReturnValue('one facility');

      const result = facilitiesService.getFacilityById(1);

      expect(facilitiesRepository.getFacilityById).toHaveBeenCalledWith(1);
      expect(result).toEqual('one facility');
    });

    it('throws an error as facility is not found', () => {
      expect(() => {
        facilitiesService.getFacilityById(12);
      }).toThrow(NotFoundException);
    });
  });

  describe('getFacilityUnits', () => {
    it('returns static data', async () => {
      const result = facilitiesService.getFacilityUnits(1);
      expect(result).toEqual('Hello getFacilityUnits!');
    });
  });

  describe('getFacilityUnitById', () => {
    it('returns static data', async () => {
      const result = facilitiesService.getFacilityUnitById(1, 1);
      expect(result).toEqual('Hello getFacilityUnitById!');
    });
  });

  describe('getFacilityContact', () => {
    it('returns static data', async () => {
      const result = facilitiesService.getFacilityContact(1);
      expect(result).toEqual('Hello getFacilityContact!');
    });
  });
});
