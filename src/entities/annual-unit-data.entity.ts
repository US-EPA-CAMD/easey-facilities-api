import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'camddmw.annual_unit_data' })
export class AnnualUnitData extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
  })
  id: number;

  @PrimaryColumn({
    name: 'op_year',
  })
  opYear: number;
}
