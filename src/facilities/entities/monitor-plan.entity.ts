import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'MONITOR_PLAN' })
export class MonitorPlan extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 45 })
  MON_PLAN_ID: string;

  @Column()
  FAC_ID: number;

  @Column({ type: 'varchar', length: 7, nullable: true })
  CONFIG_TYPE_CD: string;

  @Column({ nullable: true })
  SUBMISSION_ID: number;

  @Column({ type: 'varchar', length: 7, nullable: true })
  SUBMISSION_AVAILABILITY_CD: string;

  @Column()
  BEGIN_RPT_PERIOD_ID: number;

  @Column({ nullable: true })
  END_RPT_PERIOD_ID: number;
}
