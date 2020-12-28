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
  
  // @Column({ type: 'varchar', length: 8 ,nullable: true})
  // COUNTY: string;

  // @Column({ nullable: true})
  // SIC_CODE: number;

  // @Column({ nullable: true})
  // EPA_REGION: number;

  // @Column({ length: 5 ,nullable: true})
  // NERC_REGION: string;

  // @Column({ length: 10,nullable: true })
  // AIRSID: string;

  // @Column({ length: 12,nullable: true })
  // FINDSID: string;

  // @Column({ length: 15 ,nullable: true})
  // STATEID: string;

  // @Column({ type: 'decimal', precision: 7, scale: 4, nullable: true })
  // LATITUDE: number;

  // @Column({ type: 'decimal', precision: 8, scale: 4, nullable: true })
  // LONGITUDE: number;
  
  // @Column({ nullable: true})
  // FRS_ID: string;

  // @Column({ nullable: true})
  // PAYEE_ID: number;

  // @Column({ type: 'date', nullable: true })
  // PERMIT_EXP_DATE: Date;

  // @Column({ length: 200 ,nullable: true})
  // LATLON_SOURCE: string;

  // @Column({ type: 'varchar', length: 4000, nullable: true })
  // TRIBAL_LAND_CD: string;

  // @Column({ nullable: true})
  // PAYEFIRST_ECMPS_RPT_PERIOD_ID: number;
}
