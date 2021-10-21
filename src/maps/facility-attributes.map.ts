import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';
import { BaseMap } from '@us-epa-camd/easey-common/maps/base.map';

import { FacilityAttributesDTO } from '../dtos/facility-attributes.dto';
import { FacilityUnitAttributes } from '../entities/vw-facility-unit-attributes.entity';

@Injectable()
export class FacilityAttributesMap extends BaseMap<
  FacilityUnitAttributes,
  FacilityAttributesDTO
> {
  public async one(entity: any): Promise<any> {
    const array = [entity.ownDisplay, entity.oprDisplay];
    const ownOprList = array
      .filter(e => e)
      .join(',')
      .slice(0, -1)
      .split('),');
    const ownOprUniqueList = [...new Set(ownOprList)];
    const ownerOperator = ownOprUniqueList.join('),');
    return {
      [propertyMetadata.state.fieldLabels.value]: entity.state,
      [propertyMetadata.facilityName.fieldLabels.value]: entity.facilityName,
      [propertyMetadata.facilityId.fieldLabels.value]: entity.facilityId
        ? Number(entity.facilityId)
        : entity.facilityId,
      [propertyMetadata.unitId.fieldLabels.value]: entity.unitId,
      [propertyMetadata.associatedStacks.fieldLabels.value]:
        entity.associatedStacks,
      [propertyMetadata.year.fieldLabels.value]: Number(entity.year),
      [propertyMetadata.programCodeInfo.fieldLabels.value]:
        entity.programCodeInfo,
      [propertyMetadata.epaRegion.fieldLabels.value]: entity.epaRegion
        ? Number(entity.epaRegion)
        : entity.epaRegion,
      [propertyMetadata.nercRegion.fieldLabels.value]: entity.nercRegion,
      [propertyMetadata.county.fieldLabels.value]: entity.county,
      [propertyMetadata.countyCode.fieldLabels.value]: entity.countyCode,
      [propertyMetadata.fipsCode.fieldLabels.value]: entity.fipsCode,
      [propertyMetadata.sourceCategory.fieldLabels.value]:
        entity.sourceCategory,
      [propertyMetadata.latitude.fieldLabels.value]: entity.latitude
        ? Number(entity.latitude)
        : entity.latitude,
      [propertyMetadata.longitude.fieldLabels.value]: entity.longitude
        ? Number(entity.longitude)
        : entity.longitude,
      [propertyMetadata.ownerOperatorInfo.fieldLabels.value]:
        ownerOperator.length > 0 ? `${ownerOperator})` : null,
      [propertyMetadata.so2Phase.fieldLabels.value]: entity.so2Phase,
      [propertyMetadata.noxPhase.fieldLabels.value]: entity.noxPhase,
      [propertyMetadata.unitType.fieldLabels.value]: entity.unitType,
      [propertyMetadata.primaryFuelInfo.fieldLabels.value]:
        entity.primaryFuelInfo,
      [propertyMetadata.secondaryFuelInfo.fieldLabels.value]:
        entity.secondaryFuelInfo,
      [propertyMetadata.so2ControlInfo.fieldLabels.value]:
        entity.so2ControlInfo,
      [propertyMetadata.noxControlInfo.fieldLabels.value]:
        entity.noxControlInfo,
      [propertyMetadata.pmControlInfo.fieldLabels.value]: entity.pmControlInfo,
      [propertyMetadata.hgControlInfo.fieldLabels.value]: entity.hgControlInfo,
      [propertyMetadata.commercialOperationDate.fieldLabels
        .value]: entity.commercialOperationDate
        ? entity.commercialOperationDate.toISOString().split('T')[0]
        : entity.commercialOperationDate,
      [propertyMetadata.operatingStatus.fieldLabels.value]:
        entity.operatingStatus,
      [propertyMetadata.maxHourlyHIRate.fieldLabels
        .value]: entity.maxHourlyHIRate
        ? Number(entity.maxHourlyHIRate)
        : entity.maxHourlyHIRate,
      [propertyMetadata.generatorId.fieldLabels.value]: entity.generatorId,
      [propertyMetadata.reportingFrequency.fieldLabels.value]:
        entity.reportingFrequency,
    };
  }
}
