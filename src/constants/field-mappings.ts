import { facilityAttributesFields } from './facility-attributes-fields';

const attributes = [
  { ...facilityAttributesFields.state },
  { ...facilityAttributesFields.facilityName },
  { ...facilityAttributesFields.facilityId },
  { ...facilityAttributesFields.unitId },
  { ...facilityAttributesFields.associatedStacks },
  { ...facilityAttributesFields.year },
  { ...facilityAttributesFields.programCodeInfo },
  { ...facilityAttributesFields.epaRegion },
  { ...facilityAttributesFields.nercRegion },
  { ...facilityAttributesFields.county },
  { ...facilityAttributesFields.countyCode },
  { ...facilityAttributesFields.fipsCode },
  { ...facilityAttributesFields.sourceCategory },
  { ...facilityAttributesFields.latitude },
  { ...facilityAttributesFields.longitude },
  { ...facilityAttributesFields.ownerOperator },
  { ...facilityAttributesFields.so2Phase },
  { ...facilityAttributesFields.noxPhase },
  { ...facilityAttributesFields.unitType },
  { ...facilityAttributesFields.primaryFuelInfo },
  { ...facilityAttributesFields.secondaryFuelInfo },
  { ...facilityAttributesFields.so2ControlInfo },
  { ...facilityAttributesFields.noxControlInfo },
  { ...facilityAttributesFields.pmControlInfo },
  { ...facilityAttributesFields.hgControlInfo },
  { ...facilityAttributesFields.commercialOperationDate },
  { ...facilityAttributesFields.operatingStatus },
  { ...facilityAttributesFields.maxHourlyHIRate },
  { ...facilityAttributesFields.reportingFrequency },
  { ...facilityAttributesFields.generatorId },
];

export const fieldMappings = {
  facilities: {
    attributes: attributes,
  },
};
