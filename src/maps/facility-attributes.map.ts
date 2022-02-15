import { Injectable } from '@nestjs/common';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { FacilityAttributesDTO } from '../dtos/facility-attributes.dto';
import { FacilityUnitAttributes } from '../entities/vw-facility-unit-attributes.entity';

@Injectable()
export class FacilityAttributesMap extends BaseMap<
  FacilityUnitAttributes,
  FacilityAttributesDTO
> {
  public async one(entity: any): Promise<any> {
    let associatedGeneratorsAndNameplateCapacityStr = '';
    const array = [entity.ownDisplay, entity.oprDisplay];
    const ownOprList = array
      .filter(e => e)
      .join(',')
      .slice(0, -1)
      .split('),');
    const ownOprUniqueList = [...new Set(ownOprList)];
    const ownerOperator = ownOprUniqueList.join('),');

    const generatorIdArr = entity.generatorId?.split(', ');
    const arpNameplateCapacityArr = entity.arpNameplateCapacity?.split(', ');
    const otherNameplateCapacityArr = entity.otherNameplateCapacity?.split(
      ', ',
    );

    for (let index = 0; index < generatorIdArr.length; index++) {
      associatedGeneratorsAndNameplateCapacityStr += generatorIdArr[index];
      if (
        arpNameplateCapacityArr &&
        arpNameplateCapacityArr[index] !== 'null'
      ) {
        associatedGeneratorsAndNameplateCapacityStr += ` (${Number(
          arpNameplateCapacityArr[index],
        )})`;
      } else if (
        otherNameplateCapacityArr &&
        otherNameplateCapacityArr[index] !== 'null'
      ) {
        associatedGeneratorsAndNameplateCapacityStr += ` (${Number(
          otherNameplateCapacityArr[index],
        )})`;
      }
      if (generatorIdArr.length > 1 && index < generatorIdArr.length - 1) {
        associatedGeneratorsAndNameplateCapacityStr += ', ';
      }
    }

    return {
      stateCode: entity.stateCode,
      facilityName: entity.facilityName,
      facilityId: entity.facilityId,
      unitId: entity.unitId,
      associatedStacks: entity.associatedStacks,
      year: entity.year,
      programCodeInfo: entity.programCodeInfo,
      epaRegion: entity.epaRegion,
      nercRegion: entity.nercRegion,
      county: entity.county,
      countyCode: entity.countyCode,
      fipsCode: entity.fipsCode,
      sourceCategory: entity.sourceCategory,
      latitude: entity.latitude,
      longitude: entity.longitude,
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
      commercialOperationDate: entity.commercialOperationDate,
      operatingStatus: entity.operatingStatus,
      maxHourlyHIRate: entity.maxHourlyHIRate,
      associatedGeneratorsAndNameplateCapacity: associatedGeneratorsAndNameplateCapacityStr,
    };
  }
}
