import { NumericColumnTransformer } from '@us-epa-camd/easey-common/transforms';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';

import { MonitorLocation } from './monitor-location.entity';

@Entity({ name: 'camdecmps.monitor_plan' })
export class MonitorPlan extends BaseEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 45,
    name: 'mon_plan_id',
  })
  id: string;

  @Column({
    type: 'numeric',
    precision: 38,
    scale: 0,
    name: 'fac_id',
    transformer: new NumericColumnTransformer(),
  })
  facId: number;

  @Column({
    type: 'varchar',
    length: 7,
    name: 'config_type_cd',
  })
  configTypeCode: string;

  @Column({ name: 'last_updated' })
  lastUpdated: Date;

  @Column({
    type: 'varchar',
    length: 1,
    name: 'updated_status_flg',
  })
  updatedStatusFlag: string;

  @Column({
    type: 'varchar',
    length: 1,
    name: 'needs_eval_flg',
  })
  needsEvalFlag: string;

  @Column({
    type: 'varchar',
    length: 45,
    name: 'chk_session_id',
  })
  checkSessionId: string;

  @Column({
    type: 'numeric',
    precision: 38,
    scale: 0,
    name: 'end_rpt_period_id',
    transformer: new NumericColumnTransformer(),
  })
  endReportPeriodId: number;

  @Column({
    type: 'numeric',
    precision: 38,
    scale: 0,
    name: 'begin_rpt_period_id',
    transformer: new NumericColumnTransformer(),
  })
  beginReportPeriodId: number;

  @Column({
    type: 'varchar',
    length: 25,
    name: 'userid',
  })
  userId: string;

  @Column({ nullable: false, name: 'add_date' })
  addDate: Date;

  @Column({ name: 'update_date' })
  updateDate: Date;

  @Column({
    type: 'numeric',
    precision: 38,
    scale: 0,
    name: 'submission_id',
    transformer: new NumericColumnTransformer(),
  })
  submissionId: number;

  @ManyToMany(
    () => MonitorLocation,
    location => location.plans,
  )
  @JoinTable({
    name: 'camdecmps.monitor_plan_location',
    joinColumn: {
      name: 'mon_plan_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'mon_loc_id',
      referencedColumnName: 'id',
    },
  })
  locations: MonitorLocation[];
}
