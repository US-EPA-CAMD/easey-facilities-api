export function exclude(data, params, excludeEnum: string[]) {
  const { exclude } = params;
  for (const parameter in excludeEnum) {
    if (parameter === 'associatedGeneratorsAndNameplateCapacity') {
      delete data.associatedGeneratorsAndNameplateCapacity;
      delete data.oprDisplay;
      delete data.ownerOperator;
      delete data.arpNameplateCapacity;
      delete data.otherNameplateCapacity;
      delete data.arpNameplateCapacity;
      delete data.otherNameplateCapacity;
    } else if (exclude.includes(parameter)) {
      delete data[parameter];
    }
  }
  return data;
}

export const excludeFacilityAttributes = [
    'associatedStacks',
    'programCodeInfo',
    'epaRegion',
    'nercRegion',
    'county',
    'countyCode',
    'fipsCode',
    'sourceCategory',
    'latitude',
    'longitude',
    'so2Phase',
    'noxPhase',
    'primaryFuelInfo',
    'secondaryFuelInfo',
    'unitType',
    'so2ControlInfo',
    'pmControlInfo',
    'noxControlInfo',
    'hgControlInfo',
    'commercialOperationDate',
    'operatingStatus',
    'maxHourlyHIRate',
    'associatedGeneratorsAndNameplateCapacity',
  ];