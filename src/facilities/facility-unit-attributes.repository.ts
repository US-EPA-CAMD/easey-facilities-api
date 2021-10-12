import { EntityRepository, Repository } from 'typeorm';
import { Request } from 'express';

import { FacilityUnitAttributes } from '../entities/vw-facility-unit-attributes.entity';
import { FacilityAttributesParamsDTO } from '../dtos/facility-attributes.param.dto';
import { Regex } from '../utils/regex';
import { ResponseHeaders } from '../utils/response.headers';

@EntityRepository(FacilityUnitAttributes)
export class FacilityUnitAttributesRepository extends Repository<
  FacilityUnitAttributes
> {
  async getAllFacilityAttributes(
    facilityAttributesParamsDTO: FacilityAttributesParamsDTO,
    req: Request,
  ): Promise<FacilityUnitAttributes[]> {
    const { page, perPage } = facilityAttributesParamsDTO;

    const query = this.createQueryBuilder('fua').select([
      'fua.id',
      'fua.year',
      'fua.programCodeInfo',
      'fua.reportingFrequency',
      'fua.state',
      'fua.facilityName',
      'fua.facilityId',
      'fua.unitId',
      'fua.associatedStacks',
      'fua.epaRegion',
      'fua.nercRegion',
      'fua.county',
      'fua.countyCode',
      'fua.fipsCode',
      'fua.sourceCategory',
      'fua.latitude',
      'fua.longitude',
      'fua.so2Phase',
      'fua.noxPhase',
      'fua.unitType',
      'fua.primaryFuelInfo',
      'fua.secondaryFuelInfo',
      'fua.so2ControlInfo',
      'fua.noxControlInfo',
      'fua.pmControlInfo',
      'fua.hgControlInfo',
      'fua.commercialOperationDate',
      'fua.operatingStatus',
      'fua.maxHourlyHIRate',
      'fua.ownDisplay',
      'fua.oprDisplay',
      'fua.generatorId',
    ]);

    if (facilityAttributesParamsDTO.year) {
      query.andWhere(`fua.year IN (:...years)`, {
        years: facilityAttributesParamsDTO.year,
      });
    }

    if (facilityAttributesParamsDTO.facilityId) {
      query.andWhere(`fua.facilityId IN (:...facilityIds)`, {
        facilityIds: facilityAttributesParamsDTO.facilityId,
      });
    }

    if (facilityAttributesParamsDTO.state) {
      query.andWhere(`fua.state IN (:...states)`, {
        states: facilityAttributesParamsDTO.state.map(states => {
          return states.toUpperCase();
        }),
      });
    }

    if (facilityAttributesParamsDTO.unitType) {
      let string = '(';

      for (let i = 0; i < facilityAttributesParamsDTO.unitType.length; i++) {
        const regex = Regex.commaDelimited(
          facilityAttributesParamsDTO.unitType[i].toUpperCase(),
        );

        if (i === 0) {
          string += `(UPPER(fua.unitType) ~* ${regex}) `;
        } else {
          string += `OR (UPPER(fua.unitType) ~* ${regex}) `;
        }
      }

      string += ')';
      query.andWhere(string);
    }

    if (facilityAttributesParamsDTO.controlTechnologies) {
      let string = '(';

      for (
        let i = 0;
        i < facilityAttributesParamsDTO.controlTechnologies.length;
        i++
      ) {
        const regex = Regex.commaDelimited(
          facilityAttributesParamsDTO.controlTechnologies[i].toUpperCase(),
        );

        if (i === 0) {
          string += `(UPPER (fua.so2ControlInfo) ~* ${regex}) `;
        } else {
          string += `OR (UPPER(fua.so2ControlInfo) ~* ${regex}) `;
        }

        string += `OR (UPPER(fua.noxControlInfo) ~* ${regex}) `;

        string += `OR (UPPER(fua.pmControlInfo) ~* ${regex}) `;

        string += `OR (UPPER(fua.hgControlInfo) ~* ${regex}) `;
      }

      string += ')';

      query.andWhere(string);
    }

    if (facilityAttributesParamsDTO.unitFuelType) {
      let string = '(';

      for (
        let i = 0;
        i < facilityAttributesParamsDTO.unitFuelType.length;
        i++
      ) {
        const regex = Regex.commaDelimited(
          facilityAttributesParamsDTO.unitFuelType[i].toUpperCase(),
        );

        if (i === 0) {
          string += `(UPPER(fua.primaryFuelInfo) ~* ${regex}) `;
        } else {
          string += `OR (UPPER(fua.primaryFuelInfo) ~* ${regex}) `;
        }

        string += `OR (UPPER(fua.secondaryFuelInfo) ~* ${regex}) `;
      }

      string += ')';
      query.andWhere(string);
    }

    if (facilityAttributesParamsDTO.programCodeInfo) {
      let string = '(';

      for (
        let i = 0;
        i < facilityAttributesParamsDTO.programCodeInfo.length;
        i++
      ) {
        const regex = Regex.commaDelimited(
          facilityAttributesParamsDTO.programCodeInfo[i].toUpperCase(),
        );

        if (i === 0) {
          string += `(UPPER(fua.programCodeInfo) ~* ${regex}) `;
        } else {
          string += `OR (UPPER(fua.programCodeInfo) ~* ${regex}) `;
        }
      }

      string += ')';
      query.andWhere(string);
    }

    if (facilityAttributesParamsDTO.sourceCategory) {
      query.andWhere(`UPPER(fua.sourceCategory) IN (:...sourceCategories)`, {
        sourceCategories: facilityAttributesParamsDTO.sourceCategory.map(
          sourceCategories => {
            return sourceCategories.toUpperCase();
          },
        ),
      });
    }

    query
      .orderBy('fua.facilityId')
      .addOrderBy('fua.unitId')
      .addOrderBy('fua.year');

    if (page && perPage) {
      query.skip((page - 1) * perPage).take(perPage);
      const totalCount = await query.getCount();
      ResponseHeaders.setPagination(page, perPage, totalCount, req);
    }
    return query.getMany();
  }
}
