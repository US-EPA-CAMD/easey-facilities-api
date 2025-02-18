import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { DataSource, EntityManager } from 'typeorm';

import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';
import { FacilityAttributesDTO } from '../dtos/facility-attributes.dto';
import { FacilityDTO } from '../dtos/facility.dto';
import { FacilitiesRepository } from '../facilities/facilities.repository';
import { FacilityUnitAttributesRepository } from '../facilities/facility-unit-attributes.repository';
import { UnitFactRepository } from '../facilities/unit-fact.repository';
import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';
import { FacilityAttributesMap } from '../maps/facility-attributes.map';
import { FacilityMap } from '../maps/facility.map';
import { FacilitiesWorkspaceController } from './facilities.controller';
import { FacilitiesWorkspaceService } from './facilities.service';

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
        EntityManager,
        FacilityMap,
        ApplicableFacilityAttributesMap,
        FacilityAttributesMap,
        FacilitiesWorkspaceService,
        UnitFactRepository,
        FacilitiesRepository,
        FacilityUnitAttributesRepository,
        ConfigService,
        {
          provide: DataSource,
          useValue: {},
        },
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
      const facilities: FacilityDTO[] = [];
      const expectedResult = {
        items:facilities
      }
      jest
        .spyOn(facilitiesService, 'getFacilities')
        .mockResolvedValue(facilities);
      expect(await facilitiesController.getFacilities(null, null, null)).toEqual(
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
      const applicableFacilities: ApplicableFacilityAttributesDTO[] = [];
      const expectedResult = {
        items:applicableFacilities
      }
      jest
        .spyOn(facilitiesService, 'getApplicableFacilityAttributes')
        .mockResolvedValue(applicableFacilities);
      expect(
        await facilitiesController.getApplicableFacilityAttributes(null, null),
      ).toEqual(expectedResult);
    });
  });

  describe('* getAllFacilityAttributes', () => {
    it('should return a list of All Facilities Attributes', async () => {
      const unitFacilities: FacilityAttributesDTO[] = [];
      const expectedResult = {
        items:unitFacilities
      }
      jest
        .spyOn(facilitiesService, 'getAllFacilityAttributes')
        .mockResolvedValue(unitFacilities);
      expect(
        await facilitiesController.getAllFacilityAttributes(null, req, null),
      ).toEqual(expectedResult);
    });
  });
});
