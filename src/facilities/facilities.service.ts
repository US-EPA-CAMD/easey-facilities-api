import { Injectable } from '@nestjs/common';

@Injectable()
export class FacilitiesService {
  getFacilities(): string {
    return 'Hello getFacilities!';
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
