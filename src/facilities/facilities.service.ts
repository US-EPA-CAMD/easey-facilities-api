import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FacilityDTO } from './dto/facility.dto';
import { FacilitiesRepository } from './facilities.repository';

@Injectable()
export class FacilitiesService {
  constructor(@InjectRepository(FacilitiesRepository)
  private facilitiesRepository: FacilitiesRepository
  ) {}

  getFacilities(): FacilityDTO[] {
    return this.facilitiesRepository.getFacilities();
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

  getFacilityUnitById(facId: number, unitId): string {
    return 'Hello getFacilityUnitById!';
  }

  getFacilityContact(id: number): string {
    return 'Hello getFacilityContact!';
  }

  // getFacilityMonitoringPlan(id: number): string {
  //   return 'Hello getFacilityMonitoringPlan!';
  // }
}
