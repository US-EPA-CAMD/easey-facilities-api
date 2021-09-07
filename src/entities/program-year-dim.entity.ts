import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { AnnualUnitData } from './annual-unit-data.entity';
import { AnnualUnitDataArch } from './annual-unit-data-a.entity';

@Entity({ name: 'camddmw.program_year_dim' })
export class ProgramYearDim extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
  })
  unitId: number;

  @PrimaryColumn({
    name: 'op_year',
  })
  opYear: number;

  @PrimaryColumn({
    name: 'prg_code',
  })
  programCode: string;

  @Column({
    name: 'report_freq',
  })
  reportFreq: string;

  @OneToMany(
    () => AnnualUnitData,
    annualUnit => annualUnit.programYearDim,
  )
  annualUnitData: AnnualUnitData;

  @OneToMany(
    () => AnnualUnitDataArch,
    annualUnit => annualUnit.programYearDim,
  )
  annualUnitDataArch: AnnualUnitDataArch;
}
