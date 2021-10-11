import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'camddmw_arch.annual_unit_data_a' })
export class AnnualUnitDataArch extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
  })
  id: number;

  @PrimaryColumn({
    name: 'op_year',
  })
  year: number;
}
