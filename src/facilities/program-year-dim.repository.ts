import { Repository, EntityRepository, getManager } from 'typeorm';

import { ProgramYearDim } from '../entities/program-year-dim.entity';
import { ApplicableFacilityAttributesParamsDTO } from '../dtos/applicable-facility-attributes.params.dto';
import { AnnualUnitData } from '../entities/annual-unit-data.entity';
import { UnitFact } from '../entities/unit-fact.entity';
import { UnitTypeYearDim } from '../entities/unit-type-year-dim.entity';
import { FuelYearDim } from '../entities/fuel-year-dim.entity';
import { ControlYearDim } from '../entities/control-year-dim.entity';
import { AnnualUnitDataArch } from '../entities/annual-unit-data-a.entity';

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
        'pyd.year',
        'pyd.programCode',
        'uf.facilityId',
        'uf.stateCode',
        'utyd.unitType',
        'fyd.fuelCode',
        'cyd.controlCode',
        'uf.sourceCategory',
      ])
      .innerJoin(
        isArchived ? AnnualUnitDataArch : AnnualUnitData,
        'aud',
        'pyd.year = aud.year AND pyd.id = aud.id',
      )
      .innerJoin(UnitFact, 'uf', 'aud.year = uf.year AND aud.id = uf.id')
      .innerJoin(
        UnitTypeYearDim,
        'utyd',
        'uf.year = utyd.year AND uf.id = utyd.id',
      )
      .innerJoin(
        FuelYearDim,
        'fyd',
        'utyd.year = fyd.year AND utyd.id = fyd.id',
      )
      .leftJoin(
        ControlYearDim,
        'cyd',
        'fyd.year = cyd.year AND fyd.id = cyd.id',
      )
      .distinctOn([
        'pyd.op_year',
        'pyd.prg_code',
        'uf.fac_id',
        'uf.stateCode',
        'utyd.unit_type',
        'fyd.fuel_code',
        'cyd.control_code',
        'uf.source_cat',
      ]);

    if (!isUnion) {
      query.andWhere(`pyd.year IN (:...years)`, {
        years: yearArray,
      });
    }
    return query;
  }
}
