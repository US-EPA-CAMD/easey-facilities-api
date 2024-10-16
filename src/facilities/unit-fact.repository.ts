import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

import { ControlYearDim } from '../entities/control-year-dim.entity';
import { FuelYearDim } from '../entities/fuel-year-dim.entity';
import { ProgramYearDim } from '../entities/program-year-dim.entity';
import { UnitFact } from '../entities/unit-fact.entity';
import { UnitTypeYearDim } from '../entities/unit-type-year-dim.entity';

@Injectable()
export class UnitFactRepository extends Repository<UnitFact> {
  constructor(entityManager: EntityManager) {
    super(UnitFact, entityManager);
  }

  async getApplicableFacilityAttributes(
    yearArray: number[],
    allowedOrisCodes?: number[],
  ): Promise<ProgramYearDim[]> {
    const query = await this.queryBuilderHelper(yearArray);
    if (allowedOrisCodes) {
      query.andWhere(`uf.facilityId IN (:...facilityIds)`, {
        facilityIds: allowedOrisCodes,
      });
    }
    return query.getRawMany();
  }

  async queryBuilderHelper(yearArray: number[]): Promise<any> {
    const columnList = [
      'uf.year',
      'pyd.programCode',
      'uf.facilityId',
      'uf.stateCode',
      'utyd.unitTypeCode',
      'fyd.fuelTypeCode',
      'cyd.controlCode',
      'uf.sourceCategory',
    ];

    const query = this.createQueryBuilder('uf')
      .select(
        columnList.map(col => {
          return `${col} AS "${col.split('.')[1]}"`;
        }),
      )
      .distinctOn(columnList)
      .leftJoin(ProgramYearDim, 'pyd', 'pyd.year = uf.year AND pyd.id = uf.id')
      .leftJoin(
        UnitTypeYearDim,
        'utyd',
        'utyd.year = uf.year AND utyd.id = uf.id',
      )
      .leftJoin(FuelYearDim, 'fyd', 'fyd.year = uf.year AND fyd.id = uf.id')
      .leftJoin(ControlYearDim, 'cyd', 'cyd.year = uf.year AND cyd.id = uf.id');

    query.andWhere(`uf.year IN (:...years)`, {
      years: yearArray,
    });

    return query;
  }
}
