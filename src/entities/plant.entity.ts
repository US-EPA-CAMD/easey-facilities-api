import { BaseEntity, Entity, Column, PrimaryColumn, Unique } from 'typeorm';

import { NumericColumnTransformer } from '@us-epa-camd/easey-common/transforms';

@Entity({ name: 'camd.plant' })
@Unique('uq_plant_oris_code', ['facilityId'])
@Unique('uq_plant_name_state', ['facilityName', 'stateCode'])
export class Plant extends BaseEntity {
  @PrimaryColumn({
    name: 'fac_id',
    transformer: new NumericColumnTransformer(),
  })
  id: number;

  @Column({
    name: 'oris_code',
    transformer: new NumericColumnTransformer(),
  })
  facilityId: number;

  @Column({
    name: 'facility_name',
  })
  facilityName: string;

  @Column({ name: 'state' })
  stateCode: string;

  @Column({
    name: 'epa_region',
    transformer: new NumericColumnTransformer(),
  })
  epaRegion: number;
}
