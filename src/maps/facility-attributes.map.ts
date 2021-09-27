import { Injectable } from '@nestjs/common';

import { BaseMap } from './base.map';
import { FacilityAttributesDTO } from '../dtos/facility-attributes.dto';
import { FacilityUnitAttributes } from '../entities/vw-facility-unit-attributes.entity';

@Injectable()
export class FacilityAttributesMap extends BaseMap<
  FacilityUnitAttributes,
  FacilityAttributesDTO
> {
  public async one(entity: any): Promise<FacilityAttributesDTO> {
    const array = [entity.ownDisplay, entity.oprDisplay];
    const ownOprList = array
      .filter(e => e)
      .join(',')
      .slice(0, -1)
      .split('),');
    const ownOprUniqueList = [...new Set(ownOprList)];
    const ownerOperator = ownOprUniqueList.join('),');
    return {
      state: entity.state,
      facilityName: entity.facilityName,
      facilityId: entity.facilityId
        ? Number(entity.facilityId)
        : entity.facilityId,
      unitId: entity.unitId,
      associatedStacks: entity.associatedStacks,
      year: Number(entity.year),
      programCodeInfo: entity.programCodeInfo,
      epaRegion: entity.epaRegion ? Number(entity.epaRegion) : entity.epaRegion,
      nercRegion: entity.nercRegion,
      county: entity.county,
      countyCode: entity.countyCode,
      fipsCode: entity.fipsCode,
      sourceCategory: entity.sourceCategory,
      latitude: entity.latitude ? Number(entity.latitude) : entity.latitude,
      longitude: entity.longitude ? Number(entity.longitude) : entity.longitude,
      ownerOperator: ownerOperator.length > 0 ? `${ownerOperator})` : null,
      so2Phase: entity.so2Phase,
      noxPhase: entity.noxPhase,
      unitType: entity.unitType,
      primaryFuelInfo: entity.primaryFuelInfo,
      secondaryFuelInfo: entity.secondaryFuelInfo,
      so2ControlInfo: entity.so2ControlInfo,
      noxControlInfo: entity.noxControlInfo,
      pmControlInfo: entity.pmControlInfo,
      hgControlInfo: entity.hgControlInfo,
      commercialOperationDate: entity.commercialOperationDate
        ? entity.commercialOperationDate.toISOString().split('T')[0]
        : entity.commercialOperationDate,
      operatingStatus: entity.operatingStatus,
      maxHourlyHIRate: entity.maxHourlyHIRate
        ? Number(entity.maxHourlyHIRate)
        : entity.maxHourlyHIRate,
      reportingFrequency: entity.reportingFrequency,
      generatorId: entity.generatorId,
    };
  }
}
