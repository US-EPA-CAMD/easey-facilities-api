import { BaseEntity, Entity, Column, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'UNIT_GENERATOR' })
@Unique('UQ_UNIT_GENERATOR', ['UNIT_ID', 'GEN_ID', 'BEGIN_DATE'])
export class UnitGenerator extends BaseEntity {
  @PrimaryColumn()
  UNIT_GEN_ID: number;

  @Column()
  UNIT_ID: number;

  @Column()
  GEN_ID: number;

  @Column({ type: 'date' })
  BEGIN_DATE: Date;
}
