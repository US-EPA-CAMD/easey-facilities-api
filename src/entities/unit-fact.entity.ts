import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { AnnualUnitData } from './annual-unit-data.entity';
import { AnnualUnitDataArch } from './annual-unit-data-a.entity';

@Entity({ name: 'camddmw.unit_fact' })
export class UnitFact extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
  })
  unitId: number;

  @PrimaryColumn({
    name: 'op_year',
  })
  opYear: number;

  @Column({
    name: 'orispl_code',
  })
  facilityId: number;

  @Column()
  state: string;

  @OneToMany(
    () => AnnualUnitData,
    annualUnit => annualUnit.unitFact,
  )
  annualUnitData: AnnualUnitData[];

  @OneToMany(
    () => AnnualUnitDataArch,
    annualUnit => annualUnit.unitFact,
  )
  annualUnitDataArch: AnnualUnitDataArch[];
}
