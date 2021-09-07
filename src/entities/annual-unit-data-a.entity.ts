import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { ProgramYearDim } from './program-year-dim.entity';
import { UnitFact } from './unit-fact.entity';

@Entity({ name: 'camddmw_arch.annual_unit_data_a' })
export class AnnualUnitDataArch extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
  })
  unitId: number;

  @PrimaryColumn({
    name: 'op_year',
  })
  opYear: number;

  @ManyToOne(
    () => ProgramYearDim,
    pyd => pyd.annualUnitDataArch,
  )
  @JoinColumn([
    {
      name: 'unit_id',
      referencedColumnName: 'unitId',
    },
    {
      name: 'op_year',
      referencedColumnName: 'opYear',
    },
  ])
  programYearDim: ProgramYearDim;

  @ManyToOne(
    () => UnitFact,
    uf => uf.annualUnitDataArch,
  )
  @JoinColumn([
    {
      name: 'unit_id',
      referencedColumnName: 'unitId',
    },
    {
      name: 'op_year',
      referencedColumnName: 'opYear',
    },
  ])
  unitFact: UnitFact;
}
