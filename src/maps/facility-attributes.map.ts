import { Injectable } from '@nestjs/common';

import { BaseMap } from './base.map';
import { FacilityAttributesDTO } from '../dtos/facility-attributes.dto';
import { ProgramYearDim } from '../entities/program-year-dim.entity';

@Injectable()
export class FacilityAttributesMap extends BaseMap<
  ProgramYearDim,
  FacilityAttributesDTO
> {
  public async one(entity: any): Promise<FacilityAttributesDTO> {
    const array = [
      entity.unitFact.ownerDisplayFact.ownDisplay,
      entity.unitFact.ownerDisplayFact.oprDisplay,
    ];
    const ownOprList = array
      .filter(e => e)
      .join(',')
      .slice(0, -1)
      .split('),');
    const ownOprUniqueList = [...new Set(ownOprList)];
    const ownerOperator = ownOprUniqueList.join('),');
    return {
      state: entity.unitFact.state,
      facilityName: entity.unitFact.facilityName,
      facilityId: entity.unitFact.facilityId,
      unitId: entity.unitFact.unitId,
      associatedStacks: entity.unitFact.associatedStacks,
      year: entity.opYear,
      programCodeInfo: entity.programCode,
      epaRegion: entity.unitFact.epaRegion,
      nercRegion: entity.unitFact.nercRegion,
      county: entity.unitFact.county,
      countyCode: entity.unitFact.countyCode,
      fipsCode: entity.unitFact.fipsCode,
      sourceCategory: entity.unitFact.sourceCategory,
      latitude: entity.unitFact.latitude,
      longitude: entity.unitFact.longitude,
      ownerOperator: ownerOperator.length > 0 ? `${ownerOperator})` : null,
      so2Phase: entity.unitFact.so2Phase,
      noxPhase: entity.unitFact.noxPhase,
      unitType: entity.unitFact.unitType,
      primaryFuelInfo: entity.unitFact.primaryFuelInfo,
      secondaryFuelInfo: entity.unitFact.secondaryFuelInfo,
      so2ControlInfo: entity.unitFact.so2ControlInfo,
      noxControlInfo: entity.unitFact.noxControlInfo,
      pmControlInfo: entity.unitFact.pmControlInfo,
      hgControlInfo: entity.unitFact.hgControlInfo,
      commercialOperationDate: entity.unitFact.commercialOperationDate,
      operatingStatus: entity.unitFact.operatingStatus,
      maxHourlyHIRate: entity.unitFact.maxHourlyHIRate,
      reportingFrequency: entity.reportingFrequency,
    };
  }
}
