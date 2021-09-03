import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'camddmw.unit_type_year_dim' })
export class UnitTypeYearDim extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
  })
  unitId: number;

  @PrimaryColumn({
    name: 'op_year',
  })
  opYear: number;

  @PrimaryColumn({
    name: 'unit_type',
  })
  unitType: string;
}
