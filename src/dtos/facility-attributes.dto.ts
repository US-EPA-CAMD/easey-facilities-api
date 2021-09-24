export class FacilityAttributesDTO {
  state: string;
  facilityName: string;
  facilityId?: number;
  unitId: string;
  associatedStacks: string;
  year: number;
  programCodeInfo: string;
  epaRegion?: number;
  nercRegion: string;
  county: string;
  countyCode: string;
  fipsCode: string;
  sourceCategory: string;
  latitude?: number;
  longitude?: number;
  ownerOperator: string;
  so2Phase: string;
  noxPhase: string;
  unitType: string;
  primaryFuelInfo: string;
  secondaryFuelInfo: string;
  so2ControlInfo: string;
  noxControlInfo: string;
  pmControlInfo: string;
  hgControlInfo: string;
  commercialOperationDate: string;
  operatingStatus: string;
  maxHourlyHIRate?: number;
  // generatorId: string;
  reportingFrequency: string;
}
