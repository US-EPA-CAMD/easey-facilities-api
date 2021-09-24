import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { OwnerDisplayFact } from './owner-display-fact.entity';
import { ProgramYearDim } from './program-year-dim.entity';

@Entity({ name: 'camddmw.unit_fact' })
export class UnitFact extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
  })
  id: number;

  @PrimaryColumn({
    name: 'op_year',
  })
  opYear: number;

  @Column({
    name: 'orispl_code',
  })
  facilityId: number;

  @Column({
    name: 'facility_name',
  })
  facilityName: string;

  @Column()
  state: string;

  @Column({
    name: 'unitid',
  })
  unitId: string;

  @Column({
    name: 'assoc_stacks',
  })
  associatedStacks: string;

  @Column({
    name: 'prg_code_info',
  })
  programCodeInfo: string;

  @Column({
    name: 'epa_region',
  })
  epaRegion: number;

  @Column({
    name: 'nerc_region',
  })
  nercRegion: string;

  @Column()
  county: string;

  @Column({
    name: 'county_code',
  })
  countyCode: string;

  @Column({
    name: 'fips_code',
  })
  fipsCode: string;

  @Column({
    name: 'source_cat',
  })
  sourceCategory: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column({
    name: 'so2_phase',
  })
  so2Phase: string;

  @Column({
    name: 'nox_phase',
  })
  noxPhase: string;

  @Column({
    name: 'unit_type_info',
  })
  unitType: string;

  @Column({
    name: 'primary_fuel_info',
  })
  primaryFuelInfo: string;

  @Column({
    name: 'secondary_fuel_info',
  })
  secondaryFuelInfo: string;

  @Column({
    name: 'so2_control_info',
  })
  so2ControlInfo: string;

  @Column({
    name: 'nox_control_info',
  })
  noxControlInfo: string;

  @Column({
    name: 'part_control_info',
  })
  pmControlInfo: string;

  @Column({
    name: 'hg_control_info',
  })
  hgControlInfo: string;

  @Column({
    name: 'comr_op_date',
  })
  commercialOperationDate: Date;

  @Column({
    name: 'op_status_info',
  })
  operatingStatus: string;

  @Column({
    name: 'capacity_input',
  })
  maxHourlyHIRate: number;

  @OneToOne(
    () => OwnerDisplayFact,
    odf => odf.unitFact,
  )
  @JoinColumn([
    {
      name: 'unit_id',
      referencedColumnName: 'id',
    },
    {
      name: 'op_year',
      referencedColumnName: 'opYear',
    },
  ])
  ownerDisplayFact: OwnerDisplayFact;

  @OneToMany(
    () => ProgramYearDim,
    pyd => pyd.unitFact,
  )
  programYearDim: ProgramYearDim[];
}
