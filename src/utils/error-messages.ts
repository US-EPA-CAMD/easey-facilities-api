export class ErrorMessages {
  public static MultipleFormat(parameter: string, format: string) {
    return `One or more ${parameter}s are not in the ${format}. Ensure all ${parameter}s are in the ${format}`;
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

  public static RequiredProperty() {
    return `$property should not be null or undefined`;
  }
}
