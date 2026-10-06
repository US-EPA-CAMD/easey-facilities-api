import { NumericColumnTransformer } from '@us-epa-camd/easey-common/transforms';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { MonitorMethod } from './monitor-method.entity';
import { MonitorPlan } from './monitor-plan.entity';
import { Unit } from './unit.entity';

@Entity({
  name: 'camdecmpswks.monitor_location',
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

  @ManyToMany(
    () => MonitorPlan,
    plan => plan.locations,
    { eager: true },
  )
  plans: MonitorPlan[];
}
