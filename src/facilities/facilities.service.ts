import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FacilityDTO } from './dto/facility.dto';
import { FacilitiesRepository } from './facilities.repository';
import { FacilityParamsDTO } from './dto/facilitiesParams.dto';
import { Request } from 'express'; 

@Injectable()
export class FacilitiesService {
  constructor(@InjectRepository(FacilitiesRepository)
  private facilitiesRepository: FacilitiesRepository
  ) {}

  getFacilities(facilityParamsDTO: FacilityParamsDTO, req: Request): FacilityDTO[] {
    const { page, perPage } = facilityParamsDTO;
    let facilities = this.facilitiesRepository.getFacilities(facilityParamsDTO);
    const total: number = facilities.length;
    const totalPages: number = Math.ceil(facilities.length / (+perPage));

    if (page && perPage) {
      // pagination
      const pageNum: number = +page;
      const perPageNum: number = +perPage;

      const begin: number = ((pageNum - 1)*perPageNum);
      const end: number = (begin + perPageNum);

      facilities = facilities.slice(begin, end);

      // setting response headers
      if (totalPages !== 1) {
        const first: string = `</facilities?page=1&perPage=${ perPage }>; rel="first"`;
        const prev: string = `</facilities?page=${ +page - 1 }&perPage=${ perPage }>; rel="previous"`;
        const next: string = `</facilities?page=${ +page + 1 }&perPage=${ perPage }>; rel="next"`;
        const last: string = `</facilities?page=${ totalPages }&perPage=${ perPage }>; rel="last"`; 

        let concatLinks:string;

        switch (+page) {
          case 1: {
              concatLinks = next + ',' + last;
            break;
          }
          case totalPages: {
            concatLinks = first + ',' + prev;
            break;
          }
          default: {
            concatLinks = first + ',' + prev + ',' + next + ',' + last;
            break;
          }
        };
        req.res.setHeader('X-Total-Count', total);
        req.res.setHeader('Link', concatLinks );
      };
    }
    return facilities;
  }

  // will eventually use facilitiesRepository.findOne(id) once connected to DB
  getFacilityById(id: number): FacilityDTO {
    const facility = this.facilitiesRepository.getFacilityById(id);

    if (facility === undefined) {
      throw new NotFoundException;
    }

    return facility;
  }

  getFacilityUnits(FacId: number): string {
    return 'Hello getFacilityUnits!';
  }

  getFacilityUnitById(facId: number, unitId: number): string {
    return 'Hello getFacilityUnitById!';
  }

  getFacilityContact(id: number): string {
    return 'Hello getFacilityContact!';
  }

  // getFacilityMonitoringPlan(id: number): string {
  //   return 'Hello getFacilityMonitoringPlan!';
  // }
}
