import { BaseEntity, Entity, Column, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'camd.unit' })
@Unique('uq_unit', ['id', 'name'])
export class Unit extends BaseEntity {
  @PrimaryColumn({
    name: "unit_id"
  })
  id: number;

  @Column({
    name: "fac_id"
  })
  facId: number;

  @Column({
    name: "unitid"
  })
  name: string;

  @Column({
    name: "unit_description"
  })
  description: string;

  @Column({
    name: "comm_op_date"
  })
  commissionOpDate: Date;

  @Column({
    name: "boiler_sequence_number"
  })
  boilerSequenceNumber: number;
}
