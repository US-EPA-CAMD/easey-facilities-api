import { ApiConfigService } from './api-config.service';

export class ErrorMessages {
  public static UnitCharacteristics(
    plural: boolean,
    parameter: string,
  ): string {
    let grammar = plural
      ? `One or more ${parameter}s are`
      : `The ${parameter} is`;
    let referList =
      parameter === 'state'
        ? 'Use the two letter postal abbreviation (use TX, not Texas)'
        : `Refer to the list of available ${parameter}s for valid values`;

    if (parameter === 'controlTechnologies') {
      grammar = plural ? grammar.replace(`${parameter}s`, parameter) : grammar;
      referList = referList.replace(`${parameter}s`, parameter);
    }

    if (parameter === 'sourceCategories') {
      grammar = plural ? grammar.replace(`${parameter}s`, parameter) : grammar;
      referList = referList.replace(`${parameter}s`, parameter);
    }

    if (parameter === 'state') {
      return `${grammar} not valid. ${referList}`;
    }

    return `${grammar} not valid. ${referList} ${ErrorMessages.ApiConfigLink(
      parameter,
    )}`;
  }
  public static MultipleFormat(parameter: string, format: string) {
    return `One or more ${parameter}s are not in the ${format}. Ensure all ${parameter}s are in the ${format}`;
  }

  public static SingleFormat(parameter: string, format: string) {
    return `Ensure that ${parameter} is in the ${format}.`;
  }
  public static DateRange(
    parameter: string,
    plural: boolean,
    validRange: string,
  ) {
    const grammar = plural
      ? `Update one or more ${parameter}s to`
      : `Update the ${parameter} to`;

    return `${grammar} ${validRange}`;
  }

  public static DateValidity() {
    return `The provided $property $value is not a valid date.`;
  }

  public static RequiredProperty() {
    return `$property should not be null or undefined`;
  }
  static ApiConfigLink(parameter: string) {
    const mdm = `${ApiConfigService.getMdm()}`;

    switch (parameter) {
      case 'orisCode':
        return `${ApiConfigService.getFacApi()}facilities`;
      case 'unitType':
        return `${mdm}unit-types`;
      case 'unitFuelType':
        return `${mdm}fuel-types`;
      case 'controlTechnologies':
        return `${mdm}control-technologies`;
      case 'sourceCategories':
        return `${mdm}source-categories`;
      default:
        return `${mdm}${parameter}s`;
    }
  }
}