import { BaseEntity, Entity, Column, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'camd.plant' })
@Unique('uq_plant_oris_code', ['orisCode'])
@Unique('uq_plant_name_state', ['name', 'state'])
export class Plant extends BaseEntity {
  @PrimaryColumn({
    name: 'fac_id'
  })
  id: number;

  @Column({
    name: 'oris_code'
  })
  orisCode: number;

  @Column({
    name: 'facility_name'
  })
  name: string;

  @Column()
  state: string;

  @Column({
    name: 'epa_region'
  })
  region: number;
}
