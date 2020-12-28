import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'PLANT_PERSON' })
export class PlantPerson extends BaseEntity {
  @PrimaryColumn()
  FAC_PPL_ID: number;

  @Column({ nullable: true })
  FAC_ID: number;

  @Column()
  PPL_ID: number;

  @Column({ type: 'varchar', length: 7 })
  RESPONSIBILITY_ID: string;

  @Column({ type: 'varchar', length: 7, nullable: true })
  PRG_CD: string;
}
