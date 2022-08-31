import { Repository, EntityRepository } from 'typeorm';

import { UnitFact } from '../entities/unit-fact.entity';
import { FuelYearDim } from '../entities/fuel-year-dim.entity';
import { ControlYearDim } from '../entities/control-year-dim.entity';
import { ProgramYearDim } from '../entities/program-year-dim.entity';
import { UnitTypeYearDim } from '../entities/unit-type-year-dim.entity';

@EntityRepository(ProgramYearDim)
export class ProgramYearDimRepository extends Repository<ProgramYearDim> {
  async getApplicableFacilityAttributes(yearArray: number[],
  ): Promise<ProgramYearDim[]> {
    const query = await this.queryBuilderHelper(yearArray);
    return query.getRawMany();
  }

  async queryBuilderHelper(yearArray: number[]): Promise<any> {
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
      .innerJoin(UnitFact, 'uf', 'pyd.year = uf.year AND pyd.id = uf.id')
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
      .innerJoin(
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

    query.andWhere(`pyd.year IN (:...years)`, {
      years: yearArray,
    });

    return query;
  }
}
