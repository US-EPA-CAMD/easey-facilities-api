import { Repository, EntityRepository } from 'typeorm';

import { ProgramYearDim } from '../entities/program-year-dim.entity';
import { ApplicableFacilityAttributesParamsDTO } from '../dtos/applicable-facility-attributes.params.dto';
import { AnnualUnitData } from '../entities/annual-unit-data.entity';
import { UnitFact } from '../entities/unit-fact.entity';
import { UnitTypeYearDim } from '../entities/unit-type-year-dim.entity';
import { FuelYearDim } from '../entities/fuel-year-dim.entity';
import { ControlYearDim } from '../entities/control-year-dim.entity';

@EntityRepository(ProgramYearDim)
export class ProgramYearDimRepository extends Repository<ProgramYearDim> {
  async getApplicableFacilityAttributes(
    applicableFacilityAttributesParamsDTO: ApplicableFacilityAttributesParamsDTO,
  ): Promise<ProgramYearDim[]> {
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
        AnnualUnitData,
        'aud',
        'pyd.opYear = aud.opYear AND pyd.unitId = aud.unitId',
      )
      .innerJoin(
        UnitFact,
        'uf',
        'aud.opYear = uf.opYear AND aud.unitId = uf.unitId',
      )
      .innerJoin(
        UnitTypeYearDim,
        'utyd',
        'uf.opYear = utyd.opYear AND uf.unitId = utyd.unitId',
      )
      .innerJoin(
        FuelYearDim,
        'fyd',
        'utyd.opYear = fyd.opYear AND utyd.unitId = fyd.unitId',
      )
      .innerJoin(
        ControlYearDim,
        'cyd',
        'fyd.opYear = cyd.opYear AND fyd.unitId = cyd.unitId',
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

    query.andWhere(`pyd.opYear IN (:...years)`, {
      years: applicableFacilityAttributesParamsDTO.year,
    });

    query.orderBy('pyd.opYear').addOrderBy('pyd.programCode');
    
    return query.getRawMany();
  }
}
