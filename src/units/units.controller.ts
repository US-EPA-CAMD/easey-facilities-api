import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import {
  Get,
  Query,
  Param,
  Controller,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';

import { UnitDTO } from '../dtos/unit.dto';
import { UnitsService } from './units.service';

@ApiTags('Facilities')
@Controller()
export class UnitsController {
  constructor(
    private service: UnitsService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieved Units',
  })
  @ApiBadRequestResponse({
    description: 'Invalid Request',
  })
  @ApiNotFoundResponse({
    description: 'Resource Not Found',
  })
  getUnits(@Param('id', ParseIntPipe) facId: number): Promise<UnitDTO[]> {
    return this.service.getUnits(facId);
  }

  // @Get('/:id')
  // @ApiOkResponse({
  //   description: 'Retrieved Unit By ID',
  // })
  // @ApiBadRequestResponse({
  //   description: 'The specified unit ID is invalid.',
  // })
  // @ApiNotFoundResponse({
  //   description: 'A unit with the specificed ID was not found.',
  // })
  // getUnitById(@Param('id', ParseIntPipe) id: number): UnitDTO {
  //   return this.service.getUnitById(id);
  // }
}
