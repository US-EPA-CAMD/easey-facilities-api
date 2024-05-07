import { registerDecorator, ValidationOptions } from 'class-validator';

import { IsProgramValidator } from '../validators/is-program.validator';

/**
 * This decorator can optionally exclude programs specified in the @property param
 */
export function IsProgram(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isProgram',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsProgramValidator,
    });
  };
}
