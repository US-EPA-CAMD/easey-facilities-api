import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { FacilityDTO } from './dto/facility.dto';
import { FacilityRepository } from './facilities.repository';

@Injectable()
export class FacilitiesService {
  constructor(@InjectRepository(FacilityRepository)
  private facilityRepository: FacilityRepository
  ) {}

  getFacilities(): FacilityDTO[] {
    return this.facilityRepository.getFacilities();
  }

  getFacilityById(id: number): string {
    return 'Hello getFacilityById!';
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

  getFacilityMonitoringPlan(id: number): string {
    return 'Hello getFacilityMonitoringPlan!';
  }
}
