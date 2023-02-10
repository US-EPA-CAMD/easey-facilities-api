import { Test } from '@nestjs/testing';

import { LoggerModule } from '@us-epa-camd/easey-common/logger';

import { FacilitiesRepository } from '../facilities/facilities.repository';
import { FacilitiesWorkspaceController } from './facilities.controller';
import { FacilitiesWorkspaceService } from './facilities.service';
import { FacilityDTO } from '../dtos/facility.dto';
import { FacilityMap } from '../maps/facility.map';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';
import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';
import { FacilityAttributesMap } from '../maps/facility-attributes.map';
import { FacilityUnitAttributesRepository } from '../facilities/facility-unit-attributes.repository';
import { FacilityAttributesDTO } from '../dtos/facility-attributes.dto';
import { UnitFactRepository } from '../facilities/unit-fact.repository';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

const mockRequest = (url: string) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
  };
};

describe('-- Facilities Controller --', () => {
  let facilitiesController: FacilitiesWorkspaceController;
  let facilitiesService: FacilitiesWorkspaceService;
  let req: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule, HttpModule],
      controllers: [FacilitiesWorkspaceController],
      providers: [
        FacilityMap,
        ApplicableFacilityAttributesMap,
        FacilityAttributesMap,
        FacilitiesWorkspaceService,
        UnitFactRepository,
        FacilitiesRepository,
        FacilityUnitAttributesRepository,
        ConfigService,
      ],
    }).compile();

    facilitiesController = module.get(FacilitiesWorkspaceController);
    facilitiesService = module.get(FacilitiesWorkspaceService);
    req = mockRequest('');
    req.res.setHeader.mockReturnValue();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('* getFacilities', () => {
    it('should return a list of Facilities', async () => {
      const expectedResult: FacilityDTO[] = [];
      jest
        .spyOn(facilitiesService, 'getFacilities')
        .mockResolvedValue(expectedResult);
      expect(await facilitiesController.getFacilities(null, null, null)).toBe(
        expectedResult,
      );
    });
  });

  describe('* getFacilityById', () => {
    it('should return a single Facility', async () => {
      const expectedResult = new FacilityDTO();
      jest
        .spyOn(facilitiesService, 'getFacilityById')
        .mockResolvedValue(expectedResult);
      expect(await facilitiesController.getFacilityById(-1)).toBe(
        expectedResult,
      );
    });
  });

  describe('* getApplicableFacilityAtrributes', () => {
    it('should return a list of Applicable Facilities Attributes', async () => {
      const expectedResult: ApplicableFacilityAttributesDTO[] = [];
      jest
        .spyOn(facilitiesService, 'getApplicableFacilityAttributes')
        .mockResolvedValue(expectedResult);
      expect(
        await facilitiesController.getApplicableFacilityAttributes(null, null),
      ).toBe(expectedResult);
    });
  });

  describe('* getAllFacilityAttributes', () => {
    it('should return a list of All Facilities Attributes', async () => {
      const expectedResult: FacilityAttributesDTO[] = [];
      jest
        .spyOn(facilitiesService, 'getAllFacilityAttributes')
        .mockResolvedValue(expectedResult);
      expect(
        await facilitiesController.getAllFacilityAttributes(null, req, null),
      ).toBe(expectedResult);
    });
  });
});
