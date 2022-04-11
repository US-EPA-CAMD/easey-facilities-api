import { ReadStream } from 'fs';
import { Request } from 'express';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { ResponseHeaders, Regex } from '@us-epa-camd/easey-common/utilities';

import { FacilityUnitAttributes } from '../entities/vw-facility-unit-attributes.entity';
import {
  StreamFacilityAttributesParamsDTO,
  PaginatedFacilityAttributesParamsDTO,
} from '../dtos/facility-attributes.param.dto';

@EntityRepository(FacilityUnitAttributes)
export class FacilityUnitAttributesRepository extends Repository<
  FacilityUnitAttributes
> {
  getStreamQuery(params: StreamFacilityAttributesParamsDTO) {
    return this.buildQuery(params, true).getQueryAndParameters();
  }

  private buildQuery(
    params: StreamFacilityAttributesParamsDTO,
    isStreamed = false,
  ): SelectQueryBuilder<FacilityUnitAttributes> {
    const query = this.createQueryBuilder('fua').select(
      this.getColumns(isStreamed),
    );

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

  private getColumns(isStreamed: boolean): string[] {
    const columns = [
      'fua.id',
      'fua.stateCode',
      'fua.facilityName',
      'fua.facilityId',
      'fua.unitId',
      'fua.associatedStacks',
      'fua.year',
      'fua.programCodeInfo',
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

    return columns.map(col => {
      if (isStreamed) {
        if (col === 'fua.ownDisplay') {
          return `${col} AS "ownerOperator"`;
        }
        if (col === 'fua.generatorId') {
          return `${col} AS "associatedGeneratorsAndNameplateCapacity"`;
        }
        return `${col} AS "${col.split('.')[1]}"`;
      } else {
        return col;
      }
    });
  }

  async getAllFacilityAttributes(
    facilityAttributesParamsDTO: PaginatedFacilityAttributesParamsDTO,
    req: Request,
  ): Promise<FacilityUnitAttributes[]> {
    const { page, perPage } = facilityAttributesParamsDTO;
    const query = this.buildQuery(facilityAttributesParamsDTO, false);

    if (page && perPage) {
      query.skip((page - 1) * perPage).take(perPage);
      const totalCount = await query.getCount();
      ResponseHeaders.setPagination(req, page, perPage, totalCount);
    }

    return query.getMany();
  }

  async lastArchivedYear(): Promise<number> {
    const result = await this.query(
      'SELECT MAX(op_year) AS "year" FROM camddmw_arch.hour_unit_data_a;',
    );
    return result[0].year;
  }
}
