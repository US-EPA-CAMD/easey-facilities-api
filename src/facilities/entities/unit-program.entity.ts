import { BaseEntity, Entity, Column, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'UNIT_PROGRAM' })
@Unique('UQ_UNIT_PROGRAM', ['UNIT_ID', 'PRG_ID'])
export class UnitProgram extends BaseEntity {
  @PrimaryColumn()
  UP_ID: number;

  @Column()
  UNIT_ID: number;

  @Column()
  PRG_ID: number;

  @Column({ type: 'varchar', length: 7, nullable: true })
  PRG_CD: string;
}
