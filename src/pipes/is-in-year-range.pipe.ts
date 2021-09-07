import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/**
 * This decorator takes in a min date and max date as a parameter
 * The date range is the min date -> max date inclusive
 */
export function IsInYearRange(
  property: Date[],
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isInDateRange',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value) {
            const date = new Date(value, 0);

            return (
              value === '1980' ||
              value === '1985' ||
              value === '1990' ||
              (date >= property[0] && date <= property[1])
            );
          }
          return true;
        },
      },
    });
  };
}
