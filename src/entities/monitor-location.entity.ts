import { NumericColumnTransformer } from '@us-epa-camd/easey-common/transforms';
import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';

import { Unit } from './unit.entity';
import { MonitorMethod } from './monitor-method.entity';

@Entity({
  name: 'camdecmps.monitor_location',
})
export class MonitorLocation extends BaseEntity {
  @PrimaryColumn({
    name: 'mon_loc_id',
  })
  id: string;

  @Column({
    type: 'varchar',
    name: 'stack_pipe_id',
  })
  stackPipeId?: string;

  @Column({
    type: 'numeric',
    transformer: new NumericColumnTransformer(),
    name: 'unit_id',
  })
  unitId?: number;

  @Column({
    name: 'userid',
  })
  userId?: string;

  @Column({ type: 'timestamp', name: 'add_date' })
  addDate?: Date;

  @Column({ type: 'timestamp', name: 'update_date' })
  updateDate?: Date;

  @OneToOne(
    () => Unit,
    unit => unit.location,
    { eager: true },
  )
  @JoinColumn({ name: 'unit_id' })
  unit: Unit;

  @OneToMany(
    () => MonitorMethod,
    method => method.location,
    { eager: true },
  )
  methods: MonitorMethod[];
}
