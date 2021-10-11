import { BaseEntity, Entity, Column, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'camd.plant' })
@Unique('uq_plant_oris_code', ['facilityId'])
@Unique('uq_plant_name_state', ['facilityName', 'state'])
export class Plant extends BaseEntity {
  @PrimaryColumn({
    name: 'fac_id',
  })
  id: number;

  @Column({
    name: 'oris_code',
  })
  facilityId: number;

  @Column({
    name: 'facility_name',
  })
  facilityName: string;

  @Column()
  state: string;

  @Column({
    name: 'epa_region',
  })
  epaRegion: number;
}
