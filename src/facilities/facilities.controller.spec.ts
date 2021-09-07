import { Test } from "@nestjs/testing";

import { FacilitiesRepository } from "./facilities.repository";
import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { FacilityDTO } from '../dtos/facility.dto';
import { FacilityMap } from './../maps/facility.map';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';

describe('-- Facilities Controller --', () => {
  let facilitiesController: FacilitiesController;
  let facilitiesService: FacilitiesService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
        controllers: [FacilitiesController],
        providers: [
          FacilityMap,
          FacilitiesService,
          FacilitiesRepository,
        ],
      }).compile();

      facilitiesController = module.get(FacilitiesController);
      facilitiesService = module.get(FacilitiesService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('* getFacilities', () => {
    it('should return a list of Facilities', async () => {
      const expectedResult: FacilityDTO[] = [];
      jest.spyOn(facilitiesService, 'getFacilities').mockResolvedValue(expectedResult);
      expect(await facilitiesController.getFacilities(null, null)).toBe(expectedResult);
    });
  });

  describe('* getFacilityById', () => {
    it('should return a single Facility', async () => {
      const expectedResult = new FacilityDTO();
      jest.spyOn(facilitiesService, 'getFacilityById').mockResolvedValue(expectedResult);
      expect(await facilitiesController.getFacilityById(-1)).toBe(expectedResult);
    });
  });

  describe('* getApplicableFacilityAtrributes', () => {
    it('should return a list of Applicable Facilities Attributes', async () => {
      const expectedResult: ApplicableFacilityAttributesDTO[] = [];
      jest.spyOn(facilitiesService, 'getApplicableFacilityAtrributes').mockResolvedValue(expectedResult);
      expect(await facilitiesController.getApplicableFacilityAtrributes(null)).toBe(expectedResult);
    });
  });
 });