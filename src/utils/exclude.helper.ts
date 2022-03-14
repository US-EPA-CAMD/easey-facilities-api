export function exclude(data, params, excludeEnum: Object) {
  const { exclude } = params;
  const enumList = Object.values(excludeEnum);
  for (const parameter in enumList) {
    if (
      exclude.includes(enumList[parameter]) &&
      parameter === 'associatedGeneratorsAndNameplateCapacity'
    ) {
      delete data[enumList['associatedGeneratorsAndNameplateCapacity']];
      delete data[enumList['oprDisplay']];
      delete data[enumList['ownerOperator']];
      delete data[enumList['arpNameplateCapacity']];
      delete data[enumList['otherNameplateCapacity']];
      delete data[enumList['arpNameplateCapacity']];
      delete data[enumList['otherNameplateCapacity']];
    } else if (exclude.includes(enumList[parameter])) {
      delete data[enumList[parameter]];
    }
  }
  return data;
}

export enum ExcludeFacilityAttributes {
  ASSOC_STACKS = 'associatedStacks',
  PRG_CODE_INFO = 'programCodeInfo',
  EPA_REGION = 'epaRegion',
  NERC_REGION = 'nercRegion',
  COUNTY = 'county',
  COUNTY_CODE = 'countyCode',
  FIPS_CODE = 'fipsCode',
  SOURCE_CAT = 'sourceCategory',
  LATITUDE = 'latitude',
  LONGITUDE = 'longitude',
  SO2_PHASE = 'so2Phase',
  NOX_PHASE = 'noxPhase',
  PRIMARY_FUEL_INFO = 'primaryFuelInfo',
  SECONDARY_FUEL_INFO = 'secondaryFuelInfo',
  UNIT_TYPE_INFO = 'unitType',
  SO2_CONTROL_INFO = 'so2ControlInfo',
  PART_CONTROL_INFO = 'pmControlInfo',
  NOX_CONTROL_INFO = 'noxControlInfo',
  HG_CONTROL_INFO = 'hgControlInfo',
  COMR_OP_DATE = 'commercialOperationDate',
  OP_STATUS_INFO = 'operatingStatus',
  CAPACITY_INPUT = 'maxHourlyHIRate',
  AGNC = 'associatedGeneratorsAndNameplateCapacity',
}
