import { Test } from "@nestjs/testing";

import { FacilitiesRepository } from "./facilities.repository";
import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { FacilityMap } from './../maps/facility.map';
import { FacilityDTO } from '../dtos/facility.dto';

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

    facilitiesService = module.get<FacilitiesService>(FacilitiesService);
    facilitiesController = module.get(FacilitiesController);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // describe('getFacilities', () => {
  //   it('should return an array of Facilities', async () => {
  //     const result = new Promise<FacilityDTO[]>(() => new FacilityDTO[0]);
  //     jest.spyOn(facilitiesService, 'getFacilities').mockImplementation(() => result);
  //     expect(await facilitiesController.getFacilities(new FacilityParamsDTO(), request)).toBe(result);
  //   });
  // });

  describe('* Get Facility By Id', () => {
    it('should return a single Facility', async () => {
      const expectedResult = new FacilityDTO();
      const mockNumberToSatisfyParameters = 0;
      jest.spyOn(facilitiesService, 'getFacilityById').mockResolvedValue(expectedResult);
      expect(await facilitiesController.getFacilityById(mockNumberToSatisfyParameters)).toBe(expectedResult);
    });
  });

  // it("should throw NotFoundException if facility not found", async (done) => {
  //   const expectedResult = undefined;
  //   const mockNumberToSatisfyParameters = 0;
  //   jest.spyOn(facilitiesService, "getFacilityById").mockResolvedValue(expectedResult);
  //   await facilitiesController.getFacilityById(mockNumberToSatisfyParameters)
  //    .then(() => done.fail("Facilities controller should return NotFoundException error of 404 but did not"))
  //    .catch((error) => {
  //      expect(error.status).toBe(404);
  //      expect(error.message).toMatchObject({error: "Not Found", statusCode: 404});
  //      done();
  //    });
  // });
 });