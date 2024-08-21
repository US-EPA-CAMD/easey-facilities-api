import { BaseEntity, Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { NumericColumnTransformer } from '@us-epa-camd/easey-common/transforms';

import { UnitStackConfiguration } from './unit-stack-configuration.entity';

@Entity({ name: 'camdecmpswks.stack_pipe' })
export class StackPipe extends BaseEntity {
  @PrimaryColumn({
    name: 'stack_pipe_id',
  })
  id: string;

  @Column({
    name: 'stack_name',
  })
  name: string;

  @Column({
    type: 'date',
    name: 'active_date',
  })
  activeDate: Date;

  @Column({
    type: 'date',
    name: 'retire_date',
  })
  retireDate: Date;

  @Column({
    name: 'fac_id',
    transformer: new NumericColumnTransformer(),
  })
  facId: number;

  @Column({
    name: 'userid',
  })
  userId: string;

  @Column({ type: 'timestamp', name: 'add_date' })
  addDate: Date;

  @Column({ type: 'timestamp', name: 'update_date' })
  updateDate: Date;

  @OneToMany(
    () => UnitStackConfiguration,
    usc => usc.stackPipe,
  )
  unitStackConfigurations: UnitStackConfiguration[];
}
