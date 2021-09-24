import { Repository, EntityRepository, getManager } from 'typeorm';
import { Request } from 'express';

import { ProgramYearDim } from '../entities/program-year-dim.entity';
import { ApplicableFacilityAttributesParamsDTO } from '../dtos/applicable-facility-attributes.params.dto';
import { AnnualUnitData } from '../entities/annual-unit-data.entity';
import { UnitFact } from '../entities/unit-fact.entity';
import { UnitTypeYearDim } from '../entities/unit-type-year-dim.entity';
import { FuelYearDim } from '../entities/fuel-year-dim.entity';
import { ControlYearDim } from '../entities/control-year-dim.entity';
import { AnnualUnitDataArch } from '../entities/annual-unit-data-a.entity';
import { Regex } from '../utils/regex';
import { ResponseHeaders } from '../utils/response.headers';

@EntityRepository(ProgramYearDim)
export class ProgramYearDimRepository extends Repository<ProgramYearDim> {
  async getApplicableFacilityAttributes(
    applicableFacilityAttributesParamsDTO: ApplicableFacilityAttributesParamsDTO,
    isArchived: boolean,
    isUnion: boolean,
  ): Promise<ProgramYearDim[]> {
    const entityManager = getManager();
    const yearArray = applicableFacilityAttributesParamsDTO.year;

    if (isUnion) {
      const curr = await this.queryBuilderHelper(false, yearArray, true);
      const arch = await this.queryBuilderHelper(true, yearArray, true);

      return entityManager.query(
        `${curr.getQuery()} WHERE "pyd"."op_year" = ANY($1) UNION ${arch.getQuery()} WHERE "pyd"."op_year" = ANY($1)`,
        [yearArray],
      );
    } else {
      const query = await this.queryBuilderHelper(isArchived, yearArray, false);
      return query.getRawMany();
    }
  }

  async queryBuilderHelper(
    isArchived: boolean,
    yearArray: number[],
    isUnion: boolean,
  ): Promise<any> {
    const query = this.createQueryBuilder('pyd')
      .select([
        'pyd.opYear',
        'pyd.programCode',
        'uf.facilityId',
        'uf.state',
        'utyd.unitType',
        'fyd.fuelCode',
        'cyd.controlCode',
      ])
      .innerJoin(
        isArchived ? AnnualUnitDataArch : AnnualUnitData,
        'aud',
        'pyd.opYear = aud.opYear AND pyd.id = aud.id',
      )
      .innerJoin(UnitFact, 'uf', 'aud.opYear = uf.opYear AND aud.id = uf.id')
      .innerJoin(
        UnitTypeYearDim,
        'utyd',
        'uf.opYear = utyd.opYear AND uf.id = utyd.id',
      )
      .innerJoin(
        FuelYearDim,
        'fyd',
        'utyd.opYear = fyd.opYear AND utyd.id = fyd.id',
      )
      .innerJoin(
        ControlYearDim,
        'cyd',
        'fyd.opYear = cyd.opYear AND fyd.id = cyd.id',
      )
      .distinctOn([
        'pyd.op_year',
        'pyd.prg_code',
        'uf.fac_id',
        'uf.state',
        'utyd.unit_type',
        'fyd.fuel_code',
        'cyd.control_code',
      ]);

    if (!isUnion) {
      query.andWhere(`pyd.opYear IN (:...years)`, {
        years: yearArray,
      });
    }
    return query;
  }

  async getAllFacilityAttributes(
    facilityAttributesParamsDTO,
    req: Request,
  ): Promise<ProgramYearDim[]> {
    const { page, perPage } = facilityAttributesParamsDTO;

    const query = this.createQueryBuilder('pyd')
      .select([
        'pyd.id',
        'pyd.opYear',
        'pyd.programCode',
        'pyd.reportingFrequency',
        'uf.state',
        'uf.facilityName',
        'uf.facilityId',
        'uf.unitId',
        'uf.associatedStacks',
        'uf.opYear',
        'uf.programCodeInfo',
        'uf.epaRegion',
        'uf.nercRegion',
        'uf.county',
        'uf.countyCode',
        'uf.fipsCode',
        'uf.sourceCategory',
        'uf.latitude',
        'uf.longitude',
        'uf.so2Phase',
        'uf.noxPhase',
        'uf.unitType',
        'uf.primaryFuelInfo',
        'uf.secondaryFuelInfo',
        'uf.so2ControlInfo',
        'uf.noxControlInfo',
        'uf.pmControlInfo',
        'uf.hgControlInfo',
        'uf.commercialOperationDate',
        'uf.operatingStatus',
        'uf.maxHourlyHIRate',
        'odf.ownDisplay',
        'odf.oprDisplay',
      ])
      .innerJoin('pyd.unitFact', 'uf')
      .innerJoin('uf.ownerDisplayFact', 'odf');

    if (facilityAttributesParamsDTO.year) {
      query.andWhere(`uf.opYear IN (:...years)`, {
        years: facilityAttributesParamsDTO.year,
      });
    }

    if (facilityAttributesParamsDTO.orisCode) {
      query.andWhere(`uf.facilityId IN (:...orisCodes)`, {
        orisCodes: facilityAttributesParamsDTO.orisCode,
      });
    }

    if (facilityAttributesParamsDTO.state) {
      query.andWhere(`uf.state IN (:...states)`, {
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
          string += `(UPPER(uf.unitType) ~* ${regex}) `;
        } else {
          string += `OR (UPPER(uf.unitType) ~* ${regex}) `;
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
          string += `(UPPER (uf.so2ControlInfo) ~* ${regex}) `;
        } else {
          string += `OR (UPPER(uf.so2ControlInfo) ~* ${regex}) `;
        }

        string += `OR (UPPER(uf.noxControlInfo) ~* ${regex}) `;

        string += `OR (UPPER(uf.pmControlInfo) ~* ${regex}) `;

        string += `OR (UPPER(uf.hgControlInfo) ~* ${regex}) `;
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
          string += `(UPPER(uf.primaryFuelInfo) ~* ${regex}) `;
        } else {
          string += `OR (UPPER(uf.primaryFuelInfo) ~* ${regex}) `;
        }

        string += `OR (UPPER(uf.secondaryFuelInfo) ~* ${regex}) `;
      }

      string += ')';
      query.andWhere(string);
    }

    if (facilityAttributesParamsDTO.program) {
      let string = '(';

      for (let i = 0; i < facilityAttributesParamsDTO.program.length; i++) {
        const regex = Regex.commaDelimited(
          facilityAttributesParamsDTO.program[i].toUpperCase(),
        );

        if (i === 0) {
          string += `(UPPER(uf.programCodeInfo) ~* ${regex}) `;
        } else {
          string += `OR (UPPER(.programCodeInfo) ~* ${regex}) `;
        }
      }

      string += ')';
      query.andWhere(string);
    }

    if (facilityAttributesParamsDTO.sourceCategory) {
      query.andWhere(`UPPER(uf.sourceCategory) IN (:...sourceCategories)`, {
        sourceCategories: facilityAttributesParamsDTO.sourceCategory.map(
          sourceCategories => {
            return sourceCategories.toUpperCase();
          },
        ),
      });
    }

    query
      .orderBy('uf.facilityId')
      .addOrderBy('uf.unitId')
      .addOrderBy('uf.opYear');

    if (page && perPage) {
      query.skip((page - 1) * perPage).take(perPage);
      const totalCount = await query.getCount();
      ResponseHeaders.setPagination(page, perPage, totalCount, req);
    }
    return query.getMany();
  }
}
