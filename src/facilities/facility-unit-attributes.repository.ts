import { Injectable } from '@nestjs/common';
import { Regex, ResponseHeaders } from '@us-epa-camd/easey-common/utilities';
import { Request } from 'express';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';

import { PaginatedFacilityAttributesParamsDTO } from '../dtos/facility-attributes.param.dto';
import { FacilityUnitAttributes } from '../entities/vw-facility-unit-attributes.entity';

@Injectable()
export class FacilityUnitAttributesRepository extends Repository<
  FacilityUnitAttributes
> {
  constructor(entityManager: EntityManager) {
    super(FacilityUnitAttributes, entityManager);
  }

  private buildQuery(
    params: PaginatedFacilityAttributesParamsDTO,
  ): SelectQueryBuilder<FacilityUnitAttributes> {
    const query = this.createQueryBuilder('fua').select(this.getColumns());

    if (params.unitFuelType) {
      let string = '(';

      for (let i = 0; i < params.unitFuelType.length; i++) {
        const regex = Regex.commaDelimited(
          params.unitFuelType[i].toUpperCase(),
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

    if (params.programCodeInfo) {
      let string = '(';

      for (let i = 0; i < params.programCodeInfo.length; i++) {
        const regex = Regex.commaDelimited(
          params.programCodeInfo[i].toUpperCase(),
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

    if (params.sourceCategory) {
      query.andWhere(`UPPER(fua.sourceCategory) IN (:...sourceCategories)`, {
        sourceCategories: params.sourceCategory.map(sourceCategories => {
          return sourceCategories.toUpperCase();
        }),
      });
    }

    if (params.year) {
      query.andWhere(`fua.year IN (:...years)`, {
        years: params.year,
      });
    }

    if (params.facilityId) {
      query.andWhere(`fua.facilityId IN (:...facilityIds)`, {
        facilityIds: params.facilityId,
      });
    }

    if (params.stateCode) {
      query.andWhere(`fua.stateCode IN (:...states)`, {
        states: params.stateCode.map(states => {
          return states.toUpperCase();
        }),
      });
    }

    if (params.unitType) {
      let string = '(';

      for (let i = 0; i < params.unitType.length; i++) {
        const regex = Regex.commaDelimited(params.unitType[i].toUpperCase());

        if (i === 0) {
          string += `(UPPER(fua.unitType) ~* ${regex}) `;
        } else {
          string += `OR (UPPER(fua.unitType) ~* ${regex}) `;
        }
      }

      string += ')';
      query.andWhere(string);
    }

    if (params.controlTechnologies) {
      let string = '(';

      for (let i = 0; i < params.controlTechnologies.length; i++) {
        const regex = Regex.commaDelimited(
          params.controlTechnologies[i].toUpperCase(),
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

    query
      .orderBy('fua.facilityId')
      .addOrderBy('fua.unitId')
      .addOrderBy('fua.year');

    return query;
  }

  private getColumns(): string[] {
    return [
      'fua.id',
      'fua.stateCode',
      'fua.facilityName',
      'fua.facilityId',
      'fua.unitId',
      'fua.associatedStacks',
      'fua.year',
      'fua.programCodeInfo',
      'fua.primaryRepInfo',
      'fua.epaRegion',
      'fua.nercRegion',
      'fua.county',
      'fua.countyCode',
      'fua.fipsCode',
      'fua.sourceCategory',
      'fua.latitude',
      'fua.longitude',
      'fua.ownDisplay',
      'fua.oprDisplay',
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
      'fua.generatorId',
      'fua.arpNameplateCapacity',
      'fua.otherNameplateCapacity',
    ];
  }

  async getAllFacilityAttributes(
    facilityAttributesParamsDTO: PaginatedFacilityAttributesParamsDTO,
    req: Request,
    allowedOrisCodes?: number[],
  ): Promise<FacilityUnitAttributes[]> {
    let totalCount: number;
    let results: FacilityUnitAttributes[];
    const { page, perPage } = facilityAttributesParamsDTO;
    const query = this.buildQuery(facilityAttributesParamsDTO);

    if (allowedOrisCodes) {
      query.andWhere(`fua.facilityId IN (:...facilityIds)`, {
        facilityIds: allowedOrisCodes,
      });
    }

    if (page && perPage) {
      query.skip((page - 1) * perPage).take(perPage);
      [results, totalCount] = await query.getManyAndCount();
      ResponseHeaders.setPagination(req, page, perPage, totalCount);
    } else {
      results = await query.getMany();
    }
    return results;
  }

  async lastArchivedYear(): Promise<number> {
    const result = await this.query(
      'SELECT MAX(op_year) AS "year" FROM camddmw_arch.annual_unit_data_a;',
    );
    return result[0].year;
  }
}
