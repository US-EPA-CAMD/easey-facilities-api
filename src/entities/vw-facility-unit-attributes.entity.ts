import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  name: 'camddmw.vw_facility_unit_attributes',
})
export class FacilityUnitAttributes {
  @ViewColumn({ name: 'unit_id' })
  id: string;

  @ViewColumn({ name: 'op_year' })
  year: number;

  @ViewColumn({ name: 'prg_code_info' })
  programCodeInfo: string;

  @ViewColumn({ name: 'state' })
  state: string;

  @ViewColumn({ name: 'orispl_code' })
  facilityId: number;

  @ViewColumn({ name: 'facility_name' })
  facilityName: string;

  @ViewColumn({ name: 'unitid' })
  unitId: string;

  @ViewColumn({ name: 'assoc_stacks' })
  associatedStacks: string;

  @ViewColumn({ name: 'epa_region' })
  epaRegion: number;

  @ViewColumn({ name: 'nerc_region' })
  nercRegion: string;

  @ViewColumn({ name: 'county' })
  county: string;

  @ViewColumn({ name: 'county_code' })
  countyCode: string;

  @ViewColumn({ name: 'fips_code' })
  fipsCode: string;

  @ViewColumn({ name: 'source_cat' })
  sourceCategory: string;

  @ViewColumn({ name: 'latitude' })
  latitude: number;

  @ViewColumn({ name: 'longitude' })
  longitude: number;

  @ViewColumn({ name: 'so2_phase' })
  so2Phase: string;

  @ViewColumn({ name: 'nox_phase' })
  noxPhase: string;

  @ViewColumn({ name: 'unit_type_info' })
  unitType: string;

  @ViewColumn({ name: 'primary_fuel_info' })
  primaryFuelInfo: string;

  @ViewColumn({ name: 'secondary_fuel_info' })
  secondaryFuelInfo: string;

  @ViewColumn({ name: 'so2_control_info' })
  so2ControlInfo: string;

  @ViewColumn({ name: 'nox_control_info' })
  noxControlInfo: string;

  @ViewColumn({ name: 'part_control_info' })
  pmControlInfo: string;

  @ViewColumn({ name: 'hg_control_info' })
  hgControlInfo: string;

  @ViewColumn({ name: 'comr_op_date' })
  commercialOperationDate: Date;

  @ViewColumn({ name: 'op_status_info' })
  operatingStatus: string;

  @ViewColumn({ name: 'capacity_input' })
  maxHourlyHIRate: number;

  @ViewColumn({ name: 'own_display' })
  ownDisplay: string;

  @ViewColumn({ name: 'opr_display' })
  oprDisplay: string;

  @ViewColumn({ name: 'generator_id' })
  generatorId: string;

  @ViewColumn({ name: 'arp_nameplate_capacity' })
  arpNameplateCapacity: number;

  @ViewColumn({ name: 'other_nameplate_capacity' })
  otherNameplateCapacity: number;
}
