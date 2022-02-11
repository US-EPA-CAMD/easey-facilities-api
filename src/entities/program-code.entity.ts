import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

import { NumericColumnTransformer } from '@us-epa-camd/easey-common/transforms';

@Entity({ name: 'camdmd.program_code' })
export class ProgramCode extends BaseEntity {
  @PrimaryColumn({
    name: 'prg_cd',
  })
  programCode: string;

  @Column({
    name: 'prg_description',
  })
  programDescription: string;

  @Column({
    name: 'emissions_ui_filter',
    transformer: new NumericColumnTransformer(),
  })
  emissionsUIFilter: number;
}
