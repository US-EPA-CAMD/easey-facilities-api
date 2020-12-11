// import { Test } from '@nestjs/testing';
// import { FacilitiesService } from './facilities.service';
// import { FacilitiesRepository } from './facilities.repository';
// import { NotFoundException } from '@nestjs/common';
// import { FacilityParamsDTO } from '../dtos/facility.params.dto';
// import { FacilityDTO } from '../dtos/facility.dto';

// const mockFacilitiesRepository = () => ({
//   getFacilities: jest.fn(),
//   getFacilityById: jest.fn(),
//   numOfFacilitiesPages: jest.fn(),
// });

// describe('FacilitiesService', () => {
//   let facilitiesService;
//   let facilitiesRepository;

//   beforeEach(async () => {
//     const module = await Test.createTestingModule({
//       providers: [
//         FacilitiesService,
//         { provide: FacilitiesRepository, useFactory: mockFacilitiesRepository },
//       ],
//     }).compile();

//     facilitiesService = await module.get<FacilitiesService>(FacilitiesService);
//     facilitiesRepository = await module.get<FacilitiesRepository>(FacilitiesRepository);
//   });

//   describe('getFacilities', () => {
//     it('calls FacilitiesRepository.getFacilities() and gets all facilities from the repository', async () => {
//       const facilities: Array<FacilityDTO> = [
//         new FacilityDTO(1, 3, 'Barry', 'AL', undefined),
//         new FacilityDTO(2, 9, 'Copper Station', 'TX', undefined),
//         new FacilityDTO(3, 51, 'Dolet Hills Power Station', 'LA', undefined),
//         new FacilityDTO(4, 87, 'Escalante', 'NM', undefined),
//       ]; 
//       facilitiesRepository.getFacilities.mockReturnValue(facilities);
      
//       const request = {
//         res: {
//           setHeader: jest.fn(),
//         }
//       }
//       request.res.setHeader.mockReturnValue('some response');

//       const params: FacilityParamsDTO = {
//         state: undefined,
//         region: undefined,
//         page: 2,
//         perPage: 2,
//         orderBy: undefined,
//       };

//       expect(facilitiesRepository.getFacilities).not.toHaveBeenCalled();
//       const result = facilitiesService.getFacilities(params, request);

//       expect(facilitiesRepository.getFacilities).toHaveBeenCalled();
//       expect(result).toEqual(facilities.slice(2,4));
//     });
//   });

//   describe('getFacilityById', () => {
//     it('calls facilitiesRepository.getFacilityById() and successfully retrieves and returns the facility', async () => {
//       facilitiesRepository.getFacilityById.mockReturnValue('one facility');

//       const result = facilitiesService.getFacilityById(1);

//       expect(facilitiesRepository.getFacilityById).toHaveBeenCalledWith(1);
//       expect(result).toEqual('one facility');
//     });

//     it('throws an error as facility is not found', () => {
//       expect(() => {
//         facilitiesService.getFacilityById(12);
//       }).toThrow(NotFoundException);
//     });
//   });

//   describe('getFacilityUnits', () => {
//     it('returns static data', async () => {
//       const result = facilitiesService.getFacilityUnits(1);
//       expect(result).toEqual('Hello getFacilityUnits!');
//     });
//   });

//   describe('getFacilityUnitById', () => {
//     it('returns static data', async () => {
//       const result = facilitiesService.getFacilityUnitById(1, 1);
//       expect(result).toEqual('Hello getFacilityUnitById!');
//     });
//   });

//   describe('getFacilityContact', () => {
//     it('returns static data', async () => {
//       const result = facilitiesService.getFacilityContact(1);
//       expect(result).toEqual('Hello getFacilityContact!');
//     });
//   });
// });
