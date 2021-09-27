import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  name: 'camddmw.vw_facility_unit_attributes',
  expression: `SELECT uf.unit_id,
    uf.op_year,
    pyd.prg_code,
    pyd.report_freq,
    uf.state,
    uf.orispl_code,
    uf.unitid,
    uf.assoc_stacks,
    uf.epa_region,
    uf.nerc_region,
    uf.county,
    uf.county_code,
    uf.fips_code,
    uf.source_cat,
    uf.latitude,
    uf.longitude,
    uf.so2_phase,
    uf.nox_phase,
    uf.unit_type_info,
    uf.primary_fuel_info,
    uf.secondary_fuel_info,
    uf.so2_control_info,
    uf.nox_control_info,
    uf.part_control_info,
    uf.hg_control_info,
    uf.comr_op_date,
    uf.op_status_info,
    uf.capacity_input,
    odf.own_display,
    odf.opr_display,
    d.generator_id,
    uf.facility_name
   FROM camddmw.unit_fact uf
     JOIN ( SELECT ug.unit_id,
            string_agg(g.genid::text, ', '::text) AS generator_id
           FROM camd.generator g
             JOIN camd.unit_generator ug ON g.gen_id = ug.gen_id
          GROUP BY ug.unit_id) d ON uf.unit_id = d.unit_id
     LEFT JOIN camddmw.program_year_dim pyd ON uf.unit_id = pyd.unit_id AND uf.op_year = pyd.op_year
     LEFT JOIN camddmw.owner_display_fact odf ON uf.unit_id = odf.unit_id AND uf.op_year = odf.op_year;`,
})
export class FacilityUnitAttributes {
  @ViewColumn({ name: 'unit_id' })
  id: string;

  @ViewColumn({ name: 'op_year' })
  year: number;

  @ViewColumn({ name: 'prg_code' })
  programCodeInfo: string;

  @ViewColumn({ name: 'report_freq' })
  reportingFrequency: string;

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
}
