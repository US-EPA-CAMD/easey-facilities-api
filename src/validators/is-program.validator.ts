import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { ProgramCode } from '../entities/program-code.entity';

@Injectable()
@ValidatorConstraint({ name: 'isProgram', async: true })
export class IsProgramValidator implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, _args: ValidationArguments) {
    const found = await this.entityManager.findOneBy(ProgramCode, {
      programCode: value.toUpperCase(),
    });

    return found != null;
  }
}
