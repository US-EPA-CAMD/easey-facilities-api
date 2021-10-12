import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'camddmw.control_year_dim' })
export class ControlYearDim extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
  })
  id: number;

  @PrimaryColumn({
    name: 'op_year',
  })
  year: number;

  @PrimaryColumn({
    name: 'control_year_id',
  })
  controlYrId: number;

  @PrimaryColumn({
    name: 'control_code',
  })
  controlCode: string;

  @PrimaryColumn({
    name: 'parameter',
  })
  parameter: string;
}
