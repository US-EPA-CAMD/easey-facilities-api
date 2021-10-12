import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'camddmw.unit_type_year_dim' })
export class UnitTypeYearDim extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
  })
  id: number;

  @PrimaryColumn({
    name: 'op_year',
  })
  year: number;

  @PrimaryColumn({
    name: 'unit_type',
  })
  unitType: string;
}
