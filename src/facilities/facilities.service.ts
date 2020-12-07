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

    const last = this.facilitiesRepository.numOfFacilitiesPages(facilityParamsDTO);

    // if page = 1, "previous" is page 0
    req.res.setHeader('Link', `</facilities?page=${ +page - 1 }&per-page=${ perPage }>; rel="previous",`+

    `</facilities?page=${ +page + 1 }&per-page=${ perPage }>; rel="next",`+

    `</facilities?page=${ last }&per-page=${ perPage }>; rel="last"`
    );

    req.res.setHeader('X-Total-Count', 245);

    return this.facilitiesRepository.getFacilities(facilityParamsDTO);
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
