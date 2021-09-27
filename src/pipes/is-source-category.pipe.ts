import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { getManager, Raw } from 'typeorm';
import { SourceCategoryCode } from '../entities/source-category-code.entity';

export function IsSourceCategory(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsSourceCategory',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const manager = getManager();

          const found = await manager.findOne(SourceCategoryCode, {
            sourceCategoryDescription: Raw(
              alias => `UPPER(${alias}) LIKE '${value.toUpperCase()}'`,
            ),
          });
          return found != null;
        },
      },
    });
  };
}
